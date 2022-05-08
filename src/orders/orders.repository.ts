import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class OrdersRepository {
  createOrder = (
    prismaConnection: PrismaConnection,
    data: Prisma.OrderUncheckedCreateInput,
  ) =>
    prismaConnection.order.create({
      data,
    });
}
