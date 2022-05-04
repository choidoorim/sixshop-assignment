import { Module } from '@nestjs/common';

import { AuthCustomersModule } from './auth-customer/auth-customers.module';
import { AuthStoreModule } from './auth-store/auth-store.module';

@Module({
  imports: [AuthCustomersModule, AuthStoreModule],
})
export class AuthenticationModule {}
