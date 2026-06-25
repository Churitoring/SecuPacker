# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <b>Português</b> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Download_Plugin-4CAF50?style=for-the-badge" alt="Download Plugin" />
</a>

Um plugin de empacotamento de segurança de recursos para RPG Maker MV / MZ.

> **Apenas para Windows.** Não funciona em macOS ou Linux.

---

## Índice
<img src="../image/example.png" alt="Example Image" width="300" align="right" />

1. [Como usar](#1-como-usar)
2. [Requisitos](#2-requisitos)
3. [Referência de parâmetros](#3-referência-de-parâmetros)
   - [3-1. Configurações gerais de empacotamento](#3-1-configurações-gerais-de-empacotamento)
   - [3-2. Configurações de empacotamento de arquivos](#3-2-configurações-de-empacotamento-de-arquivos)
   - [3-3. Configurações de segurança](#3-3-configurações-de-segurança)
   - [3-4. Configurações adicionais](#3-4-configurações-adicionais)
   - [3-5. Configurações de atualização automática](#3-5-configurações-de-atualização-automática)
4. [API JavaScript](#4-api-javascript)
5. [Comandos de plugin](#5-comandos-de-plugin)
6. [Observações](#6-observações)

---

## 1. Como usar

O fluxo básico de empacotamento é o seguinte.

**Passo 1 — Instalar o plugin**

Coloque `Churitoring_SecuPacker.js` na pasta `js/plugins/` do seu projeto e ative-o no Gerenciador de plugins do RPG Maker. Configure os parâmetros conforme desejar nesta etapa.

**Passo 2 — Criar a pasta de distribuição**

No RPG Maker, vá em **Arquivo > Deployment** e faça o deploy para a plataforma **Windows**.

**Passo 3 — Executar o empacotamento**

Execute o `.exe` do jogo dentro da pasta de deploy. Uma tela de progresso de empacotamento aparecerá automaticamente. Não feche a janela durante esse processo. Mesmo que você force o encerramento no meio, o jogo provavelmente se recuperará na próxima inicialização — mas o melhor é simplesmente aguardar.

**Passo 4 — Distribuir**

Após a conclusão do empacotamento, o jogo será reiniciado automaticamente. Você pode então distribuir esta pasta de deploy diretamente para seus jogadores.

Observação: Se `Player Auto Update` estiver definido como `true`, o jogo será fechado (em vez de reiniciado) após um diálogo de confirmação. Não reinicie o jogo nesse momento — fazer isso acionará uma tentativa de atualização usando a versão antiga. Em vez disso, envie os arquivos empacotados para o GitHub Releases primeiro.

---

## 2. Requisitos

- RPG Maker MV 1.6.0 ou superior, ou RPG Maker MZ 1.0.0 ou superior
- NW.js 0.28.1 ou superior

---

## 3. Referência de parâmetros

### 3-1. Configurações gerais de empacotamento

**Packer Auto Update**

Antes do empacotamento começar, o plugin buscará a versão mais recente no GitHub e sobrescreverá `js/plugins/Churitoring_SecuPacker.js`. Se você fez modificações diretas neste arquivo, defina isso como `false` — caso contrário, suas alterações serão revertidas toda vez que você empacotar. Se você usa o plugin como está, sem modificações, deixe-o como `true`.

**Game Binary Name**

O nome do arquivo de saída empacotado. O padrão é `game.bin`, mas você pode renomeá-lo aqui. Apenas um nome de arquivo é aceito — caminhos não são permitidos. É recomendável alterá-lo para algo menos previsível. A extensão do arquivo também pode ser modificada.

**Track Runtime Writes**

Durante o teste, se outros plugins criarem ou modificarem arquivos, esses caminhos de arquivo serão registrados em `data/SecuPacker_RuntimeWrites.txt`. Durante o empacotamento, os arquivos listados ali são excluídos do pacote e mantidos no disco como estão.

Se você usa plugins que geram automaticamente arquivos como arquivos de configuração, ative esta opção. É recomendável deixar o valor padrão `true` a menos que você tenha um motivo específico para desativá-lo.

Observação: Os arquivos rastreados por esta opção são excluídos do Player Auto Update e da proteção do SecuPacker.

**Strip Read-Only Attributes**

Durante a etapa final de limpeza do empacotamento, os arquivos de recursos originais são excluídos. Se algum arquivo tiver o atributo somente leitura (R) definido, a exclusão falhará. Se você gerencia seu projeto com Git ou usa ferramentas que automaticamente marcam arquivos como somente leitura, definir isso como `true` executará `attrib -R` antes da exclusão para evitar problemas. É recomendável deixar o valor padrão `true` a menos que você tenha um motivo específico para desativá-lo.

---

### 3-2. Configurações de empacotamento de arquivos

**File Split**

Em vez de empacotar todos os recursos em um único arquivo, isso permite que os recursos sejam distribuídos em vários arquivos empacotados. Útil para separar recursos de DLC do jogo base, ou para dividir projetos grandes em vários arquivos. Definir isso como `false` também ignorará todas as entradas de File Split List abaixo.

**File Split List**

Define regras sobre quais arquivos/pastas vão para qual arquivo empacotado. Cada entrada tem duas configurações:

- **Split Bin File**: O nome do arquivo para este grupo de arquivos. Deve diferir do nome do pacote principal definido em Game Binary Name. Ex.: `dlc.bin`, `bgm.bin`
- **Split Path Patterns**: Uma lista de caminhos a incluir neste arquivo. Especificar uma pasta como `audio/bgm` incluirá todos os arquivos dentro dela recursivamente. Você também pode especificar um único arquivo como `audio/se/boss.ogg`.

**Packed File Exclusions**

Especifica arquivos ou pastas a excluir do empacotamento e manter no disco. Os caminhos são relativos à raiz do projeto e devem usar barras normais (`/`). Ex.: `img/system/Loading.png`, `audio/bgm`

Adicione aqui quaisquer arquivos que precisem ser lidos diretamente do disco em tempo de execução. Os arquivos nesta lista são excluídos do empacotamento e não serão excluídos.

Observação: Os arquivos nesta lista são excluídos do Player Auto Update e da proteção do SecuPacker.

---

### 3-3. Configurações de segurança

**Block Launch Args Whitelist**

Se qualquer string de consulta de URL ou argumento de inicialização do NW.js for detectado na inicialização que não esteja nesta lista, o jogo será encerrado imediatamente. O padrão é uma lista vazia, o que significa que todos os argumentos externos são bloqueados por padrão. Adicione a esta lista quaisquer argumentos que devam ser permitidos.

Esta verificação se aplica apenas às versões de distribuição empacotadas e não é aplicada durante o teste de desenvolvimento.

**Early Blob Resolve**

Antecipa o momento em que os caminhos de arquivo são convertidos para URLs Blob (dentro do arquivo empacotado) para a etapa `Bitmap.load`. Para a maioria dos casos de uso, deixe como `true`.

No entanto, se você estiver usando um plugin que intercepta diretamente `fs.readFile` ou `XMLHttpRequest` para lidar com seu próprio processo de descriptografia, defina como `false` se ocorrerem conflitos.

Definir como `false` pode reduzir a compatibilidade.

**Enable Cheat Detection**

Verifica periodicamente processos em segundo plano em busca de ferramentas de hacking.

**Excluded Binary Hashes**

Os nomes (ou nomes parciais) de arquivos binários a serem excluídos ao calcular o hash da impressão digital do ambiente.

O motivo pelo qual `ffmpeg` está incluído por padrão se deve à licença do FFmpeg (LGPL). A LGPL exige que os usuários possam substituir o binário por sua própria versão. Incluir o FFmpeg no hash faria com que o hash mudasse após a substituição, impedindo o jogo de iniciar — por isso ele é excluído por padrão para cumprir com a licença.

Deixe o valor padrão a menos que você tenha um motivo específico para alterá-lo.

Exemplo: `ffmpeg.dll` (exclui apenas ffmpeg.dll)  
Exemplo: `ffmpeg` (exclui tanto ffmpeg.dll quanto ffmpegsumo.dll)

**Hash Exe Files**

Quando definido como `true`, o arquivo `.exe` do jogo também é incluído no hash da impressão digital do ambiente. Isso impede que o arquivo empacotado seja iniciado com um `.exe` diferente. É importante que qualquer alteração no `.exe` — como substituição do ícone ou modificação do manifesto — seja feita **antes** do empacotamento. Modificar o `.exe` após o empacotamento alterará o hash e impedirá o jogo de iniciar.

---

### 3-4. Configurações adicionais

**Block Window Resize**

Quando definido como `true`, os jogadores não podem redimensionar ou maximizar a janela do jogo. O botão de maximizar pode desaparecer ou parar de funcionar.

**Block F2 / F4 / F5 Key**

Bloqueia a exibição da taxa de quadros (F2), a alternância para tela cheia (F4) e a recarga do jogo (F5), respectivamente. Ative-os se não quiser que os jogadores acessem essas funções em uma versão de distribuição.

---

### 3-5. Configurações de atualização automática

**Player Auto Update**

Quando definido como `true`, o jogo se comunica com o servidor de versões do GitHub na inicialização. Se uma nova versão do arquivo empacotado estiver disponível, ela é automaticamente baixada e substituída. Para usar esta funcionalidade, você também deve configurar `Player Auto Update URL` abaixo.

Quando definido como `true`, o jogo será fechado (em vez de reiniciado) após o empacotamento ser concluído. Não reinicie o jogo nesse momento — fazer isso acionará uma tentativa de atualização usando a versão antiga. Em vez disso, envie os arquivos empacotados para o GitHub Releases primeiro.

Se você precisar verificar se o empacotamento foi bem-sucedido, defina como `false` antes de testar.

**Player Auto Update URL**

A URL do repositório do GitHub de onde as atualizações serão buscadas. Insira no formato `https://github.com/usuario/repositorio`. Repositórios privados não são suportados.

Exemplo: `https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

Se deixado vazio, sempre atualiza a partir da versão mais recente.

Se uma tag for especificada, atualiza a partir da versão mais recente que carregue essa tag. É recomendável criar um único repositório e atribuir tags específicas do jogo às versões dentro dele — dessa forma, a funcionalidade Player Auto Update pode atender a vários jogos a partir de um único repositório.

Exemplo: `SecuPacker`

**Disable On No Internet / Disable On Fail**

Configura o comportamento quando não há conexão com a internet ou o servidor de atualização está inacessível.

Se você quiser que o jogo encerre apenas quando não houver conexão com a internet, mas não queira realmente usar a funcionalidade de atualização, é recomendável definir `Player Auto Update` como `true`, deixar `Player Auto Update URL` em branco, definir `Disable On No Internet` como `true` e `Disable On Fail` como `false`.

- Definir `Disable On No Internet` como `true` exibirá um aviso e encerrará o jogo quando não houver conexão com a internet.
- Definir `Disable On Fail` como `true` encerrará o jogo mesmo que o servidor esteja acessível, mas o arquivo não possa ser obtido.

**Configurações da tela de atualização (PAU Scene \*)**

Configura a interface exibida durante o processo de atualização automática.

*Texto*

- **PAU Scene Update Text**: Texto exibido na área do título enquanto a atualização está sendo baixada. Padrão: `Updating...`
- **PAU Scene Complete Text**: Texto exibido na área do título quando a atualização é concluída com sucesso. Padrão: `Update complete!`
- **PAU Scene Failed Text**: Texto exibido na área do título quando a atualização falha. Padrão: `Update failed`

*Animação*

- **PAU Scene Blink**: Aplica uma animação de opacidade pulsante ao texto do título. Padrão: `true`
- **PAU Scene Blink Speed**: Velocidade do ciclo de piscar. Valores maiores = mais rápido. Com `0.050`, aproximadamente um ciclo a cada 2 segundos a 60fps. Intervalo: `0.001` ~ `1.000`. Padrão: `0.050`

*Progresso*

- **PAU Scene Show Progress**: Exibe o progresso do download (%) e o tamanho (KB) na área de subtexto durante a atualização. Padrão: `true`

*Fundo*

- **PAU Scene BG Type**: Seleciona o tipo de fundo. `color` (cor sólida) / `image` (imagem) / `video`. Padrão: `color`
- **PAU Scene BG Color**: Código de cor CSS para o fundo sólido quando o tipo é `color`. Padrão: `#000000`
- **PAU Scene BG Image**: Arquivo de imagem de fundo quando o tipo é `image`. Selecione na pasta `img/`.
- **PAU Scene BG Video**: Caminho do arquivo de vídeo quando o tipo é `video`. Insira como string. Ex.: `movies/bg.webm`
- **PAU Scene BG Fit**: Como ajustar a imagem ou vídeo quando a proporção não corresponde à tela. `cover` (recortar para preencher a tela) / `contain` (letterbox, manter proporção) / `fill` (esticar para preencher a tela). Padrão: `cover`
- **PAU Scene Video Loop**: Reproduz o vídeo de fundo em loop. Se `false`, o vídeo para no último quadro. Padrão: `true`
- **PAU Scene Video Volume**: Volume de áudio do vídeo de fundo. `0` (mudo) ~ `100`. Padrão: `100`

*Música de fundo*

- **PAU Scene BG Music**: Arquivo de música a ser reproduzido na tela de atualização. Selecione na pasta `audio/`. Pode ser usado junto com um vídeo de fundo.
- **PAU Scene BG Music Volume**: Volume da música de fundo. `0` (mudo) ~ `100`. Padrão: `80`
- **PAU Scene BG Music Loop**: Reproduz a música de fundo em loop. Se `false`, toca uma vez e para. Padrão: `true`

*Estilo do texto do título*

- **PAU Scene Title X Offset**: Deslocamento horizontal em pixels do texto do título a partir do centro da tela. `0` = centralizado. Padrão: `0`
- **PAU Scene Title Y Offset**: Deslocamento vertical em pixels do texto do título a partir do centro da tela. Valores negativos movem para cima. Padrão: `-30`
- **PAU Scene Title Size**: Tamanho da fonte do texto do título em pixels. Padrão: `36`
- **PAU Scene Title Color**: Cor do texto do título em formato CSS hex. Padrão: `#ffffff`
- **PAU Scene Title Outline Width**: Largura do contorno do texto do título em pixels. `0` = sem contorno. Padrão: `0`
- **PAU Scene Title Outline Color**: Cor do contorno do texto do título. Suporta CSS hex ou formato `rgba()`. Padrão: `rgba(0,0,0,0.5)`

*Estilo do subtexto*

O subtexto é a linha secundária abaixo do título que exibe o progresso ou mensagens de status.

- **PAU Scene Sub X Offset**: Deslocamento horizontal em pixels do subtexto a partir do centro da tela. Padrão: `0`
- **PAU Scene Sub Y Offset**: Deslocamento vertical em pixels do subtexto a partir do centro da tela. Padrão: `30`
- **PAU Scene Sub Size**: Tamanho da fonte do subtexto em pixels. Padrão: `18`
- **PAU Scene Sub Color**: Cor do subtexto em formato CSS hex. Padrão: `#888888`
- **PAU Scene Sub Outline Width**: Largura do contorno do subtexto em pixels. `0` = sem contorno. Padrão: `0`
- **PAU Scene Sub Outline Color**: Cor do contorno do subtexto. Suporta CSS hex ou formato `rgba()`. Padrão: `rgba(0,0,0,0.5)`

---

## 4. API JavaScript

Essas APIs podem ser chamadas diretamente de outros plugins ou chamadas de script, como alternativa aos Comandos de Plugin.

Chamar a API diretamente cria uma dependência no SecuPacker. Para evitar efeitos colaterais quando o plugin estiver desativado, sempre verifique a existência do objeto antes de chamar.

**`SecuPacker.getVersion()`**

Retorna a string de versão do SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Retorna `true` se o jogo está sendo executado em modo empacotado, `false` caso contrário. Sempre retorna `false` durante o teste de desenvolvimento, portanto, pode ser usado para ramificar o comportamento com base em se o jogo é uma versão de distribuição.

```javascript
if (SecuPacker.isPacked()) {
    // Código a ser executado apenas em versões de distribuição
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Retorna `true` se o arquivo empacotado dividido especificado existe e está acessível. Útil para verificar se um arquivo DLC está instalado.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true ou false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Retorna `true` se Player Auto Update está ativado e uma URL está configurada.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true ou false
```

---

## 5. Comandos de plugin

Comandos de plugin disponíveis no MZ.

**GetVersion** — Armazena a string de versão do SecuPacker em uma variável do jogo.

**IsPacked** — Armazena `true` se o jogo está empacotado, `false` caso contrário, em uma variável do jogo. Use para ramificar o comportamento no jogo com base em se a versão é uma versão de distribuição.

**IsSplitAvailable** — Verifica se o arquivo empacotado dividido especificado existe e está acessível, e armazena o resultado em uma variável do jogo. Útil para verificar se um arquivo DLC está presente.

**IsPlayerAutoUpdateReady** — Armazena `true` em uma variável do jogo se Player Auto Update está ativado e uma URL está configurada.

---

## 6. Observações

- **Proteção de arquivos do projeto**: Se um arquivo `*.rpgproject` ou `*.rmmzproject` for encontrado dentro da pasta de deploy, o plugin o tratará como um diretório de desenvolvimento e abortará o empacotamento. Sempre execute o empacotador a partir da pasta de deploy, não da pasta do projeto de desenvolvimento.
- **Aviso de privacidade**: Nenhuma segurança é absoluta. Por mais seguro que seja um sistema, alguém pode eventualmente encontrar uma forma de superá-lo — portanto, nunca inclua informações pessoais ou sensíveis como IDs, senhas ou chaves de API nos arquivos do seu jogo.
- **Aviso de direitos autorais**: Não remova `credits.html`. Distribuí-lo sem ele pode constituir uma violação de direitos autorais.
- **Tela preta após o empacotamento**: Se o jogo funcionava normalmente durante o teste antes do empacotamento, mas trava em uma tela preta com uma mensagem de erro após o empacotamento, isso geralmente é causado por um erro em um script registrado em `index.html` (MV) ou `main.js` (MZ). Se você adicionou scripts personalizados ou modificou algum dos scripts registrados, esses são os candidatos mais prováveis.
