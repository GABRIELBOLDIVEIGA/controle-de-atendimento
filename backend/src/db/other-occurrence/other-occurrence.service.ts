import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new ForbiddenException('This occurrence already exists');
    }

    return await this.prisma.otherOccurrence.create({
      data: {
        name: createOtherOccurrenceDto.name,
        companyId: createOtherOccurrenceDto.companyId,
      },
    });
  }

  async findAllByCompanyId(companyId: number) {
    return await this.prisma.client.otherOccurrence.findMany({
      where: {
        companyId,
      },
    });
  }

  async findOne(occurrenceId: number, companyId: number) {
    const occurence = await this.prisma.client.otherOccurrence.findFirst({
      where: {
        id: occurrenceId,
        companyId,
      },
      include: { company: true },
    });
    if (!occurence) {
      throw new NotFoundException('Occurrence not found');
    }

    return occurence;
  }

  async update(id: number, updateOtherOccurrenceDto: UpdateOtherOccurrenceDto) {
    const occurrence = await this.prisma.otherOccurrence.findFirst({
      where: {
        name: updateOtherOccurrenceDto.name,
        companyId: updateOtherOccurrenceDto.companyId,
      },
    });
    if (occurrence) {
      throw new BadRequestException('This occurrence already exists');
    }

    const belongCompany = await this.prisma.otherOccurrence.findFirst({
      where: {
        id: id,
        companyId: updateOtherOccurrenceDto.companyId,
      },
    });
    if (!belongCompany) {
      throw new BadRequestException(
        'This occurrence does not belong to this company',
      );
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

  async remove(occurrenceId: number, companyId: number) {
    const occurence = await this.prisma.client.otherOccurrence.findFirst({
      where: {
        id: occurrenceId,
        companyId,
      },
    });

    if (!occurence) {
      throw new NotFoundException('Occurrence not found');
    }

    return await this.prisma.client.otherOccurrence.delete({
      id: occurrenceId,
      companyId,
    });
  }
}
