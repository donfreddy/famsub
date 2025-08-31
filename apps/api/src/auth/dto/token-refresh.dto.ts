import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class TokenRefreshDto {
  @MaxLength(2000)
  @ApiProperty({ type: 'string', example: faker.internet.jwt({ header: { alg: 'HS256' } }) })
  refresh_token: string;
}
