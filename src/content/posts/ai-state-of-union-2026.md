---
title: "AI 国情咨文：我们已越过拐点，Dark Factories 正在成为现实"
date: 2026-04-02
published_at: 2026-04-08
source_url: "https://www.youtube.com/watch?v=wc8FBhQtdsA"
channel: "Lenny's Podcast"
guest: "Simon Willison"
guest_title: "Django 联合创建者，AI 工具链独立开发者"
thumbnail: "/images/thumbnails/wc8FBhQtdsA.jpg"
tags: ["AI", "编程", "Agent", "工具链", "未来工作"]
duration: "约2h"
reading_time: 35
---

## 编者按

Simon Willison 是一个很难用单一标签定义的人。他是 Django Web 框架的联合创始人，开源数据工具 Datasette 的作者，一个坚持每天写博客的技术作家——但在过去两年里，他最为人知的身份是 AI 工程领域最敏锐的观察者和实践者。他发明了「prompt injection」这个术语，创造了「pelican riding a bicycle」这个著名的模型基准测试，并且正在撰写一本关于 agentic engineering patterns 的书。

这期 Lenny's Podcast 录制于 2026 年 4 月初，正值 AI coding agent 的能力经历质变之后的第五个月。Simon 和主持人 Lenny 从「黑灯工厂」（dark factory）的概念聊起，深入探讨了 AI 如何重塑软件工程的每一个环节——从写代码到测试、从安全到产品设计、从职业规划到人类认知的极限。这不是一次充满乐观泡沫的对话，而是一个同时在享受变革红利和警惕变革风险的从业者的真实前线报告。

---

## 一、十一月拐点：从「大部分能用」到「几乎总是对的」

Simon 开场便铺展了 2025 年的 AI 编码简史。2025 年是 Anthropic 和 OpenAI 终于意识到「代码就是杀手级应用」的一年。Claude Code 在 2025 年 2 月发布后增长迅猛，大量用户愿意为每月 200 美元的订阅付费。两家实验室将全年训练资源集中投入代码能力——推理模型（reasoning models）和强化学习（reinforcement learning）双管齐下。

然后，十一月发生了质变。

> "In November we had what I call the inflection point where GPT 5.1 and Claude Opus 4.5 came along and they were both just — they were incrementally better than the previous models but in a way that crossed a threshold where previously if you had these coding agents you could get them to write you some code and most of the time it would mostly work but you had to pay very close attention to it and suddenly we went from that to almost all of the time it does what you told it to do which makes all of the difference in the world."
>
> 「十一月，我们迎来了拐点。GPT 5.1 和 Claude Opus 4.5 问世，它们只是比前代模型增量式地好了一些，但这个增量跨过了一个阈值——以前你让 coding agent 写代码，大部分时候大致能用，但你必须时刻盯着。突然间，我们从那个状态跳到了几乎每次都能按你说的做。这改变了一切。」

这个从「mostly works」到「almost all of the time」的跳跃，让整个软件工程行业在 2026 年初集体震动。Simon 描述了一种广泛发生的觉醒：很多工程师在假期里开始尝试这些工具，一月和二月陆续意识到自己一天能产出一万行代码。

但他随即提出了一个关键的限定：代码是对错分明的——能跑就是能跑，不能跑就是不能跑。如果 AI 帮你写论文或准备法律文书，判断其质量要困难得多。代码工程师是这场变革的先锋，不是因为他们最聪明，而是因为这个领域最容易被验证。

---

## 二、黑灯工厂：当 AI 7×24 小时替你写代码

Simon 抛出了这期播客最核心的概念——「dark factory」。这个词来自制造业：一座完全自动化的工厂，不需要开灯，因为没有人类在里面工作。

