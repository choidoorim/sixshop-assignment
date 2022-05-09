import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCustomersCustomFieldsRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly customFieldId: string;
}
