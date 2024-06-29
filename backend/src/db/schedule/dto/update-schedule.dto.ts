import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMilitaryTime } from 'class-validator';

export class UpdateScheduleDto {
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
}
