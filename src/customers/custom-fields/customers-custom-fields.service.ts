import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerCustomFields } from '@prisma/client';
import * as _ from 'lodash';

import { PrismaService } from '@app/prisma';
import { validateTokenStore } from '@api/shared';

import {
  CustomersCustomFieldsDataRepository,
  CustomersCustomFieldsRepository,
} from './repository';
import {
  CreateCustomersCustomFieldsRequestDto,
  DeleteCustomerCustomFieldsRequestDto,
} from './dto';

// NOTE: 커스텀 필드 데이터를 update 할 때는, 이미 존재하는 커스텀 필드는 추가하지 못하게 해야한다.
@Injectable()
export class CustomersCustomFieldsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersCustomFieldsRepository: CustomersCustomFieldsRepository,
    private readonly customersCustomFieldsDataRepository: CustomersCustomFieldsDataRepository,
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

  deleteCustomField = async (
    { customFieldId }: DeleteCustomerCustomFieldsRequestDto,
    store: string,
  ) => {
    const customFields =
      await this.customersCustomFieldsRepository.getCustomFieldById(
        this.prismaService,
        customFieldId,
      );

    if (!customFields) {
      throw new NotFoundException();
    }
    validateTokenStore(store, customFields.store);

    try {
      await this.customersCustomFieldsRepository.deleteCustomFields(
        this.prismaService,
        customFieldId,
      );

      return null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  };
}
