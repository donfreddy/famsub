import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { FaqType } from '../../../common/helpers';

export class CreateFaqDto {
  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly question: { en: string; fr: string };

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: { en: 'value1', fr: 'value2' },
    additionalProperties: false,
  })
  readonly answer: { en: string; fr: string };

  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', enum: FaqType, example: FaqType.SPECIFIC })
  readonly type: FaqType;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}
