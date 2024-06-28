import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';

export class CreateManyClienteDto {
  @ApiProperty({
    type: [CreateClienteDto],
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => CreateClienteDto)
  many: CreateClienteDto[];
}
