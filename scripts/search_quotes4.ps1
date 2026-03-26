$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
$keywords = @(
  "my strategy",
  "full-time AI reporter",
  "making the biggest",
  "you're making a huge",
  "consensus.*?flipped",
  "ignore the noise",
  "50.*?right.*?better",
  "promise.*?deliver",
  "every American",
  "people say.*?nice",
  "low ego",
  "different departments",
  "same theory",
  "different functions"
)
foreach ($kw in $keywords) {
  $match = [regex]::Match($text, "(.{0,50})($kw)(.{0,250})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    $snippet = $match.Value
    if ($snippet.Length -gt 320) { $snippet = $snippet.Substring(0, 320) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  } else {
    Write-Host "MISS  [$kw]`n"
  }
}
