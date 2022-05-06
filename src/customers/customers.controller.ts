import { JwtToken } from '@app/utils';
import { Body } from '@nestjs/common';

import { StoreJwtRequestDto } from '@api/shared/dto';

import {
  CustomersController as Controller,
  CreateCustomer,
} from './customers.controller.decorator';
import { CustomersService } from './customers.service';
import { CreateCustomerRequestDto } from './dto';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @CreateCustomer()
  createCustomer(
    @JwtToken() { store }: StoreJwtRequestDto,
    @Body() createCustomerRequestDto: CreateCustomerRequestDto,
  ) {
    return this.customersService.createCustomer(
      createCustomerRequestDto,
      store,
    );
  }
}