> "The really interesting future is something which some people have been calling the dark factory pattern or software factories. This is the idea where... you're applying professional practices and quality expectations to code that you're not directly reviewing. The reason it's called the dark factory is there's this idea in factory automation that if your factory is so automated that you don't need people there, you can turn the lights off."
>
> 「真正有趣的未来是所谓的 dark factory 模式，也就是软件工厂。你不再直接审查代码，但仍然以专业标准和质量期望来管控它。之所以叫 dark factory，是因为制造业有个概念——如果你的工厂自动化到不需要人在里面，你可以把灯关掉。」

他举了 StrongDM 公司的案例。这家公司的规则是「没人写代码」，更激进的是「没人读代码」。Simon 坦言六个月前他认为这是疯狂的做法，但现在他自己产出的代码大约有 95% 不是亲手敲的。

那么不看代码如何保证质量？StrongDM 的做法是构建了一支 AI QA 军团：一群 agent 模拟终端用户，7×24 小时不间断测试。这些模拟用户在一个由 AI 搭建的 Slack 频道里互相对话，发出诸如「能给我 Jira 权限吗」之类的请求——每天 token 花费约一万美元。更值得关注的是，由于 Slack、Jira 等真实服务存在 API 限速，StrongDM 干脆用开源客户端库让 coding agent 生成了 Slack、Jira、Okta 的完整 API 仿真服务，甚至还搭了一套假的 Slack 界面来观察 agent 行为。全部打包为一个 Go 二进制文件，启动后零 API 成本。

Simon 同时提到了 AI 在安全渗透测试方面的进展。OpenAI 和 Anthropic 都拥有不对外公开的专用安全模型，仅对经过审核的安全研究员开放。Anthropic 最近用自家模型在 Firefox 中发现了上百个潜在漏洞，并负责任地报告给了 Mozilla。但他强调了关键区别：Anthropic 的安全团队做了验证工作，他们没有把 agent 产出的内容直接转发，而是在提交前确认了每份报告的质量。

---

## 三、代码变得廉价之后，瓶颈转移到了哪里？

Simon 认为，2026 年软件工程领域最大的结构性冲击可以用一句话概括：写代码这件事的成本趋近于零。过去你写好一份 spec 交给工程团队，三周后如果幸运的话能拿到初版实现。现在同样的事情可能只需要三小时。

瓶颈转移到了哪里？Simon 的回答出人意料——不是「想出好点子」，而是「验证好点子」。他的新工作方式是：对任何新功能，让 agent 同时生成三个不同的原型实现，然后亲自试用来判断方向。因为生成原型的时间成本已经低到可以忽略，真正昂贵的是评估和选择。

关于 AI 辅助头脑风暴，Simon 有一个精准的观察：AI 擅长前三分之二——把所有显而易见的想法快速铺开。但真正有价值的洞察往往出现在尾部。当你要求它再给 20 个想法时，到列表末尾开始出现一些「不算好主意但指向有趣方向」的东西。他甚至建议刻意使用荒诞的约束——比如「用海洋生物学的灵感来为我的 SaaS 平台设计营销策略」——大部分结果不可用，但偶尔会有一个火花点燃正确的方向。

至于能否用 AI 模拟用户做可用性测试？Simon 持怀疑态度。让 ChatGPT 假装点击原型，得到的反馈远不如一个真人在 Zoom 上的实际操作。AI 能生成选项，但人类仍然是最好的裁判——至少目前如此。

---

## 四、谁最危险？不是初级工程师，是中层

关于 AI 对工程师职业的影响，Simon 引用了 ThoughtWorks 一次高管研讨会的结论，这个结论违反了大多数人的直觉。

资深工程师受益最大——AI 是他们数十年经验的放大器。初级工程师和实习生同样受益——Cloudflare 和 Shopify 在 2025 年各招了上千名实习生，因为 AI 将实习生的有效产出周期大幅缩短。处境最危险的是中层：职业生涯中段，还没做到超级资深，但也不再是新人。ThoughtWorks 认为这个群体眼下承受的风险最大。

