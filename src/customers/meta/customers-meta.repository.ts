import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, CustomerCustomFields } from '@prisma/client';

@Injectable()
export class CustomersMetaRepository {
  createMeta = (
    prismaConnection: PrismaClient,
    data: Prisma.CustomerCustomFieldsUncheckedCreateInput,
  ): Promise<CustomerCustomFields> =>
    prismaConnection.customerCustomFields.create({
      data,
    });
}
