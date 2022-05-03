import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const CustomerMetaController = () =>
  applyDecorators(Controller({ path: 'customer' }), ApiTags('customer-meta'));
