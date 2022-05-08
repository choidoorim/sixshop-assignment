import { Injectable } from '@nestjs/common';
import { Prisma, CustomerCustomFields } from '@prisma/client';

import { PrismaConnection } from '@app/prisma/type';

@Injectable()
export class CustomersCustomFieldsRepository {
  createCustomFields = (
    prismaConnection: PrismaConnection,
    data: Prisma.CustomerCustomFieldsCreateManyInput,
  ): Promise<CustomerCustomFields> =>
    prismaConnection.customerCustomFields.create({
      data,
    });

  getCustomFields = (
    prismaConnection: PrismaConnection,
    store: string,
  ): Promise<CustomerCustomFields[]> =>
    prismaConnection.customerCustomFields.findMany({
      where: {
        store,
      },
    });

  getCustomFieldById = (prismaConnection: PrismaConnection, id: string) =>
    prismaConnection.customerCustomFields.findUnique({
      where: {
        id,
      },
    });

  getCustomFieldsByIds = (
    prismaConnection: PrismaConnection,
    customFieldIds: string[],
  ): Promise<CustomerCustomFields[]> =>
    prismaConnection.customerCustomFields.findMany({
      where: {
        id: { in: customFieldIds },
      },
    });

  // cascade 설정으로 필드 삭제 시 관련된 데이터들이 전부 삭제 된다
  deleteCustomFields = (
    prismaConnection: PrismaConnection,
    customFieldId: string,
  ) =>
    prismaConnection.customerCustomFields.delete({
      where: {
        id: customFieldId,
      },
    });
}
