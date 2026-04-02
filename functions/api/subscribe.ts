// Cloudflare Pages Function: POST /api/subscribe
const AUDIENCE_ID = 'aea8397c-fbcc-4e78-8287-9c78ce4c29e9';
const FROM_EMAIL = 'podcast@societas.work';

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

    // 2. Send welcome email
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
            <br/>
            <p>欢迎。你刚刚加入了一个小众的阅读角落。</p>
            <br/>
            <p>好播客值得再读一遍。</p>
            <p>我们把最好的播客变成最好的文字——每周 3 篇，覆盖 AI、投资、哲学、人生。来自全球最值得听的对话。</p>
            <p>新文章发布，你会第一时间收到。</p>
            <br/>
            <p><strong>先从这三篇开始吧：</strong></p>
            <p>📌 <a href="https://podcast.societas.work/posts/jensen-huang-lex-fridman" style="color:#0F4C81;">黄仁勋：NVIDIA 的极限协同设计哲学</a></p>
            <p>📌 <a href="https://podcast.societas.work/posts/jony-ive-stripe" style="color:#0F4C81;">Jony Ive：设计是对人类的感恩</a></p>
            <p>📌 <a href="https://podcast.societas.work/posts/song-meiling-chai-jing" style="color:#0F4C81;">宋美龄：如果人生重来，我不会结婚</a></p>
            <br/>
            <p>如果你最近听到什么好播客，回复这封邮件就行。你推荐的，我优先安排。</p>
            <p>Stay hungry, stay foolish.</p>
            <br/>
            <p>—— 播客精读录</p>
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
