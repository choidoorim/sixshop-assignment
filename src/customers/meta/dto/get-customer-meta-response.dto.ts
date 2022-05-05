import { MetaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import { TGetCustomerCustomField } from '../type';

export class GetCustomerMeta implements TGetCustomerCustomField {
  @ApiProperty()
  readonly id: string;

  @ApiProperty({ enum: [MetaType] })
  readonly type: MetaType;

  @ApiProperty()
  readonly key: string;

  @ApiProperty()
  readonly required: boolean;
}

export class GetCustomerMetaResponseDto {
  @ApiProperty({ type: [GetCustomerMeta] })
  readonly meta: GetCustomerMeta[] | null;

  constructor(partial: Partial<GetCustomerMetaResponseDto>) {
    Object.assign(this, partial);
  }
}
