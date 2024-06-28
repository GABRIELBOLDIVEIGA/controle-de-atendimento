import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Email',
    example: 'gabriel.boldi.dev@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Old password',
    example: 'ABC123',
    required: true,
  })
  old_password: string;

  @ApiProperty({
    description: 'New password',
    example: '123456',
    required: true,
  })
  new_password: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: '123456',
    required: true,
  })
  confirm_password: string;
}
