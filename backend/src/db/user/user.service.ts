import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { CreateAdmUserDto } from './dto/create-adm-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createAdm(createAdmUserDto: CreateAdmUserDto) {
    const existe = await this.prismaService.client.user.findFirst({
      where: {
        email: createAdmUserDto.email,
      },
    });

    if (existe) {
      throw new ForbiddenException('User already exists');
    }

    if (createAdmUserDto.password !== createAdmUserDto.confirmPassword) {
      throw new ForbiddenException('Passwords do not match');
    }

    const hash_password = await bcrypt.hash(createAdmUserDto.password, 12);

    const { password, ...user } = await this.prismaService.client.user.create({
      data: {
        name: createAdmUserDto.name,
        email: createAdmUserDto.email,
        password: hash_password,
        role: Role.ADMIN,
      },
    });

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const existe = await this.prismaService.client.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existe) {
      throw new ForbiddenException('User already exists');
    }

    const company = await this.prismaService.client.company.findUnique({
      where: {
        id: createUserDto.companyId,
      },
    });

    if (!company) {
      throw new ForbiddenException('Company does not exist');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new ForbiddenException('Passwords do not match');
    }

    const hash_password = await bcrypt.hash(createUserDto.password, 12);

    try {
      return await this.prismaService.$transaction(async (transaction) => {
        const { password, ...rest } = await transaction.user.create({
          data: {
            name: createUserDto.name,
            email: createUserDto.email,
            password: hash_password,
            role: Role.USER,
          },
        });

        await transaction.userCompany.create({
          data: {
            userId: rest.id,
            companyId: createUserDto.companyId,
          },
        });

        return rest;
      });
    } catch {
      throw new InternalServerErrorException('Error on transaction');
    }
  }

  async findAll() {
    return await this.prismaService.client.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.client.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.client.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.client.user.delete({ id });
  }
}
