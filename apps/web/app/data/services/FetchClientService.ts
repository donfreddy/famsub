export class FetchClientService {
  private readonly baseURL: string
  private readonly isRefreshing = false
  private refreshFailed = false
  private readonly refreshSubscribers: Array<(token: string) => void> = []

  constructor(baseURL?: string) {
    const runtimeConfig = useRuntimeConfig()
    this.baseURL = baseURL || runtimeConfig.public.apiBaseUrl
  }

  private async makeRequest<T>(url: string, options: any = {}): Promise<T> {
    const authStore = useAuthStore()

    const requestOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(authStore.tokens?.access_token && {
          Authorization: `Bearer ${authStore.tokens.access_token}`,
        }),
      },
    }

    try {
      return await $fetch<T>(`${this.baseURL}${url}`, requestOptions)
    }
    catch (error: any) {
      if (error.status === 401 && !this.refreshFailed) {
        const newToken = await this.refreshToken()
        requestOptions.headers.Authorization = `Bearer ${newToken}`
        return await $fetch<T>(`${this.baseURL}${url}`, requestOptions)
      }
      throw error
    }
  }

  private async refreshToken(): Promise<string> {
    const authStore = useAuthStore()
    const { tokens, logout, setTokens } = authStore

    if (!tokens?.refresh_token) {
      throw new Error('No refresh token available')
    }

    try {
      const response = await $fetch<RefreshResponse>(`${this.baseURL}/auth/token/refresh`, {
        method: 'POST',
        body: { refreshToken: tokens.refresh_token },
      })

      const newTokens: TokenPair = {
        access_token: response.accessToken,
        refresh_token: response.refreshToken,
      }

      setTokens(newTokens)
      return response.accessToken
    }
    catch (error) {
      this.refreshFailed = true
      logout()
      if (import.meta.client) {
        navigateTo('/')
      }
      throw error
    }
  }

  public async get<T = any>(url: string): Promise<T> {
    return this.makeRequest<T>(url, { method: 'GET' })
  }

  public async post<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, { method: 'POST', body: data })
  }

  public async put<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, { method: 'PUT', body: data })
  }

  public async patch<T = any>(url: string, data?: any): Promise<T> {
    return this.makeRequest<T>(url, { method: 'PATCH', body: data })
  }

  public async delete<T = any>(url: string): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE' })
  }
}

// Types
interface TokenPair {
  access_token: string
  refresh_token: string
}

interface RefreshResponse {
  accessToken: string
  refreshToken: string
}
