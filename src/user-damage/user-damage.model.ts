import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

interface UserDamageCreationAttrs {
  userId: number;
  date: string;
  damageByDay: number[];
}

@Table({ tableName: 'user_damage' })
export class UserDamage extends Model<UserDamage, UserDamageCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @ApiProperty({ example: '11.25', description: 'Date (MM.YY)' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare date: string;

  @ApiProperty({
    example: [
      4579172848146, 26634001567193, 18195927154275, 11354077396667, 16064562741048, 3920300152624,
    ],
    description: 'Daily damage values',
  })
  @Column({
    type: DataType.ARRAY(DataType.BIGINT),
    allowNull: false,
    get() {
      const rawValues = this.getDataValue('damageByDay');
      return rawValues ? rawValues.map((v: string | number) => Number(v)) : [];
    },
  })
  declare damageByDay: number[];

  @ApiProperty({ example: 80748041859953, description: 'Total damage for this record' })
  @Column({
    type: DataType.VIRTUAL,
    get(this: UserDamage) {
      const days = this.damageByDay || [];
      return days.reduce((acc: number, val: number) => acc + val, 0);
    },
  })
  declare damage: number;
}
