export default defineNuxtRouteMiddleware((to, from) => {
  const {isAuthenticated} = useAuthStore();

  if (isAuthenticated && to?.name === 'login') {
    // If user is already logged in and visits /login, send them to home (or last intended route)
    return navigateTo('/app');
  }

  if (!isAuthenticated && to?.name !== 'login') {
    // Save the intended route in sessionStorage before redirecting
    sessionStorage.setItem('redirectAfterLogin', to.fullPath);
    return navigateTo('/login');
  }
});
