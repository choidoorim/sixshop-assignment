import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { StoresRepository } from './stores.repository';
import { JwtStoreStrategy } from './jwt-store.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET_KEY'),
      }),
    }),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminRepository,
    StoresRepository,
    JwtStoreStrategy,
  ],
  exports: [AdminService, AdminRepository],
})
export class AdminModule {}
