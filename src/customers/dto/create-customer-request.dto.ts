import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomFields {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly customId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly value: string;
}

export class CreateCustomerRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ type: [CustomFields] })
  @IsOptional()
  @Type(() => CustomFields)
  @ValidateNested({ each: true })
  readonly customFields?: CustomFields[];
}
