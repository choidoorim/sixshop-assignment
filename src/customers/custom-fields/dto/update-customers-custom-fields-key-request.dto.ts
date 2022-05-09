import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustomersCustomFieldsKeyParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customFieldId: string;
}

export class UpdateCustomersCustomFieldsKeyBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly key: string;
}
