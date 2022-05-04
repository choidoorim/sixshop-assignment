import { Body, Req } from '@nestjs/common';

import { JwtToken } from '@app/utils';
import { CustomerJwtRequestDto } from '@api/shared/dto';
import { JwtAuth } from '@app/utils/guard';

import {
  AuthCustomerController as Controller,
  CreateCustomer,
  LoginCustomer,
} from './auth-customers.controller.decorator';
import { AuthCustomersService } from './auth-customers.service';
import { CreateCustomerBodyDto, LoginCustomerResponseDto } from './dto';
import { ILoginCustomerRequest } from './type';

@Controller()
export class AuthCustomersController {
  constructor(private readonly authCustomersService: AuthCustomersService) {}

  @CreateCustomer()
  createCustomer(@Body() createCustomerBodyDto: CreateCustomerBodyDto) {
    return this.authCustomersService.createCustomer(createCustomerBodyDto);
  }

  @LoginCustomer()
  async loginCustomer(@Req() { user }: { user: ILoginCustomerRequest }) {
    return new LoginCustomerResponseDto({
      accessToken: await this.authCustomersService.login(user),
    });
  }

  // @JwtAuth()
  // @Get('/test')
  // test(@JwtToken() { customerId }: CustomerJwtRequestDto) {
  //   return customerId;
  // }
}
