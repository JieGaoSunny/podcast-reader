# 播客精读录 — 测试文档 (Test Plan)

> 版本：v0.1 | 日期：2026-03-24 | 作者：三毛-首席开发

## 1. 测试策略

项目为纯静态网站 + 自动化管线，测试分两大块：
1. **网站功能测试**：页面渲染、响应式、SEO
2. **管线集成测试**：端到端自动发布流程

### 1.1 测试原则
- 以手动验收为主（静态站点不需要复杂自动化测试）
- 关键路径必须端到端验证
- 每个 Phase 交付前做一轮完整验收

## 2. Phase 1 测试用例

### 2.1 首页

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| H1 | 访问 podcast.societas.work | 显示首页，文章列表按日期倒序 | ⬜ |
| H2 | 首页加载时间 | < 2 秒（Lighthouse Performance > 90） | ⬜ |
| H3 | 文章卡片展示 | 每张卡片显示：缩略图、标题、频道名、日期 | ⬜ |
| H4 | 点击文章卡片 | 跳转到对应文章详情页 | ⬜ |
| H5 | 移动端（375px） | 卡片单列排列，无水平溢出 | ⬜ |
| H6 | 平板端（768px） | 卡片双列排列 | ⬜ |
| H7 | 桌面端（1280px） | 卡片三列排列（或双列宽卡） | ⬜ |

### 2.2 文章详情页

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| P1 | 访问文章 URL | 完整渲染文章内容 | ⬜ |
| P2 | Masthead | 深蓝色头部，显示期号（Vol.XXXXXXXX） | ⬜ |
| P3 | 标题 | 居中显示，底部蓝色边框强调 | ⬜ |
| P4 | 缩略图 | YouTube 缩略图正确加载并显示 | ⬜ |
| P5 | 来源链接 | "收听原始播客"按钮可点击，跳转 YouTube | ⬜ |
| P6 | 频道 & 日期 | 来源频道名 + 发布日期正确显示 | ⬜ |
| P7 | 章节标题 | 深蓝色圆角标签样式，居中 | ⬜ |
| P8 | 金句引用 | blockquote 样式：灰色背景、斜体、左侧边距 | ⬜ |
| P9 | 关键词高亮 | 蓝色加粗（`<span>` 样式匹配邮件模板） | ⬜ |
| P10 | 快问快答 | 表格渲染正确，斑马纹交替背景 | ⬜ |
| P11 | 页脚 | 来源声明 + "Build with..." | ⬜ |
| P12 | 移动端阅读 | 正文字号合适（≥16px），行高 1.75，无水平滚动 | ⬜ |
| P13 | 图片响应式 | 缩略图在小屏幕上自适应宽度 | ⬜ |

### 2.3 导航 & 通用

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| N1 | Header 导航 | 包含品牌名 + 首页链接 + 关于链接 | ⬜ |
| N2 | Footer | 版权信息 + 品牌声明 | ⬜ |
| N3 | 404 页面 | 访问不存在的 URL 显示友好 404 页面 | ⬜ |
| N4 | SEO meta | 每页有正确的 title、description、og:image | ⬜ |
| N5 | favicon | 正确显示 | ⬜ |

### 2.4 性能 & SEO

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| S1 | Lighthouse Performance | > 90 | ⬜ |
| S2 | Lighthouse Accessibility | > 90 | ⬜ |
| S3 | Lighthouse SEO | > 90 | ⬜ |
| S4 | HTML 语义化 | 使用 article、header、nav、main 等语义标签 | ⬜ |
| S5 | Open Graph | 分享到社交媒体时显示正确的标题、描述、图片 | ⬜ |

## 3. Phase 2 测试用例

### 3.1 n8n API 连通性

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| A1 | GET /api/v1/workflows | 200，返回工作流列表 | ⬜ |
| A2 | 读 Data Table 全量记录 | 200，返回 Video_Updates 55 条数据 | ⬜ |
| A3 | 读 Data Table 单条记录 | 200，返回指定 VideoId 记录 | ⬜ |
| A4 | 写 Data Table（新增字段值） | 200，WebsiteStatus 字段可写入 | ⬜ |
| A5 | API key 过期/无效 | 401，三毛能识别并告警 | ⬜ |

### 3.2 Data Table 字段扩展

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| D1 | Transcript 字段存在且可读 | 转录稿全文正确存储 | ⬜ |
| D2 | WebsiteStatus 字段读写 | pending/processing/review/published/failed 正确流转 | ⬜ |
| D3 | ArticleSlug 字段写入 | slug 格式正确（YYYY-MM-DD-keywords） | ⬜ |
| D4 | PublishedAt_Web 字段写入 | datetime 格式正确 | ⬜ |

