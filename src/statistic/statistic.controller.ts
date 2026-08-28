import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticService } from './statistic.service';
import { Statistic } from './statistic.model';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { GetStatsQueryDto } from './dto/get-stats-query.dto';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @ApiOperation({ summary: 'Get statistic records' })
  @ApiResponse({ status: 200, type: [Statistic] })
  @Get()
  getStats(@Query() query: GetStatsQueryDto) {
    return this.statisticService.getRecentStats(query.limit, query.sortBy);
  }

  @ApiOperation({ summary: 'Add monthly statistic record' })
  @ApiResponse({ status: 201, type: Statistic })
  @Post()
  create(@Body() dto: CreateStatisticDto) {
    return this.statisticService.createStatistic(dto);
  }

  @ApiOperation({ summary: 'Update monthly statistic record' })
  @ApiParam({ name: 'id', example: 1, description: 'Statistic record ID' })
  @ApiResponse({ status: 200, type: Statistic })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStatisticDto) {
    return this.statisticService.updateStatistic(id, dto);
  }

  @ApiOperation({ summary: 'Delete monthly statistic record' })
  @ApiParam({ name: 'id', example: 1, description: 'Statistic record ID' })
  @ApiResponse({ status: 204, description: 'Record successfully deleted' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.statisticService.deleteStatistic(id);
  }
}
