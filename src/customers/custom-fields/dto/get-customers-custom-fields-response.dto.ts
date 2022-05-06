import { MetaType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class GetCustomerCustomField {
  @ApiProperty()
  readonly id: string;

  @ApiProperty({ enum: [MetaType] })
  readonly type: MetaType;

  @ApiProperty()
  readonly key: string;

  @ApiProperty()
  readonly required: boolean;
}

export class GetCustomersCustomFieldsResponseDto {
  @ApiProperty({ type: [GetCustomerCustomField] })
  readonly customFields: GetCustomerCustomField[] | null;

  constructor(partial: Partial<GetCustomersCustomFieldsResponseDto>) {
    Object.assign(this, partial);
  }
}
