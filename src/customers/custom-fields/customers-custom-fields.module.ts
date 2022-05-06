import { Module } from '@nestjs/common';

import { CustomersCustomFieldsController } from './customers-custom-fields.controller';
import { CustomersCustomFieldsService } from './customers-custom-fields.service';
import { CustomersCustomFieldsRepository } from './customers-custom-fields.repository';

@Module({
  controllers: [CustomersCustomFieldsController],
  providers: [CustomersCustomFieldsService, CustomersCustomFieldsRepository],
})
export class CustomersCustomFieldsModule {}
