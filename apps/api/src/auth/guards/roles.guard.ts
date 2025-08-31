import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ProtectedRequest, Role } from '../../common/helpers';
import { User } from '../../models/user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles) {
      const request = context.switchToHttp().getRequest<ProtectedRequest>();
      const user = request.user as User;
      if (!user) throw new ForbiddenException({ key: 'auth.error.permission_denied' });

      const hasRole = () => requiredRoles.includes(user.role);
      if (!hasRole()) throw new ForbiddenException({ key: 'auth.error.permission_denied' });
    }
    return true;
  }
}
