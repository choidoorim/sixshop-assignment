export class AdminJwtRequestDto {
  readonly adminId: string;

  readonly iat: number;

  readonly exp: number;
}
