import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Statistic } from './statistic.model';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [SequelizeModule.forFeature([Statistic])],
})
export class StatisticModule {}