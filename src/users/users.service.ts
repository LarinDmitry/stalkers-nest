import { Injectable, NotFoundException } from '@nestjs/common';
import { WhereOptions, Order } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQueryDto } from './dto/get-users-query.dto';
import { UserSortField, SortOrder } from './enums/user-sort-field';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto, adminLogin?: string) {
    return await this.userRepository.create({
      ...dto,
      updatedBy: adminLogin,
    });
  }

  async getAllUsers(query: GetUsersQueryDto) {
    const {
      isActive,
      sortBy = UserSortField.ID,
      sortOrder = SortOrder.ASC,
      page = 1,
      limit = 10,
    } = query;
    const where: WhereOptions<User> = {};

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    const order: Order = [[sortBy, sortOrder.toUpperCase()]];

    const { rows, count } = await this.userRepository.findAndCountAll({
      where,
      order,
      limit,
      offset: (page - 1) * limit,
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto, adminLogin: string) {
    const user = await this.getUserById(id);
    await user.update({ ...dto, updatedBy: adminLogin });
    return user;
  }
}
