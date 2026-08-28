import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface StatisticCreationAttrs {
  date: string;
  total: string | number;
  rate: number;
  newbies: number;
}

@Table({ tableName: 'statistic' })
export class Statistic extends Model<Statistic, StatisticCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: '11.25', description: 'Date (MM.YY)' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare date: string;

  @ApiProperty({ example: '25314359409318800', description: 'Total value' })
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('total');
      return rawValue ? BigInt(rawValue).toString() : '0';
    },
  })
  declare total: string | number;

  @ApiProperty({ example: 9, description: 'Rate' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare rate: number;

  @ApiProperty({ example: 3, description: 'Newbies count' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare newbies: number;
}
