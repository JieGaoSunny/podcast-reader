---
title: "李飞飞：从干洗店女孩到 AI 教母，她用一个数据集改变了世界"
date: 2025-11-16
published_at: 2026-04-08
source_url: "https://www.youtube.com/watch?v=Ctjiatnd6Xk"
channel: "Lenny's Podcast"
guest: "Fei-Fei Li"
guest_title: "斯坦福 HAI 联合主任，World Labs 创始人，ImageNet 创造者"
thumbnail: "/images/thumbnails/Ctjiatnd6Xk.jpg"
tags: ["AI", "ImageNet", "世界模型", "空间智能", "创业", "人本AI"]
duration: "约1.5h"
reading_time: 30
---

## 编者按


Fei-Fei Li，斯坦福 HAI 联合主任，World Labs 创始人，ImageNet 创造者。
如果你今天走进任何一家科技公司，它大概率会自称「AI 公司」。但仅仅九年前——2016 年——硅谷的一些顶级科技公司还在刻意回避「AI」这个词，因为他们不确定这是不是个「脏词」。

这段反差背后，隐藏着一个关于数据、勇气和信念的故事。而这个故事的主角，就是被称为「AI 教母」（The Godmother of AI）的李飞飞。

这期 Lenny's Podcast 是一场穿越 AI 七十年历史的深度对话。从 1956 年达特茅斯会议到 2012 年 AlexNet 的横空出世，从 ChatGPT 引爆全球到她创办 World Labs 推出世界首个大型世界模型 Marble——李飞飞以亲历者的视角，串联起了 AI 发展最关键的脉络。更重要的是，在技术叙事之外，她始终在追问一个根本性的问题：AI 的发展，最终是为了谁？

这不是一次技术布道。这是一位科学家、创业者和人文主义者的完整思想图谱。

---

## 一、AI 简史：从「脏词」到文明级技术

很少有人比李飞飞更有资格讲述 AI 的完整历史，因为她几乎亲历了从「AI 寒冬」到「AI 盛夏」的全过程。

AI 的故事要从 1940 年代讲起。Alan Turing 抛出了一个石破天惊的问题：机器能思考吗？1956 年，一群计算机科学家在达特茅斯学院聚首，John McCarthy 在那次会议上铸造了「Artificial Intelligence」这个术语。此后几十年，这个领域经历了逻辑系统、专家系统、早期神经网络的探索——有过短暂的辉煌，也有过漫长的寒冬。

到了 1990 年代末和 21 世纪初，一个关键的认知转变发生了：纯粹基于规则的程序无法覆盖认知的广度，必须让机器自己学习模式。这就是机器学习（Machine Learning）的核心洞见。李飞飞回忆自己 2000 年进入 Caltech 攻读博士时的场景：

> "My PhD began at Caltech. And so I was one of the first generation machine learning researchers and we were already studying this concept of machine learning especially neural network. I remember that was one of my first courses at Caltech is called neural network but it was very painful. It was still smack in the middle of the so-called AI winter."
>
> 「我在加州理工开始读博，是最早一批机器学习研究者。我们已经在研究机器学习的概念，尤其是神经网络。我记得那是我在加州理工的第一门课之一，叫『神经网络』，但那段时光非常痛苦。当时正处于所谓『AI 寒冬』的正中间。」

她选择了视觉智能（Visual Intelligence）作为研究方向，这个选择本身就透着一种独到的眼光：

> "I chose to look at artificial intelligence through the lens of visual intelligence because humans are deeply visual animals. So much of our intelligence is built upon visual, perceptual, spatial understanding, not just language per se."
>
> 「我选择从视觉智能的角度切入人工智能，因为人类是深度视觉化的动物。我们大量的智能建构在视觉、感知和空间理解之上，而不仅仅是语言。」

