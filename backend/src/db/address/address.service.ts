import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createCustomerAddress(
    createCustomerAddressDto: CreateCustomerAddressDto,
    companyId: number,
  ) {
    const customer = await this.prisma.customerCompany.findFirst({
      where: {
        id: createCustomerAddressDto.customerId,
        companyId,
      },
    });

    if (!customer) {
      throw new ForbiddenException(
        'This customer does not belong to this company',
      );
    }

    try {
      const address = await this.prisma.$transaction(async (transaction) => {
        const newAddress = await transaction.address.create({
          data: {
            cep: createCustomerAddressDto.cep,
            logradouro: createCustomerAddressDto.logradouro,
            complemento: createCustomerAddressDto.complemento,
            bairro: createCustomerAddressDto.bairro,
            localidade: createCustomerAddressDto.localidade,
            uf: createCustomerAddressDto.uf,
            numero: createCustomerAddressDto.numero,
          },
        });

        await transaction.customerAddress.create({
          data: {
            customerId: customer.id,
            addressId: newAddress.id,
          },
        });

        return newAddress;
      });

      return address;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCustomerAddresses(customerId: number) {
    const customerAddress = await this.prisma.customerAddress.findFirst({
      where: {
        customerId,
      },
      include: { address: true },
    });

    if (!customerAddress) {
      throw new NotFoundException('Customer address not found');
    }

    return customerAddress;
  }

  async update(
    addressId: number,
    updateAddressDto: UpdateAddressDto,
    customerId: number,
  ) {
    const address = await this.prisma.customerAddress.findFirst({
      where: {
        addressId,
        customerId,
      },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    try {
      return await this.prisma.address.update({
        where: {
          id: addressId,
        },
        data: {
          cep: updateAddressDto.cep,
          logradouro: updateAddressDto.logradouro,
          complemento: updateAddressDto.complemento,
          bairro: updateAddressDto.bairro,
          localidade: updateAddressDto.localidade,
          uf: updateAddressDto.uf,
          numero: updateAddressDto.numero,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(addressId: number, companyId: number) {
    const address = await this.prisma.customerAddress.findFirst({
      where: {
        addressId,
      },
      include: { customer: { select: { customerCompany: true } } },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    address.customer.customerCompany.forEach((item) => {
      if (item.companyId !== companyId) {
        throw new ForbiddenException(
          'This address does not belong to this company',
        );
      }
    });

    return await this.prisma.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
