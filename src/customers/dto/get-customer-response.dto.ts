import { ApiProperty } from '@nestjs/swagger';

export class GetCustomerCustomFields {
  @ApiProperty()
  readonly customFieldsDataId: string;

  @ApiProperty()
  readonly key: string;

  @ApiProperty()
  readonly value: string | number | boolean;
}

export class GetCustomerResponseDto {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty({ type: [GetCustomerCustomFields] })
  readonly customFields: GetCustomerCustomFields[] | null;

  constructor(partial: Partial<GetCustomerResponseDto>) {
    Object.assign(this, partial);
  }
}
