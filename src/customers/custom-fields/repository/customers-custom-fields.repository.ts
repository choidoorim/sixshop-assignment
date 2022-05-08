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

  getCustomFieldById = (prismaConnection: PrismaConnection, id: string) =>
    prismaConnection.customerCustomFields.findUnique({
      where: {
        id,
      },
    });

  getCustomFieldsByIds = (
    prismaConnection: PrismaConnection,
    customFieldIds: string[],
  ): Promise<CustomerCustomFields[]> =>
    prismaConnection.customerCustomFields.findMany({
      where: {
        id: { in: customFieldIds },
      },
    });

  deleteCustomFields = (
    prismaConnection: PrismaConnection,
    customFieldId: string,
  ) =>
    prismaConnection.customerCustomFields.delete({
      where: {
        id: customFieldId,
      },
    });
}
