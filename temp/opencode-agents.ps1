# Dispara um agente opencode por persona. Cada agente executa sua própria
# persona no Playwright (browser real contra produção) e relata o veredito.
# Rodam em paralelo, em lotes, para não estourar a memória da máquina.

param(
    [int]$Lote = 5,
    [string]$Alvo = "https://pobrelingo.netlify.app"
)

$raiz = "D:\Solutions\pessoal\pobre-lingo"
$saida = Join-Path $raiz "temp\agent-reports"
New-Item -ItemType Directory -Force -Path $saida | Out-Null

$jobs = @()
for ($i = 1; $i -le 20; $i++) {
    $prompt = @"
Voce e o QA responsavel pelo Usuario $i na homologacao do PobreLingo em $Alvo.
Execute EXATAMENTE este comando a partir de $raiz e nada mais:

  npx playwright test tests-e2e/homologacao.spec.ts --project=chromium --reporter=line -g "Usuario ${i}:"

O ambiente ja tem SMOKE_BASE_URL=$Alvo definida.
Depois responda em no maximo 2 linhas, no formato:
USUARIO $i | PASSOU ou FALHOU | <o que a jornada cobriu ou qual foi o erro>
Nao edite, crie ou apague nenhum arquivo do repositorio.
"@

    $jobs += Start-Job -ScriptBlock {
        param($p, $raiz, $alvo, $idx, $saida)
        Set-Location $raiz
        $env:SMOKE_BASE_URL = $alvo
        $r = & opencode run $p 2>&1 | Out-String
        Set-Content -Path (Join-Path $saida "usuario-$idx.txt") -Value $r
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

Write-Output "relatorios gerados: $((Get-ChildItem $saida -Filter *.txt).Count)"
