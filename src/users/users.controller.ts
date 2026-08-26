import { Body, Controller, Post, Get, Patch, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiResponse, ApiOperation, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users with optional isActive filter' })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filter users by isActive status',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(@Query('isActive') isActive?: string) {
    const filterActive = isActive !== undefined ? isActive === 'true' : undefined;
    return this.usersService.getAllUsers(filterActive);
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
