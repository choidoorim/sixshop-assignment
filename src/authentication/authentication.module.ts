import { Module } from '@nestjs/common';

import { AuthCustomersModule } from './auth-customer/auth-customers.module';

@Module({
  imports: [AuthCustomersModule],
})
export class AuthenticationModule {}
