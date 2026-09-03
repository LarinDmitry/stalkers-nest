import { Module } from '@nestjs/common';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Statistic } from './statistic.model';
import { AdminAuthModule } from '../admin/admin-auth.module';

@Module({
  controllers: [StatisticController],
  providers: [StatisticService],
  imports: [SequelizeModule.forFeature([Statistic]), AdminAuthModule],
})
export class StatisticModule {}
