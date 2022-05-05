import {
  CustomerMetaController as Controller,
  CreateMetaField,
  GetCustomerMetaField,
} from './customers.controller.decorator';
import { Body } from '@nestjs/common';

import { StoreJwtRequestDto } from '@api/shared/dto';
import { JwtToken } from '@app/utils/jwt-token.decorator';

import { CustomersMetaService } from './customers-meta.service';
import {
  CreateCustomerMetaFieldBodyRequestDto,
  GetCustomerMetaResponseDto,
} from './dto';

@Controller()
export class CustomersMetaController {
  constructor(private readonly customersMetaService: CustomersMetaService) {}

  @CreateMetaField()
  createMetaField(
    @Body() createCustomerMetaField: CreateCustomerMetaFieldBodyRequestDto,
    @JwtToken() { store }: StoreJwtRequestDto,
  ) {
    return this.customersMetaService.createCustomerMeta(
      createCustomerMetaField,
      store,
    );
  }

  @GetCustomerMetaField()
  async getCustomerMetaField(@JwtToken() { store }: StoreJwtRequestDto) {
    const result = await this.customersMetaService.getMeta(store);

    return new GetCustomerMetaResponseDto({
      meta: result,
    });
  }
}
