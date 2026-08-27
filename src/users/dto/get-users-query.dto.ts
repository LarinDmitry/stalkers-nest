import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
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
}