import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DamageDealer } from './enums/damage-dealer.enum';
import { DealerQuality } from './enums/dealer-quality.enum';
import { HasMany } from 'sequelize-typescript';
import { UserDamage } from '../user-damage/user-damage.model';

interface UserCreationAttrs {
  name: string;
  damageDealer: DamageDealer;
  quality: DealerQuality;
  stars: number;
  temple: number;
  isActive?: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'Artem', description: 'Name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare name: string;

  @ApiProperty({ enum: DamageDealer, example: DamageDealer.ASP, description: 'Damage dealer' })
  @Column({ type: DataType.ENUM(...Object.values(DamageDealer)), allowNull: false })
  declare damageDealer: DamageDealer;

  @ApiProperty({ enum: DealerQuality, example: DealerQuality.A, description: 'Dealer quality' })
  @Column({ type: DataType.ENUM(...Object.values(DealerQuality)), allowNull: false })
  declare quality: DealerQuality;

  @ApiProperty({ example: 16, description: 'Dealer stars lvl' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare stars: number;

  @ApiProperty({ example: 16, description: 'Temple lvl' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare temple: number;

  @ApiProperty({ example: true, description: 'Is user active', required: false })
  @IsOptional()
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @HasMany(() => UserDamage)
  declare damageHistory: UserDamage[];
}
