# 播客精读录 — 批量内容处理技术文档

## 1. 任务概述

J 提供 10 个 YouTube 播客链接，三毛完成以下处理后发布到 podcast.societas.work。

## 2. 处理流程

```
YouTube 链接
  ↓
① 获取视频元数据（标题、频道、发布日期、时长）
  ↓
② 获取封面图（YouTube 缩略图 + 频道头像）
  ↓
③ 获取转录稿（SuperData API via n8n）
  ↓
④ Claude 深度改写（V2 风格，~6000-8000 字）
  ↓
⑤ 生成 Notion 风格插画（FLUX.1-schnell）
  ↓
⑥ 生成 Markdown 文件 + frontmatter
  ↓
⑦ J Review（飞书发送预览）
  ↓
⑧ git push → Cloudflare 自动部署
```

## 3. 各步骤技术细节

### 3.1 视频元数据获取

**方式**：YouTube oEmbed API（免费，无需 API key）

```
GET https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={VIDEO_ID}&format=json
```

返回：标题、作者（频道名）、缩略图 URL。

补充信息通过 `web_fetch` 抓取视频页面获取：发布日期、时长、描述。

**⚠️ 发布日期（极其重要）**：
- frontmatter 的 `date` 字段必须使用 **YouTube 视频的发布日期**，绝不能用制作/转写完成日期
- 获取方式：用浏览器打开 YouTube 视频页面，在 views 旁边会显示"X days/months/years ago"或具体日期
- noembed API 不返回日期，SuperData API 也不返回日期，必须通过浏览器查看
- 如果 YouTube 显示模糊时间（如"7 months ago"），需推算出大致日期（从当前日期往回推）
- **绝不能偷懒用当天日期填充！这会导致文章排序混乱。**

### 3.2 封面图获取

YouTube 视频缩略图有多个分辨率：

| 尺寸 | URL |
|------|-----|
| 默认 (120×90) | `https://img.youtube.com/vi/{VIDEO_ID}/default.jpg` |
| 中等 (320×180) | `https://img.youtube.com/vi/{VIDEO_ID}/mqdefault.jpg` |
| 高清 (480×360) | `https://img.youtube.com/vi/{VIDEO_ID}/hqdefault.jpg` |
| 标准 (640×480) | `https://img.youtube.com/vi/{VIDEO_ID}/sddefault.jpg` |
| **最高清 (1280×720)** | `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg` |

**策略**：
- 优先下载 `maxresdefault.jpg`（1280×720）
- 若不存在（返回灰色占位图），降级到 `hqdefault.jpg`
- 保存到 `public/images/thumbnails/{VIDEO_ID}.jpg`
- 文章 frontmatter 的 `thumbnail` 字段引用此本地路径

**频道头像**：从视频页面 HTML 中提取频道 avatar URL，下载保存。

### 3.3 转录稿获取

**方式**：通过 n8n REST API 触发 SuperData 转录

**方案 A — 直接调 SuperData API**（推荐，更快）：
```
POST https://api.supadata.ai/v1/youtube/transcript
Headers: x-api-key: {SUPADATA_API_KEY}
Body: { "url": "https://www.youtube.com/watch?v={VIDEO_ID}", "lang": "en" }
```

**方案 B — 通过 n8n 工作流**：
```
GET https://n8n.societas.work/api/v1/...
Headers: X-N8N-API-KEY: {KEY}
```
读取 Data Table 中已有的转录稿（如果 n8n 已经处理过）。

**优先级**：
1. 先检查 n8n Data Table 是否已有该视频的转录稿
2. 如果没有，直接调 SuperData API
3. SuperData 额度约 50 次，10 篇足够

**⚠️ SuperData API Key**：需要从 n8n 工作流的 supadata1 节点中获取，或 J 提供。

### 3.4 AI 深度改写

**模型**：Claude（当前 session 模型）

**改写风格**：V3 — 纪录片式还原 + 网页可读性（参考《张小珺商业访谈录》播客书标准）

