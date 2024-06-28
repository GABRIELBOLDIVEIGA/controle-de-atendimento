import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientExtended } from './custom-prisma-client.service';

@Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
export class PrismaService
  extends PrismaClientExtended
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}
