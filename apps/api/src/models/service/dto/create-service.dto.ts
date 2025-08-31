import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateServiceDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Service Name' })
  readonly name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly description: { en: string; fr: string };

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'boolean', example: true, required: false })
  readonly shared_credentials?: boolean;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'https://example.com/terms' })
  @MaxLength(255)
  readonly terms_url: string;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly warning_owner?: { en: string; fr: string };

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'boolean', example: true, required: false })
  readonly already_shared?: boolean;

  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 0})
  readonly category_id: number;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
