import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Patch('change-password')
  // @UseGuards(AuthGuard)
  // async changePassword(@Body() changePassword: ChangePasswordDto) {
  //   const { password, ...rest } =
  //     await this.authService.changePassword(changePassword);
  //   return rest;
  // }
}
