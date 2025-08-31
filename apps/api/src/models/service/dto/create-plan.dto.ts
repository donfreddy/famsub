import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Frequency } from '../../../common/helpers';

export class CreatePlanDto {
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
  readonly description: { en: string; fr: string };

  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 100 })
  readonly total_amount: number;

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: {
      unit_amount_com: 30,
      unit_amount_with_fees: 40,
      monthly: {
        unit_amount_com: 10,
        unit_amount_with_fees: 20,
      },
    },
    additionalProperties: false,
  })
  readonly fees_amounts: {
    unit_amount_com: number;
    unit_amount_with_com: number;
    monthly: {
      unit_amount_com: number;
      unit_amount_with_com: number;
    };
  };

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'boolean', example: true, required: false })
  readonly can_be_public?: boolean;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', enum: Frequency, example: Frequency.MONTHLY })
  readonly billing_frequency?: Frequency;

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'number', example: 0, required: false })
  readonly max_members?: number;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
