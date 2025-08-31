import type { AxiosResponse } from 'axios'
import type { ApiResult, AuthResult } from '~/types/auth'
import { useMutation } from '@tanstack/vue-query'
import { AxiosError } from 'axios'
import { useAuthApi } from '~/api/authApi'
import { useToast } from '~/components/ui/toast/use-toast'
import { useCurrentUserQuery } from '~/composables/queries/useAuthQuery'

export function useAuthMutation() {
  // const queryClient = useQueryClient()
  const authStore = useAuthStore()
  const authApi = useAuthApi()
  const router = useRouter()
  const { toast } = useToast()

  // Login mutation
  const { mutate: login, isPending: isLoggingIn, isSuccess } = useMutation({
    mutationFn: authApi.login,
    mutationKey: ['login'],
    onSuccess: async (response: AxiosResponse<ApiResult<AuthResult>>) => {
      const { data, message } = response.data
      authStore.setTokens(data.tokens)
      authStore.setUser(data.user)

      //const { data: profileData } = useCurrentUserQuery(isSuccess.value)
      //console.log(profileData)
      //console.log(profileData?.value?.data)
      //console.log(profileData?.value?.data?.data)

      toast({ title: message })

      navigateTo('/')
    },
    onError: (error) => {
      const errorMessage = error instanceof AxiosError
        ? error.response?.data.message || 'An error has occurred'
        : 'Unknown error'

      console.error(errorMessage)

      toast({
        title: errorMessage,
        variant: 'destructive',
      })
    },
  })

  // Logout mutation
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: authApi.logout,
    mutationKey: ['logout'],
    onSuccess: async () => {
      authStore.logout()
      await router.push('/login')
    },
    onError: (error) => {
      const errorMessage = error instanceof AxiosError
        ? error.response?.data.message || 'An error has occurred'
        : 'Unknown error'

      toast({
        title: errorMessage,
        variant: 'destructive',
      })
    },
  })

  return {
    // State
    user: authStore.user,
    tokens: authStore.tokens,
    isAuthenticated: authStore.isAuthenticated,

    // Actions
    login,
    logout,

    // Loading states
    isLoggingIn,
    isLoggingOut,
  }
}
