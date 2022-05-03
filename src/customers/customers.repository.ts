import { Injectable } from '@nestjs/common';

import { PrismaClient, Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomersRepository {
  findUserByEmail(
    prismaConnection: PrismaClient,
    email: string,
  ): Promise<Customer | null> {
    return prismaConnection.customer.findUnique({
      where: {
        email,
      },
    });
  }

  createCustomer(
    prismaConnection: PrismaClient,
    { name, email, password }: Prisma.CustomerCreateInput,
  ): Promise<Customer> {
    return prismaConnection.customer.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
