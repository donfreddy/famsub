import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to, _) => {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated && to?.name === 'login') {
    return navigateTo('/')
  }

  if (!isAuthenticated && to?.name !== 'login') {
    return navigateTo('/login')
  }
})
