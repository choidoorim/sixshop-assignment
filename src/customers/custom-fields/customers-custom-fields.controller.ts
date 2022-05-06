import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  CustomersCustomFieldsController as Controller,
  CreateCustomerCustomField,
  GetCustomerCustomFields,
} from './customers-custom-fields.controller.decorator';
import { CustomersCustomFieldsService } from './customers-custom-fields.service';
import { Body } from '@nestjs/common';
import {
  CreateCustomersCustomFieldsRequestDto,
  GetCustomersCustomFieldsResponseDto,
} from './dto';

@Controller()
export class CustomersCustomFieldsController {
  constructor(
    private readonly customersCustomFieldsService: CustomersCustomFieldsService,
  ) {}

  @CreateCustomerCustomField()
  createCustomerCustomField(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Body()
    createCustomersCustomFieldsRequestDto: CreateCustomersCustomFieldsRequestDto,
  ) {
    return this.customersCustomFieldsService.createCustomFields(
      createCustomersCustomFieldsRequestDto,
      store,
    );
  }

  @GetCustomerCustomFields()
  async getCustomerCustomFields(@JwtToken() { store }: AdminJwtRequestDto) {
    return new GetCustomersCustomFieldsResponseDto({
      customFields: await this.customersCustomFieldsService.getCustomFields(
        store,
      ),
    });
  }
}
