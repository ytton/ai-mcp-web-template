import { memo, useEffect, useState } from "react";
import { getUserList, getDashboardStats } from "@/api/user";
import LineChart from "./LineChart";
import { Button } from "./ui/button";
import Icon from "./ui/icon";
import { useAppStore } from "@/stores/useAppStore";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  revenue: number;
  growth: number;
}

function TestMockData() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { user, setUser } = useAppStore();

  const fetchData = async () => {
    setLoading(true);
    try {
      // 并行获取所有数据
      const [usersResponse, statsResponse] = await Promise.all([
        getUserList(),
        getDashboardStats()
      ]);

      setUsers(usersResponse.data.list || []);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetUser = () => {
    if (users.length > 0) {
      setUser(users[0]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          AI MCP Web Template 功能展示
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          这个组件展示了模板的核心功能：API 调用、状态管理、Mock 数据、UI 组件和图表可视化
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={fetchData} 
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Icon icon="lucide:refresh-cw" className={loading ? "animate-spin" : ""} />
          {loading ? "加载中..." : "刷新数据"}
        </Button>
        
        <Button 
          onClick={handleSetUser} 
          variant="outline"
          disabled={users.length === 0}
          className="flex items-center gap-2"
        >
          <Icon icon="lucide:user" />
          设置当前用户
        </Button>
      </div>

      {/* 当前用户信息 */}
      {user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">当前用户 (Zustand状态)</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* 统计数据卡片 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">仪表板统计</h2>
          {stats ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:users" className="text-blue-500" />
                  <span className="text-sm text-gray-600">总用户数</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:user-check" className="text-green-500" />
                  <span className="text-sm text-gray-600">活跃用户</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:dollar-sign" className="text-yellow-500" />
                  <span className="text-sm text-gray-600">收入</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">¥{stats.revenue.toLocaleString()}</p>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:trending-up" className="text-purple-500" />
                  <span className="text-sm text-gray-600">增长率</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.growth}%</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Icon icon="lucide:loader" className="animate-spin mx-auto mb-2" />
              <p className="text-gray-600">加载统计数据中...</p>
            </div>
          )}
        </div>

        {/* 用户列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">用户列表 (Mock数据)</h2>
          {users.length > 0 ? (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="max-h-80 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-gray-50">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <div className="text-xs text-gray-400">#{user.id}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <Icon icon="lucide:users" className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600">暂无用户数据</p>
            </div>
          )}
        </div>
      </div>

      {/* 图表展示 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">数据图表 (ECharts)</h2>
        <div className="bg-white border rounded-lg p-4">
          <LineChart className="h-80" />
        </div>
      </div>

      {/* 技术栈说明 */}
      <div className="bg-gray-50 border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">本页面展示的技术特性</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>API 调用:</strong> 使用封装的 axios 实例</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>Mock 数据:</strong> Mock.js 模拟后端数据</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>状态管理:</strong> Zustand 全局状态</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>UI 组件:</strong> shadcn/ui + TailwindCSS</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>图标系统:</strong> Iconify 图标库</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>图表可视化:</strong> ECharts 图表库</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>TypeScript:</strong> 类型安全开发</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" className="text-green-500" size={16} />
              <span><strong>生产就绪:</strong> 优化构建配置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TestMockData);
