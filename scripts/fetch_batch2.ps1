$apiKey = 'sd_76fbe85406abef50b91b7dfe86b9fb95'
$ids = @('NnVW9epLlTM','uB1-FxAEH9A','GRoU1T4E9rQ','Xmeo7PJ00k0','cdiD-9MMpb0')
$headers = @{'x-api-key'=$apiKey}

foreach ($id in $ids) {
    $txtPath = "projects/podcast-reader/transcripts/$id.txt"
    if (Test-Path $txtPath) {
        Write-Host "SKIP $id (exists)"
        continue
    }
    foreach ($lang in @('en','zh-Hans')) {
        try {
            $resp = Invoke-RestMethod -Uri "https://api.supadata.ai/v1/youtube/transcript?url=https://www.youtube.com/watch?v=$id&lang=$lang" -Headers $headers -ErrorAction Stop
            if ($resp.content) {
                $text = ($resp.content | ForEach-Object { $_.text }) -join "`n"
                [System.IO.File]::WriteAllText((Resolve-Path "." | Join-Path -ChildPath $txtPath), $text, [System.Text.Encoding]::UTF8)
                $size = (Get-Item $txtPath).Length
                Write-Host "OK $id lang=$lang size=$([math]::Round($size/1024))KB"
                # Also save json
                $jsonPath = "projects/podcast-reader/transcripts/$id.json"
                $resp.content | ConvertTo-Json -Depth 5 | Out-File $jsonPath -Encoding utf8
                break
            } else {
                Write-Host "EMPTY $id lang=$lang"
            }
        } catch {
            Write-Host "FAIL $id lang=$lang : $($_.Exception.Message)"
        }
    }
}