Simon 用自己的经验说明了放大效应的机制：他能看一眼问题就判断哪些只需要一句 prompt 就能解决，哪些可能是深不见底的坑。这种判断力——知道什么该交给 agent、什么需要人工介入——正是经验的核心价值。

但他也坦承经验带来了一个新的认知障碍：对工作量的直觉完全失效了。25 年积累的「做一件事要多久」的判断全部过时——过去觉得要两周不值得做的任务，现在可能 20 分钟就能完成，因为其中大部分手工编码劳动已经被 AI 覆盖。他的应对策略是不断把自认为「不可能」的任务丢给 AI，每次 AI 做到了，就更新自己的能力边界地图。

---

## 五、Agentic Engineering：让 Agent 写出好代码的实战模式

Simon 正在写一本他称之为「not a book」的书——关于 agentic engineering patterns。他在播客中分享了几个核心模式。

### Red/Green TDD：五个字的 prompt，换来质量飞跃

Simon 坦承自己作为程序员从来不喜欢测试驱动开发——试了两年，只觉得拖慢速度。但他发现 coding agent 是 TDD 的完美执行者：不会无聊，不会偷懒跳步骤。关键技巧是在 prompt 里写「red/green TDD」五个字，agent 理解这个术语——先写测试、看到红色（失败），再写实现、看到绿色（通过）。

他还提出了一个反直觉的观点：过去 100 行代码配 1000 行测试是坏信号——维护成本过高。但现在维护测试本身也是 agent 的工作，大量测试反而成为资产。用他的话说，更新一千行测试现在是 coding agent 的职责，而不是人类工程师的负担。

### 从好模板开始：一个测试文件胜过千行文档

很多人会写一个详尽的 CLAUDE.md 来描述编码风格。Simon 的方法更简单：每个新项目从一个模板开始——一个测试文件（哪怕只测试 `1 + 1 == 2`），用他喜欢的风格写好缩进、命名、目录结构。Agent 会自动模仿这个风格。一个示例胜过一千字的文档描述。

### 囤积已验证的能力节点

Simon 在 GitHub 上维护着 simonw/tools（193 个小型 HTML/JS 工具）和 simonw/research（75+ 个 coding agent 驱动的研究项目）。每一个都是一个「已验证的能力节点」——agent 实际写了代码、跑了代码、画了图表。他强调，如果只是发布一堆未经验证的 deep research 报告，对任何人都没什么价值；但一旦代码被执行、结果被验证，它就不再是「LLM 呕吐物」（LLM vomit），而是可复用的知识资产。当新问题出现时，他会指示 Claude Code 参考 research 仓库中的相关项目，用同样的方法解决新问题。

---

## 六、工具栈：Claude Code、GPT 5.4，以及手机上的编程

Simon 目前的主力工具是 Claude Code，尤其是其云端版本 Claude Code for Web。三个原因：可以从手机操作、安全隔离（在 Anthropic 的服务器上运行，不会误删本地文件）、以及可以开启 YOLO 模式。他现在在手机上写了大量代码，遛狗沿着海滩走的时候也能高效工作。

他指出了一个很多人忽略的关键因素：大量用户没能接受 coding agent，是因为他们只用过「安全模式」——agent 每一步都要请求许可：「我可以跑这段代码吗？我可以编辑这个文件吗？」这意味着你必须全程盯着，体验类似于陪伴一个不断追问的幼儿。只有在放开权限的模式下，agent 的真正效率才会显现。

关于 GPT 5.4，Simon 表示三周前发布后让他印象深刻——性能与 Claude Opus 4.6 不相上下。但他最终还是回到了 Claude，原因颇为微妙：他对代码有一种具体的审美偏好，恰好与 Claude Code 的风格高度吻合。用他的话说，「一路到底都是 vibes」（It's vibes all the way down）。

---

## 七、精神损耗：AI 让人更高效，也让人更疲惫

这可能是整期播客中最坦诚的一段。

