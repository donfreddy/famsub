export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum Provider {
  EMAIL = 'user',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  provider: string;
  providerId: string | null;
  contactNumber: string;
  gender: Gender;
  role: Role;
  emailVerified: boolean;
  avatar: string;
  country: string;
  score: number;
  pin_code: string | null;
  birthdate: string; // ISO format, you can convert to Date if needed
  status: Status;
  bannedReason: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
