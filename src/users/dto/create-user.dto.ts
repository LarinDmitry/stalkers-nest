import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { DamageDealer } from '../enums/damage-dealer.enum';
import { DealerQuality } from '../enums/dealer-quality.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Artem', description: 'User name' })
  @IsString({ message: 'Must be a string' })
  readonly name: string;

  @ApiProperty({
    enum: DamageDealer,
    example: DamageDealer.ASP,
    description: 'Damage dealer character',
  })
  @IsEnum(DamageDealer, { message: 'Must be a valid damage dealer' })
  readonly damageDealer: DamageDealer;

  @ApiProperty({
    enum: DealerQuality,
    example: DealerQuality.A,
    description: 'Dealer quality tier',
  })
  @IsEnum(DealerQuality, { message: 'Must be a valid quality tier' })
  readonly quality: DealerQuality;

  @ApiProperty({ example: 16, description: 'Dealer stars lvl' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly stars: number;

  @ApiProperty({ example: 16, description: 'Temple lvl' })
  @IsNumber({}, { message: 'Must be a number' })
  readonly temple: number;

  @ApiProperty({ example: true, description: 'Is user active', required: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  readonly isActive?: boolean;
}
