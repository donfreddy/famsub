import { useQuery } from '@tanstack/vue-query'
import { useAuthApi } from '~/api/authApi'

export function useCurrentUserQuery(isEnabled = true) {
  const authApi = useAuthApi()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getCurrentUser(),
    enabled: isEnabled,
    retry: false, // Don't retry on failure (often for auth endpoints)
  })
}
