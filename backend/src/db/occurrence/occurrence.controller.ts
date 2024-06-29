import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('Occurrence')
@ApiBearerAuth('JWT-auth')
@Controller('occurrence')
export class OccurrenceController {
  constructor(private readonly occurrenceService: OccurrenceService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOccurrenceDto: CreateOccurrenceDto, @Req() req) {
    if (
      req.user.companyId != createOccurrenceDto.companyId ||
      req.user.role != Role.ADMIN
    ) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.occurrenceService.create(createOccurrenceDto);
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard)
  findAll(@Param('companyId', ParseIntPipe) companyId: number, @Req() req) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.occurrenceService.findAllByCompanyId(companyId);
  }

  @Get(':occurrenceId')
  @UseGuards(AuthGuard)
  findOne(
    @Param('occurrenceId', ParseIntPipe) occurrenceId: number,
    @Req() req,
  ) {
    return this.occurrenceService.findOne(occurrenceId, req.user.companyId);
  }

  @Patch(':occurrenceId')
  @UseGuards(AuthGuard)
  update(
    @Param('occurrenceId', ParseIntPipe) occurrenceId: number,
    @Body() updateOccurrenceDto: UpdateOccurrenceDto,
    @Req() req,
  ) {
    if (req.user.companyId != updateOccurrenceDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    return this.occurrenceService.update(occurrenceId, updateOccurrenceDto);
  }

  @Delete(':occurrenceId/:companyId')
  @UseGuards(AuthGuard)
  remove(
    @Param('occurrenceId', ParseIntPipe) occurrenceId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.occurrenceService.remove(occurrenceId, companyId);
  }
}
