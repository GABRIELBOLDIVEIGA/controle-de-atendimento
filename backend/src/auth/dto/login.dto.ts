import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'gabriel.boldi.dev@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '123456',
    required: true,
  })
  password: string;
}
