import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const CustomerController = () =>
  applyDecorators(Controller({ path: 'customer' }), ApiTags('customer'));
