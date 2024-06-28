import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'joao@email.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123456',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: 'Confirmação da senha',
    example: '123456',
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  confirmPassword: string;

  @ApiProperty({
    description: 'Role do usuário',
    example: 'USER',
    required: true,
    enum: Role,
  })
  @IsEnum(Role)
  role: Role;
}
