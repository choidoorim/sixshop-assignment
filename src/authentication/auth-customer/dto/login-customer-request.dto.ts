import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerRequestDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
