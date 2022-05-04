import {
  CustomerMetaController as Controller,
  CreateMetaField,
} from './customers.controller.decorator';
import { Body } from '@nestjs/common';

import { CustomerJwtRequestDto } from '@api/shared/dto';
import { JwtToken } from '@app/utils';

import { CreateCustomerMetaFieldRequestBodyDto } from './dto';

@Controller()
export class CustomersMetaController {
  @CreateMetaField()
  createMetaField(
    @Body() createCustomerMetaField: CreateCustomerMetaFieldRequestBodyDto,
    @JwtToken() { customerId }: CustomerJwtRequestDto,
  ) {
    return createCustomerMetaField;
  }
}
