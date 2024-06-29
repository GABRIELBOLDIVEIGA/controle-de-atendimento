import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('Schedule')
@ApiBearerAuth('JWT-auth')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createScheduleDto: CreateScheduleDto, @Req() req) {
    if (req.user.companyId != createScheduleDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.scheduleService.create(createScheduleDto);
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard)
  findAllByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId || req.user.role != Role.ADMIN) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.scheduleService.findAllByCompanyId(companyId);
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  findAllByUserId(@Param('userId', ParseIntPipe) userId: number, @Req() req) {
    return this.scheduleService.findAllByUserId(userId, req.user.companyId);
  }

  @Get('customer/:customerId')
  @UseGuards(AuthGuard)
  findOneByCustomerId(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Req() req,
  ) {
    return this.scheduleService.findOneByCustomerId(
      customerId,
      req.user.companyId,
    );
  }

  @Patch(':companyId/:customerId')
  @UseGuards(AuthGuard)
  update(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.scheduleService.update(
      companyId,
      customerId,
      updateScheduleDto,
    );
  }

  @Delete(':companyId/:customerId')
  @UseGuards(AuthGuard)
  remove(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    if (req.user.role === Role.ADMIN) {
      return this.scheduleService.admRevome(companyId, customerId);
    }

    return this.scheduleService.remove(companyId, customerId, req.user.id);
  }
}
