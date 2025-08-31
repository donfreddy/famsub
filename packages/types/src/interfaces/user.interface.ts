import {Role, UserStatus} from "../enums/status.enum";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  providerId: string | null;
  role: Role;
  emailVerified: boolean;
  avatar: string;
  status: UserStatus;
  createdAt: Date;
  lastLogin?: Date;
  // ... autres champs comme roles, billing info, etc.
}
