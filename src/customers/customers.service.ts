import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

import { PrismaService } from '@app/prisma';
import { CustomersRepository } from './customers.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersRepository: CustomersRepository,
  ) {}

  findCustomerByEmail = (email: string): Promise<Customer | null> =>
    this.customersRepository.findUserByEmail(this.prismaService, email);
}
