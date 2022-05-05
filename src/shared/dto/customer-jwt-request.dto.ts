import { IsNotEmpty, IsString } from 'class-validator';

export class CustomerJwtRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly customerId: string;

  @IsNotEmpty()
  @IsString()
  readonly iat: number;

  @IsNotEmpty()
  @IsString()
  readonly exp: number;
}