$videos = @('GRoU1T4E9rQ','Xmeo7PJ00k0','cdiD-9MMpb0','NnVW9epLlTM')
foreach ($vid in $videos) {
    try {
        $url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json"
        $r = Invoke-RestMethod $url
        Write-Host "$vid : $($r.title) | $($r.author_name)"
    } catch {
        Write-Host "$vid : FAILED"
    }
}
