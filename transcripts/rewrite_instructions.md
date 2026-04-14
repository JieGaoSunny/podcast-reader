# 播客改写指令

## 你的任务
将英文播客转录稿改写为中文精读文章，保存为 Markdown 文件。

## Frontmatter 格式（严格匹配）
```yaml
---
title: "中文标题"
date: YYYY-MM-DD          # 视频发布日期（已提供，直接用）
source_url: "https://www.youtube.com/watch?v={VIDEO_ID}"
channel: "频道名"
guest: "嘉宾名"
guest_title: "嘉宾头衔"
thumbnail: "/images/thumbnails/{VIDEO_ID}.jpg"
tags: ["标签1", "标签2"]
duration: "约Xmin"
reading_time: N           # 数字，预估阅读分钟数
---
```

## 正文格式
- **不要在正文开头写 `# 标题`** —— 标题由 frontmatter 渲染
- 正文直接从 `## 编者按` 开始
- 章节用 `##`

## 改写风格（V3 纪录片式还原）
- **字数**：6000-8000 中文字符（短播客可 4000-5000）
- **结构**：编者按 → 按话题分章节 → 核心观点速览 → 快问快答
- **引用（blockquote）**：≤20% 段落数，只保留真正精彩的原话
- **英文播客引用格式（必须）**：blockquote 保留英文原话在前，紧跟中文翻译在后：
  ```
  > "English original quote here."
  >
  > "优雅贴切的中文翻译。"
  ```
- **翻译质量**：自然中文，无翻译腔，人名/术语首次出现附英文原文
- **信息保留**：90%+ 原始播客信息量
- **不要**：过度缩写、生硬总结、丢失细节和故事性

## 输出
1. 文章保存到 `projects/podcast-reader/src/content/posts/{slug}.md`
2. 备份到 `projects/podcast-reader/content/{slug}.md`
3. slug 格式：小写英文，用连字符分隔，简短有意义

## 注意
- guest 和 guest_title 从转录稿内容推断
- duration 从转录稿长度估算（每分钟约 150 个英文单词）
- reading_time 按中文字数 / 500 估算
- 转录稿可能有时间戳噪音（如 "0:08", "8 seconds"），忽略这些
