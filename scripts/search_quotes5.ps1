$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
$keywords = @(
  "flip overnight",
  "flipped.*?overnight",
  "that's our bet",
  "ignore.*?noise",
  "consensus.*?one day",
  "herd.*?sophisticat",
  "masquerad",
  "under.promise",
  "promise less",
  "Jack.*?left.*?journal",
  "biggest.*?mistake.*?life",
  "mistake of your",
  "really not joking",
  "holy document",
  "people here are nice"
)
foreach ($kw in $keywords) {
  $match = [regex]::Match($text, "(.{0,80})($kw)(.{0,250})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
  if ($match.Success) {
    $snippet = $match.Value
    if ($snippet.Length -gt 350) { $snippet = $snippet.Substring(0, 350) }
    Write-Host "FOUND [$kw]:`n  $snippet`n"
  } else {
    Write-Host "MISS  [$kw]`n"
  }
}
