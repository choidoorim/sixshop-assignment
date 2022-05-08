import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  CustomersCustomFieldsController as Controller,
  CreateCustomerCustomField,
  GetCustomerCustomFields,
  DeleteCustomerCustomFields,
} from './customers-custom-fields.controller.decorator';
import { CustomersCustomFieldsService } from './customers-custom-fields.service';
import { Body, Param } from '@nestjs/common';
import {
  CreateCustomersCustomFieldsRequestDto,
  GetCustomersCustomFieldsResponseDto,
  DeleteCustomerCustomFieldsRequestDto,
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

  @DeleteCustomerCustomFields()
  deleteCustomerCustomFields(
    @Param()
    deleteCustomerCustomFieldsRequestDto: DeleteCustomerCustomFieldsRequestDto,
    @JwtToken() { store }: AdminJwtRequestDto,
  ) {
    return deleteCustomerCustomFieldsRequestDto;
  }
}