### 3.3 n8n 下游管线改造

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| W1 | 转录后存 Transcript | SuperData 输出写入 Data Table Transcript 字段 | ⬜ |
| W2 | 转录后标记 WebsiteStatus=pending | 状态正确设置 | ⬜ |
| W3 | 千问节点已删除/禁用 | AI Agent1 不再执行 | ⬜ |
| W4 | 邮件管线不受影响 | EmailGenerator + SendEmail 正常工作 | ⬜ |
| W5 | 上游管线不受影响 | 新视频检测 + Upsert 正常 | ⬜ |

### 3.4 三毛处理脚本

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| T1 | 轮询 Data Table | 正确识别 WebsiteStatus=pending 的记录 | ⬜ |
| T2 | 无 pending 记录 | 不执行任何操作，无报错 | ⬜ |
| T3 | Claude 改写 | 输出 ~3000 字 Markdown，V2 风格，含 frontmatter | ⬜ |
| T4 | Frontmatter 完整性 | title/date/source_url/channel/guest/thumbnail/tags 全部正确 | ⬜ |
| T5 | 章节结构 | ≥5 个 h2 小标题 | ⬜ |
| T6 | 金句提取 | ≥2 条 blockquote | ⬜ |
| T7 | 忠实度 | 不编造转录稿之外的事实 | ⬜ |
| T8 | Markdown 语法 | Astro build 无报错 | ⬜ |
| T9 | FLUX 插画生成 | Notion 风格，已保存到 public/images/ | ⬜ |
| T10 | 标记 processing | 开始处理时 WebsiteStatus=processing | ⬜ |

### 3.5 J Review 流程

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| R1 | 飞书通知 J | 改写完成后发飞书消息，含标题+摘要+预览 | ⬜ |
| R2 | J 确认发布 | J 回复确认后才执行 git push | ⬜ |
| R3 | J 拒绝/要求修改 | 三毛根据反馈修改，重新提交 review | ⬜ |
| R4 | 标记 review | 发送 review 后 WebsiteStatus=review | ⬜ |

### 3.6 发布流程

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| G1 | git add + commit | .md 文件 + 插画图片正确提交 | ⬜ |
| G2 | git push | 推送到 GitHub 成功 | ⬜ |
| G3 | Cloudflare 自动构建 | push 后自动触发，构建成功 | ⬜ |
| G4 | 新文章可访问 | podcast.societas.work/posts/{slug} 返回 200 | ⬜ |
| G5 | 首页更新 | 新文章出现在首页列表顶部 | ⬜ |
| G6 | 回写 Data Table | WebsiteStatus=published + ArticleSlug + PublishedAt_Web | ⬜ |
| G7 | .env 不被提交 | git status 不包含 .env | ⬜ |

### 3.7 端到端集成

| # | 用例 | 预期结果 | 状态 |
|---|------|---------|------|
| E1 | 全流程：新视频 → 文章上线 | n8n 转录 → 三毛改写 → J review → 发布 | ⬜ |
| E2 | 全流程时间 | 三毛处理部分 < 5 分钟（不含 J review 等待） | ⬜ |
| E3 | 重复处理防护 | 同一视频不会被重复改写 | ⬜ |
| E4 | 错误恢复 | 改写失败 → WebsiteStatus=failed + 通知 J | ⬜ |
| E5 | 多条 pending | 按队列逐条处理，不遗漏 | ⬜ |

## 4. 测试环境

| 环境 | 说明 |
|------|------|
| 本地开发 | `astro dev`，localhost:4321 |
| Cloudflare Preview | PR/分支自动部署的预览 URL |
| 生产 | podcast.societas.work |

### 测试浏览器
- Edge（J 的主力浏览器）
- Chrome（兼容性）
- Safari（移动端）

### 测试设备
- 桌面：Windows 10 + Edge
- 移动端：iPhone / Android（真机或 DevTools 模拟）

## 5. 验收标准

### Phase 1 验收
- [ ] 所有 H1-H7、P1-P13、N1-N5、S1-S5 测试通过
- [ ] 至少 2 篇示例文章正确展示
- [ ] 域名 podcast.societas.work 可访问
- [ ] Lighthouse 四项指标均 > 90

### Phase 2 验收
- [ ] A1-A5 n8n API 连通性全部通过
- [ ] D1-D4 Data Table 字段扩展全部通过
- [ ] W1-W5 n8n 工作流改造全部通过
- [ ] T1-T10 三毛处理脚本全部通过
- [ ] R1-R4 J Review 流程全部通过
- [ ] G1-G7 发布流程全部通过
- [ ] E1-E5 端到端集成全部通过
- [ ] 至少完成 1 次完整端到端自动发布
- [ ] J 对改写质量满意
