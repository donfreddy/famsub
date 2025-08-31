import { Request } from 'express';
import { ApiKey } from '../../auth/entities/api-key.entity';
import { Keystore } from '../../auth/entities/keystore.entity';
import { User } from '../../models/user/entities/user.entity';

export interface PublicRequest extends Request {
  apiKey: ApiKey;
}

export interface RoleRequest extends PublicRequest {
  currentRoleCodes: string[];
}

export interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}
