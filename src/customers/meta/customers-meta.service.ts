import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { PrismaService } from '@app/prisma';

import { CustomersMetaRepository } from './customers-meta.repository';

import { CreateCustomerMetaFieldBodyRequestDto, GetCustomerMeta } from './dto';

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

  getMeta = async (store: string): Promise<GetCustomerMeta[] | null> => {
    const result = await this.customersMetaRepository.getMeta(
      this.prismaService,
      store,
    );

    return _.isEmpty(result) ? null : result;
  };
}
