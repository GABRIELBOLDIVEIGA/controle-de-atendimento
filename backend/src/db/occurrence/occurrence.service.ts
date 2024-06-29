import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new ForbiddenException('This occurrence already exists');
    }

    return await this.prisma.occurrence.create({
      data: {
        name: createOccurrenceDto.name,
        companyId: createOccurrenceDto.companyId,
      },
    });
  }

  async findAllByCompanyId(companyId: number) {
    return await this.prisma.client.occurrence.findMany({
      where: {
        companyId,
      },
    });
  }

  async findOne(occurrenceId: number, companyId: number) {
    const occurence = await this.prisma.client.occurrence.findFirst({
      where: {
        id: occurrenceId,
        companyId,
      },
      include: { company: true },
    });
    if (!occurence) {
      throw new NotFoundException('Occurrence not found');
    }

    return;
  }

  async update(id: number, updateOccurrenceDto: UpdateOccurrenceDto) {
    const occurrence = await this.prisma.occurrence.findFirst({
      where: {
        name: updateOccurrenceDto.name,
        companyId: updateOccurrenceDto.companyId,
      },
    });
    if (occurrence) {
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

  async remove(occurrenceId: number, companyId: number) {
    const occurence = await this.prisma.client.occurrence.findFirst({
      where: {
        id: occurrenceId,
        companyId,
      },
    });

    if (!occurence) {
      throw new NotFoundException('Occurrence not found');
    }

    return await this.prisma.client.occurrence.delete({
      id: occurrenceId,
      companyId,
    });
  }
}
