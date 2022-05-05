import {
  CustomerMetaController as Controller,
  CreateMetaField,
} from './customers.controller.decorator';
import { Body } from '@nestjs/common';

import { StoreJwtRequestDto } from '@api/shared/dto';

import { CustomersMetaService } from './customers-meta.service';
import { CreateCustomerMetaFieldBodyRequestDto } from './dto';
import { StoreJwtToken } from '@app/utils/store.decorator';

@Controller()
export class CustomersMetaController {
  constructor(private readonly customersMetaService: CustomersMetaService) {}

  @CreateMetaField()
  createMetaField(
    @Body() createCustomerMetaField: CreateCustomerMetaFieldBodyRequestDto,
    @StoreJwtToken() { store }: StoreJwtRequestDto,
  ) {
    return this.customersMetaService.createCustomerMeta(
      createCustomerMetaField,
      store,
    );
  }
}
