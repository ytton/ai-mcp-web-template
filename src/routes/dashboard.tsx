import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  dashboardApi,
  type DashboardStats,
  type DashboardChartData,
  type RecentActivity,
} from "@/api/dashboard";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

function DashboardPage() {
  // 状态管理
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<DashboardChartData[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("30d");

  // 加载数据
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 并行请求所有数据
      const [statsData, chartDataResult, activitiesData] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getChartData(chartPeriod),
        dashboardApi.getRecentActivity(8),
      ]);

      setStats(statsData);
      setChartData(chartDataResult);
      setActivities(activitiesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载数据失败");
    } finally {
      setLoading(false);
    }
  };

  // 初始加载和周期变化时重新加载
  useEffect(() => {
    loadDashboardData();
  }, [chartPeriod]);

  // 图表配置
  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['用户数', '订单数'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '用户数',
        type: 'line',
        data: chartData.map(item => item.users),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#3b82f6'
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2
        }
      },
      {
        name: '订单数',
        type: 'line',
        data: chartData.map(item => item.orders),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#10b981'
        },
        lineStyle: {
          color: '#10b981',
          width: 2
        }
      }
    ]
  };

  // 获取状态图标和颜色
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return "lucide:user";
      case "order":
        return "lucide:shopping-cart";
      case "payment":
        return "lucide:credit-card";
      default:
        return "lucide:activity";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-content">
        <div className="flex items-center gap-3">
          <Icon icon="lucide:loader-2" size={24} className="animate-spin" />
          <span className="text-lg">加载中...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-content">
        <div className="text-center">
          <Icon
            icon="lucide:alert-circle"
            size={48}
            className="mx-auto mb-4 text-destructive"
          />
          <h2 className="text-xl font-semibold mb-2">加载失败</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={loadDashboardData}>
            <Icon icon="lucide:refresh-cw" size={16} className="mr-2" />
            重试
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-content container mx-auto p-8 space-y-8">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">仪表盘</h1>
          <p className="text-muted-foreground">欢迎回来，这里是您的数据概览</p>
        </div>
        <Button onClick={loadDashboardData} variant="outline">
          <Icon icon="lucide:refresh-cw" size={16} className="mr-2" />
          刷新
        </Button>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总用户数</p>
                <p className="text-2xl font-bold">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <Icon icon="lucide:users" size={24} className="text-blue-500" />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总订单数</p>
                <p className="text-2xl font-bold">
                  {stats.totalOrders.toLocaleString()}
                </p>
              </div>
              <Icon
                icon="lucide:shopping-bag"
                size={24}
                className="text-green-500"
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总收入</p>
                <p className="text-2xl font-bold">
                  ¥{stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <Icon
                icon="lucide:dollar-sign"
                size={24}
                className="text-yellow-500"
              />
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">增长率</p>
                <p className="text-2xl font-bold">{stats.growthRate}%</p>
              </div>
              <Icon
                icon="lucide:trending-up"
                size={24}
                className="text-purple-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 趋势图表 */}
        <div className="col-span-2 bg-card p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">数据趋势</h2>
            <div className="flex gap-2">
              {(["7d", "30d", "90d"] as const).map((period) => (
                <Button
                  key={period}
                  variant={chartPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartPeriod(period)}
                >
                  {period === "7d" ? "7天" : period === "30d" ? "30天" : "90天"}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ReactECharts 
              option={chartOption} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        </div>

        {/* 最近活动 */}
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-6">最近活动</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-full bg-muted ${getStatusColor(activity.status)}`}
                >
                  <Icon icon={getActivityIcon(activity.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});