> "I can fire up four agents in parallel and have them work on four different problems and by like 11 a.m. I am wiped out for the day."
>
> 「我可以同时开四个 agent，让它们处理四个不同的问题。到上午 11 点，我一天就彻底耗尽了。」

他观察到身边很多人出现了类似成瘾的症状——睡前多开几个 agent，凌晨四点醒来检查进度。Simon 直言，这些工具的使用方式中存在一种类似赌博和上瘾的成分。

矛盾之处在于，这一切确实极其有趣。Simon 把自己的新年决心从往年的「聚焦、少做事」彻底反转为「多做事、更有野心」。他的朋友们纷纷清空了积压多年的 side project backlog——那些「总有一天要做」的项目在几个月内全部完成。有人甚至因此感到一种奇怪的失落：backlog 清空了，接下来做什么？

---

## 八、Prompt Injection 与致命三角：一场尚未发生的灾难

Simon 在 2022 年——甚至早于 ChatGPT 发布——就定义了 prompt injection 这个术语。他现在对这个命名有些遗憾：SQL injection 是已解决的问题，开发者知道怎么修，因此这个类比本身带有误导性。

他提出了一个更精确的框架——Lethal Trifecta（致命三角）：

1. **私密信息暴露**（Private Data）——agent 能访问你的邮箱、文件
2. **恶意指令注入**（Malicious Input）——攻击者能通过某种渠道把指令送到 agent 面前
3. **数据外泄通道**（Exfiltration）——agent 有能力把数据发送给攻击者

三者齐备，就构成系统性安全漏洞。唯一可靠的防御是在系统设计层面切断三条腿中的一条——通常是第三条。试图用「更好的 AI」来检测攻击？Simon 认为即使检测率达到 97%，在安全领域仍然不及格——每 100 次攻击中有 3 次会窃取你的全部信息。

他用挑战者号航天飞机灾难中的「偏差正常化」（normalization of deviance）理论来类比当前的处境：

> "Lots of people knew that those little O-rings were unreliable. But every single time you get away with launching a space shuttle without the O-rings failing, you institutionally feel more confident in what you're doing. We've been using these systems in increasingly unsafe ways. This is going to catch up with us."
>
> 「很多人知道那些 O 型环不可靠。但每一次发射航天飞机而 O 型环没出问题，整个机构就会对自己在做的事更有信心。我们一直在以越来越不安全的方式使用这些系统。这迟早会追上我们。」

Simon 已经连续三年每六个月预测一次「AI 领域的挑战者灾难」。虽然尚未发生，但他引用了 Lenny 转述的那个比喻作结：就像那只在感恩节前一天信心最强的火鸡。

---

## 九、OpenClaw：数字宠物、安全噩梦、与不可抗拒的诱惑

Simon 对 OpenClaw 的评价充满了矛盾的欣赏。这个项目从 2025 年 11 月 25 日写下第一行代码，到超级碗上出现 AI.com 的广告，只用了三个半月。它几乎完美地体现了 Simon 一直警告不要构建的东西——能访问邮箱、能代你行动的个人 AI 助手。从安全角度看，它有着严重的风险敞口——已经有人因此丢失了 Bitcoin 钱包。但它证明了用户对个人 AI 助手的需求强烈到愿意忽略一切风险。

Simon 分析了 OpenClaw 成功的结构性原因：Anthropic 和 OpenAI 有能力构建类似的产品但选择不做，因为他们无法确保安全性。作为独立第三方，OpenClaw 不受这个约束。

> "A friend of mine said that's because OpenClaw is basically a Tamagotchi, right? It's a digital pet and you buy the Mac Mini as an aquarium."
>
> 「我一个朋友说，OpenClaw 本质上是一个电子宠物（Tamagotchi），而你买的 Mac Mini 就是养它的鱼缸。」

