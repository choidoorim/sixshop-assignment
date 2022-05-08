import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductsCustomFields {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly customId: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly value: number | string | boolean;
}

export class CreateProductRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly categories: string[];

  @ApiProperty({ type: [ProductsCustomFields] })
  @IsOptional()
  @IsArray()
  @Type(() => ProductsCustomFields)
  @ValidateNested({ each: true })
  readonly customFields?: ProductsCustomFields[];
}
