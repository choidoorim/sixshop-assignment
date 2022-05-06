import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtTokenAuth } from '@app/utils/guard/jwt-token-auth.guard';
import { ApiDoc } from '@app/config/decorator';

import { CreateCustomerRequestDto } from './dto';

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
