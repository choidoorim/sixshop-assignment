import { ApiProperty } from '@nestjs/swagger';
import { MetaType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateCustomerMetaFieldBodyRequestDto {
  @ApiProperty({ enum: [MetaType] })
  @IsEnum(MetaType)
  @IsNotEmpty()
  readonly type: MetaType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly key: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly required: boolean;
}
