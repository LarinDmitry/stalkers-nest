import { Injectable, NotFoundException } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async getAllUsers(isActive?: boolean) {
    const where: WhereOptions<User> = {};

    if (typeof isActive === 'boolean') {
      where.isActive = isActive;
    }

    return await this.userRepository.findAll({
      where,
      order: [['id', 'ASC']],
    });
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.getUserById(id);
    await user.update(dto);
    return user;
  }
}
