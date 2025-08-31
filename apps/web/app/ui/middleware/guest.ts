export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    if (to.path === '/' || to.path === '/login' || to.path === '/signup') {
      return navigateTo('/app');
    }
  }
})