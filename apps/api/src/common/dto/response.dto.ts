import { ApiProperty } from '@nestjs/swagger';
import { StatusCode } from '../helpers';
import { ApiResponse } from '../interfaces';

export class MessageResponse {
  @ApiProperty({ type: 'number', example: StatusCode.SUCCESS })
  readonly status_code: StatusCode;

  @ApiProperty({ type: 'string', example: 'Success' })
  readonly message: string;

  constructor(statusCode: StatusCode, message: string) {
    this.status_code = statusCode;
    this.message = message;
  }
}

/**
 * @description
 * OK response dto variable type declaration.
 *
 * @docsCategory dto
 */
export class SuccessResponseDto<T> extends MessageResponse {
  @ApiProperty()
  readonly data: ApiResponse<T>;

  constructor(statusCode: StatusCode, message: string, data: ApiResponse<T>) {
    super(statusCode, message);
    this.data = data;
  }
}

/**
 * @description
 * Error response dto variable type declaration.
 *
 * @docsCategory dto
 */
export class ErrorResponseDto extends MessageResponse {
  @ApiProperty({ type: 'string', example: 'Bad Request | Unauthorized | Not Found | Conflict | Internal Error | ...' })
  readonly message: string;

  constructor(statusCode: StatusCode, message: string) {
    super(statusCode, message);
  }
}
