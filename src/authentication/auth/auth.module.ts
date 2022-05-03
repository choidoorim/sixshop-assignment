import { Module } from '@nestjs/common';

import { CustomersModule } from '../../customers/customers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [CustomersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
