import { Module } from '@nestjs/common';

import { AuthCustomersModule } from './auth-customer/auth-customers.module';
import { AuthStoresModule } from './auth-store/auth-stores.module';

@Module({
  imports: [AuthCustomersModule, AuthStoresModule],
})
export class AuthenticationModule {}
