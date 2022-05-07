import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const ProductsCustomFieldsController = () =>
  applyDecorators(
    Controller({ path: 'products/custom-fields' }),
    ApiTags('products-custom'),
  );
