import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateAdmUserDto } from './create-adm-user.dto';

export class CreateUserDto extends CreateAdmUserDto {
  // @ApiProperty({
  //   description: 'Nome do usuário',
  //   example: 'João Silva',
  //   required: true,
  // })
  // @IsString()
  // name: string;

  // @ApiProperty({
  //   description: 'E-mail do usuário',
  //   example: 'joao@email.com',
  //   required: true,
  // })
  // @IsEmail()
  // email: string;

  // @ApiProperty({
  //   description: 'Senha do usuário',
  //   example: '123456',
  //   required: true,
  // })
  // @IsString()
  // @MinLength(6)
  // @MaxLength(30)
  // password: string;

  // @ApiProperty({
  //   description: 'Confirmação da senha',
  //   example: '123456',
  //   required: true,
  // })
  // @IsString()
  // @MinLength(6)
  // @MaxLength(30)
  // confirmPassword: string;

  @ApiProperty({
    description: 'Empresa do usuário',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId: number;
}
