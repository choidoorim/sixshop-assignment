import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

import { CustomersMetaRepository } from './customers-meta.repository';
import { CreateCustomerMetaFieldBodyRequestDto } from './dto';

@Injectable()
export class CustomersMetaService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersMetaRepository: CustomersMetaRepository,
  ) {}

  createCustomerMeta = (
    createCustomerMetaField: CreateCustomerMetaFieldBodyRequestDto,
    customerId: string,
  ) => {
    const payload = { ...createCustomerMetaField, customerId };
    return payload;
  };
}
