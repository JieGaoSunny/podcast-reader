---
title: "Jeanne DeWitt Grosser：2026年，世界级 GTM 长什么样"
date: 2025-11-30
published_at: 2026-04-08
source_url: "https://www.youtube.com/watch?v=RmnWHz8HD74"
channel: "Lenny's Podcast"
guest: "Jeanne DeWitt Grosser"
guest_title: "Vercel COO，前 Stripe 首席业务官，前 Google 销售负责人"
thumbnail: "/images/thumbnails/RmnWHz8HD74.jpg"
tags: ["GTM", "Sales", "AI", "PLG", "SaaS", "销售", "增长", "Vercel", "Stripe"]
duration: "约1.5h"
reading_time: 25
---

## 编者按

如果你在 2026 年还用 2020 年的方式做 Go-to-Market，你大概率已经输了。

Jeanne DeWitt Grosser 是硅谷最被低估的 GTM 操盘手之一。她 2004 年加入 Google 做 Gmail，后来在 Stripe 从零搭建了整个销售体系——从第一个 SDR 到服务 Fortune 100 的企业级销售团队。现在她是 Vercel 的 COO，掌管 marketing、sales、customer success、revenue ops 和 field engineering 的全部版图。

这期 Lenny's Podcast 几乎是一本浓缩的 GTM 教科书。Jeanne 没有讲空洞的框架，而是把 Stripe 和 Vercel 的实战经验拆到了螺丝钉级别：如何用一个 GTM Engineer 在六周内替代十个 SDR、如何让销售团队在工程师面前"伪装"成产品经理、如何用 AI agent 发现人类看不到的丢单原因、如何像做产品一样做销售流程。

这不是一篇关于"AI 取代销售"的恐慌文章。恰恰相反，Jeanne 展示的是一个更有趣的未来：AI 把销售从 30% 的客户交互时间解放到 70%，让人回归到人最擅长的事情——建立信任、理解需求、创造价值。

---

## 一、GTM 的定义正在被重写

大多数人听到"Go-to-Market"会想到 marketing 和 sales。Jeanne 的定义更激进：**任何触达客户或产生收入的职能，都是 GTM。** 这包括 marketing、sales、sales engineering、customer success、support、partnerships——一个完整的客户生命周期。

这个定义不是语义游戏。Jeanne 观察到的核心问题是：传统 GTM 组织里，marketing 追一个方向，sales 追另一个方向，support 又追第三个方向。它们之间有交集，但永远不完美重合——比如不同团队使用不同的客户分层框架（segmentation framework）。

更深层的变化是：**过去十年 GTM 领域的超专业化（hyper-specialization）正在逆转。** 有人统计过，现代 GTM 组织里有多达 17 种不同角色。Jeanne 认为这些角色将开始坍缩（collapse）。AI 正在抹平许多专业化角色之间的边界，未来的 GTM 组织需要回归第一性原理：从客户第一次知道你的产品，到成为高 LTV 的长期用户，这条路径上有哪些 jobs to be done？然后像设计产品一样去编排它。

这种思维转变的实际意义是：如果你还在按"我需要几个 SDR、几个 AE、几个 CSM"来搭建团队，你可能正在建一个即将过时的组织结构。

---

## 二、GTM Engineer：销售组织里的新物种

这期播客最爆炸性的内容，是 Jeanne 详细拆解了 **GTM Engineer** 这个新兴角色。

### Project Rosland：一个超前八年的想法

故事要从 2017 年的 Stripe 说起。Stripe 有一条操作原则叫"efficiency is leverage"——效率就是杠杆。当别的公司给 SDR 团队配 30 人时，Jeanne 只拿到了 4 个名额。

于是她启动了 **Project Rosland**（以最早绘制 DNA 图谱的科学家命名）。核心思路是建一个"Company Universe"数据库：每一行是地球上的一家公司，每一列是关于这家公司的一个属性。比如在 Stripe 的场景下，知道一家公司的商业模式是 marketplace 非常关键，因为这意味着要卖 Stripe Connect 而不是普通的 Payments。

目标是实现 **Mad Libs 式的销售外联**——80% 的邮件内容根据客户属性自动填充：如果是这个行业，就引用这个客户案例；如果是这个商业模式，就用这个价值主张。

