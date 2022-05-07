import { Module } from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsCustomFieldsModule } from './custom-fields/products-custom-fields.module';

@Module({
  imports: [ProductsCustomFieldsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
