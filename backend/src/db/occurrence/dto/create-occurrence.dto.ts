import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOccurrenceDto {
  @ApiProperty({
    description: 'Nome da ocorrência',
    example: 'Occurrence 1',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Empresa Id',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId: number;
}
