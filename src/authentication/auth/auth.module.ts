import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from '../../admin/admin.module';
import { LocalAdminStrategy } from './strategy/local-admin.strategy';
import { JwtStrategy } from './strategy/jwt-admin.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('ADMIN_ACCESS_TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>(
            'ADMIN_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      }),
    }),
    AdminModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalAdminStrategy, JwtStrategy],
})
export class AuthModule {}