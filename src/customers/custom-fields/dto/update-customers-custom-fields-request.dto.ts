import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCustomersCustomFieldsParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customFieldId: string;
}

export class UpdateCustomersCustomFieldsBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly key: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly required: boolean;
}