但最让人震惊的一个细节来自硅谷的集体记忆。李飞飞提到，在 2015 到 2016 年间，一些科技公司还在刻意回避使用「AI」这个词。她回忆起自己鼓励大家用这个词的场景：

> "I was in a conversation in one of the early days, I think in the middle of 2015, middle of 2016, some tech companies avoid using the word AI because they were not sure if AI was a dirty word. And I remember I was actually encouraging everybody to use the word AI because to me that is one of the most audacious questions humanity has ever asked."
>
> 「我记得大概在 2015 年中到 2016 年中的时候，有些科技公司刻意不用『AI』这个词，因为他们不确定这是不是个脏词。我当时一直在鼓励大家用这个词，因为在我看来，这是人类在科学和技术探索中提出的最大胆的问题之一。」

到大约 2017 年，公司才开始自称「AI 公司」。而今天？你不称自己是 AI 公司反而才是异类。

从边缘到主流的跃迁，往往比我们记忆中更突然，也更晚近。这段历史提醒我们：在今天看来如此理所当然的东西，仅仅九年前还处于身份认同的危机之中。

## 二、ImageNet：一个「所有人都觉得太简单」的想法，改变了世界

如果要用一件事来定义李飞飞对 AI 的贡献，那就是 ImageNet。

故事要从一个看似朴素但极为深刻的洞察讲起：**模型不是瓶颈，数据才是。**

当时的 AI 研究界几乎所有人都在钻研更精巧的数学模型——贝叶斯网络、支持向量机、各种神经网络变体。李飞飞也在其中，但她注意到一个被严重忽视的事实：

> "I was working on all kinds of mathematical models including neural network including Bayesian network including many many models and there was one singular pain point is that these models don't have data to be trained on. As a field we were so focusing on these models but it dawned on me that human learning as well as evolution is actually a big data learning process."
>
> 「我在研究各种数学模型——神经网络、贝叶斯网络，各种各样的模型——但有一个始终存在的痛点：这些模型没有数据可以训练。整个领域都在聚焦模型，但我突然意识到，人类的学习，乃至进化本身，其实就是一个大数据学习过程。」

人类通过海量的视觉经验来认识世界。一个婴儿从出生到能辨认猫，经历了无数次视觉输入。进化本身也是生物体在环境中不断「体验」的结果。如果机器缺乏足够的训练数据，再精巧的模型也不过是巧妇难为无米之炊。

2006 到 2007 年，她带着几个研究生启动了 ImageNet 项目。他们的野心大得有些疯狂——要从互联网上策划出包含所有物体概念的图片数据集。

> "We curated very carefully 15 million images on the internet. Created a taxonomy of 22,000 concepts borrowing other researchers' work like a linguist work on WordNet. Now it's totally delusional to think a couple of graduate students and a professor can do this."
>
> 「我们从互联网上精心策划了 1500 万张图片，创建了一个 22000 个概念的分类体系，借鉴了语言学家在 WordNet 上的工作。现在回头看，觉得几个研究生和一个教授就能干这件事，简直是妄想。」

然后她做了一个关键决定——将数据集完全开源，并举办年度 ImageNet 挑战赛，邀请全球研究者参与。

2012 年，转折点到来。多伦多大学的 Geoffrey Hinton 团队用 ImageNet 的大数据、神经网络算法和**两块 NVIDIA GPU**——没错，就是两块打游戏用的显卡——训练出了 AlexNet，第一个在物体识别任务上取得突破性进展的深度神经网络。

这就是后来被称为「深度学习革命」的起点。李飞飞总结了现代 AI 的「黄金三要素」：

> "That combination of the trio technology — big data, neural network and GPU — was kind of the golden recipe for modern AI. And then fast forward, the public moment of AI which is the ChatGPT moment, if you look at the ingredients, still use these three ingredients. Now it's internet scale data mostly texts, a much more complex neural network architecture than 2012 but it's still neural network, and a lot more GPUs but it's still GPUs."
>
> 「这三位一体的技术组合——大数据、神经网络和 GPU——就是现代 AI 的黄金配方。快进到 ChatGPT 时刻，配方还是一样的。只不过数据变成了互联网规模的文本，神经网络架构更复杂了但还是神经网络，GPU 更多了但还是 GPU。」

