import { Body } from '@nestjs/common';

import { JwtToken } from '@app/utils';
import { AdminJwtRequestDto } from '@api/shared/dto';

import {
  OrdersController as Controller,
  CreateOrder,
} from './orders.controller.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @CreateOrder()
  createOrder(
    @JwtToken() { store }: AdminJwtRequestDto,
    @Body() createOrderRequestDto: CreateOrderRequestDto,
  ) {
    return this.ordersService.createOrder(createOrderRequestDto, store);
  }
}
