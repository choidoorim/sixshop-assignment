import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, Admin } from '@prisma/client';

@Injectable()
export class AdminRepository {
  createAdmin = (
    prismaClient: PrismaClient,
    data: Prisma.AdminCreateManyInput,
  ): Promise<Admin> =>
    prismaClient.admin.create({
      data,
    });

  findByEmail = (
    prismaClient: PrismaClient,
    email: string,
  ): Promise<Admin | null> =>
    prismaClient.admin.findUnique({
      where: {
        email,
      },
    });
}
