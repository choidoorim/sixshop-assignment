import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, Store } from '@prisma/client';

@Injectable()
export class StoresRepository {
  createStore = (
    prismaClient: PrismaClient,
    data: Prisma.StoreCreateManyInput,
  ): Promise<Store> =>
    prismaClient.store.create({
      data,
    });

  findByEmail = (
    prismaClient: PrismaClient,
    email: string,
  ): Promise<Store | null> =>
    prismaClient.store.findUnique({
      where: {
        email,
      },
    });
}
