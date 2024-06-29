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
  constructor(private readonly adressService: AddressService) {}

  @Post('customer-address')
  @UseGuards(AuthGuard)
  createCustomerAddress(
    @Body() createCustomerAddressDto: CreateCustomerAddressDto,
    @Req() req,
  ) {
    return this.adressService.createCustomerAddress(
      createCustomerAddressDto,
      req.user.companyId,
    );
  }

  @Patch(':addressId')
  @UseGuards(AuthGuard)
  update(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() updateAdressDto: UpdateAddressDto,
    @Req() req,
  ) {
    return this.adressService.update(
      addressId,
      updateAdressDto,
      req.user.companyId,
    );
  }

  @Delete(':addressId')
  @UseGuards(AuthGuard)
  remove(@Param('addressId', ParseIntPipe) addressId: number, @Req() req) {
    return this.adressService.remove(addressId, req.user.companyId);
  }
}
