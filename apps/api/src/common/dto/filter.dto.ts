import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDirection } from '../helpers';

export class FilterDto {
  @ApiProperty({
    description: 'Filter query in format: field:operator:value or field:value',
    example: 'name:john or price:gt:100',
    required: false,
  })
  @IsOptional()
  @IsString()
  filter?: string;

  @ApiProperty({
    description: 'Field to sort by',
    example: 'price',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'Sort direction (asc or desc)',
    enum: SortDirection,
    default: SortDirection.ASC,
    required: false,
  })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection?: SortDirection = SortDirection.ASC;
}
