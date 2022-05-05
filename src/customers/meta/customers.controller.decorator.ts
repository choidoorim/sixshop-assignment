import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtStoreAuth } from '@app/utils/guard';

export const CustomerMetaController = () =>
  applyDecorators(Controller({ path: 'customer' }), ApiTags('customer-meta'));

export const CreateMetaField = () =>
  applyDecorators(Post('/meta'), JwtStoreAuth());
