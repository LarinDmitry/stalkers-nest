import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatisticSortBy {
  ID = 'id',
  DATE = 'date',
}

export class GetStatsQueryDto {
  @ApiPropertyOptional({
    name: 'limit',
    type: Number,
    description: 'Number of recent months to fetch (if omitted, returns all records)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    name: 'sortBy',
    enum: StatisticSortBy,
    default: StatisticSortBy.ID,
    description: 'Sort strategy: by ID or by Date',
  })
  @IsOptional()
  @IsEnum(StatisticSortBy)
  sortBy?: StatisticSortBy = StatisticSortBy.ID;
}