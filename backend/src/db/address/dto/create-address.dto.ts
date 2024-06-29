import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'CEP',
    example: '00000-000',
    required: false,
  })
  @IsOptional()
  @MaxLength(9)
  @IsString()
  cep: string;

  @ApiProperty({
    description: 'Logradouro',
    example: 'Rua João da Silva',
    required: false,
  })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  logradouro: string;

  @ApiProperty({
    description: 'Complemento',
    example: 'Apto 123',
    required: false,
  })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  complemento: string;

  @ApiProperty({
    description: 'Bairro',
    example: 'Centro',
    required: false,
  })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  bairro: string;

  @ApiProperty({
    description: 'Localidade',
    example: 'São Paulo',
    required: false,
  })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  localidade: string;

  @ApiProperty({
    description: 'UF',
    example: 'SP',
    required: false,
  })
  @IsOptional()
  @MaxLength(2)
  @IsString()
  uf: string;

  @ApiProperty({
    description: 'Número',
    example: '123',
    required: false,
  })
  @IsOptional()
  @MaxLength(10)
  @IsString()
  numero: string;
}
