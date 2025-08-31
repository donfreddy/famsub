import type { User } from '~/components/users/data/schema'
import type { ApiResult, AuthResult, LoginCredentials, Tokens } from '~/types/auth'

export function useAuthApi() {
  const { $api } = useNuxtApp()

  return {
    login: (inputs: LoginCredentials) => $api.post<ApiResult<AuthResult>>('/auth/email/login', inputs),
    getCurrentUser: () => $api.get<ApiResult<User>>('/v1/me'),
    refreshToken: () => $api.post<ApiResult<Tokens>>('/auth/token/refresh'),
    logout: () => $api.delete<ApiResult<null>>('/auth/logout'),
  }
}
