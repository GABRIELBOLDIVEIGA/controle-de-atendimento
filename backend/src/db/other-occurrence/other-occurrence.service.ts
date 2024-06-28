import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtherOccurrenceDto } from './dto/create-other-occurrence.dto';
import { UpdateOtherOccurrenceDto } from './dto/update-other-occurrence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OtherOccurrenceService {
  constructor(private prisma: PrismaService) {}

  async create(createOtherOccurrenceDto: CreateOtherOccurrenceDto) {
    const existe = await this.prisma.otherOccurrence.findFirst({
      where: {
        companyId: createOtherOccurrenceDto.companyId,
        name: createOtherOccurrenceDto.name,
      },
    });
    if (existe) {
      throw new Error('This occurrence already exists');
    }

    return await this.prisma.otherOccurrence.create({
      data: {
        name: createOtherOccurrenceDto.name,
        companyId: createOtherOccurrenceDto.companyId,
      },
    });
  }

  findAll() {
    return `This action returns all occurrence`;
  }

  async findOne(id: number) {
    return await this.prisma.client.otherOccurrence.findFirst({
      where: {
        id,
      },
      include: { company: true },
    });
  }

  async update(id: number, updateOtherOccurrenceDto: UpdateOtherOccurrenceDto) {
    const existe = await this.prisma.otherOccurrence.findFirst({
      where: {
        name: updateOtherOccurrenceDto.name,
        companyId: updateOtherOccurrenceDto.companyId,
      },
    });
    if (existe) {
      throw new BadRequestException('This occurrence already exists');
    }

    return await this.prisma.otherOccurrence.update({
      where: {
        id,
      },
      data: {
        name: updateOtherOccurrenceDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.client.otherOccurrence.delete({ id });
  }
}
