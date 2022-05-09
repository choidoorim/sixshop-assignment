import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { OrdersRepository } from './orders.repository';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { ProductsRepository } from '../products/products.repository';
import { CustomersService } from '../customers/customers.service';

enum OrderStatus {
  ORDER = 'ORDER',
  SHIPPING = 'SHIPPING',
  REFUND = 'REFUND',
  ARRIVED = 'ARRIVED',
}

@Injectable()
export class OrdersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsRepository: ProductsRepository,
    private readonly customersService: CustomersService,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  private validateProductsCount = (
    products: Product[],
    ids: string[],
  ): void => {
    if (products.length !== ids.length) {
      throw new NotFoundException('존재하지 않는 상품이 있습니다');
    }
  };

  private validateProductsPrice = (
    products: Product[],
    comparedPrice: number,
  ): void => {
    const totalPrice = products.reduce(
      (previousValue, { price }: Product) => previousValue + price,
      0,
    );

    if (totalPrice !== comparedPrice) {
      throw new BadRequestException('상품의 총 금액이 일치하지 않습니다');
    }
  };

  private validateProducts = (
    products: Product[],
    productIds: string[],
    price: number,
  ): void => {
    this.validateProductsCount(products, productIds);
    this.validateProductsPrice(products, price);
  };

  createOrder = async (
    createOrderRequestDto: CreateOrderRequestDto,
    store: string,
  ) => {
    const {
      products: productIds,
      price,
      customer: customerId,
    } = createOrderRequestDto;
    const products = await this.productsRepository.getProductsByIds(
      this.prismaService,
      productIds,
    );
    await this.customersService.validateCustomer(customerId);
    this.validateProducts(products, productIds, price);

    const payload = {
      store,
      status: OrderStatus.ORDER,
      ...createOrderRequestDto,
    };

    await this.ordersRepository.createOrder(this.prismaService, payload);

    return null;
  };
}