从两块游戏级 GPU 到数十万块 H100——配方没变，规模变了一切。

这个故事最打动人的地方在于它的「高能动性」（high agency）。没有人告诉李飞飞去做这件事，没有公司赞助，没有市场需求。一个教授和几个研究生认为这件事重要，就去做了。正如主持人 Lenny 感叹的：「You can just do things.」——你其实可以直接去做事。

李飞飞提到 Scale AI 创始人 Alex Wang 当年给她发邮件，说 ImageNet 是 Scale 的灵感来源。从一个学术数据集到如今估值数十亿美元的数据标注产业，ImageNet 的影响远超李飞飞最初的想象。

## 三、AGI 之辩：一个科学家的清醒

面对「我们离 AGI 有多远」这个所有人都想问的问题，李飞飞的回答充满了科学家的审慎。

她首先质疑了 AGI 这个概念本身：

> "As a scientist, I take science very seriously. I don't know what's the difference between AI and AGI. I wonder if Alan Turing is around today and you ask him to contrast AI versus AGI, he might just shrug and said, well, I asked the same question back in 1940s. I feel AGI is more a marketing term than a scientific term."
>
> 「作为科学家，我对科学是很认真的。我不知道 AI 和 AGI 之间到底有什么区别。如果 Alan Turing 今天还在，你问他 AI 和 AGI 有何不同，他大概会耸耸肩说——我在 1940 年代问的就是同一个问题。我觉得 AGI 更像一个营销术语，而非科学术语。」

这不是回避问题，而是拒绝把一个深刻的科学问题简化为一个流行标签。

但她绝不回避 AI 当前的局限性。她举了几个极具说服力的例子：

**空间推理**：让模型看一段办公室的视频，数一数有几把椅子——幼儿园孩子能做到的事，AI 做不到。

**科学创造力**：这是最让人振聋发聩的例子。她先提到 DeepMind 的 Demis Hassabis 提出的测试——给最先进的模型 20 世纪末之前的所有信息，看它能否独立产生爱因斯坦的突破。答案是远远不能。然后她把标准拉得更低：

> "Let's give AI all the data including modern instruments data of celestial bodies which Newton did not have and just ask AI to create the 17th century set of equations on the laws of bodily movements. Today's AI cannot do that."
>
> 「把现代天文仪器的所有数据——比牛顿当年拥有的信息多得多——全部给 AI，然后让它推导出 17 世纪的运动定律。今天的 AI 完全做不到。」

连倒退三百年、用远超当年的数据去重新推导牛顿定律都做不到。这不是 AGI 远不远的问题，这是我们对智能本身的理解还远远不够的问题。

**情感智能**：一个学生走进导师办公室，聊动力、困惑和迷茫——那种深层的认知-情感互动，今天的对话机器人根本无法胜任。

> "There is not a single deeply scientific discipline in human history that has arrived at a place that says we're done. We're done innovating. And AI is one of the, if not the youngest discipline in human civilization. We're still scratching the surface."
>
> 「人类历史上没有任何一个深入的科学学科到了某个阶段会说『我们创新完了』。而 AI 几乎是人类文明中最年轻的学科之一。我们还在挠表面。」

这是一种既不狂热也不悲观的定位——承认巨大的进步，也承认巨大的无知。在一个充满「AGI 明年到来」炒作的行业里，这种清醒弥足珍贵。

## 四、世界模型与空间智能：超越语言的下一个前沿

如果 ImageNet 是李飞飞对 AI 第一幕的贡献，那么**世界模型**（World Models）就是她正在书写的第二幕。

