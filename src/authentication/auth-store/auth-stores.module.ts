import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthStoresController } from './auth-stores.controller';
import { AuthStoresService } from './auth-stores.service';
import { StoresModule } from '../../stores/stores.module';
import { JwtStoreStrategy, LocalStoreStrategy } from './strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('STORE_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>(
            'STORE_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
    }),
    StoresModule,
    PassportModule,
  ],
  controllers: [AuthStoresController],
  providers: [AuthStoresService, LocalStoreStrategy, JwtStoreStrategy],
})
export class AuthStoresModule {}