2017 年，这个项目失败了。假阳性率（false positive rate）始终无法降到可用水平。即便有数据科学团队的深度参与，技术就是还没到那一步。

**八年后的 2025 年，同样的想法在 Vercel 跑通了。** 区别只有一个：AI。

### 从 10 个 SDR 到 1 个

Vercel 的做法是让 GTM Engineer 先 **shadow（跟班观察）最优秀的 SDR**。观察他们打开七个标签页、在 LinkedIn 上查人、在 ChatGPT 里做研究、从数据库里拉属性的全过程。然后把这个人类工作流编码成 agent。

他们从 inbound（入站线索处理）开始，因为这个流程最 legible（可描述的）——步骤明确、基本确定性、可复制。Agent 需要做两个判断：这条线索是否可能合格？如何回复？然后做深度研究、从数据库拉信息、生成回复。

**关键细节：始终保留 human in the loop。** Agent 生成回复，但由人类审核并点击发送。

结果：

- **10 个 SDR 缩减为 1 个**——那 1 个人本质上是在 QA agent
- 其余 9 人转向更高价值的 outbound 工作
- Lead-to-opportunity 转化率**持平**（agent 和人类一样好）
- 转化所需的 touches 数量**下降**（因为 agent 响应速度远超人类，不存在"线索排队等待"或"深夜无人处理"的问题）
- 整个项目由**一个 GTM Engineer 花 25-30% 的时间、六周完成**
- 这个 lead agent 全年运行成本约 **$1,000**——而之前 10 个 SDR 的薪资超过 100 万美元

> 一个人、六周、一千美元，替代了一个百万美元级的团队职能。这不是理论，这是已经在生产环境跑了的数字。

### 谁适合做 GTM Engineer？

Jeanne 的答案出人意料：**从销售侧来，不是从工程侧来。** Vercel 的前三个 GTM Engineer 都是原来的 Sales Engineer——他们之前是前端开发者，后来转做技术销售。公司直接对他们说："恭喜你们，现在是 GTME 团队的创始成员。"

理由很朴素：你需要懂销售的"艺术与科学"。Jeanne 举了一个例子——她在审查 lead agent 的回复时发现，"我不会这样发"。因为 agent 是基于一个有两年经验的优秀 SDR 建模的，而 Jeanne 有 20 年的销售直觉。**理解最佳实践（best practice）是建好 agent 的前提。**

---

## 三、AI 如何重构销售流程：从 Lostbot 到 Dealbot

如果说 lead agent 是 AI 在 GTM 中的"入门级应用"，那 **Dealbot** 才是真正让人兴奋的东西。

### 机器看到了人类看不到的丢单原因

起点是 **Gong**（通话录音与分析工具）。Vercel 把所有 Gong 转录稿灌入一个叫 Dealbot 的 agent，先从"Lost Opportunity Review"（丢单复盘）开始。

Q2 结束后，团队拉出按金额排序的丢单列表，让 agent 跑一遍。**最大的一笔丢单，AE（客户经理）的结论是"输在价格"。但 agent 扫描了所有 Slack 消息、邮件、Gong 通话后给出完全不同的诊断：**

> "你从未真正接触到 economic buyer（经济决策者）。当你和对方讨论 ROI 和 TCO 时，从他们的反应可以明显看出他们并不买你的算法。真正的丢单原因是未能有效证明价值。"

这个洞察直接指向了一个可行动的改进：Vercel 需要更好地量化和包装自身产品的价值主张。

### 从事后复盘到实时教练

Lostbot 进化成了 Dealbot，从事后分析变成**实时运行**。Vercel 极度依赖 Slack，每个客户（无论是新机会还是已有客户）都有专属 Slack 频道。Dealbot 现在向这些频道推送实时洞察：

- "你已经进入销售流程的第三阶段，但还没有和 economic buyer 交谈过，该考虑一下了。"
- "你刚和 economic buyer 结束通话，听起来进展不太顺利。以下是一些跟进建议。"

### 像工程团队一样跑 Sprint

更激进的用法：Vercel 的产品迭代速度极快（几乎每隔一天就有新发布），GTM 团队很难跟上 enablement。于是他们让 Dealbot 在每次产品发布后扫描所有客户交互，诊断**哪些地方的 objection handling（异议处理）做得不好、哪些地方卡住了**。

