import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get('company/:companyId')
  findAllByCompanyId(@Param('companyId', ParseIntPipe) companyId: number) {
    return this.contactService.findAllByCompanyId(companyId);
  }

  @Get('customer/:customerId')
  findAllByCustomerId(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.contactService.findAllByCustomerId(customerId);
  }

  @Get('user/:userId')
  findAllByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.contactService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }
}
