import { Module } from '@nestjs/common';

import { AuthStoresController } from './auth-stores.controller';
import { AuthStoresService } from './auth-stores.service';
import { StoresModule } from '../../stores/stores.module';

@Module({
  imports: [StoresModule],
  controllers: [AuthStoresController],
  providers: [AuthStoresService],
})
export class AuthStoresModule {}
