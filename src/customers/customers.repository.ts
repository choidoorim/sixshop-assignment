import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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

  getCustomerWithCustomFields = (
    prismaConnection: PrismaConnection,
    customerId: string,
  ): Promise<TCustomerWithCustomFields | null> =>
    prismaConnection.customer.findUnique({
      where: {
        id: customerId,
      },
      include: {
        CustomerCustomFieldsData: true,
      },
    });

  getCustomerById = (prismaConnection: PrismaConnection, customerId: string) =>
    prismaConnection.customer.findUnique({
      where: {
        id: customerId,
      },
    });

  getCustomerByEmail = (prismaConnection: PrismaConnection, email: string) =>
    prismaConnection.customer.findUnique({
      where: {
        email,
      },
    });
}
