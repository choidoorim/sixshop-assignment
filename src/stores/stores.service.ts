import { Injectable } from '@nestjs/common';
import { Store } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { StoresRepository } from './stores.repository';

@Injectable()
export class StoresService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storesRepository: StoresRepository,
  ) {}

  findStoreByEmail = (email: string): Promise<Store | null> =>
    this.storesRepository.findByEmail(this.prismaService, email);
}
