# 播客精读录 — Phase 2 技术调研：n8n 内容管道对接

## 1. 现状分析

### 1.1 当前 n8n 工作流（Podcast2Post_Prod）

**上游管线（视频检测）**：
```
Video_update(定时) → Channel_List(5频道) → YouTube Playlist2 → Code in JavaScript(去重) → Upsert row(s)(写入 Data Table)
```

**下游管线（内容处理）**：
```
Schedule Trigger(每天早7点) → GetRows1(读待处理视频) → Code in JavaScript1(过滤) → supadata1(转录) → 数据清洗 → AI Agent1(千问改写) → EmailGenerator(HTML模板) → SendEmail(Resend) → Update row(s)(标记完成)
```

### 1.2 已知问题
- **千问改写质量不佳**（J 不满意，要换 Claude）
- **SuperData 免费额度有限**（剩余约 50 次）
- **输出渠道单一**（仅邮件，无网站）
- **Data Table 字段**：VideoId, Title, Url, ChannelName, PublishedAt, Duration, Thumbnail, ProcessingStatus, Notes, createdAt, updatedAt（共 11 列）

---

## 2. 调研项

### 2.1 n8n → 三毛通信方案

| 方案 | 实现 | 优点 | 缺点 | 推荐度 |
|------|------|------|------|--------|
| **A. n8n Webhook + 三毛轮询** | n8n 把待处理数据写入 Data Table，三毛定期检查 | 解耦，不改 n8n | 延迟大，浪费轮询 | ⭐⭐ |
| **B. n8n → 飞书消息** | n8n 用 HTTP Request 节点发飞书消息给三毛 | 实时，三毛自然接收 | 需要飞书 Bot API 凭据 | ⭐⭐⭐⭐ |
| **C. n8n → Webhook 回调三毛** | n8n 用 HTTP Request 调 OpenClaw API 触发三毛 | 实时，可编程 | 需要 OpenClaw 暴露 API | ⭐⭐⭐ |
| **D. n8n Data Table + 三毛定时任务** | 三毛用 heartbeat 定时检查 Data Table 新数据 | 最简单，不改 n8n | 需要 n8n API key | ⭐⭐⭐⭐ |

**调研结论**：

- **方案 D 最优**。原因：
  1. 不需要改 n8n 工作流（保持上游管线不动）
  2. n8n REST API 支持读取 Data Table（`GET /api/v1/...`），认证用 `X-N8N-API-KEY` header
  3. 三毛可以用 heartbeat 定时（比如每小时检查一次）轮询新视频
  4. 三毛有完整的文件读写 + git + exec 能力，可以直接生成 .md + 插画 + push
  
- **方案 B 备选**。如果需要更实时的触发，在 n8n 下游管线末尾加一个飞书消息节点通知三毛

### 2.2 转录方案

| 方案 | 成本 | 质量 | 限制 | 推荐度 |
|------|------|------|------|--------|
| **SuperData（现用）** | 免费50次/月 | 高 | 额度有限 | ⭐⭐⭐ |
| **YouTube 自动字幕** | 免费 | 中（自动生成） | 部分视频无字幕，API 不稳定 | ⭐⭐ |
| **Whisper (本地)** | 免费 | 高 | 需要下载音频+本地GPU/CPU跑 | ⭐⭐ |
| **保留 n8n SuperData** | 免费（已有） | 高 | 50次/月，够用 | ⭐⭐⭐⭐ |
| **yt-dlp + Whisper API** | $0.006/min | 高 | 需要 OpenAI API key | ⭐⭐⭐ |

**调研结论**：

- **短期**：继续用 n8n 的 SuperData 转录，让 n8n 保持转录职责，把转录稿存到 Data Table 的 Notes 字段
- **中期**：如果 SuperData 额度不够，可以用 yt-dlp 下载音频 + OpenAI Whisper API（$0.006/min，1小时播客约 $0.36）
- **长期**：考虑本地 Whisper 或其他免费转录方案

### 2.3 三毛侧能力评估

| 能力 | 状态 | 说明 |
|------|------|------|
| Claude 深度改写 | ✅ 已验证 | 当前模型 claude-opus-4.6，改写质量已验证（10篇文章） |
| 插画生成 | ✅ 已验证 | HuggingFace FLUX.1-schnell，Notion 风格已调通 |
| Git push | ✅ 已验证 | 本地 git push 到 GitHub 已成功 |
| Cloudflare 自动部署 | ✅ 已验证 | GitHub push 后自动构建+部署 |
| n8n API 调用 | ⚠️ 需验证 | 需要 J 创建 n8n API key |
| 定时任务 | ✅ 可用 | heartbeat 机制或 HEARTBEAT.md 配置 |
| 飞书消息接收 | ✅ 已有 | 通过飞书直接收消息 |

