import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProtectedRequest } from '../../common/helpers';

export const GetUser = createParamDecorator((_data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ProtectedRequest>();
  return request.user;
});
