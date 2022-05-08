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

// NOTE: 타입을 한 번 설정하면 수정은 할 수 없도록 하였다.
@Controller()
export class CustomersCustomFieldsController {
  constructor(
    private readonly customersCustomFieldsService: CustomersCustomFieldsService,
  ) {}

  @GetCustomerCustomFields()
  async getCustomerCustomFields(@JwtToken() { store }: AdminJwtRequestDto) {
    return new GetCustomersCustomFieldsResponseDto({
      customFields: await this.customersCustomFieldsService.getCustomFields(
        store,
      ),
    });
  }

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

  @DeleteCustomerCustomFields()
  deleteCustomerCustomFields(
    @Param()
    deleteCustomerCustomFieldsRequestDto: DeleteCustomerCustomFieldsRequestDto,
    @JwtToken() { store }: AdminJwtRequestDto,
  ) {
    return this.customersCustomFieldsService.deleteCustomField(
      deleteCustomerCustomFieldsRequestDto,
      store,
    );
  }
}
