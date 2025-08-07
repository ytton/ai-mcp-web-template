import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiResponse } from '@/types';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以添加 token 等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;
    
    // 检查业务状态码
    if (data.code === 200) {
      return response;
    } else {
      // 业务错误
      const error = new Error(data.msg || '请求失败');
      (error as any).code = data.code;
      return Promise.reject(error);
    }
  },
  (error) => {
    // HTTP 错误处理
    if (error.response?.status === 401) {
      // 未授权，清除 token 并跳转到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.msg || error.message || '网络错误';
    return Promise.reject(new Error(message));
  }
);

// 封装常用的请求方法，统一返回 ApiResponse 格式
export const api = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await request.get(url, config);
    return response.data;
  },
  
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await request.post(url, data, config);
    return response.data;
  },
  
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await request.put(url, data, config);
    return response.data;
  },
  
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await request.delete(url, config);
    return response.data;
  },
  
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await request.patch(url, data, config);
    return response.data;
  },
};

export default request;
