import { MetaType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateCustomerMetaFieldBodyRequestDto {
  @IsEnum(MetaType)
  @IsNotEmpty()
  readonly type: MetaType;

  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly required: boolean;
}
