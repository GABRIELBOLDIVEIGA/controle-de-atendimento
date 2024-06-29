import { Controller, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdressService } from './adress.service';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('adress')
@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    return this.adressService.update(+id, updateAdressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressService.remove(+id);
  }
}
