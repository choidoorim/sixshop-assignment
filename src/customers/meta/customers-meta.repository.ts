import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, CustomerMeta } from '@prisma/client';

@Injectable()
export class CustomersMetaRepository {
  createMeta = (
    prismaConnection: PrismaClient,
    data: Prisma.CustomerMetaUncheckedCreateInput,
  ): Promise<CustomerMeta> =>
    prismaConnection.customerMeta.create({
      data,
    });
}
