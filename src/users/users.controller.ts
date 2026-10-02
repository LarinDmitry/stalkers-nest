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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './users.model';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { SortOrder, UserSortField } from './enums/user-sort-field';
import { JwtAuthGuard } from '../admin/jwt-auth.guard';

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
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page, 1-100 (default: 10)',
  })
  @ApiResponse({ status: 200, description: 'Paginated users: { data: User[], meta }' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  getAll(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUsers(query);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  createUser(@Body() dto: CreateUserDto, @Req() req: any) {
    return this.usersService.createUser(dto, req.user?.login);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', example: 1, description: 'User ID' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: any,
  ) {
    return this.usersService.updateUser(id, updateUserDto, req.user.login);
  }
}
