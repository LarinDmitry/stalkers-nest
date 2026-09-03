import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDamageController } from './user-damage.controller';
import { UserDamageService } from './user-damage.service';
import { UserDamage } from './user-damage.model';
import { User } from '../users/users.model';
import { Statistic } from '../statistic/statistic.model';
import { AdminAuthModule } from '../admin/admin-auth.module';

@Module({
  controllers: [UserDamageController],
  providers: [UserDamageService],
  imports: [SequelizeModule.forFeature([User, UserDamage, Statistic]), AdminAuthModule],
  exports: [UserDamageService],
})
export class UserDamageModule {}
