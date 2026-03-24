import { Innertube } from 'youtubei.js';
import fs from 'fs';

const videoIds = [
  { id: 'n1E9IZfvGMA', name: 'dario-dwarkesh' },
  { id: 'We7BZVKbCVw', name: 'boris-cherny-claude-code' },
  { id: 'IcbuTTVUY7M', name: 'granola-ceo' },
  { id: '68ylaeBbdsg', name: 'dario-nikhil-kamath' },
  { id: 'ugvHCXCOmm4', name: 'dario-lex-fridman' },
];

const yt = await Innertube.create();

for (const { id, name } of videoIds) {
  try {
    const info = await yt.getInfo(id);
    const transcript = await info.getTranscript();
    const segments = transcript.transcript.content.body.initial_segments;
    const text = segments.map(s => s.snippet.text).join(' ');
    fs.writeFileSync(`transcripts/${name}.txt`, text);
    console.log(`✅ ${name}: ${text.length} chars`);
  } catch (e) {
    console.error(`❌ ${name}: ${e.message}`);
  }
}
