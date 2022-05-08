import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtTokenAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';

export const OrdersController = () =>
  applyDecorators(Controller({ path: 'orders' }), ApiTags('orders'));

export const CreateOrder = () =>
  applyDecorators(
    Post(),
    JwtTokenAuth(),
    ApiDoc({
      summary: '상품 주문 API',
    }),
  );
