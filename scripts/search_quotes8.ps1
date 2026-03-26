$lines = [System.IO.File]::ReadAllLines("projects/podcast-reader/transcripts/om2lIWXLLN4.txt", [System.Text.Encoding]::UTF8)
$text = ($lines -join " ") -replace '\s+', ' '
# search around "low ego" for the "nice" quote
$match = [regex]::Match($text, "(.{300})(low ego)(.{300})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Write-Host $match.Value
Write-Host "`n---`n"
# search around "holy document" for the constitution/sacred quote  
$match2 = [regex]::Match($text, "(.{200})(holy document)(.{400})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Write-Host $match2.Value
Write-Host "`n---`n"
# search Daniela underpromise
$match3 = [regex]::Match($text, "(.{200})(Daniela)(.{300})", [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Write-Host $match3.Value
