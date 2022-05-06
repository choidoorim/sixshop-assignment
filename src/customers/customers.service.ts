import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomerCustomFields } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { CustomersRepository } from './customers.repository';
import { CreateCustomerRequestDto, CustomFields } from './dto';
import { CustomersCustomFieldsService } from './custom-fields/customers-custom-fields.service';
import { CustomersCustomFieldsDataRepository } from './custom-fields/repository';
import { TCreateCustomerCustomFieldsData } from './type';

@Injectable()
export class CustomersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly customersRepository: CustomersRepository,
    private readonly customersCustomFieldsService: CustomersCustomFieldsService,
    private readonly customersCustomFieldsDataRepository: CustomersCustomFieldsDataRepository,
  ) {}

  // NOTE: customFields 의 데이터들이 customerCustomFields 에 속해있는 데이터가 맞는지 확인해야 한다.
  private validateCustomFields = (
    customerCustomFields: CustomerCustomFields[] | null,
    customFields?: CustomFields[],
  ) => {
    if (!customerCustomFields && customFields) {
      throw new BadRequestException(
        '고객 커스텀 필드 데이터가 필요하지 않습니다',
      );
    }
    if (customerCustomFields && !customFields) {
      throw new BadRequestException('고객 커스텀 필드 데이터가 필요합니다');
    }

    if (customerCustomFields && customFields) {
      this.validateRequiredFields(customerCustomFields, customFields);

      customFields.forEach(({ customId }: CustomFields) => {
        const isMatched = customerCustomFields.find(
          ({ id }: CustomerCustomFields) => customId === id,
        );
        if (!isMatched) {
          throw new BadRequestException('잘못된 커스텀 필드 id 가 존재합니다');
        }
      });
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
        const isExisted = customFields.find(
          ({ customId }: CustomFields) => id === customId,
        );

        if (!isExisted) {
          throw new BadRequestException('필수 커스텀 필드가 누락됐습니다');
        }
      }
    });
  };

  private parseCustomFields = (
    customFields: CustomFields[],
    customerId: string,
  ): TCreateCustomerCustomFieldsData[] =>
    customFields.map(({ customId, value }: CustomFields) => ({
      customFieldsId: customId,
      customerId,
      value,
    }));

  createCustomer = async (
    { customFields, ...customerDto }: CreateCustomerRequestDto,
    store: string,
  ) => {
    const customerCustomFields: CustomerCustomFields[] | null =
      await this.customersCustomFieldsService.getCustomFields(store);

    await this.validateCustomFields(customerCustomFields, customFields);

    const customerData = { store, ...customerDto };

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
}
