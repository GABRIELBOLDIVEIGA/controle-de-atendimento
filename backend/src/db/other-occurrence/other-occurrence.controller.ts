import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OtherOccurrenceService } from './other-occurrence.service';
import { CreateOtherOccurrenceDto } from './dto/create-other-occurrence.dto';
import { UpdateOtherOccurrenceDto } from './dto/update-other-occurrence.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('OtherOccurrence')
@Controller('other-occurrence')
export class OtherOccurrenceController {
  constructor(
    private readonly otherOccurrenceService: OtherOccurrenceService,
  ) {}

  @Post()
  create(@Body() createOtherOccurrenceDto: CreateOtherOccurrenceDto) {
    return this.otherOccurrenceService.create(createOtherOccurrenceDto);
  }

  @Get()
  findAll() {
    return this.otherOccurrenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.otherOccurrenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOtherOccurrenceDto: UpdateOtherOccurrenceDto,
  ) {
    return this.otherOccurrenceService.update(+id, updateOtherOccurrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.otherOccurrenceService.remove(+id);
  }
}
