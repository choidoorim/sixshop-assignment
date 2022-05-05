import {
  CustomerMetaController as Controller,
  CreateMetaField,
} from './customers.controller.decorator';
import { Body } from '@nestjs/common';

import { CustomerJwtRequestDto } from '@api/shared/dto';
import { CustomerJwtToken } from '@app/utils';

import { CustomersMetaService } from './customers-meta.service';
import { CreateCustomerMetaFieldBodyRequestDto } from './dto';

@Controller()
export class CustomersMetaController {
  constructor(private readonly customersMetaService: CustomersMetaService) {}

  @CreateMetaField()
  createMetaField(
    @Body() createCustomerMetaField: CreateCustomerMetaFieldBodyRequestDto,
    @CustomerJwtToken() { customerId }: CustomerJwtRequestDto,
  ) {
    return customerId;
  }
}
