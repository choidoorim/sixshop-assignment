import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
}
