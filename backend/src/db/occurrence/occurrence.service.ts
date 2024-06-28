import { Injectable } from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';

@Injectable()
export class OccurrenceService {
  create(createOccurrenceDto: CreateOccurrenceDto) {
    return 'This action adds a new occurrence';
  }

  findAll() {
    return `This action returns all occurrence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} occurrence`;
  }

  update(id: number, updateOccurrenceDto: UpdateOccurrenceDto) {
    return `This action updates a #${id} occurrence`;
  }

  remove(id: number) {
    return `This action removes a #${id} occurrence`;
  }
}
