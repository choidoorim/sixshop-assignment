import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersRepository {
  createCustomer = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCreateManyInput,
  ) => {
    return prismaConnection.customer.create({
      data,
    });
  };
}
