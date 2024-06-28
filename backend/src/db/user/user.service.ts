import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existe = await this.prismaService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existe) {
      throw new ForbiddenException('User already exists');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new ForbiddenException('Passwords do not match');
    }

    const hash_password = await bcrypt.hash(createUserDto.password, 12);

    const { password, ...user } = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash_password,
        role: createUserDto.role,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateUserDto.name,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
