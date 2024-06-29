import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsMilitaryTime,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateAddressDto } from 'src/db/address/dto/create-address.dto';

class Schedule {
  @ApiProperty({
    description: 'Horario de atendimento',
    example: '23:59',
    required: false,
  })
  @IsOptional()
  @IsMilitaryTime()
  time_preference: string;

  @ApiProperty({
    description: 'Proximo atendimento',
    example: '2024-06-06',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  next_return: Date;
}

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Usuario ID',
    example: 1,
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Empresa ID',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId: number;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João da Silva',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '+5511999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone1: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '+5511999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone2: string;

  @ApiProperty({
    description: 'Telefone do cliente',
    example: '+5511999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone3: string;

  @ApiProperty({
    description: 'Origem do cliente',
    example: 'Brasil',
    required: false,
  })
  @IsOptional()
  @IsString()
  origin: string;

  @ApiProperty({
    description: 'Nome do contato',
    example: 'João da Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  person: string;

  @ApiProperty({
    description: 'Concorrente',
    example: 'João da Silva',
    required: false,
  })
  @IsOptional()
  @IsString()
  competitor: string;

  @ApiProperty({
    description: 'Observações',
    example: 'Observações',
    required: false,
  })
  @IsOptional()
  @IsString()
  comments: string;

  @ApiProperty({
    description: 'Documento',
    example: 'Documento',
    required: false,
  })
  @IsOptional()
  @IsString()
  document: string;

  @ApiProperty({
    description: 'Primeiro contato',
    example: '2024-06-06',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  first_contact: Date;

  @ApiProperty({
    description: 'Último contato',
    example: '2024-06-06',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  last_contact: Date;

  @ApiProperty({
    description: 'Schedule',
    required: true,
    type: Schedule,
  })
  @Type(() => Schedule)
  schedule: Schedule;

  @ApiProperty({
    description: 'Endereço',
    required: true,
  })
  @Type(() => CreateAddressDto)
  adress: CreateAddressDto;
}
