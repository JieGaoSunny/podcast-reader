async function main() {
  const q = encodeURIComponent('罗永浩 十字路口 不开玩笑 折腾 site:xiaoyuzhoufm.com OR site:ximalaya.com');
  const resp = await fetch('https://www.google.com/search?q=' + q, {
    headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
  });
  const html = await resp.text();
  const re = /href="\/url\?q=(https?:\/\/[^&"]+)/g;
  let m;
  const urls = [];
  while ((m = re.exec(html)) !== null) {
    urls.push(decodeURIComponent(m[1]));
  }
  console.log('Found URLs:', urls.slice(0, 10));
}
main().catch(console.error);
