import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetRoute = createParamDecorator((_, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const protocol = request.protocol; // http or https
  const host = request.get('host'); // e.g., localhost:3000
  const path = request.path; // Path without query parameters

  return `${protocol}://${host}${path}`;
});
