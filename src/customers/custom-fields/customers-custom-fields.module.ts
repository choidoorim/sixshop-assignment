import { Module } from '@nestjs/common';

import { CustomersCustomFieldsController } from './customers-custom-fields.controller';
import { CustomersCustomFieldsService } from './customers-custom-fields.service';
import {
  CustomersCustomFieldsRepository,
  CustomersCustomFieldsDataRepository,
} from './repository';

@Module({
  controllers: [CustomersCustomFieldsController],
  providers: [
    CustomersCustomFieldsService,
    CustomersCustomFieldsRepository,
    CustomersCustomFieldsDataRepository,
  ],
  exports: [
    CustomersCustomFieldsService,
    CustomersCustomFieldsRepository,
    CustomersCustomFieldsDataRepository,
  ],
})
export class CustomersCustomFieldsModule {}
