$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
$keywords = @(
  "condition.*?double my salary",
  "biggest mistake",
  "we were kind of the group",
  "looks like mature.*?sophisticat",
  "50%.*?chance.*?right.*?100%",
  "I went to OpenAI",
  "under-promise.*?over-deliver",
  "American.*?sacred",
  "three.*?four.*?iteration",
  "some departments.*?harm",
  "textbook.*?interpretability",
  "scaling laws.*?work",
  "GPT-2.*?GPT-3",
  "I didn't want to leave",
  "you're making the biggest"
)
foreach ($kw in $keywords) {
  $match = [regex]::Match($text, "(.{0,50})($kw)(.{0,200})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    $snippet = $match.Value
    if ($snippet.Length -gt 280) { $snippet = $snippet.Substring(0, 280) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  } else {
    Write-Host "MISS  [$kw]`n"
  }
}
