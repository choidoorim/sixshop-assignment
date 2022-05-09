import { Injectable } from '@nestjs/common';
import { Prisma, Admin } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class AdminRepository {
  createAdmin = (
    prismaConnection: PrismaConnection,
    data: Prisma.AdminCreateManyInput,
  ): Promise<Admin> =>
    prismaConnection.admin.create({
      data,
    });

  findByEmail = (
    prismaConnection: PrismaConnection,
    email: string,
  ): Promise<Admin | null> =>
    prismaConnection.admin.findUnique({
      where: {
        email,
      },
    });

  getAdmin = (prismaConnection: PrismaConnection, adminId: string) =>
    prismaConnection.admin.findUnique({
      where: {
        id: adminId,
      },
    });
}
