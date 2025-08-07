import { api } from '@/utils/request';

// 仪表盘统计数据接口
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  growthRate: number;
}

// 仪表盘图表数据接口
export interface DashboardChartData {
  date: string;
  users: number;
  orders: number;
  revenue: number;
}

// 最近活动接口
export interface RecentActivity {
  id: number;
  type: 'user' | 'order' | 'payment';
  title: string;
  description: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

// 仪表盘相关 API
export const dashboardApi = {
  // 获取统计数据
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },
  
  // 获取图表数据
  getChartData: async (period: '7d' | '30d' | '90d' = '30d'): Promise<DashboardChartData[]> => {
    const response = await api.get<DashboardChartData[]>(`/dashboard/chart?period=${period}`);
    return response.data;
  },
  
  // 获取最近活动
  getRecentActivity: async (limit: number = 10): Promise<RecentActivity[]> => {
    const response = await api.get<RecentActivity[]>(`/dashboard/activity?limit=${limit}`);
    return response.data;
  },
};
