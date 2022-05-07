import { IsNotEmpty, IsString } from 'class-validator';

export class GetCustomerRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly customerId: string;
}
