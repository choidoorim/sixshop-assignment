import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, CustomerCustomFields } from '@prisma/client';

import { GetCustomerMeta } from './dto';

@Injectable()
export class CustomersMetaRepository {
  createMeta = (
    prismaConnection: PrismaClient,
    data: Prisma.CustomerCustomFieldsUncheckedCreateInput,
  ): Promise<CustomerCustomFields> =>
    prismaConnection.customerCustomFields.create({
      data,
    });

  getMeta = (
    prismaConnection: PrismaClient,
    store: CustomerCustomFields['store'],
  ): Promise<GetCustomerMeta[]> =>
    prismaConnection.customerCustomFields.findMany({
      where: {
        store,
      },
      select: {
        id: true,
        type: true,
        key: true,
        required: true,
      },
    });
}