她的核心论点很明确：大语言模型只覆盖了人类智能的一部分——语言智能。但人类还有另一种同样根本的智能——**空间智能**（Spatial Intelligence）。

为了说明这一点，她举了一个极其生动的例子。想象一个混乱的灾难现场：消防员扑灭火焰，急救人员在废墟中搜救，指挥员调配资源。这些行动中语言只是一小部分——大量的认知活动是空间性的：对环境的即时理解、路径规划、物体交互、态势感知。

> "If you immerse yourself in those scenes and think about how people organize themselves to rescue people, to stop further disasters, to put down fires — a lot of that is movements, is spontaneous understanding of objects, worlds, situational awareness. Language is part of that. But a lot of those situations language cannot get you to put down the fire."
>
> 「如果你沉浸在那些场景中，想想人们是如何组织自己去救人、阻止灾难蔓延、灭火的——大量的工作是运动、是对物体和环境的即时理解、是态势感知。语言是其中一部分，但在很多情况下，语言帮不了你灭火。」

她还举了一个科学史上的经典案例，让这个抽象的概念变得无比具体。DNA 双螺旋结构的发现——Rosalind Franklin 拍摄的 X 射线衍射照片是一张平面 2D 图像。但 Watson 和 Crick 从这张 2D 照片中，通过空间推理，推导出了一个高度三维的双螺旋结构。

> "You cannot think in 2D and deduce that structure. You have to think in 3D spatial, use the human spatial intelligence. So I think even in scientific discovery, spatial intelligence or AI-assisted spatial intelligence is critical."
>
> 「你不可能用 2D 思维推导出那个结构。你必须在 3D 空间中思考，动用人类的空间智能。所以我认为，即使在科学发现中，空间智能——或 AI 辅助的空间智能——也是至关重要的。」

那什么是世界模型？李飞飞给出了清晰的定义：

> "A world model can allow anyone to create any worlds in their mind's eye by prompting whether it's an image or a sentence, and also be able to interact in this world — whether you're browsing and walking or picking objects up or changing things — as well as to reason within this world."
>
> 「世界模型允许任何人通过提示——无论是图片还是文字——创造出心中的世界，并且能够在这个世界中交互——走动、拾取物体、改变环境——以及在这个世界中推理。」

这与视频生成模型有本质区别。她引用柏拉图的「洞穴寓言」来阐释：视频模型只是在制造洞壁上的投影——被动的 2D 画面。而世界模型追求的是理解投影背后的 3D 现实本身。

> "Plato has the allegory of the cave. Imagine a prisoner tied on his chair in a cave, watching a full life theater on a wall. But the actual live theater that actors are acting is behind his back. Spatial intelligence to me is deeper than just creating that flat 2D world. Spatial intelligence is the ability to create, reason, interact, make sense of deeply spatial world."
>
> 「柏拉图有个洞穴寓言。想象一个囚犯被绑在椅子上，在洞穴里看着墙上的全息影像。但演员真正的表演在他背后。空间智能在我看来，远不止创造那个平面的 2D 世界。空间智能是创造、推理、交互，理解一个深度空间化的世界的能力。」

## 五、Marble：从论文到产品的惊险一跃

2024 年，李飞飞与三位联合创始人——Justin Johnson、Christoph Lassner 和 Ben Mildenhall——创办了 World Labs。仅仅 18 个月后，他们推出了 Marble——世界首个能从文本和图片提示生成可导航 3D 世界的产品。

Marble 的技术内核是一个生成式模型，能输出「真正的 3D 世界」——不是渲染好的视频片段，而是有深度结构的空间，用户可以自由在其中漫游。戴上 VR 头显，你甚至可以走进去。

有一个特别有趣的细节。当用户进入 Marble 生成的世界时，会先看到一层「点云」逐渐凝聚成完整的场景。很多用户对此赞叹不已——它让人想起《黑客帝国》中世界被构建的瞬间。Lenny 对此特别着迷，说它就像 Matrix 的体验。李飞飞的回应让人意外：

