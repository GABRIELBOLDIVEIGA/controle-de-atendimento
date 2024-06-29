import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdressService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, updateAdressDto: UpdateAdressDto) {
    try {
      return await this.prisma.adress.update({
        where: {
          id: id,
        },
        data: updateAdressDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    return await this.prisma.adress.delete({
      where: {
        id: id,
      },
    });
  }
}
