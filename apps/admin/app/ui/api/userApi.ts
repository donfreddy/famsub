import type { User } from '~/components/users/data/schema'
import type { ApiPaginatedResult, ApiResult, AuthResult } from '~/types/auth'

export function useUserApi() {
  const { $api } = useNuxtApp()

  return {
    getUsers: async (page = 1, pageSize = 10): Promise<ApiPaginatedResult<User>> => {
      const response = await $api.get<ApiPaginatedResult<User>>(`/v1/users?page=${page}&limit=${pageSize}`)
      return response?.data
    },
    getUser: (id: number) => $api.get<ApiResult<User>>(`/v1/users/${id}`),
    createUser: (inputs: any) => $api.post<ApiResult<AuthResult>>('/v1/users', inputs),
    updateUser: (id: number, inputs: any) => $api.put<ApiResult<AuthResult>>(`/v1/users/${id}`, inputs),
    deleteUser: (id: number) => $api.delete<ApiResult<null>>(`/v1/users/${id}`),
  }
}
