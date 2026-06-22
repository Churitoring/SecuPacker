# Churitoring_SecuPacker

<b>English</b> | <a href="README/README_KO.md">한국어</a> | <a href="README/README_JA.md">日本語</a> | <a href="README/README_DE.md">Deutsch</a> | <a href="README/README_ES.md">Español</a> | <a href="README/README_FR.md">Français</a> | <a href="README/README_IT.md">Italiano</a> | <a href="README/README_PT.md">Português</a> | <a href="README/README_RU.md">Русский</a> | <a href="README/README_ZH.md">简体中文</a> | <a href="README/README_ZH_TW.md">繁體中文</a> | <a href="README/README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Download_Plugin-4CAF50?style=for-the-badge" alt="Download Plugin" />
</a>

A resource security packing plugin for RPG Maker MV / MZ.

> **Windows only.** Does not work on macOS or Linux.

---

## Table of Contents

1. [How to Use](#1-how-to-use)
2. [Requirements](#2-requirements)
3. [Parameter Reference](#3-parameter-reference)
   - [3-1. General Pack Settings](#3-1-general-pack-settings)
   - [3-2. File Packing Settings](#3-2-file-packing-settings)
   - [3-3. Security Settings](#3-3-security-settings)
   - [3-4. Additional Settings](#3-4-additional-settings)
   - [3-5. Player Auto Update Settings](#3-5-player-auto-update-settings)
4. [JavaScript API](#4-javascript-api)
5. [Plugin Commands](#5-plugin-commands)
6. [Notes](#6-notes)

---

## 1. How to Use

The basic packing workflow is as follows.

**Step 1 — Install the Plugin**

Place `Churitoring_SecuPacker.js` in your project's `js/plugins/` folder and enable it in the RPG Maker Plugin Manager. Configure the parameters to your liking at this stage.

**Step 2 — Create the Deployment Folder**

In RPG Maker, go to **File > Deployment** and deploy for the **Windows** platform.

**Step 3 — Run Packing**

Run the game `.exe` inside the deployed folder. A packing progress screen will appear automatically. Do not close the window during this process. Even if you force-quit midway, the game will most likely recover on the next launch — but it's best to just wait.

**Step 4 — Distribute**

Once packing is complete, the game will relaunch automatically. You can then distribute this deployment folder directly to your players.

Note: If `Player Auto Update` is set to `true`, the game will close (instead of relaunch) after a confirmation dialog. Do not relaunch the game at this point — doing so will trigger an update attempt using the old version. Instead, upload the packed files to GitHub Releases first.

---

## 2. Requirements

- RPG Maker MV 1.6.0 or later, or RPG Maker MZ 1.0.0 or later
- NW.js 0.28.1 or later (recommended: 0.44.3 or later)

---

## 3. Parameter Reference

### 3-1. General Pack Settings

**Packer Auto Update**

Before packing begins, the plugin will fetch the latest version from GitHub and overwrite `js/plugins/Churitoring_SecuPacker.js`. If you have made any direct modifications to this file, you must set this to `false` — otherwise your changes will be reverted every time you pack. If you are using the plugin as-is without any modifications, leave it as `true`.

**Game Binary Name**

The filename for the packed output file. The default is `game.bin`, but you can rename it here. Only a filename is accepted — paths are not allowed. Changing this to something less predictable is recommended. The file extension can also be changed.

**Track Runtime Writes**

During test play, if other plugins create or modify files, those file paths are recorded in `data/SecuPacker_RuntimeWrites.txt`. When packing, files listed there are excluded from the pack and left on disk as-is.

If you use plugins that auto-generate files such as config files, enable this option. It is recommended to leave this at the default value of `true` unless you have a specific reason to disable it.

Note: Files tracked by this option are excluded from Player Auto Update and SecuPacker's protection.

**Strip Read-Only Attributes**

During the final cleanup stage of packing, original resource files are deleted. If any files have the read-only (R) attribute set, deletion will fail. If you manage your project with Git or use tools that automatically mark files as read-only, setting this to `true` will run `attrib -R` before deletion to prevent issues. It is recommended to leave this at the default value of `true` unless you have a specific reason to disable it.

---

### 3-2. File Packing Settings

**File Split**

Instead of packing all resources into a single file, this allows resources to be distributed across multiple packed files. Useful for separating DLC resources from the base game, or for splitting large projects into multiple files. Setting this to `false` will also ignore all File Split List entries below.

**File Split List**

Defines rules for which files/folders go into which packed file. Each entry has two settings:

- **Split Bin File**: The filename for this group of files. Must differ from the main pack filename set in Game Binary Name. E.g.: `dlc.bin`, `bgm.bin`
- **Split Path Patterns**: A list of paths to include in this file. Specifying a folder like `audio/bgm` will include all files within it recursively. You can also specify a single file such as `audio/se/boss.ogg`.

**Packed File Exclusions**

Specifies files or folders to exclude from packing and leave on disk. Paths are relative to the project root and must use forward slashes (`/`). E.g.: `img/system/Loading.png`, `audio/bgm`

Add any files here that need to be read directly from disk at runtime. Files in this list are excluded from packing and will not be deleted.

Note: Files in this list are excluded from Player Auto Update and SecuPacker's protection.

---

### 3-3. Security Settings

**Block Launch Args Whitelist**

If any URL query string or NW.js launch argument is detected at startup that is not on this list, the game will exit immediately. The default is an empty list, which means all external arguments are blocked by default. Add any arguments that should be permitted to this list.

This check only applies to packed distribution builds and is not enforced during development test play.

**Early Blob Resolve**

Advances the timing at which file paths are converted to Blob URLs (within the packed file) to the `Bitmap.load` stage. For most use cases, leave this as `true`.

However, if you are using a plugin that intercepts `fs.readFile` or `XMLHttpRequest` directly to handle its own decryption, set this to `false` if conflicts arise.

Setting this to `false` may reduce compatibility.

**Enable Cheat Detection**

Periodically scans for hacking tools running as background processes.

**Excluded Binary Hashes**

The names (or partial names) of binary files to exclude when calculating the environment fingerprint hash.

The reason `ffmpeg` is included by default is due to FFmpeg's license (LGPL). The LGPL requires that users be able to replace the binary with their own version. Including FFmpeg in the hash would cause the hash to change upon replacement, preventing the game from launching — so it is excluded by default for license compliance.

Leave the default value unless you have a specific reason to change it.

Example: `ffmpeg.dll` (excludes only ffmpeg.dll)  
Example: `ffmpeg` (excludes both ffmpeg.dll and ffmpegsumo.dll)

**Hash Exe Files**

When set to `true`, the game `.exe` file is also included in the environment fingerprint hash. This prevents the packed file from being launched with a different `.exe`. Importantly, any changes to the `.exe` — such as replacing the icon or modifying the manifest — must be done **before** packing. Modifying the `.exe` after packing will change the hash and prevent the game from launching.

---

### 3-4. Additional Settings

**Block Window Resize**

When set to `true`, players cannot resize or maximize the game window. The maximize button may disappear or stop functioning.

**Block F2 / F4 / F5 Key**

Blocks the frame rate display (F2), fullscreen toggle (F4), and game refresh (F5), respectively. Enable these if you do not want players accessing these functions in a distribution build.

---

### 3-5. Player Auto Update Settings

**Player Auto Update**

When set to `true`, the game communicates with the GitHub release server at startup. If a new version of the packed file is available, it is automatically downloaded and replaced. To use this feature, you must also configure `Player Auto Update URL` below.

When set to `true`, the game will close (instead of relaunch) after packing is complete. Do not relaunch the game at this point — doing so will trigger an update attempt using the old version. Instead, upload the packed files to GitHub Releases first.

If you need to test whether packing was successful, set this to `false` before testing.

**Player Auto Update URL**

The GitHub repository URL from which updates will be fetched. Enter it in the format `https://github.com/username/repository`. Private repositories are not supported.

Example: `https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

If left empty, always updates from the latest release.

If a tag is specified, updates from the most recent release carrying that tag. It is recommended to create a single repository and assign game-specific tags to releases within it — this way, the Player Auto Update feature can serve multiple games from a single repository.

Example: `SecuPacker`

**Disable On No Internet / Disable On Fail**

Configures the behavior when there is no internet connection or the update server is unreachable.

If you want the game to exit only when there is no internet connection but do not actually want to use the update feature, it is recommended to set `Player Auto Update` to `true`, leave `Player Auto Update URL` blank, set `Disable On No Internet` to `true`, and set `Disable On Fail` to `false`.

- Setting `Disable On No Internet` to `true` will display a warning and exit the game when there is no internet connection.
- Setting `Disable On Fail` to `true` will exit the game even if the server is reachable but the file cannot be fetched.

**Update Screen Settings (PAU Scene \*)**

Configures the UI displayed during the auto-update process.

*Text*

- **PAU Scene Update Text**: Text displayed in the title area while the update is downloading. Default: `Updating...`
- **PAU Scene Complete Text**: Text displayed in the title area when the update completes successfully. Default: `Update complete!`
- **PAU Scene Failed Text**: Text displayed in the title area when the update fails. Default: `Update failed`

*Animation*

- **PAU Scene Blink**: Applies a breathing opacity animation to the title text. Default: `true`
- **PAU Scene Blink Speed**: Speed of the blink cycle. Higher values = faster. At `0.050`, approximately one cycle every 2 seconds at 60fps. Range: `0.001` ~ `1.000`. Default: `0.050`

*Progress*

- **PAU Scene Show Progress**: Displays download progress (%) and size (KB) in the sub-text area while updating. Default: `true`

*Background*

- **PAU Scene BG Type**: Selects the background type. `color` (solid color) / `image` / `video`. Default: `color`
- **PAU Scene BG Color**: CSS color code for the solid background when type is `color`. Default: `#000000`
- **PAU Scene BG Image**: Background image file when type is `image`. Select from the `img/` folder.
- **PAU Scene BG Video**: Video file path when type is `video`. Enter as a string. E.g.: `movies/bg.webm`
- **PAU Scene BG Fit**: How to fit the image or video when the aspect ratio does not match the screen. `cover` (crop to fill screen) / `contain` (letterbox, keep aspect ratio) / `fill` (stretch to screen). Default: `cover`
- **PAU Scene Video Loop**: Loops the background video. If `false`, the video stops on the last frame. Default: `true`
- **PAU Scene Video Volume**: Audio volume for the background video. `0` (muted) ~ `100`. Default: `100`

*Background Music*

- **PAU Scene BG Music**: Music file to play on the update screen. Select from the `audio/` folder. Can be used alongside a video background.
- **PAU Scene BG Music Volume**: Background music volume. `0` (silent) ~ `100`. Default: `80`
- **PAU Scene BG Music Loop**: Loops the background music. If `false`, plays once and stops. Default: `true`

*Title Text Style*

- **PAU Scene Title X Offset**: Horizontal pixel offset of the title text from the screen center. `0` = centered. Default: `0`
- **PAU Scene Title Y Offset**: Vertical pixel offset of the title text from the screen center. Negative values move it upward. Default: `-30`
- **PAU Scene Title Size**: Font size of the title text in pixels. Default: `36`
- **PAU Scene Title Color**: Title text color in CSS hex format. Default: `#ffffff`
- **PAU Scene Title Outline Width**: Outline width of the title text in pixels. `0` = no outline. Default: `0`
- **PAU Scene Title Outline Color**: Outline color of the title text. Supports CSS hex or `rgba()` format. Default: `rgba(0,0,0,0.5)`

*Sub-text Style*

The sub-text is the secondary line below the title that displays progress or status messages.

- **PAU Scene Sub X Offset**: Horizontal pixel offset of the sub-text from the screen center. Default: `0`
- **PAU Scene Sub Y Offset**: Vertical pixel offset of the sub-text from the screen center. Default: `30`
- **PAU Scene Sub Size**: Font size of the sub-text in pixels. Default: `18`
- **PAU Scene Sub Color**: Sub-text color in CSS hex format. Default: `#888888`
- **PAU Scene Sub Outline Width**: Outline width of the sub-text in pixels. `0` = no outline. Default: `0`
- **PAU Scene Sub Outline Color**: Outline color of the sub-text. Supports CSS hex or `rgba()` format. Default: `rgba(0,0,0,0.5)`

---

## 4. JavaScript API

These APIs can be called directly from other plugins or script calls, as an alternative to Plugin Commands.

Calling the API directly creates a dependency on SecuPacker. To avoid side effects when the plugin is disabled, always check for the object's existence before calling.

**`SecuPacker.getVersion()`**

Returns the version string of SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Returns `true` if the game is running in packed mode, `false` otherwise. Always returns `false` during development test play, so this can be used to branch behavior based on whether the game is a distribution build.

```javascript
if (SecuPacker.isPacked()) {
    // Code to run only in distribution builds
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Returns `true` if the specified split packed file exists and is accessible. Useful for checking whether a DLC file is installed.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true or false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Returns `true` if Player Auto Update is enabled and a URL is configured.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true or false
```

---

## 5. Plugin Commands

Plugin commands available in MZ.

**GetVersion** — Stores SecuPacker's version string into a game variable.

**IsPacked** — Stores `true` if the game is packed, `false` otherwise, into a game variable. Use this to branch in-game behavior based on whether the build is a distribution build.

**IsSplitAvailable** — Checks whether the specified split packed file exists and is accessible, and stores the result in a game variable. Useful for checking whether a DLC file is present.

**IsPlayerAutoUpdateReady** — Stores `true` in a game variable if Player Auto Update is enabled and a URL is configured.

---

## 6. Notes

- **Project File Protection**: If a `*.rpgproject` or `*.rmmzproject` file is found inside the deployment folder, the plugin will treat it as a development directory and abort packing. Always run the packer from the deployed folder, not your development project folder.
- **Privacy Warning**: No security is absolute. No matter how secure a system is, someone may eventually find a way through — so never include personal or sensitive information such as IDs, passwords, or API keys in your game files.
- **Copyright Notice**: Do not remove the `LICENSE.txt` file located in the same directory as the packed file. Distributing without it may constitute a copyright violation.
- **Black Screen After Packing**: If the game worked normally during test play before packing but freezes on a black screen with an error message after packing, this is typically caused by an error in a script registered in `index.html` (MV) or `main.js` (MZ). If you have added custom scripts or modified any registered scripts, those are the most likely culprits.
