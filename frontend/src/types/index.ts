export type * from './auth';
export type * from './market';
export type * from './risk';

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
