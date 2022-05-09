import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MetaType } from '@prisma/client';

export class UpdateCustomersCustomFieldsParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customFieldId: string;
}

export class UpdateCustomersCustomFieldsBodyRequestDto {
  @ApiProperty({ enum: [MetaType] })
  @IsNotEmpty()
  @IsEnum(MetaType)
  readonly type: MetaType;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly required: boolean;
}
