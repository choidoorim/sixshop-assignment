import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerCustomFields {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly customId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly value: number | string | boolean;
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

  @ApiProperty({ type: [CustomerCustomFields] })
  @IsOptional()
  @IsArray()
  @Type(() => CustomerCustomFields)
  @ValidateNested({ each: true })
  readonly customFields?: CustomerCustomFields[];
}
