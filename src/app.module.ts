import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@app/prisma';

import { AuthenticationModule } from './authentication/authentication.module';
import { CustomersModule } from './customers/customers.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    AuthenticationModule,
    CustomersModule,
    PrismaModule,
    StoresModule,
  ],
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
