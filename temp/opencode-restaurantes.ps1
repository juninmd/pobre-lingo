# Dispara um agente opencode por mesa do restaurante. Cada agente executa sua
# própria persona de cliente no Playwright (browser real contra produção).

param(
    [int]$Lote = 4,
    [string]$Alvo = "https://pobrelingo.netlify.app"
)

$raiz = "D:\Solutions\pessoal\pobre-lingo"
$saida = Join-Path $raiz "temp\restaurante-reports"
New-Item -ItemType Directory -Force -Path $saida | Out-Null

$jobs = @()
for ($i = 1; $i -le 10; $i++) {
    $prompt = @"
Voce e o QA responsavel pela Mesa $i na homologacao do restaurante do PobreLingo em $Alvo.
A simulacao testada e o modulo de pedir comida (ordering-food).
Execute EXATAMENTE este comando a partir de $raiz e nada mais:

  npx playwright test tests-e2e/restaurante.spec.ts --project=chromium --reporter=line -g "Restaurante mesa ${i}:"

O ambiente ja tem SMOKE_BASE_URL=$Alvo definida.
Depois responda em no maximo 2 linhas, no formato:
MESA $i | PASSOU ou FALHOU | <o que o cliente cobriu ou qual foi o erro>
Nao edite, crie ou apague nenhum arquivo do repositorio.
"@

    $jobs += Start-Job -ScriptBlock {
        param($p, $raiz, $alvo, $idx, $saida)
        Set-Location $raiz
        $env:SMOKE_BASE_URL = $alvo
        $r = & opencode run $p 2>&1 | Out-String
        Set-Content -Path (Join-Path $saida "mesa-$idx.txt") -Value $r
    } -ArgumentList $prompt, $raiz, $Alvo, $i, $saida

    if ($jobs.Count -ge $Lote) {
        $jobs | Wait-Job | Out-Null
        $jobs | Remove-Job -Force
        $jobs = @()
    }
}

if ($jobs.Count -gt 0) {
    $jobs | Wait-Job | Out-Null
    $jobs | Remove-Job -Force
}

Write-Output "relatorios de mesa gerados: $((Get-ChildItem $saida -Filter *.txt).Count)"
