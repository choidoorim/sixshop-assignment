import { Injectable } from '@nestjs/common';
import { Prisma, CustomerCustomFields } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersCustomFieldsRepository {
  createCustomFields = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCustomFieldsCreateManyInput,
  ): Promise<CustomerCustomFields> => {
    return prismaConnection.customerCustomFields.create({
      data,
    });
  };
}
