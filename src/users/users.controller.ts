import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiResponse, ApiOperation, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { User } from './users.model';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { SortOrder, UserSortField } from './enums/user-sort-field';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users with optional filtering and sorting' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filter users by isActive status',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: UserSortField,
    description: 'Field to sort by (default: id)',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: SortOrder,
    description: 'Sort direction (default: asc)',
  })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUsers(query);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', example: 1, description: 'User ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
