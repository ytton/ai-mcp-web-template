import { api } from '@/utils/request';

export interface ChartDataPoint {
  month: string;
  value: number;
}

// 图表相关 API
export const chartApi = {
  // 获取折线图数据
  getLineChartData: async (): Promise<ChartDataPoint[]> => {
    const response = await api.get<ChartDataPoint[]>('/chart/line');
    return response.data;
  },
};

// 获取图表数据
export const getChartData = async () => {
  const response = await api.get('/chart/data');
  return response;
};
