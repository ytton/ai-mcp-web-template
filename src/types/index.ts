// 通用类型定义

export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 组件 Props 的通用类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 路由相关类型
export interface RouteParams {
  [key: string]: string | undefined;
}
