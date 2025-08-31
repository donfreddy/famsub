import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'property1 example' })
  readonly property1: string;

  @IsNotEmpty()
  @MaxLength(1000)
  @ApiProperty({ type: 'string', example: 'property2 example' })
  readonly property2: string;
}
