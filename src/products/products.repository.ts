import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class ProductsRepository {
  createProduct = (
    prismaConnection: PrismaConnection,
    data: Prisma.ProductCreateManyInput,
  ) =>
    prismaConnection.product.create({
      data,
    });

  getProductsByIds = (
    prismaConnection: PrismaConnection,
    ids: string[],
  ): Promise<Product[]> =>
    prismaConnection.product.findMany({
      where: {
        id: { in: ids },
      },
    });
}