> "The dots that lead you into the world was an intentional feature visualization. It is not part of the model. The model actually just generates the world. We were trying to find a way to guide people into the world... So many people told us how delightful that experience is and it was really satisfying for us to hear that this intentional visualization feature that's not just the big hardcore model actually has delighted our users."
>
> 「那些引导你进入世界的点云，是一个有意为之的可视化特效，不是模型本身的行为。模型只是生成世界。我们是在寻找一种方式来引导人们进入这个世界……这么多人告诉我们这个体验多么令人惊喜，听到一个不属于核心模型的交互设计竟然如此打动用户，我们真的很满足。」

这是一个绝佳的产品启示：有时候最打动用户的，不是你最硬核的技术，而是一个用心的过渡动画。作为研究者出身的创始人，李飞飞说这是她「正在学习的地方」。

已经浮现的应用场景令人兴奋。**虚拟制片**方面，World Labs 与 Sony 合作，用 Marble 生成 3D 场景供电影拍摄。李飞飞透露了一个惊人的数字：

> "They were saying this has cut our production time by 40x."
>
> 「他们说这把制作时间压缩了 40 倍。」

**游戏开发**方面，用户已经在把 Marble 输出的场景导出为 mesh，放入 VR 游戏和其他互动体验。**机器人训练**方面，Marble 可以生成多样化的合成训练环境——这是机器人研究中最大的痛点之一。

最出人意料的使用场景来自心理学。一个心理学团队联系 World Labs，希望用 Marble 快速生成各种沉浸式场景——凌乱的房间、整洁的空间——来研究精神疾病患者的大脑反应。传统方法成本高昂、耗时巨大，Marble 几乎是即时的。李飞飞还提到一个朋友前一晚刚打电话问她，Marble 能不能用于恐高症的暴露疗法。

这正是 AI 产品的经典轨迹——Chris Dixon 的名言再次应验：「下一个大事物，一开始总是看起来像个玩具。」ChatGPT 刚上线时，Sam Altman 只是发了条推特说「这是个我们在玩的有趣东西」。现在它是历史上增长最快的产品。

## 六、Bitter Lesson 与机器人的漫长征途

主持人转述了 a16z 的 Ben Horowitz 提出的问题：「为什么『苦涩教训』（Bitter Lesson）单独无法搞定机器人？」

李飞飞首先解释了背景。Richard Sutton 的经典论断——在 AI 历史上，更简单的模型加海量数据总是最终胜出。李飞飞笑着说，这对她来说不是苦涩教训，而是甜蜜教训——这正是她建 ImageNet 的原因。

但机器人领域面临几个独特的困难。

第一个是**数据对齐问题**。李飞飞对做语言模型的同事「非常嫉妒」：

> "They had this perfect setup where their training data are in words, eventually tokens, and then they produce a model that outputs words. So you have this perfect alignment between what you hope to get and what your training data looks like. But robotics is different. You hope to get actions out of robots. But your training data lacks actions in 3D worlds."
>
> 「他们有一个完美的设定：训练数据是文字，最终是 token，输出也是文字。输入和输出高度对齐。但机器人不一样。你希望机器人输出的是动作，但训练数据中缺少 3D 世界中的动作。」

就像把方块塞进圆孔。虽然可以用遥操作数据、合成数据来补充，但远不如语言模型的数据获取那么自然。

第二个是**物理系统的复杂性**。李飞飞做了一个精妙的类比：

> "Self-driving cars are much simpler robots. They're just metal boxes running on 2D surfaces. And the goal is not to touch anything. Robot is 3D things running in 3D world and the goal is to touch things."
>
> 「自动驾驶汽车是最简单的机器人——金属盒子在 2D 平面上行驶，目标是不碰任何东西。机器人是 3D 物体在 3D 世界中运动，目标是碰东西。」

