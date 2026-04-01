import urllib.request, json, re, sys

# Use a different approach - fetch the page as a GoogleBot which sometimes gets different treatment
headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Accept-Language': 'en-US,en;q=0.9'
}

video_id = 'IKLm3w341AM'
req = urllib.request.Request(f'https://www.youtube.com/watch?v={video_id}', headers=headers)
resp = urllib.request.urlopen(req, timeout=30)
html = resp.read().decode('utf-8')

m = re.search(r'"captionTracks":(\[.*?\])', html)
if m:
    print('Found captionTracks!')
    tracks = json.loads(m.group(1))
    print(f'Tracks: {len(tracks)}')
else:
    print(f'No captionTracks as Googlebot either, len: {len(html)}')
    # Check if we got a different page
    if 'captionTracks' in html:
        idx = html.index('captionTracks')
        print(f'captionTracks found at {idx}: {html[idx:idx+200]}')
    else:
        # Check what we got
        title_m = re.search(r'<title>(.*?)</title>', html)
        print(f'Title: {title_m.group(1) if title_m else "none"}')
        print(f'Has playerResponse: {"ytInitialPlayerResponse" in html}')
        if 'ytInitialPlayerResponse' in html:
            pr_m = re.search(r'ytInitialPlayerResponse\s*=\s*(\{.*?\});\s*(?:var|</script>)', html, re.DOTALL)
            if pr_m:
                try:
                    pr = json.loads(pr_m.group(1))
                    print(f'Player response keys: {list(pr.keys())}')
                    if 'captions' in pr:
                        print('Has captions!')
                except:
                    print('Failed to parse player response')
