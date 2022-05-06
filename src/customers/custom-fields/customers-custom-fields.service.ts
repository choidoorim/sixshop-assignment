import { Injectable } from '@nestjs/common';

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
}
