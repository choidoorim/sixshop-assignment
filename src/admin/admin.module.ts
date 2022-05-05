import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { StoresRepository } from './stores.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, StoresRepository],
  exports: [AdminService, AdminRepository],
})
export class AdminModule {}
