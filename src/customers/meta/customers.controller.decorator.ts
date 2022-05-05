import { applyDecorators, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtStoreAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import {
  CreateCustomerMetaFieldBodyRequestDto,
  GetCustomerMetaResponseDto,
} from './dto';

export const CustomerMetaController = () =>
  applyDecorators(Controller({ path: 'customer' }), ApiTags('customer-meta'));

export const CreateMetaField = () =>
  applyDecorators(
    Post('/meta'),
    JwtStoreAuth(),
    ApiDoc({
      summary: '고객 커스텀 필드 생성 API',
      createdRes: {
        description: '고객 커스텀 필드 생성 성공',
        schema: {},
      },
      bodyOptions: { type: CreateCustomerMetaFieldBodyRequestDto },
    }),
  );

export const GetCustomerMetaField = () =>
  applyDecorators(
    Get('/meta'),
    JwtStoreAuth(),
    ApiDoc({
      summary: '상점 - 고객 커스텀 필드 조회 API',
      okRes: {
        description: '상점 - 고객 커스텀 필드 조회 API',
        type: GetCustomerMetaResponseDto,
      },
    }),
  );
