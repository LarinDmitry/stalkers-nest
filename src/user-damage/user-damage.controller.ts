import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDamageService } from './user-damage.service';
import { CreateUserDamageDto } from './dto/create-user-damage.dto';
import { UpdateUserDamageDto } from './dto/update-user-damage.dto';

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

  @ApiOperation({ summary: 'Update specific damage record by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID of the damage record' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDamageDto,
  ) {
    return this.userDamageService.updateDamageRecord(id, dto);
  }

  @ApiOperation({ summary: 'Get damage info for ALL users' })
  @ApiResponse({ status: 200, description: 'Array of all users damage history' })
  @Get()
  getAllUsersDamageInfo() {
    return this.userDamageService.getAllUsersDamageInfo();
  }

  @ApiOperation({ summary: 'Add damage record for user' })
  @Post()
  create(@Body() dto: CreateUserDamageDto) {
    return this.userDamageService.createDamageRecord(dto);
  }
}
