import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { timeToDate } from 'src/helper/timeToDate';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    if (createCustomerDto.document) {
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
    }

    const [user, company] = await Promise.all([
      this.prisma.userCompany.findFirst({
        where: {
          userId: createCustomerDto.userId,
          companyId: createCustomerDto.companyId,
        },
      }),
      this.prisma.company.findFirst({
        where: {
          id: createCustomerDto.companyId,
        },
      }),
    ]);
    if (!user || !company) {
      throw new ForbiddenException('This user does not belong to this company');
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

        if (createCustomerDto.address) {
          const address = await transaction.address.create({
            data: createCustomerDto.address,
          });

          await transaction.customerAddress.create({
            data: {
              customerId: customer.id,
              addressId: address.id,
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

  async findAllByCompanyId(companyId: number) {
    return await this.prisma.customerCompany.findMany({
      where: {
        companyId,
      },
      include: {
        customer: {
          include: { customerAddress: { include: { address: true } } },
        },
      },
    });
  }

  async findOne(customerId: number, companyId: number) {
    return await this.prisma.customerCompany.findMany({
      where: {
        customerId,
        companyId,
      },
      include: {
        customer: {
          include: { customerAddress: { include: { address: true } } },
        },
      },
    });
  }

  async findAllByUserId(userId: number) {
    return await this.prisma.customerUser.findMany({
      where: {
        userId,
      },
      include: {
        customer: {
          include: { customerAddress: { include: { address: true } } },
        },
      },
    });
  }

  async update(
    customerId: number,
    updateCustomerDto: UpdateCustomerDto,
    companyId: number,
  ) {
    const user = await this.prisma.userCompany.findFirst({
      where: {
        userId: updateCustomerDto.userId,
        companyId,
      },
    });
    if (!user) {
      throw new ForbiddenException('This user does not belong to this company');
    }
    const customerCompany = await this.prisma.customerCompany.findFirst({
      where: {
        companyId,
        customerId,
      },
    });

    if (!customerCompany) {
      throw new ForbiddenException(
        'This customer does not belong to this company',
      );
    }

    try {
      return await this.prisma.customer.update({
        where: {
          id: customerId,
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

  async softDelete(customerId: number, companyId: number) {
    const customer = await this.prisma.customerCompany.findFirst({
      where: {
        id: customerId,
        companyId,
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    try {
      const data = await this.prisma.$transaction(async (transaction) => {
        await transaction.schedule.delete({
          where: {
            customerId,
            companyId,
          },
        });
        return await transaction.customer.update({
          where: {
            id: customerId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
      });

      return data;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async hardDelete(customerId: number, companyId: number) {
    const customer = await this.prisma.customerCompany.findFirst({
      where: {
        id: customerId,
        companyId,
      },
      include: { customer: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return await this.prisma.customer.delete({
      where: {
        id: customerId,
      },
    });
  }
}
