import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAdminAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import { CreateProductRequestDto } from './dto';

export const ProductsController = () =>
  applyDecorators(Controller({ path: 'products' }), ApiTags('products'));

export const CreateProduct = () =>
  applyDecorators(
    Post(),
    JwtAdminAuth(),
    ApiDoc({
      summary: '상품 생성 API',
      createdRes: {
        schema: {},
      },
      bodyOptions: { type: CreateProductRequestDto },
    }),
  );
