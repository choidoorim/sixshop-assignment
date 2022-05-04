import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtCustomerAuth } from '@app/utils/guard';

export const CustomerMetaController = () =>
  applyDecorators(Controller({ path: 'customer' }), ApiTags('customer-meta'));

export const CreateMetaField = () =>
  applyDecorators(Post('/meta'), JwtCustomerAuth());
