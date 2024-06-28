import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateOtherOccurrenceDto {
  @ApiProperty({
    description: 'Nome da ocorrência alternativa',
    example: 'Ocorrencia alternativa 1',
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
