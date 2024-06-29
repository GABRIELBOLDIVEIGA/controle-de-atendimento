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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateAdmUserDto } from './dto/create-adm-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create User with USER role',
    description:
      'To create a new user you need to be logged in as ADM and have the company ID',
  })
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    if (req.user.role != Role.ADMIN) {
      throw new ForbiddenException('User does not have the ROLE ADMIN');
    }

    if (req.user.companyId != createUserDto.companyId) {
      throw new ForbiddenException(
        'User does not have permission to create user in this company',
      );
    }

    return this.userService.createUser(createUserDto);
  }

  @Post('adm')
  @ApiOperation({
    summary: 'Create User with ADM role',
    description: 'Create User with ADM role',
  })
  createAdmUser(@Body() createAdmUserDto: CreateAdmUserDto) {
    return this.userService.createAdm(createAdmUserDto);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findAll(@Req() req) {
    if (req.user.companyId) {
      return this.userService.findAll();
    }

    throw new ForbiddenException('User does not have access to this resource');
  }

  @Get(':userId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  remove(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.remove(userId);
  }
}
