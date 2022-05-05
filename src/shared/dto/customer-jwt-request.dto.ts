export class CustomerJwtRequestDto {
  readonly customerId: string;

  readonly iat: number;

  readonly exp: number;
}