import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Artem', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  readonly name: string;

  @ApiProperty({ example: true, description: 'Is user active' })
  @IsBoolean({ message: 'Must be a boolean' })
  readonly isActive: boolean;
}
