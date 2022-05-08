import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';

import { ProductsRepository } from './products.repository';
import { CreateProductRequestDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsRepository: ProductsRepository,
  ) {}

  createProduct = async (
    createProductRequestDto: CreateProductRequestDto,
    store: string,
  ) => {
    const payload = { store, ...createProductRequestDto };
    await this.productsRepository.createProduct(this.prismaService, payload);

    return null;
  };
}
