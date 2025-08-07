# Contributing to AI MCP Web Template

感谢您对本项目的贡献！以下是参与贡献的指南。

## 开发环境设置

1. **Fork 并克隆仓库**
   ```bash
   git clone https://github.com/yourusername/ai-mcp-web-template.git
   cd ai-mcp-web-template
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

## 代码规范

### 技术栈要求
- React 19 + TypeScript
- TailwindCSS 用于样式
- shadcn/ui 组件库
- 遵循项目的 `.cursorrules` 中定义的规范

### 代码风格
- 使用 TypeScript 进行类型安全开发
- 组件使用函数组件 + memo
- 优先使用项目现有的工具和组件
- 遵循 TailwindCSS 最佳实践

### 提交规范
使用语义化提交信息：
- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

例如：
```
feat: 添加用户认证功能
fix: 修复路由导航问题
docs: 更新API文档
```

## 提交流程

1. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **进行开发并提交**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   ```

3. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **创建 Pull Request**
   - 使用清晰的标题和描述
   - 关联相关的 issue
   - 确保所有测试通过

## 代码审查

- 所有 PR 需要通过代码审查
- 确保代码符合项目规范
- 添加必要的测试
- 更新相关文档

## 问题报告

使用 GitHub Issues 报告问题时，请提供：
- 问题的详细描述
- 重现步骤
- 预期行为
- 实际行为
- 环境信息（浏览器、Node.js版本等）

## 功能建议

欢迎提出新功能建议！请：
- 先检查是否已有类似的 issue
- 详细描述功能需求
- 说明使用场景
- 考虑实现的复杂度

## 社区准则

- 保持友善和专业
- 尊重不同的观点
- 提供建设性的反馈
- 帮助新贡献者

感谢您的贡献！🎉
