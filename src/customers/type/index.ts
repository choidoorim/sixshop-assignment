import { Prisma } from '@prisma/client';

export type TCreateCustomerCustomFieldsData = Omit<
  Prisma.CustomerCustomFieldsDataCreateManyInput,
  'id' | 'createdAt' | 'updatedAt'
>;
