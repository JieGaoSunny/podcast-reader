import urllib.request, json, re, sys, xml.etree.ElementTree as ET

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Cookie': 'CONSENT=PENDING+987; SOCS=CAISNQgDEitib3FfaWRlbnRpdHlmcm9udGVuZHVpc2VydmVyXzIwMjMwODI5LjA3X3AxGgJlbiACGgYIgJnSmgY',
    'Accept-Language': 'en-US,en;q=0.9'
}

video_id = 'IKLm3w341AM'
req = urllib.request.Request(f'https://www.youtube.com/watch?v={video_id}', headers=headers)
resp = urllib.request.urlopen(req, timeout=30)
html = resp.read().decode('utf-8')

m = re.search(r'"captionTracks":(\[.*?\])', html)
if not m:
    print(f'No captionTracks, html len: {len(html)}')
    sys.exit(1)

tracks = json.loads(m.group(1))
print(f'Found {len(tracks)} tracks: {[(t["languageCode"], t.get("kind","")) for t in tracks]}')

url = tracks[0]['baseUrl']
req2 = urllib.request.Request(url, headers=headers)
resp2 = urllib.request.urlopen(req2, timeout=15)
xml_text = resp2.read().decode('utf-8')
print(f'Caption response len: {len(xml_text)}')

if not xml_text:
    print('Empty - trying with &fmt=srv3')
    req3 = urllib.request.Request(url + '&fmt=srv3', headers=headers)
    resp3 = urllib.request.urlopen(req3, timeout=15)
    xml_text = resp3.read().decode('utf-8')
    print(f'srv3 response len: {len(xml_text)}')

if xml_text:
    root = ET.fromstring(xml_text)
    texts = [elem.text or '' for elem in root.iter('text')]
    full = ' '.join(t.strip() for t in texts if t.strip())
    print(f'Text len: {len(full)}')
    print(f'Preview: {full[:200]}')
    outpath = r'C:\Users\gajie\.openclaw\agents\dev\projects\podcast-reader\transcripts\IKLm3w341AM.txt'
    with open(outpath, 'w', encoding='utf-8') as f:
        f.write(full)
    print('SAVED')
else:
    print('All attempts returned empty')
