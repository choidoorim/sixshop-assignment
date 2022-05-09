import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CustomerCustomFields, CustomerCustomFieldsData } from '@prisma/client';
import * as _ from 'lodash';

import {
  isRightType,
  validateTokenStore,
  getCustomFieldsValue,
} from '@api/shared';
import { PrismaService } from '@app/prisma';
import { BcryptService } from '@app/utils/bcrypt';

import { CustomersRepository } from './customers.repository';
import {
  CreateCustomerRequestDto,
  CustomerCustomFields as CustomFields,
  GetCustomerRequestDto,
  GetCustomerResponseDto,
} from './dto';
import { CustomersCustomFieldsService } from './custom-fields/customers-custom-fields.service';
import {
  CustomersCustomFieldsDataRepository,
  CustomersCustomFieldsRepository,
} from './custom-fields/repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersRepository: CustomersRepository,
    private readonly customersCustomFieldsService: CustomersCustomFieldsService,
    private readonly customersCustomFieldsRepository: CustomersCustomFieldsRepository,
    private readonly customersCustomFieldsDataRepository: CustomersCustomFieldsDataRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  validateCustomer = async (customerId: string) => {
    const customer = await this.customersRepository.getCustomerById(
      this.prismaService,
      customerId,
    );
    console.log(customer);
    if (!customer) {
      throw new NotFoundException('존재하지 않는 고객입니다');
    }
  };

  //NOTE: 필수 필드 체크 로직
  private validateRequiredFields = (
    customerCustomFields: CustomerCustomFields[],
    customFields: CustomFields[],
  ) => {
    customerCustomFields.forEach(({ id, required }: CustomerCustomFields) => {
      //NOTE: 필수인 커스텀필드가 있을 경우 해당 커스텀 필드 ID 가 존재하는지 체크한다
      //customerCustomFields 의 데이터들 중에 필수인 데이터들이 customFields 에 모두 있는지 확인해야 한다.
      if (required) {
        const isExisted = customFields.some(
          ({ customId }: CustomFields) => id === customId,
        );

        if (!isExisted) {
          throw new BadRequestException(
            `필수 커스텀 필드 ID - ${id} 가 누락됐습니다`,
          );
        }
      }
    });
  };

  private isExistedRequired = (
    customerCustomFields: CustomerCustomFields[],
  ): boolean => {
    const result = customerCustomFields.some(
      ({ required }: CustomerCustomFields) => required === true,
    );
    return !!result;
  };

  // NOTE: customFields 의 데이터들이 customerCustomFields 에 속해있는 데이터가 맞는지 확인해야 한다.
  // customFields 에 속한 id 와 customerCustomFields 에 존재하는 id 와 일치하는 데이터들로만 이루어져있는지 확인해야 한다.
  private validateCustomFields = (
    customerCustomFields: CustomerCustomFields[] | null,
    requestCustomFields?: CustomFields[],
  ) => {
    // NOTE: 커스텀 필드가 필요하지 않는 경우
    if (!customerCustomFields && requestCustomFields) {
      throw new BadRequestException(
        '고객 커스텀 필드 데이터가 필요하지 않습니다',
      );
    }

    if (!requestCustomFields) {
      if (this.isExistedRequired(customerCustomFields)) {
        throw new BadRequestException('고객 커스텀 필드 데이터가 필요합니다');
      }
    }

    if (customerCustomFields && requestCustomFields) {
      // NOTE: 커스텀 아이디가 모두 일치하는지 체크
      if (customerCustomFields.length !== requestCustomFields.length) {
        throw new BadRequestException('잘못된 커스텀 필드 id 가 존재합니다');
      }
      this.validateRequiredFields(customerCustomFields, requestCustomFields);

      // NOTE: Type 체크
      requestCustomFields.forEach(({ customId, value }: CustomFields) => {
        const result = customerCustomFields.find(
          ({ id }: CustomerCustomFields) => customId === id,
        );
        const { type } = result;
        if (!isRightType(value, type)) {
          throw new BadRequestException(
            '데이터의 커스텀 필드 타입이 일치하지 않습니다',
          );
        }
      });
    }
  };

  private parseCustomFields = (
    customFields: CustomFields[],
    customerId: string,
  ) =>
    customFields.map(({ customId, value }: CustomFields) => ({
      customFieldsId: customId,
      customerId,
      value: { value },
    }));

  createCustomer = async (
    { customFields, password, ...customerDto }: CreateCustomerRequestDto,
    store: string,
  ) => {
    const customerCustomFields: CustomerCustomFields[] | null =
      await this.customersCustomFieldsService.getCustomFields(store);

    await this.validateCustomFields(customerCustomFields, customFields);

    const customerData = {
      store,
      password: await this.bcryptService.generateHash(password),
      ...customerDto,
    };

    try {
      await this.prismaService.$transaction(async (prisma) => {
        const { id: customerId } =
          await this.customersRepository.createCustomer(prisma, customerData);
        if (customFields) {
          const payload = this.parseCustomFields(customFields, customerId);
          await this.customersCustomFieldsDataRepository.createCustomFieldsData(
            prisma,
            payload,
          );
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return null;
  };

  private getCustomFieldIds = (customFieldsData: CustomerCustomFieldsData[]) =>
    customFieldsData.map(
      ({ customFieldsId }: CustomerCustomFieldsData) => customFieldsId,
    );

  private getCustomFields = async (
    customerCustomFieldsData: CustomerCustomFieldsData[],
  ) => {
    // 설정된 커스텀 필드가 없을 경우
    if (_.isEmpty(customerCustomFieldsData)) {
      return null;
    }

    const customFieldIds = this.getCustomFieldIds(customerCustomFieldsData);

    // 1. customFieldsId 에 해당하는 CustomerCustomFields Table 의 key 값들을 찾아준다.
    const customFields: CustomerCustomFields[] =
      await this.customersCustomFieldsRepository.getCustomFieldsByIds(
        this.prismaService,
        customFieldIds,
      );

    // 2. 기존 CustomerCustomFieldsData 와 CustomerCustomFields 의 customFieldsId 와 id 가 같은 값들을 매칭해서 key-value 를 찾아준다.
    return customerCustomFieldsData.map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ({ id, customFieldsId, value }: CustomerCustomFieldsData) => {
        const { key } = customFields.find(
          ({ id }: CustomerCustomFields) => customFieldsId === id,
        );
        return {
          customFieldsDataId: id,
          key,
          value: getCustomFieldsValue(value),
        };
      },
    );
  };

  getCustomer = async (
    { customerId }: GetCustomerRequestDto,
    store: string,
  ): Promise<GetCustomerResponseDto> => {
    const customer = await this.customersRepository.getCustomerWithCustomFields(
      this.prismaService,
      customerId,
    );

    if (!customer) {
      throw new NotFoundException();
    }

    const {
      id,
      email,
      name,
      store: customerStore,
      CustomerCustomFieldsData: customerCustomFieldsData,
    } = customer;

    validateTokenStore(store, customerStore);

    return {
      id,
      email,
      name,
      customFields: await this.getCustomFields(customerCustomFieldsData),
    };
  };
}
