# 播客精读录 — 开发文档 (Technical Design)

> 版本：v0.1 | 日期：2026-03-24 | 作者：三毛-首席开发

## 1. 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 静态站点生成 | **Astro 5.x** | 纯静态输出，Markdown 原生支持 |
| 样式 | **Tailwind CSS 4.x** | 实用优先，快速还原邮件模板设计 |
| 内容格式 | **Markdown + Frontmatter** | 每篇文章一个 .md 文件 |
| 版本控制 | **Git + GitHub** | 内容即代码 |
| 部署 | **Cloudflare Pages** | 自动构建，全球 CDN |
| 域名 | **podcast.societas.work** | Cloudflare DNS，CNAME 指向 Pages |
| 转录 | **SuperData API** | YouTube 视频逐字稿（n8n 调用） |
| AI 改写 | **OpenClaw (Claude)** | 三毛-首席开发 通过 GitHub Copilot 配额 |
| 工作流编排 | **n8n** | 定时触发、YouTube 监控、数据管理 |
| 邮件 | **Resend API** | 可选邮件推送（保留现有功能） |

## 2. 项目结构

```
podcast-reader/
├── src/
│   ├── content/
│   │   └── posts/           # Markdown 文章目录
│   │       ├── 2026-03-07-design-future.md
│   │       └── ...
│   ├── layouts/
│   │   ├── BaseLayout.astro  # 基础 HTML 骨架
│   │   └── PostLayout.astro  # 文章详情布局
│   ├── pages/
│   │   ├── index.astro       # 首页（文章列表）
│   │   ├── posts/
│   │   │   └── [...slug].astro  # 文章详情动态路由
│   │   ├── about.astro       # 关于页面
│   │   └── rss.xml.ts        # RSS feed（Phase 3）
│   ├── components/
│   │   ├── Header.astro      # 导航栏
│   │   ├── Footer.astro      # 页脚
│   │   ├── PostCard.astro    # 文章卡片（列表用）
│   │   ├── PostMeta.astro    # 文章元信息（来源、日期等）
│   │   └── Quote.astro       # 金句引用组件
│   └── styles/
│       └── global.css        # 全局样式 + Tailwind
├── public/
│   ├── favicon.svg
│   └── og-image.png          # 社交分享默认图
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

## 3. 内容 Schema

Astro Content Collections 定义：

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    source_url: z.string().url(),
    channel: z.string(),
    guest: z.string().optional(),
    guest_title: z.string().optional(),
    thumbnail: z.string().url(),
    tags: z.array(z.string()).default([]),
    duration: z.string().optional(),
    reading_time: z.number().optional(),
    volume: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
```

## 4. 页面设计

### 4.1 首页 (`/`)
- 顶部：品牌 masthead（播客精读录 logo + 简介）
- 内容：文章卡片列表（按日期倒序）
- 卡片包含：缩略图、标题、频道名、日期、标签
- 分页：每页 10 篇（或无限滚动，Phase 2）

### 4.2 文章详情 (`/posts/{slug}`)
- 延续邮件模板的设计语言：
  - 深蓝色 masthead（期号）
  - 标题 + 底部边框强调
  - YouTube 缩略图
  - 来源链接按钮 + 频道信息
  - 正文（Markdown 渲染，自定义样式匹配邮件模板）
  - 金句 blockquote 样式
  - 章节标题样式（深蓝色圆角标签）
  - 快问快答表格
  - 结语
  - 页脚（来源声明）

### 4.3 关于页面 (`/about`)
- 项目介绍
- 联系方式（待定）

## 5. 自动化管线

### 5.1 当前流程（n8n + 千问）
```
Schedule Trigger (7AM daily)
    ↓
GetRows1 → 获取待处理视频列表
    ↓
Code in JavaScript1 → 过滤/准备数据
    ↓
supadata1 → SuperData API 获取逐字稿
    ↓
数据清洗 → 清理逐字稿
    ↓
AI Agent1 (千问) → 深度改写
    ↓
EmailGenerator → 生成 HTML 邮件
    ↓
SendEmail (Resend) → 发送邮件
    ↓
Update row(s) → 更新处理状态
```

### 5.2 目标流程（n8n + OpenClaw）
```
Schedule Trigger (7AM daily)
    ↓
GetRows1 → 获取待处理视频列表
    ↓
Code in JavaScript1 → 过滤/准备数据
    ↓
supadata1 → SuperData API 获取逐字稿
    ↓
数据清洗 → 清理逐字稿
    ↓
Webhook → 调用 OpenClaw API（三毛-首席开发）  ← 【替换千问】
    ↓
OpenClaw 返回 Markdown 文章
    ↓
Git Push → 写入 GitHub repo /src/content/posts/
    ↓
Cloudflare Pages 自动构建部署
    ↓ (可选)
EmailGenerator + SendEmail → 邮件推送
    ↓
Update row(s) → 更新处理状态
```

### 5.3 关键改造点
1. **替换 AI Agent1**：千问 → OpenClaw webhook/API
2. **新增 Git Push 节点**：将 Markdown 文件推到 GitHub
3. **保留邮件**：可选，改写完成后仍可发邮件
4. **n8n → OpenClaw 通信方式**：待调研（webhook？HTTP Request？n8n 自定义节点？）

## 6. 部署配置

### 6.1 Cloudflare Pages
```
项目名：podcast-reader
构建命令：npm run build
输出目录：dist
Node 版本：20.x
```

### 6.2 DNS 配置
```
podcast.societas.work → CNAME → podcast-reader.pages.dev
```

### 6.3 环境变量
```
SITE_URL=https://podcast.societas.work
```

## 7. 开发里程碑

### Phase 1: 网站骨架（预估 2-3 天）
- [ ] 初始化 Astro 项目
- [ ] 配置 Tailwind CSS
- [ ] 实现 Content Collection schema
- [ ] 首页（文章列表）
- [ ] 文章详情页（还原邮件模板设计）
- [ ] 关于页面
- [ ] Header/Footer 组件
- [ ] 响应式适配
- [ ] 手动放入 2-3 篇示例文章（从现有邮件 HTML 转 Markdown）
- [ ] 部署到 Cloudflare Pages
- [ ] 配置域名 podcast.societas.work

### Phase 2: 内容管线对接（预估 3-5 天）
- [ ] 设计 n8n → OpenClaw 通信接口
- [ ] 编写 AI 改写 prompt（Claude 版）
- [ ] n8n 工作流改造：替换千问节点
- [ ] n8n 新增 Git Push 节点
- [ ] 端到端测试：YouTube 新视频 → 网站文章
- [ ] 历史文章迁移

## 8. 待确认 & 待调研 ⚠️

### 待 J 确认
（无）

### 已确认
- GitHub: JieGaoSunny/podcast-reader
- Cloudflare Pages: J 自行创建，构建配置由我提供
- AI 改写：V2 风格，连贯叙事，~8000字

### 待技术调研
1. **n8n → OpenClaw 通信方式**：OpenClaw 是否暴露 API/webhook？还是通过 n8n HTTP Request 节点调用？
2. **Git Push from n8n**：n8n 是否有 GitHub 节点可以直接 push 文件？还是用 HTTP Request 调 GitHub API？
3. **Cloudflare Pages 构建触发**：Git push 后是否自动触发？还是需要 webhook？
4. **SuperData 替代方案**：yt-dlp + whisper 本地转录的可行性（Phase 3）
