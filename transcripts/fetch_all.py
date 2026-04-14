import sys, os
from youtube_transcript_api import YouTubeTranscriptApi

ids = ["xCd9ykretlg","eqPljh_9C9Y","GDeEATJcbJo","M6MzKYP9XeI","D-LrZc193uU","SRluyg698u4"]
out_dir = os.path.dirname(os.path.abspath(__file__))
api = YouTubeTranscriptApi()

for vid in ids:
    print(f"=== {vid} ===")
    try:
        t = api.fetch(vid, languages=['en','zh-Hans','zh-Hant'])
        text = ' '.join([s.text for s in t])
        print(f"Length: {len(text)}")
        with open(os.path.join(out_dir, f"{vid}.txt"), 'w', encoding='utf-8') as f:
            f.write(text)
        print("OK")
    except Exception as e:
        print(f"ERROR: {e}")
    print()
