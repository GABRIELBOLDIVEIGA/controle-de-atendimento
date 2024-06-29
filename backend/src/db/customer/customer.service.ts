import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { timeToDate } from 'src/helper/timeToDate';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const existe = await this.prisma.customerCompany.findFirst({
      where: {
        companyId: createCustomerDto.companyId,
        customer: {
          document: createCustomerDto.document,
        },
      },
      include: { customer: true },
    });
    if (existe) {
      throw new ForbiddenException('This customer already exists');
    }

    try {
      const resut = await this.prisma.$transaction(async (transaction) => {
        const customer = await transaction.customer.create({
          data: {
            name: createCustomerDto.name,
            email: createCustomerDto.email,
            phone1: createCustomerDto.phone1,
            phone2: createCustomerDto.phone2,
            phone3: createCustomerDto.phone3,
            origin: createCustomerDto.origin,
            person: createCustomerDto.person,
            competitor: createCustomerDto.competitor,
            comments: createCustomerDto.comments,
            first_contact: createCustomerDto.first_contact
              ? new Date(createCustomerDto.first_contact)
              : null,
            last_contact: createCustomerDto.last_contact
              ? new Date(createCustomerDto.last_contact)
              : null,
            document: createCustomerDto.document,
          },
        });

        await transaction.customerCompany.create({
          data: {
            customerId: customer.id,
            companyId: createCustomerDto.companyId,
          },
        });

        await transaction.customerUser.create({
          data: {
            userId: createCustomerDto.userId,
            customerId: customer.id,
          },
        });

        if (
          createCustomerDto.schedule.next_return &&
          createCustomerDto.schedule.time_preference
        ) {
          await transaction.schedule.create({
            data: {
              time_preference: timeToDate(
                createCustomerDto.schedule.time_preference,
              ),
              next_return: new Date(createCustomerDto.schedule.next_return),
              customerId: customer.id,
              companyId: createCustomerDto.companyId,
              userId: createCustomerDto.userId,
            },
          });
        }

        if (createCustomerDto.adress) {
          const adress = await transaction.adress.create({
            data: createCustomerDto.adress,
          });

          await transaction.customerAdress.create({
            data: {
              customerId: customer.id,
              addressId: adress.id,
            },
          });
        }

        return customer;
      });

      return resut;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    try {
      return await this.prisma.customer.update({
        where: {
          id: id,
        },
        data: {
          name: updateCustomerDto.name,
          email: updateCustomerDto.email,
          phone1: updateCustomerDto.phone1,
          phone2: updateCustomerDto.phone2,
          phone3: updateCustomerDto.phone3,
          origin: updateCustomerDto.origin,
          person: updateCustomerDto.person,
          competitor: updateCustomerDto.competitor,
          comments: updateCustomerDto.comments,
          first_contact: updateCustomerDto.first_contact
            ? new Date(updateCustomerDto.first_contact)
            : null,
          last_contact: updateCustomerDto.last_contact
            ? new Date(updateCustomerDto.last_contact)
            : null,
          document: updateCustomerDto.document,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  // private timeToDate(str: string) {
  //   const [hour, minute] = str.split(':');

  //   return new Date(
  //     `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} ${hour}:${minute}`,
  //   );
  // }
}
