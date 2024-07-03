import {
  Controller,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  Post,
  Get,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';

@ApiTags('Address')
@ApiBearerAuth('JWT-auth')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('customer-address')
  @UseGuards(AuthGuard)
  createCustomerAddress(
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
    @Req() req,
  ) {
    return this.addressService.createCustomerAddress(
      createCustomerAddressDto,
      req.user.companyId,
    );
  }

  @Get('customer-address/:customerId')
  @UseGuards(AuthGuard)
  getCustomerAddresses(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.addressService.getCustomerAddresses(customerId);
  }

  @Patch(':addressId/:customerId')
  @UseGuards(AuthGuard)
  update(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(addressId, updateAddressDto, customerId);
  }

  @Delete(':addressId')
  @UseGuards(AuthGuard)
  remove(@Param('addressId', ParseIntPipe) addressId: number, @Req() req) {
    return this.addressService.remove(addressId, req.user.companyId);
  }
}
