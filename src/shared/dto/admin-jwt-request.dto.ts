export class AdminJwtRequestDto {
  readonly adminId: string;

  readonly store: string;

  readonly iat: number;

  readonly exp: number;
}
