const CDP = require('chrome-remote-interface');
const fs = require('fs');
const path = require('path');

const videos = [
  { id: 'xCd9ykretlg', title: 'Keith Rabois on Talent' },
  { id: 'eqPljh_9C9Y', title: 'Video 2' },
  { id: 'GDeEATJcbJo', title: 'Video 3' },
  { id: 'M6MzKYP9XeI', title: 'Video 4' },
  { id: 'D-LrZc193uU', title: 'Video 5' },
  { id: 'SRluyg698u4', title: 'Video 6' },
];

const outDir = __dirname;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchTranscript(client, videoId) {
  const { Page, Runtime } = client;
  
  console.log(`\n=== ${videoId} ===`);
  await Page.navigate({ url: `https://www.youtube.com/watch?v=${videoId}` });
  await sleep(5000);
  
  // Get publish date
  let dateResult = await Runtime.evaluate({ expression: `document.querySelector('meta[itemprop="datePublished"]')?.content || 'no date'` });
  console.log(`Date: ${dateResult.result.value}`);
  
  // Click "Show more" in description to reveal transcript button
  await Runtime.evaluate({ expression: `document.querySelector('#expand')?.click()` });
  await sleep(1000);
  
  // Click "Show transcript" button
  await Runtime.evaluate({ expression: `
    const btns = document.querySelectorAll('button');
    for(const b of btns) {
      if(b.textContent.includes('Show transcript') || b.textContent.includes('显示转录稿')) {
        b.click(); break;
      }
    }
  `});
  await sleep(3000);
  
  // Extract transcript segments
  let result = await Runtime.evaluate({ expression: `
    const segments = document.querySelectorAll('ytd-transcript-segment-renderer .segment-text');
    segments.length > 0 ? Array.from(segments).map(s => s.textContent.trim()).join(' ') : 'NO_TRANSCRIPT';
  `});
  
  const text = result.result.value;
  if (text === 'NO_TRANSCRIPT') {
    console.log('No transcript found');
    return null;
  }
  
  console.log(`Transcript length: ${text.length}`);
  const outPath = path.join(outDir, `${videoId}.txt`);
  fs.writeFileSync(outPath, text, 'utf8');
  console.log(`Saved: ${outPath}`);
  
  // Save metadata JSON
  const meta = { id: videoId, date: dateResult.result.value, transcript_length: text.length };
  fs.writeFileSync(path.join(outDir, `${videoId}.json`), JSON.stringify(meta, null, 2), 'utf8');
  
  return meta;
}

async function main() {
  let client;
  try {
    // Connect to existing browser
    const targets = await CDP.List({ port: 9222 });
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');
    
    client = await CDP({ port: 9222, target: pageTarget });
    const { Page, Runtime } = client;
    await Page.enable();
    
    const results = [];
    for (const v of videos) {
      try {
        const meta = await fetchTranscript(client, v.id);
        results.push(meta || { id: v.id, error: 'no transcript' });
      } catch(e) {
        console.error(`Error for ${v.id}: ${e.message}`);
        results.push({ id: v.id, error: e.message });
      }
    }
    
    console.log('\n=== RESULTS ===');
    console.log(JSON.stringify(results, null, 2));
    
  } catch(e) {
    console.error('Fatal:', e.message);
  }
}

main();
