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
        subject: '🎉 欢迎订阅播客精读录',
        html: `
          <div style="max-width:560px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#37352F;">
            <h2 style="color:#37352F;">欢迎加入播客精读录 📬</h2>
            <p>感谢你的订阅！从现在起，每当有新的播客精读文章发布，你将第一时间收到通知。</p>
            <p>我们精选优质播客，用深度文字还原每一期的精华内容，帮你用阅读的时间获取播客的洞察。</p>
            <p><a href="https://podcast.societas.work" style="color:#0F4C81;">开始阅读 →</a></p>
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
