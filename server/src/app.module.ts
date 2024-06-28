import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { env } from './config/configuration';
import { ClienteModule } from './db/cliente/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => env],
    }),
    PrismaModule,

    AuthModule,

    ClienteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
