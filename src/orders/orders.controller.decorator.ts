import { applyDecorators, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAdminAuth } from '@app/utils/guard';
import { ApiDoc } from '@app/config/decorator';
import { CreateOrderRequestDto } from './dto';

export const OrdersController = () =>
  applyDecorators(Controller({ path: 'orders' }), ApiTags('orders'));

export const CreateOrder = () =>
  applyDecorators(
    Post(),
    JwtAdminAuth(),
    ApiDoc({
      summary: '상품 주문 API',
      bodyOptions: { type: CreateOrderRequestDto },
    }),
  );
