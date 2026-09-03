import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface AdminCreationAttrs {
  login: string;
  passwordHash: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique Admin ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'admin_login', description: 'Admin login' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare passwordHash: string;
}
