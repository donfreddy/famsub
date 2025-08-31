export interface ApiResult<T> {
  data: T
  status: number
  message: string
}

export interface ApiPaginatedResult<T> {
  status_code: number
  message: string
  data: {
    items: T[]
    meta: PaginatedMeta
    links: {
      first: string
      previous: string | null
      next: string | null
      last: string
    }
  }
}

export interface PaginatedMeta {
  total_items: number
  item_count: number
  items_per_page: number
  total_pages: number
  current_page: number
}

export interface Tokens {
  access_token: string
  refresh_token: string
}

export interface AuthResult {
  user: User
  tokens: Tokens
}

export interface User {
  id: number
  first_name: string
  last_name: string
  username: string
  email: string
  contact_number: string
  gender: string
  role: Role
  country: string
}

enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface LoginCredentials {
  email: string
  password: string
}