**最高优先级：真实性与完整性**
- 保留受访者所有的逻辑推演过程、论点论据及背景细节
- **严禁**任何形式的概括、浓缩或删减
- 字数：跟随原文内容量，不设上限（短播客 5000-8000 字，长播客 10000-20000 字，超长播客 20000+ 字）

**表达原则**：
- 保留嘉宾的"肌肉记忆"表达：特定比喻、口头禅、非标词汇、自嘲
- 仅去除纯粹口语填充词（"那个"、"呃"）
- 严禁重写或美化语气
- 严禁文学化编造（不编环境描写、心理臆测、神态描写）
- 所有张力来自对话本身、思想交锋、事实陈述

**专有名词校验**：
- 准确识别人名，修正 ASR 同音错别字（如"投后"误为"投厚"）
- 严格核对公司名、产品名、术语、英文缩写

**网页适配（区别于书籍版）**：
- 允许小标题分段（网页需要导航锚点）
- 关键观点用 blockquote 高亮（屏幕阅读视觉节奏）
- 保留编者按（开篇 200 字简介背景）
- 结尾加「核心观点速览」（5-10 条要点）
- 第一次提到行业人物时用 1-2 句介绍身份

**改写 Prompt 结构**：
```
你是「播客精读录」的资深编辑，同时也是一位顶尖的非虚构作家。请将以下播客转录稿转化为一篇纪录片式深度精读文章。

最高原则：**真实性与完整性压倒一切**。保留受访者所有的逻辑推演、论点论据及细节。严禁任何形式的概括、浓缩或删减。读者读完应能还原播客 90% 以上的信息量。

写作规则：
1. 按原文讨论顺序组织，用小标题分段标记话题转换
2. 保留嘉宾原话表达风格（比喻、口头禅、自嘲），仅去除填充词
3. 严禁文学化编造（不编环境描写、心理臆测）
4. 专有名词严格校验，修正 ASR 同音错别字但不改原意
5. 第一次提到人物时用 1-2 句介绍身份
6. 技术术语第一次出现时自然融入解释（像耳边批注，非教科书定义）
7. 编者按：开篇 200 字简介嘉宾、播客背景
8. 结尾：「核心观点速览」5-10 条要点
9. 字数：跟随内容，宁长勿短，严禁压缩
10. **Quote 控制**：只有真正经典、有洞察力、值得反复品味的金句才用 blockquote（> 格式）引用。叙事性的话、过渡性的话、日常表达融入正文即可。一篇文章中 quote 不超过总段落数的 20%。不是"说了什么"就要 quote，而是"这句话本身值得被记住"才 quote。
11. **翻译质量**：英文原文的中文翻译必须自然、优美、朗朗上口。绝不能有翻译腔（逐词硬译、从句嵌套、被动语态堆砌）。翻译时优先追求中文表达的美感和节奏感，在忠实原意的前提下允许意译和重组句式。好的翻译读起来不像翻译，像是中文本来就该这么说。
12. 结尾加"快问快答"（从对话中提取 3-5 个精华 Q&A）

播客信息：
- 标题：{title}
- 嘉宾：{guest}
- 频道：{channel}
- 日期：{date}

转录稿：
{transcript}
```

### 3.5 Notion 风格插画生成

**模型**：FLUX.1-schnell（HuggingFace）

**Prompt 模板**：
```
Notion-style flat illustration, minimalist, simple geometric shapes, 
muted pastel colors, clean lines, no text, white background, 
abstract and modern, {主题描述}
```

**插画规范**：
- 每篇文章的插画数量 = blockquote 数量（有 X 句 quote 就有 X 张插画）
- 每张插画紧跟在对应的 blockquote 后面
- 每张插画应结合该 quote 的内容和意境来设计
- 目的：为经典引言提供视觉注脚，增强阅读节奏和沉浸感
- **尺寸**：生成后缩小到原始尺寸的 1/3（原 1024x1024 → 约 341x341），居中显示
- 保存到 `public/images/illustrations/{slug}-{section}.png`（小图加 `-sm` 后缀）
- 缩小工具：`ffmpeg -y -i input.png -vf "scale=341:341" output-sm.png`

