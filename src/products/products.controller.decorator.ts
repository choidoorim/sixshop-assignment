import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ProductsController = () =>
  applyDecorators(Controller({ path: 'products' }), ApiTags('products'));
