import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCustomerCustomFieldsRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly customFieldId: string;
}
