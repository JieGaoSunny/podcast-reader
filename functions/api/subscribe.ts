// Cloudflare Pages Function: POST /api/subscribe
const AUDIENCE_ID = 'aea8397c-fbcc-4e78-8287-9c78ce4c29e9';
const FROM_EMAIL = 'podcast@societas.work';

// Article catalog for random recommendations
const ARTICLES = [
  { slug: 'andrej-karpathy-lex-fridman', title: 'Andrej Karpathy：从物理学转行到定义 AI 的下一个十年' },
  { slug: 'anthropic-cofounders-conversation', title: 'Building Anthropic：七位联合创始人的罕见对话' },
  { slug: 'claire-vo-openclaw', title: '从怀疑论者到虔诚信徒：OpenClaw 如何改变了我的人生' },
  { slug: 'guy-spier-farewell', title: '告别·盖伊·斯皮尔：一封写给价值投资的情书' },
  { slug: 'hamnet-director-oscars', title: '赵婷：拍电影不是讲故事，是创造一个世界' },
  { slug: 'jensen-huang-lex-fridman', title: '黄仁勋：从芯片到AI工厂，NVIDIA的极限协同设计哲学' },
  { slug: 'jessica-fain-art-of-influence', title: '影响力的艺术：如何不靠权力推动改变' },
  { slug: 'jony-ive-stripe', title: 'Jony Ive：设计是对人类的感恩' },
  { slug: 'karpathy-end-of-coding', title: 'Andrej Karpathy：当编程遇上AI Agent — 2025 年的编程新范式' },
  { slug: 'lulu-cheng-founder-comms', title: '创始人最被低估的技能：Lulu Cheng Meservey 谈战略沟通' },
  { slug: 'manus-last-interview', title: 'Manus 创始人最后的访谈：一个中国 Agent 公司如何意外引爆 AI 圈' },
  { slug: 'mel-robbins-habits-science', title: '习惯的科学：为什么你的意志力总是不够用' },
  { slug: 'song-meiling-chai-jing', title: '宋美龄：如果人生重来，我不会结婚' },
  { slug: 'songbai-rinpoche-ep115', title: '松柏仁波切谈生死与修行：你以为的自由是另一种执念' },
  { slug: 'sora-info-puzzle-dai-ji', title: 'Sora 团队与信息拼图的艺术：顶级产品人如何思考信息架构' },
  { slug: 'steve-jobs-stanford-2005', title: '乔布斯2005年斯坦福演讲全文：求知若饥，虚心若愚' },
  { slug: 'wef-day-after-agi-2026', title: 'AGI 之后的第一天：Amodei 与 Hassabis 的达沃斯巅峰对话' },
  { slug: 'xiang-biao-zaobao-interview', title: '人类学家项飙谈附近：当内卷遇上躺平，我们如何重建附近' },
  { slug: 'yijing-life-wisdom-sherry', title: '易经中的生活智慧：为什么古人比我们更懂变化' },
];

function pickRandom(arr: typeof ARTICLES, n: number) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export const onRequestPost: PagesFunction<{ RESEND_API_KEY: string }> = async (context) => {
  const { env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://podcast.societas.work',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await context.request.json() as { email?: string };
    const email = body?.email;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // 1. Add contact to audience
    const contactRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!contactRes.ok) {
      const err = await contactRes.text();
      console.error('Resend contact error:', err);
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // 2. Send welcome email with random article recommendations
    const picks = pickRandom(ARTICLES, 3);
    const articlesHtml = picks.map(a =>
      `<p>📌 <a href="https://podcast.societas.work/posts/${a.slug}" style="color:#0F4C81;">${a.title}</a></p>`
    ).join('\n            ');

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `播客精读录 <${FROM_EMAIL}>`,
        to: email,
        subject: '订阅成功 | 播客精读录',
        html: `
          <div style="max-width:560px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Inter','Noto Sans SC',sans-serif;color:#37352F;line-height:1.8;font-size:16px;">
            <p>你好，</p>
            <p>欢迎。你刚刚加入了一个小众的阅读角落。</p>
            <p>好播客值得再读一遍。</p>
            <p>我们把最好的播客变成最好的文字——每周 3 篇，覆盖 AI、投资、哲学、人生。来自全球最值得听的对话。</p>
            <p>新文章发布，你会第一时间收到。</p>
            <p style="margin-top:16px;"><strong>先从这三篇开始吧：</strong></p>
            ${articlesHtml}
            <p style="margin-top:16px;">如果你最近听到什么好播客，回复这封邮件就行。</p>
            <p>Stay hungry, stay foolish.</p>
            <p style="margin-top:16px;">—— 播客精读录</p>
            <hr style="border:none;border-top:1px solid #E9E9E7;margin:24px 0;" />
            <p style="font-size:13px;color:#9B9A97;">如不想继续接收，回复此邮件告知即可退订。</p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    console.error('Subscribe error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

// Handle CORS preflight
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://podcast.societas.work',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
