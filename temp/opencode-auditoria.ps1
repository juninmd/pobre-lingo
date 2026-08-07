# 5 agentes opencode auditando todas as páginas do site.
# Cada agente recebe um grupo de rotas, roda o auditor headless em cada uma
# (desktop + mobile), lê o código-fonte correspondente e relata defeitos.

param([string]$Alvo = "https://pobrelingo.netlify.app")

$raiz = "D:\Solutions\pessoal\pobre-lingo"
$saida = Join-Path $raiz "temp\auditoria"
New-Item -ItemType Directory -Force -Path $saida | Out-Null

$grupos = @(
    @{ nome = "1-nucleo"; foco = "painel, revisao espacada, conquistas, configuracoes e rota inexistente"
       rotas = @("/", "/review", "/achievements", "/settings", "/rota-inexistente-404", "/proficiency") },
    @{ nome = "2-referencia"; foco = "conteudo de referencia: dicionario, caderninho e regras de gramatica"
       rotas = @("/dictionary", "/notebook", "/rules", "/rules/tempos-verbais", "/curriculum", "/progress") },
    @{ nome = "3-exercicios-a"; foco = "exercicios de escrita e leitura"
       rotas = @("/exercises/sentence-ordering", "/exercises/sentence-identification", "/exercises/find-incorrect-words", "/exercises/news-comprehension") },
    @{ nome = "4-exercicios-b"; foco = "exercicios interativos com audio e dialogo"
       rotas = @("/exercises/listening", "/exercises/conversation", "/exercises/matching-pairs", "/arcade") },
    @{ nome = "5-jogos"; foco = "os oito jogos do arcade"
       rotas = @("/games/speed-match", "/games/word-scramble", "/games/flashcards", "/games/word-search", "/games/memory-match", "/games/hangman", "/games/sentence-rush", "/games/bubble-pop") }
)

$jobs = @()
foreach ($g in $grupos) {
    $listaRotas = ($g.rotas | ForEach-Object { "  node scripts/audit-page.mjs `"$_`" $Alvo" }) -join "`n"

    $prompt = @"
Voce e um QA sênior auditando o PobreLingo (plataforma de ingles) em $Alvo.
Seu grupo: $($g.foco).

PASSO 1 - rode o auditor headless para CADA rota, a partir de ${raiz}
$listaRotas

O auditor abre a pagina em desktop e mobile e devolve JSON com problemas
(erro-js, pagina-vazia, interativo-coberto, overflow-horizontal, a11y).
Ele sai com codigo 1 quando ha problema de severidade alta - isso e esperado,
nao e falha do comando. Leia o JSON.

PASSO 2 - para cada problema encontrado, abra o codigo-fonte da pagina em
src/pages ou src/components e confirme a causa. Ignore ruido de terceiros.

PASSO 3 - responda APENAS com uma lista de achados neste formato, um por linha:
ROTA | SEVERIDADE(alta/media/baixa) | ARQUIVO:LINHA | PROBLEMA | CAUSA PROVAVEL
Se uma rota estiver limpa, escreva: ROTA | OK
Seja concreto e nao invente: so relate o que o auditor mostrou ou o que voce
confirmou lendo o codigo.

NAO edite, crie ou apague nenhum arquivo do repositorio.
"@

    $jobs += Start-Job -Name $g.nome -ScriptBlock {
        param($p, $raiz, $nome, $saida)
        Set-Location $raiz
        $r = & opencode run $p 2>&1 | Out-String
        Set-Content -Path (Join-Path $saida "$nome.txt") -Value $r
    } -ArgumentList $prompt, $raiz, $g.nome, $saida
}

$jobs | Wait-Job | Out-Null
$jobs | Remove-Job -Force
Write-Output "auditorias concluidas: $((Get-ChildItem $saida -Filter *.txt).Count)/5"
