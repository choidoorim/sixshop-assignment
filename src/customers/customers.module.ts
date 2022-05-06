import { Module } from '@nestjs/common';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersCustomFieldsModule } from './custom-fields/customers-custom-fields.module';
import { CustomersRepository } from './customers.repository';

@Module({
  imports: [CustomersCustomFieldsModule],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
