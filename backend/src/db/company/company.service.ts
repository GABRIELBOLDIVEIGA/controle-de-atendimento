import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prismaService: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const existe = await this.prismaService.company.findFirst({
      where: {
        name: createCompanyDto.name,
      },
    });

    if (existe) {
      throw new ForbiddenException('Company already exists');
    }

    const company = await this.prismaService.company.create({
      data: {
        name: createCompanyDto.name,
      },
    });

    return company;
  }

  async findOne(id: number) {
    const company = await this.prismaService.client.company.findUnique({
      where: {
        id: id,
      },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return await this.prismaService.company.update({
      where: {
        id: id,
      },
      data: {
        name: updateCompanyDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.client.company.delete({
      id: id,
    });
  }
}
