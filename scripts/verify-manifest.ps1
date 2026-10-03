$ErrorActionPreference = "Continue"
$src = Get-Content -Raw -LiteralPath "src\lib\images.ts"

$pexels = [regex]::Matches($src, 'p\("(\d+)"\)') | ForEach-Object { $_.Groups[1].Value }
$unspl  = [regex]::Matches($src, 'u\("(photo-[0-9a-z\-]+)"\)') | ForEach-Object { $_.Groups[1].Value }

Write-Host "pexels keys: $($pexels.Count)  unique: $(($pexels | Sort-Object -Unique).Count)"
$dupP = $pexels | Group-Object | Where-Object Count -gt 1
if ($dupP) { Write-Host "DUP PEXELS: $($dupP.Name -join ', ')" }

Write-Host "unsplash keys: $($unspl.Count)  unique: $(($unspl | Sort-Object -Unique).Count)"
$dupU = $unspl | Group-Object | Where-Object Count -gt 1
if ($dupU) { Write-Host "DUP UNSPLASH: $($dupU.Name -join ', ')" }

$bad = 0
foreach ($id in $pexels) {
  $code = & curl.exe -s -o NUL -w "%{http_code}" --max-time 20 "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?w=200"
  if ($code -ne "200") { Write-Host "DEAD pexels $code $id"; $bad++ }
}
foreach ($id in $unspl) {
  $code = & curl.exe -s -o NUL -w "%{http_code}" --max-time 20 "https://images.unsplash.com/$id`?w=200"
  if ($code -ne "200") { Write-Host "DEAD unsplash $code $id"; $bad++ }
}
Write-Host "total keys: $($pexels.Count + $unspl.Count)   dead: $bad"