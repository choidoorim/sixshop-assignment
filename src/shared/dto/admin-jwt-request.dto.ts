import { IsNotEmpty, IsString } from 'class-validator';

export class AdminJwtRequestDto {
  @IsNotEmpty()
  @IsString()
  readonly store: string;

  @IsNotEmpty()
  @IsString()
  readonly iat: number;

  @IsNotEmpty()
  @IsString()
  readonly exp: number;
}