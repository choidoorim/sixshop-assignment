import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  constructor(partial: Partial<LoginAdminResponseDto>) {
    Object.assign(this, partial);
  }
}
