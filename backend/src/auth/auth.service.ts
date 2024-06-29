import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const userCompany = await this.prismaService.userCompany.findFirst({
      where: {
        user: {
          email: loginDto.email,
        },
      },
      include: {
        user: true,
      },
    });

    if (!userCompany) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      userCompany.user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: userCompany.user.id,
      name: userCompany.user.name,
      email: userCompany.user.email,
      companyId: userCompany.companyId,
      role: userCompany.user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  // async changePassword(changePasswordDto: ChangePasswordDto) {
  //   const user = await this.prismaService.user.findUnique({
  //     where: {
  //       email: changePasswordDto.email,
  //     },
  //   });

  //   if (!user) {
  //     throw new BadRequestException('Invalid credentials');
  //   }

  //   const isPasswordCorrect = await bcrypt.compare(
  //     changePasswordDto.oldPassword,
  //     user.password,
  //   );

  //   if (!isPasswordCorrect) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  // }
}
