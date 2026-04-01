async function main() {
  // Use YouTube innertube API
  const body = {
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20240101.00.00",
        hl: "zh",
        gl: "CN"
      }
    },
    videoId: "7MxU1yOTeTw"
  };
  
  const resp = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: JSON.stringify(body)
  });
  
  const data = await resp.json();
  
  if (data.captions) {
    const tracks = data.captions.playerCaptionsTracklistRenderer?.captionTracks || [];
    console.log('Found', tracks.length, 'caption tracks:');
    for (const t of tracks) {
      console.log(`  ${t.languageCode} (${t.name?.simpleText}) - ${t.baseUrl?.substring(0, 80)}`);
    }
    
    // Find Chinese track
    let track = tracks.find(t => t.languageCode === 'zh' || t.languageCode === 'zh-Hans');
    if (!track) track = tracks[0]; // fallback
    
    if (track) {
      // Fetch the transcript
      const tResp = await fetch(track.baseUrl + '&fmt=json3');
      const tData = await tResp.json();
      const lines = (tData.events || [])
        .filter(e => e.segs)
        .map(e => e.segs.map(s => s.utf8).join(''))
        .filter(l => l.trim());
      
      const text = lines.join('\n');
      const fs = require('fs');
      fs.writeFileSync(
        'C:\\Users\\gajie\\.openclaw\\agents\\dev\\projects\\podcast-reader\\transcripts\\7MxU1yOTeTw.txt',
        text, 'utf-8'
      );
      console.log(`Saved ${lines.length} lines, ${text.length} chars`);
    }
  } else {
    console.log('No captions in response');
    if (data.playabilityStatus) {
      console.log('Status:', data.playabilityStatus.status, data.playabilityStatus.reason);
    }
  }
}
main().catch(e => console.error(e));
