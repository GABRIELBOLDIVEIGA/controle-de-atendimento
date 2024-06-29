import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { OtherOccurrenceService } from './other-occurrence.service';
import { CreateOtherOccurrenceDto } from './dto/create-other-occurrence.dto';
import { UpdateOtherOccurrenceDto } from './dto/update-other-occurrence.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('OtherOccurrence')
@ApiBearerAuth('JWT-auth')
@Controller('other-occurrence')
export class OtherOccurrenceController {
  constructor(
    private readonly otherOccurrenceService: OtherOccurrenceService,
  ) {}

  // @Post()
  // create(@Body() createOtherOccurrenceDto: CreateOtherOccurrenceDto) {
  //   return this.otherOccurrenceService.create(createOtherOccurrenceDto);
  // }
  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createOtherOccurrenceDto: CreateOtherOccurrenceDto,
    @Req() req,
  ) {
    if (
      req.user.companyId != createOtherOccurrenceDto.companyId ||
      req.user.role != Role.ADMIN
    ) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.otherOccurrenceService.create(createOtherOccurrenceDto);
  }

  // @Get()
  // findAll() {
  //   return this.otherOccurrenceService.findAllByCompanyId();
  // }

  @Get('company/:companyId')
  @UseGuards(AuthGuard)
  findAll(@Param('companyId', ParseIntPipe) companyId: number, @Req() req) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.otherOccurrenceService.findAllByCompanyId(companyId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.otherOccurrenceService.findOne(+id);
  // }

  @Get(':otherOccurrenceId')
  @UseGuards(AuthGuard)
  findOne(
    @Param('otherOccurrenceId', ParseIntPipe) otherOccurrenceId: number,
    @Req() req,
  ) {
    return this.otherOccurrenceService.findOne(
      otherOccurrenceId,
      req.user.companyId,
    );
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateOtherOccurrenceDto: UpdateOtherOccurrenceDto,
  // ) {
  //   return this.otherOccurrenceService.update(+id, updateOtherOccurrenceDto);
  // }

  @Patch(':otherOccurrenceId')
  @UseGuards(AuthGuard)
  update(
    @Param('otherOccurrenceId', ParseIntPipe) otherOccurrenceId: number,
    @Body() updateOtherOccurrenceDto: UpdateOtherOccurrenceDto,
    @Req() req,
  ) {
    if (req.user.companyId != updateOtherOccurrenceDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    return this.otherOccurrenceService.update(
      otherOccurrenceId,
      updateOtherOccurrenceDto,
    );
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.otherOccurrenceService.remove(+id);
  // }

  @Delete(':otherOccurrenceId/:companyId')
  @UseGuards(AuthGuard)
  remove(
    @Param('otherOccurrenceId', ParseIntPipe) otherOccurrenceId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.otherOccurrenceService.remove(otherOccurrenceId, companyId);
  }
}
