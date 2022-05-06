import { Injectable } from '@nestjs/common';
import { CustomerCustomFields } from '@prisma/client';
import * as _ from 'lodash';

import { PrismaService } from '@app/prisma';

import { CustomersCustomFieldsRepository } from './repository';
import { CreateCustomersCustomFieldsRequestDto } from './dto';

// NOTE: 커스텀 필드 데이터를 update 할 때는, 이미 존재하는 커스텀 필드는 추가하지 못하게 해야한다.
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

  getCustomFields = async (
    store: string,
  ): Promise<CustomerCustomFields[] | null> => {
    const result = await this.customersCustomFieldsRepository.getCustomFields(
      this.prismaService,
      store,
    );

    return _.isEmpty(result) ? null : result;
  };
}
