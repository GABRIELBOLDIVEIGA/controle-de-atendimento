import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('Customer')
@ApiBearerAuth('JWT-auth')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCustomerDto: CreateCustomerDto, @Req() req) {
    if (req.user.companyId != createCustomerDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.customerService.create(createCustomerDto);
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard)
  findAll(@Param('companyId', ParseIntPipe) companyId: number, @Req() req) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.customerService.findAllByCompanyId(companyId);
  }

  @Get(':customerId')
  @UseGuards(AuthGuard)
  findOne(@Param('customerId', ParseIntPipe) customerId: number, @Req() req) {
    return this.customerService.findOne(customerId, req.user.companyId);
  }

  @Patch(':customerId')
  @UseGuards(AuthGuard)
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Req() req,
  ) {
    return this.customerService.update(
      customerId,
      updateCustomerDto,
      req.user.companyId,
    );
  }

  @Delete(':customerId/:companyId')
  @UseGuards(AuthGuard)
  softDelete(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.customerService.softDelete(customerId, req.user.companyId);
  }

  @Delete('hard-delete/:customerId/:companyId')
  @UseGuards(AuthGuard)
  hardDelete(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.role != Role.ADMIN) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.customerService.hardDelete(customerId, companyId);
  }
}
