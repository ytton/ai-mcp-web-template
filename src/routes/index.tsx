import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Icon from '@/components/ui/icon'
import LineChart from '@/components/LineChart'
import TestMockData from '@/components/TestMockData'
import { useAppStore } from '@/stores/useAppStore'

function HomePage() {
  const { count, increment, decrement, reset } = useAppStore()

  return (
    <div className="min-h-content container mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AI MCP Web Template
        </h1>
        <p className="text-muted-foreground">
          基于 React + TypeScript + TailwindCSS + shadcn/ui 的现代化 Web 模板
        </p>
      </div>

      {/* Zustand 状态管理示例 */}
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Icon icon="lucide:zap" size={24} />
          Zustand 状态管理
        </h2>
        <div className="flex items-center gap-4">
          <Button onClick={decrement} variant="outline">
            <Icon icon="lucide:minus" size={16} />
          </Button>
          <span className="text-xl font-mono bg-muted px-4 py-2 rounded">
            {count}
          </span>
          <Button onClick={increment}>
            <Icon icon="lucide:plus" size={16} />
          </Button>
          <Button onClick={reset} variant="secondary">
            重置
          </Button>
        </div>
      </div>

      {/* UI 组件示例 */}
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Icon icon="lucide:palette" size={24} />
          UI 组件示例
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button>默认按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="destructive">危险按钮</Button>
          </div>
          
          <div className="max-w-md">
            <Input placeholder="请输入内容..." />
          </div>
        </div>
      </div>

      {/* 图标系统示例 */}
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Icon icon="lucide:star" size={24} />
          图标系统
        </h2>
        <div className="flex gap-4 items-center">
          <Icon icon="lucide:heart" size={24} className="text-red-500" />
          <Icon icon="lucide:thumbs-up" size={24} className="text-blue-500" />
          <Icon icon="lucide:message-circle" size={24} className="text-green-500" />
          <Icon icon="lucide:bookmark" size={24} className="text-purple-500" />
          <Icon icon="lucide:share-2" size={24} className="text-orange-500" />
        </div>
      </div>

      {/* Mock 数据测试 */}
      <TestMockData />

      {/* 图表示例 */}
      <div className="bg-card p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Icon icon="lucide:bar-chart-3" size={24} />
          图表展示 (VChart)
        </h2>
        <div className="h-80">
          <LineChart className="w-full h-full" />
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: HomePage,
})
