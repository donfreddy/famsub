import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly name: { en: string; fr: string };

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly mkp_name: { en: string; fr: string };
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
