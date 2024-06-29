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
  @ApiProperty({
    description: 'Empresa do usuário',
    example: 1,
    required: true,
  })
  @IsInt()
  companyId: number;
}
