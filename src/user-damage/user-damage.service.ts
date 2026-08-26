import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDamage } from './user-damage.model';
import { User } from '../users/users.model';
import { Statistic } from '../statistic/statistic.model';
import { CreateUserDamageDto } from './dto/create-user-damage.dto';

@Injectable()
export class UserDamageService {
  constructor(
    @InjectModel(UserDamage) private userDamageRepository: typeof UserDamage,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Statistic) private statisticRepository: typeof Statistic,
  ) {}

  async createDamageRecord(dto: CreateUserDamageDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }
    return await this.userDamageRepository.create(dto);
  }

  async getAllUsersDamageInfo() {
    const users = await this.userRepository.findAll({
      where: { isActive: true },
      include: [{ model: UserDamage }],
      order: [['id', 'ASC']],
    });

    const statsMap = await this.getStatsMap();

    return users.map((user) => ({
      name: user.name,
      info: this.formatAndSortInfo(user.damageHistory || [], statsMap),
    }));
  }

  async getUserDamageInfo(userId: number) {
    const user = await this.userRepository.findByPk(userId, {
      include: [{ model: UserDamage }],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const statsMap = await this.getStatsMap();

    return {
      name: user.name,
      info: this.formatAndSortInfo(user.damageHistory || [], statsMap),
    };
  }

  private async getStatsMap(): Promise<Map<string, number>> {
    const allStats = await this.statisticRepository.findAll();
    const statsMap = new Map<string, number>();
    allStats.forEach((stat) => statsMap.set(stat.date, stat.total));
    return statsMap;
  }

  private formatAndSortInfo(damageHistory: UserDamage[], statsMap: Map<string, number>) {
    const info = damageHistory.map((item) => ({
      damage: item.damage,
      date: item.date,
      guildTotal: statsMap.get(item.date) || 0,
      damageByDay: item.damageByDay,
    }));

    return info.sort((a, b) => {
      const [monthA, yearA] = a.date.split('.').map(Number);
      const [monthB, yearB] = b.date.split('.').map(Number);

      if (yearA !== yearB) {
        return yearA - yearB;
      }
      return monthA - monthB;
    });
  }

  async upsertDamageRecord(dto: CreateUserDamageDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    const existingRecord = await this.userDamageRepository.findOne({
      where: {
        userId: dto.userId,
        date: dto.date,
      },
    });

    if (existingRecord) {
      existingRecord.damageByDay = [...dto.damageByDay];
      existingRecord.changed('damageByDay', true);
      await existingRecord.save();
      return existingRecord;
    }

    return await this.userDamageRepository.create(dto);
  }
}
