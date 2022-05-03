import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { PrismaModule } from '@app/prisma';

import { AuthenticationModule } from './authentication/authentication.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AuthenticationModule, CustomersModule, PrismaModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
