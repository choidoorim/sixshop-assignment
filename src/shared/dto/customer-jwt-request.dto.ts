import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerJwtRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly customerId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly customerStoreId: number;

  @IsNotEmpty()
  @IsString()
  readonly iat: number;

  @IsNotEmpty()
  @IsString()
  readonly exp: number;
}