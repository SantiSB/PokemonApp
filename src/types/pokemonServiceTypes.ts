export interface FetchParams {
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
}

export interface UrlParams {
  [key: string]: string | number
}
