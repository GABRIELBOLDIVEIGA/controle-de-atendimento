import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'Inicio do contato',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  start: Date;

  @ApiProperty({
    description: 'Fim do contato',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  end: Date;

  @ApiProperty({
    description: 'Comentarios do contato',
    example: 'Comentários do contato',
    required: true,
  })
  @IsOptional()
  @IsString()
  comments: string;

  @ApiProperty({
    description: 'Empresa ID',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId: number;

  @ApiProperty({
    description: 'Cliente ID',
    example: 1,
    required: true,
  })
  @IsInt()
  customerId: number;

  @ApiProperty({
    description: 'Usuario ID',
    example: 1,
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Ocorrencia ID',
    example: 1,
    required: true,
  })
  @IsInt()
  occurenceId: number;

  @ApiProperty({
    description: 'Ocorrencia secundaria ID',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  otherOccurenceId?: number;

  @ApiProperty({
    description: 'Próximo retorno',
    example: '2021-01-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  next_return: Date;

  @ApiProperty({
    description: 'Preferência de horário',
    example: '00:00',
    required: true,
  })
  @IsMilitaryTime()
  time_preference: string;
}
