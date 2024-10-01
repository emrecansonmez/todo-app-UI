export interface Task {
  taskId: number;
  title: string;
  description: string;
  priority: number;
  state: number;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}
export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface Task {
  taskId: number;
  title: string;
  description: string;
  priority: number;
  state: number;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
}
