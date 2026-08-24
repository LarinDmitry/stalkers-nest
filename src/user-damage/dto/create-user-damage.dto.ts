import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsArray, ArrayMinSize, ArrayMaxSize, Matches } from 'class-validator';

export class CreateUserDamageDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber({}, { message: 'userId must be a number' })
  readonly userId: number;

  @ApiProperty({ example: '11.25', description: 'Date in MM.YY format' })
  @IsString({ message: 'Must be a string' })
  @Matches(/^(0[1-9]|1[0-2])\.\d{2}$/, { message: 'Date must be in MM.YY format (e.g. 11.25)' })
  readonly date: string;

  @ApiProperty({
    example: [4579172848146, 26634001567193, 18195927154275, 11354077396667, 16064562741048, 3920300152624],
    description: 'Array of daily damage values',
  })
  @IsArray({ message: 'damageByDay must be an array' })
  @ArrayMinSize(6, { message: 'damageByDay must contain at least six element' })
  @ArrayMaxSize(6, { message: 'damageByDay must contain at least six element' })
  @IsNumber({}, { each: true, message: 'Each item in damageByDay must be a number' })
  readonly damageByDay: number[];
}