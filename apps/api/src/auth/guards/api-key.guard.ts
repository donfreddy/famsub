import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from '../decorators/permissions.decorator';
import { AuthService } from '../auth.service';
import { HeaderKey, Permission, PublicRequest } from '../../common/helpers';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get(Permissions, context.getClass()) ?? [Permission.GENERAL];
    if (!permissions) throw new ForbiddenException({ key: 'auth.error.permission_denied' });

    const request = context.switchToHttp().getRequest<PublicRequest>();

    const key = request.headers[HeaderKey.API_KEY]?.toString();
    if (!key) throw new ForbiddenException({ key: 'auth.error.permission_denied' });

    const apiKey = await this.authService.findApiKey(key);
    if (!apiKey) throw new ForbiddenException({ key: 'auth.error.permission_denied' });

    request.apiKey = apiKey;

    for (const askedPermission of permissions) {
      for (const allowedPermission of apiKey.permissions) {
        if (allowedPermission === askedPermission) return true;
      }
    }

    throw new ForbiddenException({ key: 'auth.error.permission_denied' });
  }
}
