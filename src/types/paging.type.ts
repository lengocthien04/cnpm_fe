export interface Pagination {
  count: number
  numberOfPages: number
  page: number
  limit: number
  hasNext: boolean
  hasPrevious: boolean
}

export interface PagingQueryConfig {
  page?: number | string
  limit?: number | string
}

export const defaultPagingQueryConfig: PagingQueryConfig = {
  limit: 50,
  page: 1
}

export const defaultPaging: Pagination = {
  count: 100,
  numberOfPages: 2,
  page: 1,
  limit: 50,
  hasNext: true,
  hasPrevious: true
}
