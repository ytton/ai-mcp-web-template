import { memo, useEffect, useState } from 'react';
import { VChart } from '@visactor/react-vchart';
import { chartApi, type ChartDataPoint } from '@/api/chart';

interface LineChartProps {
  className?: string;
}

function LineChart({ className }: LineChartProps) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const chartData = await chartApi.getLineChartData();
        setData(chartData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const spec = {
    type: 'line' as const,
    data: {
      values: data
    },
    xField: 'month',
    yField: 'value',
    point: {
      visible: true
    },
    axes: [
      {
        orient: 'bottom' as const,
        type: 'band' as const
      },
      {
        orient: 'left' as const,
        type: 'linear' as const
      }
    ],
    color: ['#3b82f6']
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-80 ${className}`}>
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-80 ${className}`}>
        <div className="text-destructive">错误: {error}</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <VChart spec={spec} options={{ theme: 'light' }} />
    </div>
  );
}

export default memo(LineChart);
