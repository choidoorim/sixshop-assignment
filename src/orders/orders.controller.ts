import { Body } from '@nestjs/common';

import { JwtToken } from '@app/utils';
import { StoreJwtRequestDto } from '@api/shared/dto';

import {
  OrdersController as Controller,
  CreateOrder,
} from './orders.controller.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @CreateOrder()
  createOrder(
    @JwtToken() { store }: StoreJwtRequestDto,
    @Body() createOrderRequestDto: CreateOrderRequestDto,
  ) {
    return this.ordersService.createOrder(createOrderRequestDto, store);
  }
}