**配图布局**：
- **YouTube 缩略图**：放在文章最开头（标题下方），保持原始尺寸
- **Notion 插画**：穿插在各章节标题后，使用缩小版（1/3 尺寸）
- 飞书文档中使用 `upload_image` + `index` 参数定位，不用 `after_block_id`（不生效）

**飞书文档插图操作流程**：
1. 先用 `write` 写入纯文本内容
2. 再逐张用 `upload_image(index=N)` 插入图片到正确位置
3. Markdown `![](file_token)` 语法在 write 中不绑定图片，会生成空占位

### 3.6 Markdown 文件格式

```yaml
---
title: "文章标题"
description: "一句话摘要"
pubDate: "2026-03-25"
channel: "频道名"
guest: "嘉宾名"
youtubeUrl: "https://www.youtube.com/watch?v=xxx"
thumbnail: "/images/thumbnails/VIDEO_ID.jpg"
illustration: "/images/slug.png"
duration: "1h 23min"
tags: ["AI", "创业", ...]
---

文章正文（Markdown）
```

### 3.7 发布流程

```bash
# 1. 构建验证
npm run build

# 2. 本地预览（可选）
npm run dev

# 3. Git 提交
git add .
git commit -m "feat: add article - {标题}"
git push origin main

# 4. Cloudflare Pages 自动部署（约 1-2 分钟）
# 部署完成后 https://podcast.societas.work 自动更新
```

## 4. 批量处理策略

### 4.1 并行 vs 串行

- **转录获取**：串行（SuperData 有 rate limit）
- **改写**：串行（每篇需要完整上下文）
- **插画生成**：可并行（独立任务）
- **预计总耗时**：10 篇约 2-3 小时

### 4.2 错误处理

| 场景 | 处理 |
|------|------|
| SuperData 转录失败 | 记录 video ID，跳过，报告 J |
| 转录稿过短（<500字） | 可能是短视频/trailer，跳过或简化处理 |
| 改写质量不佳 | 重新生成，调整 prompt |
| 插画生成失败 | 使用 YouTube 缩略图替代 |
| git push 失败 | 重试，失败报告 J |

### 4.3 进度跟踪

每处理完一篇，飞书发送进度更新：
```
✅ [3/10] 已完成：《文章标题》
📝 状态：待 J Review
🔗 预览：https://podcast.societas.work/posts/slug
```

## 5. 依赖与前置条件

| 依赖 | 状态 | 说明 |
|------|------|------|
| n8n API Key | ✅ 已有 | 存在 .env |
| SuperData API Key | ❓ 待确认 | 需从 n8n 获取或 J 提供 |
| YouTube 链接 × 10 | ❓ 待 J 提供 | — |
| Git push 权限 | ✅ 已有 | GitHub JieGaoSunny/podcast-reader |
| Cloudflare 部署 | ✅ 已配 | 自动触发 |
| FLUX.1 API | ✅ 已有 | HuggingFace token |

## 6. 输出物

每篇文章产出：
1. `src/content/posts/{slug}.md` — 精读文章
2. `public/images/thumbnails/{VIDEO_ID}.jpg` — YouTube 封面图
3. `public/images/{slug}.png` — Notion 风格插画

最终：10 篇文章上线 podcast.societas.work

---

*文档版本：v1.1 | 2026-03-30 | 三毛-首席开发*

## 7. 踩坑记录

### 7.1 frontmatter date 必须是视频发布日期
- **错误**：用制作完成日期（2026-03-30）作为文章日期
- **正确**：通过浏览器查看 YouTube 视频页面获取发布日期
- **教训**：noembed / SuperData 都不返回日期，只有浏览器能看到
- **规范**：每篇文章生成 frontmatter 前，必须先查视频发布日期

### 7.2 飞书文档必须完整写入
- **错误**：因上下文紧张写精简版到飞书
- **正确**：飞书文档内容必须和本地 MD 完全一致
- **策略**：分段 append（每段 ~4000 chars），绝不删减

### 7.3 子 agent 超时
- 107k chars 的转录稿用 10 分钟超时不够
- 推荐 15 分钟（900 秒）超时
- 42k-81k chars 的稿件 5-8 分钟可完成
