import { Customer, Prisma, CustomerCustomFieldsData } from '@prisma/client';

export type TCreateCustomerCustomFieldsData = Omit<
  Prisma.CustomerCustomFieldsDataCreateManyInput,
  'id' | 'createdAt' | 'updatedAt'
>;

export type TCustomerWithCustomFields = Customer & {
  CustomerCustomFieldsData?: CustomerCustomFieldsData[];
};