每周末开一次 huddle，Review agent 的诊断结果。然后像工程团队修 bug 一样处理：

- 这些是你 GTM 流程里的 **bug**
- 下周之前，补充 objection handling guide 的内容
- 更新 discovery guide
- 调整 demo 流程

**把销售流程当代码库来维护，用 AI 做 QA，跑 sprint 修 bug。** 这可能是我在这期播客里听到的最具前瞻性的管理方法论。

---

## 四、Build vs Buy：为什么自建 Agent 可能更好

当 Lenny 问到工具推荐时，Jeanne 给了一个"反常识"的回答：**自己建可能比买更好。**

核心论点：

1. **建 agent 没那么难。** Lead agent：一个人、30% 时间、六周。Lostbot：40 小时。
2. **也没那么贵。** Lead agent 全年运行成本 $1,000。
3. **你自己的上下文（context）是关键。** 因为整个领域太新，通用的 SaaS 工具往往无法覆盖你独有的工作流、内容和数据。你自己的 esoteric context 才是解锁 agent 威力的钥匙。
4. **市场太碎片化。** 如果你用买的方式，很快就会有 20 个工具解决 20 个问题，而不是一个整合平台。Jeanne 听到很多客户说，现在最大的 AI 部署障碍不是技术，而是 **procurement（采购流程）**。

她提到一个有趣的新术语：**ERR（Experimental Run Rate Revenue）**——实验性运行收入。因为每个公司都有"AI mandate"，几乎等于一张空白支票，大家都在说"先试一年再看"。

> CIO 的角色可能正在从"软件采购者"变成"软件建造者"——未来的企业内部可能有一个 AI 平台跑着上千个 agent。

---

## 五、Segmentation：不只是小中大

Segmentation（客户分层）是这期播客里信息密度极高的一段。Jeanne 把它从"看起来很基础"的概念拆解到了战略层面。

### Stripe 的三维分层

传统分法是 SMB / Mid-market / Enterprise（小/中/大）。这没错，但如果止步于此，你会错过关键信息。

Stripe 加了两个维度：

- **增长潜力（Growth Potential）**：因为 Stripe 是消费制（consumption-based）模式，年增长 200% 的客户比年增长 8% 的客户价值大得多。所以要对高增长客户投入更多销售资源。
- **商业模式（Business Model）**：B2B、B2C、平台（B2B2B）、marketplace（B2B2C）——不同模式需要完全不同的产品组合。B2B 需要 wire transfer 和 Stripe Billing，B2C 需要 Apple Pay，marketplace 需要 Stripe Connect。

### Vercel 的分层创新

Vercel 在常规的规模维度之上，叠加了两个独特属性：

- **Crux Rank（流量排名）**：Google 在 Chrome 中收集数据并发布 Crux Score，可以知道每个网站的相对流量。OpenAI 可能只有 3000 员工（按人数算是 mid-market），但它是全球 Top 25 流量网站——在 Vercel 的体系里，这直接推升到 enterprise 级别。
- **Workload Type（负载类型）**：电商网站和加密货币公司的销售方式完全不同——电商要聊 PLP（产品列表页）、PDP（产品详情页）、OMS（订单管理系统）；加密公司可能全栈跑在 AWS 上。

### Segmentation 是公司战略，不只是销售工具

Jeanne 在 Vercel 的做法是：**每个新员工入职第一周，她亲自讲 KYC（Know Your Customer）session**，介绍分层框架和客户分布。这不是给销售看的——是给产品经理看的。当 PM 开始构建新功能时，他们需要知道：这是给 enterprise 还是 startup 建的？我在哪个细分市场要赢？

> **Segmentation 不是 GTM 的事，是整个公司的事。** 如果产品团队不理解你的分层逻辑，你永远无法实现真正的 product-market alignment。

对于早期创业者，Jeanne 的建议很实用：**三个属性就够了。** 比如"Series A、做 SaaS、在做 marketplace"。超过三个反而无法操作——你一共就五个销售，不可能切五个不同 segment。

---

## 六、把 GTM 当产品来做

