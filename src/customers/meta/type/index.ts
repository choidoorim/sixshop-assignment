import { CustomerCustomFields } from '@prisma/client';

export type TGetCustomerCustomField = Omit<CustomerCustomFields, 'store'>;
