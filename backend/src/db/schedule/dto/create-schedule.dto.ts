import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsMilitaryTime } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({
    description: 'Horario de preferencia para atendimento',
    example: '10:00',
    required: true,
  })
  @IsMilitaryTime()
  time_preference: string;

  @ApiProperty({
    description: 'Proximo retorno',
    example: '2021-05-01T00:00:00.000Z',
    required: true,
  })
  @IsDateString()
  next_return: Date;

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
}