从 2005 年 Sebastian Thrun 赢得 DARPA 挑战赛到今天 Waymo 上路，已经过去了 20 年，而且还没有完全解决。通用机器人比自动驾驶难了一个数量级。

这不是悲观论调。深度学习确实在加速机器人大脑的进化——这也是李飞飞全力投入这个方向的原因。但我们必须对时间线保持清醒。

然后她说了一句让人久久回味的话：

> "We operate on about 20 watts. That's dimmer than any light bulb in the room I'm in right now. And yet we can do so much. The more I work in AI, the more I respect humans."
>
> 「我们只用 20 瓦功率运转。这比我房间里任何一盏灯泡都暗。但我们却能做到这一切。我在 AI 领域工作越久，就越尊重人类。」

## 七、创业者李飞飞：智识上的无畏

很多人不知道，李飞飞 19 岁时开过一家干洗店。从那家小店到创办 World Labs，她的创业之路跨越了几十年。

她坦言，这次创业与之前的经历完全不同。最让她意外的是 AI 领域的竞争烈度——不仅是技术竞争，更是人才竞争。

> "When I founded the company, we did not have these incredible stories of how much certain talents would cost. So these are things that continue to surprise me."
>
> 「创办公司时，我们还没有那些关于某些人才要价多高的疯狂故事。这些事情一直在让我吃惊。」

但贯穿她整个职业生涯的，是一种她称之为「智识上的无畏」（intellectually fearless）的品质。Lenny 问她为什么总是出现在那些产生重大突破的地方——从 ImageNet 到 SAIL（斯坦福 AI 实验室）到 Google Cloud 再到 HAI——是否有什么规律。她的回答值得每一个年轻人听：

> "I'm an intellectually very fearless person. When you want to make a difference you have to accept that you're creating something new or you're diving into something new. People haven't done that. And if you have that self-awareness, you almost have to allow yourself to be fearless and to be courageous."
>
> 「我是一个在智识上非常无畏的人。当你想做出改变，你必须接受你在创造新事物、在跳入未知。别人没做过这件事。如果你有这种自我认知，你几乎必须允许自己无畏，允许自己勇敢。」

她举了自己职业生涯中几个关键的跳跃：放弃 Princeton 即将到手的终身教职，跳到 Stanford 重新开始 tenure clock，因为那里的人和生态系统更好；成为 SAIL 最年轻的、也是首位女性主任；离开学术界加入 Google，因为想和 Jeff Dean、Jeff Hinton 这样的人一起工作；再次离开 Google 回到斯坦福创办 HAI，因为意识到 AI 已经是文明级技术，需要人文框架来引导。

每一次跳跃都意味着放弃已经拥有的、拥抱不确定的。而她给年轻人的建议朴素而有力：

> "I don't overthink of all possible things that can go wrong because that's too many. Focus on what's important — where's your passion? Do you align with the mission? Do you believe and have faith in this team?"
>
> 「我不会过度思考所有可能出错的事情，因为那太多了。聚焦在什么是重要的——你的热情在哪里？你是否认同这个使命？你是否信任这个团队？」

## 八、Human-Centered AI：技术乐观主义者的底线

李飞飞是一个技术乐观主义者，但她反复强调自己「不是乌托邦主义者」。这是一个重要的区分。

> "I'm not a utopian. It's not like I think AI will have no impact on jobs or people. In fact, I'm a humanist. I believe that whatever AI does currently or in the future is up to us. It's up to the people."
>
> 「我不是乌托邦主义者。我并非认为 AI 不会影响工作或人们的生活。事实上，我是一个人文主义者。我相信 AI 现在和未来做什么，取决于我们。取决于人。」

她在 2018 年做了一个重要决定——从 Google 回到斯坦福创办 HAI（Human-Centered AI Institute，人本人工智能研究院）。当时她意识到一个关键问题：硅谷不跟华盛顿说话。一项可能改变整个文明的技术，而创造它的人和治理它的人之间几乎没有对话。

