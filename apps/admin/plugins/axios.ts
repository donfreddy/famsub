import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { defineNuxtPlugin } from '#app'

export function createAPI() {
  const runtimeConfig = useRuntimeConfig()

  const API = axios.create({
    baseURL: runtimeConfig.public.apiBaseUrl,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': runtimeConfig.public.apiKey,
    },
  })

  let isRefreshing = false
  let refreshFailed = false
  let refreshSubscribers: ((token: string) => void)[] = []

  API.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authStore = useAuthStore()
      if (authStore.tokens?.access_token) {
        config.headers.Authorization = `Bearer ${authStore.tokens.access_token}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  const refreshToken = async (): Promise<string | void> => {
    const { logout, tokens, setTokens } = useAuthStore()
    try {
      const { data } = await API.post('/auth/token/refresh', {
        refreshToken: tokens?.refresh_token,
      })

      setTokens({ access_token: data.accessToken, refresh_token: data.refreshToken })
      API.defaults.headers.Authorization = `Bearer ${data.accessToken}`

      refreshSubscribers.forEach(cb => cb(data.accessToken))
      refreshSubscribers = []

      return data.accessToken
    }
    catch (error) {
      refreshFailed = true
      logout()
      navigateTo('/login')
      return Promise.reject(error)
    }
    finally {
      isRefreshing = false
    }
  }

  API.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (refreshFailed) {
          return Promise.reject(error)
        }

        originalRequest._retry = true

        if (!isRefreshing) {
          isRefreshing = true
          try {
            const newAccessToken = await refreshToken()
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return API(originalRequest)
          }
          catch (refreshError) {
            return Promise.reject(refreshError)
          }
        }

        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(API(originalRequest))
          })
        })
      }
      return Promise.reject(error)
    },
  )

  return API
}

export default defineNuxtPlugin(() => {
  const API: AxiosInstance = createAPI()
  return {
    provide: {
      api: API,
    },
  }
})