Simon 自己只在 Docker 容器里运行 OpenClaw，给了它只读的工作邮箱权限——典型的安全研究者做法。他认为当前 AI 领域最大的机会就是构建一个安全的 OpenClaw，但坦承自己不知道如何做到。

---

## 十、鹈鹕骑自行车：一个荒诞基准测试背后的深刻洞察

Simon 最广为人知的「发明」之一是让 LLM 生成一张 SVG 格式的鹈鹕骑自行车的图片。这不是测试图像模型，而是测试文本模型的空间推理和代码生成能力——因为 SVG 本质上是代码。

诡异的是，鹈鹕骑自行车画得好的模型，在其他所有任务上也表现更好。这个相关性一直成立，没有人能解释原因，但各大 AI 实验室都知道这个 benchmark。GPT 5.4 在最高思考级别下确实画出了最好的鹈鹕——至于为什么，Simon 自己也不知道。

他承认自己备有后手测试——万一实验室专门训练鹈鹕骑自行车，他还有「豹猫骑摩托」之类的变体。但 Gemini 3.1 发布时直接把所有动物和交通工具的组合都覆盖了——他的防线全部被击穿。

这个看似玩闹的故事背后是 Simon 的核心信念：AI 领域本质上是荒诞而有趣的。我们拥有这些极其昂贵、极其耗能、号称史上最先进的计算机，让它画一只鹈鹕骑自行车，画出来像五岁小孩的作品。保持对这种荒诞性的敏感和幽默感，可能是在变革中保持心理健康的最佳策略。

---

## 十一、稀有鹦鹉与 AI 之年

播客的最后，Simon 没有给出任何关于 AI 未来的宏大预测。他分享了一条关于鸮鹦鹉（Kākāpō）的消息——这种新西兰特有的不会飞的夜行鹦鹉，全球仅存约 250 只，依赖 Rimu 树的果实繁殖。上一次 Rimu 树大规模结果是 2022 年，四年间没有一只幼崽出生。2026 年 Rimu 树终于再次结果，数十只幼崽已经诞生，可以通过网络摄像头观看孵蛋过程。

这或许是 Simon Willison 给出的最好建议：在被 AI 的加速度裹挟前行时，偶尔停下来看看一只罕见的绿色鹦鹉坐在巢里。世界上有些事情仍然按照自己的节奏发生，无论模型迭代得多快。

---

## 总结：一份来自前线的诚实报告

这期播客的价值不在于 Simon Willison 告诉你 AI 有多强——这已经是共识。它的价值在于 Simon 同时处在三个位置上：他是工具的深度使用者，是安全风险的长期研究者，也是一个每天都在适应新现实的个体。他能在同一段话里说出「这太有趣了」和「这让我很担心」，而且两者都是真诚的。

几个值得带走的核心洞察：

- **代码已经便宜到接近免费**——但判断力、品味和经验变得更加昂贵
- **中层工程师是最危险的位置**——不是因为 AI 取代了他们，而是因为他们既没有新人的启动加速红利，也没有资深者的深层经验可供放大
- **安全问题不会被「更好的 AI」解决**——致命三角是结构性的，唯一可靠的防御是在系统设计层面切断攻击路径
- **要在 AI 时代积累价值，就要囤积已验证的能力节点**——不是收藏文章，而是让 agent 写代码、跑代码、产出可复用的研究成果
- **保持野心，保持幽默，保持对荒诞的欣赏**——这可能是在变革中不被压垮的最好方式

Simon 在整个对话中反复强调的一个词是 agency——人类的能动性。讽刺的是，AI agent 恰恰没有 agency：

> "I would argue that the one thing AI can never have is agency because it doesn't have human motivations."
>
> 「我认为 AI 永远不可能拥有的一样东西就是 agency——因为它没有人类的动机。」

它们没有动机、没有好奇心、不会在半夜想到一个荒唐的点子然后兴奋得睡不着。这些仍然是人类独有的。

至少在 2026 年的 4 月，这仍然是我们最大的优势。
