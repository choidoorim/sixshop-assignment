import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsCustomFieldsModule } from './custom-fields/products-custom-fields.module';
import { ProductsRepository } from './products.repository';

@Module({
  imports: [ProductsCustomFieldsModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
