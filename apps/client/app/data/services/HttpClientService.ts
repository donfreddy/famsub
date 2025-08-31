import axios, {type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";


export class HttpClientService {
  private readonly client: AxiosInstance
  private isRefreshing = false
  private refreshFailed = false
  private refreshSubscribers: ((token: string) => void)[] = []

  constructor(baseURL: string, apiKey?: string) {
    const config = useRuntimeConfig()

    this.client = axios.create({
      baseURL: baseURL || config.public.apiBaseUrl,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(apiKey && {'x-api-key': apiKey}),
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    const authStore = useAuthStore()

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (authStore.tokens?.access_token) {
          config.headers.Authorization = `Bearer ${authStore.tokens.access_token}`
        }
        return config
      },
      (error) => Promise.reject(error instanceof Error ? error : new Error(JSON.stringify(error))))

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.refreshFailed) {
            return Promise.reject(error)
          }

          originalRequest._retry = true

          if (!this.isRefreshing) {
            this.isRefreshing = true
            try {
              const newAccessToken = await this.refreshToken()
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
              return this.client(originalRequest)
            } catch (refreshError) {
              return Promise.reject(refreshError)
            }
          }

          return new Promise(resolve => {
            this.refreshSubscribers.push((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`
              resolve(this.client(originalRequest))
            })
          })
        }

        return Promise.reject(
          error instanceof Error ? error : new Error(JSON.stringify(error))
        )
      }
    )
  }

  private async refreshToken(): Promise<string> {
    const {tokens, logout, setTokens} = useAuthStore()
    try {
      const {data} = await this.client.post('/auth/token/refresh', {
        refreshToken: tokens?.refresh_token,
      })

      const newTokens = {
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      }

      setTokens(newTokens)
      this.client.defaults.headers.Authorization = `Bearer ${data.accessToken}`
      this.refreshSubscribers.forEach(cb => cb(data.accessToken))
      this.refreshSubscribers = []
      return data.accessToken
    } catch (error) {
      this.refreshFailed = true
      logout()
      navigateTo('/login')
      throw error
    } finally {
      this.isRefreshing = false
    }
  }

  public get instance(): AxiosInstance {
    return this.client
  }
}
