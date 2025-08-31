export interface ApiPaginatedResponse<T> {
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
