import { applyDecorators, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtTokenAuth } from '@app/utils/guard/jwt-token-auth.guard';
import { ApiDoc } from '@app/config/decorator';

import { CreateCustomerRequestDto } from './dto';
import { GetCustomerResponseDto } from './dto/get-customer-response.dto';

export const CustomersController = () =>
  applyDecorators(Controller({ path: 'customers' }), ApiTags('customers'));

export const CreateCustomer = () =>
  applyDecorators(
    Post(),
    JwtTokenAuth(),
    ApiDoc({
      summary: '고객 생성 API',
      createdRes: {
        schema: {},
      },
      bodyOptions: { type: CreateCustomerRequestDto },
    }),
  );

export const GetCustomer = () =>
  applyDecorators(
    Get('/:customerId'),
    JwtTokenAuth(),
    ApiDoc({
      summary: '고객 정보 조회 API',
      createdRes: {
        type: GetCustomerResponseDto,
      },
    }),
  );

export const UpdateCustomer = () =>
  applyDecorators(
    Put('/:customerId'),
    JwtTokenAuth(),
    ApiDoc({
      summary: '고객 정보 수정 API',
    }),
  );
