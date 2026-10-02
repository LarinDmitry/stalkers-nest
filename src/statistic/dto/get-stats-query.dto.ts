import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum StatisticSortBy {
  ID = 'id',
  DATE = 'date',
}

export class GetStatsQueryDto {
  @ApiPropertyOptional({
    name: 'limit',
    type: Number,
    description:
      'Without `page`: number of recent months to fetch (if omitted, returns all records). ' +
      'With `page`: items per page (max 100, default 10)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({
    name: 'page',
    type: Number,
    minimum: 1,
    description: 'Page number. If set, response is paginated: { data, meta }',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

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