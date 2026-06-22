# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <b>简体中文</b> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20下载插件-4CAF50?style=for-the-badge" alt="下载插件" />
</a>

适用于 RPG Maker MV / MZ 的资源安全打包插件。

> **仅支持 Windows。** 不支持 macOS 和 Linux。

---

## 目录
<img src="../image/example.png" alt="Example Image" width="250" align="right" />

1. [使用方法](#1-使用方法)
2. [系统要求](#2-系统要求)
3. [参数说明](#3-参数说明)
   - [3-1. 常规打包设置](#3-1-常规打包设置)
   - [3-2. 文件打包设置](#3-2-文件打包设置)
   - [3-3. 安全设置](#3-3-安全设置)
   - [3-4. 附加设置](#3-4-附加设置)
   - [3-5. 玩家自动更新设置](#3-5-玩家自动更新设置)
4. [JavaScript API](#4-javascript-api)
5. [插件命令](#5-插件命令)
6. [注意事项](#6-注意事项)

---

## 1. 使用方法

基本打包流程如下。

**第一步 — 安装插件**

将 `Churitoring_SecuPacker.js` 放入项目的 `js/plugins/` 文件夹，并在 RPG Maker 插件管理器中启用。在此阶段根据需要配置各项参数。

**第二步 — 创建部署文件夹**

在 RPG Maker 中，选择**文件 > 部署**，导出为 **Windows** 平台版本。

**第三步 — 执行打包**

运行部署文件夹中的游戏 `.exe` 文件。打包进度界面会自动出现。过程中请勿关闭窗口。即使中途强制退出，游戏在下次启动时也极有可能自动恢复——但最好还是等待打包完成。

**第四步 — 分发**

打包完成后，游戏将自动重新启动。此时即可将该部署文件夹直接分发给玩家。

注意：若 `Player Auto Update` 设置为 `true`，打包完成后游戏将弹出确认对话框后关闭（而非重新启动）。此时请勿重新启动游戏——这将触发使用旧版本的更新尝试。请先将打包后的文件上传至 GitHub Releases。

---

## 2. 系统要求

- RPG Maker MV 1.6.0 或更高版本，或 RPG Maker MZ 1.0.0 或更高版本
- NW.js 0.28.1 或更高版本（推荐：0.44.3 或更高）

---

## 3. 参数说明

### 3-1. 常规打包设置

**Packer Auto Update**

打包开始前，插件将从 GitHub 获取最新版本并覆盖 `js/plugins/Churitoring_SecuPacker.js`。如果您对该文件进行了直接修改，必须将此项设置为 `false`——否则每次打包时您的修改都会被还原。如果您未对插件做任何修改，保持默认值 `true` 即可。

**Game Binary Name**

打包输出文件的文件名。默认为 `game.bin`，可在此处重命名。仅接受文件名，不支持路径。建议将其改为不易被猜测的名称，文件扩展名也可以更改。

**Track Runtime Writes**

在游戏测试期间，如果其他插件创建或修改了文件，这些文件路径将记录到 `data/SecuPacker_RuntimeWrites.txt`。打包时，列表中的文件将从打包包中排除，保留在磁盘上。

如果您使用了会自动生成文件（如配置文件）的插件，请启用此选项。除非有特殊原因，建议保持默认值 `true`。

注意：被此选项追踪的文件将被排除在 Player Auto Update 和 SecuPacker 保护之外。

**Strip Read-Only Attributes**

在打包最终清理阶段，原始资源文件将被删除。若文件带有只读（R）属性，删除操作将失败。如果您通过 Git 管理项目或使用了会自动标记文件为只读的工具，将此项设置为 `true` 可在删除前执行 `attrib -R`，避免出现问题。除非有特殊原因，建议保持默认值 `true`。

---

### 3-2. 文件打包设置

**File Split**

启用后，资源不再打包进单一文件，而是根据路径模式规则分散到多个打包文件中。适合将 DLC 资源与主游戏分离，或将大型项目拆分为多个文件。设置为 `false` 时，下方 File Split List 中的所有条目也将被忽略。

**File Split List**

定义文件/文件夹分配到各打包文件的规则。每个条目包含两个设置：

- **Split Bin File**：此组文件的输出文件名。必须与 Game Binary Name 中设置的主包文件名不同。例：`dlc.bin`、`bgm.bin`
- **Split Path Patterns**：要包含在此文件中的路径列表。指定 `audio/bgm` 等文件夹时，将递归包含其中所有文件。也可指定单个文件，例如 `audio/se/boss.ogg`。

**Packed File Exclusions**

指定不打包、保留在磁盘上的文件或文件夹。路径相对于项目根目录，使用正斜杠（`/`）。例：`img/system/Loading.png`、`audio/bgm`

将运行时需要直接从磁盘读取的文件添加到此处。列表中的文件将被排除在打包之外且不会被删除。

注意：此列表中的文件将被排除在 Player Auto Update 和 SecuPacker 保护之外。

---

### 3-3. 安全设置

**Block Launch Args Whitelist**

若启动时检测到不在此列表中的 URL 查询字符串或 NW.js 启动参数，游戏将立即退出。默认为空列表，即默认拦截所有外部参数。将允许使用的参数添加到此列表即可。

此检查仅适用于打包后的发行版本，开发测试期间不会生效。

**Early Blob Resolve**

将文件路径转换为 Blob URL（在打包文件内）的时机提前至 `Bitmap.load` 阶段。大多数情况下保持 `true` 即可。

但如果您使用的插件直接拦截 `fs.readFile` 或 `XMLHttpRequest` 进行自定义解密，出现冲突时请将其设置为 `false`。

将此项设置为 `false` 可能会降低兼容性。

**Enable Cheat Detection**

定期扫描作为后台进程运行的黑客工具。

**Excluded Binary Hashes**

计算环境指纹哈希时需排除的二进制文件名（或部分名称）。

默认包含 `ffmpeg` 是由于 FFmpeg 的许可证（LGPL）要求。LGPL 要求用户能够用自己的版本替换该二进制文件。若将 FFmpeg 纳入哈希计算，替换后哈希值将发生变化，导致游戏无法启动——因此默认将其排除以符合许可证要求。

除非有特殊原因，建议保持默认值不变。

示例：`ffmpeg.dll`（仅排除 ffmpeg.dll）  
示例：`ffmpeg`（同时排除 ffmpeg.dll 和 ffmpegsumo.dll）

**Hash Exe Files**

设置为 `true` 时，游戏 `.exe` 文件也会被纳入环境指纹哈希。这可防止打包文件被其他 `.exe` 启动。请注意，对 `.exe` 的任何修改——如替换图标或修改清单——都必须在打包**之前**完成。打包后修改 `.exe` 将改变哈希值，导致游戏无法启动。

---

### 3-4. 附加设置

**Block Window Resize**

设置为 `true` 时，玩家将无法调整或最大化游戏窗口。最大化按钮可能消失或失效。

**Block F2 / F4 / F5 Key**

分别屏蔽帧率显示（F2）、全屏切换（F4）和游戏刷新（F5）。如果不希望玩家在发行版中使用这些功能，请启用对应选项。

---

### 3-5. 玩家自动更新设置

**Player Auto Update**

设置为 `true` 时，游戏启动时会与 GitHub 发布服务器通信。若有新版本的打包文件可用，将自动下载并替换。使用此功能还需在下方配置 `Player Auto Update URL`。

设置为 `true` 时，打包完成后游戏将关闭（而非重新启动）。此时请勿重新启动游戏——这将触发使用旧版本的更新尝试。请先将打包后的文件上传至 GitHub Releases。

如需测试打包是否成功，请在测试前将此项设置为 `false`。

**Player Auto Update URL**

用于获取更新的 GitHub 仓库 URL，格式为 `https://github.com/用户名/仓库名`。不支持私有仓库。

示例：`https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

留空时，始终从最新发布版本更新。

指定标签后，将从带有该标签的最新发布版本更新。建议创建单一仓库并为其中的发布版本指定游戏专属标签——这样 Player Auto Update 功能就可以从一个仓库为多款游戏提供服务。

示例：`SecuPacker`

**Disable On No Internet / Disable On Fail**

配置无网络连接或更新服务器不可达时的行为。

如果只希望在无网络连接时关闭游戏，但并不实际使用更新功能，建议将 `Player Auto Update` 设为 `true`，`Player Auto Update URL` 留空，`Disable On No Internet` 设为 `true`，`Disable On Fail` 设为 `false`。

- `Disable On No Internet` 设为 `true`：无网络连接时显示警告并关闭游戏。
- `Disable On Fail` 设为 `true`：即使服务器可达但文件无法获取时也会关闭游戏。

**更新界面设置（PAU Scene \*）**

配置自动更新过程中显示的界面。

*文字*

- **PAU Scene Update Text**：下载更新时标题区域显示的文字。默认：`Updating...`
- **PAU Scene Complete Text**：更新成功完成时标题区域显示的文字。默认：`Update complete!`
- **PAU Scene Failed Text**：更新失败时标题区域显示的文字。默认：`Update failed`

*动画*

- **PAU Scene Blink**：为标题文字启用呼吸透明度动画。默认：`true`
- **PAU Scene Blink Speed**：闪烁周期速度，值越大越快。`0.050` 时在 60fps 下约每 2 秒一个周期。范围：`0.001` ~ `1.000`。默认：`0.050`

*进度*

- **PAU Scene Show Progress**：更新时在副文字区域显示下载进度（%）和大小（KB）。默认：`true`

*背景*

- **PAU Scene BG Type**：选择背景类型。`color`（纯色）/ `image` / `video`。默认：`color`
- **PAU Scene BG Color**：类型为 `color` 时的纯色背景 CSS 颜色代码。默认：`#000000`
- **PAU Scene BG Image**：类型为 `image` 时的背景图片文件。从 `img/` 文件夹中选择。
- **PAU Scene BG Video**：类型为 `video` 时的视频文件路径，以字符串形式输入。例：`movies/bg.webm`
- **PAU Scene BG Fit**：图片或视频与屏幕比例不匹配时的适应方式。`cover`（裁剪填满屏幕）/ `contain`（信箱模式，保持比例）/ `fill`（拉伸至屏幕）。默认：`cover`
- **PAU Scene Video Loop**：循环播放背景视频。设为 `false` 时视频停在最后一帧。默认：`true`
- **PAU Scene Video Volume**：背景视频的音量。`0`（静音）~ `100`。默认：`100`

*背景音乐*

- **PAU Scene BG Music**：更新界面播放的音乐文件。从 `audio/` 文件夹中选择，可与视频背景同时使用。
- **PAU Scene BG Music Volume**：背景音乐音量。`0`（静音）~ `100`。默认：`80`
- **PAU Scene BG Music Loop**：循环播放背景音乐。设为 `false` 时播放一次后停止。默认：`true`

*标题文字样式*

- **PAU Scene Title X Offset**：标题文字相对于屏幕中心的水平像素偏移量。`0` = 居中。默认：`0`
- **PAU Scene Title Y Offset**：标题文字相对于屏幕中心的垂直像素偏移量，负值向上移动。默认：`-30`
- **PAU Scene Title Size**：标题文字的字体大小（像素）。默认：`36`
- **PAU Scene Title Color**：CSS hex 格式的标题文字颜色。默认：`#ffffff`
- **PAU Scene Title Outline Width**：标题文字描边宽度（像素）。`0` = 无描边。默认：`0`
- **PAU Scene Title Outline Color**：标题文字描边颜色，支持 CSS hex 或 `rgba()` 格式。默认：`rgba(0,0,0,0.5)`

*副文字样式*

副文字是标题下方的辅助行，用于显示进度或状态信息。

- **PAU Scene Sub X Offset**：副文字相对于屏幕中心的水平像素偏移量。默认：`0`
- **PAU Scene Sub Y Offset**：副文字相对于屏幕中心的垂直像素偏移量。默认：`30`
- **PAU Scene Sub Size**：副文字的字体大小（像素）。默认：`18`
- **PAU Scene Sub Color**：CSS hex 格式的副文字颜色。默认：`#888888`
- **PAU Scene Sub Outline Width**：副文字描边宽度（像素）。`0` = 无描边。默认：`0`
- **PAU Scene Sub Outline Color**：副文字描边颜色，支持 CSS hex 或 `rgba()` 格式。默认：`rgba(0,0,0,0.5)`

---

## 4. JavaScript API

这些 API 可直接从其他插件或脚本调用中使用，作为插件命令的替代方案。

直接调用 API 会产生对 SecuPacker 的依赖。为避免插件被禁用时产生副作用，调用前请始终检查对象是否存在。

**`SecuPacker.getVersion()`**

返回 SecuPacker 的版本字符串。

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

若游戏以打包模式运行则返回 `true`，否则返回 `false`。在开发测试期间始终返回 `false`，因此可用于根据是否为发行版本来区分不同的行为逻辑。

```javascript
if (SecuPacker.isPacked()) {
    // 仅在发行版本中执行的代码
}
```

**`SecuPacker.isSplitAvailable(binName)`**

若指定的分割打包文件存在且可访问则返回 `true`。可用于检查 DLC 文件是否已安装。

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true 或 false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

若 Player Auto Update 已启用且配置了 URL，则返回 `true`。

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true 或 false
```

---

## 5. 插件命令

以下插件命令在 MZ 中可用。

**GetVersion** — 将 SecuPacker 的版本字符串存储到游戏变量中。

**IsPacked** — 将游戏是否已打包（`true`/`false`）存储到游戏变量中。可用于根据是否为发行版本在游戏内分支不同的行为。

**IsSplitAvailable** — 检查指定的分割打包文件是否存在且可访问，并将结果存储到游戏变量中。可用于检查 DLC 文件是否存在。

**IsPlayerAutoUpdateReady** — 若 Player Auto Update 已启用且配置了 URL，则将 `true` 存储到游戏变量中。

---

## 6. 注意事项

- **项目文件保护**：若在部署文件夹中发现 `*.rpgproject` 或 `*.rmmzproject` 文件，插件将视其为开发目录并中止打包。请始终从部署文件夹运行打包器，而非从开发项目文件夹运行。
- **隐私警告**：没有任何安全措施是绝对的。无论系统多么安全，总有人可能找到突破口——因此请绝对不要在游戏文件中包含 ID、密码或 API 密钥等个人或敏感信息。
- **版权声明**：请勿删除与打包文件位于同一目录下的 `LICENSE.txt` 文件。未附带该文件进行分发可能构成版权侵权。
- **打包后黑屏**：若打包前游戏测试运行正常，但打包后出现黑屏并显示错误信息，通常是由于 `index.html`（MV）或 `main.js`（MZ）中注册的某个脚本发生错误所致。如果您添加了自定义脚本或修改了已注册的脚本，这些是最可能的原因所在。
