import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDamageService } from './user-damage.service';
import { CreateUserDamageDto } from './dto/create-user-damage.dto';
import { JwtAuthGuard } from '../admin/jwt-auth.guard';

@ApiTags('User Damage')
@Controller('user-damage')
export class UserDamageController {
  constructor(private userDamageService: UserDamageService) {}

  @ApiOperation({ summary: 'Get damage info for a SPECIFIC user' })
  @ApiParam({ name: 'userId', example: 1 })
  @Get(':userId')
  getUserDamageInfo(@Param('userId', ParseIntPipe) userId: number) {
    return this.userDamageService.getUserDamageInfo(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create or update (upsert) damage record for user' })
  @Patch()
  upsert(@Body() dto: CreateUserDamageDto) {
    return this.userDamageService.upsertDamageRecord(dto);
  }

  @ApiOperation({ summary: 'Get damage info for ALL users' })
  @ApiResponse({ status: 200, description: 'Array of all users damage history' })
  @Get()
  getAllUsersDamageInfo() {
    return this.userDamageService.getAllUsersDamageInfo();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add damage record for user' })
  @Post()
  create(@Body() dto: CreateUserDamageDto) {
    return this.userDamageService.createDamageRecord(dto);
  }
}
