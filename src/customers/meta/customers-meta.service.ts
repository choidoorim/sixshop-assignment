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

  createCustomerMeta = async (
    createCustomerMetaField: CreateCustomerMetaFieldBodyRequestDto,
    store: string,
  ) => {
    const payload = { ...createCustomerMetaField, store };
    await this.customersMetaRepository.createMeta(this.prismaService, payload);
    return null;
  };
}
