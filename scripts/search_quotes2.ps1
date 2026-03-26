$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
$keywords = @(
  "known.*?many of you.*?decade",
  "strategy was.*?condition.*?knew they",
  "small group.*?people.*?making things work",
  "herd behavior",
  "physicists.*?arrogant",
  "sounded.*?crazy",
  "OpenAI.*?nonprofit",
  "underpromise.*?overdeliver",
  "constitution.*?sacred",
  "three or four iterations",
  "people.*?nice.*?important",
  "creating harm",
  "neural net.*?beautiful",
  "bookstore.*?ten years",
  "Chris Olah.*?Nobel",
  "done a lot.*?safety",
  "we were the small",
  "looks like consensus",
  "I went to OpenAI because",
  "sacred document",
  "I've known.*?decade",
  "imaginary biology",
  "artificial biology",
  "imagine.*?walk into"
)
foreach ($kw in $keywords) {
  $match = [regex]::Match($text, "(.{0,50})($kw)(.{0,150})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    $snippet = $match.Value
    if ($snippet.Length -gt 220) { $snippet = $snippet.Substring(0, 220) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  } else {
    Write-Host "MISS  [$kw]`n"
  }
}
