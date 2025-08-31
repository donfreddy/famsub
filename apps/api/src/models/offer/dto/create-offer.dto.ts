import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Frequency, OfferStatus } from '../../../common/helpers';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ type: 'string', example: 'Offer Name', required: false })
  readonly title: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 0 })
  readonly original_price: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: OfferStatus, example: OfferStatus.PUBLIC })
  readonly status: OfferStatus;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: Frequency, example: Frequency.MONTHLY })
  readonly frequency: Frequency;

  @IsNotEmpty()
  @ApiProperty({ type: 'number', example: 2 })
  readonly number_share: number;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'plan_id' })
  readonly plan_id: string;

  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'service_id' })
  readonly service_id: string;
}
