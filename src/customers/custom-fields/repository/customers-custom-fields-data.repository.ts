import { Injectable } from '@nestjs/common';
import { CustomerCustomFieldsData, Prisma } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersCustomFieldsDataRepository {
  createCustomFieldsData = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCustomFieldsDataCreateManyInput[],
  ) =>
    prismaConnection.customerCustomFieldsData.createMany({
      data,
    });

  deleteCustomFieldData = (
    prismaConnection: PrismaConnection,
    customFieldsId: string,
  ) => {
    prismaConnection.customerCustomFieldsData.deleteMany({
      where: {
        customFieldsId,
      },
    });
  };
}
