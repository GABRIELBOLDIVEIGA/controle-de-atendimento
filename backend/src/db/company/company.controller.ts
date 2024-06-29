import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Company')
@ApiBearerAuth('JWT-auth')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get(':companyId')
  @UseGuards(AuthGuard)
  findOne(@Param('companyId', ParseIntPipe) companyId: number, @Req() req) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    return this.companyService.findOne(companyId);
  }

  @Patch(':companyId')
  @UseGuards(AuthGuard)
  update(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req,
  ) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }

    return this.companyService.update(companyId, updateCompanyDto);
  }

  @Delete(':companyId')
  @UseGuards(AuthGuard)
  remove(@Param('companyId', ParseIntPipe) companyId: number, @Req() req) {
    if (req.user.companyId != companyId) {
      throw new ForbiddenException(
        'User does not have permission to access this resource',
      );
    }
    return this.companyService.remove(companyId);
  }
}
