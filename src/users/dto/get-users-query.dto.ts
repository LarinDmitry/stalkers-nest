import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsEnum, IsInt, Min, Max } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SortOrder, UserSortField } from '../enums/user-sort-field';

export class GetUsersQueryDto {
  @ApiPropertyOptional({ example: true, description: 'Filter users by active status' })
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 'isActive must be a boolean' })
  readonly isActive?: boolean;

  @ApiPropertyOptional({
    enum: UserSortField,
    example: UserSortField.STARS,
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsEnum(UserSortField, {
    message: `sortBy must be one of: ${Object.values(UserSortField).join(', ')}`,
  })
  readonly sortBy?: UserSortField = UserSortField.ID;

  @ApiPropertyOptional({
    enum: SortOrder,
    example: SortOrder.ASC,
    description: 'Sort direction (asc or desc)',
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'sortOrder must be asc or desc' })
  readonly sortOrder?: SortOrder = SortOrder.ASC;

  @ApiPropertyOptional({ example: 1, minimum: 1, default: 1, description: 'Page number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  readonly page?: number = 1;

  @ApiPropertyOptional({
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    description: 'Items per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit must be at most 100' })
  readonly limit?: number = 10;
}