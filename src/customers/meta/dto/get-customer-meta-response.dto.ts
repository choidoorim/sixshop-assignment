import { MetaType } from '@prisma/client';

import { TGetCustomerCustomField } from '../type';

export class GetCustomerMeta implements TGetCustomerCustomField {
  readonly id: string;

  readonly type: MetaType;

  readonly key: string;

  readonly required: boolean;
}

export class GetCustomerMetaResponseDto {
  readonly meta: GetCustomerMeta[] | null;

  constructor(partial: Partial<GetCustomerMetaResponseDto>) {
    Object.assign(this, partial);
  }
}
