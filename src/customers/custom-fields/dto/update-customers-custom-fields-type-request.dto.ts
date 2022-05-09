import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MetaType } from '@prisma/client';

export class UpdateCustomersCustomFieldsTypeParamRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customFieldId: string;
}

export class UpdateCustomersCustomFieldsTypeBodyRequestDto {
  @ApiProperty({ enum: [MetaType] })
  @IsNotEmpty()
  @IsEnum(MetaType)
  readonly type: MetaType;
}
