import { Body, Req } from '@nestjs/common';

import { JwtToken } from '@app/utils';
import { CustomerJwtRequestDto } from '@api/shared/dto';

import {
  AuthController as Controller,
  CreateCustomer,
  LoginCustomer,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateCustomerBodyDto, LoginCustomerResponseDto } from './dto';
import { ILoginCustomerRequest } from './type';
import { JwtAuth } from './guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateCustomer()
  createCustomer(@Body() createCustomerBodyDto: CreateCustomerBodyDto) {
    return this.authService.createCustomer(createCustomerBodyDto);
  }

  @LoginCustomer()
  async loginCustomer(@Req() { user }: { user: ILoginCustomerRequest }) {
    return new LoginCustomerResponseDto({
      accessToken: await this.authService.login(user),
    });
  }

  // @JwtAuth()
  // @Get('/test')
  // test(@JwtToken() { customerId }: CustomerJwtRequestDto) {
  //   return customerId;
  // }
}
