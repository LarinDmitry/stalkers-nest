import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Statistic } from './statistic.model';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { StatisticSortBy } from './dto/get-stats-query.dto';

@Injectable()
export class StatisticService {
  constructor(@InjectModel(Statistic) private statisticRepository: typeof Statistic) {}

  async createStatistic(dto: CreateStatisticDto) {
    return await this.statisticRepository.create(dto);
  }

  async getRecentStats(limit?: number, sortBy: StatisticSortBy = StatisticSortBy.ID) {
    if (sortBy === StatisticSortBy.DATE) {
      return await this.statisticRepository.findAll({
        order: [
          [Sequelize.literal('SUBSTRING(date, 4, 2)'), 'DESC'],
          [Sequelize.literal('SUBSTRING(date, 1, 2)'), 'DESC'],
        ],
        ...(limit && { limit }),
      });
    }

    const stats = await this.statisticRepository.findAll({
      order: [['id', limit ? 'DESC' : 'ASC']],
      ...(limit && { limit }),
    });

    return limit ? stats.reverse() : stats;
  }

  async updateStatistic(id: number, dto: UpdateStatisticDto) {
    const statistic = await this.statisticRepository.findByPk(id);
    if (!statistic) {
      throw new NotFoundException(`Statistic record with ID ${id} not found`);
    }
    await statistic.update(dto);
    return statistic;
  }

  async deleteStatistic(id: number): Promise<void> {
    const statistic = await this.statisticRepository.findByPk(id);
    if (!statistic) {
      throw new NotFoundException(`Statistic record with ID ${id} not found`);
    }
    await statistic.destroy();
  }
}
