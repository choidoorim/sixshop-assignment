import { Body } from '@nestjs/common';

import { JwtToken } from '@app/utils';
import { StoreJwtRequestDto } from '@api/shared/dto';

import {
  ProductsController as Controller,
  CreateProduct,
} from './products.controller.decorator';
import { ProductsService } from './products.service';
import { CreateProductRequestDto } from './dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @CreateProduct()
  createProduct(
    @JwtToken() { store }: StoreJwtRequestDto,
    @Body() createProductRequestDto: CreateProductRequestDto,
  ) {
    return this.productsService.createProduct(createProductRequestDto, store);
  }
}
