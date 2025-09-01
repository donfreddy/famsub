import type { LoginUseCase, LogoutUseCase, RegisterUseCase } from '~~/app/core/usecases/auth'
import type { GetCurrentUserUseCase } from '~~/app/core/usecases/user'
import { useAuthQueries } from '~/api/useAuthQueries'

export function useAuth() {
  const authStore = useAuthStore()

  const loginUseCase = inject<LoginUseCase>('loginUseCase')!
  const registerUseCase = inject<RegisterUseCase>('registerUseCase')!
  const logoutUseCase = inject<LogoutUseCase>('logoutUseCase')!
  const getCurrentUserUseCase = inject<GetCurrentUserUseCase>('getCurrentUserUseCase')!

  const {
    useLogin,
    useRegister,
    useLogout,
  } = useAuthQueries(
    loginUseCase,
    registerUseCase,
    logoutUseCase,
    getCurrentUserUseCase,
  )

  return {
    // Store state
    user: storeToRefs(authStore).user,
    tokens: storeToRefs(authStore).tokens,
    isAuthenticated: storeToRefs(authStore).isAuthenticated,

    // Direct access to TanStack Query hooks
    useLogin,
    useRegister,
    useLogout,
  }
}
