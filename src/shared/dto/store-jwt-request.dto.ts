export class StoreJwtRequestDto {
  readonly store: string;

  readonly iat: number;

  readonly exp: number;
}
