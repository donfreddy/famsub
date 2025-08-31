import { IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class OfferFilterDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  invoice_verified?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  auto_accept?: boolean;
}
