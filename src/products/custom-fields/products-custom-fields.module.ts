import { Module } from '@nestjs/common';

import { ProductsCustomFieldsController } from './products-custom-fields.controller';
import { ProductsCustomFieldsService } from './products-custom-fields.service';
import { ProductsCustomFieldsRepository } from './products-custom-fields.repository';

@Module({
  controllers: [ProductsCustomFieldsController],
  providers: [ProductsCustomFieldsService, ProductsCustomFieldsRepository],
  exports: [ProductsCustomFieldsService, ProductsCustomFieldsRepository],
})
export class ProductsCustomFieldsModule {}
