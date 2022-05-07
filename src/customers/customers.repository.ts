import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersRepository {
  createCustomer = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCreateManyInput,
  ) =>
    prismaConnection.customer.create({
      data,
    });

  getCustomer = (prismaConnection: PrismaConnection, customerId: string) =>
    prismaConnection.customer.findFirst({
      where: {
        id: customerId,
      },
      include: {
        CustomerCustomFieldsData: true,
      },
    });
}
