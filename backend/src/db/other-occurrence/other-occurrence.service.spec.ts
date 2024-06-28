import { Test, TestingModule } from '@nestjs/testing';
import { OtherOccurrenceService } from './other-occurrence.service';

describe('OtherOccurrenceService', () => {
  let service: OtherOccurrenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherOccurrenceService],
    }).compile();

    service = module.get<OtherOccurrenceService>(OtherOccurrenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
