import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  CustomersCustomFieldsController as Controller,
  CreateCustomerCustomField,
  GetCustomerCustomFields,
  DeleteCustomerCustomFields,
  UpdateCustomerCustomFieldsType,
  UpdateCustomerCustomFields,
} from './customers-custom-fields.controller.decorator';
import { CustomersCustomFieldsService } from './customers-custom-fields.service';
import { Body, Param } from '@nestjs/common';
import {
  CreateCustomersCustomFieldsRequestDto,
  GetCustomersCustomFieldsResponseDto,
  DeleteCustomersCustomFieldsRequestDto,
  UpdateCustomersCustomFieldsTypeParamRequestDto,
  UpdateCustomersCustomFieldsTypeBodyRequestDto,
  UpdateCustomersCustomFieldsParamRequestDto,
  UpdateCustomersCustomFieldsBodyRequestDto,
} from './dto';

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
    deleteCustomerCustomFieldsRequestDto: DeleteCustomersCustomFieldsRequestDto,
    @JwtToken() { store }: AdminJwtRequestDto,
  ) {
    return this.customersCustomFieldsService.deleteCustomField(
      deleteCustomerCustomFieldsRequestDto,
      store,
    );
  }

  @UpdateCustomerCustomFieldsType()
  updateCustomerCustomFieldsType(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Param()
    paramDto: UpdateCustomersCustomFieldsTypeParamRequestDto,
    @Body() bodyDto: UpdateCustomersCustomFieldsTypeBodyRequestDto,
  ) {
    return this.customersCustomFieldsService.updateTypeOfCustomField(
      store,
      paramDto,
      bodyDto,
    );
  }

  @UpdateCustomerCustomFields()
  updateCustomerCustomFields(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Param() paramDto: UpdateCustomersCustomFieldsParamRequestDto,
    @Body() bodyDto: UpdateCustomersCustomFieldsBodyRequestDto,
  ) {
    return this.customersCustomFieldsService.updateCustomerField(
      store,
      paramDto,
      bodyDto,
    );
  }
}
