import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin } from './admin.model';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({ where: { login: dto.login } });
    if (!admin) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, admin.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const token = await this.generateToken(admin);
    return { token };
  }

  async createAdmin(dto: LoginAdminDto) {
    const candidate = await this.adminRepository.findOne({ where: { login: dto.login } });
    if (candidate) {
      throw new ConflictException('Admin already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const admin = await this.adminRepository.create({ login: dto.login, passwordHash });
    return { id: admin.id, login: admin.login };
  }

  private async generateToken(admin: Admin) {
    const payload = { sub: admin.id, login: admin.login, role: 'admin' };
    return this.jwtService.signAsync(payload);
  }
}
