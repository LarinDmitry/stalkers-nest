import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreationAttrs {
  name: string;
  isActive: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'Artem', description: 'Name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({ example: 'true', description: 'Is user active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive: boolean;
}
