export class CustomerJwtRequestDto {
  readonly customerId: string;

  readonly store: string;

  readonly iat: number;

  readonly exp: number;
}
