import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalCustomerAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import {
  CreateCustomerBodyRequestDto,
  LoginCustomerRequestDto,
  LoginCustomerResponseDto,
} from './dto';

export const AuthCustomerController = () =>
  applyDecorators(
    Controller({ path: 'auth/customers' }),
    ApiTags('auth-customers'),
  );

export const CreateCustomer = () =>
  applyDecorators(
    Post('/register'),
    ApiDoc({
      summary: 'Customer 회원가입 API',
      createdRes: {
        description: 'Customer 회원가입 성공',
        schema: {},
      },
      bodyOptions: { type: CreateCustomerBodyRequestDto },
    }),
  );

export const LoginCustomer = () =>
  applyDecorators(
    Post('/login'),
    LocalCustomerAuth(),
    ApiDoc({
      summary: 'Customer 로그인 API',
      createdRes: {
        description: 'Customer 로그인 성공',
        type: LoginCustomerResponseDto,
      },
      bodyOptions: { type: LoginCustomerRequestDto },
    }),
  );
