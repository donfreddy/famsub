import type { UseQueryReturnType } from '@tanstack/vue-query'
import type { User } from '~/components/users/data/schema'
import type { ApiPaginatedResult } from '~/types/auth'
import { useQuery } from '@tanstack/vue-query'
import { useUserApi } from '~/api/userApi'

export function useUsers(page: Ref<number>, pageSize: Ref<number>): UseQueryReturnType<ApiPaginatedResult<User>, Error> {
  const userApi = useUserApi()

  return useQuery({
    queryKey: ['fetch-users', page, pageSize],
    queryFn: async () => {
      const data = await userApi.getUsers(page.value, pageSize.value)
      if (!data)
        throw new Error('No user data received')
      return data
    },
    enabled: computed(() => !!page.value && !!pageSize.value),
  })
}
