import { Injectable } from '@nestjs/common';
import { Prisma, Customer, CustomerCustomFieldsData } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

import { TCustomerWithCustomFields } from './type';

@Injectable()
export class CustomersRepository {
  createCustomer = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCreateManyInput,
  ) =>
    prismaConnection.customer.create({
      data,
    });

  getCustomer = (
    prismaConnection: PrismaConnection,
    customerId: string,
  ): Promise<TCustomerWithCustomFields | null> =>
    prismaConnection.customer.findFirst({
      where: {
        id: customerId,
      },
      include: {
        CustomerCustomFieldsData: true,
      },
    });
}
