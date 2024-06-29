import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('company/:companyId')
  findAll(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.scheduleService.findAllByCompanyId(companyId);
  }

  @Get('customer/:customerId')
  findOne(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.scheduleService.findOneByCustomerId(customerId);
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.scheduleService.findAllByUserId(userId);
  }

  @Patch(':companyId/:customerId')
  update(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(
      companyId,
      customerId,
      updateScheduleDto,
    );
  }

  @Delete(':companyId/:customerId')
  remove(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    return this.scheduleService.remove(companyId, customerId);
  }
}
