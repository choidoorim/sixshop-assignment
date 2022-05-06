import { ApiProperty } from '@nestjs/swagger';

export class GetStoreTokenResponseDto {
  @ApiProperty()
  readonly token: string;

  constructor(partial: Partial<GetStoreTokenResponseDto>) {
    Object.assign(this, partial);
  }
}
