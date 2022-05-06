import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository, StoresRepository } from './repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
  providers: [AdminService, AdminRepository, StoresRepository],
  exports: [AdminService, AdminRepository, StoresRepository],
})
export class AdminModule {}
