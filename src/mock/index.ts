import Mock from 'mockjs';
import type { ApiResponse } from '@/types';

// 配置 Mock.js
Mock.setup({
  timeout: '200-600' // 模拟网络延迟
});

console.log('Mock.js 已加载');

// 图表数据 Mock
Mock.mock('/api/chart/line', 'get', () => {
  console.log('Mock API 被调用: /api/chart/line');
  const data = [];
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < categories.length; i++) {
    data.push({
      month: categories[i],
      value: Mock.Random.integer(100, 1000)
    });
  }

  const result = {
    code: 200,
    msg: '成功',
    data
  } as ApiResponse<Array<{month: string; value: number}>>;
  
  console.log('Mock API 返回数据:', result);
  return result;
});

// 用户信息 Mock
Mock.mock('/api/user/profile', 'get', () => {
  console.log('Mock API 被调用: /api/user/profile');
  return {
    code: 200,
    msg: '成功',
    data: {
      id: Mock.Random.integer(1, 1000),
      name: Mock.Random.cname(),
      email: Mock.Random.email(),
      avatar: Mock.Random.image('100x100', Mock.Random.color(), '#FFF', 'avatar')
    }
  } as ApiResponse;
});

// 用户登录 Mock
Mock.mock('/api/auth/login', 'post', (options: any) => {
  console.log('Mock API 被调用: /api/auth/login', options);
  const { email, password } = JSON.parse(options.body);
  
  if (email && password) {
    return {
      code: 200,
      msg: '登录成功',
      data: {
        user: {
          id: Mock.Random.integer(1, 1000),
          name: Mock.Random.cname(),
          email: email,
          avatar: Mock.Random.image('100x100', Mock.Random.color(), '#FFF', 'avatar')
        },
        token: Mock.Random.string('upper', 32)
      }
    } as ApiResponse;
  } else {
    return {
      code: 400,
      msg: '邮箱或密码不能为空',
      data: null
    } as ApiResponse;
  }
});

// 仪表盘统计数据 Mock - 兼容 TestMockData 和 Dashboard 页面
Mock.mock('/api/dashboard/stats', 'get', () => {
  console.log('Mock API 被调用: /api/dashboard/stats');
  return {
    code: 200,
    msg: '成功',
    data: {
      // Dashboard 页面需要的字段
      totalUsers: Mock.Random.integer(1000, 10000),
      totalOrders: Mock.Random.integer(500, 5000),
      totalRevenue: Mock.Random.integer(100000, 1000000),
      growthRate: Mock.Random.float(0, 100, 2, 2),
      // TestMockData 需要的字段
      activeUsers: Mock.Random.integer(800, 3000),
      revenue: Mock.Random.integer(50000, 500000),
      growth: Mock.Random.float(5, 25, 2, 2)
    }
  };
});

// 仪表盘图表数据 Mock
Mock.mock(/\/api\/dashboard\/chart(\?.*)?$/, 'get', (options: any) => {
  console.log('Mock API 被调用: /api/dashboard/chart', options.url);
  const data = [];
  const days = 30; // 默认30天数据
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      users: Mock.Random.integer(50, 500),
      orders: Mock.Random.integer(20, 200),
      revenue: Mock.Random.integer(1000, 20000)
    });
  }
  
  return {
    code: 200,
    msg: '成功',
    data
  };
});

// 最近活动 Mock
Mock.mock(/\/api\/dashboard\/activity(\?.*)?$/, 'get', (options: any) => {
  console.log('Mock API 被调用: /api/dashboard/activity', options.url);
  const activities = [];
  const types = ['user', 'order', 'payment'];
  const statuses = ['success', 'warning', 'error'];
  
  for (let i = 0; i < 10; i++) {
    const type = types[Mock.Random.integer(0, 2)];
    const status = statuses[Mock.Random.integer(0, 2)];
    
    activities.push({
      id: Mock.Random.integer(1, 1000),
      type,
      title: Mock.Random.ctitle(5, 15),
      description: Mock.Random.csentence(10, 30),
      time: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      status
    });
  }
  
  return {
    code: 200,
    msg: '成功',
    data: activities
  };
});

// 用户列表 Mock - 为 TestMockData 组件提供数据
Mock.mock('/api/users', 'get', () => {
  console.log('Mock API 被调用: /api/users');
  const users = [];
  
  for (let i = 0; i < 12; i++) {
    users.push({
      id: Mock.Random.integer(1, 1000),
      name: Mock.Random.cname(),
      email: Mock.Random.email(),
      avatar: Mock.Random.image('100x100', Mock.Random.color(), '#FFF', 'avatar')
    });
  }
  
  return {
    code: 200,
    msg: '成功',
    data: {
      list: users,
      total: users.length
    }
  } as ApiResponse;
});



// 图表数据 Mock - 为 TestMockData 组件提供数据
Mock.mock('/api/chart/data', 'get', () => {
  console.log('Mock API 被调用: /api/chart/data');
  const data = [];
  const categories = ['1月', '2月', '3月', '4月', '5月', '6月'];
  
  for (let i = 0; i < categories.length; i++) {
    data.push({
      month: categories[i],
      value: Mock.Random.integer(200, 800),
      type: '用户增长'
    });
  }
  
  return {
    code: 200,
    msg: '成功',
    data
  } as ApiResponse;
});

export default Mock;
