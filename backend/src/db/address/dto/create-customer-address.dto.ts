import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateCustomerAddressDto extends CreateAddressDto {
  @ApiProperty({
    description: 'Cliente ID',
    example: 1,
    required: true,
  })
  @IsInt()
  customerId: number;
}
