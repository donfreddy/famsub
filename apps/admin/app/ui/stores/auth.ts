import type { Tokens, User } from '~/types/auth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<User | null>('auth-user', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 2, // 7 jours
    sameSite: 'strict',
  })

  const tokens = useCookie<Tokens | null>('auth-tokens', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 2, // 7 jours
    sameSite: 'strict',
  })

  const isAuthenticated = computed(() => !!user.value)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }
  const setTokens = (newTokens: Tokens | null) => {
    tokens.value = newTokens
  }

  const logout = () => {
    user.value = null
    tokens.value = null
  }

  // Initialize on load
  const initializeAuth = () => {
    if (user.value && tokens.value) {
      console.log('Utilisateur déjà connecté :', user.value)
    }
    else {
      console.log('Aucun utilisateur connecté.')
    }
  }

  return {
    user,
    tokens,
    isAuthenticated,
    setUser,
    setTokens,
    logout,
    initializeAuth,
  }
})
