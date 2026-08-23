import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Matches } from 'class-validator';

export class CreateStatisticDto {
  @ApiProperty({ example: '11.25', description: 'Date in MM.YY format' })
  @IsString({ message: 'Must be a string' })
  @Matches(/^(0[1-9]|1[0-2])\.\d{2}$/, { message: 'Date must be in MM.YY format (e.g. 11.25)' })
  readonly date: string;

  @ApiProperty({ example: 25314359409318800, description: 'Total total score/amount' })
  @IsNumber({}, { message: 'Must be a number' })
  @Min(0, { message: 'Total cannot be negative' })
  readonly total: number;

  @ApiProperty({ example: 9, description: 'Rate value' })
  @IsNumber({}, { message: 'Must be a number' })
  @Min(0, { message: 'Rate cannot be negative' })
  readonly rate: number;

  @ApiProperty({ example: 3, description: 'Newbies count' })
  @IsNumber({}, { message: 'Must be a number' })
  @Min(0, { message: 'Newbies count cannot be negative' })
  readonly newbies: number;
}
