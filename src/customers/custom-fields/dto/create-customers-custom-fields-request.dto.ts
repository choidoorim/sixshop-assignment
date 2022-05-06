import { MetaType } from '@prisma/client';
import { IsEnum, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomersCustomFieldsRequestDto {
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
