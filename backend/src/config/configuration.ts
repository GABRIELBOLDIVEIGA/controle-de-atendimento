import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

const env = {
  environment: configService.getOrThrow('NODE_ENV'),
  port: parseInt(configService.getOrThrow('PORT')),
  secret: configService.getOrThrow('JWT_SECRET'),
};

export { env };
