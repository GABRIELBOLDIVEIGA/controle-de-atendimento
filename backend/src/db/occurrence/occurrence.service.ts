import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOccurrenceDto } from './dto/create-occurrence.dto';
import { UpdateOccurrenceDto } from './dto/update-occurrence.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OccurrenceService {
  constructor(private prisma: PrismaService) {}

  async create(createOccurrenceDto: CreateOccurrenceDto) {
    const existe = await this.prisma.occurrence.findFirst({
      where: {
        companyId: createOccurrenceDto.companyId,
        name: createOccurrenceDto.name,
      },
    });
    if (existe) {
      throw new Error('This occurrence already exists');
    }

    return await this.prisma.occurrence.create({
      data: {
        name: createOccurrenceDto.name,
        companyId: createOccurrenceDto.companyId,
      },
    });
  }

  findAll() {
    return `This action returns all occurrence`;
  }

  async findOne(id: number) {
    return await this.prisma.client.occurrence.findFirst({
      where: {
        id,
      },
      include: { company: true },
    });
  }

  async update(id: number, updateOccurrenceDto: UpdateOccurrenceDto) {
    const existe = await this.prisma.occurrence.findFirst({
      where: {
        name: updateOccurrenceDto.name,
        companyId: updateOccurrenceDto.companyId,
      },
    });
    if (existe) {
      throw new BadRequestException('This occurrence already exists');
    }

    return await this.prisma.occurrence.update({
      where: {
        id,
      },
      data: {
        name: updateOccurrenceDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.client.occurrence.delete({ id });
  }
}
