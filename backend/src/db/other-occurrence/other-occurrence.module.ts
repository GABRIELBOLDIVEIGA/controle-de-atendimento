import { Module } from '@nestjs/common';
import { OtherOccurrenceService } from './other-occurrence.service';
import { OtherOccurrenceController } from './other-occurrence.controller';

@Module({
  controllers: [OtherOccurrenceController],
  providers: [OtherOccurrenceService],
})
export class OtherOccurrenceModule {}
