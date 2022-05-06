import { Module } from '@nestjs/common';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersCustomFieldsModule } from './custom-fields/customers-custom-fields.module';

@Module({
  imports: [CustomersCustomFieldsModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
