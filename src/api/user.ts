import { api } from '@/utils/request';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

// 用户相关 API
export const userApi = {
  // 登录
  login: async (params: LoginParams): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', params);
    return response.data;
  },
  
  // 获取用户信息
  getUserInfo: async (): Promise<User> => {
    const response = await api.get<User>('/user/profile');
    return response.data;
  },
  
  // 更新用户信息
  updateUserInfo: async (data: Partial<User>): Promise<User> => {
    const response = await api.put<User>('/user/profile', data);
    return response.data;
  },
  
  // 注销
  logout: async (): Promise<void> => {
    await api.post<void>('/auth/logout');
  },
};

// 获取用户列表
export const getUserList = async () => {
  const response = await api.get('/users');
  return response;
};

// 获取仪表板统计
export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats');
  return response;
};
