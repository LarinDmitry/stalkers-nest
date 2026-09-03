import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Admin Auth')
@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, description: 'Returns JWT access token' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('login')
  login(@Body() dto: LoginAdminDto) {
    return this.adminAuthService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create initial admin-auth (Registration)' })
  @ApiResponse({ status: 201, description: 'Admin created successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  register(@Body() dto: LoginAdminDto) {
    return this.adminAuthService.createAdmin(dto);
  }
}