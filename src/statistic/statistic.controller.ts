import {
  Body,
  Controller,
  Get,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { StatisticService } from './statistic.service';
import { Statistic } from './statistic.model';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @ApiOperation({ summary: 'Get statistic records' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of recent months to fetch (if omitted, returns all records)',
  })
  @ApiResponse({ status: 200, type: [Statistic] })
  @Get()
  getStats(
    @Query('limit', new DefaultValuePipe(undefined), new ParseIntPipe({ optional: true }))
    limit?: number,
  ) {
    return this.statisticService.getRecentStats(limit);
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
}
