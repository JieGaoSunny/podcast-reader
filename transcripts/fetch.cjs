const https = require('https');
const fs = require('fs');

const videoId = 'HTBmimvFMtU';
const url = `https://www.youtube.com/watch?v=${videoId}`;
const cookie = 'CONSENT=YES+cb.20210328-17-p0.en-GB+FX+' + Math.floor(Math.random()*1000);

https.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9', 'Cookie': cookie}}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const regex = /"captionTracks":(\[.*?\])/;
    const m = data.match(regex);
    if (!m) { 
      console.log('No captions found. Consent:', data.includes('CONSENT'), 'Len:', data.length); 
      process.exit(1); 
    }
    const tracks = JSON.parse(m[1]);
    console.log('Found tracks:', tracks.map(t => t.languageCode));
    const en = tracks.find(t => t.languageCode === 'zh' || t.languageCode === 'zh-Hans' || t.languageCode === 'zh-CN') || tracks[0];
    
    const captionUrl = en.baseUrl + '&fmt=json3';
    https.get(captionUrl, (r2) => {
      let d2 = '';
      r2.on('data', c => d2 += c);
      r2.on('end', () => {
        const j = JSON.parse(d2);
        const text = j.events
          .filter(e => e.segs)
          .map(e => e.segs.map(s => s.utf8).join(''))
          .join(' ')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        const outPath = `C:\\Users\\gajie\\.openclaw\\agents\\dev\\projects\\podcast-reader\\transcripts\\${videoId}.txt`;
        fs.writeFileSync(outPath, text, 'utf8');
        console.log('OK, length:', text.length);
      });
    });
  });
});
