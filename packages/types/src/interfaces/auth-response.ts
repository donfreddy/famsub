import {User} from "./user.interface";

export interface AuthResponse {
  user: User
  tokens: Tokens
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}