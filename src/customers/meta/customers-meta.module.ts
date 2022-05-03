import { Module } from '@nestjs/common';

import { CustomersMetaController } from './customers-meta.controller';
import { CustomersMetaService } from './customers-meta.service';

@Module({
  controllers: [CustomersMetaController],
  providers: [CustomersMetaService],
})
export class CustomersMetaModule {}
