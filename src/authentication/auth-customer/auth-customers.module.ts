import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { CustomersModule } from '../../customers/customers.module';
import { AuthCustomersController } from './auth-customers.controller';
import { AuthCustomersService } from './auth-customers.service';
import { LocalCustomerStrategy, JwtCustomerStrategy } from './strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
    CustomersModule,
  ],
  controllers: [AuthCustomersController],
  providers: [AuthCustomersService, LocalCustomerStrategy, JwtCustomerStrategy],
  exports: [AuthCustomersService],
})
export class AuthCustomersModule {}
