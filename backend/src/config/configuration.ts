import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const env = {
  environment: configService.getOrThrow('NODE_ENV'),
  port: parseInt(configService.getOrThrow('PORT')),
  secret: configService.getOrThrow('JWT_SECRET'),

  database: {
    databaseUrl: configService.getOrThrow('DATABASE_URL'),
    host: configService.getOrThrow('MYSQL_HOST'),
    port: parseInt(configService.getOrThrow('MYSQL_PORT')),
    userName: configService.getOrThrow('MYSQL_USER_NAME'),
    password: configService.getOrThrow('MYSQL_PASSWORD'),
    database: configService.getOrThrow('MYSQL_DATA_BASE'),
  },
};

export { env };
