import { Test, TestingModule } from '@nestjs/testing';
import { OtherOccurrenceController } from './other-occurrence.controller';
import { OtherOccurrenceService } from './other-occurrence.service';

describe('OtherOccurrenceController', () => {
  let controller: OtherOccurrenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherOccurrenceController],
      providers: [OtherOccurrenceService],
    }).compile();

    controller = module.get<OtherOccurrenceController>(OtherOccurrenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
