import { Body } from '@nestjs/common';

import {
  AuthController as Controller,
  CreateCustomer,
} from './auth.controller.decorator';
import { AuthService } from './auth.service';
import { CreateCustomerBodyDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @CreateCustomer()
  createCustomer(@Body() createCustomerBodyDto: CreateCustomerBodyDto) {
    return createCustomerBodyDto;
  }
}
