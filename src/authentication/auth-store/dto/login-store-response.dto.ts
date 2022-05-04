import { ApiProperty } from '@nestjs/swagger';

export class LoginStoreResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  constructor(partial: Partial<LoginStoreResponseDto>) {
    Object.assign(this, partial);
  }
}
