# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <b>Italiano</b> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Download_Plugin-4CAF50?style=for-the-badge" alt="Scarica Plugin" />
</a>

Plugin di sicurezza per il confezionamento di risorse per RPG Maker MV / MZ.

> **Solo Windows.** Non funziona su macOS o Linux.

---

## Indice

1. [Come si usa](#1-come-si-usa)
2. [Requisiti](#2-requisiti)
3. [Riferimento parametri](#3-riferimento-parametri)
   - [3-1. Impostazioni generali di compressione](#3-1-impostazioni-generali-di-compressione)
   - [3-2. Impostazioni compressione file](#3-2-impostazioni-compressione-file)
   - [3-3. Impostazioni di sicurezza](#3-3-impostazioni-di-sicurezza)
   - [3-4. Impostazioni aggiuntive](#3-4-impostazioni-aggiuntive)
   - [3-5. Impostazioni aggiornamento automatico](#3-5-impostazioni-aggiornamento-automatico)
4. [API JavaScript](#4-api-javascript)
5. [Comandi plugin](#5-comandi-plugin)
6. [Note](#6-note)

---

## 1. Come si usa

Il flusso base di compressione è il seguente.

**Fase 1 — Installa il Plugin**

Copia `Churitoring_SecuPacker.js` nella cartella `js/plugins/` del tuo progetto e abilitalo nel Gestore Plugin di RPG Maker. Configura i parametri secondo le tue preferenze in questa fase.

**Fase 2 — Crea la Cartella di Distribuzione**

In RPG Maker, vai su **File > Distribuzione** ed esporta per la piattaforma **Windows**.

**Fase 3 — Avvia la Compressione**

Avvia il file `.exe` del gioco nella cartella di distribuzione. Verrà visualizzata automaticamente una schermata di avanzamento. Non chiudere la finestra durante questo processo. Anche se forzi la chiusura a metà, il gioco si recupererà probabilmente al prossimo avvio — ma è meglio aspettare.

**Fase 4 — Distribuzione**

Una volta completata la compressione, il gioco si riavvierà automaticamente. Puoi quindi distribuire questa cartella di distribuzione direttamente ai tuoi giocatori.

Nota: Se `Aggiornamento automatico` è impostato su `true`, il gioco si chiuderà (invece di riavviarsi) dopo una finestra di conferma. Non riavviare il gioco a questo punto — farlo attiverà un tentativo di aggiornamento con la versione vecchia. Carica prima i file compressi su GitHub Releases.

---

## 2. Requisiti

- RPG Maker MV 1.6.0 o versioni successive, oppure RPG Maker MZ 1.0.0 o versioni successive
- NW.js 0.28.1 o versioni successive (consigliato: 0.44.3 o superiore)

---

## 3. Riferimento parametri

### 3-1. Impostazioni generali di compressione

**Aggiornamento automatico Packer**

Prima dell'avvio della compressione, il plugin scaricherà l'ultima versione da GitHub e sovrascriverà `js/plugins/Churitoring_SecuPacker.js`. Se hai apportato modifiche dirette a questo file, devi impostarlo su `false` — altrimenti le tue modifiche verranno ripristinate ogni volta che comprimi. Se stai usando il plugin così com'è senza alcuna modifica, lascialo su `true`.

**Nome file binario del gioco**

Il nome file per il file di output compresso. Il valore predefinito è `game.bin`, ma puoi rinominarlo qui. Viene accettato solo un nome file — i percorsi non sono ammessi. Si consiglia di cambiarlo in qualcosa di meno prevedibile. Anche l'estensione del file può essere cambiata.

**Traccia scritture in esecuzione**

Durante il playtest, se altri plugin creano o modificano file, i percorsi di quei file vengono registrati in `data/SecuPacker_RuntimeWrites.txt`. Durante la compressione, i file elencati vengono esclusi dal pacchetto e lasciati sul disco così come sono.

Se usi plugin che generano automaticamente file come file di configurazione, abilita questa opzione. Si consiglia di lasciare il valore predefinito `true` a meno che tu non abbia un motivo specifico per disabilitarlo.

Nota: I file tracciati da questa opzione sono esclusi dall'Aggiornamento automatico e dalla protezione di SecuPacker.

**Rimuovi attributi di sola lettura**

Durante la fase finale di pulizia della compressione, i file di risorse originali vengono eliminati. Se alcuni file hanno l'attributo di sola lettura (R) impostato, l'eliminazione fallirà. Se gestisci il tuo progetto con Git o usi strumenti che marcano automaticamente i file come sola lettura, impostando questo su `true` verrà eseguito `attrib -R` prima dell'eliminazione per evitare problemi. Si consiglia di lasciare il valore predefinito `true` a meno che tu non abbia un motivo specifico per disabilitarlo.

---

### 3-2. Impostazioni compressione file

**Divisione file**

Invece di comprimere tutte le risorse in un singolo file, questo permette di distribuire le risorse su più file compressi. Utile per separare le risorse DLC dal gioco base, o per dividere progetti di grandi dimensioni in più file. Impostando su `false` verranno ignorate anche tutte le voci dell'Elenco divisione file sottostanti.

**Elenco divisione file**

Definisce le regole per determinare quali file/cartelle finiscono in quale file compresso. Ogni voce ha due impostazioni:

- **File Bin del frammento**: Il nome file per questo gruppo di file. Deve essere diverso dal nome file del pacchetto principale impostato in Nome file binario del gioco. Es.: `dlc.bin`, `bgm.bin`
- **Modelli di percorso del frammento**: Un elenco di percorsi da includere in questo file. Specificare una cartella come `audio/bgm` includerà tutti i file al suo interno in modo ricorsivo. Puoi anche specificare un singolo file come `audio/se/boss.ogg`.

**File esclusi dalla compressione**

Specifica file o cartelle da escludere dalla compressione e lasciare sul disco. I percorsi sono relativi alla radice del progetto e devono usare barre in avanti (`/`). Es.: `img/system/Loading.png`, `audio/bgm`

Aggiungi qui tutti i file che devono essere letti direttamente dal disco durante l'esecuzione. I file in questo elenco sono esclusi dalla compressione e non verranno eliminati.

Nota: I file in questo elenco sono esclusi dall'Aggiornamento automatico e dalla protezione di SecuPacker.

---

### 3-3. Impostazioni di sicurezza

**Whitelist argomenti di avvio**

Se all'avvio viene rilevato un argomento di query URL o NW.js che non è presente in questo elenco, il gioco si chiuderà immediatamente. Il valore predefinito è un elenco vuoto, il che significa che tutti gli argomenti esterni sono bloccati per impostazione predefinita. Aggiungi a questo elenco tutti gli argomenti che devono essere consentiti.

Questo controllo si applica solo alle build di distribuzione compresse e non viene applicato durante il playtest di sviluppo.

**Risoluzione Blob anticipata**

Anticipa il momento in cui i percorsi dei file vengono convertiti in URL Blob (all'interno del file compresso) alla fase `Bitmap.load`. Per la maggior parte dei casi d'uso, lascialo su `true`.

Tuttavia, se stai usando un plugin che intercetta direttamente `fs.readFile` o `XMLHttpRequest` per gestire la propria decrittazione, imposta su `false` se si verificano conflitti.

Impostare su `false` potrebbe ridurre la compatibilità.

**Abilita rilevamento trucchi**

Scansiona periodicamente gli strumenti di hacking in esecuzione come processi in background.

**Hash binari esclusi**

I nomi (o nomi parziali) dei file binari da escludere durante il calcolo dell'hash dell'impronta dell'ambiente.

Il motivo per cui `ffmpeg` è incluso per impostazione predefinita è dovuto alla licenza di FFmpeg (LGPL). L'LGPL richiede che gli utenti possano sostituire il binario con la propria versione. Includere FFmpeg nell'hash causerebbe la modifica dell'hash alla sostituzione, impedendo l'avvio del gioco — quindi viene escluso per impostazione predefinita per conformità con la licenza.

Lascia il valore predefinito a meno che tu non abbia un motivo specifico per cambiarlo.

Esempio: `ffmpeg.dll` (esclude solo ffmpeg.dll)  
Esempio: `ffmpeg` (esclude sia ffmpeg.dll che ffmpegsumo.dll)

**Hash dei file Exe**

Quando impostato su `true`, il file `.exe` del gioco viene incluso anche nell'hash dell'impronta dell'ambiente. Questo impedisce che il file compresso venga avviato con un `.exe` diverso. È importante notare che qualsiasi modifica al `.exe` — come la sostituzione dell'icona o la modifica del manifesto — deve essere effettuata **prima** della compressione. Modificare il `.exe` dopo la compressione cambierà l'hash e impedirà l'avvio del gioco.

---

### 3-4. Impostazioni aggiuntive

**Blocca ridimensionamento finestra**

Quando impostato su `true`, i giocatori non possono ridimensionare o massimizzare la finestra di gioco. Il pulsante di ingrandimento potrebbe scomparire o smettere di funzionare.

**Blocca tasto F2 / F4 / F5**

Blocca rispettivamente la visualizzazione della frequenza fotogrammi (F2), il passaggio a schermo intero (F4) e l'aggiornamento del gioco (F5). Abilita queste opzioni se non vuoi che i giocatori accedano a queste funzioni in una build di distribuzione.

---

### 3-5. Impostazioni aggiornamento automatico

**Aggiornamento automatico**

Quando impostato su `true`, il gioco comunica con il server di rilascio GitHub all'avvio. Se è disponibile una nuova versione del file compresso, viene scaricata e sostituita automaticamente. Per utilizzare questa funzione, devi anche configurare `URL aggiornamento` qui sotto.

Quando impostato su `true`, il gioco si chiuderà (invece di riavviarsi) al completamento della compressione. Non riavviare il gioco a questo punto — farlo attiverà un tentativo di aggiornamento con la versione vecchia. Carica prima i file compressi su GitHub Releases.

Se devi verificare se la compressione è riuscita, imposta questo su `false` prima del test.

**URL aggiornamento**

L'URL del repository GitHub da cui verranno scaricati gli aggiornamenti. Inseriscilo nel formato `https://github.com/nomeutente/repository`. I repository privati non sono supportati.

Esempio: `https://github.com/Churitoring/SecuPacker`

**Tag aggiornamento**

Se lasciato vuoto, aggiorna sempre dall'ultima release.

Se viene specificato un tag, aggiorna dalla release più recente che porta quel tag. Si consiglia di creare un unico repository e assegnare tag specifici del gioco alle release al suo interno — in questo modo, la funzione di Aggiornamento automatico può servire più giochi da un unico repository.

Esempio: `SecuPacker`

**Internet obbligatorio / Esci se l'aggiornamento fallisce**

Configura il comportamento quando non c'è connessione a Internet o il server di aggiornamento non è raggiungibile.

Se vuoi che il gioco si chiuda solo quando non c'è connessione a Internet ma non vuoi effettivamente usare la funzione di aggiornamento, si consiglia di impostare `Aggiornamento automatico` su `true`, lasciare `URL aggiornamento` vuoto, impostare `Internet obbligatorio` su `true` e `Esci se l'aggiornamento fallisce` su `false`.

- Impostare `Internet obbligatorio` su `true` visualizzerà un avviso e chiuderà il gioco quando non c'è connessione a Internet.
- Impostare `Esci se l'aggiornamento fallisce` su `true` chiuderà il gioco anche se il server è raggiungibile ma il file non può essere scaricato.

**Impostazioni schermata di aggiornamento (PAU Scene \*)**

Configura l'interfaccia visualizzata durante il processo di aggiornamento automatico.

*Testo*

- **Testo durante l'aggiornamento**: Testo visualizzato nell'area del titolo mentre l'aggiornamento viene scaricato. Predefinito: `Updating...`
- **Testo al completamento**: Testo visualizzato nell'area del titolo quando l'aggiornamento si completa con successo. Predefinito: `Update complete!`
- **Testo in caso di errore**: Testo visualizzato nell'area del titolo quando l'aggiornamento fallisce. Predefinito: `Update failed`

*Animazione*

- **Effetto lampeggio**: Applica un'animazione di opacità pulsante al testo del titolo. Predefinito: `true`
- **Velocità lampeggio**: Velocità del ciclo di lampeggio. Valori più alti = più veloce. A `0.050`, circa un ciclo ogni 2 secondi a 60fps. Intervallo: `0.001` ~ `1.000`. Predefinito: `0.050`

*Progresso*

- **Mostra progresso**: Visualizza il progresso del download (%) e la dimensione (KB) nell'area del sottotitolo durante l'aggiornamento. Predefinito: `true`

*Sfondo*

- **Tipo di sfondo**: Seleziona il tipo di sfondo. `color` (colore uniforme) / `image` (immagine) / `video`. Predefinito: `color`
- **Colore sfondo**: Codice colore CSS per lo sfondo uniforme quando il tipo è `color`. Predefinito: `#000000`
- **Immagine sfondo**: File immagine di sfondo quando il tipo è `image`. Seleziona dalla cartella `img/`.
- **Video sfondo**: Percorso del file video quando il tipo è `video`. Inserire come stringa. Es.: `movies/bg.webm`
- **Modalità adattamento sfondo**: Come adattare l'immagine o il video quando le proporzioni non corrispondono allo schermo. `cover` (ritaglia per riempire lo schermo) / `contain` (letterbox, mantieni proporzioni) / `fill` (allunga allo schermo). Predefinito: `cover`
- **Loop video**: Mette in loop il video di sfondo. Se `false`, il video si ferma sull'ultimo fotogramma. Predefinito: `true`
- **Volume video**: Volume audio del video di sfondo. `0` (silenzioso) ~ `100`. Predefinito: `100`

*Musica di sfondo*

- **Musica di sfondo**: File musicale da riprodurre sulla schermata di aggiornamento. Seleziona dalla cartella `audio/`. Può essere usato insieme a un video di sfondo.
- **Volume musica**: Volume della musica di sfondo. `0` (silenzioso) ~ `100`. Predefinito: `80`
- **Loop musica**: Mette in loop la musica di sfondo. Se `false`, viene riprodotta una volta e si ferma. Predefinito: `true`

*Stile testo titolo*

- **Offset X titolo**: Offset orizzontale in pixel del testo del titolo dal centro dello schermo. `0` = centrato. Predefinito: `0`
- **Offset Y titolo**: Offset verticale in pixel del testo del titolo dal centro dello schermo. I valori negativi lo spostano verso l'alto. Predefinito: `-30`
- **Dimensione font titolo**: Dimensione del font del testo del titolo in pixel. Predefinito: `36`
- **Colore testo titolo**: Colore del testo del titolo in formato hex CSS. Predefinito: `#ffffff`
- **Spessore contorno titolo**: Spessore del contorno del testo del titolo in pixel. `0` = nessun contorno. Predefinito: `0`
- **Colore contorno titolo**: Colore del contorno del testo del titolo. Supporta hex CSS o formato `rgba()`. Predefinito: `rgba(0,0,0,0.5)`

*Stile sottotitolo*

Il sottotitolo è la riga secondaria sotto il titolo che visualizza i messaggi di progresso o stato.

- **Offset X sottotitolo**: Offset orizzontale in pixel del sottotitolo dal centro dello schermo. Predefinito: `0`
- **Offset Y sottotitolo**: Offset verticale in pixel del sottotitolo dal centro dello schermo. Predefinito: `30`
- **Dimensione font sottotitolo**: Dimensione del font del sottotitolo in pixel. Predefinito: `18`
- **Colore sottotitolo**: Colore del sottotitolo in formato hex CSS. Predefinito: `#888888`
- **Spessore contorno sottotitolo**: Spessore del contorno del sottotitolo in pixel. `0` = nessun contorno. Predefinito: `0`
- **Colore contorno sottotitolo**: Colore del contorno del sottotitolo. Supporta hex CSS o formato `rgba()`. Predefinito: `rgba(0,0,0,0.5)`

---

## 4. API JavaScript

Queste API possono essere chiamate direttamente da altri plugin o script, come alternativa ai Comandi Plugin.

Chiamare l'API direttamente crea una dipendenza da SecuPacker. Per evitare effetti collaterali quando il plugin è disabilitato, verifica sempre l'esistenza dell'oggetto prima di chiamarlo.

**`SecuPacker.getVersion()`**

Restituisce la stringa di versione di SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Restituisce `true` se il gioco è in esecuzione in modalità compressa, `false` altrimenti. Restituisce sempre `false` durante il playtest di sviluppo, quindi può essere usato per diversificare il comportamento in base al fatto che il gioco sia una build di distribuzione.

```javascript
if (SecuPacker.isPacked()) {
    // Codice da eseguire solo nelle build di distribuzione
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Restituisce `true` se il file compresso diviso specificato esiste ed è accessibile. Utile per verificare se un file DLC è installato.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true o false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Restituisce `true` se l'Aggiornamento automatico è abilitato e un URL è configurato.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true o false
```

---

## 5. Comandi plugin

Comandi plugin disponibili in MZ.

**GetVersion** — Memorizza la stringa di versione di SecuPacker in una variabile di gioco.

**IsPacked** — Memorizza `true` se il gioco è compresso, `false` altrimenti, in una variabile di gioco. Usalo per diversificare il comportamento in gioco in base al fatto che la build sia una build di distribuzione.

**IsSplitAvailable** — Verifica se il file compresso diviso specificato esiste ed è accessibile, e memorizza il risultato in una variabile di gioco. Utile per verificare se un file DLC è presente.

**IsPlayerAutoUpdateReady** — Memorizza `true` in una variabile di gioco se l'Aggiornamento automatico è abilitato e un URL è configurato.

---

## 6. Note

- **Protezione file di progetto**: Se viene trovato un file `*.rpgproject` o `*.rmmzproject` nella cartella di distribuzione, il plugin lo tratterà come una directory di sviluppo e interromperà la compressione. Esegui sempre il packer dalla cartella di distribuzione, non dalla cartella del progetto di sviluppo.
- **Avviso sulla privacy**: Nessuna sicurezza è assoluta. Per quanto sicuro possa essere un sistema, qualcuno potrebbe eventualmente trovare un modo per aggirarlo — quindi non includere mai informazioni personali o sensibili come ID, password o chiavi API nei file del tuo gioco.
- **Avviso copyright**: Non rimuovere il file `LICENSE.txt` situato nella stessa directory del file compresso. Distribuire senza di esso potrebbe costituire una violazione del copyright.
- **Schermata nera dopo la compressione**: Se il gioco funzionava normalmente durante il playtest prima della compressione ma si blocca su una schermata nera con un messaggio di errore dopo la compressione, questo è tipicamente causato da un errore in uno script registrato in `index.html` (MV) o `main.js` (MZ). Se hai aggiunto script personalizzati o modificato script registrati, quelli sono i candidati più probabili.
