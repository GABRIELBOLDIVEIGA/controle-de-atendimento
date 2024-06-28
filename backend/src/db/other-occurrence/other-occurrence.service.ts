import { Injectable } from '@nestjs/common';
import { CreateOtherOccurrenceDto } from './dto/create-other-occurrence.dto';
import { UpdateOtherOccurrenceDto } from './dto/update-other-occurrence.dto';

@Injectable()
export class OtherOccurrenceService {
  create(createOtherOccurrenceDto: CreateOtherOccurrenceDto) {
    return 'This action adds a new otherOccurrence';
  }

  findAll() {
    return `This action returns all otherOccurrence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} otherOccurrence`;
  }

  update(id: number, updateOtherOccurrenceDto: UpdateOtherOccurrenceDto) {
    return `This action updates a #${id} otherOccurrence`;
  }

  remove(id: number) {
    return `This action removes a #${id} otherOccurrence`;
  }
}
