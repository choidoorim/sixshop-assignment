import { applyDecorators, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAdminAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import { CreateCustomerRequestDto, GetCustomerResponseDto } from './dto';

export const CustomersController = () =>
  applyDecorators(Controller({ path: 'customers' }), ApiTags('customers'));

export const CreateCustomer = () =>
  applyDecorators(
    Post(),
    JwtAdminAuth(),
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
    JwtAdminAuth(),
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
    JwtAdminAuth(),
    ApiDoc({
      summary: '고객 정보 수정 API',
    }),
  );
