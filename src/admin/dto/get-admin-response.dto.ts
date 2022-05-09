import { ApiProperty } from '@nestjs/swagger';

export class GetAdminResponseDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly createdAt: Date;

  constructor(partial: Partial<GetAdminResponseDto>) {
    Object.assign(this, partial);
  }
}
