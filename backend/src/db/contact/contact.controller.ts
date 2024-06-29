import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('Contact')
@ApiBearerAuth('JWT-auth')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createContactDto: CreateContactDto, @Req() req) {
    if (req.user.companyId != createContactDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    if (req.user.userId != createContactDto.userId) {
      throw new ForbiddenException(
        'User can not create contact for other user',
      );
    }

    return this.contactService.create(createContactDto);
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard)
  findAllByCompanyId(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Req() req,
  ) {
    if (req.user.companyId != companyId || req.user.role != Role.ADMIN) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    return this.contactService.findAllByCompanyId(companyId);
  }

  @Get('customer/:customerId')
  @UseGuards(AuthGuard)
  findAllByCustomerId(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Req() req,
  ) {
    return this.contactService.findAllByCustomerId(
      customerId,
      req.user.companyId,
    );
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
  findAllByUserId(@Param('userId', ParseIntPipe) userId: number, @Req() req) {
    if (req.user.role === Role.ADMIN) {
      return this.contactService.findAllByUserId(userId, req.user.companyId);
    }

    return this.contactService.findAllByUserId(
      req.user.userId,
      req.user.companyId,
    );
  }

  @Get(':contactId')
  @UseGuards(AuthGuard)
  findOne(@Param('contactId', ParseIntPipe) contactId: number, @Req() req) {
    return this.contactService.findOne(contactId, req.user.companyId);
  }
}
