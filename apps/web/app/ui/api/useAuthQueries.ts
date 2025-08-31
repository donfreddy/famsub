import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {LoginUseCase, LogoutUseCase, RegisterUseCase} from '~~/app/core/usecases/auth'
import {GetCurrentUserUseCase} from '~~/app/core/usecases/user'
import type {ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials} from '~~/app/core/entities'
import {AxiosError} from 'axios'
import {UserMapper} from "~~/app/data/mappers/UserMapper";

export function useAuthQueries(
  loginUseCase: LoginUseCase,
  registerUseCase: RegisterUseCase,
  logoutUseCase: LogoutUseCase,
  getCurrentUserUseCase: GetCurrentUserUseCase,
) {
  const queryClient = useQueryClient()
  const authStore = useAuthStore()
  const router = useRouter()
  const userMapper = new UserMapper()
  const toast = useToast()

  const handleSuccess = async (response: ApiResponse<AuthResponse>, successId: string) => {
    const {data, message} = response
    authStore.setTokens(data.tokens)
    authStore.setUser(userMapper.toDomain(data.user))

    //await queryClient.invalidateQueries({queryKey: ['currentUser']})
    await queryClient.fetchQuery({
      queryKey: ['currentUser'],
      queryFn: async () => {
        const res = await getCurrentUserUseCase.execute()
        console.log("User fetched :", res.data)
        authStore.setUser(userMapper.toDomain(res.data))
        return res.data;
      }
    })

    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/app'
    sessionStorage.removeItem('redirectAfterLogin')
    navigateTo(redirectPath)

    toast.add({
      id: successId,
      title: message,
      color: 'success',
      icon: 'i-heroicons-check-circle',
      duration: 3000
    })
  }

  const handleError = (error: unknown, errorId: string) => {
    const errorMessage =
      error instanceof AxiosError
        ? error.response?.data?.message || 'An error has occurred'
        : 'Unknown error'

    toast.add({
      id: errorId,
      title: errorMessage,
      color: 'error',
      icon: 'i-heroicons-x-circle',
    })
  }

  const useLogin = () =>
    useMutation({
      mutationKey: ['login'],
      mutationFn: (credentials: LoginCredentials) => loginUseCase.execute(credentials),
      onSuccess: (response: ApiResponse<AuthResponse>) => handleSuccess(response, 'login-success'),
      onError: (error) => handleError(error, 'login-failed'),
    })

  const useRegister = () =>
    useMutation({
      mutationKey: ['register'],
      mutationFn: (data: RegisterCredentials) => registerUseCase.execute(data),
      onSuccess: (response: ApiResponse<AuthResponse>) => handleSuccess(response, 'register-success'),
      onError: (error) => handleError(error, 'register-failed'),
    })

  const useLogout = () =>
    useMutation({
      mutationKey: ['logout'],
      mutationFn: () => logoutUseCase.execute(),
      onSuccess: async () => {
        authStore.logout()
        await router.push('/')
        await queryClient.resetQueries({queryKey: ['currentUser']})
      },
      onError: (error) => handleError(error, 'logout-failed'),
    })

  return {
    useLogin,
    useRegister,
    useLogout,
  }
}
