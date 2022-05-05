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
    store: string,
  ) => {
    const payload = { ...createCustomerMetaField, store };
    return payload;
  };
}
