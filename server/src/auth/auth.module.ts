import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from '../config/configuration';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.secret,
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
