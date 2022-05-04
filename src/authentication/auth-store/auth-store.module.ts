import { Module } from '@nestjs/common';

import { AuthStoreController } from './auth-store.controller';
import { AuthStoreService } from './auth-store.service';

@Module({
  controllers: [AuthStoreController],
  providers: [AuthStoreService],
})
export class AuthStoreModule {}