### 2.4 n8n API 访问

**认证方式**：`X-N8N-API-KEY` header
- 需要 J 在 n8n Settings > n8n API 创建 API key
- API 端点：`https://n8n.societas.work/api/v1/`

**关键 API**：
- `GET /api/v1/workflows/{id}` — 读工作流详情
- Data Table API — 待确认具体端点（n8n v1.x+ 支持）

### 2.5 n8n 工作流改造范围

**不动的部分**（上游管线）：
- Video_update → Channel_List → YouTube Playlist2 → Code in JavaScript → Upsert row(s)
- 保持原样，继续检测新视频并写入 Data Table

**需改动的部分**（下游管线）：

| 原节点 | 改动 | 说明 |
|--------|------|------|
| Schedule Trigger | 保留 | 每天早7点触发 |
| GetRows1 | 保留 | 读取待处理视频 |
| Code in JavaScript1 | 保留 | 过滤逻辑 |
| supadata1 | 保留 | 转录（后续可能替换） |
| 数据清洗 | 保留 | 清洗转录稿 |
| **AI Agent1(千问)** | **删除/替换** | 三毛接管改写 |
| **EmailGenerator** | **可选保留** | 如果仍需邮件推送 |
| **SendEmail** | **可选保留** | 如果仍需邮件推送 |
| Update row(s) | 保留 | 标记处理状态 |
| **新增** | **HTTP Request** | 转录完成后通知三毛（发飞书消息或调webhook） |

---

## 3. 推荐方案

### 3.1 架构

```
[n8n — 每天早7点]
  ↓
检测新视频 → 转录(SuperData) → 数据清洗 → 存转录稿到 Data Table
  ↓
通知三毛(飞书消息 / Data Table 状态标记)
  ↓
[三毛 — 收到通知或定时检查]
  ↓
读取转录稿 → Claude 深度改写(~3000字) → 生成插画(FLUX) → 写 .md 文件
  ↓
git add + commit + push → Cloudflare 自动部署
  ↓
回写 n8n Data Table (WebsiteStatus = published)
  ↓
通知 J (飞书消息: "新文章已发布: xxx")
```

### 3.2 Data Table 字段扩展

| 字段 | 类型 | 说明 |
|------|------|------|
| Transcript | text | 转录稿全文（n8n 写入） |
| WebsiteStatus | text | pending / processing / published / failed |
| ArticleSlug | text | 文章 URL slug（三毛写入） |
| PublishedAt_Web | datetime | 网站发布时间 |

### 3.3 实施步骤

1. **J 创建 n8n API key**
2. **验证 n8n Data Table API** — 确认能通过 API 读写
3. **改造 n8n 下游管线** — 转录后存 Transcript 字段 + 标记 WebsiteStatus=pending
4. **三毛写处理脚本** — 读 Data Table → 改写 → 生图 → push → 回写状态
5. **配置定时触发** — heartbeat 或飞书消息触发
6. **端到端测试** — 用一个新视频走完整流程

---

## 4. 需要 J 确认/操作的事项

1. **创建 n8n API key**：Settings > n8n API > Create an API key
2. **确认邮件推送是否保留**：改写后还需要发邮件吗？还是只发网站？
3. **确认自动发布策略**：三毛改写完自动发布，还是先通知 J review？
4. **SuperData 转录额度**：当前剩余多少？够不够每月用量？
5. **Data Table 改造授权**：允许我新增 Transcript / WebsiteStatus 等字段？

---

## 5. 风险与 Mitigation

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| SuperData 额度耗尽 | 转录中断 | 切换 yt-dlp + Whisper API |
| n8n API 不支持 Data Table | 无法读写 | 改用 webhook 通信 |
| 转录稿质量差 | 改写质量下降 | 三毛做 pre-check，质量不达标跳过 |
| Git push 失败 | 部署中断 | 重试机制 + 通知 J |
| Token 消耗过大 | 成本 | 控制文章长度（~3000字），单篇约 10k token |

---

*文档版本：v1.0 | 2026-03-24 | 三毛-首席开发*
