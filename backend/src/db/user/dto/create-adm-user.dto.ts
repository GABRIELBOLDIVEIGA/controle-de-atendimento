import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdmUserDto {
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
}
