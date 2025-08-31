import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { AuthService } from '../auth.service';
import { UserService } from '../../models/user/user.service';
import { ProtectedRequest } from '../../common/helpers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<ProtectedRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException({ key: 'exception.unauthorized' });

    const payload = await this.authService.verifyToken(token);
    const valid = this.authService.validatePayload(payload);
    if (!valid) throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });

    const user = await this.userService.findById(payload.sub);
    if (!user) throw new UnauthorizedException({ key: 'auth.error.user_not_registered' });

    const keystore = await this.authService.findKeystore(user, payload.prm);
    if (!keystore) throw new UnauthorizedException({ key: 'auth.error.invalid_access_token' });

    request.user = user;
    request.keystore = keystore;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
