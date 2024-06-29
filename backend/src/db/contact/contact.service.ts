import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    const [company, customerCompany, userCompany, occurence] =
      await Promise.all([
        this.prisma.company.findUnique({
          where: {
            id: createContactDto.companyId,
          },
        }),

        this.prisma.customerCompany.findFirst({
          where: {
            customerId: createContactDto.costumerId,
            companyId: createContactDto.companyId,
          },
          include: {
            customer: true,
          },
        }),

        this.prisma.userCompany.findFirst({
          where: {
            userId: createContactDto.userId,
            companyId: createContactDto.companyId,
          },
        }),

        this.prisma.occurrence.findUnique({
          where: {
            id: createContactDto.occurenceId,
            companyId: createContactDto.companyId,
          },
        }),
      ]);

    if (!company || !customerCompany || !userCompany || !occurence) {
      throw new NotFoundException('Element not found');
    }

    let otherOccurenceId = null;
    if (createContactDto.otherOccurenceId) {
      otherOccurenceId = await this.prisma.occurrence.findUnique({
        where: {
          id: createContactDto.occurenceId,
          companyId: createContactDto.companyId,
        },
      });
    }

    try {
      return await this.prisma.$transaction(async () => {
        const contact = await this.prisma.contact.create({
          data: {
            start: new Date(createContactDto.start),
            end: new Date(createContactDto.end),
            comments: createContactDto.comments,
            companyId: createContactDto.companyId,
            customerId: createContactDto.costumerId,
            userId: createContactDto.userId,
            occurrenceId: createContactDto.occurenceId,
            otherOccurrenceId: otherOccurenceId ? otherOccurenceId.id : null,
          },
        });

        await this.prisma.customer.update({
          where: {
            id: createContactDto.costumerId,
          },
          data: {
            ...(!customerCompany.customer.first_contact
              ? { first_contact: new Date() }
              : {}),
            last_contact: new Date(),
          },
        });
        return contact;
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllByCompanyId(companyId: number) {
    const contacts = await this.prisma.contact.findMany({
      where: {
        companyId,
      },
      include: {
        company: true,
        customer: true,
        occurrence: true,
        otherOccurrence: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return contacts;
  }
  async findAllByCustomerId(customerId: number) {
    const contacts = await this.prisma.contact.findMany({
      where: {
        customerId,
      },
      include: {
        company: true,
        customer: true,
        occurrence: true,
        otherOccurrence: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return contacts;
  }
  async findAllByUserId(userId: number) {
    const contacts = await this.prisma.contact.findMany({
      where: {
        userId,
      },
      include: {
        company: true,
        customer: true,
        occurrence: true,
        otherOccurrence: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return contacts;
  }

  async findOne(id: number) {
    const contact = await this.prisma.contact.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        customer: true,
        occurrence: true,
        otherOccurrence: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!contact) {
      throw new NotFoundException('Element not found');
    }

    return contact;
  }
}
