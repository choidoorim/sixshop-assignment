import { Module } from '@nestjs/common';

import { CustomersMetaController } from './customers-meta.controller';
import { CustomersMetaService } from './customers-meta.service';
import { CustomersMetaRepository } from './customers-meta.repository';

@Module({
  controllers: [CustomersMetaController],
  providers: [CustomersMetaService, CustomersMetaRepository],
})
export class CustomersMetaModule {}
