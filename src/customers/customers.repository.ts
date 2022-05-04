import { Injectable } from '@nestjs/common';
import { PrismaClient, Customer, Prisma } from '@prisma/client';

@Injectable()
export class CustomersRepository {
  findByEmail = (
    prismaConnection: PrismaClient,
    email: string,
  ): Promise<Customer | null> =>
    prismaConnection.customer.findUnique({
      where: {
        email,
      },
    });

  createCustomer = (
    prismaConnection: PrismaClient,
    data: Prisma.CustomerUncheckedCreateInput,
  ): Promise<Customer> =>
    prismaConnection.customer.create({
      data,
    });
}
