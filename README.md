# AI MCP Web Template

[中文](#中文文档) | [English](#english-documentation)

## English Documentation

### 🚀 Overview

AI MCP Web Template is a modern, production-ready React web application template specifically designed for AI-powered applications with MCP (Model Context Protocol) integration. This template provides a solid foundation for building sophisticated web applications with AI capabilities, featuring a comprehensive tech stack and best practices.

### ✨ Features

- **🎯 AI-First Design**: Built specifically for AI-powered applications with MCP integration
- **⚛️ Modern React**: React 19 with TypeScript for type-safe development
- **🎨 Beautiful UI**: TailwindCSS v3 + shadcn/ui component library
- **🛣️ File-based Routing**: TanStack Router with automatic code splitting
- **📊 Data Visualization**: Integrated ECharts for comprehensive charting capabilities
- **🔄 State Management**: Zustand for lightweight, scalable state management
- **🌐 HTTP Client**: Axios with request/response interceptors and error handling
- **🎭 Mock Data**: Built-in Mock.js integration for development
- **🔧 Developer Experience**: Hot reload, TypeScript, ESLint, and comprehensive tooling
- **🚀 Production Ready**: Optimized build configuration with Vite

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, TailwindCSS
- **UI Components**: shadcn/ui, Radix UI
- **Routing**: TanStack Router (file-based)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Charts**: echarts + echarts-for-react
- **Icons**: Iconify + Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Styling**: TailwindCSS + PostCSS
- **Mock Data**: Mock.js

### 📁 Project Structure

```
src/
├── api/           # API request modules
├── components/    # React components
│   ├── ui/        # Base UI components (shadcn/ui)
│   └── layout/    # Layout components
├── hooks/         # Custom React hooks
├── stores/        # Zustand stores
├── routes/        # File-based routing (TanStack Router)
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── constants/     # Application constants
└── mock/          # Mock data configuration
```

### 🚀 Quick Start

1. **Use this template**
   ```bash
   # Click "Use this template" on GitHub or clone directly
   git clone https://github.com/yourusername/ai-mcp-web-template.git
   cd ai-mcp-web-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run serve` - Preview production build
- `npm test` - Run tests

### 🎨 UI Components

This template uses shadcn/ui components. To add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

### 🌐 API Integration

The template includes a pre-configured API layer:

```typescript
// Example API usage
import { getUserProfile, updateUser } from '@/api/user';

const user = await getUserProfile();
await updateUser(userId, userData);
```

### 📊 Charts & Visualization

Built-in chart components using ECharts:

```typescript
import { LineChart } from '@/components/LineChart';

<LineChart data={chartData} />
```

### 🔄 State Management

Zustand stores for clean state management:

```typescript
// stores/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 🛣️ Routing

File-based routing with TanStack Router:

```typescript
// routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return <div>Dashboard Content</div>;
}
```

### 🎭 Mock Data

Mock.js integration for development:

```typescript
// mock/index.ts
import Mock from 'mockjs';

Mock.mock('/api/users', 'get', {
  code: 200,
  data: {
    'list|10': [{
      'id|+1': 1,
      'name': '@name',
      'email': '@email'
    }]
  }
});
```

### 🚀 Deployment

Build and deploy your application:

```bash
npm run build
```

The `dist` folder contains the production-ready files.

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 中文文档

### 🚀 项目概述

AI MCP Web Template 是一个现代化的、生产就绪的 React Web 应用模板，专为集成 AI MCP（模型上下文协议）的应用程序设计。此模板为构建具有 AI 功能的复杂 Web 应用程序提供了坚实的基础，具有完整的技术栈和最佳实践。

### ✨ 核心特性

- **🎯 AI 优先设计**: 专为集成 MCP 的 AI 应用程序构建
- **⚛️ 现代 React**: React 19 + TypeScript 类型安全开发
- **🎨 精美 UI**: TailwindCSS v3 + shadcn/ui 组件库
- **🛣️ 文件路由**: TanStack Router 自动代码分割
- **📊 数据可视化**: 集成 ECharts 图表库
- **🔄 状态管理**: Zustand 轻量级状态管理
- **🌐 HTTP 客户端**: Axios 请求拦截和错误处理
- **🎭 模拟数据**: 内置 Mock.js 开发支持
- **🔧 开发体验**: 热重载、TypeScript、ESLint 等完整工具链
- **🚀 生产就绪**: Vite 优化构建配置

### 🛠️ 技术栈

- **前端框架**: React 19, TypeScript, TailwindCSS
- **UI 组件**: shadcn/ui, Radix UI
- **路由系统**: TanStack Router (文件路由)
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **图表库**: echarts + echarts-for-react
- **图标系统**: Iconify + Lucide React
- **构建工具**: Vite
- **测试框架**: Vitest + Testing Library
- **样式方案**: TailwindCSS + PostCSS
- **模拟数据**: Mock.js

### 📁 项目结构

```
src/
├── api/           # API 请求模块
├── components/    # React 组件
│   ├── ui/        # 基础 UI 组件 (shadcn/ui)
│   └── layout/    # 布局组件
├── hooks/         # 自定义 React Hooks
├── stores/        # Zustand 状态管理
├── routes/        # 文件路由 (TanStack Router)
├── types/         # TypeScript 类型定义
├── utils/         # 工具函数
├── constants/     # 应用常量
└── mock/          # 模拟数据配置
```

### 🚀 快速开始

1. **使用此模板**
   ```bash
   # 在 GitHub 点击 "Use this template" 或直接克隆
   git clone https://github.com/yourusername/ai-mcp-web-template.git
   cd ai-mcp-web-template
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp env.example .env
   # 编辑 .env 文件配置您的设置
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **打开浏览器**
   ```
   http://localhost:3000
   ```

### 📜 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run serve` - 预览生产构建
- `npm test` - 运行测试

### 🎨 UI 组件

此模板使用 shadcn/ui 组件。添加新组件：

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

### 🌐 API 集成

模板包含预配置的 API 层：

```typescript
// API 使用示例
import { getUserProfile, updateUser } from '@/api/user';

const user = await getUserProfile();
await updateUser(userId, userData);
```

### 📊 图表可视化

使用 ECharts 的内置图表组件：

```typescript
import { LineChart } from '@/components/LineChart';

<LineChart data={chartData} />
```

### 🔄 状态管理

使用 Zustand 进行清晰的状态管理：

```typescript
// stores/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### 🛣️ 路由系统

TanStack Router 文件路由：

```typescript
// routes/dashboard.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return <div>仪表板内容</div>;
}
```

### 🎭 模拟数据

Mock.js 开发集成：

```typescript
// mock/index.ts
import Mock from 'mockjs';

Mock.mock('/api/users', 'get', {
  code: 200,
  data: {
    'list|10': [{
      'id|+1': 1,
      'name': '@name',
      'email': '@email'
    }]
  }
});
```

### 🚀 部署

构建和部署应用：

```bash
npm run build
```

`dist` 文件夹包含生产就绪的文件。

### 🤝 贡献

1. Fork 此仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 📄 许可证

此项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。