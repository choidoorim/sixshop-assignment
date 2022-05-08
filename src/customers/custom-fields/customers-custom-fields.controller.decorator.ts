import { applyDecorators, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAdminAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import {
  CreateCustomersCustomFieldsRequestDto,
  GetCustomersCustomFieldsResponseDto,
} from './dto';

export const CustomersCustomFieldsController = () =>
  applyDecorators(
    Controller({ path: 'customers/custom-fields' }),
    ApiTags('customers-custom'),
  );

export const CreateCustomerCustomField = () =>
  applyDecorators(
    Post(),
    JwtAdminAuth(),
    ApiDoc({
      summary: '고객 커스텀 필드 추가 API',
      createdRes: {
        description: '고객 커스텀 필드 추가 성공',
        schema: {},
      },
      bodyOptions: { type: CreateCustomersCustomFieldsRequestDto },
    }),
  );

export const GetCustomerCustomFields = () =>
  applyDecorators(
    Get(),
    JwtAdminAuth(),
    ApiDoc({
      summary: '고객 커스텀 필드 조회 API',
      okRes: {
        type: GetCustomersCustomFieldsResponseDto,
      },
    }),
  );

export const DeleteCustomerCustomFields = () =>
  applyDecorators(
    Delete('/:customFieldId'),
    JwtAdminAuth(),
    ApiDoc({
      summary: '고객 커스텀 필드 삭제 API',
      description: '',
    }),
  );
