import { Injectable } from '@nestjs/common';

import { PrismaClient, Customer } from '@prisma/client';

interface ICustomer {
  name: Customer['name'];
  email: Customer['email'];
  password: Customer['password'];
}

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
    { name, email, password }: ICustomer,
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
