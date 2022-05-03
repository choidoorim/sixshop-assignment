import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  constructor(partial: Partial<LoginCustomerResponseDto>) {
    Object.assign(this, partial);
  }
}
