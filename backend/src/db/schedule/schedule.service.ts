import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { timeToDate } from 'src/helper/timeToDate';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const [companyCustomer, scheduleCustomer, userCompany] = await Promise.all([
      this.prisma.customerCompany.findFirst({
        where: {
          customerId: createScheduleDto.customerId,
          companyId: createScheduleDto.companyId,
        },
        include: {
          company: true,
          customer: true,
        },
      }),
      this.prisma.schedule.findFirst({
        where: {
          customerId: createScheduleDto.customerId,
          companyId: createScheduleDto.companyId,
        },
      }),
      this.prisma.userCompany.findFirst({
        where: {
          userId: createScheduleDto.userId,
          companyId: createScheduleDto.companyId,
        },
      }),
    ]);

    if (!companyCustomer)
      throw new NotFoundException('Company or Customer not found');

    if (!userCompany) throw new NotFoundException('User or Company not found');

    if (!scheduleCustomer) {
      return await this.prisma.schedule.create({
        data: {
          customerId: createScheduleDto.customerId,
          companyId: createScheduleDto.companyId,
          userId: createScheduleDto.userId,
          time_preference: timeToDate(createScheduleDto.time_preference),
          next_return: new Date(createScheduleDto.next_return),
        },
      });
    }

    if (scheduleCustomer) {
      return this.update(
        createScheduleDto.companyId,
        createScheduleDto.customerId,
        {
          time_preference: createScheduleDto.time_preference,
          next_return: createScheduleDto.next_return,
        },
      );
    }
  }

  async findAllByCompanyId(companyId: number) {
    return await this.prisma.schedule.findMany({
      where: {
        companyId: companyId,
      },
      include: { customer: true, user: { select: { id: true, name: true } } },
    });
  }

  async findAllByUserId(userId: number, companyId: number) {
    return await this.prisma.schedule.findMany({
      where: {
        userId,
        companyId,
      },
      include: { customer: true, user: { select: { id: true, name: true } } },
    });
  }

  async findOneByCustomerId(customerId: number, companyId: number) {
    return await this.prisma.schedule.findFirst({
      where: {
        customerId,
        companyId,
      },
      include: { customer: true, user: { select: { id: true, name: true } } },
    });
  }

  async update(
    companyId: number,
    customerId: number,
    updateScheduleDto: UpdateScheduleDto,
  ) {
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        customerId: customerId,
        companyId: companyId,
      },
    });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return await this.prisma.schedule.update({
      where: {
        customerId: customerId,
        companyId: companyId,
      },
      data: {
        time_preference: timeToDate(updateScheduleDto.time_preference),
        next_return: new Date(updateScheduleDto.next_return),
      },
    });
  }

  async remove(companyId: number, customerId: number, userId: number) {
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        customerId,
        companyId,
        userId,
      },
    });

    if (!schedule) throw new NotFoundException('Schedule not found');

    try {
      return await this.prisma.schedule.delete({
        where: {
          customerId,
          companyId,
          userId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async admRevome(companyId: number, customerId: number) {
    const schedule = await this.prisma.schedule.findFirst({
      where: {
        customerId,
        companyId,
      },
    });

    if (!schedule) throw new NotFoundException('Schedule not found');

    try {
      return await this.prisma.schedule.delete({
        where: {
          customerId: customerId,
          companyId: companyId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