这是贯穿整期播客的核心理念，值得单独成章。

### 起源：Gmail 时代的顿悟

Jeanne 2004 年加入 Google 做 Gmail——那时 Gmail 是一个革命性产品，1GB 存储领先 Yahoo Mail 整整一年。但十年后，云计算让软件开始 commoditize（同质化）。当技术差异化缩小时，什么来差异化？

她的答案是：**购买体验本身。**

> "We buy a lot of things because of how we feel about them."

如果产品之间只在边际上有差异（different at the margin），那么客户的购买决策会越来越多地受"被销售的体验"驱动。如果你相信这一点，你就会像设计产品体验一样去设计客户的购买旅程。

### 白板 Discovery：让客户带走一个资产

传统的 discovery call（需求发现会议）是销售问一堆问题，客户被"审讯"。Stripe 的做法不同——第一次会议变成 **whiteboarding session（白板协作）**：让客户画出自己的支付架构。

双赢：销售团队在过程中了解到客户的技术栈、竞争格局、价值所在；客户则第一次拥有了自己的架构全景图——**他们带着一个有价值的资产离开了会议**。这完全改变了销售关系的性质：从"你在卖东西给我"变成"你在帮我思考"。

### 每个触点都要增加价值

另一个原则：**无论客户是否购买，每次互动都要为他们增加价值。** 原因很现实——Jeanne 在 Stripe 九年，见过大量客户第一轮没买，但三四年后回来了。如果你在第一轮给他们留下了"这家公司很有洞察力"的印象，这笔投资的回报可能在五年后才兑现。

Vercel 的实践：主动帮客户分析他们网站的 Core Web Vitals 表现，不仅给绝对数据，还做**同行对标**。即便客户不买 Vercel，他们也获得了有价值的洞察。另一个例子是 AEO（Answer Engine Optimization）——这和 Vercel 的产品只是间接相关，但他们在这个话题上投入大量内容建设，因为这是客户真正关心的新领域。

> **不要把销售当交易（transaction），要把它当体验（experience）。**

---

## 七、80% 的客户购买是为了避免痛苦

这可能是整期播客里最重要的一个数据点：

> **80% 的客户购买是为了避免痛苦或降低风险（avoid pain / reduce risk），只有 20% 是为了获取上行收益（increase upside）。**

这对创业者的启示是深刻的。创始人天然喜欢讲"art of the possible"——我们要 enable 什么、未来会怎样。这很兴奋，但**这种叙事主要打动的是另一个创始人**。

对于企业客户——那些真正掏大钱的人——驱动购买决策的是：

- 不达成下季度收入目标的**风险**
- 被竞争对手超越的**风险**
- 品牌受损的**风险**
- 做出错误技术选型影响职业生涯的**风险**

April Dunford 在播客中讲过类似观点：采用一个新产品（比如从旧方案迁移到 Stripe）是一个巨大的职业赌注。如果出了问题，你的老板会不高兴，你的职业会受损，公司会倒退。

> **所以顶级销售不是在"销售产品"，而是在"降低风险"。** 这个认知转变对很多技术创始人来说是反直觉的，但它确实驱动更多的购买行为。

---

## 八、PLG 的天花板与销售组织的必然性

Jeanne 对 PLG（Product-Led Growth）的看法非常务实：

- **PLG 对大多数公司在早期都有意义**——除非你从第一天就瞄准 enterprise（比如 Sierra 做 Global 2000 的八位数交易）
- **但 PLG 有天花板。** 没有人会通过 self-serve 流程给你一百万美元
- **几乎所有公司最终都需要建销售组织。** 有些先 PLG 后加销售，有些从一开始就有销售。但她想不出一家千亿美元级别的公司是纯 PLG 的
- **最常见的错误是等太久才加销售。** 建一个可复制的销售流程需要时间，从 inbound 到 outbound 的转变需要时间，把 outbound 变成可预测引擎更需要时间

Vercel 自己就是一个活生生的案例：PLG 仍然是重要增长驱动力，但他们做了一次关键的定价调整——发现 enterprise SKU 上有一半用户其实是 startup，说明 enterprise SKU 里有 startup 想要但被锁在高价层里的功能。**把这些功能拆出来做 self-serve 购买后，PLG 漏斗的增长显著加速。**

