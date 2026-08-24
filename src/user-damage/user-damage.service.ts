import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDamage } from './user-damage.model';
import { User } from '../users/users.model';
import { Statistic } from '../statistic/statistic.model';
import { CreateUserDamageDto } from './dto/create-user-damage.dto';
import { UpdateUserDamageDto } from './dto/update-user-damage.dto';

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

  async updateDamageRecord(id: number, dto: UpdateUserDamageDto) {
    const record = await this.userDamageRepository.findByPk(id);

    if (!record) {
      throw new NotFoundException(`Damage record with ID ${id} not found`);
    }

    if (dto.userId) {
      const user = await this.userRepository.findByPk(dto.userId);
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
    }

    await record.update(dto);
    return record;
  }
}
