import { JwtToken } from '@app/utils';
import { Body, Param } from '@nestjs/common';

import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  CustomersController as Controller,
  CreateCustomer,
  GetCustomer,
} from './customers.controller.decorator';
import { CustomersService } from './customers.service';
import { CreateCustomerRequestDto } from './dto';
import { GetCustomerRequestDto, GetCustomerResponseDto } from './dto';

@Controller()
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @CreateCustomer()
  createCustomer(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Body() createCustomerRequestDto: CreateCustomerRequestDto,
  ) {
    return this.customersService.createCustomer(
      createCustomerRequestDto,
      store,
    );
  }

  @GetCustomer()
  async getCustomer(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Param() getCustomerRequestDto: GetCustomerRequestDto,
  ) {
    const result = await this.customersService.getCustomer(
      getCustomerRequestDto,
      store,
    );
    return new GetCustomerResponseDto(result);
  }
}
