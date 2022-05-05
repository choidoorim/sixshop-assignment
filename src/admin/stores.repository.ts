import { Injectable } from '@nestjs/common';
import { Store } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class StoresRepository {
  createStore = (
    prismaConnection: PrismaConnection,
    adminId: string,
  ): Promise<Store> => {
    return prismaConnection.store.create({
      data: {
        adminId,
      },
    });
  };
}
