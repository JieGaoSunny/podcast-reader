# 播客精读录 — 产品需求文档 (PRD)

> 版本：v0.1 | 日期：2026-03-24 | 作者：三毛-首席开发

## 1. 产品概述

**播客精读录** 是一个自动化播客内容精读平台。系统自动监控 YouTube 播客频道，获取新视频逐字稿，通过 AI（Claude）深度改写为高质量长文，发布到公开网站供所有人阅读。

### 1.1 愿景
让优质播客内容以更易消化的文字形式触达更多人。

### 1.2 目标用户
- **主要用户**：J 本人（内容消费 + 管理）
- **公开读者**：对科技、AI、设计、产品等话题感兴趣的中文读者

## 2. 核心功能

### 2.1 MVP（Phase 1-2）

| 功能 | 描述 | 优先级 |
|------|------|--------|
| 文章展示 | 公开网站，展示 AI 改写后的播客精读文章 | P0 |
| 文章列表 | 首页按时间倒序展示所有文章，含标题、来源频道、日期、缩略图 | P0 |
| 文章详情 | 单篇文章页，含完整正文、YouTube 缩略图、原始链接、来源信息 | P0 |
| 自动发布 | n8n 触发 → SuperData 转录 → OpenClaw 改写 → Git push → 自动构建部署 | P0 |
| 邮件保留 | 改写完成后仍发送邮件（保留现有功能） | P1 |

### 2.2 后续功能（Phase 3-5）

| 功能 | 描述 | 优先级 |
|------|------|--------|
| RSS 订阅 | 生成 RSS feed，读者可通过阅读器订阅 | P1 |
| 频道分类 | 按播客频道分类浏览 | P1 |
| 标签系统 | 按话题标签（AI、设计、产品等）筛选 | P1 |
| 搜索 | 全文搜索文章内容 | P2 |
| 暗色模式 | 支持暗色/亮色主题切换 | P2 |
| 阅读时间 | 显示预估阅读时间 | P2 |
| 飞书推送 | 三毛每日推送"今日播客精华"到飞书 | P2 |
| 小红书同步 | 自动生成小红书风格短文并同步发布 | P3 |
| 多语言 | 中英双语版本 | P3 |

## 3. 内容规范

### 3.1 文章结构
基于现有邮件模板（V2/V3），每篇文章包含：

```
标题（吸引眼球但不标题党）
├── 嘉宾简介 + 核心要点提炼（bullet list）
├── YouTube 缩略图
├── 原始链接 + 来源频道 + 发布日期
├── 正文（分章节，每章有小标题）
│   ├── 金句引用（blockquote）
│   └── 关键概念高亮
├── 快问快答（如有）
└── 结语
```

### 3.2 文章元数据（Frontmatter）

```yaml
---
title: "文章标题"
date: 2026-03-07
source_url: "https://youtube.com/watch?v=xxx"
channel: "Lenny's Podcast"
guest: "Jenny Wen"
guest_title: "Anthropic Claude Co-work 设计负责人"
thumbnail: "https://i.ytimg.com/vi/xxx/sddefault.jpg"
tags: ["AI", "设计", "Anthropic"]
duration: "1h 23min"         # 原始播客时长
reading_time: 15             # 预估阅读分钟
volume: "Vol.20260307"       # 期号
---
```

### 3.3 内容质量标准
- 字数：~8000 字（V2 文学风格）
- 风格：深度改写，连贯叙事，非逐字转录；保留嘉宾原话作为金句
- 结构：章节分明，每章有独立小标题
- 忠实度：严格基于逐字稿，不添加外部信息

## 4. 信息架构

```
podcast.societas.work/
├── /                    # 首页（文章列表）
├── /posts/{slug}        # 文章详情页
├── /channels            # 频道列表页（Phase 2+）
├── /tags/{tag}          # 标签筛选页（Phase 2+）
├── /about               # 关于页面
└── /rss.xml             # RSS feed（Phase 3+）
```

## 5. 设计规范

### 5.1 品牌
- **名称**：播客精读录
- **主色**：#0F4C81（深蓝）
- **辅色**：待定
- **字体**：系统字体栈（-apple-system, PingFang SC, Microsoft YaHei 等）

### 5.2 设计原则
- 阅读体验优先，排版干净
- 延续现有邮件模板的设计语言（深蓝标题栏、金句 blockquote、高亮关键词）
- 移动端优先，响应式设计
- 加载速度快（纯静态，无 JS 框架依赖）

## 6. 系统架构

```
YouTube 频道
    ↓ (n8n 定时触发，每天 7AM)
新视频检测 → n8n Data Table 记录
    ↓
SuperData API → 逐字稿
    ↓
OpenClaw (三毛-首席开发) → Claude 深度改写 → Markdown 文件
    ↓
Git push → GitHub repo
    ↓
Cloudflare Pages → 自动构建 → podcast.societas.work
    ↓ (可选)
Resend → 邮件推送
```

## 7. 内容来源

### 7.1 关注频道（5个）
| # | 频道 | 语言 | 类型 |
|---|------|------|------|
| 1 | South Park Commons | 英文 | 科技创业访谈 |
| 2 | Anthropic | 英文 | AI 官方发布 |
| 3 | Lenny's Podcast | 英文 | 产品/创业深度访谈 |
| 4 | Peter Yang | 英文 | AI 工具教程 |
| 5 | 张小珺 | 中文 | 科技深度 |

### 7.2 内容量
- 视频总量：55 条（2026-01-12 ~ 2026-03-08）
- 日均产出：~1 条/天
- 无筛选逻辑，所有新视频均处理

### 7.3 Video_Updates 表结构（11列）
| 列名 | 类型 | 说明 |
|------|------|------|
| id | int | 自增 ID |
| Number | int | 序号 |
| VideoID | string | YouTube 视频 ID |
| Title | string | 视频标题 |
| Link | string | YouTube 链接 |
| PublishTime | datetime | 发布时间 |
| ChannelName | string | 频道名 |
| Notes | string | 视频描述/嘉宾信息 |
| Thumbnail | string | 缩略图 URL（i.ytimg.com） |
| ProcessingStatus | enum | Done=已处理 / Todo=待处理 / Null=未标记 |
| createdAt/updatedAt | datetime | 记录时间戳 |

## 8. 已确认决策

| # | 问题 | 决定 |
|---|------|------|
| 1 | 辅助色 | 沿用邮件模板（背景 #f0f2f5，正文 #333） |
| 2 | URL 格式 | 日期+关键词：`/posts/2026-03-07-design-future` |
| 3 | 关于页面 | 极简版：一段介绍 + AI 转写声明 |
| 4 | 邮件推送 | 保留 |
| 5 | 历史文章 | 精选 5 篇先上 |
| 6 | 内容频率 | ~1 篇/天，不筛选 |
| 7 | 改写风格 | V2（文学性强，连贯叙事，~8000字） |
| 8 | GitHub | JieGaoSunny/podcast-reader |
| 9 | Cloudflare Pages | 新建，J 自行创建 |

## 9. 已关闭事项 ✅

1. **Anthropic 短视频** → 排除（产品介绍短片不适合精读录格式）
2. **Peter Yang 教程视频** → 保留（教程也适合精读录）