HAI 如今已是全球最大的人本 AI 研究机构，横跨斯坦福八大学院——从医学到法律到人文科学。他们做国会「AI 训练营」，发布 AI Index 报告，参与推动国家 AI 研究云法案的通过。

但这期播客中最打动人的，是她在最后给出的一段话：

> "When I travel around the world, everybody asks me: if I'm a musician, if I'm a teacher, middle school teacher, if I'm a nurse, if I'm an accountant, if I'm a farmer, do I have a role in AI or is AI just going to take over my life or my work? And I think this is the most important question of AI."
>
> 「当我在全世界旅行时，每个人都问我：如果我是音乐家、中学老师、护士、会计、农民——我在 AI 中有角色吗？还是 AI 会夺走我的工作和生活？我认为这是 AI 最重要的问题。」

她的回答是一个坚定的「是」——每个人都在 AI 中有角色。但附带一个根本性的前提：

> "No technology should take away human dignity and the human dignity and agency should be at the heart of the development, the deployment as well as the governance of every technology."
>
> 「没有任何技术应该夺走人的尊严，人的尊严和能动性应该处于每一项技术的开发、部署和治理的核心。」

然后她对不同角色的人给出了具体的建言。如果你是年轻的艺术家——拥抱 AI 作为工具，因为你讲故事的方式是独一无二的，世界仍然需要它。如果你是即将退休的农民——AI 仍然与你有关，因为你是公民，你有权在社区中对 AI 的应用发出声音。如果你是护士——AI 应该帮助你减轻过度疲劳的负担，智能摄像头提供更多信息，机器人助手分担体力工作。

> "I find that in Silicon Valley, we tend not to speak heart-to-heart with people — with people like us and not like us in Silicon Valley, but like all of us. We tend to just toss around words like infinite productivity or infinite leisure time. But at the end of the day, AI is about people."
>
> 「我发现在硅谷，我们总是不愿意和人们坦诚相见——不管是和我们一样的硅谷人，还是不在硅谷的所有人。我们总是随口抛出『无限生产力』『无限休闲时间』这样的词汇。但归根结底，AI 关乎的是人。」

这也是她最广为人知的那句话的出处：

> "There's nothing artificial about AI. It's inspired by people. It's created by people. And most importantly, it impacts people."
>
> 「AI 没有任何『人工』的地方。它由人启发，由人创造，最重要的是，它影响的是人。」

---

## 写在最后

这期播客浓缩了 AI 七十年的跌宕起伏，但李飞飞真正想传递的信息远超技术史。

**数据是被严重低估的创新变量。** ImageNet 的故事证明，有时候改变世界不需要更聪明的算法，只需要认真对待一个「所有人都觉得太简单、太苦力」的想法。几个研究生和一个教授策划了 1500 万张图片，催生了整个深度学习革命。

**AI 的下一个前沿是空间智能，不仅仅是语言。** 语言模型令人惊叹，但人类智能中有巨大的一部分——空间理解、物理推理、具身交互——还远未被触及。世界模型不是视频生成的升级版，而是一种全新的范式：从 2D 投影到 3D 现实的跃迁。

**技术最终是关于人的。** 在所有关于 scaling laws、GPU 数量和模型参数的讨论之外，李飞飞始终锚定在一个问题上：这项技术如何让每一个人——不仅是工程师和投资者——活得更有尊严？

李飞飞的故事本身也许就是最好的 AI 寓言：一个从中国移民到美国、开过干洗店的女孩，凭借智识上的无畏和对「正确问题」的执念，成为了 AI 革命最重要的推动者之一。在一个充斥着「下一个 10 亿美元估值」叙事的行业里，她提醒我们：最持久的影响力，来自于认真对待简单但正确的想法，然后用一生去践行它。
