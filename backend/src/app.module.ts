import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { env } from './config/configuration';
import { AdressModule } from './db/adress/adress.module';
import { OccurrenceModule } from './db/occurrence/occurrence.module';
import { OtherOccurrenceModule } from './db/other-occurrence/other-occurrence.module';
import { CompanyModule } from './db/company/company.module';
import { ScheduleModule } from './db/schedule/schedule.module';
import { ContactModule } from './db/contact/contact.module';
import { UserModule } from './db/user/user.module';
import { CustomerModule } from './db/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => env],
    }),
    PrismaModule,

    AuthModule,

    AdressModule,

    OccurrenceModule,

    OtherOccurrenceModule,

    CompanyModule,

    ScheduleModule,

    ContactModule,

    UserModule,

    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
