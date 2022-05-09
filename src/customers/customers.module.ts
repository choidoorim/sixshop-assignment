import { Module } from '@nestjs/common';

import { BcryptModule } from '@app/utils/bcrypt';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersCustomFieldsModule } from './custom-fields/customers-custom-fields.module';
import { CustomersRepository } from './customers.repository';

@Module({
  imports: [CustomersCustomFieldsModule, BcryptModule],
  controllers: [CustomersController],
  providers: [CustomersService, CustomersRepository],
  exports: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
