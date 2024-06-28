import { PartialType } from '@nestjs/swagger';
import { CreateOtherOccurrenceDto } from './create-other-occurrence.dto';

export class UpdateOtherOccurrenceDto extends PartialType(CreateOtherOccurrenceDto) {}
