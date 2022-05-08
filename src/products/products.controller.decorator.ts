import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtTokenAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

import { CreateProductRequestDto } from './dto';

export const ProductsController = () =>
  applyDecorators(Controller({ path: 'products' }), ApiTags('products'));

export const CreateProduct = () =>
  applyDecorators(
    Post(),
    JwtTokenAuth(),
    ApiDoc({
      summary: '상품 생성 API',
      bodyOptions: { type: CreateProductRequestDto },
    }),
  );
