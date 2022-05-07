import { Injectable } from '@nestjs/common';
import { Prisma, CustomerCustomFields } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersCustomFieldsRepository {
  createCustomFields = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCustomFieldsCreateManyInput,
  ): Promise<CustomerCustomFields> =>
    prismaConnection.customerCustomFields.create({
      data,
    });

  getCustomFields = (
    prismaConnection: PrismaConnection,
    store: string,
  ): Promise<CustomerCustomFields[]> =>
    prismaConnection.customerCustomFields.findMany({
      where: {
        store,
      },
    });

  getCustomFieldsByIds = (
    prismaConnection: PrismaConnection,
    customFieldIds: string[],
  ): Promise<CustomerCustomFields[]> => {
    return prismaConnection.customerCustomFields.findMany({
      where: {
        id: { in: customFieldIds },
      },
    });
  };
}
