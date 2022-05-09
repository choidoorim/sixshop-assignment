import {
  ConflictException,
  ForbiddenException,
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
  DeleteCustomersCustomFieldsRequestDto,
  UpdateCustomersCustomFieldsKeyParamRequestDto,
  UpdateCustomersCustomFieldsKeyBodyRequestDto,
  UpdateCustomersCustomFieldsParamRequestDto,
  UpdateCustomersCustomFieldsBodyRequestDto,
} from './dto';

// NOTE: 커스텀 필드 데이터를 update 할 때는, 이미 존재하는 커스텀 필드는 추가하지 못하게 해야한다.
@Injectable()
export class CustomersCustomFieldsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersCustomFieldsRepository: CustomersCustomFieldsRepository,
    private readonly customersCustomFieldsDataRepository: CustomersCustomFieldsDataRepository,
  ) {}

  private validateCustomFieldsForCreate = async (
    key: string,
    store: string,
  ) => {
    const result = await this.customersCustomFieldsRepository.getCustomByKey(
      this.prismaService,
      key,
      store,
    );

    if (result) {
      throw new ConflictException('키 값이 중복됩니다');
    }
  };

  createCustomFields = async (
    createCustomersCustomFieldsRequestDto: CreateCustomersCustomFieldsRequestDto,
    store: string,
  ) => {
    await this.validateCustomFieldsForCreate(
      createCustomersCustomFieldsRequestDto.key,
      store,
    );
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

  private validateCustomFields = async (
    customFieldId: string,
    store: string,
  ) => {
    const result =
      await this.customersCustomFieldsRepository.getCustomFieldById(
        this.prismaService,
        customFieldId,
      );
    if (!result) {
      throw new NotFoundException('고객 커스텀 필드가 존재하지 않습니다');
    }
    validateTokenStore(store, result.store);
  };

  deleteCustomField = async (
    { customFieldId }: DeleteCustomersCustomFieldsRequestDto,
    store: string,
  ) => {
    await this.validateCustomFields(customFieldId, store);

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

  private validateCustomFieldsDataForUpdate = async (customFieldId: string) => {
    const customFieldData =
      await this.customersCustomFieldsDataRepository.getCustomFieldsData(
        this.prismaService,
        customFieldId,
      );

    if (customFieldData) {
      throw new ForbiddenException(
        '커스텀 필드 데이터가 존재하기에 커스텀 필드를 수정할 수 없습니다',
      );
    }
  };

  updateKeyOfCustomField = async (
    store: string,
    { customFieldId }: UpdateCustomersCustomFieldsKeyParamRequestDto,
    bodyDto: UpdateCustomersCustomFieldsKeyBodyRequestDto,
  ) => {
    await this.validateCustomFields(customFieldId, store);

    await this.customersCustomFieldsRepository.updateCustomFields(
      this.prismaService,
      customFieldId,
      bodyDto,
    );

    return null;
  };

  updateCustomerField = async (
    store: string,
    { customFieldId }: UpdateCustomersCustomFieldsParamRequestDto,
    bodyDto: UpdateCustomersCustomFieldsBodyRequestDto,
  ) => {
    await this.validateCustomFields(customFieldId, store);
    await this.validateCustomFieldsDataForUpdate(customFieldId);

    await this.customersCustomFieldsRepository.updateCustomFields(
      this.prismaService,
      customFieldId,
      bodyDto,
    );

    return null;
  };
}
