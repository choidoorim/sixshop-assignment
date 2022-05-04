import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalCustomerAuth } from '@app/utils/guard';

export const AuthCustomerController = () =>
  applyDecorators(
    Controller({ path: 'auth/customers' }),
    ApiTags('auth-customers'),
  );

export const CreateCustomer = () => applyDecorators(Post('/register'));

export const LoginCustomer = () =>
  applyDecorators(Post('/login'), LocalCustomerAuth());