---

## 九、销售薪酬的困境与人才策略

### 薪酬：灵活性 vs 激励性的矛盾

Jeanne 对传统 sales comp（销售薪酬方案）有一个"hot take"：**它让组织变得不够灵活。** 你需要提前 12 个月决定"我激励什么行为"，但在 AI 时代，12 个月前的优先级可能完全过时。

Vercel 的真实案例：年初写销售计划时，AI Cloud 还不存在。他们只卖 Front-end Cloud 和 v0。年中 AI Cloud 上线后，虽然有办法激励销售去推新产品，但结构化的薪酬方案天然抗拒这种变化。

她还在探索答案，但问题本身值得每个 GTM leader 思考：**当年度规划都变得困难时，年度销售薪酬方案还合理吗？**

### 人才：多元化投资组合

Jeanne 招人的策略像一个 **diversified portfolio（多元化投资组合）**：

- 有**传统销售背景**的人：他们懂 sales craft
- 有**咨询或投行背景**的人：他们擅长量化分析、P&L 思维、和 CFO 对话

把这两类人放在一起会产生化学反应——咨询出身的人意识到"销售是一门技艺，我其实不会"，于是向资深 AE 学习；而资深 AE 则学到了如何做 TCO 分析、如何像 consultant 一样思考。

---

## 十、销售组织要让工程师认不出来

这可能是整期播客里最精彩的一句话：

> "如果我把你放到公司 10 个工程师面前，他们至少要花 10 分钟才能发现你不是产品经理。"

这是 Jeanne 给自己销售团队的 litmus test（试金石）。背后有两层含义：

**第一，深度的产品理解建立信任。** 如果你的销售人员能和工程师平等对话，你的整个 GTM 组织在产品和工程团队中就有了 credibility。

**第二，最好的 GTM 组织既是 revenue engine 又是 R&D 的延伸。** 一个 20 人的销售团队每周和大量客户交谈——如果他们能高质量地把反馈翻译成 signal（而不是 noise）输入 roadmap，他们就是产品管理组织的延伸。

这需要一种特殊能力：**分辨什么时候客户的"反对"应该被 objection handle（销售技巧化解），什么时候它实际上是一个市场机会。** 这是"像 GM（总经理）一样思考"的销售团队——不只是完成交易，而是在帮助建设业务。

Claire Hughes Johnson（Stripe 前 COO）对 Jeanne 的评价是：她可能是所有 GTM leader 中最擅长与产品和工程团队建立深度连接、理解产品、并为对方提供最有价值输入的人。

---

## 总结：2026 年的 GTM 备忘录

这期播客信息量巨大，最后提炼几个核心要点：

1. **GTM 正在从超专业化回归整合。** 17 种角色将坍缩为更少的、由 AI 增强的复合角色。GTM Engineer 是第一个新物种。

2. **Agent 不贵也不难建，但需要你自己的上下文。** 一千美元的 agent 替代百万美元的团队职能不是科幻，是 Vercel 的月报数字。

3. **把 GTM 当产品来做。** 设计购买旅程、在每个触点增加价值、像跑 sprint 一样修复销售流程中的 bug。

4. **80/20 法则的购买心理版：** 80% 的客户为了避免痛苦而买，只有 20% 为了追求上行。停止只讲"art of the possible"，开始帮客户降低风险。

5. **Segmentation 是公司战略，不是销售工具。** 三个属性足以开始，但必须让产品团队也理解这套逻辑。

6. **PLG 不是终点，销售不是可选项。** 几乎所有规模化公司最终都需要销售组织，而最常见的错误是加得太晚。

7. **让你的销售团队在工程师面前"隐身"。** 产品深度不是锦上添花，是 GTM 组织的核心竞争力。

Jeanne 的母亲给她的两句话，放在这里作为结尾再合适不过：

> **"When the going gets tough, the tough get going."**
>
> **"Where there's a will, there's a way."**

在 AI 重构一切的 2026 年，GTM 领域的"going"确实 tough。但如果你愿意像 Jeanne 这样，把每一个销售流程都当成可以 debug 的代码、每一次客户互动都当成可以优化的产品体验、每一个 agent 都当成值得训练的团队成员——you'll find a way.
