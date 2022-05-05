import { ApiProperty } from '@nestjs/swagger';

export class LoginStoreRequestDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}
