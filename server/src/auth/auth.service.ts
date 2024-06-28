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
    return '123';
    // const user = await this.userService.findOne(loginDto.email);

    // if (!user || !bcrypt.compareSync(loginDto.password, user.password)) {
    //   throw new UnauthorizedException();
    // }

    // const { password, ...result } = user;

    // return {
    //   access_token: await this.jwtService.signAsync(result),
    // };
  }

  // async changePassword(changePasswordDto: ChangePasswordDto) {
  //   if (changePasswordDto.old_password === changePasswordDto.new_password) {
  //     throw new BadRequestException(
  //       'New password cannot be the same as old password',
  //     );
  //   }

  //   const user = await this.userService.findOne(changePasswordDto.email);

  //   if (
  //     !user ||
  //     !bcrypt.compareSync(changePasswordDto.old_password, user.password)
  //   ) {
  //     throw new UnauthorizedException();
  //   }

  //   if (changePasswordDto.new_password !== changePasswordDto.confirm_password) {
  //     throw new BadRequestException('Passwords do not match');
  //   }

  //   return await this.prismaService.user.update({
  //     where: { id: user.id },
  //     data: {
  //       password: this.userService.generateHash(changePasswordDto.new_password),
  //     },
  //   });
  // }
}
