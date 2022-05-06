import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { PrismaService } from '@app/prisma';

import { CustomersCustomFieldsRepository } from './customers-custom-fields.repository';
import { CreateCustomersCustomFieldsRequestDto } from './dto';

@Injectable()
export class CustomersCustomFieldsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersCustomFieldsRepository: CustomersCustomFieldsRepository,
  ) {}

  createCustomFields = async (
    createCustomersCustomFieldsRequestDto: CreateCustomersCustomFieldsRequestDto,
    store: string,
  ) => {
    const payload = { ...createCustomersCustomFieldsRequestDto, store };
    await this.customersCustomFieldsRepository.createCustomFields(
      this.prismaService,
      payload,
    );

    return null;
  };

  getCustomFields = async (store: string) => {
    const result = await this.customersCustomFieldsRepository.getCustomFields(
      this.prismaService,
      store,
    );

    return _.isEmpty(result) ? null : result;
  };
}
