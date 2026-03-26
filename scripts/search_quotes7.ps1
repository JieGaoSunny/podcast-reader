$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
$keywords = @(
  "people.*?here.*?nice",
  "nice here",
  "are nice",
  "Daniela.*?promise",
  "Daniela.*?lesson",
  "early lesson",
  "simple thing"
)
foreach ($kw in $keywords) {
  $matches = [regex]::Matches($text, "(.{0,50})($kw)(.{0,200})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  foreach ($m in $matches) {
    $snippet = $m.Value
    if ($snippet.Length -gt 280) { $snippet = $snippet.Substring(0, 280) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  }
  if ($matches.Count -eq 0) { Write-Host "MISS  [$kw]`n" }
}
