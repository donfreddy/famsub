import { Reflector } from '@nestjs/core';
import { Permission } from '../../common/helpers';

export const Permissions = Reflector.createDecorator<Permission[]>();
