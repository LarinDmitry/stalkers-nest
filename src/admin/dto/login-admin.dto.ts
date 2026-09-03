import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ example: 'admin', description: 'Admin login' })
  @IsString()
  login: string;

  @ApiProperty({ example: '12345678', description: 'Admin password' })
  @IsString()
  @MinLength(6)
  password: string;
}