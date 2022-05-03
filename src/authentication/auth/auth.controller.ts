import { Body, Req } from '@nestjs/common';

import {
  AuthController as Controller,
  CreateCustomer,
  LoginCustomer,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateCustomerBodyDto } from './dto';

interface ILoginCustomerRequest {
  customerId: string;
  customerStoreId: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateCustomer()
  createCustomer(@Body() createCustomerBodyDto: CreateCustomerBodyDto) {
    return this.authService.createCustomer(createCustomerBodyDto);
  }

  @LoginCustomer()
  loginCustomer(@Req() { user }: { user: ILoginCustomerRequest }) {
    return user;
  }
}
