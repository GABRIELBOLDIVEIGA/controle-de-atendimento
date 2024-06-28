import { DefaultValuePipe } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    type: String,
    example: 'Nome do cliente',
    required: true,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    type: String,
    example: 'email@email.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    type: String,
    example: '999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  tel1?: string;

  @ApiProperty({
    type: String,
    example: '999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  tel2?: string;

  @ApiProperty({
    type: String,
    example: '999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  tel3?: string;

  @ApiProperty({
    type: String,
    example: '999999999',
    required: false,
  })
  @IsOptional()
  @IsString()
  cep?: string;

  @ApiProperty({
    type: String,
    example: 'Rua',
    required: false,
  })
  @IsOptional()
  @IsString()
  logradouro?: string;

  @ApiProperty({
    type: String,
    example: 'Apto',
    required: false,
  })
  @IsOptional()
  @IsString()
  complemento?: string;

  @ApiProperty({
    type: String,
    example: 'Bairro',
    required: false,
  })
  @IsOptional()
  @IsString()
  bairro?: string;

  @ApiProperty({
    type: String,
    example: 'Localidade',
    required: false,
  })
  @IsOptional()
  @IsString()
  localidade?: string;

  @ApiProperty({
    type: String,
    example: 'UF',
    required: false,
  })
  @IsOptional()
  @IsString()
  uf?: string;

  @ApiProperty({
    type: String,
    example: 'Numero',
    required: false,
  })
  @IsOptional()
  @IsString()
  numero?: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ativo?: number;

  @ApiProperty({
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  preferencia_horario?: Date;

  @ApiProperty({
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  primeiro_contato?: Date;

  @ApiProperty({
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  ultimo_contato?: Date;

  @ApiProperty({
    type: Date,
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  proximo_contato?: Date;

  @ApiProperty({
    type: String,
    example: 'Origem',
    required: false,
  })
  @IsOptional()
  @IsString()
  origem?: string;

  @ApiProperty({
    type: String,
    example: 'Observações',
    required: false,
  })
  @IsOptional()
  @IsString()
  obs?: string;

  @ApiProperty({
    type: String,
    example: 'Contato',
    required: false,
  })
  @IsOptional()
  @IsString()
  contato?: string;

  @ApiProperty({
    type: String,
    example: 'Concorrente',
    required: false,
  })
  @IsOptional()
  @IsString()
  concorrente?: string;

  @ApiProperty({
    type: String,
    example: 'Cnpj',
    required: false,
  })
  @IsString()
  cnpj: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsInt()
  empresaId: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsInt()
  usuarioId: number;
}
