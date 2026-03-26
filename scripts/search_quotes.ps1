$text = [System.IO.File]::ReadAllText("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$keywords = @(
  "known.*many.*of you.*decade",
  "strategy was.*condition.*knew they",
  "small group.*people.*making things work",
  "consensus.*herd behavior",
  "physicists.*arrogant",
  "sounded.*crazy",
  "went to OpenAI.*nonprofit",
  "underpromise.*overdeliver",
  "constitution.*sacred",
  "three or four iterations",
  "people.*nice.*important",
  "some parts.*creating harm",
  "neural net.*beautiful",
  "bookstore.*ten years",
  "Chris Olah.*Nobel",
  "done a lot.*safety"
)
foreach ($kw in $keywords) {
  $match = [regex]::Match($text, "(.{0,30})($kw)(.{0,100})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    $snippet = $match.Value
    if ($snippet.Length -gt 150) { $snippet = $snippet.Substring(0, 150) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  } else {
    Write-Host "MISS  [$kw]`n"
  }
}
