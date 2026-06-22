# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <b>繁體中文</b> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20下載插件-4CAF50?style=for-the-badge" alt="下載插件" />
</a>

適用於 RPG Maker MV / MZ 的資源安全封包插件。

> **僅支援 Windows。** 不支援 macOS 和 Linux。

---

## 目錄
<img src="../image/example.png" alt="Example Image" width="250" align="right" />

1. [使用方法](#1-使用方法)
2. [系統需求](#2-系統需求)
3. [參數說明](#3-參數說明)
   - [3-1. 一般打包設定](#3-1-一般打包設定)
   - [3-2. 檔案打包設定](#3-2-檔案打包設定)
   - [3-3. 安全設定](#3-3-安全設定)
   - [3-4. 附加設定](#3-4-附加設定)
   - [3-5. 玩家自動更新設定](#3-5-玩家自動更新設定)
4. [JavaScript API](#4-javascript-api)
5. [插件指令](#5-插件指令)
6. [注意事項](#6-注意事項)

---

## 1. 使用方法

基本封包流程如下。

**第一步 — 安裝插件**

將 `Churitoring_SecuPacker.js` 放入專案的 `js/plugins/` 資料夾，並在 RPG Maker 插件管理器中啟用。在此階段根據需求設定各項參數。

**第二步 — 建立部署資料夾**

在 RPG Maker 中，選擇**檔案 > 部署**，匯出為 **Windows** 平台版本。

**第三步 — 執行封包**

執行部署資料夾中的遊戲 `.exe` 檔案。封包進度畫面會自動出現。過程中請勿關閉視窗。即使中途強制結束，遊戲在下次啟動時也極有可能自動復原——但最好還是等待封包完成。

**第四步 — 發佈**

封包完成後，遊戲將自動重新啟動。此時即可將該部署資料夾直接發佈給玩家。

注意：若 `Player Auto Update` 設定為 `true`，封包完成後遊戲將彈出確認對話框後關閉（而非重新啟動）。此時請勿重新啟動遊戲——這將觸發使用舊版本的更新嘗試。請先將封包後的檔案上傳至 GitHub Releases。

---

## 2. 系統需求

- RPG Maker MV 1.6.0 或更新版本，或 RPG Maker MZ 1.0.0 或更新版本
- NW.js 0.28.1 或更新版本（推薦：0.44.3 或更高）

---

## 3. 參數說明

### 3-1. 一般打包設定

**Packer Auto Update**

封包開始前，插件將從 GitHub 取得最新版本並覆寫 `js/plugins/Churitoring_SecuPacker.js`。如果您對該檔案進行了直接修改，必須將此項設定為 `false`——否則每次封包時您的修改都會被還原。如果您未對插件做任何修改，保持預設值 `true` 即可。

**Game Binary Name**

封包輸出檔案的檔名。預設為 `game.bin`，可在此處重新命名。僅接受檔名，不支援路徑。建議將其改為不易被猜測的名稱，副檔名也可以更改。

**Track Runtime Writes**

在遊戲測試期間，如果其他插件建立或修改了檔案，這些檔案路徑將記錄到 `data/SecuPacker_RuntimeWrites.txt`。封包時，列表中的檔案將從封包中排除，保留在磁碟上。

如果您使用了會自動產生檔案（如設定檔）的插件，請啟用此選項。除非有特殊原因，建議保持預設值 `true`。

注意：被此選項追蹤的檔案將被排除在 Player Auto Update 和 SecuPacker 保護之外。

**Strip Read-Only Attributes**

在封包最終清理階段，原始資源檔案將被刪除。若檔案帶有唯讀（R）屬性，刪除操作將失敗。如果您透過 Git 管理專案或使用了會自動標記檔案為唯讀的工具，將此項設定為 `true` 可在刪除前執行 `attrib -R`，避免出現問題。除非有特殊原因，建議保持預設值 `true`。

---

### 3-2. 檔案打包設定

**File Split**

啟用後，資源不再封包進單一檔案，而是根據路徑模式規則分散到多個封包檔案中。適合將 DLC 資源與主遊戲分離，或將大型專案拆分為多個檔案。設定為 `false` 時，下方 File Split List 中的所有項目也將被忽略。

**File Split List**

定義檔案/資料夾分配到各封包檔案的規則。每個項目包含兩個設定：

- **Split Bin File**：此群組檔案的輸出檔名。必須與 Game Binary Name 中設定的主包檔名不同。例：`dlc.bin`、`bgm.bin`
- **Split Path Patterns**：要包含在此檔案中的路徑列表。指定 `audio/bgm` 等資料夾時，將遞迴包含其中所有檔案。也可指定單一檔案，例如 `audio/se/boss.ogg`。

**Packed File Exclusions**

指定不封包、保留在磁碟上的檔案或資料夾。路徑相對於專案根目錄，使用正斜線（`/`）。例：`img/system/Loading.png`、`audio/bgm`

將執行階段需要直接從磁碟讀取的檔案新增至此處。列表中的檔案將被排除在封包之外且不會被刪除。

注意：此列表中的檔案將被排除在 Player Auto Update 和 SecuPacker 保護之外。

---

### 3-3. 安全設定

**Block Launch Args Whitelist**

若啟動時偵測到不在此列表中的 URL 查詢字串或 NW.js 啟動參數，遊戲將立即退出。預設為空列表，即預設攔截所有外部參數。將允許使用的參數新增至此列表即可。

此檢查僅適用於封包後的發行版本，開發測試期間不會生效。

**Early Blob Resolve**

將檔案路徑轉換為 Blob URL（在封包檔案內）的時機提前至 `Bitmap.load` 階段。大多數情況下保持 `true` 即可。

但如果您使用的插件直接攔截 `fs.readFile` 或 `XMLHttpRequest` 進行自訂解密，出現衝突時請將其設定為 `false`。

將此項設定為 `false` 可能會降低相容性。

**Enable Cheat Detection**

定期掃描作為背景處理程序執行的駭客工具。

**Excluded Binary Hashes**

計算環境指紋雜湊時需排除的二進位檔名（或部分名稱）。

預設包含 `ffmpeg` 是由於 FFmpeg 的授權條款（LGPL）要求。LGPL 要求使用者能夠以自己的版本替換該二進位檔案。若將 FFmpeg 納入雜湊計算，替換後雜湊值將發生變化，導致遊戲無法啟動——因此預設將其排除以符合授權條款。

除非有特殊原因，建議保持預設值不變。

範例：`ffmpeg.dll`（僅排除 ffmpeg.dll）  
範例：`ffmpeg`（同時排除 ffmpeg.dll 和 ffmpegsumo.dll）

**Hash Exe Files**

設定為 `true` 時，遊戲 `.exe` 檔案也會被納入環境指紋雜湊。這可防止封包檔案被其他 `.exe` 啟動。請注意，對 `.exe` 的任何修改——如替換圖示或修改資訊清單——都必須在封包**之前**完成。封包後修改 `.exe` 將改變雜湊值，導致遊戲無法啟動。

---

### 3-4. 附加設定

**Block Window Resize**

設定為 `true` 時，玩家將無法調整或最大化遊戲視窗。最大化按鈕可能消失或失效。

**Block F2 / F4 / F5 Key**

分別封鎖幀率顯示（F2）、全螢幕切換（F4）和遊戲重新整理（F5）。如果不希望玩家在發行版中使用這些功能，請啟用對應選項。

---

### 3-5. 玩家自動更新設定

**Player Auto Update**

設定為 `true` 時，遊戲啟動時會與 GitHub 發布伺服器通訊。若有新版本的封包檔案可用，將自動下載並替換。使用此功能還需在下方設定 `Player Auto Update URL`。

設定為 `true` 時，封包完成後遊戲將關閉（而非重新啟動）。此時請勿重新啟動遊戲——這將觸發使用舊版本的更新嘗試。請先將封包後的檔案上傳至 GitHub Releases。

如需測試封包是否成功，請在測試前將此項設定為 `false`。

**Player Auto Update URL**

用於取得更新的 GitHub 儲存庫 URL，格式為 `https://github.com/使用者名稱/儲存庫名稱`。不支援私人儲存庫。

範例：`https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

留空時，始終從最新發布版本更新。

指定標籤後，將從帶有該標籤的最新發布版本更新。建議建立單一儲存庫並為其中的發布版本指定遊戲專屬標籤——這樣 Player Auto Update 功能就可以從一個儲存庫為多款遊戲提供服務。

範例：`SecuPacker`

**Disable On No Internet / Disable On Fail**

設定無網路連線或更新伺服器無法存取時的行為。

如果只希望在無網路連線時關閉遊戲，但並不實際使用更新功能，建議將 `Player Auto Update` 設為 `true`，`Player Auto Update URL` 留空，`Disable On No Internet` 設為 `true`，`Disable On Fail` 設為 `false`。

- `Disable On No Internet` 設為 `true`：無網路連線時顯示警告並關閉遊戲。
- `Disable On Fail` 設為 `true`：即使伺服器可連線但檔案無法取得時也會關閉遊戲。

**更新畫面設定（PAU Scene \*）**

設定自動更新過程中顯示的介面。

*文字*

- **PAU Scene Update Text**：下載更新時標題區域顯示的文字。預設：`Updating...`
- **PAU Scene Complete Text**：更新成功完成時標題區域顯示的文字。預設：`Update complete!`
- **PAU Scene Failed Text**：更新失敗時標題區域顯示的文字。預設：`Update failed`

*動畫*

- **PAU Scene Blink**：為標題文字啟用呼吸透明度動畫。預設：`true`
- **PAU Scene Blink Speed**：閃爍週期速度，值越大越快。`0.050` 時在 60fps 下約每 2 秒一個週期。範圍：`0.001` ~ `1.000`。預設：`0.050`

*進度*

- **PAU Scene Show Progress**：更新時在副文字區域顯示下載進度（%）和大小（KB）。預設：`true`

*背景*

- **PAU Scene BG Type**：選擇背景類型。`color`（純色）/ `image` / `video`。預設：`color`
- **PAU Scene BG Color**：類型為 `color` 時的純色背景 CSS 顏色碼。預設：`#000000`
- **PAU Scene BG Image**：類型為 `image` 時的背景圖片檔案。從 `img/` 資料夾中選擇。
- **PAU Scene BG Video**：類型為 `video` 時的影片檔案路徑，以字串形式輸入。例：`movies/bg.webm`
- **PAU Scene BG Fit**：圖片或影片與螢幕比例不符時的適應方式。`cover`（裁切填滿螢幕）/ `contain`（信箱模式，保持比例）/ `fill`（拉伸至螢幕）。預設：`cover`
- **PAU Scene Video Loop**：循環播放背景影片。設為 `false` 時影片停在最後一幀。預設：`true`
- **PAU Scene Video Volume**：背景影片的音量。`0`（靜音）~ `100`。預設：`100`

*背景音樂*

- **PAU Scene BG Music**：更新畫面播放的音樂檔案。從 `audio/` 資料夾中選擇，可與影片背景同時使用。
- **PAU Scene BG Music Volume**：背景音樂音量。`0`（靜音）~ `100`。預設：`80`
- **PAU Scene BG Music Loop**：循環播放背景音樂。設為 `false` 時播放一次後停止。預設：`true`

*標題文字樣式*

- **PAU Scene Title X Offset**：標題文字相對於螢幕中心的水平像素偏移量。`0` = 置中。預設：`0`
- **PAU Scene Title Y Offset**：標題文字相對於螢幕中心的垂直像素偏移量，負值向上移動。預設：`-30`
- **PAU Scene Title Size**：標題文字的字體大小（像素）。預設：`36`
- **PAU Scene Title Color**：CSS hex 格式的標題文字顏色。預設：`#ffffff`
- **PAU Scene Title Outline Width**：標題文字描邊寬度（像素）。`0` = 無描邊。預設：`0`
- **PAU Scene Title Outline Color**：標題文字描邊顏色，支援 CSS hex 或 `rgba()` 格式。預設：`rgba(0,0,0,0.5)`

*副文字樣式*

副文字是標題下方的輔助行，用於顯示進度或狀態訊息。

- **PAU Scene Sub X Offset**：副文字相對於螢幕中心的水平像素偏移量。預設：`0`
- **PAU Scene Sub Y Offset**：副文字相對於螢幕中心的垂直像素偏移量。預設：`30`
- **PAU Scene Sub Size**：副文字的字體大小（像素）。預設：`18`
- **PAU Scene Sub Color**：CSS hex 格式的副文字顏色。預設：`#888888`
- **PAU Scene Sub Outline Width**：副文字描邊寬度（像素）。`0` = 無描邊。預設：`0`
- **PAU Scene Sub Outline Color**：副文字描邊顏色，支援 CSS hex 或 `rgba()` 格式。預設：`rgba(0,0,0,0.5)`

---

## 4. JavaScript API

這些 API 可直接從其他插件或腳本呼叫中使用，作為插件指令的替代方案。

直接呼叫 API 會產生對 SecuPacker 的相依性。為避免插件被停用時產生副作用，呼叫前請務必檢查物件是否存在。

**`SecuPacker.getVersion()`**

回傳 SecuPacker 的版本字串。

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

若遊戲以封包模式執行則回傳 `true`，否則回傳 `false`。在開發測試期間始終回傳 `false`，因此可用於根據是否為發行版本來區分不同的行為邏輯。

```javascript
if (SecuPacker.isPacked()) {
    // 僅在發行版本中執行的程式碼
}
```

**`SecuPacker.isSplitAvailable(binName)`**

若指定的分割封包檔案存在且可存取則回傳 `true`。可用於檢查 DLC 檔案是否已安裝。

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true 或 false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

若 Player Auto Update 已啟用且設定了 URL，則回傳 `true`。

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true 或 false
```

---

## 5. 插件指令

以下插件指令在 MZ 中可用。

**GetVersion** — 將 SecuPacker 的版本字串儲存到遊戲變數中。

**IsPacked** — 將遊戲是否已封包（`true`/`false`）儲存到遊戲變數中。可用於根據是否為發行版本在遊戲內分支不同的行為。

**IsSplitAvailable** — 檢查指定的分割封包檔案是否存在且可存取，並將結果儲存到遊戲變數中。可用於檢查 DLC 檔案是否存在。

**IsPlayerAutoUpdateReady** — 若 Player Auto Update 已啟用且設定了 URL，則將 `true` 儲存到遊戲變數中。

---

## 6. 注意事項

- **專案檔案保護**：若在部署資料夾中發現 `*.rpgproject` 或 `*.rmmzproject` 檔案，插件將視其為開發目錄並中止封包。請務必從部署資料夾執行封包器，而非從開發專案資料夾執行。
- **隱私警告**：沒有任何安全措施是絕對的。無論系統多麼安全，終究可能有人找到突破口——因此請絕對不要在遊戲檔案中包含 ID、密碼或 API 金鑰等個人或敏感資訊。
- **版權聲明**：請勿刪除與封包檔案位於同一目錄下的 `LICENSE.txt` 檔案。未附帶該檔案進行發佈可能構成版權侵權。
- **封包後黑畫面**：若封包前遊戲測試執行正常，但封包後出現黑畫面並顯示錯誤訊息，通常是由於 `index.html`（MV）或 `main.js`（MZ）中註冊的某個腳本發生錯誤所致。如果您新增了自訂腳本或修改了已註冊的腳本，這些是最可能的原因所在。
