/*
===========================================================================
Churitoring_SecuPacker.js
===========================================================================
zlib License

Copyright (c) 2026 Churitoring
(GitHub: https://github.com/Churitoring/SecuPacker)
(GitHub(SecuPacker): https://github.com/Churitoring/Churitoring_SecuPacker)
(Homepage: https://churitoring.github.io)
(YouTube: https://youtube.com/@Churitoring)
(Steam Curator: https://store.steampowered.com/curator/42956445)
(Facebook: https://facebook.com/churitoring)

This software is provided 'as-is', without any express or implied
warranty. In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
3. This notice may not be removed or altered from any source distribution.
===========================================================================
*/

/*:
 * @plugindesc SecuPacker, which provides strong security.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Get SecuPacker Version
 * @desc Stores the SecuPacker plugin version string into a game variable.
 * 
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @default 0
 * @desc The game variable ID to store the version string in.
 * 
 * 
 * @command IsPacked
 * @text Is Game Packed
 * @desc Stores whether the game is packed (true) or not (false) into a game variable.
 * 
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Is Player Auto Update Ready
 * @desc Stores true into a game variable if Player Auto Update is enabled AND a URL is configured.
 * 
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @default 0
 * @desc The game variable ID to store the result in.
 * 
 * 
 * @command IsSplitAvailable
 * @text Is Split Available
 * @desc Stores whether a split bin file is available into a game variable.
 * 
 * @arg variableId
 * @text Variable ID
 * @type variable
 * @default 0
 * @desc The game variable ID to store the result in.
 * 
 * @arg binName
 * @text Split Bin File
 * @type string
 * @default
 * @desc The filename of the split bin to check.
 * 
 * 
 * @param General Pack Settings
 * @text General Pack Settings
 * 
 * @param Packer Auto Update
 * @text Packer Auto Update
 * @desc Checks GitHub for Packer plugin updates before packing. Set false if you modified this plugin.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Game Binary Name
 * @desc Game binary filename to be created during packaging (name.extension).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Track Runtime Writes
 * @desc During playtesting, records files written by other plugins. At pack time, those files are left on disk.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Strip Read-Only Attributes
 * @desc Strips read-only (R) attribute from files/directories before deletion during cleanup.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text File Packing Settings
 * 
 * @param File Split
 * @text File Split
 * @desc Enables splitting resources across multiple .bin files by path pattern rules below.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text File Split List
 * @desc Assign files/folders to separate .bin files. Each entry specifies a target bin and one or more path patterns.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Packed File Exclusions
 * @desc Files and folders to keep on disk. Each entry is a path relative to the project root (forward slashes).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Security Settings
 * 
 * @param Block Launch Args Whitelist
 * @text Block Launch Args Whitelist
 * @desc Any arg present at launch that is NOT in this list will cause the game to exit immediately. Empty to block all args.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Early Blob Resolve
 * @desc Convert paths to blob URLs at the Bitmap.load level. Disable for custom URL reading decrypters.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Enable Cheat Detection
 * @desc Enables the background process scanner to detect hacking tools.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Excluded Binary Hashes
 * @desc Binary filenames/fragments to exclude from the environment fingerprint.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Hash Exe Files
 * @desc Ties the .exe to the game to increase security. Apply any .exe changes (like icons) prior to packing.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Additional Settings
 * 
 * @param Block Window Resize
 * @text Block Window Resize
 * @desc Prevents the player from resizing the game window. The maximize button may not function or may disappear.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Block F2 Key (Frame Rate)
 * @desc Prevents the player from pressing F2 to view the frame rate display.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Block F4 Key (Fullscreen)
 * @desc Prevents the player from pressing F4 to toggle fullscreen/windowed mode.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Block F5 Key (Refresh)
 * @desc Prevents the player from pressing F5 to refresh/reload the game.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Player Auto Update Settings
 * 
 * @param Player Auto Update
 * @text Player Auto Update
 * @desc Automatically updates from GitHub releases when the game starts.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text Player Auto Update URL
 * @desc GitHub repository URL to fetch updates from.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Player Auto Update Tag
 * @desc Updates only from releases with specific tag. Leave empty to use the latest release.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Disable On No Internet
 * @desc Displays an alert and exits the game if there is no internet connection.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Disable On Update Fail
 * @desc Displays a notification and exits the game if the update cannot be fetched.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Update Screen Settings
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Updating Text
 * @desc Text shown as the main title while the update is downloading.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Complete Text
 * @desc Text shown as the main title when the update finishes successfully.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Failed Text
 * @desc Text shown as the main title when the update fails.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Blink Effect
 * @desc Enables the pulsing/breathing opacity animation on the title text.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Blink Speed
 * @desc Speed of the blink cycle. Higher = faster. (0.050 ≈ 2 sec/cycle at 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Show Progress
 * @desc Shows download percentage and KB info in the sub-text while updating.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Background Type
 * @desc Background type for the update screen: Solid Color, Image, or Video.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Solid Color
 * @value color
 * @option Image
 * @value image
 * @option Video
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Background Color
 * @desc Solid background color in CSS hex (e.g. #000000). Used when Background Type is "color".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Background Image
 * @desc Background image file. Used when Background Type is "Image".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Background Video
 * @desc Background video path. Used when Background Type is "Video". Enter as a string (e.g. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Background Fit Mode
 * @desc How to fit the image or video when the aspect ratio doesn't match the screen.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (crop to fill screen)
 * @value cover
 * @option Contain (letterbox, keep aspect ratio)
 * @value contain
 * @option Fill (stretch to screen)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Video Loop
 * @desc When ON the background video loops continuously. When OFF it stops on the last frame.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Video Volume
 * @desc Background video audio volume from 0 (muted) to 100 (full). Only applies when Background Type is "video".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Background Music
 * @desc Can play alongside a video background.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Music Volume
 * @desc Background music volume from 0 (silent) to 100 (full).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Music Loop
 * @desc When ON the background music loops continuously. When OFF it plays once and stops.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Title X Offset (px)
 * @desc Horizontal pixel offset of the title text from the screen center. 0 = centered.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Title Y Offset (px)
 * @desc Vertical pixel offset of the title text from the screen center. Negative = up.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Title Font Size
 * @desc Font size of the title text in pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Title Text Color
 * @desc Title text color in CSS hex.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Title Outline Width
 * @desc Outline width of the title text in pixels. 0 = no outline.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Title Outline Color
 * @desc Outline color of the title text. Supports CSS hex (#000000) or rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Sub-text X Offset (px)
 * @desc Horizontal pixel offset of the sub-text from the screen center. 0 = centered.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Sub-text Y Offset (px)
 * @desc Vertical pixel offset of the sub-text from the screen center. Negative = up.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Sub-text Font Size
 * @desc Font size of the sub-text (progress/status line) in pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Sub-text Color
 * @desc Sub-text color in CSS hex.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Sub-text Outline Width
 * @desc Outline width of the sub-text in pixels. 0 = no outline.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Sub-text Outline Color
 * @desc Outline color of the sub-text. Supports CSS hex (#000000) or rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js minimum version: 0.28.1
 * RPG MAKER MV minimum version: 1.6.0
 * RPG MAKER MZ minimum version: 1.0.0
 * 
 * Note: This plugin only supports Windows.
 * It is not available on macOS, Linux, or other platforms.
 * 
 * --- How to Deploy ---
 * 1. In RPG Maker, go to File > Deployment and deploy for Windows.
 * 2. Open the deployed folder and run the game .exe once.
 * 3. Wait — SecuPacker will automatically pack all resources.
 *    (A progress screen is shown; do not close the window.)
 * 4. Once packing finishes, the game will close on its own.
 * 5. The deployed folder is now ready to distribute.
 * 
 * Warning: If you have made any direct modifications to this file, you must set 'Packer Auto Update' to 'false' — otherwise your changes will be reverted every time you pack.
 * 
 * --- JavaScript API ---
 * The following APIs are available via SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Returns: string
 *   Desc   : Returns the SecuPacker plugin version string.
 *   Usage  : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Returns: boolean
 *   Desc   : Returns true if the game is running in packed mode.
 *   Usage  : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Returns: boolean
 *   Desc   : Returns true if Player Auto Update is enabled AND a URL is configured.
 *   Usage  : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Param  : binName (string) - filename of the split bin to check.
 *   Returns: boolean
 *   Desc   : Returns true if the split bin is accessible.
 *   Usage  : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:
 * @param Split Bin File
 * @text Split Bin File
 * @desc Output filename for this split files. Must differ from the main bin name.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Split Path Patterns
 * @desc Files or folders to pack into this split files. Folders are packed recursively. ex) img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:ja
 * @plugindesc 強力なセキュリティを提供するSecuPacker。
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text SecuPackerバージョン取得
 * @desc SecuPackerのバージョン文字列をゲーム変数に格納します。
 * 
 * @arg variableId
 * @text 変数ID
 * @type variable
 * @default 0
 * @desc バージョン文字列を格納するゲーム変数のIDです。
 * 
 * 
 * @command IsPacked
 * @text パック済み確認
 * @desc ゲームがパック済みかどうか（true/false）をゲーム変数に格納します。
 * 
 * @arg variableId
 * @text 変数ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text プレイヤー自動更新の準備確認
 * @desc プレイヤー自動更新が有効かつURLが設定されている場合 true をゲーム変数に格納します。
 * 
 * @arg variableId
 * @text 変数ID
 * @type variable
 * @default 0
 * @desc 結果を格納するゲーム変数のIDです。
 * 
 * 
 * @command IsSplitAvailable
 * @text スプリットの利用可否確認
 * @desc 分割Binファイルが利用可能かどうかをゲーム変数に格納します。
 * 
 * @arg variableId
 * @text 変数ID
 * @type variable
 * @default 0
 * @desc 結果を格納するゲーム変数のIDです。
 * 
 * @arg binName
 * @text 分割Binファイル名
 * @type string
 * @default
 * @desc 確認する分割BinのFileファイル名
 * 
 * 
 * @param General Pack Settings
 * @text パックの一般設定
 * 
 * @param Packer Auto Update
 * @text パッカー自動更新
 * @desc パック前にGitHubで更新を確認します。プラグインを変更した場合はfalseにしてください。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text ゲームバイナリ名
 * @desc パッケージ化時に作成されるバイナリファイル名（名前.拡張子）。
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text 実行時の書き込みを追跡
 * @desc テストプレイ中、他プラグインが書き込んだファイルを記録し、パック時にディスクに残します。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text 読み取り専用属性を削除
 * @desc クリーンアップ時の削除前に、ファイル/フォルダの読み取り専用属性(R)を削除します。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text ファイルパック設定
 * 
 * @param File Split
 * @text ファイル分割
 * @desc 以下のパスパターンルールにより、リソースを複数の.binファイルに分割します。
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text ファイル分割リスト
 * @desc ファイル/フォルダを別々の.binに割り当てます。対象のbinとパスパターンを指定します。
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text パック除外ファイル
 * @desc ディスクに残すファイルやフォルダ。プロジェクトルートからの相対パス（/）で指定します。
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text セキュリティ設定
 * 
 * @param Block Launch Args Whitelist
 * @text 起動引数ホワイトリスト
 * @desc リストにない引数で起動した場合、ゲームを即時終了します。空にすると全てブロックします。
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text 早期Blob解決
 * @desc Bitmap.loadレベルでパスをblob URLに変換します。カスタムURLデクリプター使用時は無効にしてください。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text チート検出を有効化
 * @desc バックグラウンドスキャナーを有効にし、ハッキングツールを検出します。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text 除外バイナリハッシュ
 * @desc 環境フィンガープリントから除外するバイナリファイル名またはフラグメント。
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Exeファイルのハッシュ化
 * @desc .exeをゲームに紐付けてセキュリティを高めます。アイコン変更などはパック前に行ってください。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text 追加設定
 * 
 * @param Block Window Resize
 * @text ウィンドウリサイズをブロック
 * @desc ウィンドウのサイズ変更を無効にします。最大化ボタンが機能しない、または非表示になる場合があります。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text F2キーをブロック（フレームレート）
 * @desc F2キーを押してフレームレート表示を見ることを禁止します。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text F4キーをブロック（フルスクリーン）
 * @desc F4キーを押してフルスクリーン/ウィンドウモードを切り替えることを禁止します。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text F5キーをブロック（再読み込み）
 * @desc F5キーを押してゲームをリフレッシュ/再読み込みすることを禁止します。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text プレイヤー自動更新設定
 * 
 * @param Player Auto Update
 * @text プレイヤー自動更新
 * @desc ゲーム起動時にGitHubリリースから自動更新します。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text プレイヤー自動更新URL
 * @desc 更新を取得するGitHubリポジトリのURL。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text プレイヤー自動更新タグ
 * @desc 指定したタグのリリースからのみ更新します。空にすると最新リリースを使用します。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text インターネット接続なしで無効化
 * @desc インターネット接続がない場合、警告を表示してゲームを終了します。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text 更新失敗時に無効化
 * @desc 更新を取得できない場合、通知を表示してゲームを終了します。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text 更新画面設定
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text 更新中テキスト
 * @desc ダウンロード中にメインタイトルとして表示されるテキスト。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text 完了テキスト
 * @desc 更新が正常に完了したときにメインタイトルとして表示されるテキスト。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text 失敗テキスト
 * @desc 更新に失敗したときにメインタイトルとして表示されるテキスト。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text 点滅エフェクト
 * @desc タイトルテキストのパルス（呼吸）不透明度アニメーションを有効にします。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text 点滅速度
 * @desc 点滅サイクルの速度。値が大きいほど速くなります。(0.050 ≈ 60fpsで約2秒/サイクル)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text 進行状況表示
 * @desc 更新中にサブテキストとしてダウンロードの割合とKB情報を表示します。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text 背景の種類
 * @desc 更新画面の背景の種類：単色・画像・動画から選択します。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option 単色
 * @value color
 * @option 画像
 * @value image
 * @option 動画
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text 背景色
 * @desc CSSのhex形式での単色背景色 (例: #000000)。背景種類が「単色」の場合に使用されます。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text 背景画像
 * @desc 背景種類が「画像」の場合に使用する背景画像ファイルです。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text 背景動画
 * @desc 背景種類が「動画」の場合に使用する動画ファイルのパスです（例: movies/bg.webm）。文字列で入力してください。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text 背景フィットモード
 * @desc 画像または動画のアスペクト比が画面と合わない場合の表示方法。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option カバー（トリミングして画面全体を埋める）
 * @value cover
 * @option コンテイン（レターボックス、アスペクト比を維持）
 * @value contain
 * @option フィル（画面に合わせて引き伸ばす）
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text 動画ループ
 * @desc ONにすると背景動画をループ再生します。OFFにすると最後のフレームで停止します。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text 動画音量
 * @desc 背景動画の音量。0（ミュート）～100（最大）。背景種類が「動画」の場合に有効。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text 背景音楽
 * @desc 動画と同時再生可能。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text 音楽音量
 * @desc 背景音楽の音量。0（無音）～100（最大）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text 音楽ループ
 * @desc ONにすると背景音楽をループ再生します。OFFにすると1回再生して停止します。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text タイトルX位置オフセット (px)
 * @desc タイトルテキストの画面中心からの水平ピクセルオフセット。0 = 中央揃え。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text タイトルY位置オフセット (px)
 * @desc タイトルテキストの画面中心からの垂直ピクセルオフセット。負の値 = 上方向。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text タイトルフォントサイズ
 * @desc タイトルテキストのフォントサイズ（ピクセル）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text タイトル文字色
 * @desc CSSのhex形式でのタイトル文字色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text タイトルアウトライン幅
 * @desc タイトルテキストのアウトライン幅（ピクセル）。0 = アウトラインなし。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text タイトルアウトライン色
 * @desc タイトルテキストのアウトライン色。CSSのhex（#000000）またはrgba(r,g,b,a)形式をサポート。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text サブテキストX位置オフセット (px)
 * @desc サブテキストの画面中心からの水平ピクセルオフセット。0 = 中央揃え。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text サブテキストY位置オフセット (px)
 * @desc サブテキストの画面中心からの垂直ピクセルオフセット。負の値 = 上方向。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text サブテキストフォントサイズ
 * @desc サブテキスト（進行状況・ステータス行）のフォントサイズ（ピクセル）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text サブテキスト色
 * @desc CSSのhex形式でのサブテキスト色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text サブテキストアウトライン幅
 * @desc サブテキストのアウトライン幅（ピクセル）。0 = アウトラインなし。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text サブテキストアウトライン色
 * @desc サブテキストのアウトライン色。CSSのhex（#000000）またはrgba(r,g,b,a)形式をサポート。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js 最小バージョン: 0.28.1
 * RPG MAKER MV 最小バージョン: 1.6.0
 * RPG MAKER MZ 最小バージョン: 1.0.0
 * 
 * ※ 本プラグインはWindows専用です。
 * macOS、Linuxなど他のプラットフォームでは使用できません。
 * 
 * --- 配布方法 ---
 * 1. RPG Makerで「ファイル」→「デプロイメント」からWindows向けに出力します。
 * 2. 出力されたフォルダを開き、ゲームの.exeを一度実行します。
 * 3. お待ちください — SecuPackerが自動的に全リソースをパックします。
 *    （進行画面が表示されます。ウィンドウを閉じないでください。）
 * 4. パックが完了すると、ゲームは自動的に終了します。
 * 5. これで出力フォルダの配布準備が整いました。
 * 
 * 注意：このファイルを直接変更した場合は、必ず'Packer Auto Update'を'false'に設定してください。
 * 
 * --- JavaScript API ---
 * 以下の API は SecuPacker を通じて利用可能です。
 * 
 * SecuPacker.getVersion()
 *   戻り値 : string
 *   説明   : SecuPacker プラグインのバージョン文字列を返します。
 *   使用法 : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   戻り値 : boolean
 *   説明   : ゲームがパックモードで動作中の場合 true を返します。
 *   使用法 : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   戻り値 : boolean
 *   説明   : 自動更新が有効かつURLが設定されている場合 true を返します。
 *   使用法 : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   引数   : binName (string) - 確認する分割 bin のファイル名。
 *   戻り値 : boolean
 *   説明   : 指定した分割 bin がアクセス可能な場合 true を返します。
 *   使用法 : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:ja
 * @param Split Bin File
 * @text 分割Binファイル
 * @desc 分割ファイルの出力名。メインのbin名とは異なる名前にする必要があります。
 * @type string
 * 
 * @param Split Path Patterns
 * @text 分割パスパターン
 * @desc このファイルにパックするファイルやフォルダ（再帰的）。 例: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:ko
 * @plugindesc 강력한 보안을 제공하는 SecuPacker.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text SecuPacker 버전 가져오기
 * @desc SecuPacker 플러그인 버전 문자열을 게임 변수에 저장합니다.
 * 
 * @arg variableId
 * @text 변수 ID
 * @type variable
 * @default 0
 * @desc 버전 문자열을 저장할 게임 변수 ID입니다.
 * 
 * 
 * @command IsPacked
 * @text 패킹 여부 확인
 * @desc 게임이 패킹되어 있는지(true) 아닌지(false)를 게임 변수에 저장합니다.
 * 
 * @arg variableId
 * @text 변수 ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text 플레이어 자동 업데이트 준비 여부 확인
 * @desc 플레이어 자동 업데이트가 활성화되어 있고 URL이 설정된 경우 true를 게임 변수에 저장합니다.
 * 
 * @arg variableId
 * @text 변수 ID
 * @type variable
 * @default 0
 * @desc 결과를 저장할 게임 변수 ID입니다.
 * 
 * 
 * @command IsSplitAvailable
 * @text 스플릿 사용 가능 여부 확인
 * @desc 분리된 bin 파일을 사용할 수 있는지 게임 변수에 저장합니다.
 * 
 * @arg variableId
 * @text 변수 ID
 * @type variable
 * @default 0
 * @desc 결과를 저장할 게임 변수 ID입니다.
 * 
 * @arg binName
 * @text 스플릿 Bin 파일명
 * @type string
 * @default
 * @desc 확인할 분리 bin 파일명.
 * 
 * 
 * @param General Pack Settings
 * @text 일반 패킹 설정
 * 
 * @param Packer Auto Update
 * @text 패커 자동 업데이트
 * @desc 패킹 전 GitHub에서 플러그인 업데이트를 확인합니다. 플러그인을 수정했다면 false로 설정하세요.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text 게임 바이너리 이름
 * @desc 패킹 시 생성될 게임 바이너리 파일명입니다 (이름.확장자).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text 런타임 쓰기 추적
 * @desc 플레이 테스트 중 다른 플러그인이 생성한 파일을 추적하여, 패킹 시 디스크에 그대로 보존합니다.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text 읽기 전용 속성 제거
 * @desc 파일 정리(삭제) 단계 전에 파일/폴더의 읽기 전용(R) 속성을 해제합니다.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text 파일 패킹 설정
 * 
 * @param File Split
 * @text 파일 분할
 * @desc 아래의 경로 패턴 규칙에 따라 리소스를 여러 .bin 파일로 나누어 패킹합니다.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text 파일 분할 목록
 * @desc 분할할 파일/폴더를 지정합니다. 각 항목마다 대상 bin 파일과 경로 패턴을 설정합니다.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text 패킹 제외 파일
 * @desc 패킹하지 않고 디스크에 남겨둘 파일/폴더입니다. 프로젝트 루트 기준 상대 경로(슬래시 /)로 입력하세요.
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text 보안 설정
 * 
 * @param Block Launch Args Whitelist
 * @text 실행 인수 허용 목록
 * @desc 게임 실행 시 이 목록에 없는 인수가 감지되면 즉시 종료됩니다. 비워두면 모든 인수를 차단합니다.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text 초기 Blob 변환
 * @desc Bitmap.load 단계에서 경로를 Blob URL로 변환합니다. 커스텀 복호화 플러그인을 쓴다면 비활성화하세요.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text 치트 탐지 활성화
 * @desc 해킹 툴을 감지하는 백그라운드 프로세스 스캐너를 켭니다.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text 바이너리 해시 제외
 * @desc 환경 지문(Fingerprint) 검사에서 제외할 바이너리 파일명이나 파일의 일부를 입력합니다.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Exe 파일 해시
 * @desc .exe 파일을 게임에 종속시켜 보안을 강화합니다. 아이콘 변경 등의 .exe 수정은 패킹 전에 적용해야 합니다.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text 추가 설정
 * 
 * @param Block Window Resize
 * @text 창 크기 변경 차단
 * @desc 플레이어가 게임 창의 크기를 조절하는 것을 막습니다. 최대화 버튼이 작동하지 않거나 사라질 수 있습니다.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text F2 키 차단 (프레임 레이트)
 * @desc 플레이어가 F2 키를 눌러 프레임 레이트 표시를 보는 것을 막습니다.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text F4 키 차단 (전체화면)
 * @desc 플레이어가 F4 키를 눌러 전체화면/창 모드를 전환하는 것을 막습니다.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text F5 키 차단 (새로고침)
 * @desc 플레이어가 F5 키를 눌러 게임을 새로고침하는 것을 막습니다.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text 플레이어 자동 업데이트 설정
 * 
 * @param Player Auto Update
 * @text 플레이어 자동 업데이트
 * @desc 게임 시작 시 GitHub 릴리스에서 업데이트를 자동으로 다운로드합니다.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text 업데이트 URL
 * @desc 업데이트를 가져올 GitHub 저장소 URL입니다.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text 업데이트 태그
 * @desc 특정 태그의 릴리스만 업데이트합니다. 최신 릴리스를 사용하려면 비워두세요.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text 인터넷 연결 필수
 * @desc 인터넷이 연결되어 있지 않으면 경고를 띄우고 게임을 종료합니다.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text 업데이트 실패 시 종료
 * @desc 업데이트를 가져오는 데 실패하면 알림을 띄우고 게임을 종료합니다.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text 업데이트 화면 설정
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text 업데이트 중 텍스트
 * @desc 다운로드 중 메인 타이틀로 표시되는 텍스트입니다.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text 완료 텍스트
 * @desc 업데이트가 성공적으로 완료되었을 때 메인 타이틀로 표시되는 텍스트입니다.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text 실패 텍스트
 * @desc 업데이트에 실패했을 때 메인 타이틀로 표시되는 텍스트입니다.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text 깜빡임 효과
 * @desc 타이틀 텍스트의 펄스(호흡) 투명도 애니메이션을 활성화합니다.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text 깜빡임 속도
 * @desc 깜빡임 주기의 속도입니다. 값이 클수록 빠릅니다. (0.050 ≈ 60fps에서 약 2초/주기)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text 진행 상황 표시
 * @desc 업데이트 중 서브 텍스트에 다운로드 퍼센트와 KB 정보를 표시합니다.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text 배경 유형
 * @desc 업데이트 화면의 배경 유형: 단색, 이미지, 동영상 중에서 선택합니다.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option 단색
 * @value color
 * @option 이미지
 * @value image
 * @option 동영상
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text 배경 색상
 * @desc CSS hex 형식의 단색 배경색 (예: #000000). 배경 유형이 "단색"일 때 사용됩니다.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text 배경 이미지
 * @desc 배경 유형이 "이미지"일 때 사용할 배경 이미지 파일입니다.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text 배경 동영상
 * @desc 배경 유형이 "동영상"일 때 사용할 동영상 파일 경로입니다. 문자열로 직접 입력하세요 (예: movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text 배경 맞춤 모드
 * @desc 이미지 또는 동영상의 비율이 화면과 맞지 않을 때 처리 방법.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option 잘라서 화면 전체 채우기
 * @value cover
 * @option 원본 비율 유지
 * @value contain
 * @option 화면에 맞게 늘리기
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text 동영상 반복
 * @desc ON이면 배경 동영상을 반복 재생합니다. OFF이면 마지막 프레임에서 멈춥니다.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text 동영상 볼륨
 * @desc 배경 동영상의 음량. 0(음소거)~100(최대). 배경 유형이 "동영상"일 때만 적용됩니다.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text 배경 음악
 * @desc 동영상과 동시 재생 가능.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text 음악 볼륨
 * @desc 배경 음악의 음량. 0(무음)~100(최대).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text 음악 반복
 * @desc ON이면 배경 음악을 반복 재생합니다. OFF이면 한 번만 재생하고 멈춥니다.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text 타이틀 X 오프셋 (px)
 * @desc 타이틀 텍스트의 화면 중앙으로부터 수평 픽셀 오프셋. 0 = 가운데.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text 타이틀 Y 오프셋 (px)
 * @desc 타이틀 텍스트의 화면 중앙으로부터 수직 픽셀 오프셋. 음수 = 위쪽.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text 타이틀 폰트 크기
 * @desc 타이틀 텍스트의 폰트 크기 (픽셀).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text 타이틀 텍스트 색상
 * @desc CSS hex 형식의 타이틀 텍스트 색상.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text 타이틀 텍스트 테두리 두께
 * @desc 타이틀 텍스트의 테두리 두께 (픽셀). 0 = 테두리 없음.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text 타이틀 텍스트 테두리 색상
 * @desc 타이틀 텍스트의 테두리 색상. CSS hex (#000000) 또는 rgba(r,g,b,a) 형식 지원.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text 서브 텍스트 X 오프셋 (px)
 * @desc 서브 텍스트의 화면 중앙으로부터 수평 픽셀 오프셋. 0 = 가운데.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text 서브 텍스트 Y 오프셋 (px)
 * @desc 서브 텍스트의 화면 중앙으로부터 수직 픽셀 오프셋. 음수 = 위쪽.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text 서브 텍스트 폰트 크기
 * @desc 서브 텍스트(진행 상황/상태 줄)의 폰트 크기 (픽셀).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text 서브 텍스트 색상
 * @desc CSS hex 형식의 서브 텍스트 색상.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text 서브 텍스트 테두리 두께
 * @desc 서브 텍스트의 테두리 두께 (픽셀). 0 = 테두리 없음.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text 서브 텍스트 테두리 색상
 * @desc 서브 텍스트의 테두리 색상. CSS hex (#000000) 또는 rgba(r,g,b,a) 형식 지원.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js 최소 요구 버전: 0.28.1
 * RPG MAKER MV 최소 요구 버전: 1.6.0
 * RPG MAKER MZ 최소 요구 버전: 1.0.0
 * 
 * ※ 이 플러그인은 Windows 전용입니다.
 * macOS, Linux 등 다른 플랫폼에서는 사용할 수 없습니다.
 * 
 * --- 배포 방법 ---
 * 1. RPG Maker에서 파일 > 배포(Deployment)로 Windows용으로 추출합니다.
 * 2. 추출된 폴더를 열고 게임 .exe를 한 번 실행합니다.
 * 3. 기다려 주세요 — SecuPacker가 자동으로 모든 리소스를 패킹합니다.
 *    (진행 화면이 표시됩니다. 창을 닫지 마세요.)
 * 4. 패킹이 완료되면 게임이 자동으로 종료됩니다.
 * 5. 이제 추출된 폴더를 그대로 배포하시면 됩니다.
 * 
 * 주의: 이 파일을 직접 수정한 내용이 있다면 반드시 'Packer Auto Update'를 'false'로 바꿔야 합니다.
 * 
 * --- JavaScript API ---
 * 다음 API는 SecuPacker를 통해 사용할 수 있습니다.
 * 
 * SecuPacker.getVersion()
 *   반환값 : string
 *   설명   : SecuPacker 플러그인 버전 문자열을 반환합니다.
 *   사용법 : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   반환값 : boolean
 *   설명   : 게임이 패킹된 상태로 실행 중이면 true를 반환합니다.
 *   사용법 : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   반환값   : boolean
 *   설명     : 자동 업데이트가 활성화되어 있고 URL이 설정된 경우 true를 반환합니다.
 *   사용법   : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   매개변수 : binName (string) - 확인할 분할 bin 파일명.
 *   반환값   : boolean
 *   설명     : 지정한 분할 bin이 접근 가능하면 true를 반환합니다.
 *   사용법   : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:ko
 * @param Split Bin File
 * @text 분할 Bin 파일명
 * @desc 분할되어 생성될 파일의 이름입니다. 기본 게임 bin 파일 이름과 달라야 합니다.
 * @type string
 * 
 * @param Split Path Patterns
 * @text 분할 경로 패턴
 * @desc 이 분할 파일에 넣을 파일이나 폴더입니다. 폴더는 하위 파일까지 전부 포함됩니다. 예) img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:de
 * @plugindesc SecuPacker, bietet starke Sicherheit.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text SecuPacker-Version abrufen
 * @desc Speichert den Versionsstring des SecuPacker-Plugins in einer Spielvariablen.
 * 
 * @arg variableId
 * @text Variablen-ID
 * @type variable
 * @default 0
 * @desc Die Spielvariablen-ID, in der der Versionsstring gespeichert wird.
 * 
 * 
 * @command IsPacked
 * @text Ist Spiel gepackt
 * @desc Speichert, ob das Spiel gepackt ist (true) oder nicht (false), in einer Spielvariablen.
 * 
 * @arg variableId
 * @text Variablen-ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Spieler-Auto-Update bereit?
 * @desc Speichert true in eine Spielvariable, wenn das Auto-Update aktiviert und eine URL konfiguriert ist.
 * 
 * @arg variableId
 * @text Variablen-ID
 * @type variable
 * @default 0
 * @desc Die Spielvariablen-ID, in der das Ergebnis gespeichert wird.
 * 
 * 
 * @command IsSplitAvailable
 * @text Ist Split verfügbar
 * @desc Speichert, ob eine aufgeteilte Bin-Datei verfügbar ist, in einer Spielvariablen.
 * 
 * @arg variableId
 * @text Variablen-ID
 * @type variable
 * @default 0
 * @desc Die Spielvariablen-ID, in der das Ergebnis gespeichert wird.
 * 
 * @arg binName
 * @text Split-Bin-Dateiname
 * @type string
 * @default
 * @desc Der Dateiname der aufgeteilten Split-Bin-Datei.
 * 
 * 
 * @param General Pack Settings
 * @text Allgemeine Pack-Einstellungen
 * 
 * @param Packer Auto Update
 * @text Packer Auto-Update
 * @desc Sucht vor dem Packen auf GitHub nach Updates. Deaktivieren, falls Sie dieses Plugin modifiziert haben.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Spiel-Binärname
 * @desc Dateiname, der beim Packen erstellt wird (Name.Endung).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Laufzeit-Schreiben erfassen
 * @desc Speichert beim Testen Dateien, die von anderen Plugins erstellt wurden. Diese bleiben beim Packen erhalten.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Schreibschutz entfernen
 * @desc Entfernt das Schreibschutz-Attribut (R) von Dateien/Ordnern vor dem Löschen beim Bereinigen.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Datei-Pack-Einstellungen
 * 
 * @param File Split
 * @text Dateiaufteilung
 * @desc Teilt Ressourcen in mehrere .bin-Dateien basierend auf den untenstehenden Pfadregeln auf.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Dateiaufteilungs-Liste
 * @desc Weist Dateien/Ordner eigenen .bin-Dateien zu. Angabe von Ziel-Bin und Pfadmustern.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Pack-Ausnahmen
 * @desc Dateien/Ordner, die auf der Festplatte bleiben sollen. Relative Pfade vom Projektverzeichnis (/).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Sicherheitseinstellungen
 * 
 * @param Block Launch Args Whitelist
 * @text Startparameter-Whitelist
 * @desc Das Spiel wird sofort beendet, wenn ein Parameter nicht in dieser Liste ist. Leer lassen, um alle zu blockieren.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Frühe Blob-Auflösung
 * @desc Konvertiert Pfade auf Bitmap.load-Ebene in Blob-URLs. Bei eigenen URL-Entschlüsselern deaktivieren.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Cheat-Erkennung aktivieren
 * @desc Aktiviert den Hintergrund-Scanner zur Erkennung von Hacking-Tools.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Ausgeschlossene Binär-Hashes
 * @desc Binärdateien oder Fragmente, die vom Umgebungs-Fingerabdruck ausgeschlossen werden.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Exe-Dateien hashen
 * @desc Bindet die .exe an das Spiel, um die Sicherheit zu erhöhen. Exe-Änderungen (Icons) vor dem Packen vornehmen.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Zusätzliche Einstellungen
 * 
 * @param Block Window Resize
 * @text Fenstergröße sperren
 * @desc Verhindert das Ändern der Spielfenstergröße. Der Maximieren-Button ist möglicherweise deaktiviert oder unsichtbar.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text F2-Taste sperren (Framerate)
 * @desc Verhindert, dass der Spieler mit F2 die Framerate-Anzeige aufruft.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text F4-Taste sperren (Vollbild)
 * @desc Verhindert, dass der Spieler mit F4 zwischen Vollbild und Fenster wechselt.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text F5-Taste sperren (Aktualisieren)
 * @desc Verhindert, dass der Spieler mit F5 das Spiel neu lädt.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Auto-Update für Spieler
 * 
 * @param Player Auto Update
 * @text Spieler Auto-Update
 * @desc Aktualisiert das Spiel beim Start automatisch über GitHub-Releases.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text Auto-Update-URL
 * @desc GitHub-Repository-URL zum Abrufen von Updates.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Auto-Update-Tag
 * @desc Aktualisiert nur von Releases mit diesem Tag. Leer lassen für das neueste Release.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Ohne Internet deaktivieren
 * @desc Zeigt eine Warnung an und beendet das Spiel, wenn keine Internetverbindung besteht.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Bei Update-Fehler deaktivieren
 * @desc Zeigt eine Benachrichtigung an und beendet das Spiel, wenn das Update fehlschlägt.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Update-Bildschirm-Einstellungen
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Text beim Aktualisieren
 * @desc Text, der während des Downloads als Haupttitel angezeigt wird.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Text bei Abschluss
 * @desc Text, der als Haupttitel angezeigt wird, wenn das Update erfolgreich abgeschlossen wurde.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Text bei Fehler
 * @desc Text, der als Haupttitel angezeigt wird, wenn das Update fehlschlägt.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Blinkeffekt
 * @desc Aktiviert die pulsierende Deckkraft-Animation des Titeltexts.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Blinkgeschwindigkeit
 * @desc Geschwindigkeit des Blinkzyklus. Höher = schneller. (0.050 ≈ 2 Sek./Zyklus bei 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Fortschritt anzeigen
 * @desc Zeigt Download-Prozentsatz und KB-Informationen im Untertext während der Aktualisierung.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Hintergrundtyp
 * @desc Hintergrundtyp für den Aktualisierungsbildschirm: Volltonfarbe, Bild oder Video.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Volltonfarbe
 * @value color
 * @option Bild
 * @value image
 * @option Video
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Hintergrundfarbe
 * @desc Volltonfarbe im CSS-Hex-Format (z.B. #000000). Wird bei Hintergrundtyp "Volltonfarbe" verwendet.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Hintergrundbild
 * @desc Hintergrundbild-Datei. Wird bei Hintergrundtyp "Bild" verwendet.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Hintergrundvideo
 * @desc Pfad zur Hintergrundvideo-Datei. Wird bei Hintergrundtyp "Video" verwendet. Als Zeichenkette eingeben (z.B. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Hintergrund-Anpassungsmodus
 * @desc Wie Bild oder Video skaliert wird, wenn das Seitenverhältnis nicht passt.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (zuschneiden, Bildschirm füllen)
 * @value cover
 * @option Contain (Letterbox, Seitenverhältnis beibehalten)
 * @value contain
 * @option Fill (strecken)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Video wiederholen
 * @desc EIN: Hintergrundvideo wird wiederholt. AUS: Stoppt am letzten Frame.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Videolautstärke
 * @desc Lautstärke des Hintergrundvideos. 0 (stumm) bis 100 (voll). Nur bei Typ "Video" wirksam.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Hintergrundmusik
 * @desc Gleichzeitig mit Video abspielbar.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Musiklautstärke
 * @desc Lautstärke der Hintergrundmusik. 0 (stumm) bis 100 (voll).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Musik wiederholen
 * @desc EIN: Hintergrundmusik wird wiederholt. AUS: Einmalige Wiedergabe, dann Stopp.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Titel X-Versatz (px)
 * @desc Horizontaler Pixelversatz des Titeltexts von der Bildschirmmitte. 0 = zentriert.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Titel Y-Versatz (px)
 * @desc Vertikaler Pixelversatz des Titeltexts von der Bildschirmmitte. Negativ = nach oben.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Titel-Schriftgröße
 * @desc Schriftgröße des Titeltexts in Pixeln.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Titeltextfarbe
 * @desc Titeltextfarbe im CSS-Hex-Format.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Titelumrandungsbreite
 * @desc Umrandungsbreite des Titeltexts in Pixel. 0 = keine Umrandung.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Titelumrandungsfarbe
 * @desc Umrandungsfarbe des Titeltexts. Unterstützt CSS hex (#000000) oder rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Untertext X-Versatz (px)
 * @desc Horizontaler Pixelversatz des Untertexts von der Bildschirmmitte. 0 = zentriert.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Untertext Y-Versatz (px)
 * @desc Vertikaler Pixelversatz des Untertexts von der Bildschirmmitte. Negativ = nach oben.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Untertext-Schriftgröße
 * @desc Schriftgröße des Untertexts (Fortschritts-/Statuszeile) in Pixeln.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Untertextfarbe
 * @desc Untertextfarbe im CSS-Hex-Format.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Untertitelumrandungsbreite
 * @desc Umrandungsbreite des Untertiteltexts in Pixel. 0 = keine Umrandung.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Untertitelumrandungsfarbe
 * @desc Umrandungsfarbe des Untertiteltexts. Unterstützt CSS hex (#000000) oder rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js Mindestversion: 0.28.1
 * RPG MAKER MV Mindestversion: 1.6.0
 * RPG MAKER MZ Mindestversion: 1.0.0
 * 
 * Hinweis: Dieses Plugin unterstützt nur Windows.
 * Es ist nicht verfügbar für macOS, Linux oder andere Plattformen.
 * 
 * --- Veröffentlichung ---
 * 1. Im RPG Maker unter Datei > Deployment für Windows exportieren.
 * 2. Den exportierten Ordner öffnen und die .exe einmal starten.
 * 3. Warten — SecuPacker packt alle Ressourcen automatisch.
 *    (Ein Fortschrittsbildschirm wird angezeigt; das Fenster nicht schließen.)
 * 4. Nach Abschluss beendet sich das Spiel automatisch.
 * 5. Der exportierte Ordner ist nun bereit zur Verteilung.
 * 
 * Warnung: Wenn Sie diese Datei direkt modifiziert haben, müssen Sie 'Packer Auto-Update' auf 'false' setzen – andernfalls werden Ihre Änderungen bei jedem Packvorgang rückgängig gemacht.
 * 
 * --- JavaScript-API ---
 * Die folgenden APIs sind über SecuPacker verfügbar.
 * 
 * SecuPacker.getVersion()
 *   Rückgabe   : string
 *   Beschr.    : Gibt die Versionszeichenkette des SecuPacker-Plugins zurück.
 *   Verwendung : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Rückgabe   : boolean
 *   Beschr.    : Gibt true zurück, wenn das Spiel im gepackten Modus läuft.
 *   Verwendung : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Rückgabe   : boolean
 *   Beschr.    : Gibt true zurück, wenn Auto-Update aktiviert und eine URL konfiguriert ist.
 *   Verwendung : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Parameter  : binName (string) - Dateiname der zu prüfenden Split-Bin.
 *   Rückgabe   : boolean
 *   Beschr.    : Gibt true zurück, wenn die Split-Bin zugänglich ist.
 *   Verwendung : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:de
 * @param Split Bin File
 * @text Fragment-Bin-Datei
 * @desc Ausgabename für diese aufgeteilten Dateien. Muss sich vom Haupt-Bin-Namen unterscheiden.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Fragment-Pfadmuster
 * @desc Dateien/Ordner, die hierin gepackt werden. Ordner sind rekursiv. Z. B.: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:es
 * @plugindesc SecuPacker, que proporciona una seguridad robusta.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Obtener versión de SecuPacker
 * @desc Almacena la cadena de versión del plugin SecuPacker en una variable del juego.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc ID de la variable del juego donde se almacenará la versión.
 * 
 * 
 * @command IsPacked
 * @text ¿Juego empaquetado?
 * @desc Almacena si el juego está empaquetado (true) o no (false) en una variable del juego.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text ¿Actualización automática lista?
 * @desc Almacena true en una variable del juego si la actualización automática está activada y configurada.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc El ID de la variable del juego en que se almacena el resultado.
 * 
 * 
 * @command IsSplitAvailable
 * @text ¿Split disponible?
 * @desc Almacena si un archivo bin dividido está disponible en una variable del juego.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc ID de la variable del juego donde se almacenará el resultado.
 * 
 * @arg binName
 * @text Nombre del archivo bin split
 * @type string
 * @default
 * @desc Nombre del archivo bin split dividido a verificar.
 * 
 * 
 * @param General Pack Settings
 * @text Configuración general de empaquetado
 * 
 * @param Packer Auto Update
 * @text Actualización automática del empaquetador
 * @desc Busca actualizaciones del plugin en GitHub antes de empaquetar. Ponlo en false si modificaste este plugin.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Nombre del binario del juego
 * @desc Nombre del archivo binario del juego a crear (nombre.extensión).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Rastrear escrituras en ejecución
 * @desc Durante el modo de prueba, registra los archivos creados por otros plugins para conservarlos al empaquetar.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Quitar atributos de solo lectura
 * @desc Quita el atributo de solo lectura (R) de archivos/carpetas antes de su eliminación durante la limpieza.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Configuración de empaquetado de archivos
 * 
 * @param File Split
 * @text División de archivos
 * @desc Permite dividir recursos en varios archivos .bin según las reglas de patrón de ruta de abajo.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Lista de división de archivos
 * @desc Asigna archivos/carpetas a archivos .bin separados. Cada entrada especifica un bin de destino y patrones.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Archivos excluidos del empaquetado
 * @desc Archivos y carpetas a conservar en el disco. Ruta relativa a la raíz del proyecto (barras diagonales /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Ajustes de seguridad
 * 
 * @param Block Launch Args Whitelist
 * @text Lista blanca de argumentos de inicio
 * @desc Si se detecta un argumento que NO está en la lista, el juego se cerrará de inmediato. Vacío para bloquear todos.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Resolución temprana de Blob
 * @desc Convierte rutas a URLs Blob en la fase Bitmap.load. Desactívalo si usas descifradores de URLs personalizados.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Activar detección de trampas
 * @desc Activa el escáner de procesos en segundo plano para detectar herramientas de piratería.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Hashes binarios excluidos
 * @desc Nombres/fragmentos de archivos binarios a excluir de la huella digital (Fingerprint) del entorno.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Hashear archivos Exe
 * @desc Vincula el .exe al juego para mayor seguridad. Aplica cambios en el .exe (como iconos) antes de empaquetar.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Ajustes adicionales
 * 
 * @param Block Window Resize
 * @text Bloquear redimensión de ventana
 * @desc Impide cambiar el tamaño de la ventana. El botón de maximizar podría no funcionar o desaparecer.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Bloquear tecla F2 (Tasa de fotogramas)
 * @desc Impide que el jugador pulse F2 para ver la tasa de fotogramas.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Bloquear tecla F4 (Pantalla completa)
 * @desc Impide que el jugador pulse F4 para alternar entre pantalla completa y modo ventana.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Bloquear tecla F5 (Actualizar)
 * @desc Impide que el jugador pulse F5 para recargar el juego.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Ajustes de actualización automática
 * 
 * @param Player Auto Update
 * @text Actualización automática
 * @desc Descarga automáticamente actualizaciones desde GitHub al iniciar el juego.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL de actualización
 * @desc URL del repositorio de GitHub desde el cual obtener las actualizaciones.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Etiqueta de actualización
 * @desc Solo actualiza desde versiones con una etiqueta específica. Déjalo vacío para usar la última versión.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Obligatorio acceso a Internet
 * @desc Muestra una alerta y sale del juego si no hay conexión a Internet.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Salir si falla la actualización
 * @desc Muestra una notificación y sale del juego si no se puede obtener la actualización.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Configuración de pantalla de actualización
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Texto al actualizar
 * @desc Texto que se muestra como título principal mientras se descarga la actualización.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Texto al completar
 * @desc Texto que se muestra como título principal cuando la actualización se completa con éxito.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Texto al fallar
 * @desc Texto que se muestra como título principal cuando la actualización falla.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Efecto parpadeo
 * @desc Activa la animación de opacidad pulsante/respiración en el texto del título.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Velocidad de parpadeo
 * @desc Velocidad del ciclo de parpadeo. Mayor = más rápido. (0.050 ≈ 2 seg./ciclo a 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Mostrar progreso
 * @desc Muestra porcentaje de descarga e información de KB en el subtexto durante la actualización.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Tipo de fondo
 * @desc Tipo de fondo para la pantalla de actualización: Color sólido, Imagen o Vídeo.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Color sólido
 * @value color
 * @option Imagen
 * @value image
 * @option Vídeo
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Color de fondo
 * @desc Color de fondo sólido en hex CSS (ej. #000000). Usado cuando el tipo de fondo es "color sólido".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Imagen de fondo
 * @desc Archivo de imagen de fondo. Usado cuando el tipo de fondo es "Imagen".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Vídeo de fondo
 * @desc Ruta del archivo de vídeo de fondo. Usado cuando el tipo es "Vídeo". Introducir como texto (ej. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Modo de ajuste del fondo
 * @desc Cómo ajustar la imagen o vídeo cuando la relación de aspecto no coincide con la pantalla.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (recortar para llenar la pantalla)
 * @value cover
 * @option Contain (letterbox, mantener relación de aspecto)
 * @value contain
 * @option Fill (estirar)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Repetición de vídeo
 * @desc Activado: el vídeo de fondo se repite. Desactivado: se detiene en el último fotograma.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Volumen del vídeo
 * @desc Volumen del vídeo de fondo. 0 (silenciado) a 100 (máximo). Solo aplica cuando el tipo es "video".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Música de fondo
 * @desc Puede sonar junto al vídeo.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Volumen de la música
 * @desc Volumen de la música de fondo. 0 (silenciado) a 100 (máximo).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Repetición de música
 * @desc Activado: la música de fondo se repite. Desactivado: se reproduce una vez y para.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Desplazamiento X del título (px)
 * @desc Desplazamiento horizontal en píxeles del título desde el centro. 0 = centrado.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Desplazamiento Y del título (px)
 * @desc Desplazamiento vertical en píxeles del título desde el centro. Negativo = arriba.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Tamaño de fuente del título
 * @desc Tamaño de fuente del texto del título en píxeles.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Color del texto del título
 * @desc Color del texto del título en hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Ancho del contorno del título
 * @desc Ancho del contorno del texto del título en píxeles. 0 = sin contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Color del contorno del título
 * @desc Color del contorno del texto del título. Admite hex CSS (#000000) o rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Desplazamiento X del subtexto (px)
 * @desc Desplazamiento horizontal en píxeles del subtexto desde el centro. 0 = centrado.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Desplazamiento Y del subtexto (px)
 * @desc Desplazamiento vertical en píxeles del subtexto desde el centro. Negativo = arriba.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Tamaño de fuente del subtexto
 * @desc Tamaño de fuente del subtexto (línea de progreso/estado) en píxeles.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Color del subtexto
 * @desc Color del subtexto en hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Ancho del contorno del subtítulo
 * @desc Ancho del contorno del subtítulo en píxeles. 0 = sin contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Color del contorno del subtítulo
 * @desc Color del contorno del subtítulo. Admite hex CSS (#000000) o rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Versión mínima de NW.js: 0.28.1
 * Versión mínima de RPG MAKER MV: 1.6.0
 * Versión mínima de RPG MAKER MZ: 1.0.0
 * 
 * Nota: Este plugin solo es compatible con Windows.
 * No está disponible para macOS, Linux u otras plataformas.
 * 
 * --- Cómo distribuir ---
 * 1. En RPG Maker, ve a Archivo > Deployment y exporta para Windows.
 * 2. Abre la carpeta exportada y ejecuta el .exe del juego una vez.
 * 3. Espera — SecuPacker empaquetará todos los recursos automáticamente.
 *    (Se muestra una pantalla de progreso; no cierres la ventana.)
 * 4. Cuando termine, el juego se cerrará solo.
 * 5. La carpeta exportada ya está lista para distribuir.
 * 
 * Advertencia: Si has realizado modificaciones directas en este archivo, debes establecer 'Packer Auto Update' en 'false' — de lo contrario, tus cambios serán revertidos cada vez que empaquetes.
 * 
 * --- API de JavaScript ---
 * Las siguientes APIs están disponibles a través de SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Ret.  : string
 *   Desc  : Devuelve la cadena de versión del plugin SecuPacker.
 *   Uso   : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Ret.  : boolean
 *   Desc  : Devuelve true si el juego está ejecutándose en modo empaquetado.
 *   Uso   : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Ret.  : boolean
 *   Desc  : Devuelve true si la actualización automática está activada y configurada.
 *   Uso   : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Param : binName (string) - nombre del archivo bin dividido a verificar.
 *   Ret.  : boolean
 *   Desc  : Devuelve true si el bin dividido es accesible.
 *   Uso   : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:es
 * @param Split Bin File
 * @text Archivo Bin del fragmento
 * @desc Nombre de archivo de salida para este fragmento. Debe ser diferente del bin principal.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Patrones de ruta de fragmento
 * @desc Archivos/carpetas a empaquetar en esta división (recursivamente). Ej: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:fr
 * @plugindesc SecuPacker, qui offre une sécurité renforcée.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Obtenir la version de SecuPacker
 * @desc Stocke la chaîne de version du plugin SecuPacker dans une variable de jeu.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc L'ID de la variable de jeu dans laquelle stocker la version.
 * 
 * 
 * @command IsPacked
 * @text Jeu empaqueté ?
 * @desc Indique si le jeu est empaqueté (true) ou non (false) dans une variable de jeu.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text MàJ auto joueur prête ?
 * @desc Stocke true dans une variable de jeu si la MàJ auto est activée et une URL est configurée.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc L'ID de la variable de jeu dans laquelle stocker le résultat.
 * 
 * 
 * @command IsSplitAvailable
 * @text Split disponible ?
 * @desc Indique si un fichier bin divisé est disponible dans une variable de jeu.
 * 
 * @arg variableId
 * @text ID de variable
 * @type variable
 * @default 0
 * @desc L'ID de la variable de jeu dans laquelle stocker le résultat.
 * 
 * @arg binName
 * @text Nom du fichier bin split
 * @type string
 * @default
 * @desc Le nom du fichier bin split divisé à vérifier.
 * 
 * 
 * @param General Pack Settings
 * @text Paramètres généraux de compression
 * 
 * @param Packer Auto Update
 * @text MàJ auto du Packer
 * @desc Vérifie les mises à jour GitHub avant la compression. Mettre sur false si vous avez modifié ce plugin.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Nom du binaire du jeu
 * @desc Nom du fichier binaire créé lors de la compression (nom.extension).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Suivre les écritures en jeu
 * @desc En test, enregistre les fichiers écrits par d'autres plugins. Lors de la compression, ils restent sur le disque.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Supprimer la lecture seule
 * @desc Retire l'attribut lecture seule (R) des fichiers/dossiers avant leur suppression lors du nettoyage.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Paramètres de compression des fichiers
 * 
 * @param File Split
 * @text Séparation des fichiers
 * @desc Permet de répartir les ressources sur plusieurs fichiers .bin selon les règles ci-dessous.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Liste de séparation
 * @desc Assigne les fichiers/dossiers à différents .bin. Indiquez le bin cible et les chemins associés.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Exclusions de compression
 * @desc Fichiers/dossiers à conserver sur le disque. Chemins relatifs à la racine du projet (slash /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Paramètres de sécurité
 * 
 * @param Block Launch Args Whitelist
 * @text Liste blanche des arguments
 * @desc Le jeu se ferme immédiatement si un argument de lancement n'est pas listé ici. Vide = bloque tout.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Résolution Blob précoce
 * @desc Convertit les chemins en URL blob au niveau Bitmap.load. Désactiver pour les décrypteurs d'URL personnalisés.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Détection de triche
 * @desc Active l'analyse en arrière-plan pour détecter les outils de piratage.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Hashes binaires exclus
 * @desc Noms ou fragments de fichiers binaires à exclure de l'empreinte de l'environnement.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Hacher les fichiers Exe
 * @desc Lie le .exe au jeu pour plus de sécurité. Appliquez les modifications du .exe (icônes) avant la compression.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Paramètres supplémentaires
 * 
 * @param Block Window Resize
 * @text Bloquer le redimensionnement
 * @desc Empêche le joueur de redimensionner la fenêtre du jeu. Le bouton Agrandir peut ne plus fonctionner ou disparaître.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Bloquer touche F2 (Fréquence d'images)
 * @desc Empêche le joueur d'appuyer sur F2 pour afficher le compteur d'images.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Bloquer touche F4 (Plein écran)
 * @desc Empêche le joueur d'appuyer sur F4 pour basculer entre plein écran et mode fenêtre.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Bloquer touche F5 (Actualiser)
 * @desc Empêche le joueur d'appuyer sur F5 pour recharger le jeu.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Paramètres de MàJ auto du joueur
 * 
 * @param Player Auto Update
 * @text MàJ auto du joueur
 * @desc Met à jour automatiquement depuis les versions GitHub au lancement du jeu.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL de MàJ auto
 * @desc URL du dépôt GitHub pour obtenir les mises à jour.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Tag de MàJ auto
 * @desc Met à jour uniquement à partir des versions portant ce tag. Laisser vide pour la dernière version.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Désactiver sans Internet
 * @desc Affiche une alerte et quitte le jeu s'il n'y a pas de connexion Internet.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Désactiver si échec de MàJ
 * @desc Affiche une notification et quitte le jeu si la mise à jour ne peut pas être récupérée.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Paramètres de l'écran de mise à jour
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Texte pendant la MàJ
 * @desc Texte affiché comme titre principal pendant le téléchargement de la mise à jour.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Texte à la fin
 * @desc Texte affiché comme titre principal lorsque la mise à jour se termine avec succès.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Texte en cas d'échec
 * @desc Texte affiché comme titre principal lorsque la mise à jour échoue.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Effet de clignotement
 * @desc Active l'animation d'opacité pulsée sur le texte du titre.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Vitesse de clignotement
 * @desc Vitesse du cycle de clignotement. Plus élevé = plus rapide. (0.050 ≈ 2 sec/cycle à 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Afficher la progression
 * @desc Affiche le pourcentage de téléchargement et les infos KB dans le sous-titre pendant la mise à jour.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Type d'arrière-plan
 * @desc Type d'arrière-plan pour l'écran de mise à jour: couleur unie, image ou vidéo.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Couleur unie
 * @value color
 * @option Image
 * @value image
 * @option Vidéo
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Couleur d'arrière-plan
 * @desc Couleur d'arrière-plan unie en hex CSS (ex. #000000). Utilisé quand le type est "couleur unie".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Image d'arrière-plan
 * @desc Fichier image d'arrière-plan. Utilisé quand le type est "Image".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Vidéo d'arrière-plan
 * @desc Chemin du fichier vidéo d'arrière-plan. Utilisé quand le type est "Vidéo". Saisir le chemin en texte (ex. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Mode d'ajustement du fond
 * @desc Comment adapter l'image ou la vidéo quand le format ne correspond pas à l'écran.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (recadrer pour remplir l'écran)
 * @value cover
 * @option Contain (letterbox, conserver le format)
 * @value contain
 * @option Fill (étirer)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Boucle vidéo
 * @desc Activé: la vidéo d'arrière-plan boucle. Désactivé: s'arrête sur la dernière image.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Volume vidéo
 * @desc Volume de la vidéo d'arrière-plan. 0 (muet) à 100 (maximum). S'applique uniquement au type "vidéo".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Musique de fond
 * @desc Jouable en même temps que la vidéo.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Volume de la musique
 * @desc Volume de la musique de fond. 0 (muet) à 100 (maximum).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Boucle musicale
 * @desc Activé: la musique de fond boucle. Désactivé: lecture unique puis arrêt.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Décalage X du titre (px)
 * @desc Décalage horizontal en pixels du titre depuis le centre. 0 = centré.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Décalage Y du titre (px)
 * @desc Décalage vertical en pixels du titre depuis le centre. Négatif = vers le haut.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Taille de police du titre
 * @desc Taille de police du texte du titre en pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Couleur du texte du titre
 * @desc Couleur du texte du titre en hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Épaisseur du contour du titre
 * @desc Épaisseur du contour du texte du titre en pixels. 0 = pas de contour.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Couleur du contour du titre
 * @desc Couleur du contour du texte du titre. Prend en charge le hex CSS (#000000) ou rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Décalage X du sous-titre (px)
 * @desc Décalage horizontal en pixels du sous-titre depuis le centre. 0 = centré.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Décalage Y du sous-titre (px)
 * @desc Décalage vertical en pixels du sous-titre depuis le centre. Négatif = vers le haut.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Taille de police du sous-titre
 * @desc Taille de police du sous-titre (ligne de progression/statut) en pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Couleur du sous-titre
 * @desc Couleur du sous-titre en hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Épaisseur du contour du sous-titre
 * @desc Épaisseur du contour du sous-texte en pixels. 0 = pas de contour.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Couleur du contour du sous-titre
 * @desc Couleur du contour du sous-texte. Prend en charge le hex CSS (#000000) ou rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Version minimale de NW.js : 0.28.1
 * Version minimale de RPG MAKER MV : 1.6.0
 * Version minimale de RPG MAKER MZ : 1.0.0
 * 
 * Remarque : Ce plugin ne fonctionne que sous Windows.
 * Il n’est pas disponible pour macOS, Linux ou d’autres plateformes.
 * 
 * --- Comment distribuer ---
 * 1. Dans RPG Maker, allez dans Fichier > Déploiement et exportez pour Windows.
 * 2. Ouvrez le dossier exporté et lancez le .exe du jeu une fois.
 * 3. Patientez — SecuPacker compressera toutes les ressources automatiquement.
 *    (Un écran de progression s'affiche ; ne fermez pas la fenêtre.)
 * 4. Une fois terminé, le jeu se fermera de lui-même.
 * 5. Le dossier exporté est maintenant prêt à être distribué.
 * 
 * Avertissement : Si vous avez apporté des modifications directes à ce fichier, vous devez définir 'Packer Auto Update' sur 'false' — sinon vos modifications seront annulées à chaque compression.
 * 
 * --- API JavaScript ---
 * Les APIs suivantes sont disponibles via SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Retour      : string
 *   Desc        : Retourne la chaîne de version du plugin SecuPacker.
 *   Utilisation : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Retour      : boolean
 *   Desc        : Retourne true si le jeu tourne en mode compressé.
 *   Utilisation : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Retour      : boolean
 *   Desc        : Retourne true si la MàJ auto est activée et une URL est configurée.
 *   Utilisation : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Paramètre   : binName (string) - nom du fichier bin divisé à vérifier.
 *   Retour      : boolean
 *   Desc        : Retourne true si le bin divisé est accessible.
 *   Utilisation : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:fr
 * @param Split Bin File
 * @text Fichier Bin fragmenté
 * @desc Nom de sortie pour ces fichiers divisés. Doit être différent du nom du bin principal.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Modèles de chemin
 * @desc Fichiers/dossiers à compresser dans ce fichier. Les dossiers sont récursifs. Ex: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:it
 * @plugindesc SecuPacker, che fornisce un'elevata sicurezza.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Ottieni versione SecuPacker
 * @desc Memorizza la stringa di versione del plugin SecuPacker in una variabile di gioco.
 * 
 * @arg variableId
 * @text ID variabile
 * @type variable
 * @default 0
 * @desc L'ID della variabile di gioco in cui memorizzare la versione.
 * 
 * 
 * @command IsPacked
 * @text Gioco pacchettizzato?
 * @desc Memorizza se il gioco è pacchettizzato (true) o meno (false) in una variabile di gioco.
 * 
 * @arg variableId
 * @text ID variabile
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Aggiornamento auto pronto?
 * @desc Memorizza true in una variabile se l'aggiornamento automatico è abilitato e una URL è configurata.
 * 
 * @arg variableId
 * @text ID variabile
 * @type variable
 * @default 0
 * @desc L'ID della variabile in cui memorizzare il risultato.
 * 
 * 
 * @command IsSplitAvailable
 * @text Split disponibile?
 * @desc Memorizza se un file bin diviso è disponibile in una variabile di gioco.
 * 
 * @arg variableId
 * @text ID variabile
 * @type variable
 * @default 0
 * @desc L'ID della variabile di gioco in cui memorizzare il risultato.
 * 
 * @arg binName
 * @text Nome file bin split
 * @type string
 * @default
 * @desc Il nome del file bin split diviso da verificare.
 * 
 * 
 * @param General Pack Settings
 * @text Impostazioni generali di compressione
 * 
 * @param Packer Auto Update
 * @text Aggiornamento automatico Packer
 * @desc Controlla gli aggiornamenti del plugin su GitHub prima della compressione. Imposta false se hai modificato il plugin.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Nome file binario del gioco
 * @desc Nome del file binario del gioco da creare durante la compressione (nome.estensione).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Traccia scritture in esecuzione
 * @desc Durante il playtest, registra i file creati da altri plugin per mantenerli sul disco durante la compressione.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Rimuovi attributi di sola lettura
 * @desc Rimuove l'attributo di sola lettura (R) da file/cartelle prima della loro eliminazione durante la pulizia.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Impostazioni compressione file
 * 
 * @param File Split
 * @text Divisione file
 * @desc Abilita la divisione delle risorse in più file .bin secondo le regole del percorso sottostanti.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Elenco divisione file
 * @desc Assegna file/cartelle a file .bin separati. Ogni voce specifica un bin di destinazione e modelli di percorso.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text File esclusi dalla compressione
 * @desc File e cartelle da conservare sul disco. Percorso relativo alla radice del progetto (barre /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Impostazioni di sicurezza
 * 
 * @param Block Launch Args Whitelist
 * @text Whitelist argomenti di avvio
 * @desc Qualsiasi argomento non presente in questa lista provocherà la chiusura immediata del gioco. Vuoto per bloccare tutto.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Risoluzione Blob anticipata
 * @desc Converte i percorsi in URL Blob a livello di Bitmap.load. Disabilita se usi decrittatori di URL personalizzati.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Abilita rilevamento trucchi
 * @desc Abilita lo scanner dei processi in background per rilevare gli strumenti di hacking.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Hash binari esclusi
 * @desc Nomi/frammenti di file binari da escludere dall'impronta (Fingerprint) dell'ambiente.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Hash dei file Exe
 * @desc Associa il file .exe al gioco per aumentare la sicurezza. Applica modifiche (es. icone) prima della compressione.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Impostazioni aggiuntive
 * 
 * @param Block Window Resize
 * @text Blocca ridimensionamento finestra
 * @desc Impedisce il ridimensionamento della finestra. Il pulsante di ingrandimento potrebbe non funzionare o scomparire.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Blocca tasto F2 (Frequenza fotogrammi)
 * @desc Impedisce al giocatore di premere F2 per visualizzare la frequenza fotogrammi.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Blocca tasto F4 (Schermo intero)
 * @desc Impedisce al giocatore di premere F4 per passare da schermo intero a finestra.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Blocca tasto F5 (Aggiorna)
 * @desc Impedisce al giocatore di premere F5 per ricaricare il gioco.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Impostazioni aggiornamento automatico
 * 
 * @param Player Auto Update
 * @text Aggiornamento automatico
 * @desc Scarica automaticamente gli aggiornamenti dalle release di GitHub all'avvio del gioco.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL aggiornamento
 * @desc URL del repository GitHub da cui recuperare gli aggiornamenti.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Tag aggiornamento
 * @desc Aggiorna solo da release con un tag specifico. Lascia vuoto per usare l'ultima release.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Internet obbligatorio
 * @desc Mostra un avviso ed esce dal gioco se non c'è connessione a Internet.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Esci se l'aggiornamento fallisce
 * @desc Mostra una notifica ed esce dal gioco se l'aggiornamento non può essere recuperato.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Impostazioni schermata di aggiornamento
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Testo durante l'aggiornamento
 * @desc Testo mostrato come titolo principale durante il download dell'aggiornamento.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Testo al completamento
 * @desc Testo mostrato come titolo principale quando l'aggiornamento si completa con successo.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Testo in caso di errore
 * @desc Testo mostrato come titolo principale quando l'aggiornamento fallisce.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Effetto lampeggio
 * @desc Attiva l'animazione di opacità pulsante sul testo del titolo.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Velocità lampeggio
 * @desc Velocità del ciclo di lampeggio. Più alto = più veloce. (0.050 ≈ 2 sec/ciclo a 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Mostra progresso
 * @desc Mostra la percentuale di download e le info KB nel sottotitolo durante l'aggiornamento.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Tipo di sfondo
 * @desc Tipo di sfondo per la schermata di aggiornamento: colore uniforme, immagine o video.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Colore uniforme
 * @value color
 * @option Immagine
 * @value image
 * @option Video
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Colore sfondo
 * @desc Colore di sfondo uniforme in hex CSS (es. #000000). Usato quando il tipo è "colore uniforme".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Immagine sfondo
 * @desc File immagine di sfondo. Usato quando il tipo è "Immagine".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Video sfondo
 * @desc Percorso del file video di sfondo. Usato quando il tipo è "Video". Inserire il percorso come testo (es. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Modalità adattamento sfondo
 * @desc Come adattare l'immagine o il video quando le proporzioni non corrispondono allo schermo.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (ritaglia per riempire lo schermo)
 * @value cover
 * @option Contain (letterbox, mantieni proporzioni)
 * @value contain
 * @option Fill (allunga)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Loop video
 * @desc Attivo: il video di sfondo è in loop. Disattivo: si ferma sull'ultimo fotogramma.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Volume video
 * @desc Volume del video di sfondo. 0 (silenzioso) a 100 (massimo). Valido solo con tipo "video".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Musica di sfondo
 * @desc Riproducibile insieme al video.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Volume musica
 * @desc Volume della musica di sfondo. 0 (silenzioso) a 100 (massimo).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Loop musica
 * @desc Attivo: la musica di sfondo è in loop. Disattivo: riproduzione singola poi stop.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Offset X titolo (px)
 * @desc Offset orizzontale in pixel del titolo dal centro. 0 = centrato.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Offset Y titolo (px)
 * @desc Offset verticale in pixel del titolo dal centro. Negativo = verso l'alto.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Dimensione font titolo
 * @desc Dimensione del font del testo del titolo in pixel.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Colore testo titolo
 * @desc Colore del testo del titolo in hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Spessore contorno titolo
 * @desc Spessore del contorno del testo del titolo in pixel. 0 = nessun contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Colore contorno titolo
 * @desc Colore del contorno del testo del titolo. Supporta hex CSS (#000000) o rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Offset X sottotitolo (px)
 * @desc Offset orizzontale in pixel del sottotitolo dal centro. 0 = centrato.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Offset Y sottotitolo (px)
 * @desc Offset verticale in pixel del sottotitolo dal centro. Negativo = verso l'alto.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Dimensione font sottotitolo
 * @desc Dimensione del font del sottotitolo (riga progressione/stato) in pixel.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Colore sottotitolo
 * @desc Colore del sottotitolo in hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Spessore contorno sottotitolo
 * @desc Spessore del contorno del sottotesto in pixel. 0 = nessun contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Colore contorno sottotitolo
 * @desc Colore del contorno del sottotesto. Supporta hex CSS (#000000) o rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Versione minima di NW.js: 0.28.1
 * Versione minima di RPG MAKER MV: 1.6.0
 * Versione minima di RPG MAKER MZ: 1.0.0
 * 
 * Nota: Questo plugin supporta solo Windows.
 * Non è disponibile per macOS, Linux o altre piattaforme.
 * 
 * --- Come distribuire ---
 * 1. In RPG Maker, vai su File > Deployment ed esporta per Windows.
 * 2. Apri la cartella esportata e avvia il file .exe del gioco una volta.
 * 3. Attendi — SecuPacker comprimerà tutte le risorse automaticamente.
 *    (Viene mostrata una schermata di avanzamento; non chiudere la finestra.)
 * 4. Al termine, il gioco si chiuderà da solo.
 * 5. La cartella esportata è ora pronta per la distribuzione.
 * 
 * Avvertenza: Se hai apportato modifiche dirette a questo file, devi impostare 'Aggiornamento automatico Packer' su 'false' — altrimenti le tue modifiche verranno ripristinate ogni volta che comprimi.
 * 
 * --- API JavaScript ---
 * Le seguenti API sono disponibili tramite SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Rit.  : string
 *   Desc  : Restituisce la stringa di versione del plugin SecuPacker.
 *   Uso   : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Rit.  : boolean
 *   Desc  : Restituisce true se il gioco è in modalità compressa.
 *   Uso   : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Rit.  : boolean
 *   Desc  : Restituisce true se l'aggiornamento automatico è abilitato e una URL è configurata.
 *   Uso   : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Param : binName (string) - nome del file bin diviso da verificare.
 *   Rit.  : boolean
 *   Desc  : Restituisce true se il bin diviso è accessibile.
 *   Uso   : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:it
 * @param Split Bin File
 * @text File Bin del frammento
 * @desc Nome del file di output per questo file diviso. Deve differire dal nome del bin principale.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Modelli di percorso del frammento
 * @desc File/cartelle da comprimere in questa divisione (ricorsivamente). Es: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:pt
 * @plugindesc SecuPacker, que fornece forte segurança.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Obter Versão do SecuPacker
 * @desc Armazena a string de versão do plugin SecuPacker em uma variável do jogo.
 * 
 * @arg variableId
 * @text ID da Variável
 * @type variable
 * @default 0
 * @desc O ID da variável do jogo onde a versão será armazenada.
 * 
 * 
 * @command IsPacked
 * @text Jogo Empacotado?
 * @desc Armazena se o jogo está empacotado (true) ou não (false) em uma variável do jogo.
 * 
 * @arg variableId
 * @text ID da Variável
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Auto-atualização pronta?
 * @desc Armazena true em uma variável do jogo se a atualização automática está ativada e uma URL está configurada.
 * 
 * @arg variableId
 * @text ID da Variável
 * @type variable
 * @default 0
 * @desc O ID da variável do jogo onde o resultado será armazenado.
 * 
 * 
 * @command IsSplitAvailable
 * @text Split disponível?
 * @desc Armazena se um arquivo bin dividido está disponível em uma variável do jogo.
 * 
 * @arg variableId
 * @text ID da Variável
 * @type variable
 * @default 0
 * @desc O ID da variável do jogo onde o resultado será armazenado.
 * 
 * @arg binName
 * @text Nome do arquivo bin split
 * @type string
 * @default
 * @desc O nome do arquivo bin split dividido a verificar.
 * 
 * 
 * @param General Pack Settings
 * @text Configurações Gerais de Empacotamento
 * 
 * @param Packer Auto Update
 * @text Atualização Automática do Empacotador
 * @desc Verifica atualizações no GitHub antes de empacotar. Defina como false se você modificou este plugin.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Nome do Binário do Jogo
 * @desc Nome do arquivo binário a ser criado durante o empacotamento (nome.extensão).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Rastrear Gravações em Execução
 * @desc Durante o teste, registra arquivos criados por outros plugins para mantê-los no disco no momento de empacotar.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Remover Atributos Somente Leitura
 * @desc Remove o atributo de somente leitura (R) de arquivos/pastas antes da exclusão durante a limpeza.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Configurações de Empacotamento de Arquivos
 * 
 * @param File Split
 * @text Divisão de Arquivos
 * @desc Permite dividir recursos em vários arquivos .bin através de padrões de caminhos abaixo.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Lista de Divisão de Arquivos
 * @desc Atribui arquivos/pastas a arquivos .bin separados. Cada entrada especifica um bin e padrões de caminhos.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Arquivos Excluídos do Empacotamento
 * @desc Arquivos e pastas a serem mantidos no disco (Caminho relativo à raiz do projeto com barras normais /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Configurações de Segurança
 * 
 * @param Block Launch Args Whitelist
 * @text Lista Branca de Argumentos de Inicialização
 * @desc Argumentos NÃO presentes nesta lista fecharão o jogo imediatamente. Deixe vazio para bloquear todos.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Resolução Inicial de Blob
 * @desc Converte caminhos para URLs Blob no nível de Bitmap.load. Desative ao usar decifradores de URL personalizados.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Ativar Detecção de Cheats
 * @desc Ativa o scanner de processos em segundo plano para detectar ferramentas de hackers.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Hashes Binários Excluídos
 * @desc Nomes/fragmentos de arquivos binários a serem excluídos da impressão digital (Fingerprint) do ambiente.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Fazer Hash de Arquivos Exe
 * @desc Vincula o .exe ao jogo para aumentar a segurança. Aplique alterações no .exe (ex. ícones) antes do empacotamento.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Configurações Adicionais
 * 
 * @param Block Window Resize
 * @text Bloquear Redimensionamento da Janela
 * @desc Impede o jogador de redimensionar a janela do jogo. O botão de maximizar pode parar de funcionar ou desaparecer.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Bloquear Tecla F2 (Taxa de Quadros)
 * @desc Impede o jogador de pressionar F2 para ver a taxa de quadros por segundo.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Bloquear Tecla F4 (Tela Cheia)
 * @desc Impede o jogador de pressionar F4 para alternar entre tela cheia e modo janela.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Bloquear Tecla F5 (Atualizar)
 * @desc Impede o jogador de pressionar F5 para recarregar o jogo.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Configurações de Atualização Automática
 * 
 * @param Player Auto Update
 * @text Atualização Automática
 * @desc Baixa automaticamente atualizações das versões do GitHub quando o jogo inicia.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL de Atualização
 * @desc URL do repositório do GitHub de onde buscar as atualizações.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Tag de Atualização
 * @desc Atualiza apenas a partir de versões com uma tag específica. Deixe vazio para usar a versão mais recente.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Internet Obrigatória
 * @desc Exibe um alerta e sai do jogo se não houver conexão com a internet.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Sair ao Falhar Atualização
 * @desc Exibe uma notificação e sai do jogo se a atualização não puder ser buscada.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Configurações da tela de atualização
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Texto ao atualizar
 * @desc Texto exibido como título principal enquanto a atualização está sendo baixada.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Texto ao concluir
 * @desc Texto exibido como título principal quando a atualização é concluída com sucesso.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Texto ao falhar
 * @desc Texto exibido como título principal quando a atualização falha.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Efeito de piscar
 * @desc Ativa a animação de opacidade pulsante no texto do título.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Velocidade do piscar
 * @desc Velocidade do ciclo de piscar. Maior = mais rápido. (0.050 ≈ 2 seg./ciclo a 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Mostrar progresso
 * @desc Exibe a porcentagem de download e informações de KB no subtexto durante a atualização.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Tipo de fundo
 * @desc Tipo de fundo para a tela de atualização: cor sólida, imagem ou vídeo.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cor sólida
 * @value color
 * @option Imagem
 * @value image
 * @option Vídeo
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Cor de fundo
 * @desc Cor de fundo sólida em hex CSS (ex. #000000). Usado quando o tipo de fundo é "cor sólida".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Imagem de fundo
 * @desc Arquivo de imagem de fundo. Usado quando o tipo de fundo é "Imagem".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Vídeo de fundo
 * @desc Caminho do arquivo de vídeo de fundo. Usado quando o tipo é "Vídeo". Inserir o caminho como texto (ex. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Modo de ajuste do fundo
 * @desc Como ajustar a imagem ou vídeo quando a proporção não corresponde à tela.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (recortar para preencher a tela)
 * @value cover
 * @option Contain (letterbox, manter proporção)
 * @value contain
 * @option Fill (esticar)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Loop de vídeo
 * @desc Ativado: o vídeo de fundo fica em loop. Desativado: para no último quadro.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Volume do vídeo
 * @desc Volume do vídeo de fundo. 0 (mudo) a 100 (máximo). Aplica-se apenas ao tipo "vídeo".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Música de fundo
 * @desc Pode tocar junto ao vídeo.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Volume da música
 * @desc Volume da música de fundo. 0 (mudo) a 100 (máximo).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Loop de música
 * @desc Ativado: a música de fundo fica em loop. Desativado: toca uma vez e para.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Deslocamento X do título (px)
 * @desc Deslocamento horizontal em pixels do título a partir do centro. 0 = centralizado.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Deslocamento Y do título (px)
 * @desc Deslocamento vertical em pixels do título a partir do centro. Negativo = para cima.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Tamanho da fonte do título
 * @desc Tamanho da fonte do texto do título em pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Cor do texto do título
 * @desc Cor do texto do título em hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Largura do contorno do título
 * @desc Largura do contorno do texto do título em pixels. 0 = sem contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Cor do contorno do título
 * @desc Cor do contorno do texto do título. Suporta hex CSS (#000000) ou rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Deslocamento X do subtexto (px)
 * @desc Deslocamento horizontal em pixels do subtexto a partir do centro. 0 = centralizado.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Deslocamento Y do subtexto (px)
 * @desc Deslocamento vertical em pixels do subtexto a partir do centro. Negativo = para cima.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Tamanho da fonte do subtexto
 * @desc Tamanho da fonte do subtexto (linha de progresso/status) em pixels.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Cor do subtexto
 * @desc Cor do subtexto em hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Largura do contorno do subtítulo
 * @desc Largura do contorno do subtítulo em pixels. 0 = sem contorno.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Cor do contorno do subtítulo
 * @desc Cor do contorno do subtítulo. Suporta hex CSS (#000000) ou rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Versão mínima do NW.js: 0.28.1
 * Versão mínima do RPG MAKER MV: 1.6.0
 * Versão mínima do RPG MAKER MZ: 1.0.0
 * 
 * Observação: Este plugin é compatível apenas com Windows.
 * Não está disponível para macOS, Linux ou outras plataformas.
 * 
 * --- Como distribuir ---
 * 1. No RPG Maker, vá em Arquivo > Deployment e exporte para Windows.
 * 2. Abra a pasta exportada e execute o .exe do jogo uma vez.
 * 3. Aguarde — o SecuPacker empacotará todos os recursos automaticamente.
 *    (Uma tela de progresso será exibida; não feche a janela.)
 * 4. Ao concluir, o jogo se fechará sozinho.
 * 5. A pasta exportada está pronta para distribuição.
 * 
 * Aviso: Se você fez modificações diretas neste arquivo, defina 'Packer Auto Update' como 'false' — caso contrário, suas alterações serão revertidas toda vez que você empacotar.
 * 
 * --- API JavaScript ---
 * As APIs a seguir estão disponíveis via SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Ret.  : string
 *   Desc  : Retorna a string de versão do plugin SecuPacker.
 *   Uso   : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Ret.  : boolean
 *   Desc  : Retorna true se o jogo está rodando no modo empacotado.
 *   Uso   : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Ret.  : boolean
 *   Desc  : Retorna true se a atualização automática está ativada e uma URL está configurada.
 *   Uso   : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Param : binName (string) - nome do arquivo bin dividido a verificar.
 *   Ret.  : boolean
 *   Desc  : Retorna true se o bin dividido está acessível.
 *   Uso   : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:pt
 * @param Split Bin File
 * @text Arquivo Bin do Fragmento
 * @desc Nome de arquivo de saída para este arquivo dividido. Deve diferir do nome do bin principal.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Padrões de Caminho do Fragmento
 * @desc Arquivos/pastas para empacotar nesta divisão (recursivamente). Ex: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:ru
 * @plugindesc SecuPacker, обеспечивающий надежную защиту.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Получить версию SecuPacker
 * @desc Сохраняет строку версии плагина SecuPacker в переменную игры.
 * 
 * @arg variableId
 * @text ID переменной
 * @type variable
 * @default 0
 * @desc ID переменной игры, в которую будет сохранена версия.
 * 
 * 
 * @command IsPacked
 * @text Игра упакована?
 * @desc Сохраняет в переменную, упакована ли игра (true) или нет (false).
 * 
 * @arg variableId
 * @text ID переменной
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Автообновление игрока готово?
 * @desc Сохраняет true в переменную, если автообновление включено и URL настроен.
 * 
 * @arg variableId
 * @text ID переменной
 * @type variable
 * @default 0
 * @desc ID переменной, в которую сохранить результат.
 * 
 * 
 * @command IsSplitAvailable
 * @text Доступен ли сплит
 * @desc Сохраняет в переменную, доступен ли сплит-bin-файл.
 * 
 * @arg variableId
 * @text ID переменной
 * @type variable
 * @default 0
 * @desc ID переменной игры, в которую будет сохранён результат.
 * 
 * @arg binName
 * @text Имя сплит-файла
 * @type string
 * @default
 * @desc Имя сплит-файла для проверки.
 * 
 * 
 * @param General Pack Settings
 * @text Общие настройки упаковки
 * 
 * @param Packer Auto Update
 * @text Автообновление упаковщика
 * @desc Проверяет обновления на GitHub перед упаковкой. Отключите, если вы изменили этот плагин.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Имя бинарного файла игры
 * @desc Имя файла, создаваемого при упаковке (имя.расширение).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Отслеживать запись файлов
 * @desc Во время тестов записывает файлы от других плагинов. При упаковке они остаются на диске.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Снять атрибут "Только чтение"
 * @desc Удаляет атрибут (R) перед удалением файлов/папок при очистке.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text Настройки упаковки файлов
 * 
 * @param File Split
 * @text Разделение файлов
 * @desc Позволяет разделить ресурсы на несколько файлов .bin по указанным ниже правилам.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Список разделения файлов
 * @desc Распределяет файлы/папки по разным .bin. Укажите целевой bin и шаблоны путей.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Исключения из упаковки
 * @desc Файлы/папки, которые останутся на диске. Относительные пути от корня проекта (через /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text Настройки безопасности
 * 
 * @param Block Launch Args Whitelist
 * @text Белый список аргументов запуска
 * @desc Аргумент запуска не из этого списка мгновенно закроет игру. Оставьте пустым, чтобы заблокировать все.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Раннее разрешение Blob
 * @desc Преобразует пути в blob URL на уровне Bitmap.load. Отключите для кастомных дешифраторов URL.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Обнаружение читов
 * @desc Включает фоновый сканер для поиска хакерских утилит.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Исключенные хэши бинарников
 * @desc Имена бинарных файлов/фрагментов, исключаемые из отпечатка окружения.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Хэшировать Exe файлы
 * @desc Привязывает .exe к игре для защиты. Изменяйте .exe (например, иконки) до упаковки.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text Дополнительные настройки
 * 
 * @param Block Window Resize
 * @text Блокировать изменение размера окна
 * @desc Запрещает игроку изменять размер окна игры. Кнопка максимизации может перестать работать или исчезнуть.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Блокировать клавишу F2 (FPS)
 * @desc Запрещает игроку нажимать F2 для просмотра счётчика кадров.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Блокировать клавишу F4 (Полный экран)
 * @desc Запрещает игроку нажимать F4 для переключения полного экрана/оконного режима.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Блокировать клавишу F5 (Перезагрузка)
 * @desc Запрещает игроку нажимать F5 для перезагрузки игры.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Настройки автообновления игрока
 * 
 * @param Player Auto Update
 * @text Автообновление игрока
 * @desc Автоматически обновляет игру с релизов GitHub при запуске.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL автообновления
 * @desc URL репозитория GitHub для загрузки обновлений.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Тег автообновления
 * @desc Обновления только с конкретным тегом. Оставьте пустым для последнего релиза.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Отключить без интернета
 * @desc Показывает предупреждение и закрывает игру при отсутствии сети.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Отключить при ошибке
 * @desc Показывает уведомление и закрывает игру при ошибке скачивания обновления.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Настройки экрана обновления
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Текст при обновлении
 * @desc Текст, отображаемый в качестве главного заголовка во время загрузки обновления.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Текст при завершении
 * @desc Текст, отображаемый в качестве главного заголовка при успешном завершении обновления.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Текст при ошибке
 * @desc Текст, отображаемый в качестве главного заголовка при сбое обновления.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Эффект мигания
 * @desc Включает анимацию пульсирующей прозрачности текста заголовка.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Скорость мигания
 * @desc Скорость цикла мигания. Выше = быстрее. (0.050 ≈ 2 сек/цикл при 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Показать прогресс
 * @desc Показывает процент загрузки и информацию в КБ в подтексте во время обновления.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Тип фона
 * @desc Тип фона для экрана обновления: однотонный цвет, изображение или видео.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Однотонный цвет
 * @value color
 * @option Изображение
 * @value image
 * @option Видео
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Цвет фона
 * @desc Однотонный цвет фона в формате CSS hex (напр. #000000). Используется при типе "однотонный цвет".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Изображение фона
 * @desc Файл фонового изображения. Используется при типе «Изображение».
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Фоновое видео
 * @desc Путь к файлу фонового видео. Используется при типе «Видео». Введите путь как строку (напр. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Режим вписывания фона
 * @desc Как масштабировать изображение или видео, если соотношение сторон не совпадает с экраном.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (обрезать для заполнения экрана)
 * @value cover
 * @option Contain (letterbox, сохранять пропорции)
 * @value contain
 * @option Fill (растянуть)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Зацикливание видео
 * @desc Вкл: фоновое видео воспроизводится по кругу. Выкл: останавливается на последнем кадре.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Громкость видео
 * @desc Громкость фонового видео. 0 (тихо) — 100 (максимум). Применяется только при типе «видео».
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Фоновая музыка
 * @desc Можно совмещать с видео.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Громкость музыки
 * @desc Громкость фоновой музыки. 0 (тихо) — 100 (максимум).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Зацикливание музыки
 * @desc Вкл: фоновая музыка воспроизводится по кругу. Выкл: однократное воспроизведение и стоп.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text X-смещение заголовка (px)
 * @desc Горизонтальное смещение заголовка в пикселях от центра экрана. 0 = по центру.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Y-смещение заголовка (px)
 * @desc Вертикальное смещение заголовка в пикселях от центра экрана. Отрицательное = вверх.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Размер шрифта заголовка
 * @desc Размер шрифта текста заголовка в пикселях.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Цвет текста заголовка
 * @desc Цвет текста заголовка в формате CSS hex.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Толщина обводки заголовка
 * @desc Толщина обводки текста заголовка в пикселях. 0 = без обводки.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Цвет обводки заголовка
 * @desc Цвет обводки текста заголовка. Поддерживается CSS hex (#000000) или rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text X-смещение подзаголовка (px)
 * @desc Горизонтальное смещение подзаголовка в пикселях от центра экрана. 0 = по центру.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Y-смещение подзаголовка (px)
 * @desc Вертикальное смещение подзаголовка в пикселях от центра экрана. Отрицательное = вверх.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Размер шрифта подзаголовка
 * @desc Размер шрифта подзаголовка (строка прогресса/статуса) в пикселях.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Цвет подзаголовка
 * @desc Цвет подзаголовка в формате CSS hex.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Толщина обводки подзаголовка
 * @desc Толщина обводки подтекста в пикселях. 0 = без обводки.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Цвет обводки подзаголовка
 * @desc Цвет обводки подтекста. Поддерживается CSS hex (#000000) или rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Минимальная версия NW.js: 0.28.1
 * Минимальная версия RPG MAKER MV: 1.6.0
 * Минимальная версия RPG MAKER MZ: 1.0.0
 * 
 * Примечание: Этот плагин работает только на Windows.
 * Не поддерживается на macOS, Linux и других платформах.
 * 
 * --- Как распространять ---
 * 1. В RPG Maker выберите Файл > Развёртывание и экспортируйте для Windows.
 * 2. Откройте папку экспорта и запустите .exe игры один раз.
 * 3. Подождите — SecuPacker автоматически упакует все ресурсы.
 *    (Отображается экран прогресса; не закрывайте окно.)
 * 4. По завершении игра закроется сама.
 * 5. Папка экспорта готова к распространению.
 * 
 * Предупреждение: Если вы вносили какие-либо прямые изменения в этот файл, необходимо установить для 'Packer Auto Update' значение 'false' — иначе ваши изменения будут отменяться при каждой упаковке.
 * 
 * --- JavaScript API ---
 * Следующие API доступны через SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Возврат       : string
 *   Описание      : Возвращает строку версии плагина SecuPacker.
 *   Использование : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Возврат       : boolean
 *   Описание      : Возвращает true, если игра запущена в упакованном режиме.
 *   Использование : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Возврат       : boolean
 *   Описание      : Возвращает true, если автообновление включено и URL настроен.
 *   Использование : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Параметр      : binName (string) - имя файла разделённого bin для проверки.
 *   Возврат       : boolean
 *   Описание      : Возвращает true, если разделённый bin доступен.
 *   Использование : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:ru
 * @param Split Bin File
 * @text Файл сегмента Bin
 * @desc Имя выходного файла для этой части. Должно отличаться от основного bin.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Шаблоны путей сегмента
 * @desc Файлы/папки для упаковки в этот файл (папки рекурсивно). Пример: img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:zh
 * @plugindesc 提供强大安全保护的 SecuPacker。
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text 获取 SecuPacker 版本
 * @desc 将 SecuPacker 插件版本字符串存储到游戏变量中。
 * 
 * @arg variableId
 * @text 变量 ID
 * @type variable
 * @default 0
 * @desc 用于存储版本字符串的游戏变量 ID。
 * 
 * 
 * @command IsPacked
 * @text 游戏是否已打包
 * @desc 将游戏是否已打包（true/false）存储到游戏变量中。
 * 
 * @arg variableId
 * @text 变量 ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text 玩家自动更新是否就绪
 * @desc 若玩家自动更新已启用且设置了URL则将 true 存入游戏变量。
 * 
 * @arg variableId
 * @text 变量 ID
 * @type variable
 * @default 0
 * @desc 用于存储结果的游戏变量 ID。
 * 
 * 
 * @command IsSplitAvailable
 * @text 分片是否可用
 * @desc 将分片 bin 文件是否可用存储到游戏变量中。
 * 
 * @arg variableId
 * @text 变量 ID
 * @type variable
 * @default 0
 * @desc 用于存储结果的游戏变量 ID。
 * 
 * @arg binName
 * @text 分片 Bin 文件名
 * @type string
 * @default
 * @desc 要检查的分片 bin 文件名（例如：game1.bin）。
 * 
 * 
 * @param General Pack Settings
 * @text 常规打包设置
 * 
 * @param Packer Auto Update
 * @text 打包器自动更新
 * @desc 打包前检查GitHub上的插件更新。如果您修改了此插件，请设置为false。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text 游戏二进制文件名
 * @desc 打包时生成的游戏二进制文件名（名称.扩展名）。
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text 跟踪运行时写入
 * @desc 在游戏测试期间，记录其他插件写入的文件。打包时，这些文件将保留在磁盘上。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text 移除只读属性
 * @desc 在清理删除之前，移除文件/文件夹的只读(R)属性。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text 文件打包设置
 * 
 * @param File Split
 * @text 文件分割
 * @desc 根据下方的路径模式规则，将资源分割到多个 .bin 文件中。
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text 文件分割列表
 * @desc 将文件/文件夹分配到不同的 .bin 文件中。每个条目指定目标bin和路径模式。
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text 打包排除文件
 * @desc 不打包并保留在磁盘上的文件和文件夹。请输入相对于项目根目录的路径（正斜杠 /）。
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text 安全设置
 * 
 * @param Block Launch Args Whitelist
 * @text 启动参数白名单
 * @desc 如果启动时存在不在该列表中的参数，游戏将立即退出。留空则拦截所有参数。
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text 早期 Blob 解析
 * @desc 在 Bitmap.load 阶段将路径转换为 Blob URL。如果使用自定义URL读取解密器，请禁用此项。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text 启用作弊检测
 * @desc 启用后台进程扫描器以检测黑客工具。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text 排除的二进制哈希
 * @desc 从环境指纹（Fingerprint）检查中排除的二进制文件名或片段。
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Exe 文件哈希
 * @desc 将 .exe 文件与游戏绑定以提高安全性。在打包前请应用对 .exe 的任何更改（如更改图标）。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text 附加设置
 * 
 * @param Block Window Resize
 * @text 锁定窗口大小
 * @desc 阻止玩家调整游戏窗口大小。最大化按钮可能失效或消失。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text 屏蔽 F2 键（帧率显示）
 * @desc 阻止玩家按 F2 键查看帧率显示。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text 屏蔽 F4 键（全屏切换）
 * @desc 阻止玩家按 F4 键在全屏与窗口模式间切换。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text 屏蔽 F5 键（刷新）
 * @desc 阻止玩家按 F5 键刷新/重新加载游戏。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text 播放器自动更新设置
 * 
 * @param Player Auto Update
 * @text 播放器自动更新
 * @desc 游戏启动时自动从 GitHub 版本发布中获取更新。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text 更新 URL
 * @desc 获取更新的 GitHub 仓库 URL。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text 更新标签
 * @desc 仅更新特定标签的版本发布。留空以使用最新版本。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text 必须连接互联网
 * @desc 如果没有网络连接，将显示警告并退出游戏。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text 更新失败时退出
 * @desc 如果无法获取更新，将显示通知并退出游戏。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text 更新界面设置
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text 更新中文字
 * @desc 下载更新时显示为主标题的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text 完成文字
 * @desc 更新成功完成时显示为主标题的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text 失败文字
 * @desc 更新失败时显示为主标题的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text 闪烁效果
 * @desc 启用标题文字的脉冲（呼吸）透明度动画。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text 闪烁速度
 * @desc 闪烁周期的速度。值越大越快。(0.050 ≈ 60fps下约2秒/周期)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text 显示进度
 * @desc 更新时在副文字中显示下载百分比和KB信息。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text 背景类型
 * @desc 更新界面的背景类型：纯色、图片或视频。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option 纯色
 * @value color
 * @option 图片
 * @value image
 * @option 视频
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text 背景颜色
 * @desc CSS hex格式的纯色背景色（例：#000000）。背景类型为"纯色"时使用。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text 背景图片
 * @desc 背景图片文件。背景类型为“图片”时使用。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text 背景视频
 * @desc 背景视频文件路径。背景类型为“视频”时使用。请以字符串形式输入路径（例：movies/bg.webm）。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text 背景适应模式
 * @desc 当图片或视频的宽高比与屏幕不一致时的处理方式。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover（裁剪以填满屏幕）
 * @value cover
 * @option Contain（信箱模式，保持原始比例）
 * @value contain
 * @option Fill（拉伸至屏幕大小）
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text 视频循环
 * @desc 开启时背景视频将循环播放。关闭时将在最后一帧停止。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text 视频音量
 * @desc 背景视频的音量。0（静音）到100（最大）。仅在背景类型为“视频”时有效。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text 背景音乐
 * @desc 可与视频同时播放。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text 音乐音量
 * @desc 背景音乐的音量。0（静音）到100（最大）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text 音乐循环
 * @desc 开启时背景音乐将循环播放。关闭时播放一次后停止。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text 标题X偏移量 (px)
 * @desc 标题文字相对于屏幕中心的水平像素偏移量。0 = 居中。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text 标题Y偏移量 (px)
 * @desc 标题文字相对于屏幕中心的垂直像素偏移量。负值 = 向上。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text 标题字体大小
 * @desc 标题文字的字体大小（像素）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text 标题文字颜色
 * @desc CSS hex格式的标题文字颜色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text 标题描边宽度
 * @desc 标题文字描边宽度（像素）。0 = 无描边。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text 标题描边颜色
 * @desc 标题文字的描边颜色。支持CSS hex（#000000）或rgba(r,g,b,a)格式。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text 副文字X偏移量 (px)
 * @desc 副文字相对于屏幕中心的水平像素偏移量。0 = 居中。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text 副文字Y偏移量 (px)
 * @desc 副文字相对于屏幕中心的垂直像素偏移量。负值 = 向上。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text 副文字字体大小
 * @desc 副文字（进度/状态行）的字体大小（像素）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text 副文字颜色
 * @desc CSS hex格式的副文字颜色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text 副文本描边宽度
 * @desc 副文字描边宽度（像素）。0 = 无描边。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text 副文本描边颜色
 * @desc 副文字的描边颜色。支持CSS hex（#000000）或rgba(r,g,b,a)格式。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js 最低版本要求: 0.28.1
 * RPG MAKER MV 最低版本要求: 1.6.0
 * RPG MAKER MZ 最低版本要求: 1.0.0
 * 
 * 注意：本插件仅支持 Windows 平台。
 * 不可用于 macOS、Linux 或其他操作系统。
 * 
 * --- 如何发布 ---
 * 1. 在 RPG Maker 中，选择 文件 > 部署，导出为 Windows 版本。
 * 2. 打开导出的文件夹，运行游戏 .exe 一次。
 * 3. 请等待 — SecuPacker 会自动打包所有资源。
 *    （会显示进度画面，请不要关闭窗口。）
 * 4. 打包完成后，游戏会自动关闭。
 * 5. 导出的文件夹现在可以直接分发了。
 * 
 * 警告：如果您对该文件进行了直接修改，必须将 'Packer Auto Update' 设置为 'false'——否则每次打包时您的修改都会被还原。
 * 
 * --- JavaScript API ---
 * 以下 API 可通过 SecuPacker 调用。
 * 
 * SecuPacker.getVersion()
 *   返回 : string
 *   说明 : 返回 SecuPacker 插件版本字符串。
 *   用法 : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   返回 : boolean
 *   说明 : 若游戏以打包模式运行则返回 true。
 *   用法 : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   返回 : boolean
 *   说明 : 若玩家自动更新已启用且设置了URL则返回 true。
 *   用法 : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   参数 : binName (string) - 要检查的分割 bin 文件名。
 *   返回 : boolean
 *   说明 : 若指定的分割 bin 可访问则返回 true。
 *   用法 : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:zh
 * @param Split Bin File
 * @text 分割 Bin 文件名
 * @desc 此分割文件的输出文件名。必须与主 bin 名称不同。
 * @type string
 * 
 * @param Split Path Patterns
 * @text 分割路径模式
 * @desc 要打包到此分割文件中的文件或文件夹。文件夹将被递归打包。例：img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:zh-TW
 * @plugindesc 提供強大安全保護的 SecuPacker。
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text 取得 SecuPacker 版本
 * @desc 將 SecuPacker 插件版本字串儲存到遊戲變數中。
 * 
 * @arg variableId
 * @text 變數 ID
 * @type variable
 * @default 0
 * @desc 用於儲存版本字串的遊戲變數 ID。
 * 
 * 
 * @command IsPacked
 * @text 遊戲是否已封包
 * @desc 將遊戲是否已封包（true/false）儲存到遊戲變數中。
 * 
 * @arg variableId
 * @text 變數 ID
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text 玩家自動更新是否就緒
 * @desc 若玩家自動更新已啟用且設定了URL則將 true 存入遊戲變數。
 * 
 * @arg variableId
 * @text 變數 ID
 * @type variable
 * @default 0
 * @desc 用於儲存結果的遊戲變數 ID。
 * 
 * 
 * @command IsSplitAvailable
 * @text 分片是否可用
 * @desc 將分片 bin 檔案是否可用儲存到遊戲變數中。
 * 
 * @arg variableId
 * @text 變數 ID
 * @type variable
 * @default 0
 * @desc 用於儲存結果的遊戲變數 ID。
 * 
 * @arg binName
 * @text 分片 Bin 檔名
 * @type string
 * @default
 * @desc 要檢查的分片 bin 檔名（例如：game1.bin）。
 * 
 * 
 * @param General Pack Settings
 * @text 一般打包設定
 * 
 * @param Packer Auto Update
 * @text 打包器自動更新
 * @desc 打包前檢查GitHub上的插件更新。如果您修改了此插件，請設定為false。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text 遊戲二進位檔名
 * @desc 打包時生成的遊戲二進位檔名（名稱.副檔名）。
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text 追蹤執行階段寫入
 * @desc 在遊戲測試期間，記錄其他插件寫入的檔案。打包時，這些檔案將保留在磁碟上。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text 移除唯讀屬性
 * @desc 在清理刪除之前，移除檔案/資料夾的唯讀(R)屬性。
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param File Packing Settings
 * @text 檔案打包設定
 * 
 * @param File Split
 * @text 檔案分割
 * @desc 根據下方的路徑模式規則，將資源分割到多個 .bin 檔案中。
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text 檔案分割列表
 * @desc 將檔案/資料夾分配到不同的 .bin 檔案中。每個項目指定目標bin和路徑模式。
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text 打包排除檔案
 * @desc 不打包並保留在磁碟上的檔案和資料夾。請輸入相對於專案根目錄的路徑（正斜線 /）。
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * 
 * @param Security Settings
 * @text 安全設定
 * 
 * @param Block Launch Args Whitelist
 * @text 啟動參數白名單
 * @desc 如果啟動時存在不在該列表中的參數，遊戲將立即退出。留空則攔截所有參數。
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text 早期 Blob 解析
 * @desc 在 Bitmap.load 階段將路徑轉換為 Blob URL。如果使用自訂URL讀取解密器，請停用此項。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text 啟用作弊檢測
 * @desc 啟用後台處理程序掃描器以檢測駭客工具。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text 排除的二進位雜湊
 * @desc 從環境指紋（Fingerprint）檢查中排除的二進位檔名或片段。
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Exe 檔案雜湊
 * @desc 將 .exe 檔案與遊戲綁定以提高安全性。在打包前請套用對 .exe 的任何更改（如更改圖示）。
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * 
 * @param Additional Settings
 * @text 附加設定
 * 
 * @param Block Window Resize
 * @text 鎖定視窗大小
 * @desc 阻止玩家調整遊戲視窗大小。最大化按鈕可能失效或消失。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text 封鎖 F2 鍵（幀率顯示）
 * @desc 阻止玩家按 F2 鍵查看幀率顯示。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text 封鎖 F4 鍵（全螢幕切換）
 * @desc 阻止玩家按 F4 鍵在全螢幕與視窗模式間切換。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text 封鎖 F5 鍵（重新整理）
 * @desc 阻止玩家按 F5 鍵重新整理/重載遊戲。
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text 播放器自動更新設定
 * 
 * @param Player Auto Update
 * @text 播放器自動更新
 * @desc 遊戲啟動時自動從 GitHub 發布版本中取得更新。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text 更新 URL
 * @desc 取得更新的 GitHub 儲存庫 URL。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text 更新標籤
 * @desc 僅更新特定標籤的發布版本。留空以使用最新版本。
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text 必須連接網路
 * @desc 如果沒有網路連接，將顯示警告並退出遊戲。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text 更新失敗時退出
 * @desc 如果無法取得更新，將顯示通知並退出遊戲。
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text 更新畫面設定
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text 更新中文字
 * @desc 下載更新時顯示為主標題的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text 完成文字
 * @desc 更新成功完成時顯示為主標題的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text 失敗文字
 * @desc 更新失敗時顯示為主標題的文字。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text 閃爍效果
 * @desc 啟用標題文字的脈衝（呼吸）透明度動畫。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text 閃爍速度
 * @desc 閃爍週期的速度。值越大越快。(0.050 ≈ 60fps下約2秒/週期)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text 顯示進度
 * @desc 更新時在副文字中顯示下載百分比和KB資訊。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text 背景類型
 * @desc 更新畫面的背景類型：純色、圖片或影片。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option 純色
 * @value color
 * @option 圖片
 * @value image
 * @option 影片
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text 背景顏色
 * @desc CSS hex格式的純色背景色（例：#000000）。背景類型為「純色」時使用。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text 背景圖片
 * @desc 背景圖片檔案。背景類型為「圖片」時使用。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text 背景影片
 * @desc 背景影片檔案路徑。背景類型為「影片」時使用。請以字串形式輸入路徑（例：movies/bg.webm）。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text 背景適應模式
 * @desc 當圖片或影片的長寬比與螢幕不一致時的處理方式。
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover（裁切以填滿螢幕）
 * @value cover
 * @option Contain（信箱模式，保持原始比例）
 * @value contain
 * @option Fill（拉伸至螢幕大小）
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text 影片循環
 * @desc 開啟時背景影片將循環播放。關閉時將於最後一幀停止。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text 影片音量
 * @desc 背景影片的音量。0（靜音）到100（最大）。僅在背景類型為「影片」時有效。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text 背景音樂
 * @desc 可與影片同時播放。
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text 音樂音量
 * @desc 背景音樂的音量。0（靜音）到100（最大）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text 音樂循環
 * @desc 開啟時背景音樂將循環播放。關閉時播放一次後停止。
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text 標題X偏移量 (px)
 * @desc 標題文字相對於螢幕中心的水平像素偏移量。0 = 置中。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text 標題Y偏移量 (px)
 * @desc 標題文字相對於螢幕中心的垂直像素偏移量。負值 = 向上。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text 標題字體大小
 * @desc 標題文字的字體大小（像素）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text 標題文字顏色
 * @desc CSS hex格式的標題文字顏色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text 標題描邊寬度
 * @desc 標題文字描邊寬度（像素）。0 = 無描邊。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text 標題描邊顏色
 * @desc 標題文字的描邊顏色。支援CSS hex（#000000）或rgba(r,g,b,a)格式。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text 副文字X偏移量 (px)
 * @desc 副文字相對於螢幕中心的水平像素偏移量。0 = 置中。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text 副文字Y偏移量 (px)
 * @desc 副文字相對於螢幕中心的垂直像素偏移量。負值 = 向上。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text 副文字字體大小
 * @desc 副文字（進度/狀態行）的字體大小（像素）。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text 副文字顏色
 * @desc CSS hex格式的副文字顏色。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text 副文字描邊寬度
 * @desc 副文字描邊寬度（像素）。0 = 無描邊。
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text 副文字描邊顏色
 * @desc 副文字的描邊顏色。支援CSS hex（#000000）或rgba(r,g,b,a)格式。
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * NW.js 最低版本要求: 0.28.1
 * RPG MAKER MV 最低版本要求: 1.6.0
 * RPG MAKER MZ 最低版本要求: 1.0.0
 * 
 * 注意：本外掛僅支援 Windows 平台。
 * 不可用於 macOS、Linux 或其他作業系統。
 * 
 * --- 如何發佈 ---
 * 1. 在 RPG Maker 中，選擇 檔案 > 部署，匯出為 Windows 版本。
 * 2. 開啟匯出的資料夾，執行遊戲 .exe 一次。
 * 3. 請等待 — SecuPacker 會自動打包所有資源。
 *    （會顯示進度畫面，請不要關閉視窗。）
 * 4. 打包完成後，遊戲會自動關閉。
 * 5. 匯出的資料夾現在可以直接發佈了。
 * 
 * 警告：如果您對該檔案進行了直接修改，必須將 'Packer Auto Update' 設定為 'false'——否則每次封包時您的修改都會被還原。
 * 
 * --- JavaScript API ---
 * 以下 API 可透過 SecuPacker 呼叫。
 * 
 * SecuPacker.getVersion()
 *   回傳 : string
 *   說明 : 回傳 SecuPacker 外掛版本字串。
 *   用法 : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   回傳 : boolean
 *   說明 : 若遊戲以打包模式執行則回傳 true。
 *   用法 : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   回傳 : boolean
 *   說明 : 若玩家自動更新已啟用且設定了URL則回傳 true。
 *   用法 : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   參數 : binName (string) - 要檢查的分割 bin 檔名。
 *   回傳 : boolean
 *   說明 : 若指定的分割 bin 可存取則回傳 true。
 *   用法 : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:zh-TW
 * @param Split Bin File
 * @text 分割 Bin 檔名
 * @desc 此分割檔案的輸出檔名。必須與主 bin 名稱不同。
 * @type string
 * 
 * @param Split Path Patterns
 * @text 分割路徑模式
 * @desc 要打包到此分割檔案中的檔案或資料夾。資料夾將被遞迴打包。例：img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

/*:pl
 * @plugindesc SecuPacker, zapewniający silne zabezpieczenia.
 * @target MV MZ
 * @author Churitoring
 * 
 * 
 * @command GetVersion
 * @text Pobierz wersję SecuPacker
 * @desc Przechowuje ciąg wersji wtyczki SecuPacker w zmiennej gry.
 * 
 * @arg variableId
 * @text ID zmiennej
 * @type variable
 * @default 0
 * @desc ID zmiennej gry, w której zostanie zapisana wersja.
 * 
 * 
 * @command IsPacked
 * @text Czy gra jest spakowana?
 * @desc Przechowuje informację, czy gra jest spakowana (true) czy nie (false) w zmiennej gry.
 * 
 * @arg variableId
 * @text ID zmiennej
 * @type variable
 * @default 0
 * 
 * 
 * @command IsPlayerAutoUpdateReady
 * @text Gotowość auto-aktualizacji?
 * @desc Zapisuje true do zmiennej, jeśli auto-aktualizacja jest włączona i skonfigurowana.
 * 
 * @arg variableId
 * @text ID zmiennej
 * @type variable
 * @default 0
 * @desc ID zmiennej gry, w której zapisać wynik.
 * 
 * 
 * @command IsSplitAvailable
 * @text Czy split jest dostępny?
 * @desc Przechowuje informację, czy podzielony plik bin jest dostępny, w zmiennej gry.
 * 
 * @arg variableId
 * @text ID zmiennej
 * @type variable
 * @default 0
 * @desc ID zmiennej gry, w której zostanie zapisany wynik.
 * 
 * @arg binName
 * @text Nazwa pliku bin splitu
 * @type string
 * @default
 * @desc Nazwa pliku bin splitu do sprawdzenia.
 * 
 * 
 * @param General Pack Settings
 * @text Ogólne ustawienia pakowania
 * 
 * @param Packer Auto Update
 * @text Autoupdate Packera
 * @desc Sprawdza GitHub przed pakowaniem. Ustaw na false, jeśli zmodyfikowałeś wtyczkę.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Game Binary Name
 * @text Nazwa pliku binarnego
 * @desc Nazwa pliku tworzonego podczas pakowania (nazwa.rozszerzenie).
 * @parent General Pack Settings
 * @type string
 * @default game.bin
 * 
 * @param Track Runtime Writes
 * @text Śledź zapis w trakcie gry
 * @desc Zapisuje pliki tworzone przez inne wtyczki podczas testów, zostawiając je na dysku po spakowaniu.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param Strip Read-Only Attributes
 * @text Usuń atrybut tylko do odczytu
 * @desc Usuwa atrybut (R) z plików przed ich usunięciem w trakcie czyszczenia.
 * @parent General Pack Settings
 * @type boolean
 * @default true
 * 
 * @param File Packing Settings
 * @text Ustawienia pakowania plików
 * 
 * @param File Split
 * @text Dzielenie plików
 * @desc Pozwala na podział zasobów na kilka plików .bin na podstawie poniższych reguł.
 * @parent File Packing Settings
 * @type boolean
 * @default true
 * 
 * @param File Split List
 * @text Lista podziału plików
 * @desc Przypisuje pliki/foldery do osobnych .bin. Określ docelowy bin i wzorce ścieżek.
 * @parent File Packing Settings
 * @type struct<FileList>[]
 * @default []
 * 
 * @param Packed File Exclusions
 * @text Wykluczenia z pakowania
 * @desc Pliki/foldery pozostawiane na dysku. Ścieżki względne do katalogu głównego (ukośniki /).
 * @parent File Packing Settings
 * @type string[]
 * @default []
 * 
 * @param Security Settings
 * @text Ustawienia zabezpieczeń
 * 
 * @param Block Launch Args Whitelist
 * @text Biała lista argumentów startowych
 * @desc Niezgodny argument przy starcie natychmiast zamknie grę. Puste = blokuje wszystkie.
 * @parent Security Settings
 * @type string[]
 * @default []
 * 
 * @param Early Blob Resolve
 * @text Wczesne rozwiązywanie Blob
 * @desc Konwertuje ścieżki na URL blob na poziomie Bitmap.load. Wyłącz dla własnych dekryptorów URL.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Enable Cheat Detection
 * @text Wykrywanie oszustw
 * @desc Włącza skaner w tle wykrywający narzędzia hakerskie.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Excluded Binary Hashes
 * @text Wykluczone hashe binarne
 * @desc Nazwy plików binarnych/fragmenty wykluczone z odcisku środowiska.
 * @parent Security Settings
 * @type string[]
 * @default ["ffmpeg"]
 * 
 * @param Hash Exe Files
 * @text Hashuj pliki Exe
 * @desc Wiąże .exe z grą dla bezpieczeństwa. Zmiany w .exe (np. ikony) wprowadzaj przed pakowaniem.
 * @parent Security Settings
 * @type boolean
 * @default true
 * 
 * @param Additional Settings
 * @text Ustawienia dodatkowe
 * 
 * @param Block Window Resize
 * @text Blokuj zmianę rozmiaru okna
 * @desc Uniemożliwia graczowi zmianę rozmiaru okna gry. Przycisk maksymalizacji może przestać działać lub zniknąć.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F2 Key
 * @text Blokuj klawisz F2 (Licznik klatek)
 * @desc Uniemożliwia graczowi naciśnięcie F2 w celu wyświetlenia licznika klatek.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F4 Key
 * @text Blokuj klawisz F4 (Pełny ekran)
 * @desc Uniemożliwia graczowi naciśnięcie F4 w celu przełączenia trybu pełnoekranowego/okienkowego.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * @param Block F5 Key
 * @text Blokuj klawisz F5 (Odświeżanie)
 * @desc Uniemożliwia graczowi naciśnięcie F5 w celu przeładowania gry.
 * @parent Additional Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Settings
 * @text Ustawienia autoupdate gracza
 * 
 * @param Player Auto Update
 * @text Autoupdate gracza
 * @desc Automatycznie aktualizuje grę z wydań GitHub przy starcie.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update URL
 * @text URL autoupdate
 * @desc Adres repozytorium GitHub do pobierania aktualizacji.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Tag
 * @text Tag autoupdate
 * @desc Aktualizuje tylko z wydań z tym tagiem. Zostaw puste dla najnowszego wydania.
 * @parent Player Auto Update Settings
 * @type string
 * @default
 * 
 * @param Player Auto Update Disable On No Internet
 * @text Wyłącz przy braku internetu
 * @desc Pokazuje alert i wyłącza grę w przypadku braku połączenia z siecią.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * @param Player Auto Update Disable On Fail
 * @text Wyłącz przy błędzie
 * @desc Pokazuje powiadomienie i wyłącza grę, gdy nie można pobrać aktualizacji.
 * @parent Player Auto Update Settings
 * @type boolean
 * @default false
 * 
 * 
 * @param Player Auto Update Scene Settings
 * @text Ustawienia ekranu aktualizacji
 * @parent Player Auto Update Settings
 * 
 * @param PAU Scene Update Text
 * @text Tekst podczas aktualizacji
 * @desc Tekst wyświetlany jako główny tytuł podczas pobierania aktualizacji.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Updating...
 * 
 * @param PAU Scene Complete Text
 * @text Tekst po ukończeniu
 * @desc Tekst wyświetlany jako główny tytuł po pomyślnym ukończeniu aktualizacji.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update complete!
 * 
 * @param PAU Scene Failed Text
 * @text Tekst przy błędzie
 * @desc Tekst wyświetlany jako główny tytuł gdy aktualizacja nie powiedzie się.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default Update failed
 * 
 * @param PAU Scene Blink
 * @text Efekt migania
 * @desc Włącza animację pulsującej przezroczystości tekstu tytułu.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Blink Speed
 * @text Szybkość migania
 * @desc Prędkość cyklu migania. Wyższa = szybciej. (0.050 ≈ 2 sek./cykl przy 60fps)
 * @parent Player Auto Update Scene Settings
 * @type number
 * @decimals 3
 * @min 0.001
 * @max 1.000
 * @default 0.050
 * 
 * @param PAU Scene Show Progress
 * @text Pokaż postęp
 * @desc Wyświetla procent pobierania i informacje o KB w podtytule podczas aktualizacji.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene BG Type
 * @text Typ tła
 * @desc Typ tła dla ekranu aktualizacji: jednolity kolor, obraz lub wideo.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Jednolity kolor
 * @value color
 * @option Obraz
 * @value image
 * @option Wideo
 * @value video
 * @default color
 * 
 * @param PAU Scene BG Color
 * @text Kolor tła
 * @desc Jednolity kolor tła w hex CSS (np. #000000). Używany gdy typ tła to "jednolity kolor".
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #000000
 * 
 * @param PAU Scene BG Image
 * @text Obraz tła
 * @desc Plik obrazu tła. Używany gdy typ tła to "Obraz".
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir img
 * @default
 * 
 * @param PAU Scene BG Video
 * @text Wideo tła
 * @desc Cieżka pliku wideo tła. Używana gdy typ tła to "Wideo". Wprowadź ścieżkę jako tekst (np. movies/bg.webm).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default
 * 
 * @param PAU Scene BG Fit
 * @text Tryb dopasowania tła
 * @desc Jak skalować obraz lub wideo, gdy proporcje nie pasują do ekranu.
 * @parent Player Auto Update Scene Settings
 * @type select
 * @option Cover (przytnij, aby wypełnić ekran)
 * @value cover
 * @option Contain (letterbox, zachowaj proporcje)
 * @value contain
 * @option Fill (rozciągnij)
 * @value fill
 * @default cover
 * 
 * @param PAU Scene Video Loop
 * @text Pętla wideo
 * @desc Wł.: wideo tła odtwarza się w pętli. Wył.: zatrzymuje się na ostatniej klatce.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Video Volume
 * @text Głośność wideo
 * @desc Głośność wideo tła. 0 (wyciszony) do 100 (maksimum). Dotyczy tylko typu "wideo".
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music
 * @text Muzyka w tle
 * @desc Może grać jednocześnie z wideo.
 * @parent Player Auto Update Scene Settings
 * @type file
 * @dir audio
 * @default
 * 
 * @param PAU Scene BG Music Volume
 * @text Głośność muzyki
 * @desc Głośność muzyki w tle. 0 (cisza) do 100 (maksimum).
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * 
 * @param PAU Scene BG Music Loop
 * @text Pętla muzyki
 * @desc Wł.: muzyka w tle jest odtwarzana w pętli. Wył.: odtwarzana raz i stop.
 * @parent Player Auto Update Scene Settings
 * @type boolean
 * @default true
 * 
 * @param PAU Scene Title X Offset
 * @text Odsunięcie X tytułu (px)
 * @desc Poziome odsunięcie tytułu od środka ekranu w pikselach. 0 = wyśrodkowany.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Title Y Offset
 * @text Odsunięcie Y tytułu (px)
 * @desc Pionowe odsunięcie tytułu od środka ekranu w pikselach. Ujemne = w górę.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default -30
 * 
 * @param PAU Scene Title Size
 * @text Rozmiar czcionki tytułu
 * @desc Rozmiar czcionki tekstu tytułu w pikselach.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 36
 * 
 * @param PAU Scene Title Color
 * @text Kolor tekstu tytułu
 * @desc Kolor tekstu tytułu w hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #ffffff
 * 
 * @param PAU Scene Title Outline Width
 * @text Grubość obramowania tytułu
 * @desc Grubość obramowania tekstu tytułu w pikselach. 0 = brak obramowania.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Title Outline Color
 * @text Kolor obramowania tytułu
 * @desc Kolor obramowania tekstu tytułu. Obsługuje CSS hex (#000000) lub rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * @param PAU Scene Sub X Offset
 * @text Odsunięcie X podtytułu (px)
 * @desc Poziome odsunięcie podtytułu od środka ekranu w pikselach. 0 = wyśrodkowany.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param PAU Scene Sub Y Offset
 * @text Odsunięcie Y podtytułu (px)
 * @desc Pionowe odsunięcie podtytułu od środka ekranu w pikselach. Ujemne = w górę.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min -9999
 * @max 9999
 * @default 30
 * 
 * @param PAU Scene Sub Size
 * @text Rozmiar czcionki podtytułu
 * @desc Rozmiar czcionki podtytułu (linia postępu/statusu) w pikselach.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 1
 * @max 256
 * @default 18
 * 
 * @param PAU Scene Sub Color
 * @text Kolor podtytułu
 * @desc Kolor podtytułu w hex CSS.
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default #888888
 * 
 * @param PAU Scene Sub Outline Width
 * @text Grubość obramowania podtytułu
 * @desc Grubość obramowania podtytułu w pikselach. 0 = brak obramowania.
 * @parent Player Auto Update Scene Settings
 * @type number
 * @min 0
 * @max 20
 * @default 0
 * 
 * @param PAU Scene Sub Outline Color
 * @text Kolor obramowania podtytułu
 * @desc Kolor obramowania podtytułu. Obsługuje CSS hex (#000000) lub rgba(r,g,b,a).
 * @parent Player Auto Update Scene Settings
 * @type string
 * @default rgba(0,0,0,0.5)
 * 
 * 
 * @help
 * https://github.com/Churitoring/SecuPacker
 * 
 * Minimalna wersja NW.js: 0.28.1
 * Minimalna wersja RPG MAKER MV: 1.6.0
 * Minimalna wersja RPG MAKER MZ: 1.0.0
 * 
 * Uwaga: Ta wtyczka działa tylko na Windows.
 * Nie jest dostępna na macOS, Linux ani inne platformy.
 * 
 * --- Jak dystrybuować ---
 * 1. W RPG Maker wybierz Plik > Deployment i wyeksportuj na Windows.
 * 2. Otwórz wyeksportowany folder i uruchom plik .exe gry raz.
 * 3. Poczekaj — SecuPacker automatycznie spakuje wszystkie zasoby.
 *    (Wyświetli się ekran postępu; nie zamykaj okna.)
 * 4. Po zakończeniu gra zamknie się automatycznie.
 * 5. Wyeksportowany folder jest gotowy do dystrybucji.
 * 
 * Ostrzeżenie: Jeśli dokonałeś bezpośrednich modyfikacji w tym pliku, musisz ustawić 'Autoupdate Packera' na 'false' — w przeciwnym razie Twoje zmiany zostaną cofnięte przy każdym pakowaniu.
 * 
 * --- API JavaScript ---
 * Poniższe API są dostępne przez SecuPacker.
 * 
 * SecuPacker.getVersion()
 *   Zwraca   : string
 *   Opis     : Zwraca ciąg wersji wtyczki SecuPacker.
 *   Użycie   : SecuPacker.getVersion()
 * 
 * SecuPacker.isPacked()
 *   Zwraca   : boolean
 *   Opis     : Zwraca true, jeśli gra działa w trybie spakowanym.
 *   Użycie   : SecuPacker.isPacked()
 *
 * SecuPacker.isPlayerAutoUpdateReady()
 *   Zwraca   : boolean
 *   Opis     : Zwraca true, jeśli auto-aktualizacja jest włączona i URL jest skonfigurowany.
 *   Użycie   : SecuPacker.isPlayerAutoUpdateReady()
 * 
 * SecuPacker.isSplitAvailable(binName)
 *   Parametr : binName (string) - nazwa pliku bin do sprawdzenia.
 *   Zwraca   : boolean
 *   Opis     : Zwraca true, jeśli podany bin jest dostępny.
 *   Użycie   : SecuPacker.isSplitAvailable("audio.bin")
 */

/*~struct~FileList:pl
 * @param Split Bin File
 * @text Plik Bin fragmentu
 * @desc Nazwa pliku wyjściowego dla podzielonych danych. Musi być inna niż główny plik bin.
 * @type string
 * 
 * @param Split Path Patterns
 * @text Wzorce ścieżek fragmentu
 * @desc Pliki/foldery pakowane do tego pliku (foldery rekurencyjnie). Np. img, audio/bgm, audio/se/boss.ogg
 * @type string[]
 * @default []
 */

// ===========================================================================
// #region Packer
// If you have made any direct modifications to this file, you must set 'Packer Auto Update' to 'false' — otherwise your changes will be reverted every time you pack.
// ===========================================================================
(function () {
    // =========================================================================
    // [CONSTANTS] Centralized configuration values
    // =========================================================================

    /** @constant {number} 2^32 for 64-bit integer arithmetic */
    var UINT32_MAX_PLUS_1 = 0x100000000;

    /** @constant {number} Chunk size for large file splitting (32MB) */
    var CHUNK_SIZE = 32 * 1024 * 1024;

    /** @constant {number} Auto-update timeout (ms) */
    var AUTO_UPDATE_TIMEOUT_MS = 5000;

    /** @constant {number} Minimum valid download size (1MB) */
    var MIN_DOWNLOAD_SIZE = 1024 * 1024;

    /** @constant {string} Plugin name */
    var PLUGIN_NAME = 'Churitoring_SecuPacker';

    /** @constant {string} Plugin version */
    var PLUGIN_VERSION = '1.1.4';

    /** @constant {string} GitHub raw URL for auto-update */
    var AUTO_UPDATE_URL = 'https://raw.githubusercontent.com/Churitoring/SecuPacker/main/Churitoring_SecuPacker.js';

    /** @constant {string[]} Directories to skip when packing resources */
    var SKIP_DIRS = ['icon', 'save', 'temp_sdk_extract'];

    /** @constant {string[]} Files to skip when packing resources */
    var SKIP_FILES = ['Thumbs.db', '.DS_Store', 'temp_sdk.zip', 'temp_combined.js', 'index.html.bak', 'js/plugins.js.bak'];

    /** @constant {string[]} Protected directories during cleanup */
    var PROTECTED_DIRS = ['js', 'icon', 'save', 'locales'];

    /** @constant {string[]} Files and directories to remove from Pack */
    var CLEANUP_TARGETS = ['nacl_irt_x86_64.nexe', 'nacl64.exe', 'nacl_irt_x86_32.nexe', 'payload.exe', 'ffmpegsumo.dll', 'pdf.dll', 'chromedriver.exe', 'nwjc.exe', 'pnacl', 'temp_normal_extract'];

    // =========================================================================
    // [COMPAT: MAIN.JS SUPPRESSORS]
    // Plugins that fully replace the MZ boot sequence (PluginManager.setup +
    // SceneManager.run) themselves. When any of these is active, main.js must
    // NOT be bundled — it would create a second boot path and either double-
    // init the game or conflict with the plugin's own startup logic.
    // =========================================================================
    var MAIN_JS_SUPPRESSORS = ['FOSSIL'];

    /** @enum {string} Centralized error messages (Packer scope only) */
    var ERR = {
        COMPILER_NOT_FOUND: 'Compiler not found (Timeout)',
        DOWNLOAD_INCOMPLETE: 'Download incomplete.',
        NO_INTERNET: 'No Internet Connection.',
        NATIVE_UNZIP_PREFIX: 'Native Unzip Failed: '
    };

    // =========================================================================
    // [HELPERS] Shared utility functions
    // =========================================================================

    /**
     * @constant {Function} Returns ordered list of NW.js download URLs to try.
     * Primary: dl.nwjs.io (official CDN)
     * Fallback: GitHub Releases (original source)
     * @param {string} version - e.g. "0.83.0"
     * @param {string} arch - e.g. "ia32" or "x64"
     * @param {string} flavor - "sdk" or "normal"
     * @returns {string[]}
     */
    var getNwjsUrls = function (version, arch, flavor) {
        var prefix = flavor === 'sdk' ? 'nwjs-sdk' : 'nwjs';
        var filename = prefix + '-v' + version + '-win-' + arch + '.zip';

        return [
            'https://dl.nwjs.io/v' + version + '/' + filename,
            'https://github.com/nwjs/nw.js/releases/download/v' + version + '/' + filename
        ];
    };

    /**
     * Logs a message with context. Replaces empty catch blocks.
     * @param {string} level - The log level (log, warn, error)
     * @param {string} context - Where the log occurred
     * @param {Error} [err] - Optional error object
     */
    function _log(level, context, payload) {
        var prefix = '[SecuPacker]' + context;
        if (!payload) {
            console[level](prefix);
            return;
        }
        var message = (level === 'log') ? payload : (payload.message || payload);
        console[level](prefix, message);
    }

    /**
     * Logs a info with context. Replaces empty catch blocks.
     * @param {string} context - Where the info occurred
     * @param {Error} [err] - Optional error object
     */
    function logInfo(context, msg) {
        _log('log', context, msg);
    }

    /**
     * Logs a warning with context. Replaces empty catch blocks.
     * @param {string} context - Where the warning occurred
     * @param {Error} [err] - Optional error object
     */
    function logWarn(context, err) {
        _log('warn', context, err);
    }

    /**
     * Logs a error with context. Replaces empty catch blocks.
     * @param {string} context - Where the error occurred
     * @param {Error} [err] - Optional error object
     */
    function logError(context, err) {
        _log('error', context, err);
    }

    /**
     * Strips the Windows Hidden attribute from a file so that fs.writeFileSync
     * (which uses CREATE_ALWAYS internally) does not fail with EPERM.
     * No-op on non-Windows platforms or if the file does not exist.
     * @param {string} filePath - Absolute path to the file
     */
    function stripHiddenAttr(filePath) {
        try {
            if (!fs.existsSync(filePath)) return;
            child_process.execSync('attrib -H "' + filePath + '"', { windowsHide: true, timeout: 5000 });
        } catch (e) { logWarn('stripHiddenAttr', e); }
    }

    // =========================================================================
    // [NW.js VERSION CHECK] Minimum version enforcement at startup
    // =========================================================================

    /** @constant {string} Minimum required NW.js version */
    var NWJS_MIN_VERSION = '0.28.1';

    /**
     * Compares two semver-style version strings (e.g. "0.44.3" vs "0.28.1").
     * Returns true if 'current' >= 'minimum'.
     * @param {string} current
     * @param {string} minimum
     * @returns {boolean}
     */
    function isNwjsVersionAtLeast(current, minimum) {
        var c = String(current).split('.').map(Number);
        var m = String(minimum).split('.').map(Number);
        var len = Math.max(c.length, m.length);
        for (var i = 0; i < len; i++) {
            var cv = c[i] || 0;
            var mv = m[i] || 0;
            if (cv > mv) return true;
            if (cv < mv) return false;
        }
        return true; // equal -> also OK
    }

    /**
     * Checks the current NW.js version against NWJS_MIN_VERSION.
     * If the version info is missing or too old, shows an alert and exits the process.
     */
    function checkNwjsMinVersion() {
        try {
            var currentVer = (process.versions && process.versions['nw']) || '';
            if (!currentVer) {
                alert(
                    '[' + PLUGIN_NAME + '] Could not determine the NW.js version.\n' +
                    'Requires NW.js ' + NWJS_MIN_VERSION + ' or later.\n\n' +
                    'The game will now exit.'
                );
                process.exit(0);
                return;
            }
            if (!isNwjsVersionAtLeast(currentVer, NWJS_MIN_VERSION)) {
                alert(
                    '[' + PLUGIN_NAME + '] Requires NW.js ' + NWJS_MIN_VERSION + ' or later.\n' +
                    'Your NW.js version: ' + currentVer + '\n\n' +
                    'The game will now exit.'
                );
                process.exit(0);
            }
        } catch (e) {
            logWarn('checkNwjsMinVersion', e);
        }
    }

    /**
     * Checks if a file is a native binary (.node/.dll/.lib/.dylib/.so) that cannot be in VFS.
     * @param {string} filename
     * @returns {boolean}
     */
    function isNativeBinaryFile(filename) {
        var lower = filename.toLowerCase();
        return lower.endsWith('.node') || lower.endsWith('.dll') ||
            lower.endsWith('.lib') || lower.endsWith('.dylib') || lower.endsWith('.so');
    }

    /**
     * Checks if a file is a NW.js runtime resource that must stay on disk and must not be packed into VFS.
     * NW.js 0.94+ (Chromium 120+) closes .pak/.dat file handles immediately after reading them into memory,
     * so the OS-level EBUSY lock that older Packs relied on is no longer present.
     * Explicitly guarding these extensions prevents cleanup from deleting them.
     * @param {string} filename
     * @returns {boolean}
     */
    function isNwjsRuntimeFile(filename) {
        var lower = filename.toLowerCase();
        return lower.endsWith('.pak') || lower.endsWith('.dat');
    }

    /**
     * Checks if a binary file should be excluded from the environment fingerprint hash.
     * Rules:
     *   - Entry WITH extension (e.g. "asdf.dll"): exclude exact filename match in any directory.
     *   - Entry WITHOUT extension (e.g. "ffmpeg"): exclude any binary whose basename (no ext)
     *     contains the entry string as a substring (case-insensitive).
     * @param {string} filename - Basename of the file only (not a full path)
     * @param {string[]} excludedList
     * @returns {boolean}
     */
    function isBinaryHashExcluded(filename, excludedList) {
        if (!excludedList || excludedList.length === 0) return false;
        var lower = filename.toLowerCase();
        var dotIdx = lower.lastIndexOf('.');
        var baseName = dotIdx !== -1 ? lower.slice(0, dotIdx) : lower;
        for (var _ei = 0; _ei < excludedList.length; _ei++) {
            var entry = (excludedList[_ei] || '').toLowerCase().trim();
            if (!entry) continue;
            var entryDotIdx = entry.lastIndexOf('.');
            var entryExt = entryDotIdx !== -1 ? entry.slice(entryDotIdx) : '';
            if (entryExt) {
                // Has extension -> exact filename match
                if (lower === entry) return true;
            } else {
                // No extension -> substring match against basename (without extension)
                if (baseName.indexOf(entry) !== -1) return true;
            }
        }
        return false;
    }

    /**
     * Initializes a background file logger for the application.
     * This function overrides the default 'console.log', 'console.warn', 
     * 'console.error', and 'window.onerror' methods. It intercepts all console
     * output and unhandled runtime exceptions, appending them to a 
     * 'debug_console(Pack).txt' file located in the main executable's directory.
     * The original console functionality is still preserved.
     * @returns {void}
     */
    function initLogger() {
        try {
            var fs = require('fs'),
                path = require('path');

            var logPath = path.join(path.dirname(process.mainModule.filename), 'debug_console(Pack).txt');

            fs.writeFileSync(logPath, '=== Debug Console Log ===\n' + new Date().toISOString() + '\n\n', 'utf8');

            function writeLog(t, a) {
                try {
                    var m = '[' + t + '] ' + Array.prototype.slice.call(a).map(function (x) {
                        return x instanceof Error ? (x.stack || x.message) : (typeof x === 'object' ? JSON.stringify(x) : String(x));
                    }).join(' ') + '\n';

                    fs.appendFileSync(logPath, m, 'utf8');
                } catch (e) { }
            }

            var _l = console.log,
                _w = console.warn,
                _e = console.error;

            console.log = function () {
                writeLog('LOG', arguments);
                _l.apply(console, arguments);
            };

            console.warn = function () {
                writeLog('WARN', arguments);
                _w.apply(console, arguments);
            };

            console.error = function () {
                writeLog('ERROR', arguments);
                _e.apply(console, arguments);
            };

            window.onerror = function (m, u, l, c, e) {
                writeLog('UNCAUGHT', 'Error: ' + m + ' at ' + u + ':' + l + ':' + c + (e ? ' ' + e.stack : ''));
            };

        } catch (e) { }
    }

    function wait(ms) {
        return new Promise(function (resolve) { setTimeout(resolve, ms); });
    }

    /** @returns {boolean} true if RPG Maker MZ */
    function isRPGMakerMZ() {
        return (typeof Utils !== 'undefined' && Utils.RPGMAKER_NAME === 'MZ');
    }

    // =========================================================================
    // [HELPERS] 64-bit Integer (32-bit safe)
    // =========================================================================

    /**
     * Writes a 64-bit integer as two LE 32-bit values.
     * @param {Buffer} buf
     * @param {number} val - Value (JS number is a 64-bit float; safe integer range
     *   is ±2^53, i.e. up to ~8 PiB. Values beyond 2^53 lose precision.)
     * @param {number} offset
     */
    function writeInt64LE(buf, val, offset) {
        var low = val >>> 0;
        var high = Math.floor(val / UINT32_MAX_PLUS_1) >>> 0;
        buf.writeUInt32LE(low, offset);
        buf.writeUInt32LE(high, offset + 4);
    }

    /**
     * Reads a 64-bit integer from two LE 32-bit values.
     * @param {Buffer} buf
     * @param {number} offset
     * @returns {number}
     */
    function readInt64LE(buf, offset) {
        var low = buf.readUInt32LE(offset);
        var high = buf.readUInt32LE(offset + 4);
        return (high * UINT32_MAX_PLUS_1) + low;
    }

    var fs = require('fs');
    var path = require('path');
    var crypto = require('crypto');
    var zlib = require('zlib');
    var https = require('https');
    var child_process = require('child_process');
    var dns = require('dns');

    // =========================================================================
    // [PATHS] Centralized file path definitions
    // =========================================================================

    var projectPath = path.dirname(process.mainModule.filename);
    var pluginsPath = path.join(projectPath, 'js', 'plugins.js');
    var backupPath = path.join(projectPath, 'js', 'plugins.js.bak');

    var tempFilesRegistry = [];
    var isRebooting = false;

    // =========================================================================
    // [BAK HELPERS] Generic backup / restore for any single file
    // =========================================================================
    function backupFileToBak(origPath, bakPath) {
        if (fs.existsSync(bakPath)) return; // never overwrite an existing .bak
        fs.writeFileSync(bakPath, fs.readFileSync(origPath, 'utf8'), 'utf8');
    }

    function restoreFileFromBak(origPath, bakPath) {
        if (!fs.existsSync(bakPath)) return;
        stripHiddenAttr(origPath);
        fs.writeFileSync(origPath, fs.readFileSync(bakPath));
        fs.unlinkSync(bakPath);
    }

    // ===========================================================================
    // [PART 0] Process Guard 
    // ===========================================================================
    function registerCleanupHandlers() {
        var cleanupRoutine = function () {
            if (isRebooting) return;
            try {
                restoreFileFromBak(pluginsPath, backupPath);
                // [HTML RESTORE] Restore index.html from index.html.bak if interrupted mid-Pack
                restoreFileFromBak(
                    path.join(projectPath, 'index.html'),
                    path.join(projectPath, 'index.html.bak')
                );
                performRecursiveDelete(tempFilesRegistry);
            } catch (e) { logWarn('cleanup', e); }
        };
        process.on('exit', cleanupRoutine);
        process.on('SIGINT', function () { process.exit(); });
        process.on('SIGTERM', function () { process.exit(); });
    }

    if (typeof Utils !== 'undefined' && Utils.isNwjs() && !Utils.isOptionValid('test')) {
        initLogger();
        registerCleanupHandlers();
        checkNwjsMinVersion(); // [VERSION GATE] Alert + exit if NW.js is below minimum
        ensureSafeMode();
    } else if (typeof Utils !== 'undefined' && Utils.isNwjs() && Utils.isOptionValid('test')) {
        // [PLAYTEST] Non-fatal version warning — log only, do not block
        (function () {
            try {
                logInfo('SecuPacker is enabled. You must run the deployed game once and wait for it to fully load before distribution. Failure to do this will result in no security protection from SecuPacker.');
                var currentVer = (process.versions && process.versions['nw']) || '';
                if (!currentVer || !isNwjsVersionAtLeast(currentVer, NWJS_MIN_VERSION)) {
                    logError(
                        'NW.js version warning: this game requires ' + NWJS_MIN_VERSION + ' or later.' +
                        (currentVer ? ' (current: ' + currentVer + ')' : ' (version could not be determined)')
                    );
                }
            } catch (e) { logWarn('checkNwjsMinVersion(test)', e); }
        })();
    }

    function ensureSafeMode() {
        if (!fs.existsSync(pluginsPath)) return;

        // [PLATFORM CHECK] Windows only
        if (process.platform !== 'win32') {
            alert(
                '[' + PLUGIN_NAME + '] This plugin is only supported on Windows.\n\n' +
                'The game will now exit.'
            );
            process.exit(0);
            return;
        }

        // [PROJECT FILE CHECK] Abort if *.rpgproject or *.rmmzproject exists in the pack directory.
        // These files indicate the project is still in editor mode, not a deployable build.
        try {
            var _pfList = fs.readdirSync(projectPath);
            var _pfFound = null;
            for (var _pfi = 0; _pfi < _pfList.length; _pfi++) {
                var _pfn = _pfList[_pfi];
                if (_pfn.endsWith('.rpgproject') || _pfn.endsWith('.rmmzproject')) {
                    _pfFound = _pfn;
                    break;
                }
            }
            if (_pfFound) {
                alert(
                    '[' + PLUGIN_NAME + '] A project file was detected in the pack directory: ' + _pfFound + '\n\n' +
                    'Packing must be run from a deployed build folder, not an editor project.\n' +
                    'The game will now exit.'
                );
                process.exit(0);
                return;
            }
        } catch (e) { logWarn('projectFileCheck', e); }

        // [FLAVOR SWAP] If safe mode is already active (backup exists),
        // check NW.js flavor before proceeding to the Pack process.
        // SDK flavor -> download Normal Pack, swap files, restart.
        // Normal/undefined flavor -> proceed to Pack.
        if (fs.existsSync(backupPath)) {
            var nwFlavor = process.versions['nw-flavor'];
            if (typeof nwFlavor === 'string' && nwFlavor !== 'normal') {
                logInfo('SDK flavor detected: ' + nwFlavor + '. Swapping to Normal Pack...');
                isRebooting = true;
                performFlavorSwap();
            }
            return;
        }

        try {
            var content = fs.readFileSync(pluginsPath, 'utf8');
            var jsonStart = content.indexOf('[');
            var jsonEnd = content.lastIndexOf(']');
            var plugins = JSON.parse(content.substring(jsonStart, jsonEnd + 1).replace(/,\s*\]/g, ']'));

            var myIndex = -1;
            for (var i = 0; i < plugins.length; i++) {
                if (plugins[i].name === PLUGIN_NAME) {
                    myIndex = i;
                    break;
                }
            }

            if (myIndex === -1) return;

            var myConfig = plugins[myIndex];
            myConfig.status = true;
            isRebooting = true;

            // [Packer AUTO-UPDATE] Check for Packer plugin update before packaging
            var autoUpdate = (myConfig.parameters['Packer Auto Update'] || 'true') === 'true';

            var proceedToSafeMode = function () {
                try {
                    backupFileToBak(pluginsPath, backupPath);

                    var safePlugins = [myConfig];
                    var newContent = "var $plugins =" + JSON.stringify(safePlugins, null, 4) + "\n;";
                    stripHiddenAttr(pluginsPath);
                    fs.writeFileSync(pluginsPath, newContent, 'utf8');

                    setTimeout(function () {
                        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.reload) {
                            chrome.runtime.reload();
                        } else {
                            location.reload();
                        }
                    }, 100);

                    setTimeout(function () { process.exit(0); }, 500);
                } catch (e) {
                    logError('Safe Mode Transition Failed:', e);
                }
            };

            if (autoUpdate) {
                checkAutoUpdate(function () {
                    proceedToSafeMode();
                });
            } else {
                proceedToSafeMode();
            }

        } catch (e) {
            logError('Safe Mode Init Failed:', e);
        }
    }

    function checkAutoUpdate(callback) {
        try {
            var url = AUTO_UPDATE_URL;
            var req = https.get(url, function (res) {
                if (res.statusCode !== 200) {
                    res.resume();
                    callback();
                    return;
                }

                var data = [];
                res.on('data', function (chunk) {
                    data.push(chunk);
                });

                res.on('end', function () {
                    try {
                        var buffer = Buffer.concat(data);
                        var thisPluginPath = path.join(projectPath, 'js', 'plugins', PLUGIN_NAME + '.js');

                        if (fs.existsSync(thisPluginPath)) {
                            fs.writeFileSync(thisPluginPath, buffer);
                        }
                    } catch (e) { logWarn('autoUpdate', e); }
                    callback();
                });
            });

            req.on('error', function (e) {
                callback();
            });

            req.setTimeout(AUTO_UPDATE_TIMEOUT_MS, function () {
                req.destroy();
                callback();
            });

        } catch (e) {
            callback();
        }
    }

    /**
     * [KNOWN BUG VERSIONS] Checks the current NW.js version against a list of
     * known-broken versions and returns a safe replacement version to use instead.
     * Also alerts the user and opens the relevant GitHub issue in the default browser.
     *
     * Known issues:
     *   - 0.68.0: Normal flavor is broken - https://github.com/nwjs/nw.js/issues/7963
     *
     * @param {string} version - NW.js version string (e.g. "0.68.0")
     * @returns {string} Safe version to use for the download (may be the same as input)
     */
    function resolveNwjsKnownBugVersion(version) {
        /** @type {Array<{broken: string, redirect: string, issue: string}>} */
        var KNOWN_BUG_VERSIONS = [
            {
                broken: '0.68.0',
                redirect: '0.68.1',
                issue: 'https://github.com/nwjs/nw.js/issues/7963'
            }
        ];

        for (var _kbi = 0; _kbi < KNOWN_BUG_VERSIONS.length; _kbi++) {
            var entry = KNOWN_BUG_VERSIONS[_kbi];
            if (version === entry.broken) {
                try {
                    var _nwgShell = (typeof nw !== 'undefined') ? nw : require('nw.gui');
                    _nwgShell.Shell.openExternal(entry.issue);
                } catch (_se) {
                    try { require('child_process').exec('start ' + entry.issue); } catch (_e) { }
                }
                logInfo('Known broken version ' + entry.broken + ' detected: redirecting Normal Pack download to ' + entry.redirect);
                alert(
                    '[' + PLUGIN_NAME + '] NW.js ' + entry.broken + ' does not work correctly in Normal flavor.\n' +
                    'The download will automatically use ' + entry.redirect + ' instead.\n\n' +
                    'See the GitHub issue for details (opening in your browser).'
                );
                return entry.redirect;
            }
        }

        return version;
    }

    /**
     * [FLAVOR SWAP] Downloads the Normal (production) NW.js Pack and replaces
     * SDK runtime files. Called when process.versions['nw-flavor'] !== 'normal'.
     *
     * Process:
     *   1. Download Normal Pack ZIP (same version + arch as current NW.js)
     *   2. Extract to temp folder, locate inner directory
     *   3. Compare top-level FILES with exe directory:
     *      - Both exist: rename original to _originalname.bak
     *      - Only in extracted: discard (not needed in this environment)
     *      - nw.exe: always discard (preserves Kadokawa certificate on game.exe)
     *   4. Move remaining extracted files to exe directory
     *   5. For each subdir present in both extracted and exe directory:
     *      compare files inside (same rules as step 3/4)
     *   6. Restart — flavor becomes 'normal'
     *
     * On next boot, .bak files are cleaned up by PHASE 0 in startPackProcess.
     */
    function performFlavorSwap() {
        var execDir = path.dirname(process.execPath);
        var tempNormalZip = path.join(execDir, 'temp_normal.zip');
        var tempNormalExtract = path.join(execDir, 'temp_normal_extract');

        // Register for cleanup in case of crash mid-swap
        tempFilesRegistry.push(tempNormalZip, tempNormalExtract);

        var normalUrls = getNwjsUrls(resolveNwjsKnownBugVersion(process.versions.nw), process.arch, 'normal');
        logInfo('Downloading Normal Pack: ' + normalUrls[0]);

        checkInternetConnection()
            .then(function () {
                return downloadFileWithFallback(normalUrls, tempNormalZip);
            })
            .then(function () {
                logInfo('Extracting Normal Pack...');
                return extractSpecificFiles(tempNormalZip, tempNormalExtract);
            })
            .then(function () {
                // Delete nw.exe from extracted — must not replace game.exe (certificate)
                try { fs.unlinkSync(path.join(tempNormalExtract, 'nw.exe')); } catch (e) { }
                logInfo('Flavor swap: discarded nw.exe (preserving certificate)');

                // Delete the zip immediately (not locked); temp_normal_extract cleaned by Stage 2.
                performRecursiveDelete([tempNormalZip]);

                // [HARD RESTART via CIM two-stage launch]
                //
                // NW.js runs inside a Windows Job Object (JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE).
                // Any child process spawned directly dies when NW.js exits, so we can't use
                // a simple detached spawn. Instead:
                //
                //  Stage 1 — spawnSync + windowsHide (CREATE_NO_WINDOW, no flash).
                //             Runs inside the Job Object but calls Invoke-CimMethod which
                //             asks the WMI service (winmgmt, outside any job) to create Stage 2.
                //  Stage 2 — created by winmgmt with ShowWindow=0. Completely outside the
                //             Job Object. Waits for NW.js + all child processes to exit,
                //             then moves all files from tempNormalExtract to execDir and relaunches.
                logInfo('Flavor swap complete. Hard restarting...');
                try {
                    var cp = require('child_process');
                    var launchArgs = [];
                    try {
                        if (typeof nw !== 'undefined' && nw.App && Array.isArray(nw.App.argv)) {
                            launchArgs = nw.App.argv;
                        }
                    } catch (e) { /* nw.App.argv unavailable */ }

                    function psq(s) { return s.replace(/'/g, "''"); }

                    var stage2 = `
                    $p=${process.pid};
                    $e='${psq(process.execPath)}';
                    $src='${psq(tempNormalExtract)}';
                    $dst='${psq(execDir)}';
                        $done=$false;
                        while(-not $done){
                            $ps=@(Get-CimInstance Win32_Process -EA 0|Select-Object ProcessId,ParentProcessId);
                            $tree=[System.Collections.Generic.HashSet[int]]::new();
                            [void]$tree.Add($p);
                            $ch=$true;
                            while($ch){
                                $ch=$false;
                                $ps|%{if($tree.Contains([int]$_.ParentProcessId)-and $tree.Add([int]$_.ProcessId)){$ch=$true}}
                            };
                            if(-not($tree|?{Get-Process -Id $_ -EA 0})){$done=$true}else{sleep -m 100}
                        };
                        sleep -m 500;
                        $files=@(Get-ChildItem -LiteralPath $src -Recurse -File);
                        $files|%{
                            $to=Join-Path $dst $_.FullName.Substring($src.Length+1);
                            $dir=Split-Path $to -Parent;
                            if(!(Test-Path -LiteralPath $dir)){New-Item -ItemType Directory -LiteralPath $dir -Force|Out-Null};
                            Move-Item -LiteralPath $_.FullName -Destination $to -Force -EA 0
                        };
                        $eSafe=[System.Management.Automation.WildcardPattern]::Escape($e);`;
                    if (launchArgs.length > 0) {
                        stage2 += "Start-Process $eSafe -Args @(" + launchArgs.map(function (a) { return "'" + psq(a) + "'"; }).join(',') + ");";
                    } else {
                        stage2 += "Start-Process $eSafe;";
                    }

                    var stage2Encoded = Buffer.from(stage2, 'utf16le').toString('base64');
                    var stage1Cmd = `
                        $si=New-CimInstance -CimClass (Get-CimClass Win32_ProcessStartup) -Property @{ShowWindow=0} -ClientOnly;
                        $cmd='powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand ${stage2Encoded}';
                        Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{CommandLine=$cmd;ProcessStartupInformation=$si}|Out-Null;
                    `;

                    var result = cp.spawnSync('powershell.exe', [
                        '-NoProfile', '-NonInteractive',
                        '-ExecutionPolicy', 'Bypass',
                        '-Command', stage1Cmd
                    ], { windowsHide: true, timeout: 10000 });

                    if (result.error) { logWarn('flavorSwap:stage1', result.error); }
                    logInfo('Flavor swap: Stage1 done, Stage2 running via CIM.');
                } catch (e) { logWarn('flavorSwap:respawn', e); }

                process.exit(0);
            })
            .catch(function (e) {
                logError('Flavor swap failed:', e.message || e);
                performRecursiveDelete([tempNormalExtract, tempNormalZip]);
                alert('Flavor swap failed: ' + (e.message || e));
                process.exit(1);
            });
    }

    // ===========================================================================
    // [PART 1] UI Scene
    // ===========================================================================
    function Scene_PackProgress() { this.initialize.apply(this, arguments); }
    Scene_PackProgress.prototype = Object.create(Scene_Base.prototype);
    Scene_PackProgress.prototype.constructor = Scene_PackProgress;
    Scene_PackProgress.status = { title: "", major: "", minor: "" };

    Scene_PackProgress.prototype.initialize = function () {
        logInfo('Scene_PackProgress.initialize called');
        try {
            if (typeof Scene_Base.prototype.initialize === 'function') {
                Scene_Base.prototype.initialize.call(this);
            } else {
                try {
                    var _tmpContainer = new PIXI.Container();
                    var _tmpProps = Object.getOwnPropertyNames(_tmpContainer);
                    for (var _pi = 0; _pi < _tmpProps.length; _pi++) {
                        if (this[_tmpProps[_pi]] === undefined) {
                            this[_tmpProps[_pi]] = _tmpContainer[_tmpProps[_pi]];
                        }
                    }
                    _tmpContainer.destroy();
                } catch (_pixiErr) { }

                // Scene_Base properties (normally set in constructor)
                this._started = false;
                this._active = false;
                this._fadeSign = 0;
                this._fadeDuration = 0;
                this._fadeWhite = 0;
                this._fadeOpacity = 0;

                // createColorFilter() — normally called in Scene_Base constructor
                try {
                    if (typeof ColorFilter !== 'undefined') {
                        this._colorFilter = new ColorFilter();
                        this.filters = [this._colorFilter];
                    }
                } catch (_cfErr) { }
            }
        } catch (e) { }
        this._breathTime = 0;
        logInfo('Scene_PackProgress.initialize complete');
    };

    Scene_PackProgress.prototype.isReady = function () {
        return true;
    };

    Scene_PackProgress.prototype.start = function () {
        logInfo('Scene_PackProgress.start called');
        try {
            Scene_Base.prototype.start.call(this);
        } catch (e) {
            this._started = true;
            this._active = true;
        }
        logInfo('Scene_PackProgress.start complete');
    };

    Scene_PackProgress.prototype.create = function () {
        logInfo('Scene_PackProgress.create called');
        try { Scene_Base.prototype.create.call(this); } catch (e) { }
        try {
            if (!Graphics.width || !Graphics.height) Graphics.resize(window.innerWidth, window.innerHeight);
            if (!Graphics.boxWidth) Graphics.boxWidth = Graphics.width;
            if (!Graphics.boxHeight) Graphics.boxHeight = Graphics.height;
        } catch (e) { }
        try { this.createBackground(); } catch (e) { }
        try { this.createLabels(); } catch (e) { }
    };

    Scene_PackProgress.prototype.createBackground = function () {
        this._backgroundSprite = new Sprite();
        var bitmap = new Bitmap(Graphics.width, Graphics.height);
        bitmap.fillAll('black');
        this._backgroundSprite.bitmap = bitmap;
        this.addChild(this._backgroundSprite);
    };

    Scene_PackProgress.prototype.createLabels = function () {
        var w = Graphics.width; var h = Graphics.height;

        this._titleSprite = new Sprite();
        this._titleSprite.bitmap = new Bitmap(w, 64);
        this._titleSprite.bitmap.fontSize = 48;
        this._titleSprite.bitmap.textColor = '#ffffff';
        this._titleSprite.anchor.x = 0.5; this._titleSprite.anchor.y = 0.5;
        this._titleSprite.x = w / 2; this._titleSprite.y = h / 2 - 60;
        this.addChild(this._titleSprite);

        this._majorLabel = new Sprite();
        this._majorLabel.bitmap = new Bitmap(w, 32);
        this._majorLabel.bitmap.fontSize = 24;
        this._majorLabel.bitmap.textColor = '#aaaaaa';
        this._majorLabel.anchor.x = 0.5; this._majorLabel.x = w / 2; this._majorLabel.y = h / 2 + 20;
        this.addChild(this._majorLabel);

        this._minorLabel = new Sprite();
        this._minorLabel.bitmap = new Bitmap(w, 24);
        this._minorLabel.bitmap.fontSize = 16;
        this._minorLabel.bitmap.textColor = '#666666';
        this._minorLabel.anchor.x = 0.5; this._minorLabel.x = w / 2; this._minorLabel.y = h / 2 + 60;
        this.addChild(this._minorLabel);
        this._lastTitle = ""; this._lastMajor = ""; this._lastMinor = "";
    };

    Scene_PackProgress.prototype.update = function () {
        try {
            if (typeof Graphics === 'undefined' || this._finished) return;

            if (typeof $gameTemp === 'undefined' || $gameTemp === null) {
                window.$gameTemp = { isPlaytest: function () { return true; } };
            }

            try {
                Scene_Base.prototype.update.call(this);
            } catch (e) { }

            this._breathTime += 0.05;
            if (this._titleSprite) {
                this._titleSprite.opacity = 155 + Math.sin(this._breathTime) * 100;
            }

            if (this._titleSprite && this._lastTitle !== Scene_PackProgress.status.title) {
                this._lastTitle = Scene_PackProgress.status.title;
                this._titleSprite.bitmap.clear();
                this._titleSprite.bitmap.drawText(this._lastTitle, 0, 0, Graphics.width, 64, 'center');
            }
            if (this._majorLabel && this._lastMajor !== Scene_PackProgress.status.major) {
                this._lastMajor = Scene_PackProgress.status.major;
                this._majorLabel.bitmap.clear();
                this._majorLabel.bitmap.drawText(this._lastMajor, 0, 0, Graphics.width, 32, 'center');
            }
            if (this._minorLabel && this._lastMinor !== Scene_PackProgress.status.minor) {
                this._lastMinor = Scene_PackProgress.status.minor;
                this._minorLabel.bitmap.clear();
                this._minorLabel.bitmap.drawText(this._lastMinor, 0, 0, Graphics.width, 24, 'center');
            }

            if (!this._PackProcessStarted) { // Renamed from _started
                // [FLAVOR SWAP] Do not start Pack if a restart is pending (flavor swap in progress)
                if (isRebooting) {
                    Scene_PackProgress.status = { title: "SecuPacker", major: "Switching to Production Pack...", minor: "Please wait..." };
                    return;
                }
                this._PackProcessStarted = true;
                logInfo('Scheduling startPackProcess...');
                var self = this;
                setTimeout(function () {
                    self.startPackProcess();
                }, 100);
            }
        } catch (e) {
            logError('Scene_PackProgress.update error (' + e.name + '): ' + e.message + '\n' + (e.stack || ''));
        }
    };

    // [Non-Blocking Warning Overlay]
    function showWarningOverlay(message, duration) {
        duration = duration || 3000;
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;justify-content:center;align-items:center;z-index:999999;';
        var box = document.createElement('div');
        box.style.cssText = 'background:#2a2a2a;border:2px solid #ff4444;border-radius:10px;padding:30px 50px;text-align:center;box-shadow:0 0 30px rgba(255,68,68,0.5);animation:shake 0.5s ease-in-out;';
        var iconEl = document.createElement('div');
        iconEl.style.cssText = 'font-size:48px;margin-bottom:15px;';
        iconEl.textContent = '⚠️';
        var msgEl = document.createElement('div');
        msgEl.style.cssText = 'color:#fff;font-size:18px;white-space:pre-line;';
        msgEl.textContent = message; // textContent never interprets HTML
        box.appendChild(iconEl);
        box.appendChild(msgEl);
        overlay.appendChild(box);

        // Add shake animation
        var style = document.createElement('style');
        style.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-5px)}20%,40%,60%,80%{transform:translateX(5px)}}';
        document.head.appendChild(style);

        document.body.appendChild(overlay);
        setTimeout(function () {
            overlay.style.transition = 'opacity 0.3s';
            overlay.style.opacity = '0';
            setTimeout(function () { overlay.remove(); style.remove(); }, 300);
        }, duration);
    }

    // [Packer Process]
    Scene_PackProgress.prototype.startPackProcess = function () {
        logInfo('startPackProcess called');

        // [MZ COMPATIBILITY] MZ uses 'nw' instead of 'nw.gui'
        var gui;
        try {
            gui = require('nw.gui');
        } catch (e) {
            logInfo('nw.gui not found, trying nw');
            gui = (typeof nw !== 'undefined') ? nw : null;
        }

        if (!gui) {
            console.error('[SecuPacker] Cannot get NW.js gui module!');
            return;
        }

        var win = gui.Window.get();
        logInfo('Got NW.js window');

        window.__IS_PackING__ = true;

        // [MZ/MV COMPATIBILITY] Unified Window Close Handling
        if (win && win.removeAllListeners) {
            // Remove the core engine's default close hooks (which might force nw.App.quit())
            win.removeAllListeners('close');
        }

        var closeHandler = function (e) {
            if (window.__IS_PackING__) {
                showWarningOverlay("Process is running.\nDo not close!", 2000);
                // MZ/Newer NW.js might need this to stop propagation
                if (e && e.preventDefault) e.preventDefault();
                return false;
            } else {
                this.close(true);
            }
        };

        if (win && win.on) {
            win.on('close', closeHandler);
        } else if (win && win.addListener) {
            win.addListener('close', closeHandler);
        }

        var keydownHandler = function (e) {
            if (window.__IS_PackING__) {
                // Block F5 (116) or Ctrl+R (82). 
                // Note: Alt+F4 is natively blocked by the 'close' event handler above.
                if (e.keyCode === 116 || (e.ctrlKey && e.keyCode === 82)) {
                    e.preventDefault(); e.stopPropagation(); return false;
                }
            }
        };
        document.addEventListener('keydown', keydownHandler, true);

        var parameters = PluginManager.parameters(PLUGIN_NAME);
        var trackRuntimeWritesEnabled = (parameters['Track Runtime Writes'] !== 'false');
        var runtimeWriteRelPaths = [];
        var runtimeWriteMap = {};
        var excludedBinaryHashesStr = parameters['Excluded Binary Hashes'];
        var hashExeFiles = (parameters['Hash Exe Files'] || 'true') === 'true';
        var enableSecurityWatchdog = (parameters['Enable Cheat Detection'] || 'true') === 'true';
        var stripReadOnlyAttrs = (parameters['Strip Read-Only Attributes'] || 'true') === 'true';

        // Parse Packed File Exclusions (default: [])
        var diskExcludeList = [];
        try {
            var _deStr = parameters['Packed File Exclusions'];
            if (_deStr) {
                var _parsedDE = JSON.parse(_deStr);
                _parsedDE.forEach(function (s) {
                    var p;
                    if (typeof s === 'object' && s !== null) {
                        p = String(s.name || '');
                    } else {
                        try { var inner = JSON.parse(s); p = String(inner && inner.name ? inner.name : inner); } catch (e) { p = String(s); }
                    }
                    p = p.trim().replace(/\\/g, '/').replace(/\/+$/, '');
                    if (p) diskExcludeList.push(p);
                });
            }
        } catch (e) { }

        // Parse Excluded Binary Hashes (default: ["ffmpeg"])
        var excludedBinaryHashes = ['ffmpeg'];
        try {
            if (excludedBinaryHashesStr) {
                var parsedBH = JSON.parse(excludedBinaryHashesStr);
                excludedBinaryHashes = parsedBH.map(function (s) {
                    if (typeof s === 'object' && s.name) return s.name;
                    try { var inner = JSON.parse(s); return inner.name || inner; } catch (e) { return s; }
                }).map(function (s) { return s.trim(); }).filter(Boolean);
            }
        } catch (e) { }

        // Parse Block Launch Args Whitelist (default: [])
        var blockedArgWhitelist = [];
        try {
            var _bawStr = parameters['Block Launch Args Whitelist'];
            if (_bawStr) {
                var _parsedBaw = JSON.parse(_bawStr);
                blockedArgWhitelist = _parsedBaw.map(function (s) {
                    if (typeof s === 'object' && s.name) return s.name;
                    try { var inner = JSON.parse(s); return inner.name || inner; } catch (e) { return s; }
                }).filter(Boolean);
            }
        } catch (e) { }

        // [PLAYER AUTO UPDATE] Read parameters -> Pack playerUpdateOpts (injected into loader at Pack time)
        var _pau_binNameRaw = (parameters['Game Binary Name'] || '').trim();
        var _pau_binName = (_pau_binNameRaw && _pau_binNameRaw.length > 0) ? _pau_binNameRaw : 'game.bin';
        // Strip path separators, keep name only (safety)
        _pau_binName = path.basename(_pau_binName);
        if (!_pau_binName || _pau_binName.length === 0) _pau_binName = 'game.bin';

        // [SPLIT] Parse File Split toggle and Split rules
        var vfsFileSplitEnabled = (parameters['File Split'] !== 'false');
        var splitRules = [];
        if (vfsFileSplitEnabled) {
            try {
                var _splitsStr = parameters['File Split List'];
                if (_splitsStr) {
                    var _parsedSplits = JSON.parse(_splitsStr);
                    _parsedSplits.forEach(function (s) {
                        try {
                            var splitObj = (typeof s === 'string') ? JSON.parse(s) : s;
                            var binFile = path.basename(((splitObj['Split Bin File'] || '')).trim());
                            if (!binFile || binFile === _pau_binName) return; // skip empty or same-as-main
                            var patternsStr = splitObj['Split Path Patterns'];
                            var patterns = [];
                            try {
                                var parsedPatterns = JSON.parse(patternsStr);
                                parsedPatterns.forEach(function (p) {
                                    var pat;
                                    if (typeof p === 'object' && p !== null) {
                                        pat = String(p.name || '');
                                    } else {
                                        try { var inner = JSON.parse(p); pat = String(inner && inner.name ? inner.name : inner); } catch (e) { pat = String(p); }
                                    }
                                    pat = pat.trim().replace(/\\/g, '/').replace(/\/+$/, '');
                                    if (pat) patterns.push(pat);
                                });
                            } catch (e) { logWarn('parseSplitPatterns', e); }
                            if (patterns.length > 0) {
                                splitRules.push({ binName: binFile, patterns: patterns });
                                logInfo('Split rule: ' + binFile + ' <- [' + patterns.join(', ') + ']');
                            }
                        } catch (e) { logWarn('parseSplitEntry', e); }
                    });
                }
            } catch (e) { logWarn('parseVfsSplits', e); }
        }
        if (vfsFileSplitEnabled && splitRules.length === 0) {
            vfsFileSplitEnabled = false;
            logInfo('File Split: enabled but no valid rules found — treating as disabled.');
        }
        if (splitRules.length > 0) {
            logInfo('File Split: ' + splitRules.length + ' split(s) configured.');
        }

        // [SPLIT] Split bin files must be excluded from env hash computation,
        // both at Pack time and at runtime (via _EXCLUDED_BINARY_HASHES_RAW injection).
        // Otherwise their presence in the binary scan folder would corrupt the env hash.
        splitRules.forEach(function (rule) {
            if (excludedBinaryHashes.indexOf(rule.binName) === -1) {
                excludedBinaryHashes.push(rule.binName);
                logInfo('Split bin excluded from env hash: ' + rule.binName);
            }
        });

        var earlyBlobResolve = (parameters['Early Blob Resolve'] || 'true') === 'true';
        var _toI = function (s, def) { var n = parseInt(s, 10); return isNaN(n) ? def : n; };
        var _toF = function (s, def) { var n = parseFloat(s); return isNaN(n) ? def : n; };

        function _sanitizeColor(c, fallback) {
            if (!c) return fallback;
            c = c.trim();
            if (/^[0-9a-fA-F]{3}$/.test(c) || /^[0-9a-fA-F]{6}$/.test(c)) return '#' + c;
            return c;
        }

        var playerUpdateOpts = {
            enabled: (parameters['Player Auto Update'] || 'false') === 'true',
            url: (parameters['Player Auto Update URL'] || '').trim(),
            tags: [],
            binName: _pau_binName,
            disableNoNet: (parameters['Player Auto Update Disable On No Internet'] || 'false') === 'true',
            disableFail: (parameters['Player Auto Update Disable On Fail'] || 'false') === 'true',
            blockResize: (parameters['Block Window Resize'] || 'false') === 'true',
            blockF2: (parameters['Block F2 Key'] || 'false') === 'true',
            blockF4: (parameters['Block F4 Key'] || 'false') === 'true',
            blockF5: (parameters['Block F5 Key'] || 'false') === 'true',
            ui: {
                updateText: (parameters['PAU Scene Update Text'] || '').trim() || 'Updating...',
                completeText: (parameters['PAU Scene Complete Text'] || '').trim() || 'Update complete!',
                failedText: (parameters['PAU Scene Failed Text'] || '').trim() || 'Update failed',
                blink: (parameters['PAU Scene Blink'] || 'true') === 'true',
                blinkSpeed: _toF(parameters['PAU Scene Blink Speed'], 0.050),
                showProgress: (parameters['PAU Scene Show Progress'] || 'true') === 'true',
                bgType: (parameters['PAU Scene BG Type'] || 'color').trim(),
                bgImage: (parameters['PAU Scene BG Image'] || '').trim(),
                bgVideo: (parameters['PAU Scene BG Video'] || '').trim(),
                bgFit: (parameters['PAU Scene BG Fit'] || 'cover').trim(),
                videoLoop: (parameters['PAU Scene Video Loop'] || 'true') === 'true',
                videoVolume: _toI(parameters['PAU Scene Video Volume'], 100),
                bgMusic: (parameters['PAU Scene BG Music'] || '').trim(),
                bgMusicVolume: _toI(parameters['PAU Scene BG Music Volume'], 100),
                bgMusicLoop: (parameters['PAU Scene BG Music Loop'] || 'true') === 'true',
                titleXOffset: _toI(parameters['PAU Scene Title X Offset'], 0),
                titleYOffset: _toI(parameters['PAU Scene Title Y Offset'], -30),
                titleSize: _toI(parameters['PAU Scene Title Size'], 36),
                subXOffset: _toI(parameters['PAU Scene Sub X Offset'], 0),
                subYOffset: _toI(parameters['PAU Scene Sub Y Offset'], 30),
                subSize: _toI(parameters['PAU Scene Sub Size'], 18),
                titleOutlineWidth: _toI(parameters['PAU Scene Title Outline Width'], 0),
                subOutlineWidth: _toI(parameters['PAU Scene Sub Outline Width'], 0),
                bgColor: _sanitizeColor(parameters['PAU Scene BG Color'], '#000000'),
                titleColor: _sanitizeColor(parameters['PAU Scene Title Color'], '#ffffff'),
                subColor: _sanitizeColor(parameters['PAU Scene Sub Color'], '#888888'),
                titleOutlineColor: _sanitizeColor(parameters['PAU Scene Title Outline Color'], 'rgba(0,0,0,0.5)'),
                subOutlineColor: _sanitizeColor(parameters['PAU Scene Sub Outline Color'], 'rgba(0,0,0,0.5)'),
            }
        };
        try {
            var _pausTagsStr = parameters['Player Auto Update Tag'];
            if (_pausTagsStr && _pausTagsStr.trim()) {
                playerUpdateOpts.tags = [_pausTagsStr.trim()];
            }
        } catch (e) { }

        var updateUI = function (major, minor) {
            Scene_PackProgress.status = { title: "SecuPacker", major: major, minor: minor || "" };
        };

        Scene_PackProgress.status = { title: "SecuPacker", major: "Initializing...", minor: "Safe Mode Active" };

        var jsPath = path.join(projectPath, 'js');
        var libsDir = path.join(jsPath, 'libs');
        var pluginsDir = path.join(jsPath, 'plugins');

        var backupPath = path.join(jsPath, 'plugins.js.bak');
        var sdkZipPath = path.join(projectPath, 'temp_sdk.zip');
        var tempExtractDir = path.join(projectPath, 'temp_sdk_extract');
        var tempCombinedJs = path.join(projectPath, 'temp_combined.js');
        // game.bin and temp_game.res always live at true project root
        var outputBinaryPath = path.join(projectPath, _pau_binName);
        var tempResourcePath = path.join(projectPath, 'temp_game.res');
        var v8LogPath = path.join(projectPath, 'v8.log');

        tempFilesRegistry.push(sdkZipPath, tempExtractDir, tempCombinedJs, v8LogPath, tempResourcePath);

        // [SPLIT] Create temp file paths for each split resource file and register for cleanup
        var splitTempPaths = splitRules.map(function (rule, i) {
            return path.join(projectPath, 'temp_split_' + i + '.res');
        });
        splitTempPaths.forEach(function (p) { tempFilesRegistry.push(p); });

        // [SECURITY] High Entropy Key Generation
        var dynamicKeyBuf = crypto.randomBytes(32);
        var compilerPath = "";
        var compiledPluginBinsResult = null; // { compiledBins, failedPlugins }
        var envBoundKeyBuf = null; // [ENV BINDING] Derived after V8 compile
        var modifiedIndexHtmlContent = null; // [HTML HASH] Modified index.html for env-hash

        // ── PHASE 0: BAK CLEANUP ──────────────────────────────────────────────
        // Delete leftover _*.*.bak files created by flavor swap (SDK -> Normal).
        // These are the original SDK binaries renamed during the swap process.
        // Condition: filename starts with '_', has ≥2 dots, ends with '.bak'
        // Scope: exe directory top-level + one level deeper (immediate subdirs)
        (function cleanupBakFiles() {
            function cleanBakFilesInDir(dir) {
                try {
                    var items = fs.readdirSync(dir);
                    for (var _bi = 0; _bi < items.length; _bi++) {
                        var fname = items[_bi];
                        if (fname.charAt(0) !== '_' || !fname.endsWith('.bak')) continue;
                        var dotCount = 0;
                        for (var _ci = 0; _ci < fname.length; _ci++) {
                            if (fname.charAt(_ci) === '.') dotCount++;
                        }
                        if (dotCount >= 2) {
                            try {
                                fs.unlinkSync(path.join(dir, fname));
                                logInfo('BAK cleanup: deleted ' + fname);
                            } catch (e) { logWarn('bakCleanup', e); }
                        }
                    }
                } catch (e) { logWarn('bakCleanupScan', e); }
            }
            try {
                var execDir = path.dirname(process.execPath);
                // Scan execDir top-level
                cleanBakFilesInDir(execDir);
                // Scan one level deeper (immediate subdirs of execDir)
                var topItems = fs.readdirSync(execDir);
                for (var _si = 0; _si < topItems.length; _si++) {
                    var subPath = path.join(execDir, topItems[_si]);
                    try {
                        if (fs.statSync(subPath).isDirectory()) cleanBakFilesInDir(subPath);
                    } catch (e) { }
                }
            } catch (e) { logWarn('bakCleanupScan', e); }
        })();

        // ── PHASE 0: UNNECESSARY FILE CLEANUP ────────────────────────────────
        // Delete files that exist in the SDK Pack but are not needed at runtime.
        // These are removed outright (not renamed to .bak).
        (function cleanupUnnecessaryFiles() {
            try {
                var execDir = path.dirname(process.execPath);
                for (var _ui = 0; _ui < CLEANUP_TARGETS.length; _ui++) {
                    var filePath = path.join(execDir, CLEANUP_TARGETS[_ui]);
                    if (fs.existsSync(filePath)) {
                        try {
                            if (fs.statSync(filePath).isDirectory()) {
                                performRecursiveDelete([filePath]);
                            } else {
                                fs.unlinkSync(filePath);
                            }
                            logInfo('Unnecessary file cleanup: deleted ' + CLEANUP_TARGETS[_ui]);
                        } catch (e) { logWarn('unnecessaryFileCleanup', e); }
                    }
                }
            } catch (e) { logWarn('unnecessaryFileCleanupScan', e); }
        })();

        wait(500)
            .then(function () {
                updateUI("PHASE 1: ENTROPY", "Generating Secret Keys...");
                return wait(100);
            })
            .then(function () {
                updateUI("PHASE 2: ENVIRONMENT", "Acquiring Compiler...");
                return checkInternetConnection();
            })
            .then(function () {
                var sdkUrls = getNwjsUrls(process.versions.nw, process.arch, 'sdk');
                return downloadFileWithFallback(sdkUrls, sdkZipPath, updateUI);
            })
            .then(function () {
                return extractSpecificFiles(sdkZipPath, tempExtractDir);
            })
            .then(function () {
                // [CREDITS] If credits.html does not already exist in the exe directory,
                // copy it from the extracted SDK so it can later receive license entries.
                try {
                    var _execDir = path.dirname(process.execPath);
                    var _destCredits = path.join(_execDir, 'credits.html');
                    if (!fs.existsSync(_destCredits)) {
                        var _srcCredits = path.join(tempExtractDir, 'credits.html');
                        if (fs.existsSync(_srcCredits)) {
                            fs.writeFileSync(_destCredits, fs.readFileSync(_srcCredits));
                            logInfo('credits.html copied from SDK extract to exe directory.');
                        } else {
                            logWarn('creditsHtmlCopy', 'credits.html not found in SDK extract.');
                        }
                    }
                } catch (e) { logWarn('creditsHtmlCopy', e); }
            })
            .then(function () {
                return waitForFile(tempExtractDir, 'nwjc.exe', 30, updateUI);
            })
            .then(function (foundPath) {
                if (!foundPath) throw new Error(ERR.COMPILER_NOT_FOUND);
                compilerPath = foundPath;

                // [PLUGIN V8 COMPILE] Compile each plugin individually into .bin
                updateUI("PHASE 3: PLUGIN COMPILE", "Compiling Plugins to V8 Bytecode...");
                return new Promise(function (resolve, reject) {
                    try {
                        var targetPluginsFile = fs.existsSync(backupPath) ? backupPath : path.join(jsPath, 'plugins.js');
                        compiledPluginBinsResult = compilePluginBins(
                            compilerPath, pluginsDir, targetPluginsFile,
                            tempExtractDir, updateUI
                        );
                        logInfo('Compiled plugins:', Object.keys(compiledPluginBinsResult.compiledBins).length);
                        logInfo('VFS fallback plugins:', compiledPluginBinsResult.failedPlugins);
                        resolve();
                    } catch (e) { reject(e); }
                });
            })
            .then(function () {
                updateUI("PHASE 4: FUSION", "Bundling Logic...");
                return new Promise(function (resolve, reject) {
                    try {
                        var failedPlugins = compiledPluginBinsResult ? compiledPluginBinsResult.failedPlugins : [];
                        var compiledPluginNames = compiledPluginBinsResult ? Object.keys(compiledPluginBinsResult.compiledBins) : [];
                        var compiledBins = compiledPluginBinsResult ? compiledPluginBinsResult.compiledBins : {};
                        var combinedScript = bundleAllScripts({
                            jsPath: jsPath,
                            libsDir: libsDir,
                            pluginsDir: pluginsDir,
                            backupPath: backupPath,
                            masterKeyBuf: dynamicKeyBuf,
                            compiledPluginNames: compiledPluginNames,
                            failedPlugins: failedPlugins,
                            compiledBins: compiledBins,
                            hashExeFiles: hashExeFiles,
                            enableSecurityWatchdog: enableSecurityWatchdog,
                            excludedBinaryHashes: excludedBinaryHashes,
                            playerUpdateOpts: playerUpdateOpts,
                            blockedArgWhitelist: blockedArgWhitelist,
                            earlyBlobResolve: earlyBlobResolve
                        });
                        fs.writeFileSync(tempCombinedJs, combinedScript);
                        resolve();
                    } catch (e) { reject(e); }
                });
            })
            .then(function () {
                // [PHASE 5: HTML PRE-INJECTION]
                updateUI("PHASE 5: HTML PRE-INJECTION", "Pre-injecting Loader Stub...");
                try {
                    backupFileToBak(
                        path.join(projectPath, 'index.html'),
                        path.join(projectPath, 'index.html.bak')
                    );
                    logInfo('index.html backed up -> index.html.bak');
                    var _htmlResult = modifyIndexHtml(projectPath, _pau_binName);
                    if (_htmlResult) {
                        modifiedIndexHtmlContent = _htmlResult;
                    }
                } catch (e) { logWarn('htmlPreInject', e); }
            })
            .then(function () {
                updateUI("PHASE 6: CRYSTALLIZATION", "Compiling V8 Snapshot...");
                return runCompilerSafe(compilerPath, tempCombinedJs, outputBinaryPath);
            })
            .then(function () {
                // [ENV BINDING]
                // At this point outputBinaryPath (game.bin) contains ONLY the V8 snapshot —
                // the resource segment has not been appended yet.
                // That means its entire byte content equals what will become [0..ResourceStartOffset)
                // in the final merged file, which is exactly what the runtime reads when it calls
                // computeRuntimeEnvHash(). Both sides hash the same bytes -> keys match.
                updateUI("PHASE 7: ENV BINDING", "Computing Environment Fingerprint...");
                return new Promise(function (resolve, reject) {
                    try {
                        var _ebh = computePackTimeEnvHash(projectPath, outputBinaryPath, hashExeFiles, excludedBinaryHashes, modifiedIndexHtmlContent);
                        envBoundKeyBuf = crypto.createHmac('sha256', dynamicKeyBuf).update(_ebh).digest();
                        _ebh.fill(0);

                        // [Security] masterKey is no longer needed — clear it.
                        // All subsequent crypto uses envBoundKeyBuf.
                        dynamicKeyBuf.fill(0);
                        resolve();
                    } catch (e) { reject(e); }
                });
            })
            .then(function () {
                updateUI("PHASE 8: ATOMIZATION", "Compress & Encrypt Resources...");
                return wait(50);
            })
            .then(function () {
                return new Promise(function (resolve, reject) {
                    try {
                        var resourceBasePath = projectPath;
                        var failedPlugins = compiledPluginBinsResult ? compiledPluginBinsResult.failedPlugins : [];

                        // ── [RUNTIME WRITE TRACKING] Load recorded files to keep on disk ──
                        if (trackRuntimeWritesEnabled) {
                            var _rwLogPath = path.join(resourceBasePath, 'data', 'SecuPacker_RuntimeWrites.txt');
                            try {
                                if (fs.existsSync(_rwLogPath)) {
                                    var _rwLines = fs.readFileSync(_rwLogPath, 'utf8').split('\n');
                                    _rwLines.forEach(function (line) {
                                        var t = line.trim().replace(/\\/g, '/');
                                        if (t && !runtimeWriteMap[t.toLowerCase()]) {
                                            runtimeWriteRelPaths.push(t);
                                            runtimeWriteMap[t.toLowerCase()] = true;
                                        }
                                    });
                                    logInfo('Runtime-write tracking: ' + runtimeWriteRelPaths.length + ' file(s) will be kept on disk.');
                                }
                            } catch (e) { logWarn('loadRuntimeWrites', e); }
                            // Exclude the log file from VFS; it is deleted at cleanup, not restored
                            var _rwLogRel = path.relative(resourceBasePath, _rwLogPath).replace(/\\/g, '/');
                            if (!runtimeWriteMap[_rwLogRel.toLowerCase()]) {
                                runtimeWriteMap[_rwLogRel.toLowerCase()] = true;
                                // NOT added to runtimeWriteRelPaths — should be deleted, not kept on disk
                            }
                        }

                        // ── [Packed File Exclusions] Add manually excluded paths to on-disk list ──
                        if (diskExcludeList.length > 0) {
                            var _deAdded = 0;
                            diskExcludeList.forEach(function (_deEntry) {
                                var _deAbs = path.join(resourceBasePath, _deEntry.replace(/\//g, path.sep));
                                if (!fs.existsSync(_deAbs)) {
                                    logWarn('diskExclude', 'Path not found, skipping: ' + _deEntry);
                                    return;
                                }
                                var _deStat;
                                try { _deStat = fs.lstatSync(_deAbs); } catch (e) { return; }
                                if (_deStat.isDirectory()) {
                                    // Recursively enumerate all files under this folder
                                    (function _deAddDir(dir) {
                                        try {
                                            fs.readdirSync(dir).forEach(function (child) {
                                                var childFull = path.join(dir, child);
                                                var childStat;
                                                try { childStat = fs.lstatSync(childFull); } catch (e) { return; }
                                                if (childStat.isSymbolicLink()) return;
                                                var childRel = path.relative(resourceBasePath, childFull).replace(/\\/g, '/');
                                                if (childStat.isDirectory()) {
                                                    _deAddDir(childFull);
                                                } else {
                                                    var childRelLower = childRel.toLowerCase();
                                                    if (!runtimeWriteMap[childRelLower]) {
                                                        runtimeWriteMap[childRelLower] = true;
                                                        runtimeWriteRelPaths.push(childRel);
                                                        _deAdded++;
                                                    }
                                                }
                                            });
                                        } catch (e) { logWarn('diskExcludeDir', e); }
                                    })(_deAbs);
                                } else if (_deStat.isFile()) {
                                    var _deRelLower = _deEntry.toLowerCase();
                                    if (!runtimeWriteMap[_deRelLower]) {
                                        runtimeWriteMap[_deRelLower] = true;
                                        runtimeWriteRelPaths.push(_deEntry);
                                        _deAdded++;
                                    }
                                }
                            });
                            logInfo('Packed File Exclusions: ' + _deAdded + ' file(s) will be kept on disk.');
                        }

                        // ── [VFS] Write filtered plugins.js to disk ────────────────────────
                        (function () {
                            var _targetPF = fs.existsSync(backupPath)
                                ? backupPath
                                : path.join(jsPath, 'plugins.js');
                            if (fs.existsSync(_targetPF)) {
                                try {
                                    var _pRaw = fs.readFileSync(_targetPF, 'utf8');
                                    var _pList = JSON.parse(_pRaw.substring(_pRaw.indexOf('['), _pRaw.lastIndexOf(']') + 1).replace(/,\s*\]/g, ']'));
                                    // [VFS SELF-STRIP] Remove SecuPacker's own entry from the VFS copy of plugins.js.
                                    // At runtime SecuPacker is already executed by the V8 self-loader (STEP 1),
                                    // so its $plugins entry is unnecessary and would expose the plugin name in
                                    // the encrypted archive.
                                    var _pListVfs = _pList.filter(function (p) { return p.name !== PLUGIN_NAME; });
                                    var _fullContent = "var $plugins =\n" + JSON.stringify(_pListVfs, null, 4) + "\n;";
                                    fs.writeFileSync(path.join(jsPath, 'plugins.js'), _fullContent, 'utf8');
                                    logInfo('plugins.js written for VFS packing (' + _pListVfs.length + ' plugins, SecuPacker self-entry stripped)');
                                } catch (e) { logWarn('vfsPluginsJsWrite', e); }
                            }
                        })();
                        // ── end VFS plugins.js write ───────────────────────────────────────

                        var protectedJsFiles = getProtectedJsFiles(resourceBasePath, failedPlugins);
                        // [BIN NAME] Ensure the output binary (regardless of extension) is excluded from VFS.
                        // The default filter only excludes '.bin'/'.res'/'.log' by extension,
                        // so a custom name like 'game.star' would otherwise be packed into itself.
                        var _binSkipAdded = false;
                        if (SKIP_FILES.indexOf(_pau_binName) === -1) {
                            SKIP_FILES.push(_pau_binName);
                            _binSkipAdded = true;
                        }
                        // [SPLIT] Exclude all split bin filenames from VFS packing too
                        var _splitBinsAdded = [];
                        splitRules.forEach(function (rule) {
                            if (SKIP_FILES.indexOf(rule.binName) === -1) {
                                SKIP_FILES.push(rule.binName);
                                _splitBinsAdded.push(rule.binName);
                            }
                        });
                        try {
                            // [ENV BINDING] Pass envBoundKeyBuf so that the TOC and every file
                            // entry are encrypted with a key that encodes the environment state.
                            packResourcesSecure(resourceBasePath, tempResourcePath, envBoundKeyBuf, updateUI, protectedJsFiles, runtimeWriteMap, splitRules, splitTempPaths);
                        } finally {
                            // Restore SKIP_FILES even if packResourcesSecure throws
                            if (_binSkipAdded) SKIP_FILES.pop();
                            // [SPLIT] Restore SKIP_FILES for split bin names
                            _splitBinsAdded.forEach(function (name) {
                                var _idx = SKIP_FILES.lastIndexOf(name);
                                if (_idx !== -1) SKIP_FILES.splice(_idx, 1);
                            });
                        }
                        resolve();
                    } catch (e) { reject(e); }
                });
            })
            .then(function () {
                updateUI("PHASE 9: MERGE", "Constructing Final Binary...");
                return mergeBinAndResourceStream(outputBinaryPath, tempResourcePath);
            })
            .then(function () {
                // [SPLIT] Move each split temp file to its final bin path
                for (var _sfi = 0; _sfi < splitRules.length; _sfi++) {
                    var _splitFinal = path.join(projectPath, splitRules[_sfi].binName);
                    var _splitTemp = splitTempPaths[_sfi];
                    if (fs.existsSync(_splitTemp)) {
                        try {
                            if (fs.existsSync(_splitFinal)) fs.unlinkSync(_splitFinal);
                            fs.renameSync(_splitTemp, _splitFinal);
                            logInfo('Split finalized: ' + splitRules[_sfi].binName);
                        } catch (e) { logWarn('finalizeSplits', e); }
                    }
                }
            })
            .then(function () {
                updateUI("PHASE 10: VERIFY", "Verifying Output...");
                return wait(100);
            })
            .then(function () {
                updateUI("PHASE 11: CLEANUP", "Erasing Footprints...");
                var _splitBinNames = splitRules.map(function (r) { return r.binName; });

                // [LICENSE NOTICE] Collect license headers from js/libs and immediately
                // append them to credits.html — both must happen BEFORE
                try {
                    var _libLicensesText = collectLibLicenses(libsDir);
                    if (_libLicensesText) {
                        var _execDir = path.dirname(process.execPath);
                        var _creditsPath = path.join(_execDir, 'credits.html');
                        var _licHtml = convertLicensesToHtml(_libLicensesText);
                        if (_licHtml) appendLicensesToCreditsHtml(_creditsPath, _licHtml);
                    }
                } catch (e) { logWarn('licenseAppend', e); }

                performAggressiveCleanup(projectPath, tempFilesRegistry, hashExeFiles, _pau_binName, runtimeWriteRelPaths, projectPath, stripReadOnlyAttrs, _splitBinNames);

                // [Security] Zeroize env-bound key — no longer needed after cleanup
                if (envBoundKeyBuf) { envBoundKeyBuf.fill(0); envBoundKeyBuf = null; }

                updateUI("COMPLETE", "System Restarting...");

                if (window.SceneManager && SceneManager._scene) {
                    SceneManager._scene._finished = true;
                }

                return wait(1500);
            })
            .then(function () {
                window.__IS_PackING__ = false;
                if (!playerUpdateOpts.enabled) {
                    setTimeout(function () {
                        try {
                            var cp = require('child_process');
                            var launchArgs = [];
                            try {
                                if (typeof nw !== 'undefined' && nw.App && Array.isArray(nw.App.argv))
                                    launchArgs = nw.App.argv;
                            } catch (e) { }
                            var child = cp.spawn(process.execPath, launchArgs, {
                                detached: true,
                                stdio: 'ignore'
                            });
                            child.unref();
                        } catch (e) { }
                        process.exit(0);
                    }, 200);
                } else {
                    alert("Pack complete.");
                    process.exit(0);
                }
            })
            .catch(function (e) {
                window.__IS_PackING__ = false;
                if (window.SceneManager && SceneManager._scene) {
                    SceneManager._scene._finished = true;
                }
                updateUI("FATAL ERROR", e.message);
                if (e.message === "Compiler error: 3") {
                    alert(
                        "Pack Error: " + e.message + "\n\n" +
                        "The path name is not allowed or the path is too long.\n" +
                        "Please use only numbers and alphabetic letters (A-Z, a-z).\n" +
                        "Renaming folders after the Pack is allowed.\n" +
                        "If the path is too long, please place the project in a shorter path.\n\n" +
                        "(Restoring...)"
                    );
                } else {
                    alert("Pack Error: " + e.message + "\n(Restoring...)");
                }
                process.exit(1);
            });
    };

    // ===========================================================================
    // [PART 2] Hijack Logic
    // ===========================================================================
    // [BIN NAME] Read Game Binary Name in outer scope so binExists check works at module load time.
    // startPackProcess also reads this independently via its own _pau_binName local var.
    var _outerBinName = (function () {
        try {
            var _obp = PluginManager.parameters(PLUGIN_NAME);
            var _obn = (_obp['Game Binary Name'] || '').trim();
            _obn = path.basename(_obn);
            return (_obn && _obn.length > 0) ? _obn : 'game.bin';
        } catch (e) { return 'game.bin'; }
    })();
    var binExists = fs.existsSync(path.join(projectPath, _outerBinName));
    var backupExists = fs.existsSync(path.join(projectPath, 'js', 'plugins.js.bak'));
    var isTest = Utils.isOptionValid('test');

    if (!isTest && (!binExists || backupExists)) {
        logInfo('Hijacking Scene...');

        window.addEventListener('load', function () {
            setTimeout(function () {
                if (typeof SceneManager !== 'undefined' && !SceneManager._scene) {
                    logInfo('Forcing SceneManager.run because main.js failed to call it!');
                    try {
                        SceneManager.run(Scene_PackProgress);
                    } catch (e) {
                        logError('Force boot failed:', e);
                    }
                }
            }, 1000);
        });

        try {

            if (backupExists) {
                window.addEventListener('error', function (e) {
                    e.preventDefault(); e.stopPropagation();
                }, true);
                window.addEventListener('unhandledrejection', function (e) {
                    e.preventDefault();
                });
                if (typeof SceneManager !== 'undefined') {
                    SceneManager.catchException = function (e) {
                        if (!this._stopped) {
                            requestAnimationFrame(this.update.bind(this));
                        }
                    };
                    SceneManager.catchNormalError = function () { };
                    SceneManager.catchUnknownError = function () { };
                    SceneManager.onError = function () { };

                    SceneManager.updateInputData = function () {
                        try {
                            if (typeof Input !== 'undefined') Input.update();
                        } catch (_ie) { }
                        try {
                            if (typeof TouchInput !== 'undefined') TouchInput.update();
                        } catch (_te) { }
                    };
                }
                if (typeof PluginManager !== 'undefined') PluginManager.checkErrors = function () { };
                if (typeof DataManager !== 'undefined') DataManager.checkError = function () { };
                if (typeof AudioManager !== 'undefined') AudioManager.checkErrors = function () { };
            }

            if (!isRPGMakerMZ() && backupExists) {
                if (typeof Graphics !== 'undefined') {
                    Graphics.updateLoading = function () { };
                    Graphics._paintUpperCanvas = function () { };
                }

                if (typeof DataManager !== 'undefined') {
                    DataManager.loadDatabase = function () { };
                    DataManager.isDatabaseLoaded = function () { return true; };
                }

                if (typeof ImageManager !== 'undefined') {
                    ImageManager.isReady = function () { return true; };
                }

                SceneManager.initialize = function () {
                    var steps = [
                        'initGraphics', 'checkFileAccess', 'initAudio',
                        'initInput', 'initNwjs', 'checkPluginErrors', 'setupErrorHandlers'
                    ];
                    for (var _si = 0; _si < steps.length; _si++) {
                        try {
                            if (typeof this[steps[_si]] === 'function') {
                                this[steps[_si]]();
                            }
                        } catch (_stepErr) { }
                    }
                    try {
                        if (typeof Input !== 'undefined' && !Input._currentState) {
                            Input.clear();
                        }
                    } catch (_ie) { }
                    try {
                        if (typeof TouchInput !== 'undefined' && !TouchInput._events) {
                            TouchInput.clear();
                        }
                    } catch (_te) { }
                };

                SceneManager.run = function (sceneClass) {
                    try { this.initialize(); } catch (_re) { }
                    try { this.goto(sceneClass); } catch (_ge) { }
                    try { this.requestUpdate(); } catch (_ue) { }
                };
            }

            var _SceneManager_goto = SceneManager.goto;
            SceneManager.goto = function (sceneClass) {
                if (sceneClass === Scene_Boot || sceneClass === Scene_PackProgress) {
                    try {
                        _SceneManager_goto.call(this, sceneClass);
                    } catch (e) { }
                } else {
                    try {
                        _SceneManager_goto.call(this, Scene_PackProgress);
                    } catch (e) { }
                }
            };

            if (typeof Scene_Boot !== 'undefined') {
                var _readyFrameCount = 0;
                Scene_Boot.prototype.isReady = function () {
                    _readyFrameCount++;
                    if (_readyFrameCount > 180) {
                        return true;
                    }
                    try {
                        if (!this._databaseLoaded) {
                            if (typeof DataManager !== 'undefined' && DataManager.isDatabaseLoaded() &&
                                (typeof StorageManager === 'undefined' || !StorageManager.forageKeysUpdated || StorageManager.forageKeysUpdated())) {
                                this._databaseLoaded = true;
                                try {
                                    this.onDatabaseLoaded();
                                } catch (e) { }
                            }
                            return false;
                        }
                        var baseReady = true;
                        try {
                            baseReady = Scene_Base.prototype.isReady.call(this);
                        } catch (e) { }
                        var playerReady = true;
                        try {
                            playerReady = this.isPlayerDataLoaded ? this.isPlayerDataLoaded() : true;
                        } catch (e) { }
                        return baseReady && playerReady;
                    } catch (e) {
                        return true;
                    }
                };

                Scene_Boot.prototype.onDatabaseLoaded = function () {
                    try {
                        if (typeof this.setEncryptionInfo === 'function') this.setEncryptionInfo();
                    } catch (e) { }
                    try {
                        if (typeof this.loadSystemImages === 'function') this.loadSystemImages();
                    } catch (e) { }
                    try {
                        if (typeof this.loadPlayerData === 'function') this.loadPlayerData();
                    } catch (e) { }
                    try {
                        if (typeof this.loadGameFonts === 'function') this.loadGameFonts();
                    } catch (e) { }
                };

                Scene_Boot.prototype.start = function () {
                    try {
                        Scene_Base.prototype.start.call(this);
                    } catch (e) { }
                    try {
                        if (typeof SoundManager !== 'undefined' && typeof SoundManager.preloadImportantSounds === 'function') {
                            SoundManager.preloadImportantSounds();
                        }
                    } catch (e) { }
                    try {
                        if (typeof this.resizeScreen === 'function') this.resizeScreen();
                    } catch (e) { }
                    try {
                        if (typeof this.updateDocumentTitle === 'function') this.updateDocumentTitle();
                    } catch (e) { }
                    SceneManager.goto(Scene_PackProgress);
                };
            }
        } catch (__hijackErr) {
            logError('', __hijackErr);
        }
    }

    // ===========================================================================
    // [PART 3] Runtime Write Tracking
    //   When "Track Runtime Writes" is true and NOT in Pack phase, hooks fs
    //   write/delete operations from other plugins and records touched files to
    //   data/SecuPacker_RuntimeWrites.txt (append-only, no duplicates).
    //   The log file is hidden on Windows via attrib +H.
    //   At pack time, logged files are left on disk; the log itself is deleted.
    //   Exclusions: save/, outside projectPath, the log file itself,
    //   Churitoring_SecuPacker.js, debug_console(Pack).txt.
    // ===========================================================================
    (function () {
        var _twParam = PluginManager.parameters(PLUGIN_NAME)['Track Runtime Writes'];
        var _twEnabled = (_twParam !== 'false'); // default true
        if (!_twEnabled) return;

        var _RW_LOG = path.join(projectPath, 'data', 'SecuPacker_RuntimeWrites.txt');
        var _rwLoaded = null;  // null = not yet loaded; {} = rel-lower -> true
        var _rwHidden = false; // whether attrib +H has been applied on Windows

        // Capture originals BEFORE any hooking
        var _rwOrigWriteFileSync = fs.writeFileSync;
        var _rwOrigWriteFile = fs.writeFile;
        var _rwOrigAppendFileSync = fs.appendFileSync;
        var _rwOrigAppendFile = fs.appendFile;
        var _rwOrigOpenSync = fs.openSync;
        var _rwOrigCreateWriteStream = fs.createWriteStream;
        var _rwOrigRenameSync = fs.renameSync;
        var _rwOrigRename = fs.rename;
        var _rwOrigExistsSync = fs.existsSync;
        var _rwOrigReadFileSync = fs.readFileSync;
        var _rwOrigMkdirSync = fs.mkdirSync;

        function _rwLoad() {
            if (_rwLoaded !== null) return;
            _rwLoaded = {};
            try {
                if (_rwOrigExistsSync(_RW_LOG)) {
                    var _lines = _rwOrigReadFileSync(_RW_LOG, 'utf8').split('\n');
                    _lines.forEach(function (l) { var t = l.trim(); if (t) _rwLoaded[t.toLowerCase()] = true; });
                }
            } catch (e) { }
        }

        // Hide the log file on Windows (idempotent, called after first write)
        function _rwHideFile() {
            if (_rwHidden || process.platform !== 'win32') { _rwHidden = true; return; }
            try {
                require('child_process').execSync('attrib +H "' + _RW_LOG + '"', { timeout: 3000, windowsHide: true });
            } catch (e) { }
            _rwHidden = true;
        }

        var _canonProject = null;
        function _getCanonProject() {
            if (!_canonProject) _canonProject = path.resolve(projectPath).toLowerCase();
            return _canonProject;
        }

        var _rwLogRelLower = null;
        function _getLogRelLower() {
            if (!_rwLogRelLower) _rwLogRelLower = path.relative(projectPath, _RW_LOG).replace(/\\/g, '/').toLowerCase();
            return _rwLogRelLower;
        }

        function _rwShouldTrack(filePath) {
            try {
                if (typeof filePath !== 'string') return null;
                var absPath = path.resolve(filePath);
                var absLower = absPath.toLowerCase();
                var canon = _getCanonProject();
                if (absLower.indexOf(canon) !== 0) return null;
                if (absLower.length <= canon.length) return null;
                var relPath = path.relative(projectPath, absPath).replace(/\\/g, '/');
                var relLower = relPath.toLowerCase();
                if (relLower === 'save' || relLower.indexOf('save/') === 0) return null;
                if (relLower === _getLogRelLower()) return null;
                // Exclude the Pack-time debug console log
                var bn = path.basename(absPath);
                if (bn.toLowerCase() === 'debug_console(Pack).txt') return null;
                // Binding with FOSSIL
                if (bn.toLowerCase() === 'FOSSILindex.html') return null;
                if (bn.toLowerCase() === (PLUGIN_NAME + '.js').toLowerCase()) return null;
                return relPath;
            } catch (e) { return null; }
        }

        function _rwRecord(filePath) {
            if (!isTest) return; // only record during playtest
            var relPath = _rwShouldTrack(filePath);
            if (!relPath) return;
            _rwLoad();
            var key = relPath.toLowerCase();
            if (_rwLoaded[key]) return;
            _rwLoaded[key] = true;
            try {
                var dataDir = path.join(projectPath, 'data');
                if (!_rwOrigExistsSync(dataDir)) {
                    try { _rwOrigMkdirSync(dataDir); } catch (e) { }
                }
                _rwOrigAppendFileSync(_RW_LOG, relPath + '\n', 'utf8');
                _rwHideFile(); // hide after first successful write
            } catch (e) { }
        }

        // ── Hook write operations ────────────────────────────────────────────
        fs.writeFileSync = function (file) {
            if (typeof file === 'string') _rwRecord(file);
            return _rwOrigWriteFileSync.apply(this, arguments);
        };
        fs.writeFile = function (file) {
            if (typeof file === 'string') _rwRecord(file);
            return _rwOrigWriteFile.apply(this, arguments);
        };
        fs.appendFileSync = function (file) {
            if (typeof file === 'string') _rwRecord(file);
            return _rwOrigAppendFileSync.apply(this, arguments);
        };
        fs.appendFile = function (file) {
            if (typeof file === 'string') _rwRecord(file);
            return _rwOrigAppendFile.apply(this, arguments);
        };
        fs.openSync = function (file, flags) {
            if (typeof file === 'string' && typeof flags === 'string' && /[wa]/.test(flags)) _rwRecord(file);
            return _rwOrigOpenSync.apply(this, arguments);
        };
        fs.createWriteStream = function (file) {
            if (typeof file === 'string') _rwRecord(file);
            return _rwOrigCreateWriteStream.apply(this, arguments);
        };
        fs.renameSync = function (oldPath, newPath) {
            if (typeof newPath === 'string') _rwRecord(newPath);
            return _rwOrigRenameSync.apply(this, arguments);
        };
        fs.rename = function (oldPath, newPath, callback) {
            if (typeof newPath === 'string') _rwRecord(newPath);
            return _rwOrigRename.apply(this, arguments);
        };
    })();

    // ===========================================================================
    // [PART 4] Pack-Time Environment Fingerprint
    //   Mirrors the runtime computeRuntimeEnvHash() logic exactly.
    //   Must produce the same SHA-256 digest for the same set of files,
    //   otherwise envBoundKey computed here will not match the one the
    //   runtime loader derives, and the VFS will refuse to open.
    //
    //   Inputs hashed (deterministic sorted order):
    //     (A) Every file under projectPath whose extension is one of
    //         .dll .node .exe .lib .so .dylib   ← native binaries
    //         Each entry: relative-path (UTF-8) + raw file bytes
    //     (B) The entire content of v8BinPath (= game.bin at this point,
    //         which is the pure V8 snapshot before the resource segment
    //         is appended — exactly what the runtime reads as [0..ResourceStartOffset))
    // ===========================================================================

    /**
     * Normalizes an index.html string for env-hash computation by removing
     * ONLY the binary filename from the inline loader script tag.
     *
     * The script tag structure is matched in full — every other character must be
     * byte-for-byte identical between pack time and run time for the hash to match.
     * Only the segment between 'process.mainModule.filename),"' and '","r");'
     * (i.e. the game binary filename) is replaced with an empty string so that
     * renaming the binary does NOT invalidate the hash.
     *
     * @param {string} htmlStr - Full index.html content (modified, with loader injected)
     * @returns {string} Normalized html string ready for hashing
     */
    function normalizeHtmlForHash(htmlStr) {
        var _NH_RE = /(<script>try\{var _f=require\("fs"\),_pt=require\("path"\);process\.env\.__BIN_NAME__=")([^"]*)(";var _d=_f\.openSync\(_pt\.join\(_pt\.dirname\(process\.mainModule\.filename\),process\.env\.__BIN_NAME__\),"r"\);var _s=_f\.fstatSync\(_d\)\.size;var _ft=Buffer\.alloc\(16\);_f\.readSync\(_d,_ft,0,16,_s-16\);var _v=_ft\.readUInt32LE\(0\)\+_ft\.readUInt32LE\(4\)\*4294967296;var _b=Buffer\.allocUnsafe\(_v\);_f\.readSync\(_d,_b,0,_v,0\);_f\.closeSync\(_d\);\(global\.nw\|\|require\("nw\.gui"\)\)\.Window\.get\(window\)\.evalNWBin\((?:null|window\.frameElement\|\|null),_b\);_b=null;\}catch\(e\)\{alert\(e\);\}<\/script>)/;
        return htmlStr.replace(_NH_RE, '$1$3');
    }

    function computePackTimeEnvHash(projectPath, v8BinPath, hashExeFiles, excludedBinaryHashes, modifiedHtmlStr) {
        var _BEXTS = ['.dll', '.node', '.lib', '.dylib', '.so', '.pak', '.bin', '.dat'];

        excludedBinaryHashes = excludedBinaryHashes || [];

        var _selfBinBaseName = (v8BinPath ? path.basename(v8BinPath) : '').toLowerCase();

        // [RELIABLE BINARY ROOT] Use the directory of the running executable (Game.exe).
        var binaryScanRoot;
        try {
            binaryScanRoot = path.dirname(process.execPath);
        } catch (e) {
            binaryScanRoot = projectPath; // fallback (should never happen in NW.js)
        }
        var _SKIP = ['save', 'locales', 'swiftshader', 'temp_sdk_extract'];
        var _eh = crypto.createHash('sha256');

        var _SCAN_MAX_DEPTH = 8;
        function _scan(dir, depth) {
            if (depth > _SCAN_MAX_DEPTH) return;
            var _items;
            try { _items = fs.readdirSync(dir).sort(); } catch (e) { return; }
            for (var _i = 0; _i < _items.length; _i++) {
                var _fp = path.join(dir, _items[_i]);
                try {
                    var _st = fs.lstatSync(_fp);
                    if (_st.isSymbolicLink()) continue;
                    if (_st.isDirectory()) {
                        if (_SKIP.indexOf(_items[_i].toLowerCase()) === -1) _scan(_fp, depth + 1);
                    } else {
                        var _ex = path.extname(_items[_i]).toLowerCase();
                        if (_BEXTS.indexOf(_ex) !== -1 &&
                            _items[_i].toLowerCase() !== _selfBinBaseName &&
                            !isBinaryHashExcluded(_items[_i], excludedBinaryHashes)) {
                            var _rel = path.relative(binaryScanRoot, _fp).replace(/\\/g, '/').toLowerCase();
                            _eh.update(_rel);
                            _eh.update(fs.readFileSync(_fp));
                        }
                    }
                } catch (e) { /* locked / EBUSY — skip */ }
            }
        }
        _scan(binaryScanRoot, 0);

        if (hashExeFiles) {
            try {
                var _execPath = process.execPath;
                var _execName = path.basename(_execPath);
                if (!isBinaryHashExcluded(_execName, excludedBinaryHashes)) {
                    _eh.update(fs.readFileSync(_execPath));
                }
            } catch (e) { logWarn('computePackTimeEnvHash:exe', e); }
            // Also hash notification_helper.exe if it exists in the same directory.
            // If the file is absent, this block is silently skipped — no error.
            try {
                var _nhExePath = path.join(path.dirname(process.execPath), 'notification_helper.exe');
                if (!isBinaryHashExcluded('notification_helper.exe', excludedBinaryHashes)) {
                    var _nhExeRel = path.relative(binaryScanRoot, _nhExePath).replace(/\\/g, '/').toLowerCase();
                    _eh.update(_nhExeRel);
                    _eh.update(fs.readFileSync(_nhExePath));
                }
            } catch (e) { /* notification_helper.exe not present — skip */ }
        }

        // Hash the V8 snapshot in 4 MB streaming chunks (avoids large alloc for big snapshots)
        try {
            var _vfd = fs.openSync(v8BinPath, 'r');
            var _vsz = fs.fstatSync(_vfd).size;
            var _vpos = 0;
            var _VCHUNK = 4 * 1024 * 1024;
            while (_vpos < _vsz) {
                var _vread = Math.min(_VCHUNK, _vsz - _vpos);
                var _vbuf = Buffer.alloc ? Buffer.alloc(_vread) : new Buffer(_vread);
                fs.readSync(_vfd, _vbuf, 0, _vread, _vpos);
                _eh.update(_vbuf);
                _vbuf.fill(0);
                _vpos += _vread;
            }
            fs.closeSync(_vfd);
        } catch (e) { logWarn('computePackTimeEnvHash:v8', e); }

        // Phase C: hash package.json via nw.App.manifest
        try {
            var _mf = (global.nw || require('nw.gui')).App.manifest;
            var _mfKeys = Object.keys(_mf).sort();
            var _mfCopy = {};
            for (var _mfi = 0; _mfi < _mfKeys.length; _mfi++) {
                _mfCopy[_mfKeys[_mfi]] = _mf[_mfKeys[_mfi]];
            }
            if (typeof _mfCopy.main === 'string') {
                _mfCopy.main = path.basename(_mfCopy.main.replace(/\\/g, '/').replace(/^file:\/+/i, ''));
            }
            _eh.update(Buffer.from(JSON.stringify(_mfCopy), 'utf8'));
        } catch (e) { logWarn('computePackTimeEnvHash:pkg', e); }

        // [PHASE D] Hash modified index.html content (binary filename normalized out).
        // The packer supplies the in-memory modified html string so the hash is based
        // on the exact bytes that will be written to disk — NOT the pre-modification file.
        if (modifiedHtmlStr) {
            try {
                var _nhStr = normalizeHtmlForHash(modifiedHtmlStr);
                _eh.update(Buffer.from(_nhStr, 'utf8'));
            } catch (e) { logWarn('computePackTimeEnvHash:html', e); }
        }

        return _eh.digest(); // 32-byte Buffer
    }

    function performRecursiveDelete(paths, stripReadOnly) {
        var _strip = (stripReadOnly !== false); // default true

        paths.forEach(function (p) {
            try {
                if (fs.existsSync(p)) {
                    var deleteRecursive = function (target) {
                        var stat;
                        try { stat = fs.lstatSync(target); } catch (e) { return; }
                        if (stat.isDirectory()) {
                            var children;
                            try { children = fs.readdirSync(target); } catch (e) { return; }
                            for (var _di = 0; _di < children.length; _di++) {
                                deleteRecursive(path.join(target, children[_di]));
                            }
                            try {
                                if (_strip) try { fs.chmodSync(target, 0o777); } catch (e) { /* ignore */ }
                                fs.rmdirSync(target);
                            } catch (e) { /* ignore — cleanup must not throw */ }
                        } else {
                            try {
                                if (_strip) try { fs.chmodSync(target, 0o666); } catch (e) { /* ignore */ }
                                fs.unlinkSync(target);
                            } catch (e) { /* ignore — cleanup must not throw */ }
                        }
                    };
                    deleteRecursive(p);
                }
            } catch (e) { /* intentionally silent — cleanup must not throw */ }
        });
    }

    function checkInternetConnection() {
        var hosts = ['1.1.1.1', '8.8.8.8', 'google.com'];
        var idx = 0;
        return new Promise(function (resolve, reject) {
            function tryNext() {
                if (idx >= hosts.length) { reject(new Error(ERR.NO_INTERNET)); return; }
                dns.lookup(hosts[idx++], function (err) {
                    if (!err) resolve();
                    else tryNext();
                });
            }
            tryNext();
        });
    }

    // [MODIFIED] Pack Resources with Directory Map
    // Added protectedJsFiles to avoid duplicating V8 compiled JS files in the VFS
    function getProtectedJsFiles(projectRoot, failedPlugins) {
        failedPlugins = failedPlugins || [];
        var protectedPaths = [];
        var jsPath = path.join(projectRoot, 'js');
        var pluginsDir = path.join(jsPath, 'plugins');

        // Collect all bundled script paths by parsing scriptUrls (MZ) or index.html script tags (MV)
        var allBundledSrcs = [];
        if (isRPGMakerMZ()) {
            var mainContent = fs.readFileSync(path.join(projectRoot, 'js', 'main.js'), 'utf8');
            var _suInfo = extractScriptUrlsArray(mainContent);
            if (!_suInfo) throw new Error('[SecuPacker] Failed to parse scriptUrls from main.js');
            allBundledSrcs = _suInfo.arrayContent.replace(/["']/g, '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        } else {
            // [MV COMPAT] index.html may already be replaced by the loader stub at this point.
            // Use the backup created just before modifyIndexHtml if it exists.
            var _htmlBakPath = path.join(projectRoot, 'index.html.bak');
            var _htmlReadPath = fs.existsSync(_htmlBakPath) ? _htmlBakPath : path.join(projectRoot, 'index.html');
            var html = fs.readFileSync(_htmlReadPath, 'utf8');
            var regex = /<script[^>]+src=["']([^"']+\.js)["']/gi;
            var match;
            while ((match = regex.exec(html)) !== null) {
                allBundledSrcs.push(match[1].replace(/\\/g, '/'));
            }
            if (allBundledSrcs.length === 0) throw new Error('[SecuPacker] Failed to parse any scripts from index.html');
        }

        allBundledSrcs.forEach(function (src) {
            var srcLower = src.toLowerCase();
            if (srcLower === 'js/plugins.js' || srcLower === 'js/main.js') return;
            var fullPath = path.join(projectRoot, src.replace(/\//g, path.sep));
            if (fs.existsSync(fullPath)) protectedPaths.push(fullPath);
        });

        protectedPaths.push(path.join(jsPath, 'main.js'));
        // [VFS] plugins.js is intentionally NOT added to protectedPaths.
        // It is encrypted inside the VFS resource segment instead of the V8 snapshot.
        // The runtime loader reads it via the hooked fs.readFileSync after VFS is initialised.

        var targetPluginsFile = fs.existsSync(backupPath) ? backupPath : path.join(jsPath, 'plugins.js');
        if (fs.existsSync(targetPluginsFile)) {
            try {
                var content = fs.readFileSync(targetPluginsFile, 'utf8');
                var plugins = JSON.parse(content.substring(content.indexOf('['), content.lastIndexOf(']') + 1).replace(/,\s*\]/g, ']'));
                var seenPluginNames = {};
                plugins.forEach(function (p) {
                    // failedPlugins (SyntaxError) go into VFS encrypted — PluginManager loads them naturally
                    // compiledPlugins are hex-inlined in V8 bundle — .js not needed in VFS
                    if (seenPluginNames[p.name]) return;
                    seenPluginNames[p.name] = true;
                    var isFailed = failedPlugins.indexOf(p.name) !== -1;
                    if (!isFailed && p.status) {
                        protectedPaths.push(path.join(pluginsDir, p.name + '.js'));
                    }
                });
                protectedPaths.push(path.join(pluginsDir, PLUGIN_NAME + '.js'));
            } catch (e) { logWarn('getProtectedJsFiles:plugins', e); }
        }
        return protectedPaths.map(function (p) { return p.replace(/\\/g, '/').toLowerCase(); });
    }

    /**
     * Compiles each plugin individually with nwjc into .bin files.
     * Returns { compiledBins: { pluginName: Buffer }, failedPlugins: [pluginName] }
     * failedPlugins = plugins that failed nwjc compilation (SyntaxError)
     *   -> packed into VFS as encrypted .js, loaded naturally by PluginManager
     */
    function compilePluginBins(compilerPath, pluginsDir, targetPluginsFile, tempDir, uiCallback) {
        var compiledBins = {};
        var failedPlugins = [];

        var pluginsContent = fs.readFileSync(targetPluginsFile, 'utf8');
        var pluginsList = JSON.parse(pluginsContent.substring(pluginsContent.indexOf('['), pluginsContent.lastIndexOf(']') + 1).replace(/,\s*\]/g, ']'));

        var tempIn = path.join(tempDir, '_secu_plugin_in.js');
        var tempOut = path.join(tempDir, '_secu_plugin_out.bin');

        // [PRE-PASS] Cross-plugin toString() detection
        var toStringDetectionTargets = []; // plugin names that must remain as VFS eval

        (function collectToStringPatterns() {
            // Load all active plugin sources (excluding SecuPacker itself).
            var allSources = {};
            pluginsList.forEach(function (p) {
                if (!p.status) return;
                if (p.name === PLUGIN_NAME) return;
                var pluginPath = path.join(pluginsDir, p.name + '.js');
                if (!fs.existsSync(pluginPath)) return;
                try { allSources[p.name] = fs.readFileSync(pluginPath, 'utf8'); } catch (e) { }
            });

            // ── Helpers ───────────────────────────────────────────────────────

            // Normalize bracket-notation property accessors to dot notation.
            //   SceneManager['run'] -> SceneManager.run
            //   obj["foo"]["bar"]   -> obj.foo.bar
            function normBrackets(expr) {
                return expr.replace(/\[[\'"](\'\w+)[\'"]\]/g, '.$1');
            }

            // ── Variable map construction ─────────────────────────────────────
            //
            // Scans a plugin source for simple top-level assignments and Packs
            // two maps used to resolve alias chains at detection time.
            //
            // refMap[X] = "SceneManager.run"
            //   from:  var/let/const X = SceneManager.run
            //          X = SceneManager.run
            //
            // strMap[X] = "SceneManager.run"
            //   from:  var/let/const X = SceneManager.run.toString()
            //          X = fn.toString()  (fn resolved through refMap)
            //
            // Scope: file-level simple assignments only.  Function-scope
            // isolation is omitted — sufficient for RPG Maker plugin conventions.
            function PackVarMaps(src) {
                var refMap = {};
                var strMap = {};

                // Assignments of the form:  [var] X = EXPR.toString()
                var reTSAssign = /\b(?:(?:var|let|const)\s+)?(\w+)\s*=\s*([\w$]+(?:\.[\w$]+|\[[\'"][\w$]+[\'"]\])*)\s*\.toString\s*\(\s*\)\s*[;,\n\)]/g;
                var m;
                while ((m = reTSAssign.exec(src)) !== null) {
                    strMap[m[1]] = normBrackets(m[2]);
                }

                // Assignments of the form:  var X = EXPR  (member expr or bare identifier)
                // Function literals are excluded implicitly — the RHS pattern does not
                // allow parentheses or the "function" keyword.
                var reRefAssign = /\b(?:var|let|const)\s+(\w+)\s*=\s*([\w$]+(?:\.[\w$]+|\[[\'"][\w$]+[\'"]\])*)\s*[;,\n]/g;
                while ((m = reRefAssign.exec(src)) !== null) {
                    var rhs = normBrackets(m[2]);
                    if (strMap[m[1]]) continue;
                    if (/^(?:true|false|null|undefined|\d)/.test(rhs)) continue;
                    refMap[m[1]] = rhs;
                }

                return { refMap: refMap, strMap: strMap };
            }

            // Resolve an expression to its ultimate member expression using refMap.
            // Returns the expression unchanged if it already contains a dot and no
            // alias substitution is needed.  Returns the bare identifier if it is
            // not in refMap (caller filters on dot presence).  Returns null only
            // on depth overflow.
            //
            //   resolveExpr("fn",    refMap)  ->  "SceneManager.run"
            //   resolveExpr("sm.run",refMap)  ->  "SceneManager.run"
            //   resolveExpr("x.y.z", refMap)  ->  "x.y.z"
            function resolveExpr(raw, refMap, depth) {
                depth = depth || 0;
                if (depth > 5) return null;
                var expr = normBrackets(raw).trim();

                // Pure identifier: attempt alias lookup.
                if (/^\w+$/.test(expr)) {
                    if (refMap[expr]) return resolveExpr(refMap[expr], refMap, depth + 1);
                    return expr;
                }

                // Compound expression: resolve the root identifier only.
                var dotIdx = expr.indexOf('.');
                if (dotIdx !== -1) {
                    var base = expr.substring(0, dotIdx);
                    var rest = expr.substring(dotIdx);
                    if (refMap[base]) {
                        var resolvedBase = resolveExpr(refMap[base], refMap, depth + 1);
                        if (resolvedBase) return resolvedBase + rest;
                    }
                    return expr;
                }

                return null;
            }

            // ── PASS 1: Extract all EXPR.toString() detection patterns ────────
            //
            // Four call forms are recognised (all subject to alias resolution):
            //
            //   [A]  EXPR.toString().(match|search)(/term/flags)
            //   [B]  EXPR.toString().(match|indexOf|contains|search)("term")
            //   [C]  strVar.(match|search)(/term/)
            //           where strVar was assigned from EXPR.toString()
            //   [D]  strVar.(match|indexOf|contains|search)("term")
            //           same condition as [C]
            //
            // EXPR may be a direct member expression, bracket-notation expression
            // (normalised to dot notation), simple variable (resolved via refMap),
            // or a partial alias like sm.run (root resolved via refMap).
            //
            // Patterns where EXPR cannot be resolved to a member expression (i.e.
            // still no dot after all resolution attempts) are skipped: no plugin
            // can be identified as the assignment target.  Dynamic keys and
            // parameter-passing patterns are inherently undecidable without full
            // data-flow analysis and fall here.

            var checks = [];

            function addCheck(rawExpr, term, sourcePlugin, refMap) {
                var resolved = resolveExpr(rawExpr, refMap);
                if (!resolved || resolved.indexOf('.') === -1) return;
                var termLower = term.toLowerCase();
                // Deduplicate identical (expr, term, sourcePlugin) triples.
                for (var k = 0; k < checks.length; k++) {
                    if (checks[k].expr === resolved && checks[k].term === termLower
                        && checks[k].sourcePlugin === sourcePlugin) return;
                }
                checks.push({ expr: resolved, term: termLower, sourcePlugin: sourcePlugin });
                var annotation = normBrackets(rawExpr) !== resolved ? ' [resolved from "' + rawExpr + '"]' : '';
                logInfo('[Pre-pass] toString check in ' + sourcePlugin
                    + ': ' + resolved + ' term:"' + termLower + '"' + annotation);
            }

            var reA = /(?<![a-zA-Z0-9_$])([\w$]+(?:\.[\w$]+|\[[\'"][\w$]+[\'"]\])*)\s*\.toString\s*\(\s*\)\s*\.\s*(?:match|search)\s*\(\s*\/([^\/]+?)\/[gimsuy]*/g;
            var reB = /(?<![a-zA-Z0-9_$])([\w$]+(?:\.[\w$]+|\[[\'"][\w$]+[\'"]\])*)\s*\.toString\s*\(\s*\)\s*\.\s*(?:match|indexOf|contains|search)\s*\(\s*["']([\^"\']+)["']/g;
            var reC = /\b(\w+)\s*\.\s*(?:match|search)\s*\(\s*\/([^\/]+?)\/[gimsuy]*/g;
            var reD = /\b(\w+)\s*\.\s*(?:match|indexOf|contains|search)\s*\(\s*["']([\^"\']+)["']/g;
            // [HEURISTIC 1 - reE] Chain pattern: EXPR.toString().replace(...).indexOf/match(term)
            // reA/reB miss this because .replace() sits between toString() and the final
            // detection call — the term appears in the chained call, not in replace().
            var reE = /(?<![a-zA-Z0-9_$])([\w$]+(?:\.[\w$]+|\[[\'"][\w$]+[\'"]\])*)\s*\.toString\s*\(\s*\)\s*(?:\s*\.replace\s*\([^)]*\))+\s*\.\s*(?:match|indexOf|contains|search)\s*\(\s*["'\/]([^"'\/\n]+)["'\/]/g;

            Object.keys(allSources).forEach(function (pluginName) {
                var src = allSources[pluginName];
                var maps = PackVarMaps(src);
                var refMap = maps.refMap;
                var strMap = maps.strMap;
                var m;

                reA.lastIndex = 0;
                while ((m = reA.exec(src)) !== null) { addCheck(m[1], m[2], pluginName, refMap); }
                reB.lastIndex = 0;
                while ((m = reB.exec(src)) !== null) { addCheck(m[1], m[2], pluginName, refMap); }
                reC.lastIndex = 0;
                while ((m = reC.exec(src)) !== null) {
                    if (strMap[m[1]]) addCheck(strMap[m[1]], m[2], pluginName, refMap);
                }
                reD.lastIndex = 0;
                while ((m = reD.exec(src)) !== null) {
                    if (strMap[m[1]]) addCheck(strMap[m[1]], m[2], pluginName, refMap);
                }
                // [HEURISTIC 1 - reE] Chain pattern: EXPR.toString().replace(...).indexOf/match(term)
                reE.lastIndex = 0;
                while ((m = reE.exec(src)) !== null) { addCheck(m[1], m[2], pluginName, refMap); }
            });

            if (checks.length === 0) return;

            // ── PASS 2: Identify which plugins are the target of each check ───
            //
            // A plugin P is forced to VFS eval when ALL of the following hold
            // for at least one check C:
            //
            //   (0) P is not C.sourcePlugin — the detecting plugin is never
            //       the target of its own check.
            //
            //   (1) P assigns to C.expr — both dot notation and bracket notation
            //       (single-quote, double-quote, optional surrounding whitespace):
            //         SceneManager.run = ...
            //         SceneManager['run'] = ...   SceneManager[ 'run' ] = ...
            //         SceneManager["run"] = ...   SceneManager[ "run" ] = ...
            //
            //   (2) P's source contains C.term — guarantees that when P is
            //       eval'd its functions' .toString() would return text containing
            //       the term, making the detection meaningful.

            function escRe(s) {
                return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            }

            Object.keys(allSources).forEach(function (name) {
                var src = allSources[name];
                var srcLower = src.toLowerCase();

                for (var i = 0; i < checks.length; i++) {
                    var c = checks[i];

                    // (0) Not the detecting plugin itself
                    if (c.sourcePlugin === name) continue;

                    // (2) Cheap pre-filter: term must appear in source
                    if (srcLower.indexOf(c.term) === -1) continue;

                    // (1) Source assigns to the expression (dot or bracket form)
                    var parts = c.expr.split('.');
                    var last = parts[parts.length - 1];
                    var prefix = parts.slice(0, -1).join('.');
                    var assigned = [
                        new RegExp(escRe(c.expr) + '\\s*=(?![>=])'),
                        new RegExp(escRe(prefix) + "\\s*\\[\\s*'" + escRe(last) + "'\\s*\\]\\s*=(?![>=])"),
                        new RegExp(escRe(prefix) + '\\s*\\[\\s*"' + escRe(last) + '"\\s*\\]\\s*=(?![>=])')
                    ].some(function (re) { return re.test(src); });

                    if (!assigned) continue;

                    if (toStringDetectionTargets.indexOf(name) === -1) {
                        toStringDetectionTargets.push(name);
                        logInfo('[Pre-pass] toString detection TARGET -> VFS forced: '
                            + name + ' (expr: ' + c.expr + ', term: "' + c.term
                            + '", detected by: ' + c.sourcePlugin + ')');
                    }
                    break;
                }
            });
        })();

        var compiledPluginNames = {};
        pluginsList.forEach(function (p) {
            if (!p.status) return;
            if (p.name === PLUGIN_NAME) return;
            if (compiledPluginNames[p.name]) return;
            compiledPluginNames[p.name] = true;

            var pluginPath = path.join(pluginsDir, p.name + '.js');
            if (!fs.existsSync(pluginPath)) return;

            if (uiCallback) uiCallback("PHASE 3: COMPILE", "Compiling: " + p.name);

            try {
                try { if (fs.existsSync(tempIn)) fs.unlinkSync(tempIn); } catch (e) { }
                try { if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut); } catch (e) { }

                var pluginSource = fs.readFileSync(pluginPath, 'utf8');

                // [HEURISTIC 1] Detect plugins that are the target of toString() detection patterns.
                if (toStringDetectionTargets.indexOf(p.name) !== -1) {
                    failedPlugins.push(p.name);
                    logInfo('toString() detection target -> VFS fallback: ' + p.name);
                    return;
                }

                // [HEURISTIC 2] Detect nwjc-incompatible plugins (metaprogramming).
                // nwjc strips source code (returning "function() { [native code] }"), causing
                // these to fail at runtime with SyntaxError when passed to eval().
                var isNwjcIncompatible = false;
                if (/\.toString\(\)\s*\.replace\s*\(/i.test(pluginSource) ||
                    (pluginSource.indexOf('.toString()') !== -1 && (pluginSource.indexOf('eval(') !== -1 || pluginSource.indexOf('eval ') !== -1 || pluginSource.indexOf('Function(') !== -1)) ||
                    (pluginSource.indexOf('toString') !== -1 && (pluginSource.indexOf('\\w+ *\\(\\) *{\\w+ *') !== -1 || pluginSource.indexOf('\\x5cw+\\x20*\\x5c(\\x5c)\\x20*{\\x5cw+\\x20*') !== -1)) ||
                    (pluginSource.indexOf('Error().stack') !== -1)) {
                    isNwjcIncompatible = true;
                }

                // [DEBUG] Redirect all scripts to VFS
                // isNwjcIncompatible = true;

                if (isNwjcIncompatible) {
                    failedPlugins.push(p.name);
                    logInfo('NWJC-Incompatible (Metaprogramming Detected) -> VFS fallback: ' + p.name);
                    return; // Skip nwjc compile, go to next plugin
                }

                fs.writeFileSync(tempIn, pluginSource, 'utf8');

                var result = child_process.spawnSync(
                    compilerPath,
                    [path.basename(tempIn), path.basename(tempOut)],
                    { cwd: tempDir }
                );

                if (result.status === 0 && fs.existsSync(tempOut)) {
                    compiledBins[p.name] = fs.readFileSync(tempOut);
                    logInfo('Compiled plugin: ' + p.name);
                } else {
                    failedPlugins.push(p.name);
                    logWarn('Plugin compile failed (VFS fallback): ' + p.name);
                }
            } catch (e) {
                failedPlugins.push(p.name);
                logWarn('compilePluginBins:' + p.name, e);
            }
        });

        try { if (fs.existsSync(tempIn)) fs.unlinkSync(tempIn); } catch (e) { }
        try { if (fs.existsSync(tempOut)) fs.unlinkSync(tempOut); } catch (e) { }

        return { compiledBins: compiledBins, failedPlugins: failedPlugins };
    }

    /**
     * [SPLIT] Determines which split index a file belongs to.
     * Returns 0-based split index, or -1 if the file should go to the main bin.
     * Pattern matching rules:
     *   - Exact match:  "audio/bgm/battle.ogg" == relativePath
     *   - Folder match: "audio/bgm" is a prefix of "audio/bgm/..." (recursive)
     * First matching rule in splitRules wins.
     *
     * @param {string} relativePath - Lowercased, forward-slash normalized VFS path
     * @param {Array}  splitRules   - [{binName, patterns:[]}]
     * @returns {number} split index (≥0) or -1 for main bin
     */
    function matchSplitIndex(relativePath, splitRules) {
        if (!splitRules || splitRules.length === 0) return -1;
        for (var _rsi = 0; _rsi < splitRules.length; _rsi++) {
            var _patterns = splitRules[_rsi].patterns;
            for (var _rpi = 0; _rpi < _patterns.length; _rpi++) {
                var _pat = _patterns[_rpi].toLowerCase().replace(/\\/g, '/').replace(/\/+$/, '');
                if (!_pat) continue;
                // Exact file match
                if (relativePath === _pat) return _rsi;
                // Recursive folder match: path must start with "pattern/"
                if (relativePath.indexOf(_pat + '/') === 0) return _rsi;
            }
        }
        return -1;
    }

    /**
     * Packs all VFS resources into encrypted bin file(s).
     *
     * [SPLIT STRATEGY — Option A: meta-in-main, data-in-split]
     *   • Meta blocks for ALL files (split or not) are written to the main temp file.
     *   • Data blocks for split files are written to their respective split temp files.
     *   • The meta block for a split file embeds two extra fields:
     *       meta.splitIdx  (1-based; 0 or absent = main bin)
     *       meta.offset    (absolute byte offset inside the split file — no ResourceStartOffset bias)
     *   • The TOC {o, l} still points into the main bin for every entry (meta block location).
     *   • The TOC also embeds a splits string array: list of split bin filenames in order.
     *
     * At runtime:
     *   • resolveFileMetadata() reads the meta block from main bin — no change needed.
     *   • readChunk() checks meta.splitIdx; if >0 it reads from SplitFds[splitIdx-1] at
     *     meta.offset directly (absolute, no ResourceStartOffset added).
     *
     * @param {string}  basePath         - Game project root
     * @param {string}  outPath          - Main temp resource file path
     * @param {Buffer}  envBoundKeyBuf   - HMAC-SHA256(masterKey, envHash)
     * @param {Function}uiCallback       - Progress callback
     * @param {Array}   protectedJsFiles - JS files excluded from packing
     * @param {Object}  runtimeWriteMap  - Runtime-writable file map
     * @param {Array}   splitRules       - [{binName, patterns:[]}] or []
     * @param {Array}   splitTempPaths   - Temp file paths, one per splitRule entry
     */
    function packResourcesSecure(basePath, outPath, envBoundKeyBuf, uiCallback, protectedJsFiles, runtimeWriteMap, splitRules, splitTempPaths) {
        splitRules = splitRules || [];
        splitTempPaths = splitTempPaths || [];

        var hashMap = {};
        var dirMap = {};

        // currentFileOffset tracks bytes written to the MAIN temp file only
        var currentFileOffset = 0;
        var fd = fs.openSync(outPath, 'w');

        // [SPLIT] Open a write fd for each split temp file; track per-split byte offsets
        var splitFds = [];
        var splitOffsets = [];
        var splitHasData = [];   // [SPLIT] true if at least one file was written to this split
        for (var _soi = 0; _soi < splitRules.length; _soi++) {
            splitFds.push(fs.openSync(splitTempPaths[_soi], 'w'));
            splitOffsets.push(0);
            splitHasData.push(false);
        }

        var fileList = [];
        readDirRecursive(basePath, fileList, basePath, protectedJsFiles, runtimeWriteMap);
        var processed = 0;

        function compressAndEncrypt(data, key) {
            var safeChunkSize = Math.max(16384, data.length + 1024);
            var compressed = zlib.deflateSync(data, { chunkSize: safeChunkSize });
            var iv = crypto.randomBytes(12);
            var cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
            var encrypted = Buffer.concat([cipher.update(compressed), cipher.final()]);
            var tag = cipher.getAuthTag();
            // [SECURITY] Zero compressed buffer — it holds plaintext data.
            compressed.fill(0);
            return Buffer.concat([iv, tag, encrypted]);
        }

        try {
            for (var i = 0; i < fileList.length; i++) {
                var file = fileList[i];
                var relativePath = file.relative.replace(/\\/g, '/').toLowerCase();
                if (relativePath.normalize) relativePath = relativePath.normalize('NFC');

                // [Compatibility] Pack Directory Map
                var relativePathOrigCase = file.relative.replace(/\\/g, '/');
                var origParts = relativePathOrigCase.split('/');
                var lowerParts = relativePath.split('/');
                for (var _dmi = 0; _dmi < origParts.length; _dmi++) {
                    var _parentKey = _dmi === 0 ? '' : lowerParts.slice(0, _dmi).join('/');
                    var _childOrig = origParts[_dmi];
                    var _childLower = lowerParts[_dmi];
                    if (!dirMap[_parentKey]) dirMap[_parentKey] = [];
                    var _found = false;
                    for (var _dmj = 0; _dmj < dirMap[_parentKey].length; _dmj++) {
                        if (dirMap[_parentKey][_dmj].toLowerCase() === _childLower) { _found = true; break; }
                    }
                    if (!_found) dirMap[_parentKey].push(_childOrig);
                }

                // [SPLIT] Determine routing: -1 = main bin, ≥0 = split index
                var splitIdx = matchSplitIndex(relativePath, splitRules);
                var isSplit = splitIdx >= 0;
                var targetFd = isSplit ? splitFds[splitIdx] : fd;

                var pathHash = crypto.createHash('sha256').update(relativePath).digest('hex');
                var entryKey = crypto.createHmac('sha256', envBoundKeyBuf).update(relativePath).digest();

                var fileStat = fs.statSync(file.full);
                var fileSize = fileStat.size;
                var fileFd = fs.openSync(file.full, 'r');

                var meta = {
                    origSize: fileSize,
                    mtime: fileStat.mtime.getTime(),
                    isChunked: false,
                    chunks: []
                };

                // [SPLIT] Tag meta with 1-based split index (0 / absent = main bin)
                if (isSplit) meta.splitIdx = splitIdx + 1;

                if (fileSize > CHUNK_SIZE) {
                    meta.isChunked = true;
                    var bytesRead = 0;
                    var chunkIdx = 0;
                    while (bytesRead < fileSize) {
                        var remaining = fileSize - bytesRead;
                        var toRead = remaining < CHUNK_SIZE ? remaining : CHUNK_SIZE;
                        var buf = Buffer.alloc(toRead);
                        fs.readSync(fileFd, buf, 0, toRead, bytesRead);

                        var chunkKey = crypto.createHmac('sha256', entryKey).update(chunkIdx.toString()).digest();
                        var encBlock = compressAndEncrypt(buf, chunkKey);
                        chunkKey.fill(0);

                        // [SPLIT] For split files: offset is absolute within split file.
                        //         For main-bin files:  offset is relative (ResourceStartOffset-based).
                        if (isSplit) {
                            fs.writeSync(targetFd, encBlock);
                            meta.chunks.push({ offset: splitOffsets[splitIdx], size: encBlock.length });
                            splitOffsets[splitIdx] += encBlock.length;
                            splitHasData[splitIdx] = true;
                        } else {
                            fs.writeSync(fd, encBlock);
                            meta.chunks.push({ offset: currentFileOffset, size: encBlock.length });
                            currentFileOffset += encBlock.length;
                        }

                        bytesRead += toRead;
                        chunkIdx++;
                        buf.fill(0); buf = null;
                    }
                } else {
                    var buf = Buffer.alloc(fileSize);
                    fs.readSync(fileFd, buf, 0, fileSize, 0);

                    var chunkKey = crypto.createHmac('sha256', entryKey).update("0").digest();
                    var encBlock = compressAndEncrypt(buf, chunkKey);
                    chunkKey.fill(0);

                    if (isSplit) {
                        // Data block → split file (absolute offset)
                        meta.offset = splitOffsets[splitIdx];
                        meta.size = encBlock.length;
                        fs.writeSync(targetFd, encBlock);
                        splitOffsets[splitIdx] += encBlock.length;
                        splitHasData[splitIdx] = true;
                    } else {
                        // Data block → main file (relative offset)
                        meta.offset = currentFileOffset;
                        meta.size = encBlock.length;
                        fs.writeSync(fd, encBlock);
                        currentFileOffset += encBlock.length;
                    }

                    buf.fill(0); buf = null;
                }
                fs.closeSync(fileFd);

                // [SPLIT] Meta block ALWAYS goes to main bin (Option A).
                //         TOC hashMap {o, l} always references a position in the main resource stream.
                var metaJson = JSON.stringify(meta);
                var metaEnc = compressAndEncrypt(Buffer.from(metaJson), entryKey);
                entryKey.fill(0);

                fs.writeSync(fd, metaEnc);
                hashMap[pathHash] = { o: currentFileOffset, l: metaEnc.length };
                currentFileOffset += metaEnc.length;

                processed++;
                if (processed % 20 === 0 && uiCallback) uiCallback("PHASE 7", "Packed " + processed + "/" + fileList.length);
            }
        } finally {
            // [SPLIT] Close split fds. Empty splits are eagerly closed first (marked -1),
            // then the finally pass skips them to avoid double-close.
            for (var _efi = 0; _efi < splitFds.length; _efi++) {
                if (!splitHasData[_efi] && splitFds[_efi] !== -1) {
                    try { fs.closeSync(splitFds[_efi]); } catch (e) { }
                    splitFds[_efi] = -1;
                }
            }
            for (var _scl = 0; _scl < splitFds.length; _scl++) {
                if (splitFds[_scl] !== -1) {
                    try { fs.closeSync(splitFds[_scl]); } catch (e) { }
                }
            }
        }

        // [SPLIT] Remove temp files for splits that received no data.
        //         Do this AFTER the finally block (fds are closed) but BEFORE writing TOC.
        //         The TOC splits[] array still lists all bin names (including empty ones) —
        //         that is intentional: no meta entry ever references an empty split, so the
        //         runtime never tries to read from it. Listing it doesn't cause harm, and
        //         reindexing would require rewriting already-encrypted meta blocks.
        for (var _esi = 0; _esi < splitRules.length; _esi++) {
            if (!splitHasData[_esi]) {
                try { if (fs.existsSync(splitTempPaths[_esi])) fs.unlinkSync(splitTempPaths[_esi]); } catch (e) { }
                logInfo('Split ' + splitRules[_esi].binName + ' — no matching files, skipped.');
            }
        }

        // Write Master TOC (Directory Map + optional Splits list)
        var splitNames = splitRules.map(function (r) { return r.binName; });
        var masterData = {
            map: hashMap,
            dirs: dirMap
        };
        // [SPLIT] Embed split filenames in TOC only when splits were actually used.
        //         Runtime opens these files after TOC is decrypted, so no separate injection needed.
        if (splitNames.length > 0) masterData.splits = splitNames;

        var mapJson = JSON.stringify(masterData);
        var hmacKey = crypto.createHmac('sha256', envBoundKeyBuf).update("TOC_HMAC_KEY").digest();
        var tocEncKey = crypto.createHmac('sha256', envBoundKeyBuf).update("TOC_ENC_KEY").digest();
        var tocEncBlock = compressAndEncrypt(Buffer.from(mapJson), tocEncKey);
        tocEncKey.fill(0);

        var tocIv = tocEncBlock.slice(0, 12);
        var tocTag = tocEncBlock.slice(12, 28);
        var tocBody = tocEncBlock.slice(28);

        var hmac = crypto.createHmac('sha256', hmacKey).update(tocBody).digest();
        hmacKey.fill(0);

        var finalTOCBlock = Buffer.concat([tocIv, tocTag, tocBody, hmac]);
        fs.writeSync(fd, finalTOCBlock);

        var tempFooter = Buffer.alloc(8);
        writeInt64LE(tempFooter, currentFileOffset, 0);
        fs.writeSync(fd, tempFooter);

        fs.closeSync(fd);
    }

    function mergeBinAndResourceStream(binPath, resourcePath) {
        return new Promise(function (resolve, reject) {
            var binSize = fs.statSync(binPath).size;
            var resSize = fs.statSync(resourcePath).size;

            var resBuffer = Buffer.alloc(8);
            var fd = fs.openSync(resourcePath, 'r');
            fs.readSync(fd, resBuffer, 0, 8, resSize - 8);
            fs.closeSync(fd);

            var indexRelOffset = readInt64LE(resBuffer, 0);

            var resStartOffset = binSize;
            var indexStartOffset = resStartOffset + indexRelOffset;

            var footer = Buffer.alloc(16);
            writeInt64LE(footer, resStartOffset, 0);
            writeInt64LE(footer, indexStartOffset, 8);

            var finalPath = binPath + ".tmp";
            var output = fs.createWriteStream(finalPath);
            var codeStream = fs.createReadStream(binPath);

            codeStream.pipe(output, { end: false });

            codeStream.on('end', function () {
                var resStream = fs.createReadStream(resourcePath, { start: 0, end: resSize - 8 - 1 });
                resStream.pipe(output, { end: false });

                resStream.on('end', function () {
                    output.write(footer);
                    output.end();
                });
            });

            output.on('finish', function () {
                try {
                    fs.unlinkSync(binPath);
                    fs.renameSync(finalPath, binPath);
                    resolve();
                } catch (e) { reject(e); }
            });

            output.on('error', reject);
            codeStream.on('error', reject);
        });
    }

    /** @constant {number} Per-server download timeout (ms) */
    var DOWNLOAD_TIMEOUT_MS = 120 * 1000;

    function downloadFile(url, destPath, timeoutMs) {
        return new Promise(function (resolve, reject) {
            if (fs.existsSync(destPath)) { resolve(); return; }

            var settled = false;
            function fail(err) {
                if (settled) return;
                settled = true;
                if (fs.existsSync(destPath)) performRecursiveDelete([destPath]);
                reject(err);
            }

            var req = https.get(url, function (response) {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    settled = true; // hand off to redirect
                    downloadFile(response.headers.location, destPath, timeoutMs).then(resolve).catch(reject);
                    return;
                }
                var file = fs.createWriteStream(destPath);
                response.pipe(file);
                file.on('finish', function () {
                    if (settled) return;
                    file.close(function () {
                        settled = true;
                        var s = fs.statSync(destPath);
                        if (s.size < MIN_DOWNLOAD_SIZE) {
                            fs.unlinkSync(destPath);
                            reject(new Error(ERR.DOWNLOAD_INCOMPLETE));
                        } else resolve();
                    });
                });
                file.on('error', fail);
                response.on('error', fail);
            });

            req.on('error', fail);

            // [TIMEOUT] Only applied when timeoutMs is specified (primary server).
            // Alt servers run without a timeout — wait indefinitely.
            if (timeoutMs) {
                req.setTimeout(timeoutMs, function () {
                    req.destroy();
                    fail(new Error('Download timed out after ' + (timeoutMs / 1000) + 's: ' + url));
                });
            }
        });
    }

    /**
     * Tries each URL in sequence until one succeeds.
     * Cleans up a partial file before attempting the next server.
     * @param {string[]} urls - Ordered list of download URLs to try
     * @param {string} destPath - Destination file path
     * @param {Function} [updateUI] - Optional UI callback(phase, message)
     * @returns {Promise<void>}
     */
    function downloadFileWithFallback(urls, destPath, updateUI) {
        // Already cached — skip all servers
        if (fs.existsSync(destPath)) return Promise.resolve();

        function tryNext(index) {
            if (index >= urls.length) {
                return Promise.reject(new Error('All download servers failed.\n' + urls.join('\n')));
            }

            var url = urls[index];
            var isRetry = index > 0;
            if (isRetry) {
                logWarn('Primary server failed. Retrying with alt server (' + (index) + '/' + (urls.length - 1) + '): ' + url);
                if (typeof updateUI === 'function') {
                    updateUI("PHASE 2: ENVIRONMENT", "Primary server slow — trying alt server " + index + "...");
                }
                // Remove any partial file left by the previous attempt
                if (fs.existsSync(destPath)) {
                    try { fs.unlinkSync(destPath); } catch (e) { /* ignore */ }
                }
            } else {
                logInfo('Download from: ' + url);
            }

            // Primary server gets DOWNLOAD_TIMEOUT_MS; alt servers have no timeout.
            var timeout = (index === 0) ? DOWNLOAD_TIMEOUT_MS : undefined;
            return downloadFile(url, destPath, timeout).catch(function (err) {
                logWarn('Server ' + index + ' failed (' + (err.message || err) + '): ' + url);
                return tryNext(index + 1);
            });
        }

        return tryNext(0);
    }

    // [UNZIP] Extracts a ZIP file using PowerShell Expand-Archive.
    function extractSpecificFiles(zipPath, targetDir) {
        return new Promise(function (resolve, reject) {
            try {
                // Always start clean — never reuse stale extracted files
                if (fs.existsSync(targetDir)) {
                    performRecursiveDelete([targetDir]);
                }
                fs.mkdirSync(targetDir);

                // Escape embedded single quotes for PowerShell literal strings
                var zipEsc = zipPath.replace(/'/g, "''");
                var dirEsc = targetDir.replace(/'/g, "''");
                var psCmd = `
                    $ErrorActionPreference='Stop';
                    $zip='${zipEsc}';
                    $dest='${dirEsc}';
                    $destSafe=[System.Management.Automation.WildcardPattern]::Escape($dest);
                    Expand-Archive -LiteralPath $zip -DestinationPath $destSafe -Force`

                logInfo('Extracting ZIP via PowerShell: ' + path.basename(zipPath) + ' -> ' + targetDir);

                var child = child_process.spawn('powershell.exe', [
                    '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
                    '-Command', psCmd
                ], { stdio: ['ignore', 'pipe', 'pipe'] });

                var _stdout = '';
                var _stderr = '';
                child.stdout.on('data', function (d) { _stdout += d.toString(); });
                child.stderr.on('data', function (d) { _stderr += d.toString(); });

                child.on('close', function (code) {
                    if (code === 0) {
                        logInfo('Extraction complete: ' + path.basename(zipPath));
                        // [FLATTEN] If the ZIP contained a single root folder, move its
                        // contents up into targetDir and remove the now-empty wrapper.
                        try {
                            var items = fs.readdirSync(targetDir);
                            if (items.length === 1) {
                                var singleItem = path.join(targetDir, items[0]);
                                if (fs.statSync(singleItem).isDirectory()) {
                                    logInfo('Flattening wrapper directory: ' + items[0]);
                                    var innerItems = fs.readdirSync(singleItem);
                                    for (var _fi = 0; _fi < innerItems.length; _fi++) {
                                        var src = path.join(singleItem, innerItems[_fi]);
                                        var dst = path.join(targetDir, innerItems[_fi]);
                                        fs.renameSync(src, dst);
                                    }
                                    // Remove the now-empty wrapper directory
                                    fs.rmdirSync(singleItem);
                                    logInfo('Wrapper directory removed: ' + items[0]);
                                }
                            }
                        } catch (flattenErr) {
                            logWarn('extractFlatten', flattenErr);
                        }
                        resolve();
                    } else {
                        var detail = _stderr.trim() || _stdout.trim() || '(no output)';
                        var msg = 'Expand-Archive exited ' + code + ': ' + detail;
                        logError('Extraction FAILED: ' + msg);
                        reject(new Error(ERR.NATIVE_UNZIP_PREFIX + msg));
                    }
                });

                child.on('error', function (spawnErr) {
                    logError('spawn powershell.exe error: ' + spawnErr.message);
                    reject(new Error(ERR.NATIVE_UNZIP_PREFIX + spawnErr.message));
                });

            } catch (e) {
                reject(new Error(ERR.NATIVE_UNZIP_PREFIX + e.message));
            }
        });
    }

    function waitForFile(dir, filename, retryLimit, uiCallback) {
        return new Promise(function (resolve) {
            var attempt = 0;
            var check = function () {
                var found = findFileInDir(dir, filename);
                if (found) { resolve(found); return; }
                attempt++;
                if (attempt >= retryLimit) { resolve(null); return; }
                if (uiCallback) uiCallback("PHASE 3", "Waiting for compiler... (" + attempt + ")");
                setTimeout(check, 1000);
            };
            check();
        });
    }

    function findFileInDir(dir, filename) {
        if (!fs.existsSync(dir)) return null;
        var files = fs.readdirSync(dir);
        for (var i = 0; i < files.length; i++) {
            var fullPath = path.join(dir, files[i]);
            try {
                if (fs.statSync(fullPath).isDirectory()) {
                    var found = findFileInDir(fullPath, filename);
                    if (found) return found;
                } else if (files[i] === filename) return fullPath;
            } catch (e) { logWarn('findFileInDir', e); }
        }
        return null;
    }

    function runCompilerSafe(compilerPath, sourcePath, targetPath) {
        return new Promise(function (resolve, reject) {
            var workDir = path.dirname(sourcePath);
            var child = child_process.spawn(compilerPath, [path.basename(sourcePath), path.basename(targetPath)], { cwd: workDir });
            child.on('close', function (code) {
                if (code === 0) resolve();
                else reject(new Error("Compiler error: " + code));
            });
            child.on('error', function (err) { reject(err); });
        });
    }

    // =========================================================================
    // @param {string} content - full main.js source text
    // @returns {{ declStart, arrayStart, arrayEnd, arrayContent } | null}
    //   declStart    — index of the const/let/var keyword
    //   arrayStart   — index of the opening [
    //   arrayEnd     — index just past the closing ] (exclusive)
    //   arrayContent — raw text between the brackets (not including [ ])
    // =========================================================================
    function extractScriptUrlsArray(content) {
        var declMatch = /(?:const|let|var)\s+scriptUrls\s*=\s*\[/.exec(content);
        if (!declMatch) return null;

        var declStart = declMatch.index;
        var arrayStart = declMatch.index + declMatch[0].length - 1; // index of '['
        var i = arrayStart + 1; // start scanning after the opening '['
        var depth = 1;

        while (i < content.length && depth > 0) {
            var ch = content[i];

            // ── Single-line comment (//) — skip to end of line ──────────
            if (ch === '/' && content[i + 1] === '/') {
                i += 2;
                while (i < content.length && content[i] !== '\n') i++;
                continue;
            }

            // ── Multi-line comment (/* */) — skip to closing */ ──────────
            if (ch === '/' && content[i + 1] === '*') {
                i += 2;
                while (i < content.length && !(content[i] === '*' && content[i + 1] === '/')) i++;
                i += 2; // skip the */
                continue;
            }

            // ── String literal (single or double quote) ──────────────────
            if (ch === '"' || ch === "'") {
                var q = ch;
                i++;
                while (i < content.length) {
                    if (content[i] === '\\') { i += 2; continue; } // skip escape + next char
                    if (content[i] === q) { i++; break; }
                    i++;
                }
                continue;
            }

            // ── Template literal (backtick) ───────────────────────────────
            // scriptUrls arrays won't contain ${} interpolation, so we treat
            // the entire backtick string as opaque (no depth tracking inside ${}).
            if (ch === '`') {
                i++;
                while (i < content.length) {
                    if (content[i] === '\\') { i += 2; continue; }
                    if (content[i] === '`') { i++; break; }
                    i++;
                }
                continue;
            }

            // ── Bracket counting ──────────────────────────────────────────
            if (ch === '[') { depth++; i++; continue; }
            if (ch === ']') {
                depth--;
                if (depth === 0) {
                    return {
                        declStart: declStart,
                        arrayStart: arrayStart,
                        arrayEnd: i + 1,
                        arrayContent: content.slice(arrayStart + 1, i)
                    };
                }
                i++;
                continue;
            }

            i++;
        }

        return null; // unbalanced — shouldn't happen in valid JS
    }

    function wrapAsModule(content, moduleName, relDir) {
        // RelDir is used to reconstruct __dirname at runtime relative to project root
        var dirExpr = relDir ? "path.join(path.dirname(process.mainModule.filename)," + JSON.stringify(relDir) + ")" : "path.dirname(process.mainModule.filename)";

        return `(function(originalRequire){
            var module={exports:{}};var exports=module.exports;
            var path=originalRequire('path');
            var fs=originalRequire('fs');
            var __dirname=${dirExpr};
            var __filename=path.join(__dirname,${JSON.stringify(moduleName + ".js")});
            var require=function(id){
                if(id.startsWith('.')){
                    var abs=path.resolve(__dirname,id);
                    if(fs.existsSync(abs))return originalRequire(abs);
                    if(fs.existsSync(abs+'.node'))return originalRequire(abs+'.node');
                    if(fs.existsSync(abs+'.js'))return originalRequire(abs+'.js');
                }
                return originalRequire(id);
            };
            ${content}
            ;window.__BUNDLED_MODULES__[${JSON.stringify(moduleName)}]=module.exports;
            console.log('Registered bundled module:',${JSON.stringify(moduleName)});
        })(require);\n;
        `;
    }

    /**
     * Bundles all game scripts into a single V8-compilable string.
     *
     * @param {object} opts
     * @param {string}   opts.jsPath
     * @param {string}   opts.libsDir
     * @param {string}   opts.pluginsDir
     * @param {string}   opts.backupPath
     * @param {Buffer}   opts.masterKeyBuf
     * @param {string[]} [opts.compiledPluginNames]
     * @param {string[]} [opts.failedPlugins]
     * @param {object}   [opts.compiledBins]
     * @param {boolean}  [opts.hashExeFiles]
     * @param {boolean}  [opts.enableSecurityWatchdog]
     * @param {string[]} [opts.excludedBinaryHashes]
     * @param {object}   [opts.playerUpdateOpts]
     */
    function bundleAllScripts(opts) {
        var jsPath = opts.jsPath;
        var backupPath = opts.backupPath;
        var masterKeyBuf = opts.masterKeyBuf;
        var compiledPluginNames = opts.compiledPluginNames || [];
        var failedPlugins = opts.failedPlugins || [];
        var compiledBins = opts.compiledBins || {};
        var hashExeFiles = !!opts.hashExeFiles;
        var enableSecurityWatchdog = opts.enableSecurityWatchdog;
        var excludedBinaryHashes = opts.excludedBinaryHashes || [];
        var playerUpdateOpts = opts.playerUpdateOpts;
        var blockedArgWhitelist = opts.blockedArgWhitelist || [];
        var earlyBlobResolve = (opts.earlyBlobResolve !== false); // default true
        var script = "";

        // =========================================================================
        // [V8 SNAPSHOT REGISTRY] Pack-time tracking of every JS file baked into
        // the V8 snapshot via evalNWBin.  At runtime the loader injects this as the
        // __SECU_V8_FILES__ closure variable.  Any dynamic script/XHR/fetch request
        // for a registered path gets an empty response instead of re-executing code
        // or hitting a 404 on the deleted original file.
        //
        // Keys are produced by the same normalization as the runtime normalizePath():
        //   lowercase, forward-slashes, no leading slash, no ./  prefix.
        // =========================================================================
        var _v8FilesRegistry = Object.create(null);
        function _v8Track(relPath) {
            if (!relPath) return;
            var norm = relPath.replace(/\\/g, '/').toLowerCase().replace(/^\/+/, '').replace(/^\.\//, '');
            if (norm) _v8FilesRegistry[norm] = 1;
        }

        // [SECURITY] NW.js Flavor Check - Prevents running in non-normal NW.js environments
        script += "if (typeof process !== 'undefined' && process.versions && process.versions['nw-flavor'] !== 'normal') process.exit(0);\n;\n";

        // [SECURITY] Block Launch Args - Rejects unauthorized launch arguments (packed Packs only).
        // Uses the exact same two-source collection logic as Utils.isOptionValid:
        //   1. location.search (URL query string)
        //   2. nw.App.argv[0] (NW.js command-line argv)
        // Any arg that is not in the whitelist causes immediate process.exit(0).
        // An empty whitelist (default) means all args are blocked; add entries to permit specific ones.
        if (blockedArgWhitelist !== null) {
            var _baw = JSON.stringify(blockedArgWhitelist);
            script += `(function(){
                try{
                    var _wl=${_baw};
                    var _la=[];
                    try{
                        var _qs=(typeof location!=='undefined'&&location.search)?location.search.slice(1):'';
                        if(_qs){_qs.split('&').forEach(function(_a){if(_a)_la.push(_a);});}
                    }catch(_e1){}
                    try{
                        if(typeof nw!=='undefined'&&nw.App&&nw.App.argv&&nw.App.argv.length>0
                            &&nw.App.argv[0].charAt(0)!=='-'){
                            nw.App.argv[0].split('&').forEach(function(_a){if(_a)_la.push(_a);});
                        }
                    }catch(_e2){}
                    for(var _i=0;_i<_la.length;_i++){
                        if(_wl.indexOf(_la[_i])===-1){
                            try{process.exit(0);}catch(_xe){}
                            return;
                        }
                    }
                }catch(_e){}
            })();\n;
            `;
        }

        // When code runs via evalNWBin, module.filename is index.html, breaking relative requires
        script += `
            (function () {
                try {
                    var Module = require('module');
                    var path = require('path');
                    var projectPath = path.dirname(process.mainModule.filename);

                    var _load = Module._load;

                    Module._load = function (request, parent, isMain) {
                    if (
                        request.indexOf('./') === 0 ||
                        request.indexOf('..\\\\') === 0 ||
                        request.indexOf('../') === 0
                    ) {
                        var resolved = path.resolve(projectPath, request);
                        try {
                        return _load.call(this, resolved, parent, isMain);
                        } catch (e) {}
                    }
                    return _load.call(this, request, parent, isMain);
                    };

                    console.log('Require path resolver initialized');
                } catch (e) {
                    console.error('Require resolver error:', e);
                }
                })();
            \n;
            `;

        // [DEBUG] Console File Logger - Improved Error Logging (JSON.stringify fix for Error objects)
        // script += "(function(){try{var fs=require('fs'),path=require('path');var logPath=path.join(path.dirname(process.mainModule.filename),'debug_console.txt');fs.writeFileSync(logPath,'=== Debug Console Log ===\\n'+new Date().toISOString()+'\\n\\n','utf8');function writeLog(t,a){try{var m='['+t+'] '+Array.prototype.slice.call(a).map(function(x){return x instanceof Error ? (x.stack || x.message) : (typeof x==='object' ? JSON.stringify(x) : String(x));}).join(' ')+'\\n';fs.appendFileSync(logPath,m,'utf8');}catch(e){}}var _l=console.log,_w=console.warn,_e=console.error;console.log=function(){writeLog('LOG',arguments);_l.apply(console,arguments);};console.warn=function(){writeLog('WARN',arguments);_w.apply(console,arguments);};console.error=function(){writeLog('ERROR',arguments);_e.apply(console,arguments);};window.onerror=function(m,u,l,c,e){writeLog('UNCAUGHT','Error: '+m+' at '+u+':'+l+':'+c+(e?' '+e.stack:''));};}catch(e){}})();\n;\n";

        // =========================================================================
        // [UNIFIED SMART BUNDLING] MZ/MV Common Logic
        // =========================================================================

        // [COMMON] Generalized Require Hook - works for ALL modules in __BUNDLED_MODULES__
        script += `(function(){
            window.__BUNDLED_MODULES__ = window.__BUNDLED_MODULES__ || {};
            var Module = require('module');
            var path = require('path');
            var fs = require('fs');
            var _load = Module._load;

            function vfsLoadAsFile(X, parentMod) {
                var exts = ['', '.js', '.json', '.node'];
                for (var i = 0; i < exts.length; i++) {
                    var f = X + exts[i];
                    try {
                        if (!fs.statSync(f).isFile()) continue;
                    } catch(e) { continue; }
                    if (Module._cache[f]) return Module._cache[f].exports;
                    if (exts[i] === '.node') return _load.call(Module, f, parentMod, false);
                    var raw = fs.readFileSync(f, 'utf8');
                    if (exts[i] === '.json') return JSON.parse(raw);
                    var m = new Module(f, parentMod);
                    m.filename = f;
                    m.paths = Module._nodeModulePaths(path.dirname(f));
                    Module._cache[f] = m;
                    try { m._compile(raw, f); } catch(e) { delete Module._cache[f]; throw e; }
                    return m.exports;
                }
                return null;
            }

            function vfsLoadIndex(X, parentMod) {
                return vfsLoadAsFile(path.join(X, 'index'), parentMod);
            }

            function vfsLoadAsDirectory(X, parentMod) {
                var pkgPath = path.join(X, 'package.json');
                try {
                    if (fs.statSync(pkgPath).isFile()) {
                        var main = JSON.parse(fs.readFileSync(pkgPath, 'utf8')).main;
                        if (main) {
                            var M = path.resolve(X, main);
                            var r = vfsLoadAsFile(M, parentMod);
                            if (r !== null) return r;
                            r = vfsLoadIndex(M, parentMod);
                            if (r !== null) return r;
                        }
                    }
                } catch(e) {}
                return vfsLoadIndex(X, parentMod);
            }

            function vfsLoadNodeModules(request, parentMod) {
                var dirs = (parentMod && parentMod.paths)
                    ? parentMod.paths
                    : Module._nodeModulePaths(path.dirname(process.mainModule.filename));
                for (var i = 0; i < dirs.length; i++) {
                    var base = path.join(dirs[i], request);
                    var r = vfsLoadAsFile(base, parentMod);
                    if (r !== null) return r;
                    r = vfsLoadAsDirectory(base, parentMod);
                    if (r !== null) return r;
                }
                return null;
            }

            Module._load = function(request, parent, isMain) {
                var baseName = request.replace(/^[\\.\\x2f\\\\]+/,'').replace(/\\.js$/i,'').split(/[\\\\\\/]/).pop().toLowerCase();

                if (window.__BUNDLED_MODULES__ && window.__BUNDLED_MODULES__[baseName]) {
                    return window.__BUNDLED_MODULES__[baseName];
                }

                try {
                    return _load.call(this, request, parent, isMain);
                } catch(e) {
                    if (e.code === 'MODULE_NOT_FOUND') {
                        var isRelative = request.charAt(0) === '.';
                        var r = isRelative
                            ? (function() {
                                var abs = path.resolve(parent ? path.dirname(parent.filename) : path.dirname(process.mainModule.filename), request);
                                return vfsLoadAsFile(abs, parent) || vfsLoadAsDirectory(abs, parent);
                            })()
                            : vfsLoadNodeModules(request, parent);
                        if (r !== null) return r;
                    }
                    throw e;
                }
            };
        })();
        ;
        `;

        // [COMMON] Unified bundle function.
        // CJS detection is applied to all scripts uniformly:
        //   - libs (pixi.js etc.): internal mini-module system or UMD guards -> shim
        //   - engine core (rmmz_*.js): no module.exports -> shim
        //   - pure CJS custom scripts: wrapAsModule
        // fakeSrc uses the real relative path so document.currentScript.src is accurate.
        function bundleFile(filePath, relSrc) {
            if (!fs.existsSync(filePath)) return "";
            var content = fs.readFileSync(filePath, 'utf8');
            var moduleName = path.basename(filePath, '.js').toLowerCase();

            // Detect bundled (non-real-CJS) scripts by two patterns:
            // 1. Internal module system: 'module = { exports: {} }' — pixi.js style mini bundler
            // 2. module as function param: 'function(module, exports){...}' — webpack/rollup/browserify
            //    Real CJS never declares module as a param; Node.js injects it as a global.
            var hasInternalModuleSystem = /module\s*=\s*\{\s*exports/.test(content);
            var hasModuleAsParam = /function\s*\([^)]*\bmodule\b/.test(content);
            var isBundled = hasInternalModuleSystem || hasModuleAsParam;
            var isCommonJS = !isBundled && /module\.exports\s*=/.test(content);
            var isUMD = /typeof\s+define/.test(content) || /typeof\s+module/.test(content) || /typeof\s+exports/.test(content);
            var shouldWrap = isCommonJS && !isUMD;

            if (shouldWrap) {
                var projectRoot = path.dirname(jsPath);
                var fileDir = path.dirname(filePath);
                var relDir = path.relative(projectRoot, fileDir).replace(/\\/g, '/');
                return wrapAsModule(content, moduleName, relDir);
            }

            var fakeSrc = relSrc.replace(/\\/g, '/');
            var shimCode = `;
                (function() {
                    try {
                        var _fse = document.createElement('script');
                        _fse.setAttribute('src', ${JSON.stringify(fakeSrc)});
                        
                        Object.defineProperty(document, 'currentScript', {
                            value: _fse,
                            configurable: true,
                            writable: true
                        });
                        
                        _fse = null;
                    } catch(e) {
                    }
                })();
                `;
            var unshimCode = `;
                (function() {
                    try {
                        Object.defineProperty(document, 'currentScript', {
                            value: null,
                            configurable: true,
                            writable: true
                        });
                    } catch(e) {
                    }
                })();
                `;
            return "\n" + shimCode + content + unshimCode + ";\n";
        }

        // =========================================================================
        // [PHASE 1] Bundle all scripts in source declaration order.
        // MZ: scriptUrls array in main.js
        // MV: <script src="..."> tags in index.html
        // libs, engine core, and custom scripts are all handled in one unified pass.
        // plugins.js, main.js, active plugins are skipped here (handled later).
        // =========================================================================
        var _suppressMainJs = false;
        var _scatterShardPlan = null; // populated by bundleAllInOrder, consumed by getPluginLoaderScript
        (function bundleAllInOrder() {
            var projectRoot = path.dirname(jsPath);
            var orderedSrcs = [];

            if (isRPGMakerMZ()) {
                var mainContent = fs.readFileSync(path.join(jsPath, 'main.js'), 'utf8');
                var scriptUrlsInfo = extractScriptUrlsArray(mainContent);
                if (!scriptUrlsInfo) throw new Error('[SecuPacker] Failed to parse scriptUrls from main.js');
                orderedSrcs = scriptUrlsInfo.arrayContent.replace(/["']/g, '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);

                var _hasObfuscated = orderedSrcs.some(function (s) { return s.indexOf('/') === -1 || s.indexOf('(') !== -1; });
                if (_hasObfuscated) {
                    logInfo('Obfuscated scriptUrls detected — falling back to vm sandbox evaluation.');
                    try {
                        var vm = require('vm');
                        var _vmBoundary = mainContent.search(/\bclass\s+Main\b|\bnew\s+Main\s*\(\s*\)/);
                        var _vmSrc = _vmBoundary > 0 ? mainContent.slice(0, _vmBoundary) : mainContent;
                        _vmSrc = _vmSrc.replace(/\b(?:const|let)\s+scriptUrls\b/, 'var scriptUrls');
                        var _vmSandbox = {};
                        vm.runInNewContext(_vmSrc, _vmSandbox, { timeout: 3000 });
                        if (Array.isArray(_vmSandbox.scriptUrls) && _vmSandbox.scriptUrls.length > 0) {
                            orderedSrcs = _vmSandbox.scriptUrls.filter(function (s) { return typeof s === 'string' && s.length > 0; });
                            logInfo('vm sandbox decoded ' + orderedSrcs.length + ' script URLs.');
                        } else {
                            logWarn('vm sandbox ran but scriptUrls was empty or not an array — using partial literal extraction.');
                        }
                    } catch (_vmErr) {
                        logWarn('vm sandbox evaluation failed: ' + _vmErr.message);
                        logWarn('Falling back to partial literal extraction — some engine files may be missing from the bundle.');
                    }
                }
            } else {
                var htmlContent = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
                var scriptRegex = /<script[^>]+src=["']([^"']+\.js)["'][^>]*>/gi;
                var match;
                while ((match = scriptRegex.exec(htmlContent)) !== null) {
                    orderedSrcs.push(match[1].replace(/\\/g, '/'));
                }
                if (orderedSrcs.length === 0) throw new Error('[SecuPacker] Failed to parse any scripts from index.html');
            }

            // Pack skip set
            var skipSet = Object.create(null);
            skipSet['js/plugins.js'] = true;
            skipSet['js/main.js'] = true;
            skipSet['cordova.js'] = true;
            skipSet[('js/plugins/' + PLUGIN_NAME + '.js').toLowerCase()] = true;

            try {
                var pFile = fs.existsSync(backupPath) ? backupPath : path.join(jsPath, 'plugins.js');
                var pContent = fs.readFileSync(pFile, 'utf8');
                var pList = JSON.parse(pContent.substring(pContent.indexOf('['), pContent.lastIndexOf(']') + 1).replace(/,\s*\]/g, ']'));
                pList.forEach(function (p) {
                    if (p.status) skipSet[('js/plugins/' + p.name + '.js').toLowerCase()] = true;
                });
                _suppressMainJs = pList.some(function (p) {
                    return p.status && MAIN_JS_SUPPRESSORS.indexOf(p.name) !== -1;
                });
            } catch (e) { /* _suppressMainJs stays false */ }

            // ── [CROSS-BOUNDARY SHARD SCATTER] ───────────────────────────────────
            // Pre-generate key material before the bundle loop so external shard var
            // declarations can be spliced at random line positions inside each file.
            // External shards look identical to the dead-code vars the loader already
            // generates — no structural marker distinguishes them.
            if (masterKeyBuf) {
                try {
                    var _sMask = crypto.randomBytes(32);
                    var _sData = Buffer.alloc(32);
                    for (var _ski = 0; _ski < 32; _ski++) _sData[_ski] = masterKeyBuf[_ski] ^ _sMask[_ski];
                    _scatterShardPlan = PackShardPlan(_sMask.toString('hex'), _sData.toString('hex'));
                    var _realCount = _scatterShardPlan.externalShards.filter(function (e) { return e.type !== 'fake'; }).length;
                    var _fakeCount = _scatterShardPlan.externalShards.length - _realCount;
                    logInfo('Scatter plan: ' + _realCount + ' real + ' + _fakeCount +
                        ' fake shards across ' + orderedSrcs.length + ' scripts');
                } catch (_spErr) {
                    logWarn('Scatter plan failed, falling back:', _spErr.message || _spErr);
                    _scatterShardPlan = null;
                }
            }

            // Shuffled queue — each shard lands at a random file via reservoir sampling
            var _pendingShards = _scatterShardPlan
                ? _scatterShardPlan.externalShards.slice().sort(function () { return Math.random() - 0.5; })
                : [];

            var _remainingFiles = orderedSrcs.filter(function (s) { return !skipSet[s.toLowerCase()]; }).length;

            orderedSrcs.forEach(function (src) {
                if (skipSet[src.toLowerCase()]) return;
                var fullPath = path.join(projectRoot, src.replace(/\//g, path.sep));
                var fileContent = '';
                if (fs.existsSync(fullPath)) {
                    fileContent = bundleFile(fullPath, src);
                    _v8Track(src);
                    logInfo('Bundled: ' + src);
                } else {
                    logWarn('Not found, skipping: ' + src);
                }
                _remainingFiles--;

                // Reservoir: collect shards that land on this file
                if (_pendingShards.length > 0 && fileContent.length > 0) {
                    var _toInject = [];
                    var _keep = [];
                    _pendingShards.forEach(function (entry) {
                        // Last file: flush all remaining; otherwise probabilistic
                        if (_remainingFiles <= 0 || Math.random() < 1 / (_remainingFiles + 1)) {
                            _toInject.push(entry);
                        } else {
                            _keep.push(entry);
                        }
                    });
                    _pendingShards = _keep;

                    if (_toInject.length > 0) {
                        // File boundaries are known safe injection points — no need
                        // to parse file internals looking for "safe lines".
                        // Everything (shards, noise, fake reassembly) is injected
                        // between files at the top level of the concatenated script.
                        // This guarantees global scope and zero syntax risk.
                        var _fakeNames = [];
                        var _allShardNames = [];
                        _toInject.forEach(function (entry) {
                            _allShardNames.push(entry.shard.name);
                            if (entry.type === 'fake') _fakeNames.push(entry.shard.name);
                        });

                        var _inject = [];
                        var _namePositions = Object.create(null);

                        // Shard declarations (real + fake) — each gets a random position
                        _toInject.forEach(function (entry) {
                            var _pos = Math.random();
                            _namePositions[entry.shard.name] = _pos;
                            _inject.push({ code: generateScatteredShardDecl(entry, Math.random() < 0.5), pos: _pos });
                        });

                        // Dead code noise — varied formats
                        var _noiseCount = Math.floor(_toInject.length * (1 + Math.random() * 2));
                        for (var _ni = 0; _ni < _noiseCount; _ni++) {
                            var _refVars = Math.random() < 0.33 ? _allShardNames : null;
                            var _noise = generateDeadCode(_scatterShardPlan.usedNames, _refVars);
                            _inject.push({ code: (Math.random() < 0.5 ? wrapWithFakeCondition(_noise) : _noise), pos: Math.random() });
                        }

                        // Fake reassembly mirroring real ANCHOR_C pattern
                        if (_fakeNames.length >= 2 && Math.random() < 0.6) {
                            var _pick = _fakeNames.slice()
                                .sort(function () { return Math.random() - 0.5; })
                                .slice(0, 2 + Math.floor(Math.random() *
                                    Math.min(3, _fakeNames.length - 1)));
                            var _maxRefPos = 0;
                            _pick.forEach(function (_pn) {
                                if (_namePositions[_pn] !== undefined && _namePositions[_pn] > _maxRefPos) {
                                    _maxRefPos = _namePositions[_pn];
                                }
                            });
                            var _reassemblyPos = _maxRefPos + (1 - _maxRefPos) * (0.05 + Math.random() * 0.95);
                            _inject.push({ code: generateFakeReassemblyDecl(_pick, _scatterShardPlan.usedNames), pos: _reassemblyPos });
                        }

                        _inject.sort(function (a, b) { return a.pos - b.pos; });
                        fileContent = _inject.map(function (item) { return item.code; }).join('\n') + '\n' + fileContent;
                        logInfo('' + src + ': ' +
                            _toInject.length + ' shards + ' + _noiseCount + ' noise injected');
                    }
                }

                script += '/* SCRIPT: ' + src + ' */\n' + fileContent;
            });

            // Safety flush: any unplaced shards are emitted as top-level declarations
            if (_pendingShards.length > 0) {
                _pendingShards.forEach(function (entry) {
                    script += '\n' + generateScatteredShardDecl(entry, Math.random() < 0.5);
                    logInfo('Shard ' + entry.shard.name + ' flushed after loop');
                });
            }
        })();

        // =========================================================================
        // [PHASE 4] plugins.js -> VFS (stub in V8, real list loaded from VFS at runtime)
        // plugins.js is NOT embedded in the V8 snapshot. Instead it is encrypted
        // in the VFS resource segment. The plugin loader (PHASE 5) initialises the
        // VFS first (SecuPacker self-loader), then reads plugins.js through the
        // hooked fs.readFileSync, evals it to define $plugins, and runs the
        // PluginManager shim before executing any other plugin.
        // =========================================================================
        var targetPluginsFile = fs.existsSync(backupPath) ? backupPath : path.join(jsPath, 'plugins.js');
        if (fs.existsSync(targetPluginsFile)) {
            // [VFS STUB] Define an empty $plugins so that PluginManager.setup() called
            // inside the modified main.js does not throw a ReferenceError.
            // The real list is loaded from VFS by the plugin loader in PHASE 5.
            script += "/* PLUGINS.JS STUB - real $plugins list is loaded from VFS in PHASE 5 */\nvar $plugins = [];\n;\n";

            // [DEFERRED INJECTION]
            // We get the plugin loader script now, but we don't inject it yet.
            // Plugins must execute AFTER main.js so they can properly hook/override window.onload.
            // The loader will: (1) init VFS, (2) load plugins.js from VFS, (3) run PluginManager shim,
            // (4) execute each plugin.
            // [V8 REGISTRY] Register all compiled plugins and SecuPacker itself.
            compiledPluginNames.forEach(function (n) {
                _v8Track('js/plugins/' + n + '.js');
            });
            _v8Track('js/plugins/' + PLUGIN_NAME + '.js');

            var pluginLoaderScript = getPluginLoaderScript(targetPluginsFile, masterKeyBuf, compiledPluginNames, failedPlugins, compiledBins, hashExeFiles, enableSecurityWatchdog, excludedBinaryHashes, playerUpdateOpts, _v8FilesRegistry, earlyBlobResolve, _scatterShardPlan);
        }

        // =========================================================================
        // [PHASE 5] Bundle main.js (different handling for MZ/MV)
        // =========================================================================
        var mainJsPath = path.join(jsPath, 'main.js');
        if (fs.existsSync(mainJsPath)) {
            var mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
            _v8Track('js/main.js'); // [V8 REGISTRY]

            if (isRPGMakerMZ()) {
                // MZ: Modify main.js to clear scriptUrls and bypass checks
                var _suInfo = extractScriptUrlsArray(mainJsContent);
                var modifiedMain;
                if (_suInfo) {
                    modifiedMain = mainJsContent.slice(0, _suInfo.arrayStart) + '[]' + mainJsContent.slice(_suInfo.arrayEnd);
                } else {
                    modifiedMain = mainJsContent;
                }
                modifiedMain = modifiedMain
                    .replace(/document\[['"]currentScript['"]\]/g, "(document['currentScript']||{src:''})")
                    .replace(/document\.currentScript/g, "(document.currentScript||{src:''})");

                modifiedMain = `(function(){
                        var _o=typeof XMLHttpRequest!=="undefined"?XMLHttpRequest:null;
                        if(!_o)return;
                        window._secuXHRR=function(){if(XMLHttpRequest!==_o)XMLHttpRequest=_o;window._secuXHRR=null;};
                        function _S(){this._l=null;}
                        Object.defineProperty(_S.prototype,"onload",{set:function(v){this._l=v;},get:function(){return this._l;}});
                        _S.prototype.open=function(){};
                        _S.prototype.send=function(){window._secuXHRR&&window._secuXHRR();if(this._l)this._l.call(this);};
                        XMLHttpRequest=_S;
                    })();
                    ${modifiedMain}
                    `;

                if (!modifiedMain.includes('PluginManager.setup($plugins);')) {
                    var _p3d = 'window.addEventListener("load"';
                    var _p3s = "window.addEventListener('load'";
                    if (modifiedMain.includes(_p3d)) {
                        modifiedMain = modifiedMain.replace(_p3d, 'PluginManager.setup($plugins); ' + _p3d);
                    } else if (modifiedMain.includes(_p3s)) {
                        modifiedMain = modifiedMain.replace(_p3s, 'PluginManager.setup($plugins); ' + _p3s);
                    }
                }

                if (_suppressMainJs) {
                    logInfo('main.js suppressed (active suppressor plugin detected)');
                } else {
                    script += `
                    ${modifiedMain};
                    if(window._secuXHRR)window._secuXHRR();
                    `;
                }
            } else {
                // MV: Use main.js as-is
                script += "\n" + mainJsContent + "\n;\n";
            }
        }

        // =========================================================================
        // [PHASE 6] Inject Plugin Executions
        // =========================================================================
        // Inject plugins execution AFTER main.js so that plugins correctly overwrite 
        // window.onload set by main.js (restoring normal MV/MZ load behavior).
        if (typeof pluginLoaderScript !== 'undefined' && pluginLoaderScript) {
            script += "/* PLUGIN LOADER VIRTUAL EXECUTION */\n" + pluginLoaderScript + "\n;\n";
        }

        return script;
    }

    // ===========================================================================
    // [PART 5] Key Randomization Engine
    // ===========================================================================
    /**
     * Generate a random variable name that looks like minified code
     * Format: _[a-z][a-z0-9]{3,5}
     * @param {Object} [usedNames] - Registry of already-used names to avoid collisions
     */
    function generateRandomVarName(usedNames) {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var all = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var name, attempts = 0;
        do {
            var len = 3 + Math.floor(Math.random() * 3); // 3-5 chars
            name = '_' + chars[Math.floor(Math.random() * chars.length)];
            for (var i = 0; i < len; i++) {
                name += all[Math.floor(Math.random() * all.length)];
            }
            attempts++;
            // Safety net: if somehow exhausted after 100 tries, extend length
            if (attempts > 100) {
                name += all[Math.floor(Math.random() * all.length)];
            }
        } while (usedNames && usedNames[name]);
        if (usedNames) usedNames[name] = true;
        return name;
    }

    /**
     * Generate dead code that looks realistic but does nothing meaningful
     */
    function generateDeadCode(usedNames, optRefVars) {
        var templates = [
            // Fake key variables (honeypots)
            'var {{VAR}} = "{{HEX}}"; if(typeof {{VAR}}==="undefined"){{VAR}}="";',
            // Fake function
            'function {{VAR}}(a,b){return ((a^b)&0xFF);}',
            // Fake condition
            'var {{VAR}} = Math.random() > 2 ? null : undefined;',
            // Fake array
            'var {{VAR}} = [{{NUM}},{{NUM}},{{NUM}},{{NUM}}];',
            // Fake object
            'var {{VAR}} = {k:{{NUM}},v:"{{HEX}}"};',
            // Fake loop (never executes)
            'for(var {{VAR}}=0;{{VAR}}<0;{{VAR}}++){}',
            // Fake crypto-like function
            'function {{VAR}}(d){var r=0;for(var i=0;i<d.length;i++)r=(r<<1)^d[i];return r;}',
            // Fake buffer operation
            'var {{VAR}} = typeof Buffer !== "undefined" ? Buffer.alloc({{NUM}}) : null;',
        ];

        // Usage templates: reference a previously-declared variable so it doesn't
        // look like an unreferenced dead declaration.
        if (optRefVars && optRefVars.length > 0) {
            var rv = optRefVars[Math.floor(Math.random() * optRefVars.length)];
            templates.push(
                'var {{VAR}} = typeof ' + rv + '!=="undefined"?' + rv + '.length:0;',
                'if(typeof ' + rv + '!=="undefined"&&' + rv + '.length>0){var {{VAR}}=' + rv + '[0]^{{NUM}};}',
                'var {{VAR}} = (' + rv + '&&' + rv + '.length)?' + rv + '[{{NUM}}%' + rv + '.length]:{{NUM}};'
            );
        }

        var template = templates[Math.floor(Math.random() * templates.length)];
        var varName = generateRandomVarName(usedNames);
        var hexVal = crypto.randomBytes(8 + Math.floor(Math.random() * 24)).toString('hex');
        var numVal = Math.floor(Math.random() * 256);

        return template
            .replace(/\{\{VAR\}\}/g, varName)
            .replace(/\{\{HEX\}\}/g, hexVal)
            .replace(/\{\{NUM\}\}/g, numVal.toString());
    }

    /**
     * Generate a random XOR-based arithmetic expression that evaluates to the given byte value.
     * Prevents key bytes from appearing as literal constants in the V8 constant pool.
     *
     * Three strategies are randomly selected per byte:
     *   1.  (a ^ b)          where a is random, b = a ^ byteVal
     *   2.  (a ^ b) + c      where c ∈ [0,127], a is random, b = a ^ (byteVal-c)
     *   3.  (a ^ b) - c      where c ∈ [1,127] and byteVal+c ≤ 255, a is random, b = a ^ (byteVal+c)
     *
     * All operands are integers; no floating-point arithmetic is used.
     *
     * @param {number} byteVal - Integer in [0, 255]
     * @returns {string} JS expression string, e.g. "(214^53)+62"
     */
    function generateXorObfuscatedByte(byteVal) {
        var strategies = [
            // Strategy 1: pure XOR  ->  (a ^ b) = byteVal
            function () {
                var a = Math.floor(Math.random() * 256);
                var b = a ^ byteVal;
                return '(' + a + '^' + b + ')';
            },
            // Strategy 2: XOR + addition  ->  (a ^ b) + c = byteVal
            function () {
                var c = Math.floor(Math.random() * Math.min(byteVal + 1, 128));
                var rem = byteVal - c;
                var a = Math.floor(Math.random() * 256);
                var b = a ^ rem;
                if (c === 0) return '(' + a + '^' + b + ')';
                return '(' + a + '^' + b + ')+' + c;
            },
            // Strategy 3: XOR - subtraction  ->  (a ^ b) - c = byteVal  ⟹  a^b = byteVal+c
            function () {
                var maxC = 255 - byteVal;
                if (maxC === 0) {
                    var aa = Math.floor(Math.random() * 256);
                    return '(' + aa + '^' + (aa ^ 255) + ')';
                }
                var c = 1 + Math.floor(Math.random() * Math.min(maxC, 127));
                var target = byteVal + c;
                var a = Math.floor(Math.random() * 256);
                var b = a ^ target;
                return '(' + a + '^' + b + ')-' + c;
            },
            // Strategy 4: NOT-XOR  ->  (~a & 0xFF) ^ b = byteVal
            // Since (~a & 0xFF) = 255 - a,  b = (255 - a) ^ byteVal
            function () {
                var a = Math.floor(Math.random() * 256);
                var b = (255 - a) ^ byteVal;
                return '((~' + a + '&0xFF)^' + b + ')';
            },
            // Strategy 5: OR-XOR  ->  (a | b) ^ c = byteVal
            // Choose a, b freely; c = (a | b) ^ byteVal
            function () {
                var a = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                var c = (a | b) ^ byteVal;
                return '((' + a + '|' + b + ')^' + c + ')';
            }
        ];
        return strategies[Math.floor(Math.random() * strategies.length)]();
    }

    /**
     * Split hex string into multiple shards with random positions for obfuscation.
     * NOTE: Named differently from the Loader's splitKeyToShards to avoid regex collision.
     * @param {string} hexString - Hex-encoded string to split
     * @param {number} [shardCount] - Number of shards (default: 4-6 random)
     * @param {Object} [usedNames] - Name registry for collision prevention
     * @returns {Array} Array of shard objects with name, bytes, position, originalIndex
     */
    function splitHexToShards(hexString, shardCount, usedNames) {
        shardCount = shardCount || (4 + Math.floor(Math.random() * 3)); // 4-6 shards

        // Convert hex string to a plain byte array first.
        // Shards carry bytes, not hex sub-strings, so no string constant appears in the snapshot.
        var byteArray = [];
        for (var _hi = 0; _hi < hexString.length; _hi += 2) {
            byteArray.push(parseInt(hexString.substring(_hi, _hi + 2), 16));
        }

        var shards = [];
        var partSize = Math.ceil(byteArray.length / shardCount);

        for (var i = 0; i < shardCount; i++) {
            var start = i * partSize;
            var end = Math.min(start + partSize, byteArray.length);
            if (start >= byteArray.length) break;

            shards.push({
                name: generateRandomVarName(usedNames),
                bytes: byteArray.slice(start, end), // byte sub-array, not a hex string
                position: Math.random(),
                originalIndex: i
            });
        }

        return shards;
    }

    /**
     * Generate the reassembly code for sharded keys (with pattern variation).
     * Shards are now byte arrays; the reassembled result is a flat byte array that
     * Buffer.from() can consume directly (no hex decoding required).
     */
    function generateReassemblyCode(shards, resultVarName, usedNames) {
        var sortedShards = shards.slice().sort(function (a, b) {
            return a.originalIndex - b.originalIndex;
        });
        var shardNames = sortedShards.map(function (s) { return s.name; });

        // [PATTERN VARIATION] All patterns produce a flat byte array.
        var patterns = [
            // Pattern 1: Array.prototype.concat.apply — flattens array-of-arrays
            function () {
                return 'var ' + resultVarName + ' = Array.prototype.concat.apply([],[' + shardNames.join(',') + ']);';
            },
            // Pattern 2: .concat() chain on first shard
            function () {
                if (shardNames.length === 1) {
                    return 'var ' + resultVarName + ' = ' + shardNames[0] + '.slice();';
                }
                return 'var ' + resultVarName + ' = ' + shardNames[0] + '.concat(' + shardNames.slice(1).join(',') + ');';
            },
            // Pattern 3: Imperative push loop
            function () {
                var tempSrc = generateRandomVarName(usedNames);
                var tempOuter = generateRandomVarName(usedNames);
                var tempInner = generateRandomVarName(usedNames);
                return 'var ' + tempSrc + '=[' + shardNames.join(',') + '];' +
                    'var ' + resultVarName + '=[];' +
                    'for(var ' + tempOuter + '=0;' + tempOuter + '<' + tempSrc + '.length;' + tempOuter + '++){' +
                    'for(var ' + tempInner + '=0;' + tempInner + '<' + tempSrc + '[' + tempOuter + '].length;' + tempInner + '++)' +
                    resultVarName + '.push(' + tempSrc + '[' + tempOuter + '][' + tempInner + ']);}';
            },
            // Pattern 4: reduce + concat
            function () {
                return 'var ' + resultVarName + ' = [' + shardNames.join(',') + '].reduce(function(a,b){return a.concat(b);}, []);';
            },
        ];

        var selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
        return selectedPattern();
    }

    /**
     * Generate fake conditional wrapper for code flow obfuscation
     */
    function wrapWithFakeCondition(code) {
        var fakeConditions = [
            // Always true conditions
            'if(typeof window!=="undefined"||typeof global!=="undefined"){{{CODE}}}',
            'if(Math.random()>-1){{{CODE}}}',
            'if(true||false){{{CODE}}}',
            'if(1){{{CODE}}}',
            'if(!!1){{{CODE}}}',
            // With fake else
            'if(Date.now()>0){{{CODE}}}else{throw new Error();}',
            'if(typeof Buffer!=="undefined"||typeof ArrayBuffer!=="undefined"){{{CODE}}}',
        ];

        var condition = fakeConditions[Math.floor(Math.random() * fakeConditions.length)];
        return condition.replace('{{CODE}}', code);
    }

    // ===========================================================================
    // [CROSS-BOUNDARY SHARD SCATTER]
    // Approach: plain var declarations injected at random positions in the bundled
    // script — no namespace, no wrapper, no transport layer.
    // They look identical to the dead code the loader already generates, so there is
    // no structural marker that distinguishes a real shard from noise.
    // The loader's reassembly code references them by name exactly like internal shards.
    // ===========================================================================

    /**
     * Pre-generate mask/data shards and split them into two buckets:
     *   - internalGroups[0..2]: injected at ANCHOR_A / ANCHOR_B / ANCHOR_C
     *   - externalGroups:       injected as plain var decls between bundled scripts
     *
     * Both buckets share the same usedNames registry so variable names never collide.
     */

    /**
     * Generate a fake reassembly declaration that mimics the real ANCHOR_C reassembly
     * patterns exactly — an attacker can't distinguish this from the genuine key join.
     *
     * Uses the same four patterns as generateReassemblyCode so the output is
     * structurally identical (concat.apply, .concat chain, push loop, reduce).
     *
     * @param {string[]} fakeShardNames  Variable names already declared in this scope
     * @param {Object}   usedNames       Collision registry
     * @returns {string} A JS statement that assembles the fake shards into a fake result
     */
    function generateFakeReassemblyDecl(fakeShardNames, usedNames) {
        if (!fakeShardNames || fakeShardNames.length === 0) return '';
        var resultVar = generateRandomVarName(usedNames);

        // Mirror generateReassemblyCode's four patterns verbatim
        var patterns = [
            function () {
                return 'var ' + resultVar + ' = Array.prototype.concat.apply([],[' + fakeShardNames.join(',') + ']);';
            },
            function () {
                if (fakeShardNames.length === 1) return 'var ' + resultVar + ' = ' + fakeShardNames[0] + '.slice();';
                return 'var ' + resultVar + ' = ' + fakeShardNames[0] + '.concat(' + fakeShardNames.slice(1).join(',') + ');';
            },
            function () {
                var src = generateRandomVarName(usedNames);
                var iVar = generateRandomVarName(usedNames);
                var jVar = generateRandomVarName(usedNames);
                return 'var ' + src + '=[' + fakeShardNames.join(',') + '];' +
                    'var ' + resultVar + '=[];' +
                    'for(var ' + iVar + '=0;' + iVar + '<' + src + '.length;' + iVar + '++){' +
                    'for(var ' + jVar + '=0;' + jVar + '<' + src + '[' + iVar + '].length;' + jVar + '++)' +
                    resultVar + '.push(' + src + '[' + iVar + '][' + jVar + ']);}';
            },
            function () {
                return 'var ' + resultVar + ' = [' + fakeShardNames.join(',') + '].reduce(function(a,b){return a.concat(b);},[]);';
            },
        ];

        var code = patterns[Math.floor(Math.random() * patterns.length)]();
        // Optionally wrap so it blends with the real reassembly which is also sometimes wrapped
        if (Math.random() < 0.5) code = wrapWithFakeCondition(code);
        return code;
    }

    function PackShardPlan(maskHex, dataHex) {
        var usedNames = Object.create(null);

        var maskShards = splitHexToShards(maskHex, undefined, usedNames);
        var dataShards = splitHexToShards(dataHex, undefined, usedNames);

        var pool = [];
        maskShards.forEach(function (s) { pool.push({ shard: s, type: 'mask' }); });
        dataShards.forEach(function (s) { pool.push({ shard: s, type: 'data' }); });

        // Shuffle
        pool.sort(function () { return Math.random() - 0.5; });

        var n = pool.length;
        // Reserve at least 3 for internal anchors; send ~30% external (min 2)
        var extCount = Math.max(2, Math.floor(n * 0.30));
        if (n - extCount < 3) extCount = Math.max(0, n - 3);

        var extPool = pool.slice(0, extCount);
        var intPool = pool.slice(extCount);

        // Split internal into exactly 3 anchor groups
        function threeWay(arr) {
            if (arr.length <= 3) {
                // At least 1 in A, rest in B, none in C
                return [arr.slice(0, 1), arr.slice(1), []];
            }
            arr = arr.slice().sort(function () { return Math.random() - 0.5; });
            var c1 = 1 + Math.floor(Math.random() * (arr.length - 2));
            var c2 = c1 + 1 + Math.floor(Math.random() * (arr.length - c1 - 1));
            return [arr.slice(0, c1), arr.slice(c1, c2), arr.slice(c2)];
        }

        // ── Fake (decoy) shards ───────────────────────────────────────────────────
        // 3–5× as many fakes as real external shards.
        // Structurally identical to real ones: same XOR-obfuscated byte format,
        // same random names, same length range. Never referenced in reassembly.
        var fakeCount = Math.floor(extPool.length * (3 + Math.random() * 2));
        var fakeShards = [];
        for (var fi = 0; fi < fakeCount; fi++) {
            var byteLen = 4 + Math.floor(Math.random() * 3);
            var fakeBytes = [];
            for (var bi = 0; bi < byteLen; bi++) fakeBytes.push(Math.floor(Math.random() * 256));
            fakeShards.push({
                shard: { name: generateRandomVarName(usedNames), bytes: fakeBytes },
                type: 'fake'
            });
        }

        // Merge real externals + fakes, shuffle together.
        // generateScatteredShardDecl treats both paths identically —
        // the 'type' field is never inspected during injection.
        var scatterPool = extPool.concat(fakeShards).sort(function () { return Math.random() - 0.5; });

        return {
            maskHex: maskHex,
            dataHex: dataHex,
            maskShards: maskShards,
            dataShards: dataShards,
            internalGroups: threeWay(intPool),
            externalShards: scatterPool,  // real + fake, pre-shuffled
            usedNames: usedNames
        };
    }

    /**
     * Generate a single plain var declaration for one external shard entry.
     * Output looks exactly like generated dead-code variables — there is nothing
     * structurally different to hint this is a real shard.
     *
     *   var _xR3k = [27^(91&0xFF), (14+3)^0x0F, ...];
     */
    function generateScatteredShardDecl(entry, doWrap) {
        var byteExprs = entry.shard.bytes.map(function (b) {
            return generateXorObfuscatedByte(b);
        });
        var decl = 'var ' + entry.shard.name + ' = [' + byteExprs.join(',') + '];';
        return doWrap ? wrapWithFakeCondition(decl) : decl;
    }

    /**
     * Transform loader code with randomized key positions and dead code
     */
    function transformLoaderCode(loaderCode, maskHex, dataHex, hashExeFiles, enableSecurityWatchdog, excludedBinaryHashes, playerUpdateOpts, earlyBlobResolve, prebuiltShardPlan) {
        // [COLLISION PREVENTION] Shared registry for all generated names in this Pack.
        // Seeded from prebuiltShardPlan when provided so that shard variable names
        // allocated during PackShardPlan() (outside this function) are never reused.
        var usedNames = Object.create(null);
        if (prebuiltShardPlan && prebuiltShardPlan.usedNames) {
            var _seed = prebuiltShardPlan.usedNames;
            for (var _sk in _seed) usedNames[_sk] = true;
        }

        // Create shards for mask and data.
        // When a prebuilt plan exists the shards were already generated (and some
        // were already scattered externally), so reuse them to keep names consistent.
        var maskShards, dataShards;
        if (prebuiltShardPlan) {
            maskShards = prebuiltShardPlan.maskShards;
            dataShards = prebuiltShardPlan.dataShards;
        } else {
            maskShards = splitHexToShards(maskHex, undefined, usedNames);
            dataShards = splitHexToShards(dataHex, undefined, usedNames);
        }

        // Generate randomized variable names
        var varNames = {
            mask: generateRandomVarName(usedNames),
            data: generateRandomVarName(usedNames)
        };

        // [FUNCTION NAME RANDOMIZATION] Generate random names for critical functions
        var funcNames = {
            getKey: generateRandomVarName(usedNames),
            splitKeyToShards: generateRandomVarName(usedNames),
            reconstructKeyFromShards: generateRandomVarName(usedNames),
            reobfuscateShards: generateRandomVarName(usedNames),
            deriveEntryKey: generateRandomVarName(usedNames),
            deriveChunkKey: generateRandomVarName(usedNames),
            decryptAndDecompress: generateRandomVarName(usedNames),
            resolveFileMetadata: generateRandomVarName(usedNames),
            decryptFullFile: generateRandomVarName(usedNames),
            hookElementSrcSetter: generateRandomVarName(usedNames),
            emergencyWipe: generateRandomVarName(usedNames),
            // Runtime key protection
            _key_shard_a: generateRandomVarName(usedNames),
            _key_shard_b: generateRandomVarName(usedNames),
            _runtime_key_cache: generateRandomVarName(usedNames),
            _key_access_count: generateRandomVarName(usedNames),
            _KEY_REOBFUSCATE_THRESHOLD: generateRandomVarName(usedNames),
            _SECURITY_TRIGGERED: generateRandomVarName(usedNames),
            // [ENV BINDING]
            getVfsKey: generateRandomVarName(usedNames),
            computeRuntimeEnvHash: generateRandomVarName(usedNames),
            _vfs_shard_a: generateRandomVarName(usedNames),
            _vfs_shard_b: generateRandomVarName(usedNames),
            // [SECURITY WATCHDOG] nw.Window.open background process
            _buildFindstrCmd: generateRandomVarName(usedNames),
            _buildFindstrDllCmd: generateRandomVarName(usedNames),
            _buildFindstrWinCmd: generateRandomVarName(usedNames),
            _initSecWatchdog: generateRandomVarName(usedNames),
            // [SECURITY LOOP]
            _SECURITY_CHECK_INTERVAL: generateRandomVarName(usedNames),
            securityLoop: generateRandomVarName(usedNames),
            setupHoneypots: generateRandomVarName(usedNames),
            // [INTEGRITY]
            _CRITICAL_HASH: generateRandomVarName(usedNames),
            computeCriticalHash: generateRandomVarName(usedNames),
            verifyIntegrity: generateRandomVarName(usedNames),
            // [FEATURE FLAGS] watchdog enable/disable
            _enable_sec_watchdog: generateRandomVarName(usedNames),
        };

        // ── Shard Scatter Helper ─────────────────────────────────────────────────
        // Splits an array into 3 randomly-sized groups so shards can be placed at
        // different bytecode positions (ANCHOR_A, ANCHOR_B, ANCHOR_C).
        // Each group gets at least 1 element; the remainder is randomly distributed.
        function splitIntoThreeGroups(arr) {
            // Shuffle a copy so even within-group ordering varies per Pack
            var shuffled = arr.slice().sort(function () { return Math.random() - 0.5; });
            var n = shuffled.length;
            if (n <= 3) {
                // Too few shards to guarantee 1 per group — just put them all in A
                return [shuffled, [], []];
            }
            // Random cut points (each group gets at least 1)
            var cut1 = 1 + Math.floor(Math.random() * (n - 2));
            var cut2 = cut1 + 1 + Math.floor(Math.random() * (n - cut1 - 1));
            return [shuffled.slice(0, cut1), shuffled.slice(cut1, cut2), shuffled.slice(cut2)];
        }

        // Generate dead code entries (15-30 blocks) — distributed across anchors
        var deadCodeCount = 15 + Math.floor(Math.random() * 16);

        // ── Split shards across 3 groups ─────────────────────────────────────────
        // When a prebuilt plan is supplied, external shards have already been pulled
        // out and scattered; internalGroups holds only the remaining shards for the
        // three ANCHOR injection points.  Without a plan, pool everything as before.
        var shardGroups;
        if (prebuiltShardPlan) {
            shardGroups = prebuiltShardPlan.internalGroups;
        } else {
            var allShards = [];
            maskShards.forEach(function (s) { allShards.push({ shard: s, type: 'mask' }); });
            dataShards.forEach(function (s) { allShards.push({ shard: s, type: 'data' }); });
            shardGroups = splitIntoThreeGroups(allShards);
        }

        // Dead code split: A gets ~40%, B ~35%, C ~25%
        var deadA = Math.floor(deadCodeCount * 0.40);
        var deadB = Math.floor(deadCodeCount * 0.35);
        var deadC = deadCodeCount - deadA - deadB;

        function PackShardBlock(shardEntries, extraDeadCount) {
            var items = [];
            shardEntries.forEach(function (entry) {
                // Each byte is encoded as a random arithmetic XOR expression so no
                // literal key byte appears in the V8 constant pool.
                var byteExprs = entry.shard.bytes.map(function (b) {
                    return generateXorObfuscatedByte(b);
                });
                var code = 'var ' + entry.shard.name + ' = [' + byteExprs.join(',') + '];';
                if (Math.random() < 0.3) code = wrapWithFakeCondition(code);
                items.push({ position: Math.random(), code: code });
            });
            for (var di = 0; di < extraDeadCount; di++) {
                items.push({ position: Math.random(), code: generateDeadCode(usedNames) });
            }
            items.sort(function (a, b) { return a.position - b.position; });
            return items.map(function (item) { return '        ' + item.code; }).join('\n');
        }

        var anchorABlock = PackShardBlock(shardGroups[0], deadA);
        var anchorBBlock = PackShardBlock(shardGroups[1], deadB);
        var anchorCBlock = PackShardBlock(shardGroups[2], deadC);

        // Reassembly: runs at ANCHOR_C (all shards are declared by this point)
        var maskReassembly = generateReassemblyCode(maskShards, varNames.mask, usedNames);
        var dataReassembly = generateReassemblyCode(dataShards, varNames.data, usedNames);
        if (Math.random() < 0.5) maskReassembly = wrapWithFakeCondition(maskReassembly);
        if (Math.random() < 0.5) dataReassembly = wrapWithFakeCondition(dataReassembly);

        // Unique Pack ID at ANCHOR_A (top anchor)
        var PackUniqueComment = '        // [Pack_UNIQUE_ID: ' + crypto.randomBytes(16).toString('hex') + ']';

        // ── Pack the three anchor replacement strings ────────────────────────────
        var anchorAReplacement = '\n' + PackUniqueComment + '\n' + anchorABlock + '\n';
        var anchorBReplacement = '\n' + anchorBBlock + '\n';
        var anchorCReplacement = '\n' + anchorCBlock + '\n' +
            '        ' + maskReassembly + '\n' +
            '        ' + dataReassembly + '\n';

        // Transform loader code
        var transformedLoader = loaderCode
            // Remove placeholder declarations
            .replace(/var _s_mask = "%__INJECT_MASK__%";[\r\n]*/g, '')
            .replace(/var _s_data = "%__INJECT_DATA__%";[\r\n]*/g, '')
            // Inject enable flags (boolean values from plugin parameters)
            .replace(/var _enable_sec_watchdog = "%__INJECT_ENABLE_SEC_WATCHDOG__%" === "true";[\r\n]*/g,
                'var _enable_sec_watchdog = ' + (enableSecurityWatchdog ? 'true' : 'false') + ';\n')
            // Inject _ENV_HASH_EXE value (replace entire declaration line)
            .replace(/var _ENV_HASH_EXE = "%__INJECT_ENV_HASH_EXE__%" === "true";[\r\n]*/g,
                'var _ENV_HASH_EXE = ' + (hashExeFiles ? 'true' : 'false') + ';\n')
            // Inject _earlyBlobResolve value
            .replace(/var _earlyBlobResolve = "%__INJECT_EARLY_BLOB_RESOLVE__%" === "true";[\r\n]*/g,
                'var _earlyBlobResolve = ' + (earlyBlobResolve ? 'true' : 'false') + ';\n')
            // Inject excluded binary hashes list (JSON array)
            .replace(/var _EXCLUDED_BINARY_HASHES_RAW = "%__INJECT_EXCLUDED_BINARY_HASHES__%";[\r\n]*/g,
                'var _EXCLUDED_BINARY_HASHES_RAW = ' + JSON.stringify(JSON.stringify(excludedBinaryHashes || [])) + ';\n')
            // [PLAYER AUTO UPDATE] Inject PAU settings
            .replace(/var _pau_enabled\s*=\s*"%__INJECT_PAU_ENABLED__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_enabled = ' + ((playerUpdateOpts && playerUpdateOpts.enabled) ? 'true' : 'false') + ';\n')
            .replace(/var _pau_url\s*=\s*"%__INJECT_PAU_URL__%";[\r\n]*/g,
                'var _pau_url = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.url) || '') + ';\n')
            .replace(/var _pau_tag_raw\s*=\s*"%__INJECT_pau_tag__%";[\r\n]*/g,
                'var _pau_tag_raw = ' + JSON.stringify(JSON.stringify((playerUpdateOpts && playerUpdateOpts.tags) || [])) + ';\n')
            .replace(/var _pau_disable_no_net\s*=\s*"%__INJECT_PAU_DISABLE_NO_NET__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_disable_no_net = ' + ((playerUpdateOpts && playerUpdateOpts.disableNoNet) ? 'true' : 'false') + ';\n')
            .replace(/var _pau_disable_fail\s*=\s*"%__INJECT_PAU_DISABLE_FAIL__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_disable_fail = ' + ((playerUpdateOpts && playerUpdateOpts.disableFail) ? 'true' : 'false') + ';\n')
            // [PAU UI] Inject update-screen customisation vars
            .replace(/var _pau_ui_update_text\s*=\s*"%__INJECT_PAU_UI_UPDATE_TEXT__%";[\r\n]*/g,
                'var _pau_ui_update_text   = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.updateText) || 'Updating...') + ';\n')
            .replace(/var _pau_ui_complete_text\s*=\s*"%__INJECT_PAU_UI_COMPLETE_TEXT__%";[\r\n]*/g,
                'var _pau_ui_complete_text = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.completeText) || 'Update complete!') + ';\n')
            .replace(/var _pau_ui_failed_text\s*=\s*"%__INJECT_PAU_UI_FAILED_TEXT__%";[\r\n]*/g,
                'var _pau_ui_failed_text   = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.failedText) || 'Update failed') + ';\n')
            .replace(/var _pau_ui_blink\s*=\s*"%__INJECT_PAU_UI_BLINK__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_ui_blink         = ' + ((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.blink !== false) ? 'true' : 'false') + ';\n')
            .replace(/var _pau_ui_blink_speed\s*=\s*"%__INJECT_PAU_UI_BLINK_SPEED__%";[\r\n]*/g,
                'var _pau_ui_blink_speed   = ' + (function () { var b = parseFloat(playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.blinkSpeed); return isNaN(b) ? 0.050 : b; })() + ';\n')
            .replace(/var _pau_ui_show_progress\s*=\s*"%__INJECT_PAU_UI_SHOW_PROGRESS__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_ui_show_progress = ' + ((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.showProgress !== false) ? 'true' : 'false') + ';\n')
            .replace(/var _pau_ui_bg_type\s*=\s*"%__INJECT_PAU_UI_BG_TYPE__%";[\r\n]*/g,
                'var _pau_ui_bg_type       = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgType) || 'color') + ';\n')
            .replace(/var _pau_ui_bg_color\s*=\s*"%__INJECT_PAU_UI_BG_COLOR__%";[\r\n]*/g,
                'var _pau_ui_bg_color      = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgColor) || '#000000') + ';\n')
            .replace(/var _pau_ui_bg_image\s*=\s*"%__INJECT_PAU_UI_BG_IMAGE__%";[\r\n]*/g,
                'var _pau_ui_bg_image      = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgImage) || '') + ';\n')
            .replace(/var _pau_ui_bg_video\s*=\s*"%__INJECT_PAU_UI_BG_VIDEO__%";[\r\n]*/g,
                'var _pau_ui_bg_video      = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgVideo) || '') + ';\n')
            .replace(/var _pau_ui_bg_fit\s*=\s*"%__INJECT_PAU_UI_BG_FIT__%";[\r\n]*/g,
                'var _pau_ui_bg_fit        = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgFit) || 'cover') + ';\n')
            .replace(/var _pau_ui_title_x_offset\s*=\s*"%__INJECT_PAU_UI_TITLE_X_OFFSET__%";[\r\n]*/g,
                'var _pau_ui_title_x_offset= ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleXOffset; return isNaN(+v) ? 0 : +v; })() + ';\n')
            .replace(/var _pau_ui_title_y_offset\s*=\s*"%__INJECT_PAU_UI_TITLE_Y_OFFSET__%";[\r\n]*/g,
                'var _pau_ui_title_y_offset= ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleYOffset; return isNaN(+v) ? -30 : +v; })() + ';\n')
            .replace(/var _pau_ui_title_size\s*=\s*"%__INJECT_PAU_UI_TITLE_SIZE__%";[\r\n]*/g,
                'var _pau_ui_title_size    = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleSize; return isNaN(+v) ? 36 : +v; })() + ';\n')
            .replace(/var _pau_ui_title_color\s*=\s*"%__INJECT_PAU_UI_TITLE_COLOR__%";[\r\n]*/g,
                'var _pau_ui_title_color   = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleColor) || '#ffffff') + ';\n')
            .replace(/var _pau_ui_sub_x_offset\s*=\s*"%__INJECT_PAU_UI_SUB_X_OFFSET__%";[\r\n]*/g,
                'var _pau_ui_sub_x_offset  = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subXOffset; return isNaN(+v) ? 0 : +v; })() + ';\n')
            .replace(/var _pau_ui_sub_y_offset\s*=\s*"%__INJECT_PAU_UI_SUB_Y_OFFSET__%";[\r\n]*/g,
                'var _pau_ui_sub_y_offset  = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subYOffset; return isNaN(+v) ? 30 : +v; })() + ';\n')
            .replace(/var _pau_ui_sub_size\s*=\s*"%__INJECT_PAU_UI_SUB_SIZE__%";[\r\n]*/g,
                'var _pau_ui_sub_size      = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subSize; return isNaN(+v) ? 18 : +v; })() + ';\n')
            .replace(/var _pau_ui_sub_color\s*=\s*"%__INJECT_PAU_UI_SUB_COLOR__%";[\r\n]*/g,
                'var _pau_ui_sub_color     = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subColor) || '#888888') + ';\n')
            .replace(/var _pau_ui_title_outline_width\s*=\s*"%__INJECT_PAU_UI_TITLE_OUTLINE_WIDTH__%";[\r\n]*/g,
                'var _pau_ui_title_outline_width = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleOutlineWidth; return isNaN(+v) ? 0 : +v; })() + ';\n')
            .replace(/var _pau_ui_title_outline_color\s*=\s*"%__INJECT_PAU_UI_TITLE_OUTLINE_COLOR__%";[\r\n]*/g,
                'var _pau_ui_title_outline_color = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.titleOutlineColor) || 'rgba(0,0,0,0.5)') + ';\n')
            .replace(/var _pau_ui_sub_outline_width\s*=\s*"%__INJECT_PAU_UI_SUB_OUTLINE_WIDTH__%";[\r\n]*/g,
                'var _pau_ui_sub_outline_width = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subOutlineWidth; return isNaN(+v) ? 0 : +v; })() + ';\n')
            .replace(/var _pau_ui_sub_outline_color\s*=\s*"%__INJECT_PAU_UI_SUB_OUTLINE_COLOR__%";[\r\n]*/g,
                'var _pau_ui_sub_outline_color = ' + JSON.stringify((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.subOutlineColor) || 'rgba(0,0,0,0.5)') + ';\n')
            .replace(/var _pau_ui_video_loop\s*=\s*"%__INJECT_PAU_UI_VIDEO_LOOP__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_ui_video_loop    = ' + ((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.videoLoop !== false) ? 'true' : 'false') + ';\n')
            .replace(/var _pau_ui_video_volume\s*=\s*"%__INJECT_PAU_UI_VIDEO_VOLUME__%";[\r\n]*/g,
                'var _pau_ui_video_volume  = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.videoVolume; return isNaN(+v) ? 100 : +v; })() + ';\n')
            .replace(/var _pau_ui_bg_music\s*=\s*"%__INJECT_PAU_UI_BG_MUSIC__%";[\r\n]*/g,
                'var _pau_ui_bg_music      = ' + JSON.stringify(playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgMusic || '') + ';\n')
            .replace(/var _pau_ui_bg_music_volume\s*=\s*"%__INJECT_PAU_UI_BG_MUSIC_VOLUME__%";[\r\n]*/g,
                'var _pau_ui_bg_music_volume = ' + (function () { var v = playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgMusicVolume; return isNaN(+v) ? 80 : +v; })() + ';\n')
            .replace(/var _pau_ui_bg_music_loop\s*=\s*"%__INJECT_PAU_UI_BG_MUSIC_LOOP__%"\s*===\s*"true";[\r\n]*/g,
                'var _pau_ui_bg_music_loop = ' + ((playerUpdateOpts && playerUpdateOpts.ui && playerUpdateOpts.ui.bgMusicLoop !== false) ? 'true' : 'false') + ';\n')
            // [ADDITIONAL SETTINGS] Inject key-block and resize flags
            .replace(/var _block_resize\s*=\s*"%__INJECT_BLOCK_RESIZE__%"\s*===\s*"true";[\r\n]*/g,
                'var _block_resize = ' + ((playerUpdateOpts && playerUpdateOpts.blockResize) ? 'true' : 'false') + ';\n')
            .replace(/var _block_f2\s*=\s*"%__INJECT_BLOCK_F2__%"\s*===\s*"true";[\r\n]*/g,
                'var _block_f2 = ' + ((playerUpdateOpts && playerUpdateOpts.blockF2) ? 'true' : 'false') + ';\n')
            .replace(/var _block_f4\s*=\s*"%__INJECT_BLOCK_F4__%"\s*===\s*"true";[\r\n]*/g,
                'var _block_f4 = ' + ((playerUpdateOpts && playerUpdateOpts.blockF4) ? 'true' : 'false') + ';\n')
            .replace(/var _block_f5\s*=\s*"%__INJECT_BLOCK_F5__%"\s*===\s*"true";[\r\n]*/g,
                'var _block_f5 = ' + ((playerUpdateOpts && playerUpdateOpts.blockF5) ? 'true' : 'false') + ';\n')
            // [API] Inject plugin version into loader
            .replace(/var _SP_VERSION\s*=\s*"%__INJECT_SP_VERSION__%";[\r\n]*/g,
                'var _SP_VERSION = ' + JSON.stringify(PLUGIN_VERSION) + ';\n')
            // Replace variable names
            .replace(/_s_mask/g, varNames.mask)
            .replace(/_s_data/g, varNames.data)
            // ── Shard anchor replacement ──────────────────────────────────────────
            // Each anchor is replaced with its own subset of shards + dead code.
            // ANCHOR_C also gets the reassembly code so varNames.mask/.data are ready
            // before initResourceLoader() is called (which follows ANCHOR_C in the source).
            .replace(/\/\/ __SHARD_ANCHOR_A__/g, anchorAReplacement)
            .replace(/\/\/ __SHARD_ANCHOR_B__/g, anchorBReplacement)
            .replace(/\/\/ __SHARD_ANCHOR_C__/g, anchorCReplacement);

        // [FUNCTION NAME RANDOMIZATION] Replace function names
        for (var originalName in funcNames) {
            var newName = funcNames[originalName];
            // Replace function declarations: function getKey(
            var funcDeclRegex = new RegExp('function\\s+' + originalName + '\\s*\\(', 'g');
            transformedLoader = transformedLoader.replace(funcDeclRegex, 'function ' + newName + '(');
            // Replace function calls: getKey() or getKey(
            var funcCallRegex = new RegExp('([^a-zA-Z0-9_])' + originalName + '(\\s*\\()', 'g');
            transformedLoader = transformedLoader.replace(funcCallRegex, '$1' + newName + '$2');
            // Replace variable declarations: var getKey =
            var varDeclRegex = new RegExp('var\\s+' + originalName + '\\s*=', 'g');
            transformedLoader = transformedLoader.replace(varDeclRegex, 'var ' + newName + ' =');
            // Replace standalone variable references
            var varRefRegex = new RegExp('([^a-zA-Z0-9_])' + originalName + '([^a-zA-Z0-9_])', 'g');
            transformedLoader = transformedLoader.replace(varRefRegex, '$1' + newName + '$2');
        }

        // [LEGACY FALLBACK] If any anchor was not found in the template (e.g. source was
        // modified and markers were removed), fall back to the old single-preamble approach
        // so the Pack does not silently produce a broken output.
        var hasUnresolvedAnchors =
            transformedLoader.indexOf('__SHARD_ANCHOR_A__') !== -1 ||
            transformedLoader.indexOf('__SHARD_ANCHOR_B__') !== -1 ||
            transformedLoader.indexOf('__SHARD_ANCHOR_C__') !== -1;

        if (hasUnresolvedAnchors) {
            logWarn('SHARD_ANCHOR markers not found in loader template.');
            // Pack legacy preamble with all shards + reassembly
            var legacyPreamble = [
                '',
                '        // [Pack_UNIQUE_ID: ' + crypto.randomBytes(16).toString('hex') + ']'
            ];
            allShards.forEach(function (entry) {
                var code = 'var ' + entry.shard.name + ' = "' + entry.shard.value + '";';
                if (Math.random() < 0.3) code = wrapWithFakeCondition(code);
                legacyPreamble.push('        ' + code);
            });
            legacyPreamble.push('        ' + maskReassembly);
            legacyPreamble.push('        ' + dataReassembly);
            // Find polyfill insertion point
            var legacyInsertAfterLine = 5;
            var tLines = transformedLoader.split('\n');
            for (var li = 0; li < Math.min(50, tLines.length); li++) {
                if (tLines[li].indexOf('startsWith') !== -1) {
                    for (var lj = li; lj < Math.min(li + 10, tLines.length); lj++) {
                        if (tLines[lj].trim() === '}') { legacyInsertAfterLine = lj + 1; break; }
                    }
                    break;
                }
            }
            return tLines.slice(0, legacyInsertAfterLine).join('\n') +
                legacyPreamble.join('\n') +
                tLines.slice(legacyInsertAfterLine).join('\n');
        }

        return transformedLoader;
    }

    // Helper to reduce code duplication
    function getPluginLoaderScript(targetPluginsFile, masterKeyBuf, compiledPluginNames, failedPlugins, compiledBins, hashExeFiles, enableSecurityWatchdog, excludedBinaryHashes, playerUpdateOpts, v8FilesRegistry, earlyBlobResolve, prebuiltShardPlan) {
        compiledPluginNames = compiledPluginNames || [];
        failedPlugins = failedPlugins || [];
        compiledBins = compiledBins || {};
        hashExeFiles = !!hashExeFiles;
        v8FilesRegistry = v8FilesRegistry || Object.create(null);

        var script = "";
        var pluginsContent = fs.readFileSync(targetPluginsFile, 'utf8');
        var pluginsList = JSON.parse(pluginsContent.substring(pluginsContent.indexOf('['), pluginsContent.lastIndexOf(']') + 1).replace(/,\s*\]/g, ']'));

        // If a shard plan was pre-generated (cross-boundary scatter mode), reuse its
        // key material so mask/data shards stay consistent across the whole Pack.
        // Otherwise generate a fresh random split as before.
        var maskHex, dataHex;
        if (prebuiltShardPlan) {
            maskHex = prebuiltShardPlan.maskHex;
            dataHex = prebuiltShardPlan.dataHex;
        } else {
            var injectMask = crypto.randomBytes(32);
            var injectData = Buffer.alloc(32);
            for (var k = 0; k < 32; k++) {
                injectData[k] = masterKeyBuf[k] ^ injectMask[k];
            }
            maskHex = injectMask.toString('hex');
            dataHex = injectData.toString('hex');
        }

        var loaderCode = Loader.toString();
        loaderCode = loaderCode.slice(loaderCode.indexOf('{') + 1, loaderCode.lastIndexOf('}'));

        // [V8 SNAPSHOT REGISTRY INJECTION]
        // __SECU_V8_FILES__ is injected as the very first statement inside the
        // loader's IIFE closure — NOT on window — so it's accessible to all
        // hooks (HTMLScriptElement setter, XHR open, fetch) without being
        // visible or modifiable from the browser console.
        // Keys match normalizePath() output: lowercase, forward-slashes, no leading slash.
        var v8RegistryJson = JSON.stringify(v8FilesRegistry);
        loaderCode = "\n        var __SECU_V8_FILES__ = " + v8RegistryJson + ";\n" + loaderCode;

        var transformedCode = transformLoaderCode(loaderCode, maskHex, dataHex, hashExeFiles, enableSecurityWatchdog, excludedBinaryHashes, playerUpdateOpts, earlyBlobResolve, prebuiltShardPlan);
        script += transformedCode + "\n;\n";

        script += `
            (function() {
                try {
                    var _fs = require('fs');
                    var _path = require('path');
                    var _pp = _path.join(_path.dirname(process.mainModule.filename), 'js', 'plugins.js');
                    var _c = _fs.readFileSync(_pp, 'utf8');
                    (1, eval)(_c);
                } catch(e) { console.error('VFS plugins.js load failed:', e); }
            })();\n;
            var _secu_packed_plugins = ${JSON.stringify(compiledPluginNames.concat(failedPlugins))};

            (function() {
                if (typeof PluginManager === 'undefined' || typeof $plugins === 'undefined') return;

                PluginManager._secu_origLoadScript = PluginManager.loadScript;
                PluginManager.loadScript = function(n) {
                    var base = n.replace(/\\.js$/i, '');
                    var nObj = n.split('/').pop().replace(/\\.js$/i, '');
                    var isPacked = false;
                    _secu_packed_plugins.forEach(function(pName) {
                        var pBase = pName.split('/').pop().replace(/\\.js$/i, '');
                        if (pBase === nObj || pName === n) isPacked = true;
                    });
                    if (!isPacked) {
                        if (this._scripts.indexOf(base) === -1 && this._scripts.indexOf(n) === -1) {
                            this._scripts.push(n);
                            if (this._secu_origLoadScript) this._secu_origLoadScript.call(this, n);
                        }
                    }
                };

                if (typeof PluginManager.setup === 'function') {
                    PluginManager.setup($plugins);
                } else {
                    $plugins.forEach(function(p) {
                        var nName = ${isRPGMakerMZ() ? "p.name.split('/').pop()" : "p.name"};
                        if (PluginManager._scripts.indexOf(nName) === -1) {
                            PluginManager.setParameters(nName, p.parameters);
                            PluginManager._scripts.push(nName);
                        }
                    });
                }
            })();
            ;

            function _secu_compat_runHooks(list, fnKey, name) {
                if (typeof Fossil === 'undefined' || !Array.isArray(Fossil[list])) return;
                var _ran = 0;
                for (var _fi = 0; _fi < Fossil[list].length; _fi++) {
                    if (Fossil[list][_fi].pluginName === name) {
                        try {
                            var _src = Fossil[list][_fi][fnKey].toString();
                            _src = _src.substring(_src.indexOf('{')+1, _src.length-1);
                            (0,eval)(_src);
                            _ran++;
                        } catch(_fe) {
                        }
                    }
                }
            }

            function _secu_compat_versionSpoof(name, restore) {
                if (typeof Fossil === 'undefined') return;
                var _vsp = Fossil.versionSpoofPlugins;
                if (!_vsp || (_vsp.indexOf ? _vsp.indexOf(name) === -1 : !_vsp.includes(name))) return;
                try {
                    if (!restore) {
                        (0,eval)('Utils.RPGMAKER_VERSION=Utils.FAKE_VERSION');
                    } else {
                        (0,eval)('Utils.RPGMAKER_VERSION=Utils.MZ_VERSION');
                    }
                } catch(_ve) { }
            }

            var _secu_deferred_nodes = [];
            var _secu_orig_insertBefore = document.body.insertBefore;
            var _secu_orig_appendChild = document.body.appendChild;

            document.body.insertBefore = function(node, ref) {
                if (node.tagName && node.tagName.toLowerCase() === 'script' && node.defer && node.src && node.src.startsWith('data:')) {
                    var _isFossil = false;
                    try {
                        var _b64 = node.src.split(',')[1];
                        if (_b64 && atob(_b64).indexOf('Fossil') !== -1) _isFossil = true;
                    } catch(e) {}
                    if (_isFossil) {
                        _secu_deferred_nodes.push({method: 'insertBefore', parent: this, node: node, ref: ref});
                        return node;
                    }
                }
                return _secu_orig_insertBefore.apply(this, arguments);
            };

            document.body.appendChild = function(node) {
                if (node.tagName && node.tagName.toLowerCase() === 'script' && node.defer && node.src && node.src.startsWith('data:')) {
                    var _isFossil = false;
                    try {
                        var _b64 = node.src.split(',')[1];
                        if (_b64 && atob(_b64).indexOf('Fossil') !== -1) _isFossil = true;
                    } catch(e) {}
                    if (_isFossil) {
                        _secu_deferred_nodes.push({method: 'appendChild', parent: this, node: node, ref: null});
                        return node;
                    }
                }
                return _secu_orig_appendChild.apply(this, arguments);
            };
            ;
            var _secu_chain = [];
        `;

        var loadedPlugins = {};
        loadedPlugins[PLUGIN_NAME] = true;

        pluginsList.forEach(function (p) {
            if (!p.status) return;

            if (loadedPlugins[p.name]) return;
            loadedPlugins[p.name] = true;

            if (p.name === PLUGIN_NAME) {
                return; // Already executed in STEP 1 above — skip.

            } else if (compiledPluginNames.indexOf(p.name) !== -1) {
                // ── V8 compiled plugin ─────────────────────────────────────────
                // [ASYNC + MEMORY-SAFE + SECURE] Runtime-random window-slot pattern.
                //
                //   Buffer is decoded lazily (when the chain reaches this entry),
                //   not upfront — lower peak memory during the sequential load phase.
                //   All other security properties are unchanged from the old approach:
                //   slot wiped before evalNWBin, try-finally null, Blob stub is opaque.
                //
                // Note: the content exposed (compiled V8 bytecode) cannot be decompiled
                // to recover source code, so even if briefly visible it yields nothing.
                var pluginNameJson = JSON.stringify(p.name);
                var compiledBin = compiledBins[p.name];
                var hexStr = compiledBin.toString('hex');
                var shimSrc = JSON.stringify("js/plugins/" + p.name + ".js");

                // Tiny blob stub: reads the pre-decoded Buffer from a runtime-random window slot.
                // try-finally guarantees slot wipe + currentScript reset + Buffer null
                // even when evalNWBin throws (corrupted bytecode, version mismatch, etc.).
                // Slot is wiped BEFORE evalNWBin runs so only _b holds the Buffer ref.
                // __SLOT__ is replaced at runtime by .replace() in the chain entry.
                var v8BlobStubTemplate = JSON.stringify(`
                    try{
                        var _b=window[__SLOT__];
                        window[__SLOT__]=null;delete window[__SLOT__];
                        try{
                            try{
                                var _fse=document.createElement("script");
                                _fse.setAttribute("src",${shimSrc});
                                Object.defineProperty(document,"currentScript",{value:_fse,configurable:true,writable:true});
                                _fse=null;
                            }catch(_se){console.warn("currentScript shim failed for ${p.name}",_se);}
                            if(_b){(typeof global!=="undefined"&&global.nw?global.nw:require("nw.gui")).Window.get(window).evalNWBin(window.frameElement||null,_b);}
                        }finally{
                            try{Object.defineProperty(document,"currentScript",{value:null,configurable:true,writable:true});}catch(_se){}
                            _b=null;
                        }
                    }catch(e) {console.error('evalNWBin failed for plugin:',${pluginNameJson},e);}`
                );

                // Push a chain entry: function(_next) { … appendChild; onload->_next() }
                script += `
                    _secu_chain.push(function(_next) {
                        var _sn;
                        _secu_compat_versionSpoof(${pluginNameJson}, false);
                        _secu_compat_runHooks('preList', 'preFunction', ${pluginNameJson});
                        try {
                            _sn = '_sp_' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
                            var _buf = Buffer.from(${JSON.stringify(hexStr)}, 'hex');
                            var _stubSrc = ${v8BlobStubTemplate}.replace(/__SLOT__/g, JSON.stringify(_sn));
                            window[_sn] = _buf; _buf = null;
                            var _blob = new Blob([_stubSrc], {type:'text/javascript'});
                            var _url = URL.createObjectURL(_blob);
                            var _el = document.createElement('script');
                            _el.type = 'text/javascript';
                            _el.async = false;
                            _el.src = _url;
                            _el.onload = function() { URL.revokeObjectURL(_url); _secu_compat_runHooks('postList','postFunction',${pluginNameJson}); _secu_compat_versionSpoof(${pluginNameJson},true); _next(); };
                            _el.onerror = function() { URL.revokeObjectURL(_url); _secu_compat_versionSpoof(${pluginNameJson},true); console.error('V8 plugin onerror: ${p.name}'); _next(); };
                            document.body.appendChild(_el);
                        } catch(e) {
                            if (_sn && window[_sn]) { window[_sn] = null; delete window[_sn]; }
                            console.error('V8 plugin blob setup failed:', ${pluginNameJson}, e);
                            _next();
                        }
                    });
                    `;

            } else {
                // ── VFS plugin (nwjc-incompatible, stored as encrypted .js) ───────
                var pluginNameJson = JSON.stringify(p.name);
                var shimSrc = JSON.stringify("js/plugins/" + p.name + ".js");
                var vfsSsContent = `
                    try{
                        var _fse=document.createElement("script");
                        _fse.setAttribute("src",${shimSrc});
                        Object.defineProperty(document,"currentScript",{value:_fse,configurable:true,writable:true});
                        _fse=null;
                    }catch(e) {console.warn('VFS currentScript shim failed for ${p.name}',e);}`;

                var vfsSrContent = 'try{Object.defineProperty(document,"currentScript",{value:null,configurable:true,writable:true});}catch(e){}';

                // Blob stub code (built at Pack time, slot name substituted at runtime).
                // Shim strings are embedded via JSON.stringify so they survive the outer
                // JSON.stringify() wrapping that stores stubCode as a snapshot string constant.
                // "\\n" here becomes "\n" in the snapshot string -> newline in stub execution.
                var vfsStubCode = `
                    try{
                        var _s=__SLOT__;
                        var _c=window[_s];
                        window[_s]=null;delete window[_s];
                        if(_c){
                            var _e=document.createElement("script");
                            _e.type="text/javascript";
                            _e.textContent=${JSON.stringify(vfsSsContent)}+"\\n"+_c+"\\n"+${JSON.stringify(vfsSrContent)};
                            _c=null;
                            document.body.appendChild(_e);
                            _e.textContent="";
                        }
                    }catch(e) {console.error('VFS plugin load failed:',${pluginNameJson},e);}
                `;

                // Wrap entire stub as a JSON string constant so it lives in the snapshot
                // as an opaque string. __SLOT__ is replaced at runtime via .replace().
                var vfsBlobStubTemplate = JSON.stringify(vfsStubCode);

                // Push a chain entry: function(_next) { readFileSync -> appendChild; onload->_next() }
                // [COMPAT: MAIN.JS SUPPRESSORS] Run preFix before load, postFix in onload.
                script += `
                _secu_chain.push(function(_next) {
                    var _sn;
                    _secu_compat_versionSpoof(${pluginNameJson}, false);
                    _secu_compat_runHooks('preList', 'preFunction', ${pluginNameJson});
                    try {
                        var _fs = require('fs');
                        var _path = require('path');
                        var _pp = _path.join(_path.dirname(process.mainModule.filename), 'js', 'plugins', ${pluginNameJson} + '.js');
                        var _code = _fs.readFileSync(_pp, 'utf8');
                        _sn = '_sp_' + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
                        var _stubSrc = ${vfsBlobStubTemplate}.replace(/__SLOT__/g, JSON.stringify(_sn));
                        window[_sn] = _code; _code = null;
                        var _blob = new Blob([_stubSrc], {type:'text/javascript'});
                        var _url = URL.createObjectURL(_blob);
                        var _el = document.createElement('script');
                        _el.type = 'text/javascript';
                        _el.async = false;
                        _el.src = _url;
                        _el.onload = function() { URL.revokeObjectURL(_url); _secu_compat_runHooks('postList','postFunction',${pluginNameJson}); _secu_compat_versionSpoof(${pluginNameJson},true); _next(); };
                        _el.onerror = function() { URL.revokeObjectURL(_url); _secu_compat_versionSpoof(${pluginNameJson},true); console.error('VFS plugin onerror: ${p.name}'); _next(); };
                        document.body.appendChild(_el);
                    } catch(e) {
                        if (_sn && window[_sn]) { window[_sn] = null; delete window[_sn]; }
                        console.error('VFS plugin setup failed:', ${pluginNameJson}, e);
                        _next();
                    }
                });
                `;
            }
        });

        // ── Chain runner ────────────────────────────────────────────────────────
        // Kick off plugin[0] synchronously during evalNWBin.
        // Each subsequent plugin is triggered from the previous plugin's onload,
        // so every plugin gets its own event-loop turn — RAF, microtasks, and
        // layout/paint can all proceed between consecutive plugin executions.
        script += `
            (function _secu_run(i) {
                if (i >= _secu_chain.length) {
                    document.body.insertBefore = _secu_orig_insertBefore;
                    document.body.appendChild = _secu_orig_appendChild;
                    _secu_deferred_nodes.forEach(function(item) {
                        if (item.method === 'insertBefore') item.parent.insertBefore(item.node, item.ref);
                        else item.parent.appendChild(item.node);
                    });
                    return;
                }
                _secu_chain[i](function() { _secu_run(i + 1); });
            })(0);`;

        return script;
    }

    function readDirRecursive(dir, fileList, rootPath, protectedJsFiles, runtimeWriteMap) {
        var files = fs.readdirSync(dir);
        files.forEach(function (file) {
            var fullPath = path.join(dir, file);
            var stat = fs.lstatSync(fullPath);
            if (stat.isSymbolicLink()) return; // never follow symlinks during pack
            var relativePath = path.relative(rootPath, fullPath).replace(/\\/g, '/');
            if (relativePath.normalize) relativePath = relativePath.normalize('NFC');

            if (stat.isDirectory()) {
                var isSkippedDir = false;
                for (var j = 0; j < SKIP_DIRS.length; j++) {
                    var skipTarget = SKIP_DIRS[j].replace(/\\/g, '/');
                    if (relativePath === skipTarget) {
                        isSkippedDir = true;
                        break;
                    }
                    // Root-level dirname match (backward compatibility for just 'save' ignoring subdirs)
                    if (file === skipTarget && relativePath === file) {
                        isSkippedDir = true;
                        break;
                    }
                }
                if (!isSkippedDir) {
                    readDirRecursive(fullPath, fileList, rootPath, protectedJsFiles, runtimeWriteMap);
                }
            } else {
                if (isNativeBinaryFile(file)) {
                    return; // Skip this file - don't add to VFS
                }
                // [NW.JS RUNTIME] .pak/.dat are NW.js/Chromium resource files that must stay on disk.
                // NW.js 0.94+ closes their file handles after loading, so they are no longer EBUSY-
                // protected during cleanup. Packing them into VFS is also meaningless since NW.js
                // reads them directly from disk, not through the game's VFS layer.
                if (isNwjsRuntimeFile(file)) {
                    return; // Skip this file - don't add to VFS
                }

                var isSkippedFile = false;
                for (var k = 0; k < SKIP_FILES.length; k++) {
                    var skipFileTarget = SKIP_FILES[k].replace(/\\/g, '/');
                    if (relativePath === skipFileTarget) {
                        isSkippedFile = true;
                        break;
                    }
                    if (file === skipFileTarget && relativePath === file) {
                        isSkippedFile = true;
                        break;
                    }
                    // Also support generic basename matching for Thumbs.db across all folders (backward compat for system files)
                    if (file === skipFileTarget && (skipFileTarget === 'Thumbs.db' || skipFileTarget === '.DS_Store')) {
                        isSkippedFile = true;
                        break;
                    }
                }

                // [RUNTIME WRITE TRACKING] Skip files recorded as written at runtime
                if (!isSkippedFile && runtimeWriteMap && runtimeWriteMap[relativePath.toLowerCase()]) {
                    logInfo('Keeping on disk (runtime write): ' + relativePath);
                    isSkippedFile = true;
                }

                if (!isSkippedFile && file.indexOf('.bin') === -1 && file.indexOf('.res') === -1 && file.indexOf('.log') === -1) {
                    var isProtectedJs = false;
                    if (path.extname(file).toLowerCase() === '.js' && protectedJsFiles) {
                        var normalizedPath = fullPath.replace(/\\/g, '/').toLowerCase();
                        if (protectedJsFiles.indexOf(normalizedPath) !== -1) {
                            isProtectedJs = true;
                        }
                    }

                    if (!isProtectedJs) {
                        fileList.push({ full: fullPath, relative: relativePath });
                    }
                }
            }
        });
    }

    function modifyIndexHtml(projectPath, binName) {
        if (!binName) binName = 'game.bin';
        var htmlPath = path.join(projectPath, 'index.html');
        if (!fs.existsSync(htmlPath)) return;
        var html = fs.readFileSync(htmlPath, 'utf8');

        // [MZ COMPATIBILITY] Clean up CSS links
        html = html.replace(/<link[^>]*href=["']fonts\/gamefont\.css["'][^>]*>/gi, '')
            .replace(/<link[^>]*href=["']icon\/icon\.png["'][^>]*>/gi, '')
            .replace(/<link[^>]*href=["']css\/game\.css["'][^>]*>/gi, ''); // MZ uses game.css

        html = html.replace(/<script[^>]*src=["'](?!cordova\.js)[^"']*["'][^>]*><\/script>/gi, '');

        var escapedBinName = binName.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

        // Minified runtime loader — reads V8 snapshot size from footer, allocates exact buffer.
        // _s = file size, _ft = footer buffer (16 bytes), _v = v8 snapshot size (uint64 LE)
        // Read ResourceStartOffset as uint64 LE (low 32 + high 32 * 2^32)
        // This equals the V8 snapshot byte count, which is all evalNWBin should receive.
        var inlineLoader = `<script>try{\
var _f=require("fs"),_pt=require("path");\
process.env.__BIN_NAME__="${escapedBinName}";\
var _d=_f.openSync(_pt.join(_pt.dirname(process.mainModule.filename),process.env.__BIN_NAME__),"r");\
var _s=_f.fstatSync(_d).size;\
var _ft=Buffer.alloc(16);_f.readSync(_d,_ft,0,16,_s-16);\
var _v=_ft.readUInt32LE(0)+_ft.readUInt32LE(4)*4294967296;\
var _b=Buffer.allocUnsafe(_v);\
_f.readSync(_d,_b,0,_v,0);\
_f.closeSync(_d);\
(global.nw||require("nw.gui")).Window.get(window).evalNWBin(window.frameElement||null,_b);\
_b=null;\
}catch(e){alert(e);}</script>`;
        html = html.replace('</body>', inlineLoader + '\n</body>').replace(/^\s*[\r\n]/gm, '');
        stripHiddenAttr(htmlPath);
        fs.writeFileSync(htmlPath, html, 'utf8');
        return html; // [HTML HASH] Return modified content for env-hash computation
    }

    // =========================================================================
    // [LICENSE NOTICE] Extract leading comment blocks from a JS file source.
    // Returns only the consecutive comment lines/blocks at the very start of
    // the file (before any real code). Both // and /* */ styles are handled.
    // =========================================================================
    function extractLeadingLicenseComments(content) {
        content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        var pos = 0;
        var len = content.length;
        var parts = [];

        function skipWs() {
            while (pos < len &&
                (content[pos] === ' ' || content[pos] === '\t' || content[pos] === '\n')) {
                pos++;
            }
        }

        skipWs();
        while (pos < len) {
            // Single-line comment
            if (content[pos] === '/' && content[pos + 1] === '/') {
                var s = pos;
                while (pos < len && content[pos] !== '\n') pos++;
                parts.push(content.slice(s, pos));
                skipWs();
                continue;
            }
            // Multi-line comment (/* */ and /*! */)
            if (content[pos] === '/' && content[pos + 1] === '*') {
                var s = pos;
                pos += 2;
                while (pos < len && !(content[pos] === '*' && content[pos + 1] === '/')) pos++;
                pos += 2; // step past */
                parts.push(content.slice(s, pos));
                skipWs();
                continue;
            }
            break; // non-comment token reached
        }
        return parts.join('\n');
    }

    // =========================================================================
    // [LICENSE NOTICE] Scans every .js file in js/libs, extracts its leading
    // comment block, and keeps it only when the block mentions a license or
    // copyright. Returns a formatted multi-section string, or null if nothing
    // was found. Must be called BEFORE performAggressiveCleanup removes js/.
    // =========================================================================
    function collectLibLicenses(libsDir) {
        var LICENSE_RE = /license|copyright|\bmit\b|\bbsd\b|apache|\bzlib\b|\bgpl\b|\bmpl\b|opensource\.org/i;
        var entries = [];
        try {
            if (!fs.existsSync(libsDir)) return null;
            var files = fs.readdirSync(libsDir)
                .filter(function (f) { return /\.js$/i.test(f); })
                .sort();
            files.forEach(function (filename) {
                var filePath = path.join(libsDir, filename);
                try {
                    var content = fs.readFileSync(filePath, 'utf8');
                    var header = extractLeadingLicenseComments(content);
                    if (header && LICENSE_RE.test(header)) {
                        entries.push({ file: filename, header: header.trim() });
                    }
                } catch (e) { /* skip unreadable files */ }
            });
        } catch (e) { return null; }

        if (entries.length === 0) return null;

        var out = [];
        entries.forEach(function (entry) {
            out.push('------------------------------------------------------------------------');
            out.push('File: js/libs/' + entry.file);
            out.push('------------------------------------------------------------------------');
            out.push(entry.header);
            out.push('');
        });
        return out.join('\n');
    }

    // =========================================================================
    // [LICENSE NOTICE] Strips JS comment syntax from a raw comment block so
    // that only the plain license text remains.
    //
    // Handles all three forms produced by extractLeadingLicenseComments():
    //   /* ... */  /*! ... */  — removes delimiters and leading " * " per line
    //   // ...                 — removes the "//" prefix per line
    //
    // Multiple comment blocks separated by blank lines are processed in one
    // pass; blank lines between blocks are preserved.
    // =========================================================================
    function stripCommentMarkers(text) {
        // Block comments: /* ... */ and /*! ... */
        text = text.replace(/\/\*!?([\s\S]*?)\*\//g, function (_, inner) {
            var lines = inner.split('\n');

            // Remove " * " / " *" style prefix (all whitespace after the asterisk,
            // not just one character, to handle "  *  text" patterns).
            lines = lines.map(function (line) {
                return line.replace(/^[ \t]*\*[ \t]*/, '');
            });

            // Dedent: find the minimum leading-whitespace width among non-empty
            // lines, then strip that many characters from every line.
            // This handles comments that indent their content without using " * "
            // prefixes (e.g. the localForage style).
            var minIndent = Infinity;
            lines.forEach(function (line) {
                if (line.trim().length > 0) {
                    var indent = line.match(/^([ \t]*)/)[1].length;
                    if (indent < minIndent) minIndent = indent;
                }
            });
            if (!isFinite(minIndent)) minIndent = 0;

            if (minIndent > 0) {
                lines = lines.map(function (line) { return line.slice(minIndent); });
            }

            return lines.join('\n');
        });

        // Single-line comments: optional indentation + "//" + optional space
        text = text.replace(/^[ \t]*\/\/[ \t]?/gm, '');

        return text.trim();
    }

    // =========================================================================
    // [LICENSE NOTICE] Converts the plain-text output of collectLibLicenses()
    // into a sequence of <div class="product"> blocks matching the format used
    // by the NW.js credits.html file.
    //
    // Input format (from collectLibLicenses):
    //   SEP\nFile: js/libs/xxx.js\nSEP\n<comment block>\n\n  (repeated)
    //
    // Output: raw HTML string ready to be injected into credits.html,
    //         or null when no entries were found.
    // =========================================================================
    function convertLicensesToHtml(licensesText) {
        if (!licensesText) return null;

        var SEP = '------------------------------------------------------------------------';
        var html = '';
        var idCounter = 9000; // High IDs to avoid collision with existing credits.html entries

        // Split on the separator line. The resulting array has the shape:
        //   [0] empty  [1] '\nFile: js/libs/a.js\n'  [2] '\ncontent\n\n'
        //   [3] '\nFile: js/libs/b.js\n'  [4] '\ncontent\n'  ...
        var parts = licensesText.split(SEP);

        for (var i = 1; i + 1 < parts.length; i += 2) {
            var filenamePart = parts[i].replace(/^\n|\n$/g, '').trim();
            var contentPart = parts[i + 1].replace(/^\n/, '').replace(/\n+$/, '');

            if (filenamePart.indexOf('File: js/libs/') !== 0) continue;

            var filename = filenamePart.slice('File: js/libs/'.length).trim();
            if (!filename) continue;

            // Strip comment markers, then HTML-escape for safe embedding inside <pre>
            var plain = stripCommentMarkers(contentPart);
            var escaped = plain
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            html += `
<div class="product">
    <span class="title">${filename}</span>
    <input type="checkbox" hidden id="${idCounter}">
    <label class="show" for="${idCounter}" tabindex="0"></label>
    <div class="licence">
        <pre>${escaped}</pre>
    </div>
</div>
`;
            idCounter++;
        }

        return html || null;
    }

    // =========================================================================
    // [LICENSE NOTICE] Appends HTML product-entry blocks to credits.html.
    // Finds the last line that contains only "</div>" and inserts the new
    // content immediately before it, so the entries land inside the outermost
    // container div rather than after it.
    // Falls back to appending at the end of the file if no such line exists.
    // =========================================================================
    function appendLicensesToCreditsHtml(creditsPath, htmlToAppend) {
        if (!htmlToAppend) return;
        try {
            var existing = '';
            try {
                if (fs.existsSync(creditsPath)) {
                    existing = fs.readFileSync(creditsPath, 'utf8');
                }
            } catch (e) { logWarn('appendLicenses:read', e); }

            var lines = existing.split('\n');
            var insertIdx = -1;
            for (var i = lines.length - 1; i >= 0; i--) {
                if (lines[i].trim() === '</div>') {
                    insertIdx = i;
                    break;
                }
            }

            var newContent;
            if (insertIdx !== -1) {
                lines.splice(insertIdx, 0, htmlToAppend);
                newContent = lines.join('\n');
            } else {
                newContent = existing + (existing.length ? '\n' : '') + htmlToAppend;
            }

            fs.writeFileSync(creditsPath, newContent, 'utf8');
            logInfo('License entries appended to credits.html.');
        } catch (e) {
            logWarn('appendLicensesToCreditsHtml', e);
        }
    }

    function performAggressiveCleanup(projectPath, tempFiles, hashExeFiles, binName, runtimeWriteRelPaths, resourceBasePath, stripReadOnly, splitBinNames) {
        if (!binName) binName = 'game.bin';
        if (!resourceBasePath) resourceBasePath = projectPath;
        runtimeWriteRelPaths = runtimeWriteRelPaths || [];
        splitBinNames = splitBinNames || [];
        performRecursiveDelete(tempFiles, stripReadOnly);
        var jsPath = path.join(projectPath, 'js');

        // [NATIVE BINARY PRESERVATION] Helper to recursively find files that must stay on disk
        // .node/.dll = native binaries (JS modules are now bundled via smart wrapper)
        // When hashExeFiles is true, .exe files are also preserved (they are part of envHash)
        // All errors (EBUSY, locked files, etc.) are silently ignored
        function findNativeBinaries(dir, relativeTo) {
            var results = [];
            try {
                if (!fs.existsSync(dir)) return results;
                var files;
                try { files = fs.readdirSync(dir); } catch (e) { return results; }

                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    try {
                        var fullPath = path.join(dir, file);
                        var relPath = path.relative(relativeTo, fullPath);
                        var lower = file.toLowerCase();
                        var stat;

                        try { stat = fs.lstatSync(fullPath); } catch (e) { continue; }
                        if (stat.isSymbolicLink()) continue; // never follow symlinks

                        if (stat.isDirectory()) {
                            try {
                                var subResults = findNativeBinaries(fullPath, relativeTo);
                                results = results.concat(subResults);
                            } catch (e) { /* ignore */ }
                        } else if (isNativeBinaryFile(file) ||
                            (hashExeFiles && lower.endsWith('.exe'))) {
                            // .node/.dll always preserved; .exe preserved only when hashExeFiles
                            // Note: running .exe files are EBUSY on Windows — we skip readFileSync
                            // for them and rely on the OS not deleting in-use executables.
                            // We still push them so the path is re-created if needed.
                            try {
                                results.push({ rel: relPath, data: fs.readFileSync(fullPath) });
                            } catch (e) {
                                // EBUSY (running .exe) — push with null data, skip write
                                results.push({ rel: relPath, data: null });
                            }
                        }
                    } catch (e) { /* ignore any error for this file */ }
                }
            } catch (e) { /* ignore all errors */ }
            return results;
        }

        // Save all .node and .dll files from project (recursively)
        var savedNativeBinaries = findNativeBinaries(projectPath, projectPath);

        var savedRwFiles = [];
        var canonicalProject = path.resolve(projectPath) + path.sep;
        if (runtimeWriteRelPaths && runtimeWriteRelPaths.length > 0) {
            runtimeWriteRelPaths.forEach(function (relPath) {
                try {
                    var absPath = path.join(resourceBasePath, relPath.replace(/\//g, path.sep));
                    if (fs.existsSync(absPath)) {
                        try { savedRwFiles.push({ rel: relPath, data: fs.readFileSync(absPath) }); } catch (e) { }
                    }
                } catch (e) { }
            });
        }

        // Delete js folder
        if (fs.existsSync(jsPath)) performRecursiveDelete([jsPath], stripReadOnly);

        // Delete other root folders (except protected ones) AND non-essential root files
        // Root files like _index.json, stray .js files etc. are already in VFS/V8 bundle
        var PROTECTED_ROOT_FILES = ['index.html', 'credits.html', 'package.json', 'steam_appid.txt', binName];
        // [SPLIT] Protect each split bin file from deletion after Pack
        splitBinNames.forEach(function (n) {
            if (n && PROTECTED_ROOT_FILES.indexOf(n) === -1) PROTECTED_ROOT_FILES.push(n);
        });
        try {
            fs.readdirSync(projectPath).forEach(function (item) {
                var fullPath = path.join(projectPath, item);
                try {
                    var stat = fs.statSync(fullPath);
                    if (stat.isDirectory() && PROTECTED_DIRS.indexOf(item) === -1) {
                        try { performRecursiveDelete([fullPath], stripReadOnly); } catch (e) { /* ignore EBUSY */ }
                    } else if (stat.isFile()) {
                        // Keep only essential root files and native binaries.
                        // Also keep NW.js runtime files (.pak/.dat): NW.js 0.94+ (Chromium 120+)
                        // closes their handles after loading so they are no longer EBUSY-protected.
                        if (PROTECTED_ROOT_FILES.indexOf(item) === -1 && !isNativeBinaryFile(item) && !isNwjsRuntimeFile(item)) {
                            try { fs.unlinkSync(fullPath); } catch (e) { /* ignore EBUSY */ }
                        }
                    }
                } catch (e) { logWarn('cleanupDir', e); }
            });
        } catch (e) { logWarn('cleanupRoot', e); }

        // Restore all .node, .dll (and .exe when hashExeFiles) files
        var canonicalProject = path.resolve(projectPath) + path.sep;
        savedNativeBinaries.forEach(function (file) {
            if (!file.data) return; // null = EBUSY (running .exe) — already on disk, skip
            try {
                var targetPath = path.resolve(projectPath, file.rel);
                if (targetPath.indexOf(canonicalProject) !== 0) {
                    logWarn('Skipped out-of-bounds restore path:', file.rel);
                    return;
                }
                var targetDir = path.dirname(targetPath);
                // Create directory structure recursively (Node.js 10.12+ supports recursive)
                try {
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir, { recursive: true });
                    }
                } catch (e) {
                    // Fallback: create directories one by one
                    var parts = file.rel.split(/[\\/]/);
                    parts.pop(); // remove filename
                    var current = projectPath;
                    for (var i = 0; i < parts.length; i++) {
                        current = path.join(current, parts[i]);
                        if (!fs.existsSync(current)) {
                            try { fs.mkdirSync(current); } catch (e) { }
                        }
                    }
                }
                fs.writeFileSync(targetPath, file.data);
            } catch (e) { /* ignore restore errors */ }
        });

        // [RUNTIME WRITE TRACKING] Restore runtime-write files after cleanup
        if (savedRwFiles.length > 0) {
            savedRwFiles.forEach(function (file) {
                try {
                    var targetPath = path.resolve(projectPath, file.rel.replace(/\//g, path.sep));
                    if (targetPath.indexOf(canonicalProject) !== 0) return; // security check
                    var targetDir = path.dirname(targetPath);
                    try {
                        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
                    } catch (e) {
                        var parts = file.rel.split('/'); parts.pop();
                        var cur = projectPath;
                        parts.forEach(function (p) { cur = path.join(cur, p); try { if (!fs.existsSync(cur)) fs.mkdirSync(cur); } catch (e2) { } });
                    }
                    fs.writeFileSync(targetPath, file.data);
                } catch (e) { }
            });
        }

        // Cleanup temp files
        var cleanupList = ['v8.log', 'debug_console(Pack).txt'];
        if (!isRPGMakerMZ()) { // MZ needs package.json
            if (!fs.existsSync(path.join(projectPath, 'nw.dll'))) {
                cleanupList.push('package.json');
            }
        }
        cleanupList.forEach(function (f) {
            var p = path.join(projectPath, f);
            if (fs.existsSync(p)) fs.unlinkSync(p);
        });

        // [RUNTIME WRITE TRACKING] Delete the log file (hidden on Windows — unlinkSync handles hidden files)
        if (resourceBasePath) {
            var _rwLogClean = path.join(resourceBasePath, 'data', 'SecuPacker_RuntimeWrites.txt');
            try { if (fs.existsSync(_rwLogClean)) fs.unlinkSync(_rwLogClean); } catch (e) { }
        }
    }

    // ===========================================================================
    // [PUBLIC API] SecuPacker External API
    //   Exposes plugin version and packed-status as JS functions and plugin commands.
    //
    //   JS API (window.SecuPacker):
    //     .getVersion()     {function} Returns the plugin version string.
    //     .isPacked()       {function} Returns false in Packer/editor mode,
    //                                  true in Loader/packed-game mode.
    //
    //   Plugin Commands (MV):
    //     SecuPacker GetVersion <variableId>
    //     SecuPacker IsPacked   <variableId>
    //
    //   Plugin Commands (MZ):  GetVersion / IsPacked  (see @command annotations above)
    // ===========================================================================
    (function () {
        if (typeof window === 'undefined') return;

        // Initialise namespace. If the Loader already ran (packed game), preserve its values.
        window.SecuPacker = window.SecuPacker || {};

        if (!window.SecuPacker.getVersion) window.SecuPacker.getVersion = function () { return PLUGIN_VERSION; };
        // isPacked: only set to false when Loader hasn't set it yet (i.e., dev/editor mode).
        if (!window.SecuPacker.isPacked) window.SecuPacker.isPacked = function () { return false; };

        // isPlayerAutoUpdateReady (Packer / dev mode):
        //   Reads plugin parameters at call time.
        //   In packed mode the Loader sets the same function, so the guard
        //   below prevents the Packer from clobbering it unnecessarily.
        if (!window.SecuPacker.isPlayerAutoUpdateReady) {
            window.SecuPacker.isPlayerAutoUpdateReady = function () {
                var _params;
                try {
                    _params = (typeof PluginManager !== 'undefined')
                        ? PluginManager.parameters(PLUGIN_NAME) : null;
                } catch (e) { return false; }
                if (!_params) return false;
                var enabled = (_params['Player Auto Update'] || 'false') === 'true';
                var url = (_params['Player Auto Update URL'] || '').trim();
                return enabled && url.length > 0;
            };
        }

        // isSplitAvailable (Packer / dev mode):
        //   Resolves split rules from plugin parameters, walks the project filesystem,
        //   and checks that every source file matched by the given split bin's patterns
        //   physically exists on disk.  Returns false if the bin is not configured as a
        //   split, if no files match its patterns, or if any matched file is missing.
        if (!window.SecuPacker.isSplitAvailable) {
            window.SecuPacker.isSplitAvailable = function (binName) {
                if (!binName) return false;
                binName = String(binName);

                // Requires NW.js filesystem access
                if (typeof fs === 'undefined' || !fs ||
                    typeof path === 'undefined' || !path) return false;

                var _params, _projectPath;
                try {
                    _params = (typeof PluginManager !== 'undefined')
                        ? PluginManager.parameters(PLUGIN_NAME) : null;
                    _projectPath = path.dirname(process.mainModule.filename);
                } catch (e) { return false; }
                if (!_params) return false;

                // File Split must be enabled
                if (_params['File Split'] === 'false') return false;

                // Parse split rules (mirrors startPackProcess logic)
                var _rules = [];
                try {
                    var _splitsStr = _params['File Split List'];
                    if (!_splitsStr) return false;
                    JSON.parse(_splitsStr).forEach(function (s) {
                        try {
                            var o = (typeof s === 'string') ? JSON.parse(s) : s;
                            var bName = path.basename((o['Split Bin File'] || '').trim());
                            if (!bName) return;
                            var pats = [];
                            try {
                                JSON.parse(o['Split Path Patterns']).forEach(function (p) {
                                    var pat;
                                    if (typeof p === 'object' && p !== null) {
                                        pat = String(p.name || '');
                                    } else {
                                        try {
                                            var inner = JSON.parse(p);
                                            pat = String(inner && inner.name ? inner.name : inner);
                                        } catch (e2) { pat = String(p); }
                                    }
                                    pat = pat.trim().replace(/\\/g, '/').replace(/\/+$/, '');
                                    if (pat) pats.push(pat);
                                });
                            } catch (e2) { }
                            if (pats.length > 0) _rules.push({ binName: bName, patterns: pats });
                        } catch (e2) { }
                    });
                } catch (e) { return false; }

                // Find the target split rule
                var _targetRule = null;
                for (var _ri = 0; _ri < _rules.length; _ri++) {
                    if (_rules[_ri].binName.toLowerCase() === binName.toLowerCase()) {
                        _targetRule = _rules[_ri];
                        break;
                    }
                }
                if (!_targetRule) return false; // binName not configured as a split

                // Enumerate project files and filter to those belonging to this split
                var _fileList = [];
                try {
                    readDirRecursive(_projectPath, _fileList, _projectPath, [], {});
                } catch (e) { return false; }
                if (_fileList.length === 0) return false;

                var _tempRules = [_targetRule];
                var _matched = [];
                for (var _fi = 0; _fi < _fileList.length; _fi++) {
                    var _rel = _fileList[_fi].relative.replace(/\\/g, '/').toLowerCase();
                    if (matchSplitIndex(_rel, _tempRules) === 0) {
                        _matched.push(_fileList[_fi].full);
                    }
                }

                if (_matched.length === 0) return false; // no files routed to this split

                // Verify each matched source file still exists on disk
                for (var _mfi = 0; _mfi < _matched.length; _mfi++) {
                    try {
                        if (!fs.existsSync(_matched[_mfi])) return false;
                    } catch (e) { return false; }
                }

                return true;
            };
        }

        // ── MZ Plugin Commands ────────────────────────────────────────────────
        if (typeof PluginManager !== 'undefined' && typeof PluginManager.registerCommand === 'function') {
            PluginManager.registerCommand(PLUGIN_NAME, 'GetVersion', function (args) {
                var varId = Number(args.variableId) || 0;
                if (varId > 0 && typeof $gameVariables !== 'undefined') {
                    $gameVariables.setValue(varId, window.SecuPacker.getVersion());
                }
            });

            PluginManager.registerCommand(PLUGIN_NAME, 'IsPacked', function (args) {
                var varId = Number(args.variableId) || 0;
                if (varId > 0 && typeof $gameVariables !== 'undefined') {
                    $gameVariables.setValue(varId, window.SecuPacker.isPacked());
                }
            });

            PluginManager.registerCommand(PLUGIN_NAME, 'IsPlayerAutoUpdateReady', function (args) {
                var varId = Number(args.variableId) || 0;
                if (varId > 0 && typeof $gameVariables !== 'undefined') {
                    $gameVariables.setValue(varId, window.SecuPacker.isPlayerAutoUpdateReady());
                }
            });

            PluginManager.registerCommand(PLUGIN_NAME, 'IsSplitAvailable', function (args) {
                var varId = Number(args.variableId) || 0;
                var binName = String(args.binName || '');
                if (varId > 0 && typeof $gameVariables !== 'undefined') {
                    $gameVariables.setValue(varId, window.SecuPacker.isSplitAvailable(binName));
                }
            });
        }

        // ── Plugin Command ───────────────────────────────────────────────────
        if (typeof Game_Interpreter !== 'undefined') {
            var _SP_Packer_origCmd = Game_Interpreter.prototype.pluginCommand;
            Game_Interpreter.prototype.pluginCommand = function (command, args) {
                _SP_Packer_origCmd.call(this, command, args);
                if (command !== 'SecuPacker') return;
                var sub = (args[0] || '').toUpperCase();
                var varId = Number(args[1]) || 0;
                if (sub === 'GETVERSION') {
                    if (varId > 0 && typeof $gameVariables !== 'undefined') {
                        $gameVariables.setValue(varId, window.SecuPacker.getVersion());
                    }
                } else if (sub === 'ISPACKED') {
                    if (varId > 0 && typeof $gameVariables !== 'undefined') {
                        $gameVariables.setValue(varId, window.SecuPacker.isPacked());
                    }
                } else if (sub === 'ISPLAYERAUTOUPDATEREADY') {
                    // Usage: SecuPacker IsPlayerAutoUpdateReady <variableId>
                    if (varId > 0 && typeof $gameVariables !== 'undefined') {
                        $gameVariables.setValue(varId, window.SecuPacker.isPlayerAutoUpdateReady());
                    }
                } else if (sub === 'ISSPLITAVAILABLE') {
                    // Usage: SecuPacker IsSplitAvailable <variableId> <binName>
                    var _binArg = args[2] || '';
                    if (Number(args[1]) > 0 && typeof $gameVariables !== 'undefined') {
                        $gameVariables.setValue(Number(args[1]),
                            window.SecuPacker.isSplitAvailable(_binArg));
                    }
                }
            };
        }
    })();

})();
// #endregion

// ===========================================================================
// #region Loader
// If you have made any direct modifications to this file, you must set 'Packer Auto Update' to 'false' — otherwise your changes will be reverted every time you pack.
// ===========================================================================
function Loader() {
    (function () {
        // ══════════════════════════════════════════════════════════════
        // SECTION 1: Configuration & Polyfills
        // ══════════════════════════════════════════════════════════════

        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (search, pos) {
                return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
            };
        }

        if (typeof setImmediate === 'undefined') {
            setImmediate = function (fn) { setTimeout(fn, 0); };
        }

        function isRPGMakerMZ() { return (typeof Utils !== 'undefined' && Utils.RPGMAKER_NAME === 'MZ'); }

        /** Plugin version — injected at pack time by transformLoaderCode. */
        var _SP_VERSION = "%__INJECT_SP_VERSION__%";

        // ══════════════════════════════════════════════════════════════
        // SECTION 2: Security Layer
        //   Honeypot traps, anti-debugging, integrity checks,
        //   process blacklist, and security initialization.
        // ══════════════════════════════════════════════════════════════

        // --- 2A: Honeypot Traps ---
        // Note: Setup is delayed to ensure emergencyWipe is defined
        var _honeypotSetupDone = false;
        function setupHoneypots() {
            if (_honeypotSetupDone) return;
            if (typeof window === 'undefined') return;

            var honeypotNames = [
                '$_MASTER_KEY', '$_DEBUG_KEY', '$_ENCRYPTION_KEY',
                '$_SECRET', '$_PASSWORD', '$_DECRYPT',
                '_gameKey', '_masterPassword', '_secretKey'
            ];

            honeypotNames.forEach(function (name) {
                try {
                    Object.defineProperty(window, name, {
                        get: function () {
                            _SECURITY_TRIGGERED = true;
                            if (typeof emergencyWipe === 'function') emergencyWipe();
                            return undefined;
                        },
                        set: function () {
                            _SECURITY_TRIGGERED = true;
                            if (typeof emergencyWipe === 'function') emergencyWipe();
                        },
                        configurable: false
                    });
                } catch (e) { }
            });
            _honeypotSetupDone = true;
        }

        // --- 2B: Anti-Debugging & Anti-Tampering ---
        var _SECURITY_TRIGGERED = false;
        var _SECURITY_CHECK_INTERVAL = null;

        // [DEVTOOLS PREVENTION] Block DevTools keyboard shortcuts entirely
        (function blockDevTools() {
            if (typeof document === 'undefined') return;

            // Block right-click context menu
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                return false;
            }, true);

            // NW.js specific: Close DevTools if somehow opened
            if (typeof nw !== 'undefined' && nw.Window) {
                try {
                    var win = nw.Window.get();
                    // Override showDevTools to do nothing
                    if (win.showDevTools) {
                        win.showDevTools = function () { };
                    }
                } catch (e) { }
            }
        })();

        function emergencyWipe() {
            if (_runtime_key_cache) {
                _runtime_key_cache.fill(0);
                _runtime_key_cache = null;
            }
            // [KEY SHARDS] Wipe entire decoy-pool (all triples: real and fake)
            if (typeof _shard_pool !== 'undefined' && _shard_pool) {
                for (var _swi = 0; _swi < _shard_pool.length; _swi++) {
                    if (_shard_pool[_swi].a) _shard_pool[_swi].a.fill(0);
                    if (_shard_pool[_swi].b) _shard_pool[_swi].b.fill(0);
                    if (_shard_pool[_swi].c) _shard_pool[_swi].c.fill(0);
                }
                _shard_pool = null;
            }
            _shard_real_idx = -1; _shard_idx_mask = 0;
            // [ENV BINDING] Wipe VFS key decoy-pool
            if (typeof _vfs_pool !== 'undefined' && _vfs_pool) {
                for (var _vwi = 0; _vwi < _vfs_pool.length; _vwi++) {
                    if (_vfs_pool[_vwi].a) _vfs_pool[_vwi].a.fill(0);
                    if (_vfs_pool[_vwi].b) _vfs_pool[_vwi].b.fill(0);
                    if (_vfs_pool[_vwi].c) _vfs_pool[_vwi].c.fill(0);
                }
                _vfs_pool = null;
            }
            _vfs_real_idx = -1; _vfs_idx_mask = 0;
            _s_mask = "";
            _s_data = "";
            _SECURITY_TRIGGERED = true;
            if (typeof IndexTable !== 'undefined') {
                for (var k in IndexTable) delete IndexTable[k];
            }
            if (typeof VFD_MAP !== 'undefined') {
                for (var fd in VFD_MAP) {
                    if (VFD_MAP[fd].entryKey) VFD_MAP[fd].entryKey.fill(0);
                    delete VFD_MAP[fd];
                }
            }
            // [SPLIT] Close all split file descriptors on emergency wipe
            if (typeof SplitFds !== 'undefined' && SplitFds) {
                for (var _sfd in SplitFds) {
                    if (_sfd === '_names') continue; // skip the filename-index array
                    try { if (typeof SplitFds[_sfd] === 'number') fs.closeSync(SplitFds[_sfd]); } catch (_) { }
                    delete SplitFds[_sfd];
                }
            }
            // [SECURITY] Revoke all cached blob URLs so decrypted content is no longer
            // reachable via stored blob: references even after keys are wiped.
            if (typeof BlobCache !== 'undefined' && typeof URL !== 'undefined' && URL.revokeObjectURL) {
                for (var bk in BlobCache) {
                    try { URL.revokeObjectURL(BlobCache[bk]); } catch (_) { }
                    delete BlobCache[bk];
                }
                BlobCache = Object.create(null);
            }
            // [SECURITY] Clear path->hash cache (leaks VFS path structure)
            if (typeof _hashPathCache !== 'undefined') {
                _hashPathCache = Object.create(null);
                _hashPathCacheSize = 0;
            }
        }

        // [INTEGRITY] Function hash verification (SHA-256)
        var _CRITICAL_HASH = null;
        function computeCriticalHash() {
            var criticalCode = getKey.toString();
            if (typeof resolveFileMetadata === 'function') {
                criticalCode += resolveFileMetadata.toString();
            }
            return crypto.createHash('sha256').update(criticalCode).digest('hex');
        }

        function verifyIntegrity() {
            if (_CRITICAL_HASH === null) return true; // First run
            var currentHash = computeCriticalHash();
            if (currentHash !== _CRITICAL_HASH) {
                emergencyWipe();
                return false;
            }
            return true;
        }

        // [SECURITY] Terms are constructed from character-code arrays at runtime so that
        // V8 cannot constant-fold them into plaintext strings in compiled bytecode/snapshots.
        // These builder functions are the single source of truth — they execute on the main
        // thread and their return values are injected into the watchdog via JSON.stringify

        // CHECK 1: Process executable name (image name column)
        function _buildFindstrCmd() {
            var _c = String.fromCharCode;
            var _terms = [
                _c(99, 104, 101, 97, 116),                                // cheat
                _c(114, 101, 99, 108, 97, 115, 115),                        // reclass
                _c(99, 114, 121, 115, 101, 97, 114, 99, 104),                 // crysearch
                _c(112, 114, 111, 99, 101, 115, 115, 104, 97, 99, 107, 101, 114), // processhacker
                _c(115, 113, 117, 97, 108, 114),                               // squalr
                _c(120, 54, 52, 100, 98, 103),                             // x64dbg
                _c(120, 51, 50, 100, 98, 103),                             // x32dbg
                _c(111, 108, 108, 121, 100, 98, 103),                       // ollydbg
                _c(102, 105, 100, 100, 108, 101, 114),                      // fiddler
                _c(119, 105, 114, 101, 115, 104, 97, 114, 107),               // wireshark
                _c(97, 114, 116, 109, 111, 110, 101, 121),                   // artmoney
                _c(98, 117, 114, 112, 115, 117, 105, 116, 101)                // burpsuite
            ];
            return 'tasklist | findstr /I ' + _terms.map(function (t) { return '/C:"' + t + '"'; }).join(' ');
        }

        // CHECK 2: DLL modules loaded across all processes (tasklist /M)
        // Catches renamed executables whose DLL names cannot be changed without breaking the tool,
        // and injected hook DLLs (e.g. CE's DBK user-mode DLL, VEH debug DLL, TitanEngine).
        function _buildFindstrDllCmd() {
            var _c = String.fromCharCode;
            var _dt = [
                _c(99, 104, 101, 97, 116, 101, 110, 103, 105, 110, 101),              // cheatengine
                _c(100, 98, 107),                                             // dbk
                _c(118, 101, 104, 100, 101, 98, 117, 103),                         // vehdebug
                _c(114, 101, 99, 108, 97, 115, 115),                              // reclass
                _c(99, 114, 121, 115, 101, 97, 114, 99, 104),                       // crysearch
                _c(107, 112, 114, 111, 99, 101, 115, 115, 104, 97, 99, 107, 101, 114),   // kprocesshacker
                _c(120, 54, 52, 100, 98, 103),                                   // x64dbg
                _c(120, 51, 50, 100, 98, 103),                                   // x32dbg
                _c(116, 105, 116, 97, 110, 101, 110, 103, 105, 110, 101),             // titanengine
                _c(111, 108, 108, 121, 100, 98, 103),                             // ollydbg
                _c(102, 105, 100, 100, 108, 101, 114),                            // fiddler
                _c(97, 114, 116, 109, 115, 101),                                 // artmse
                _c(98, 117, 114, 112, 115, 117, 105, 116, 101)                      // burpsuite
            ];
            return 'driverquery | findstr /I ' + _dt.map(function (t) { return '/C:"' + t + '"'; }).join(' ');
        }

        // CHECK 3: Visible window titles (tasklist /V)
        // Catches tools running under a renamed executable: the window title exposed by the OS
        // is drawn from the application itself and cannot be easily faked by a rename.
        // Multi-word terms (space included) further narrow false-positive risk.
        function _buildFindstrWinCmd() {
            var _c = String.fromCharCode;
            var _wt = [
                _c(99, 104, 101, 97, 116, 32, 101, 110, 103, 105, 110, 101),          // cheat engine
                _c(114, 101, 99, 108, 97, 115, 115),                             // reclass
                _c(99, 114, 121, 115, 101, 97, 114, 99, 104),                      // crysearch
                _c(112, 114, 111, 99, 101, 115, 115, 32, 104, 97, 99, 107, 101, 114),   // process hacker
                _c(115, 113, 117, 97, 108, 114),                               // squalr
                _c(120, 54, 52, 100, 98, 103),                                  // x64dbg
                _c(120, 51, 50, 100, 98, 103),                                  // x32dbg
                _c(111, 108, 108, 121, 100, 98, 103),                            // ollydbg
                _c(102, 105, 100, 100, 108, 101, 114),                           // fiddler
                _c(119, 105, 114, 101, 115, 104, 97, 114, 107),                    // wireshark
                _c(97, 114, 116, 109, 111, 110, 101, 121),                        // artmoney
                _c(98, 117, 114, 112, 32, 115, 117, 105, 116, 101)                  // burpsuite
            ];
            return 'powershell -NoProfile -Command "Get-Process | ForEach-Object { $_.MainWindowTitle }" | findstr /I ' + _wt.map(function (t) { return '/C:"' + t + '"'; }).join(' ');
        }

        // ══════════════════════════════════════════════════════════════
        // SECTION 3: Security Watchdog
        //   Process checking runs in a hidden nw.Window so the
        //   main game thread is never blocked.
        //   Communication uses BroadcastChannel (cross-window IPC).
        // ══════════════════════════════════════════════════════════════

        // [PACK-TIME INJECTED] Watchdog on/off flags
        var _enable_sec_watchdog = "%__INJECT_ENABLE_SEC_WATCHDOG__%" === "true";
        var _earlyBlobResolve = "%__INJECT_EARLY_BLOB_RESOLVE__%" === "true";
        var _watchdogLastHeartbeat = 0;

        function _initSecWatchdog() {
            if (!_enable_sec_watchdog) return false;

            var mainPid = process.pid;
            var keepAliveBlob = new Blob(['alive'], { type: 'text/plain' });
            var keepAliveUrl = URL.createObjectURL(keepAliveBlob);

            var _fc = _buildFindstrCmd();
            var _fd = _buildFindstrDllCmd();
            var _fw = _buildFindstrWinCmd();

            var watchdogScript = `
                var MAIN_PID = ${mainPid};
                var cp; try { cp = require("child_process"); } catch(e) {}
                var _pi = false;
                var _FC = ${JSON.stringify(_fc)};
                var _FD = ${JSON.stringify(_fd)};
                var _FW = ${JSON.stringify(_fw)};
                var KEEP_ALIVE_URL = "${keepAliveUrl}";
                var _activeProcs = [];
                var _bc = new BroadcastChannel("sec_watchdog_channel");

                function _CP() {
                    if (_pi || !cp) return;
                    _pi = true; var _pc = 3; var _tr = false;
                    _activeProcs = [];
                    function _D() { if (--_pc === 0) _pi = false; }
                    function _T() {
                        if (!_tr) {
                            _tr = true;
                            _bc.postMessage({ type: "SECURITY_THREAT_DETECTED", time: Date.now() });
                            setTimeout(function(){
                                try { process.kill(MAIN_PID, "SIGKILL"); } catch(e) {} if(typeof process !== "undefined") process.exit(0);
                            }, 500);
                        }
                    }
                    var _EO = { timeout: 15000, windowsHide: true };
                    _activeProcs.push(cp.exec(_FC, _EO, function(e, o) { _D(); if (!e && o && o.trim()) _T(); }));
                    _activeProcs.push(cp.exec(_FD, _EO, function(e, o) { _D(); if (!e && o && o.trim()) _T(); }));
                    _activeProcs.push(cp.exec(_FW, _EO, function(e, o) { _D(); if (!e && o && o.trim()) _T(); }));
                }
                setInterval(_CP, 3000);
                
                var _failCount = 0;
                setInterval(function() {
                    fetch(KEEP_ALIVE_URL).then(function(res) {
                        if (!res.ok) {
                            _failCount++;
                            if (_failCount >= 3) _die();
                        } else {
                            _failCount = 0;
                        }
                    }).catch(function(e) {
                        _failCount++;
                        if (_failCount >= 3) _die();
                    });
                }, 500);

                setInterval(function() { _bc.postMessage({ type: "WATCHDOG_HEARTBEAT", time: Date.now() }); }, 2000);
                
                function _die() {
                    if (_activeProcs && _activeProcs.length > 0) {
                        for (var i = 0; i < _activeProcs.length; i++) {
                            try { if (_activeProcs[i] && typeof _activeProcs[i].kill === 'function') _activeProcs[i].kill("SIGKILL"); } catch(e) {}
                        }
                    }
                    if (typeof nw !== "undefined") nw.Window.get().close(true);
                    else window.close();
                    if (typeof process !== "undefined") process.exit(0);
                }
                `

            var blob = new Blob(['<script>' + watchdogScript + '<\/script>'], { type: 'text/html' });
            var blobUri = URL.createObjectURL(blob);

            // Main thread: listen for watchdog signals
            var _bcMain = new BroadcastChannel("sec_watchdog_channel");
            _bcMain.onmessage = function (e) {
                if (e.data && e.data.type === 'SECURITY_THREAT_DETECTED') {
                    emergencyWipe();
                    _SECURITY_TRIGGERED = true;
                    try { process.exit(0); } catch (_) { }
                } else if (e.data && e.data.type === 'WATCHDOG_HEARTBEAT') {
                    _watchdogLastHeartbeat = e.data.time;
                }
            };

            // Initialize heartbeat before spawn to prevent false positive on startup
            _watchdogLastHeartbeat = Date.now();

            // Spawn hidden background window (separate V8 isolate)
            nw.Window.open(blobUri, {
                show: false,
                new_instance: true,
                width: 0, height: 0
            });

            return true;
        }

        // [SECURITY LOOP] Main-thread: lightweight checks only
        //   Process checking is handled by the background security window.
        function securityLoop() {
            if (_SECURITY_TRIGGERED) {
                if (_SECURITY_CHECK_INTERVAL) clearInterval(_SECURITY_CHECK_INTERVAL);
                return;
            }
            verifyIntegrity();

            // Watchdog: Check if the background watchdog is still alive
            var lastHeartbeat = _watchdogLastHeartbeat;
            if (lastHeartbeat > 0 && Date.now() - lastHeartbeat > 10000) {
                // Watchdog heartbeat missed for 15s. It was suspended or killed!
                emergencyWipe();
                _SECURITY_TRIGGERED = true;
                try { process.exit(0); } catch (_) { }
            }

            if (_SECURITY_TRIGGERED) {
                if (_SECURITY_CHECK_INTERVAL) clearInterval(_SECURITY_CHECK_INTERVAL);
                return;
            }
            // Process checking is handled entirely by the background window
        }

        // Smart Initialization: Wait for game engine or DOM to fully load
        function startSecurity() {
            if (typeof window !== 'undefined' && !_SECURITY_TRIGGERED) {
                setupHoneypots();
                _CRITICAL_HASH = computeCriticalHash();
                // Spawn background security window for process checking
                _initSecWatchdog();
                // Main thread only runs the lightweight securityLoop
                _SECURITY_CHECK_INTERVAL = setInterval(securityLoop, 3000);
            }
        }

        if (typeof window !== 'undefined') {
            var checkLoad = function () {
                if (document.readyState === 'complete') {
                    // If it's RPG Maker, wait for SceneManager to initialize
                    if (typeof SceneManager !== 'undefined') {
                        var poll = setInterval(function () {
                            if (SceneManager._scene) {
                                clearInterval(poll);
                                setTimeout(startSecurity, 1000);
                            }
                        }, 500);
                    } else {
                        // Generic HTML5/NW.js app
                        setTimeout(startSecurity, 1000);
                    }
                } else {
                    window.addEventListener('load', checkLoad);
                }
            };
            checkLoad();
        } else {
            startSecurity(); // Fallback for non-browser env
        }

        // ══════════════════════════════════════════════════════════════
        // SECTION 4: Key Management
        //   Master key derivation, shard-based key protection,
        //   periodic re-obfuscation, and key access control.
        // ══════════════════════════════════════════════════════════════

        var _s_mask = "%__INJECT_MASK__%";
        var _s_data = "%__INJECT_DATA__%";
        var _ENV_HASH_EXE = "%__INJECT_ENV_HASH_EXE__%" === "true";
        var _runtime_key_cache = null;

        // [KEY PROTECTION] Decoy-pool shard storage
        var _FAKE_SHARD_COUNT = 16;
        var _shard_pool = null;
        var _shard_real_idx = -1;
        var _shard_idx_mask = 0;
        var _key_access_count = 0;
        var _KEY_REOBFUSCATE_THRESHOLD = 5; // Re-obfuscate every N accesses

        // ══════════════════════════════════════════════════════════════
        // [ENV BINDING] VFS key shards — same scheme as master key pool
        //   Stores the env-bound VFS decryption key (HMAC of master key
        //   + environment fingerprint). Populated during VFS init.
        //   All VFS decryption goes through getVfsKey(), never getKey().
        // ══════════════════════════════════════════════════════════════
        var _vfs_pool = null;  // [{a:Buffer, b:Buffer, c:Buffer}, ...]
        var _vfs_real_idx = -1;
        var _vfs_idx_mask = 0;

        function getVfsKey() {
            if (_SECURITY_TRIGGERED) return null;
            if (!_vfs_pool || _vfs_real_idx < 0) return null;
            // Unmask the real index; stored value = realIndex ^ mask
            var _vri = _vfs_real_idx ^ _vfs_idx_mask;
            var _vpair = _vfs_pool[_vri];
            if (!_vpair || !_vpair.a || !_vpair.b || !_vpair.c) return null;
            var _vk = (Buffer.alloc ? Buffer.alloc(_vpair.a.length) : new Buffer(_vpair.a.length));
            // [3-WAY XOR]  key = a ^ b ^ c
            for (var _vi = 0; _vi < _vk.length; _vi++) _vk[_vi] = _vpair.a[_vi] ^ _vpair.b[_vi] ^ _vpair.c[_vi];
            return _vk;
        }

        function splitKeyToShards(key) {
            if (!key) return;

            // ── Helper: cryptographically-random Buffer of given length ──
            var _rng = function (len) {
                if (typeof crypto !== 'undefined' && crypto.randomBytes) {
                    return crypto.randomBytes(len);
                }
                var _b = (Buffer.alloc ? Buffer.alloc(len) : new Buffer(len));
                for (var _i = 0; _i < len; _i++) _b[_i] = Math.floor(Math.random() * 256);
                return _b;
            };

            // ── Wipe previous pool before overwriting ──
            if (_shard_pool) {
                for (var _wp = 0; _wp < _shard_pool.length; _wp++) {
                    if (_shard_pool[_wp].a) _shard_pool[_wp].a.fill(0);
                    if (_shard_pool[_wp].b) _shard_pool[_wp].b.fill(0);
                    if (_shard_pool[_wp].c) _shard_pool[_wp].c.fill(0);
                }
                _shard_pool = null;
            }

            // ── Fixed pool: _FAKE_SHARD_COUNT fakes + 1 real ──
            // Size is constant across all calls — no metadata leak via pool length.
            // Real slot position is chosen randomly each time.
            var _totalSlots = _FAKE_SHARD_COUNT + 1;
            var _realSlot = Math.floor(Math.random() * _totalSlots);
            _shard_pool = [];

            for (var _pi = 0; _pi < _totalSlots; _pi++) {
                if (_pi === _realSlot) {
                    // Real triple: 3-way XOR chain
                    // a and b are fully random; c absorbs the remainder.
                    // a[i] ^ b[i] ^ c[i] = key[i]
                    // Knowing any one or two of {a,b,c} reveals nothing about key.
                    var _ra = _rng(key.length);
                    var _rb = _rng(key.length);
                    var _rc = (Buffer.alloc ? Buffer.alloc(key.length) : new Buffer(key.length));
                    for (var _rj = 0; _rj < key.length; _rj++) _rc[_rj] = key[_rj] ^ _ra[_rj] ^ _rb[_rj];
                    _shard_pool.push({ a: _ra, b: _rb, c: _rc });
                } else {
                    // Fake triple: all three independently random.
                    // Identical size and entropy to the real triple.
                    _shard_pool.push({ a: _rng(key.length), b: _rng(key.length), c: _rng(key.length) });
                }
            }

            // ── Store real index XOR'd with a random one-byte mask ──
            // _shard_real_idx alone is meaningless without _shard_idx_mask.
            _shard_idx_mask = Math.floor(Math.random() * 0x100);
            _shard_real_idx = _realSlot ^ _shard_idx_mask;

            // Keep legacy single-shard vars null
            _key_shard_a = null;
            _key_shard_b = null;
        }

        function reconstructKeyFromShards() {
            if (!_shard_pool || _shard_real_idx < 0) return null;
            // Recover the real slot by un-masking the stored index
            var _ri = _shard_real_idx ^ _shard_idx_mask;
            var _pair = _shard_pool[_ri];
            if (!_pair || !_pair.a || !_pair.b || !_pair.c) return null;
            var key = (Buffer.alloc ? Buffer.alloc(_pair.a.length) : new Buffer(_pair.a.length));
            // [3-WAY XOR]  key[i] = a[i] ^ b[i] ^ c[i]
            for (var i = 0; i < key.length; i++) {
                key[i] = _pair.a[i] ^ _pair.b[i] ^ _pair.c[i];
            }
            return key;
        }

        function reobfuscateShards() {
            var key = reconstructKeyFromShards();
            if (!key) return;
            splitKeyToShards(key);
            key.fill(0); // Immediately clear reconstructed key
        }

        function getKey() {
            // [SECURITY] Check if security has been triggered
            if (_SECURITY_TRIGGERED) return null;

            // [SHARDED] Try to reconstruct from pool first
            if (_shard_pool && _shard_real_idx >= 0) {
                _key_access_count++;
                // Periodic re-obfuscation for anti-dump protection
                if (_key_access_count % _KEY_REOBFUSCATE_THRESHOLD === 0) {
                    reobfuscateShards();
                }
                return reconstructKeyFromShards();
            }

            try {
                var m = (Buffer.from ? Buffer.from(_s_mask) : new Buffer(_s_mask));
                var d = (Buffer.from ? Buffer.from(_s_data) : new Buffer(_s_data));
                var k = (Buffer.alloc ? Buffer.alloc(d.length) : new Buffer(d.length));
                for (var i = 0; i < d.length; i++) k[i] = d[i] ^ m[i % m.length];

                // [KEY PROTECTION] Split into shards immediately after derivation
                splitKeyToShards(k);
                k.fill(0);

                // Wipe original sources
                m.fill(0); d.fill(0);
                _s_mask = null; _s_data = null; // Clear source arrays

                return reconstructKeyFromShards();
            } catch (e) { return null; }
        }

        // __SHARD_ANCHOR_A__

        // ══════════════════════════════════════════════════════════════
        // SECTION 5: Node.js Setup & VFS Core
        //   Module requires, path normalization, cryptographic
        //   primitives, and file metadata resolution.
        // ══════════════════════════════════════════════════════════════

        var isNode = typeof require === 'function' && typeof process === 'object';
        if (!isNode) return;

        var fs = require('fs');
        var path = require('path');
        var crypto = require('crypto');
        var zlib = require('zlib');

        // [SECURITY] Use Object.create(null) for all lookup tables to prevent
        // prototype pollution attacks. Plain {} literals inherit Object.prototype,
        // which means keys like 'constructor' or 'hasOwnProperty' would resolve
        // to prototype properties instead of VFS entries or cache hits.
        var IndexTable = Object.create(null);
        var DirMap = Object.create(null);
        var VirtualDirSet = Object.create(null);
        var DirChildrenMap = Object.create(null);
        var FileDescriptor = null;
        var ResourceStartOffset = 0;
        // [SPLIT] Map of split bin filenames → their open file descriptors.
        // Populated by initResourceLoader after TOC is decrypted.
        // Key: split filename, Value: numeric fd from fs.openSync.
        var SplitFds = Object.create(null);

        function readInt64LE(buf, offset) {
            var low = buf.readUInt32LE(offset);
            var high = buf.readUInt32LE(offset + 4);
            return high * 4294967296 + low;
        }

        function normalizePath(p) {
            try {
                // Normalize project root using the closure 'path' (not require('path'))
                var projectRoot = path.dirname(process.mainModule.filename).replace(/\\/g, '/').toLowerCase();
                if (!projectRoot.endsWith('/')) projectRoot += '/';

                var normalizedP = p.replace(/\\/g, '/');
                var lowerP = normalizedP.toLowerCase();

                // If path starts with project root, strip it to make it relative
                if (lowerP.indexOf(projectRoot) === 0) {
                    normalizedP = normalizedP.substring(projectRoot.length);
                }

                p = normalizedP;
            } catch (e) {
                // Fallback: use raw path if something fails
            }

            var res = (p.normalize ? p.normalize('NFC') : p).replace(/\\/g, '/');

            var segments = res.split('/');
            var resolvedParts = [];
            for (var i = 0; i < segments.length; i++) {
                if (segments[i] === '' || segments[i] === '.') {
                    continue; // Skip empty segments and current dir
                } else if (segments[i] === '..') {
                    if (resolvedParts.length > 0) {
                        resolvedParts.pop();
                    } else {
                        // [SECURITY] Directory Traversal Protection
                        // Block malicious requests attempting to escape the VFS root
                        return null; // [SECURITY] directory traversal blocked
                    }
                } else {
                    resolvedParts.push(segments[i]);
                }
            }

            return resolvedParts.join('/').toLowerCase();
        }

        // ══════════════════════════════════════════════════════════════
        // [MIRAGE FOLDER SYNTHESIS] Virtual directory inference helpers.
        //   Solves the structural blindspot of DirMap: it only stores
        //   leaf-level directory entries, so parent folders like 'audio'
        //   may be missing even when 'audio/bgm' exists.
        //   These helpers are called ONLY from fs hook closures and must
        //   NEVER call require() or any hooked fs function to avoid
        //   re-entrancy and infinite call stack overflow.
        // ══════════════════════════════════════════════════════════════

        /**
         * RePacks VirtualDirSet by walking all DirMap keys and registering
         * every ancestor path. Called once after TOC is loaded.
         * [SAFE] No require(), no fs calls, pure object/string operations.
         */
        function _PackVirtualDirSet() {
            VirtualDirSet = Object.create(null);
            DirChildrenMap = Object.create(null);
            var keys = Object.keys(DirMap);

            function _addChild(parentKey, childName, overwrite) {
                if (!parentKey || !childName) return;
                if (!DirChildrenMap[parentKey]) DirChildrenMap[parentKey] = {};
                var lower = childName.toLowerCase();
                // overwrite=true: explicit DirMap entries always beat synthesized ones
                if (overwrite || !DirChildrenMap[parentKey][lower]) {
                    DirChildrenMap[parentKey][lower] = childName;
                }
            }

            // Pass 1: Register VirtualDirSet and synthesized sub-directory names.
            //         Uses lowercase key segments (normalized paths are already lowercase).
            for (var _bvi = 0; _bvi < keys.length; _bvi++) {
                var _bvk = keys[_bvi];
                var _bvp = _bvk.split('/');
                var _bvacc = '';
                for (var _bvj = 0; _bvj < _bvp.length; _bvj++) {
                    var _prev = _bvacc;
                    _bvacc = _bvacc ? (_bvacc + '/' + _bvp[_bvj]) : _bvp[_bvj];
                    VirtualDirSet[_bvacc] = true;
                    if (_prev) _addChild(_prev, _bvp[_bvj], false); // synthesized, no overwrite
                }
            }

            // Pass 2: Register explicit DirMap entries (original-case filenames).
            //         These take priority over synthesized names from Pass 1.
            for (var _bvi2 = 0; _bvi2 < keys.length; _bvi2++) {
                var _bvk2 = keys[_bvi2];
                if (DirMap[_bvk2]) {
                    var _cent = DirMap[_bvk2];
                    for (var _ck = 0; _ck < _cent.length; _ck++) {
                        _addChild(_bvk2, _cent[_ck], true); // explicit, overwrite
                    }
                }
            }
        }

        /**
         * Returns true if 'key' is a known virtual directory —
         * either explicitly in DirMap, or synthesized as an ancestor.
         * [SAFE] Pure object lookup, no side effects.
         * @param {string} key - Normalized VFS path
         * @returns {boolean}
         */
        function isVirtualDir(key) {
            if (!key) return false;
            return !!(DirMap[key] || VirtualDirSet[key]);
        }

        /**
         * Returns the direct children (file+dir names) of a virtual directory.
         * Merges explicit DirMap entries with synthesized sub-directory names
         * inferred from deeper DirMap keys.
         * [SAFE] Pure object/string operations, no require(), no fs calls.
         * @param {string} key - Normalized VFS path of the directory
         * @returns {string[]}
         */
        function getVirtualDirChildren(key) {
            // [PERF] O(1) lookup using pre-built DirChildrenMap.
            // DirChildrenMap[key] is a lower->originalCase object built at TOC load time.
            var childMap = DirChildrenMap[key];
            if (!childMap) return [];
            var names = Object.keys(childMap);
            var result = [];
            for (var _ri = 0; _ri < names.length; _ri++) {
                result.push(childMap[names[_ri]]);
            }
            return result;
        }

        /**
         * Resolves a normalized path to the canonical VFS key.
         *
         * @param {string} key - Already normalized path from normalizePath()
         * @param {'file'|'dir'|'any'} mode - What to look for
         * @returns {string|null} The canonical key that matched, or null
         */
        function resolveVfsKey(key, mode) {
            if (!key) return null;

            function _matchesMode(k) {
                if (mode === 'file') return !!(IndexTable[hashPath(k)]);
                if (mode === 'dir') return isVirtualDir(k);
                // 'any': file OR directory
                return !!(IndexTable[hashPath(k)]) || isVirtualDir(k);
            }

            // Step 1: exact match
            if (_matchesMode(key)) return key;

            // Step 2: fallback probe — strip leading 'www/' and retry.
            // Only attempted when the path actually starts with 'www/' to avoid
            // unnecessary work on the hot path.
            if (key.indexOf('www/') === 0) {
                var stripped = key.substring(4);
                if (_matchesMode(stripped)) return stripped;
            }

            return null;
        }

        // ══════════════════════════════════════════════════════════════
        // [ENV BINDING] Runtime environment fingerprint
        //   Computes SHA-256 over:
        //   1) Relative path + content of every native binary
        //      (.dll/.node/.exe/.lib/.so/.dylib) found under project root
        //   2) The V8-snapshot portion of game.bin (bytes 0..ResourceStartOffset)
        //   The result is used as the HMAC message that, combined with the
        //   master key, produces the actual VFS decryption key.
        //   Any tampering with a binary or the snapshot yields a different
        //   hash -> different key -> AES-GCM auth-tag failure -> VFS locked.
        // ══════════════════════════════════════════════════════════════

        // [PACK-TIME INJECTED] JSON array of exclusion patterns for binary hashing
        var _EXCLUDED_BINARY_HASHES_RAW = "%__INJECT_EXCLUDED_BINARY_HASHES__%";

        function computeRuntimeEnvHash(basePath, binPath, v8Size) {
            var _BEXTS = ['.dll', '.node', '.lib', '.dylib', '.so', '.pak', '.bin', '.dat'];
            var _SKIP_ENV = ['save', 'locales', 'swiftshader', 'temp_sdk_extract'];
            var _eh = crypto.createHash('sha256');

            // Parse the injected exclusion list
            var _BHEX = [];
            try {
                if (_EXCLUDED_BINARY_HASHES_RAW && _EXCLUDED_BINARY_HASHES_RAW.indexOf('%') !== 0) {
                    _BHEX = JSON.parse(_EXCLUDED_BINARY_HASHES_RAW);
                }
            } catch (_pe) { }

            // [SELF-EXCLUDE] Always exclude the game binary itself from env hashing.
            // If game.bin is renamed to game.dll (or any other binary extension),
            // it must not be picked up by the native-binary scan — doing so would
            // corrupt the hash because its content changes between Packs.
            var _selfBinName = (binPath ? path.basename(binPath) : '').toLowerCase();

            // Inline exclusion check (mirrors Pack-time isBinaryHashExcluded)
            function _isBinExcluded(_fname) {
                var _fl = _fname.toLowerCase();
                // Always exclude the game binary regardless of its extension
                if (_selfBinName && _fl === _selfBinName) return true;
                if (!_BHEX || _BHEX.length === 0) return false;
                var _di = _fl.lastIndexOf('.');
                var _bn = _di !== -1 ? _fl.slice(0, _di) : _fl;
                for (var _xi = 0; _xi < _BHEX.length; _xi++) {
                    var _en = (_BHEX[_xi] || '').toLowerCase().trim();
                    if (!_en) continue;
                    var _edi = _en.lastIndexOf('.');
                    var _ee = _edi !== -1 ? _en.slice(_edi) : '';
                    if (_ee) { if (_fl === _en) return true; }
                    else { if (_bn.indexOf(_en) !== -1) return true; }
                }
                return false;
            }

            // [RELIABLE BINARY ROOT] Use the directory of the running executable (Game.exe).
            var _binaryScanRoot;
            try {
                _binaryScanRoot = path.dirname(process.execPath);
            } catch (e) {
                _binaryScanRoot = basePath; // fallback
            }

            // Phase A: hash native binaries in deterministic (sorted) order
            var _SCAN_MAX_DEPTH = 8; // Guard against symlink loops and deeply nested structures
            function _scanEnvDir(dir, depth) {
                if (depth > _SCAN_MAX_DEPTH) return;
                try {
                    var _items = fs.readdirSync(dir).sort();
                    for (var _ii = 0; _ii < _items.length; _ii++) {
                        var _fp = path.join(dir, _items[_ii]);
                        try {
                            var _st = fs.lstatSync(_fp);
                            if (_st.isSymbolicLink()) continue; // never follow symlinks
                            if (_st.isDirectory()) {
                                if (_SKIP_ENV.indexOf(_items[_ii].toLowerCase()) === -1) _scanEnvDir(_fp, depth + 1);
                            } else {
                                var _ex = path.extname(_items[_ii]).toLowerCase();
                                if (_BEXTS.indexOf(_ex) !== -1 && !_isBinExcluded(_items[_ii])) {
                                    var _rel = path.relative(_binaryScanRoot, _fp).replace(/\\/g, '/').toLowerCase();
                                    _eh.update(_rel);
                                    _eh.update(fs.readFileSync(_fp));
                                }
                            }
                        } catch (e) { }
                    }
                } catch (e) { }
            }
            _scanEnvDir(_binaryScanRoot, 0);

            // [EXE HASH] Hash the launcher executable (process.execPath) and,
            // if present, notification_helper.exe in the same directory.
            // The helper hash is silently skipped when the file does not exist,
            // so pack-time and runtime hashes remain consistent in both cases.
            if (_ENV_HASH_EXE) {
                try {
                    var _execPath = process.execPath;
                    var _execName = path.basename(_execPath);
                    if (!_isBinExcluded(_execName)) {
                        _eh.update(fs.readFileSync(_execPath));
                    }
                } catch (_ee) { }
                // Also hash notification_helper.exe if it exists in the same directory.
                // If the file is absent, this block is silently skipped — no error.
                try {
                    var _nhExePath = path.join(path.dirname(process.execPath), 'notification_helper.exe');
                    if (!_isBinExcluded('notification_helper.exe')) {
                        var _nhExeRel = path.relative(_binaryScanRoot, _nhExePath).replace(/\\/g, '/').toLowerCase();
                        _eh.update(_nhExeRel);
                        _eh.update(fs.readFileSync(_nhExePath));
                    }
                } catch (_nhErr) { /* notification_helper.exe not present — skip */ }
            }

            // Phase B: hash V8 snapshot in streaming 4 MB chunks (avoids large alloc)
            try {
                var _vfd = fs.openSync(binPath, 'r');
                var _vrem = v8Size;
                var _vpos = 0;
                var _VCHUNK = 4 * 1024 * 1024;
                while (_vrem > 0) {
                    var _vread = Math.min(_vrem, _VCHUNK);
                    var _vbuf = Buffer.alloc(_vread);
                    fs.readSync(_vfd, _vbuf, 0, _vread, _vpos);
                    _eh.update(_vbuf);
                    _vbuf.fill(0);
                    _vpos += _vread;
                    _vrem -= _vread;
                }
                fs.closeSync(_vfd);
            } catch (e) { }

            // Phase C: hash package.json via nw.App.manifest
            try {
                var _mf = (global.nw || require('nw.gui')).App.manifest;
                var _mfKeys = Object.keys(_mf).sort();
                var _mfCopy = {};
                for (var _mfi = 0; _mfi < _mfKeys.length; _mfi++) {
                    _mfCopy[_mfKeys[_mfi]] = _mf[_mfKeys[_mfi]];
                }
                if (typeof _mfCopy.main === 'string') {
                    _mfCopy.main = path.basename(_mfCopy.main.replace(/\\/g, '/').replace(/^file:\/+/i, ''));
                }
                var _mfBuf = Buffer.from ? Buffer.from(JSON.stringify(_mfCopy), 'utf8') : new Buffer(JSON.stringify(_mfCopy), 'utf8');
                _eh.update(_mfBuf);
            } catch (e) { }

            // PHASE D: Hash index.html content (binary filename normalized out).
            try {
                var _htmlPath = process.mainModule.filename;
                var _htmlStr = fs.readFileSync(_htmlPath, 'utf8');
                var _NH_RE_RT = /(<script>try\{var _f=require\("fs"\),_pt=require\("path"\);process\.env\.__BIN_NAME__=")([^"]*)(";var _d=_f\.openSync\(_pt\.join\(_pt\.dirname\(process\.mainModule\.filename\),process\.env\.__BIN_NAME__\),"r"\);var _s=_f\.fstatSync\(_d\)\.size;var _ft=Buffer\.alloc\(16\);_f\.readSync\(_d,_ft,0,16,_s-16\);var _v=_ft\.readUInt32LE\(0\)\+_ft\.readUInt32LE\(4\)\*4294967296;var _b=Buffer\.allocUnsafe\(_v\);_f\.readSync\(_d,_b,0,_v,0\);_f\.closeSync\(_d\);\(global\.nw\|\|require\("nw\.gui"\)\)\.Window\.get\(window\)\.evalNWBin\((?:null|window\.frameElement\|\|null),_b\);_b=null;\}catch\(e\)\{alert\(e\);\}<\/script>)/;
                var _htmlNorm = _htmlStr.replace(_NH_RE_RT, '$1$3');
                var _htmlBuf = Buffer.from ? Buffer.from(_htmlNorm, 'utf8') : new Buffer(_htmlNorm, 'utf8');
                _eh.update(_htmlBuf);
            } catch (e) { }

            return _eh.digest(); // 32-byte Buffer
        }

        var _hashPathCache = Object.create(null);
        var _hashPathCacheSize = 0;
        var _HASH_CACHE_MAX = 2048;
        function hashPath(pathStr) {
            if (!pathStr) return null;
            if (_hashPathCache[pathStr]) return _hashPathCache[pathStr];
            var h = crypto.createHash('sha256').update(pathStr).digest('hex');
            // Evict entire cache when it grows too large (simple but GC-friendly)
            if (_hashPathCacheSize >= _HASH_CACHE_MAX) {
                _hashPathCache = Object.create(null);
                _hashPathCacheSize = 0;
            }
            _hashPathCache[pathStr] = h;
            _hashPathCacheSize++;
            return h;
        }

        function deriveEntryKey(masterKey, pathStr) {
            if (!masterKey) return null;
            return crypto.createHmac('sha256', masterKey).update(pathStr).digest();
        }

        function deriveChunkKey(entryKey, chunkIdx) {
            return crypto.createHmac('sha256', entryKey).update(chunkIdx.toString()).digest();
        }

        function decryptAndDecompress(ciphertext, key, iv, authTag, expectedSize) {
            var dec = null;
            try {
                var decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
                decipher.setAuthTag(authTag);
                dec = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
                var options = {};
                if (expectedSize) {
                    options.chunkSize = Math.max(16384, expectedSize + 1024);
                }
                var plain = zlib.inflateSync(dec, options);
                // [SECURITY] Zero the intermediate plaintext-compressed buffer.
                // It is no longer needed once inflateSync has produced the output.
                dec.fill(0);
                return plain;
            } catch (e) {
                // [SECURITY] Zero dec on failure path as well (GCM auth failure, zlib error, etc.)
                if (dec) dec.fill(0);
                return null;
            }
        }

        function resolveFileMetadata(vfsPath) {
            var h = hashPath(vfsPath);
            var ptr = IndexTable[h];
            if (!ptr) return null;

            try {
                var metaBuf = Buffer.alloc(ptr.l);
                var absMetaOffset = ResourceStartOffset + ptr.o;
                fs.readSync(FileDescriptor, metaBuf, 0, ptr.l, absMetaOffset);

                var iv = metaBuf.slice(0, 12);
                var tag = metaBuf.slice(12, 28);
                var encData = metaBuf.slice(28);

                var masterKey = getVfsKey();
                var key = deriveEntryKey(masterKey, vfsPath);
                masterKey.fill(0);

                var dec = decryptAndDecompress(encData, key, iv, tag, 65536);
                if (!dec) {
                    key.fill(0);
                    return null;
                }

                key.fill(0);
                return JSON.parse(dec.toString('utf8'));
            } catch (e) { return null; }
        }

        // ══════════════════════════════════════════════════════════════
        // SECTION 6: Blob URL Cache & Decoy System
        //   Blob URL generation/caching, decoy data generators
        //   for security-triggered fake responses, and readChunk.
        // ══════════════════════════════════════════════════════════════

        // __SHARD_ANCHOR_B__

        // [BLOB CACHE] Plain map
        var BlobCache = Object.create(null);
        // [REF COUNTING] blobUrl -> integer (how many live consumers hold a reference)
        var BlobRefCount = Object.create(null);
        // [REVERSE LOOKUP] blobUrl -> vfsKey
        var BlobUrlToKey = Object.create(null);
        // [DEFERRED REVOKE] blobUrl -> true  (flush wanted to revoke but refCount > 0 at the time)
        var PendingRevoke = Object.create(null);
        var _decoyImageCache = Object.create(null);

        function generateDecoyImage(width, height) {
            width = width || 64;
            height = height || 64;
            var cacheKey = width + 'x' + height;
            if (_decoyImageCache[cacheKey]) return _decoyImageCache[cacheKey];

            var result;
            if (typeof document !== 'undefined') {
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext('2d');
                var imgData = ctx.createImageData(width, height);
                for (var i = 0; i < imgData.data.length; i += 4) {
                    var noise = Math.floor(Math.random() * 50) + 30;
                    imgData.data[i] = noise;
                    imgData.data[i + 1] = noise;
                    imgData.data[i + 2] = noise;
                    imgData.data[i + 3] = 255;
                }
                ctx.putImageData(imgData, 0, 0);
                ctx.fillStyle = 'rgba(100,100,100,0.3)';
                ctx.font = '10px Arial';
                ctx.fillText('ENCRYPTED', 5, height / 2);
                result = canvas.toDataURL('image/png');
            } else {
                result = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
            }
            _decoyImageCache[cacheKey] = result;
            return result;
        }

        function generateDecoyJSON() {
            return JSON.stringify({ "_encrypted": true, "_version": "2.0", "data": null });
        }

        function getBlobUrl(vfsPath) {
            var rawKey = normalizePath(vfsPath);
            var key = resolveVfsKey(rawKey, 'file');

            if (!key) { return null; }

            // [DECOY SYSTEM] Return believable fake data if security was triggered
            if (_SECURITY_TRIGGERED) {
                var ext = path.extname(key).toLowerCase();
                var decoyData;

                if (ext === '.png' || ext === '.jpg') {
                    // Return data URL directly for images
                    return generateDecoyImage(64, 64);
                } else if (ext === '.json') {
                    decoyData = (Buffer.from ? Buffer.from(generateDecoyJSON(), 'utf8') : new Buffer(generateDecoyJSON(), 'utf8'));
                    mimeType = 'application/json';
                } else if (ext === '.ogg' || ext === '.m4a') {
                    // Return tiny silent audio
                    decoyData = (Buffer.alloc ? Buffer.alloc(44) : new Buffer(44));
                    mimeType = 'audio/ogg';
                } else {
                    decoyData = (Buffer.alloc ? Buffer.alloc(0) : new Buffer(0));
                    mimeType = 'application/octet-stream';
                }

                var decoyBlob = new Blob([new Uint8Array(decoyData)], { type: mimeType });
                return URL.createObjectURL(decoyBlob);
            }

            if (BlobCache[key]) {
                return BlobCache[key];
            }

            var fullData = decryptFullFile(key);
            if (!fullData) return null;

            // ext and mimeType must be declared here, in the normal (non-security) path.
            // Previously both were only declared inside the _SECURITY_TRIGGERED block above,
            // so in normal gameplay ext was undefined, the MIME lookup silently failed, and
            // every blob received application/octet-stream. HTML rendered as plain text;
            // SVG <img> tags showed broken icons; etc.
            var ext = path.extname(key).toLowerCase();
            var mimeType = 'application/octet-stream'; // safe default
            var mimes = Object.create(null);
            // --- Images ---
            mimes['.png'] = 'image/png';
            mimes['.jpg'] = 'image/jpeg';
            mimes['.jpeg'] = 'image/jpeg';
            mimes['.gif'] = 'image/gif';
            mimes['.bmp'] = 'image/bmp';
            mimes['.webp'] = 'image/webp';
            mimes['.ico'] = 'image/x-icon';
            mimes['.svg'] = 'image/svg+xml';
            mimes['.avif'] = 'image/avif';
            mimes['.tiff'] = 'image/tiff';
            mimes['.tif'] = 'image/tiff';
            // --- RPG Maker encrypted aliases ---
            mimes['.rpgmvp'] = 'image/png';
            mimes['.rpgmvm'] = 'audio/mp4';
            mimes['.rpgmvo'] = 'audio/ogg';
            // --- Audio ---
            mimes['.ogg'] = 'audio/ogg';
            mimes['.oga'] = 'audio/ogg';
            mimes['.mp3'] = 'audio/mpeg';
            mimes['.m4a'] = 'audio/mp4';
            mimes['.aac'] = 'audio/aac';
            mimes['.wav'] = 'audio/wav';
            mimes['.flac'] = 'audio/flac';
            mimes['.opus'] = 'audio/ogg; codecs=opus';
            mimes['.mid'] = 'audio/midi';
            mimes['.midi'] = 'audio/midi';
            // --- Video ---
            mimes['.mp4'] = 'video/mp4';
            mimes['.webm'] = 'video/webm';
            mimes['.ogv'] = 'video/ogg';
            mimes['.mov'] = 'video/quicktime';
            mimes['.mkv'] = 'video/x-matroska';
            mimes['.avi'] = 'video/x-msvideo';
            // --- Text / Web ---
            mimes['.html'] = 'text/html';
            mimes['.htm'] = 'text/html';
            mimes['.css'] = 'text/css';
            mimes['.js'] = 'text/javascript';
            mimes['.mjs'] = 'text/javascript';
            mimes['.txt'] = 'text/plain';
            mimes['.xml'] = 'application/xml';
            mimes['.csv'] = 'text/csv';
            mimes['.md'] = 'text/markdown';
            // --- Data ---
            mimes['.json'] = 'application/json';
            mimes['.wasm'] = 'application/wasm';
            // --- Fonts ---
            mimes['.ttf'] = 'font/ttf';
            mimes['.woff'] = 'font/woff';
            mimes['.woff2'] = 'font/woff2';
            mimes['.otf'] = 'font/otf';
            mimes['.eot'] = 'application/vnd.ms-fontobject';
            if (Object.prototype.hasOwnProperty.call(mimes, ext)) mimeType = mimes[ext];

            var blob = new Blob([fullData], { type: mimeType });
            var url = URL.createObjectURL(blob);

            BlobCache[key] = url;
            BlobRefCount[url] = 0;
            BlobUrlToKey[url] = key;
            return url;
        }

        function readChunk(entryKey, chunkMeta, idx, expectedSize, splitIdx) {
            if (!FileDescriptor) return null;
            try {
                var buffer = Buffer.alloc(chunkMeta.size);
                var targetFd, absOffset;

                // [SPLIT] splitIdx > 0 means the data block lives in a split file.
                //         meta.offset is an absolute byte position in that split file.
                //         splitIdx is 1-based; SplitFds._names[splitIdx-1] gives the filename.
                if (splitIdx && splitIdx > 0 &&
                    typeof SplitFds !== 'undefined' && SplitFds &&
                    SplitFds._names && SplitFds._names[splitIdx - 1] &&
                    SplitFds[SplitFds._names[splitIdx - 1]] !== undefined) {
                    targetFd = SplitFds[SplitFds._names[splitIdx - 1]];
                    absOffset = chunkMeta.offset; // absolute in shard file — no ResourceStartOffset bias
                } else {
                    // Original path: data block in main bin
                    targetFd = FileDescriptor;
                    absOffset = ResourceStartOffset + chunkMeta.offset;
                }

                fs.readSync(targetFd, buffer, 0, chunkMeta.size, absOffset);

                var iv = buffer.slice(0, 12);
                var tag = buffer.slice(12, 28);
                var encData = buffer.slice(28);

                var tempKey = deriveChunkKey(entryKey, idx);
                var res = decryptAndDecompress(encData, tempKey, iv, tag, expectedSize);
                tempKey.fill(0);
                return res;
            } catch (e) { return null; }
        }

        /**
         * Decrypts a full file from VFS (handles both chunked and non-chunked).
         * @param {string} vfsKey - Normalized VFS path
         * @returns {Buffer|null} Decrypted file data, or null on failure
         */
        function decryptFullFile(vfsKey) {
            var meta = resolveFileMetadata(vfsKey);
            if (!meta) return null;

            var masterKey = getVfsKey();
            var entryKey = deriveEntryKey(masterKey, vfsKey);
            masterKey.fill(0);
            var buffer;
            var parts = [];

            // [SPLIT] meta.splitIdx (1-based, 0/absent = main bin) tells readChunk which fd to use
            var _splitIdx = meta.splitIdx || 0;

            try {
                if (meta.isChunked) {
                    for (var i = 0; i < meta.chunks.length; i++) {
                        var chunk = readChunk(entryKey, meta.chunks[i], i, 32 * 1024 * 1024, _splitIdx);
                        if (!chunk) {
                            // [SECURITY] Zero already-decrypted chunks before bailing
                            for (var j = 0; j < parts.length; j++) parts[j].fill(0);
                            return null;
                        }
                        parts.push(chunk);
                    }
                    buffer = Buffer.concat(parts);
                    // Zero individual part buffers — concat made a new copy
                    for (var k = 0; k < parts.length; k++) parts[k].fill(0);
                } else {
                    buffer = readChunk(entryKey, meta, 0, meta.origSize, _splitIdx);
                }
            } finally {
                if (entryKey && entryKey.fill) entryKey.fill(0);
            }

            return buffer || null;
        }

        // __SHARD_ANCHOR_C__

        // ══════════════════════════════════════════════════════════════
        // SECTION 7: VFS Initialization
        //   TOC parsing, index table population, boot resource
        //   injection (icon, CSS, fonts), and FontManager hook.
        // ══════════════════════════════════════════════════════════════

        var masterKey = getKey();

        if (masterKey) {
            // [BIN NAME] Preserve __BIN_NAME__ before any code deletes the env var.
            // initResourceLoader deletes process.env.__BIN_NAME__ for security, but
            // PAU (_pau_getBinPath / _pau_findAssets) runs much later and needs this
            // value. We capture it here at the top of the if(masterKey) block — the
            // earliest safe moment — and keep it in a closure variable that outlives
            // the env var. Default fallback mirrors the Packer default ('game.bin').
            var _vfsBinName = process.env.__BIN_NAME__ || 'game.bin';

            var initResourceLoader = function () {
                var basePath = path.dirname(process.mainModule.filename);
                var currentBinName = _vfsBinName; // already captured above
                delete process.env.__BIN_NAME__; // wipe env var — _vfsBinName still holds the value

                var binPath = path.join(basePath, currentBinName);

                if (!fs.existsSync(binPath)) return;

                try {
                    FileDescriptor = fs.openSync(binPath, 'r');
                    var stat = fs.fstatSync(FileDescriptor);
                    var totalLen = stat.size;

                    var footerBuffer = Buffer.alloc(16);
                    fs.readSync(FileDescriptor, footerBuffer, 0, 16, totalLen - 16);

                    ResourceStartOffset = readInt64LE(footerBuffer, 0);
                    var indexStartOffset = readInt64LE(footerBuffer, 8);

                    // ──────────────────────────────────────────────────────────
                    // [ENV BINDING] Derive the env-bound VFS key and shard it.
                    //   envBoundKey = HMAC-SHA256(masterKey, envHash)
                    //   envHash     = SHA-256(native-binaries | v8-snapshot-bytes)
                    // This must happen BEFORE TOC decryption because all VFS
                    // operations (TOC + every file) use getVfsKey(), not getKey().
                    // ──────────────────────────────────────────────────────────
                    (function () {
                        try {
                            var _emk = getKey();
                            if (!_emk) return;
                            var _enh = computeRuntimeEnvHash(basePath, binPath, ResourceStartOffset);
                            var _ebk = crypto.createHmac('sha256', _emk).update(_enh).digest();
                            _emk.fill(0); _enh.fill(0);
                            // ── Shard the env-bound key: 3-way XOR, fixed pool size ──
                            var _vfs_rng = function (len) {
                                if (typeof crypto !== 'undefined' && crypto.randomBytes) return crypto.randomBytes(len);
                                var _b = (Buffer.alloc ? Buffer.alloc(len) : new Buffer(len));
                                for (var _i = 0; _i < len; _i++) _b[_i] = Math.floor(Math.random() * 256);
                                return _b;
                            };
                            if (_vfs_pool) {
                                for (var _vwp = 0; _vwp < _vfs_pool.length; _vwp++) {
                                    if (_vfs_pool[_vwp].a) _vfs_pool[_vwp].a.fill(0);
                                    if (_vfs_pool[_vwp].b) _vfs_pool[_vwp].b.fill(0);
                                    if (_vfs_pool[_vwp].c) _vfs_pool[_vwp].c.fill(0);
                                }
                                _vfs_pool = null;
                            }
                            // Fixed pool: _FAKE_SHARD_COUNT fakes + 1 real, real slot random each time
                            var _vfs_totalSlots = _FAKE_SHARD_COUNT + 1;
                            var _vfs_realSlot = Math.floor(Math.random() * _vfs_totalSlots);
                            _vfs_pool = [];
                            for (var _vpi = 0; _vpi < _vfs_totalSlots; _vpi++) {
                                if (_vpi === _vfs_realSlot) {
                                    // Real triple: a^b^c = ebk
                                    var _va = _vfs_rng(32);
                                    var _vb = _vfs_rng(32);
                                    var _vc = (Buffer.alloc ? Buffer.alloc(32) : new Buffer(32));
                                    for (var _vsi = 0; _vsi < 32; _vsi++) _vc[_vsi] = _ebk[_vsi] ^ _va[_vsi] ^ _vb[_vsi];
                                    _vfs_pool.push({ a: _va, b: _vb, c: _vc });
                                } else {
                                    // Fake triple: all components independently random
                                    _vfs_pool.push({ a: _vfs_rng(32), b: _vfs_rng(32), c: _vfs_rng(32) });
                                }
                            }
                            _vfs_idx_mask = Math.floor(Math.random() * 0x100);
                            _vfs_real_idx = _vfs_realSlot ^ _vfs_idx_mask;
                            // Keep legacy vars null
                            _vfs_shard_a = null;
                            _vfs_shard_b = null;
                            _ebk.fill(0);
                        } catch (e) { }
                    })();

                    var indexSize = (totalLen - 16) - indexStartOffset;
                    var fullIndexBlob = Buffer.alloc(indexSize);
                    fs.readSync(FileDescriptor, fullIndexBlob, 0, indexSize, indexStartOffset);

                    var iv = fullIndexBlob.slice(0, 12);
                    var tag = fullIndexBlob.slice(12, 28);
                    var hmacProvided = fullIndexBlob.slice(fullIndexBlob.length - 32);
                    var encryptedBody = fullIndexBlob.slice(28, fullIndexBlob.length - 32);

                    // [ENV BINDING] Use env-bound VFS key for TOC HMAC + decryption
                    var _vkTOC = getVfsKey();
                    var hmacKey = crypto.createHmac('sha256', _vkTOC).update("TOC_HMAC_KEY").digest();
                    var masterHash = crypto.createHmac('sha256', _vkTOC).update("TOC_ENC_KEY").digest();
                    _vkTOC.fill(0);

                    var hmacCalc = crypto.createHmac('sha256', hmacKey).update(encryptedBody).digest();

                    if (!crypto.timingSafeEqual(hmacCalc, hmacProvided)) {
                        hmacKey.fill(0); masterHash.fill(0);
                        throw new Error("TOC Integrity Verification Failed");
                    }
                    hmacKey.fill(0);

                    var decryptedTOC = decryptAndDecompress(encryptedBody, masterHash, iv, tag);
                    masterHash.fill(0);

                    if (!decryptedTOC) throw new Error("TOC Decryption Failed");

                    var fullTOC = JSON.parse(decryptedTOC.toString('utf8'));
                    var _parsedMap = fullTOC.map || {};
                    var _parsedDirs = fullTOC.dirs || {};
                    IndexTable = Object.create(null);
                    DirMap = Object.create(null);
                    var _mk; var _dk;
                    for (_mk in _parsedMap) { if (Object.prototype.hasOwnProperty.call(_parsedMap, _mk)) IndexTable[_mk] = _parsedMap[_mk]; }
                    for (_dk in _parsedDirs) { if (Object.prototype.hasOwnProperty.call(_parsedDirs, _dk)) DirMap[_dk] = _parsedDirs[_dk]; }
                    decryptedTOC.fill(0);

                    // [SPLIT] Open file descriptors for each split bin listed in the TOC.
                    //         Split files live in the same directory as the main bin.
                    //         Index in TOC.splits[] + 1 == meta.splitIdx in file metadata.
                    var _parsedSplits = fullTOC.splits || [];
                    SplitFds = Object.create(null);
                    if (_parsedSplits.length > 0) {
                        var _splitDir = path.dirname(binPath);
                        for (var _soi = 0; _soi < _parsedSplits.length; _soi++) {
                            var _splitName = _parsedSplits[_soi];
                            if (!_splitName) continue;
                            var _splitPath = path.join(_splitDir, _splitName);
                            try {
                                if (fs.existsSync(_splitPath)) {
                                    SplitFds[_splitName] = fs.openSync(_splitPath, 'r');
                                }
                            } catch (_se) { /* non-fatal: missing split causes read failure later */ }
                        }
                    }
                    // Store splits list for fd lookup by 1-based index
                    // _parsedSplits[i] corresponds to meta.splitIdx == i+1
                    SplitFds._names = _parsedSplits;

                    // [MIRAGE FOLDER SYNTHESIS] Pack the synthesized ancestor directory set
                    // from all DirMap keys. Must be called immediately after DirMap is assigned
                    // so that all subsequent fs hook calls see the complete virtual dir tree.
                    _PackVirtualDirSet();
                } catch (e) {
                    try { emergencyWipe(); } catch (_) { }
                    return; // VFS is broken — do not attempt resource injection
                }
                // [ISOLATION] injectSystemResources is intentionally called OUTSIDE the
                // try/catch that guards the TOC open. A DOM error here (e.g. document.head
                // temporarily null, missing engine object) must NOT trigger emergencyWipe()
                // — the VFS may be fully intact while the DOM is still initialising.
                injectSystemResources();
            };

            var injectSystemResources = function () {
                var bootRes = [];
                if (isRPGMakerMZ()) {
                    bootRes = ['icon/icon.png', 'css/game.css'];
                } else {
                    bootRes = ['icon/icon.png', 'fonts/gamefont.css'];
                }
                var mk = getVfsKey();

                try {
                    bootRes.forEach(function (resPath) {
                        if (IndexTable[hashPath(resPath)]) {
                            var url = getBlobUrl(resPath);
                            if (resPath.endsWith('.css')) {
                                var meta = resolveFileMetadata(resPath);
                                var _ek = deriveEntryKey(mk, resPath);
                                var buf = readChunk(_ek, meta, 0, meta ? meta.origSize : undefined, meta ? (meta.splitIdx || 0) : 0);
                                _ek.fill(0);
                                if (buf) {
                                    var cssDir = path.dirname(resPath);
                                    var css = buf.toString('utf8').replace(/url\(\s*(?:(["'])(.*?)\1|([^)\s]+))\s*\)/g, function (match, q, u1, u2) {
                                        var u = u1 || u2;
                                        if (!u || u.startsWith('data:') || u.startsWith('blob:') || u.indexOf(':') !== -1) return match;

                                        var decodedUrl;
                                        try { decodedUrl = decodeURIComponent(u); } catch (_) { return match; }
                                        // Handle CSS escape sequences (e.g. hex sequences like \20 or escapes like \ )
                                        decodedUrl = decodedUrl.replace(/\\([0-9a-fA-F]{1,6})\s?/g, function (m, hex) {
                                            return String.fromCodePoint(parseInt(hex, 16));
                                        }).replace(/\\(.)/g, '$1');

                                        var fontPath = normalizePath(path.join(cssDir, decodedUrl));
                                        if (IndexTable[hashPath(fontPath)]) return "url('" + getBlobUrl(fontPath) + "')";
                                        return match;
                                    });
                                    var cssBlob = new Blob([css], { type: 'text/css' });
                                    var cssBlobUrl = URL.createObjectURL(cssBlob);
                                    var linkEl = document.createElement('link');
                                    linkEl.rel = 'stylesheet';
                                    linkEl.type = 'text/css';
                                    linkEl.href = cssBlobUrl;
                                    document.head.appendChild(linkEl);
                                }
                            } else if (resPath.endsWith('.png')) {
                                var link = document.createElement('link');
                                link.type = 'image/png'; link.rel = 'icon'; link.href = url;
                                document.head.appendChild(link);
                            }
                        }
                    });
                } finally {
                    // [SECURITY] Always zero the VFS key buffer regardless of success or
                    // failure. Without finally, an exception thrown inside the forEach
                    // (e.g. document.head null, CSS parse error) would leave mk in the
                    // heap until the next GC cycle.
                    if (mk) { mk.fill(0); mk = null; }
                }

                if (typeof FontFace !== 'undefined') {
                    var _NativeFontFace = FontFace;
                    window.FontFace = function (family, source, descriptors) {
                        if (typeof source === 'string') {
                            source = source.replace(/url\(\s*['"]?([^'")]+?)['"]?\s*\)/g, function (match, u) {
                                if (!u || u.startsWith('data:') || u.startsWith('blob:') || u.indexOf('://') !== -1) return match;
                                var decoded;
                                try { decoded = decodeURIComponent(u); } catch (_) { return match; }
                                var fontPath = normalizePath(decoded);
                                if (IndexTable[hashPath(fontPath)]) {
                                    var blobUrl = getBlobUrl(fontPath);
                                    if (blobUrl) return "url('" + blobUrl + "')";
                                }
                                return match;
                            });
                        }
                        return new _NativeFontFace(family, source, descriptors);
                    };
                    window.FontFace.prototype = _NativeFontFace.prototype;
                    Object.setPrototypeOf(window.FontFace, _NativeFontFace);
                }

                if (typeof FontManager !== 'undefined') {
                    var _FontManager_startLoading = FontManager.startLoading;
                    FontManager.startLoading = function (family, url) {
                        // url is like "fonts/mplus-1m-regular.woff"
                        var decodedUrl = decodeURIComponent(url);
                        var fontPath = normalizePath(decodedUrl);
                        if (IndexTable[hashPath(fontPath)]) {
                            // Font exists in VFS - use blob URL
                            var blobUrl = getBlobUrl(fontPath);

                            if (FontManager._states) {
                                var source = "url(" + blobUrl + ")";
                                var font = new FontFace(family, source);
                                FontManager._urls[family] = blobUrl;
                                FontManager._states[family] = "loading";
                                font.load()
                                    .then(function (loadedFont) {
                                        document.fonts.add(loadedFont);
                                        FontManager._states[family] = "loaded";
                                    })
                                    .catch(function (e) {
                                        console.warn('VFS Font load failed:', family, e);
                                        FontManager._states[family] = "error";
                                    });
                            } else {
                                _FontManager_startLoading.call(this, family, blobUrl);
                            }
                        } else {
                            // Fallback to original loader (for fonts on disk)
                            _FontManager_startLoading.call(this, family, url);
                        }
                    };
                }

                if (typeof Graphics !== 'undefined' && Graphics.loadFont) {
                    var _Graphics_loadFont = Graphics.loadFont;

                    Graphics._secuLoadedFonts = {};

                    Graphics.loadFont = function (name, url) {
                        var decodedUrl = decodeURIComponent(url);
                        var fontPath = normalizePath(decodedUrl);
                        var resolvedUrl = url;

                        if (IndexTable[hashPath(fontPath)]) {
                            resolvedUrl = getBlobUrl(fontPath);

                            if (typeof FontFace !== 'undefined' && document.fonts) {
                                var fontFace = new FontFace(name, 'url("' + resolvedUrl + '")');
                                fontFace.load().then(function (loadedFace) {
                                    document.fonts.add(loadedFace);
                                    Graphics._secuLoadedFonts[name] = true;
                                }).catch(function (err) {
                                    Graphics._secuLoadedFonts[name] = true;
                                    console.error('Font load failed: ' + name, err);
                                });
                            }
                        }

                        _Graphics_loadFont.call(this, name, resolvedUrl);
                    };

                    var _Graphics_isFontLoaded = Graphics.isFontLoaded;
                    Graphics.isFontLoaded = function (name) {
                        if (Graphics._secuLoadedFonts && Graphics._secuLoadedFonts[name]) {
                            return true;
                        }
                        if (_Graphics_isFontLoaded) {
                            return _Graphics_isFontLoaded.call(this, name);
                        }
                        return false;
                    };
                }
            };

            initResourceLoader();
            // [SECURITY] masterKey is no longer needed after loader init.
            // Zero and null it immediately so it doesn't linger in the heap.
            masterKey.fill(0);
            masterKey = null;

            // ══════════════════════════════════════════════════════════════
            // SECTION 8: File System Hooks
            //   Hybrid VFS mode — intercepts fs.* calls to serve
            //   files from VFS with disk fallback. Includes VFD
            //   manager for open/read/close operations.
            // ══════════════════════════════════════════════════════════════

            // --- 7A: Basic FS Hooks (existsSync, readFileSync, readFile, statSync, readdirSync) ---
            // [NATIVE MODULE BYPASS] Native binaries must bypass VFS
            function shouldBypassVFS(filePath) {
                var filename = path.basename(filePath).toLowerCase();
                return filename.endsWith('.node') || filename.endsWith('.dll');
            }

            // [STAT COMPLETENESS] Pack a fully-compliant stat-like object that
            // matches the interface of a native fs.Stats instance.
            // Native fs.Stats exposes 7 boolean-query methods; the original VFS
            // stubs only implemented 3, so callers of isBlockDevice() etc. would
            // receive undefined and crash with "undefined is not a function".
            function makeStatObject(isFile, isDir, size, time) {
                return {
                    isFile: function () { return isFile; },
                    isDirectory: function () { return isDir; },
                    isSymbolicLink: function () { return false; },
                    isBlockDevice: function () { return false; },
                    isCharacterDevice: function () { return false; },
                    isFIFO: function () { return false; },
                    isSocket: function () { return false; },
                    size: size,
                    mtime: time, atime: time, ctime: time, birthtime: time
                };
            }

            function setFsHook(methodName, hookFunc, originalRef) {
                Object.defineProperty(fs, methodName, {
                    get: function () { return hookFunc; },
                    set: function (val) {
                        originalRef.fn = val;
                    },
                    configurable: true,
                    enumerable: true
                });
            }

            var _fs_existsSync_ref = { fn: fs.existsSync };
            setFsHook('existsSync', function (p) {
                if (shouldBypassVFS(p)) {
                    return _fs_existsSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    if (resolveVfsKey(key, 'any')) return true;
                } catch (e) { }
                return _fs_existsSync_ref.fn.apply(this, arguments);
            }, _fs_existsSync_ref);

            var _fs_exists_ref = { fn: fs.exists };
            setFsHook('exists', function (p, callback) {
                if (shouldBypassVFS(p)) {
                    return _fs_exists_ref.fn.call(this, p, callback);
                }
                try {
                    var key = normalizePath(p);
                    if (resolveVfsKey(key, 'any')) {
                        if (callback) callback(true);
                        return;
                    }
                } catch (e) { }
                return _fs_exists_ref.fn.call(this, p, callback);
            }, _fs_exists_ref);

            // [READ PRIORITY] VFS -> Disk
            var _fs_readFileSync_ref = { fn: fs.readFileSync };
            setFsHook('readFileSync', function (p, options) {
                if (shouldBypassVFS(p)) {
                    return _fs_readFileSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    var resolved = resolveVfsKey(key, 'file');
                    if (resolved) {
                        var buffer = decryptFullFile(resolved);
                        if (!buffer) throw new Error("Decrypt Fail");

                        var encoding = typeof options === 'string' ? options : (options ? options.encoding : null);
                        if (encoding) { try { return buffer.toString(encoding); } catch (e) { /* unsupported encoding -> fall through to raw Buffer */ } }
                        return buffer;
                    }
                } catch (e) { }
                return _fs_readFileSync_ref.fn.apply(this, arguments);
            }, _fs_readFileSync_ref);

            var _fs_readFile_ref = { fn: fs.readFile };
            setFsHook('readFile', function (p, options, callback) {
                if (typeof options === 'function') { callback = options; options = null; }
                if (shouldBypassVFS(p)) {
                    return _fs_readFile_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    var resolved = resolveVfsKey(key, 'file');
                    if (resolved) {
                        setImmediate(function () {
                            try {
                                var buffer = decryptFullFile(resolved);
                                if (!buffer) throw new Error("Decrypt Fail");
                                var encoding = typeof options === 'string' ? options : (options ? options.encoding : null);
                                var result = buffer;
                                if (encoding) { try { result = buffer.toString(encoding); } catch (e) { /* unsupported encoding -> raw Buffer */ } }
                                if (callback) callback(null, result);
                            } catch (err) { if (callback) callback(err); }
                        });
                        return;
                    }
                } catch (e) { }
                return _fs_readFile_ref.fn.apply(this, arguments);
            }, _fs_readFile_ref);

            // [HYBRID STAT] Merge Stats
            var _fs_statSync_ref = { fn: fs.statSync };
            setFsHook('statSync', function (p) {
                if (shouldBypassVFS(p)) {
                    return _fs_statSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    // 1. Is it a VFS File?
                    var resolvedFile = resolveVfsKey(key, 'file');
                    if (resolvedFile) {
                        var meta = resolveFileMetadata(resolvedFile);
                        if (meta) {
                            var mtime = new Date(meta.mtime);
                            return makeStatObject(true, false, meta.origSize, mtime);
                        }
                    }
                    // 2. Is it a VFS Directory (explicit in DirMap or synthesized via Mirage)?
                    var resolvedDir = resolveVfsKey(key, 'dir');
                    if (resolvedDir) {
                        // Check if it exists on disk too (Hybrid)
                        try {
                            return _fs_statSync_ref.fn.apply(this, arguments);
                        } catch (e) {
                            return makeStatObject(false, true, 0, new Date());
                        }
                    }
                } catch (e) { }
                return _fs_statSync_ref.fn.apply(this, arguments);
            }, _fs_statSync_ref);

            var _fs_lstatSync_ref = { fn: fs.lstatSync };
            setFsHook('lstatSync', function (p) {
                if (shouldBypassVFS(p)) {
                    return _fs_lstatSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    // 1. Is it a VFS File?
                    var resolvedFile = resolveVfsKey(key, 'file');
                    if (resolvedFile) {
                        var meta = resolveFileMetadata(resolvedFile);
                        if (meta) {
                            var mtime = new Date(meta.mtime);
                            return makeStatObject(true, false, meta.origSize, mtime);
                        }
                    }
                    // 2. Is it a VFS Directory?
                    var resolvedDir = resolveVfsKey(key, 'dir');
                    if (resolvedDir) {
                        try {
                            return _fs_lstatSync_ref.fn.apply(this, arguments);
                        } catch (e) {
                            return makeStatObject(false, true, 0, new Date());
                        }
                    }
                } catch (e) { }
                return _fs_lstatSync_ref.fn.apply(this, arguments);
            }, _fs_lstatSync_ref);

            // [HYBRID READDIR] Merge VFS List + Disk List (Deduplicated)
            var _fs_readdirSync_ref = { fn: fs.readdirSync };
            var _nodeArray = (function () {
                try {
                    // Use the executable directory — always exists and is small.
                    var _probe = _fs_readdirSync_ref.fn(path.dirname(process.mainModule.filename));
                    return _probe.constructor; // Node-context Array
                } catch (e) {
                    return Array; // fallback (unified-context NW.js or test env)
                }
            })();

            // Helper: create a Node-context array from a plain JS array.
            function _makeNodeArray(src) {
                var out = new _nodeArray(src.length);
                for (var _i = 0; _i < src.length; _i++) out[_i] = src[_i];
                return out;
            }

            setFsHook('readdirSync', function (p, options) {
                var vfsFiles = [];
                var diskFiles = [];
                var key = normalizePath(p);
                if (!key) return _fs_readdirSync_ref.fn.apply(this, arguments);

                // 1. Get VFS List (explicit DirMap entry OR synthesized via Mirage Folder Synthesis)
                var resolvedDir = resolveVfsKey(key, 'dir');
                if (resolvedDir) {
                    vfsFiles = getVirtualDirChildren(resolvedDir);
                }

                // 2. Get Disk List (Safe Try-Catch)
                try {
                    diskFiles = _fs_readdirSync_ref.fn.apply(this, arguments);
                } catch (e) {
                    // Ignored if disk folder missing (pure VFS)
                }

                // 3. Merge & Deduplicate
                if (vfsFiles.length > 0 && diskFiles.length > 0) {
                    var mergedSet = {};
                    for (var i = 0; i < vfsFiles.length; i++) mergedSet[vfsFiles[i]] = true;
                    for (var j = 0; j < diskFiles.length; j++) mergedSet[diskFiles[j]] = true;
                    return _makeNodeArray(Object.keys(mergedSet).sort());
                }

                if (vfsFiles.length > 0) return _makeNodeArray(vfsFiles.sort());
                if (diskFiles.length > 0) return diskFiles; // Native array — already correct

                // [MIRAGE FOLDER SYNTHESIS] If this is a recognized virtual directory but it
                // has no children (empty or purely an ancestor node), swallow the ENOENT and
                // return a Node-context empty array.
                if (resolveVfsKey(key, 'dir')) return new _nodeArray(0);

                // Fallback to native error if truly unknown path
                return _fs_readdirSync_ref.fn.apply(this, arguments);
            }, _fs_readdirSync_ref);

            // [HYBRID READDIR ASYNC] Merge VFS List + Disk List (Async)
            var _fs_readdir_ref = { fn: fs.readdir };
            setFsHook('readdir', function (p, options, callback) {
                if (typeof options === 'function') { callback = options; options = null; }
                var vfsFiles = [];
                var key = normalizePath(p);
                if (!key) { _fs_readdir_ref.fn.call(this, p, options, callback); return; }

                // 1. Get VFS List (explicit DirMap entry OR synthesized via Mirage Folder Synthesis)
                var resolvedDir = resolveVfsKey(key, 'dir');
                if (resolvedDir) {
                    vfsFiles = getVirtualDirChildren(resolvedDir);
                }

                // 2. Get Disk List (Safe)
                _fs_readdir_ref.fn.call(this, p, options, function (err, diskFiles) {
                    if (err) diskFiles = [];

                    // 3. Merge & Deduplicate
                    if (vfsFiles.length > 0 && diskFiles.length > 0) {
                        var mergedSet = {};
                        for (var i = 0; i < vfsFiles.length; i++) mergedSet[vfsFiles[i]] = true;
                        for (var j = 0; j < diskFiles.length; j++) mergedSet[diskFiles[j]] = true;
                        if (callback) callback(null, _makeNodeArray(Object.keys(mergedSet).sort()));
                    } else if (vfsFiles.length > 0) {
                        if (callback) callback(null, _makeNodeArray(vfsFiles.sort()));
                    } else if (diskFiles.length > 0) {
                        if (callback) callback(null, diskFiles);
                    } else if (resolveVfsKey(key, 'dir')) {
                        // [MIRAGE FOLDER SYNTHESIS] Known virtual directory with no children —
                        // return Node-context empty array.
                        if (callback) callback(null, new _nodeArray(0));
                    } else if (err) {
                        if (callback) callback(err);
                    } else {
                        if (callback) callback(null, new _nodeArray(0));
                    }
                });
            }, _fs_readdir_ref);

            var _fs_accessSync_ref = { fn: fs.accessSync };
            setFsHook('accessSync', function (p, mode) {
                if (shouldBypassVFS(p)) {
                    return _fs_accessSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    if (resolveVfsKey(key, 'any')) {
                        return undefined;
                    }
                } catch (e) { }
                return _fs_accessSync_ref.fn.apply(this, arguments);
            }, _fs_accessSync_ref);

            var _fs_realpathSync_ref = { fn: fs.realpathSync };
            setFsHook('realpathSync', function (p, options) {
                if (shouldBypassVFS(p)) {
                    return _fs_realpathSync_ref.fn.apply(this, arguments);
                }
                try {
                    var key = normalizePath(p);
                    var resolved = resolveVfsKey(key, 'any');
                    if (resolved) {
                        var _rpBase = path.dirname(process.mainModule.filename);
                        return path.join(_rpBase, resolved.replace(/\//g, path.sep));
                    }
                } catch (e) { }
                return _fs_realpathSync_ref.fn.apply(this, arguments);
            }, _fs_realpathSync_ref);

            // --- 7B: Virtual File Descriptor (VFD) Manager ---
            var VFD_BASE = 50000;
            var VFD_COUNTER = VFD_BASE;
            var VFD_MAP = Object.create(null); // { fd: { path, position, size, entryKey, meta, isChunked, chunks } }
            var VFD_FREE_POOL = []; // Recycled fd numbers, avoids unbounded VFD_COUNTER growth

            function allocateVFD(vfsPath) {
                var key = normalizePath(vfsPath);
                var meta = resolveFileMetadata(key);
                if (!meta) return null;

                // Reuse a recycled fd if available, otherwise increment counter
                var fd = VFD_FREE_POOL.length > 0 ? VFD_FREE_POOL.pop() : VFD_COUNTER++;
                var masterKey = getVfsKey();
                var entryKey = deriveEntryKey(masterKey, key);
                masterKey.fill(0);

                VFD_MAP[fd] = {
                    path: key,
                    position: 0,
                    size: meta.origSize,
                    entryKey: entryKey, // Store derived key (will be zeroized on close)
                    meta: meta,
                    isChunked: meta.isChunked || false,
                    chunks: meta.chunks || null
                };

                return fd;
            }

            function deallocateVFD(fd) {
                if (!VFD_MAP[fd]) return;
                // [SECURITY] Zeroize keys before deletion
                if (VFD_MAP[fd].entryKey) VFD_MAP[fd].entryKey.fill(0);
                delete VFD_MAP[fd];
                // Return fd to the pool for reuse
                VFD_FREE_POOL.push(fd);
            }
            function readFromVFD(fd, buffer, offset, length, position) {
                var state = VFD_MAP[fd];
                if (!state) return -1;

                var readPos = (position !== null && position !== undefined) ? position : state.position;
                if (readPos >= state.size) return 0; // EOF

                var actualLength = Math.min(length, state.size - readPos);
                if (actualLength <= 0) return 0; // guard: nothing to read
                var tempBuffer;

                try {
                    if (state.isChunked) {
                        var chunkSize = CHUNK_SIZE;
                        var firstChunk = Math.floor(readPos / chunkSize);
                        var lastChunk = Math.floor((readPos + actualLength - 1) / chunkSize);
                        lastChunk = Math.min(lastChunk, state.chunks.length - 1);

                        var allData = [];
                        var bytesBefore = firstChunk * chunkSize;
                        for (var i = firstChunk; i <= lastChunk; i++) {
                            var chunkData = readChunk(state.entryKey, state.chunks[i], i);
                            if (!chunkData) throw new Error("VFD Chunk Read Fail");
                            allData.push(chunkData);
                        }
                        tempBuffer = Buffer.concat(allData);
                        // relativePos: offset within the fetched buffer where our data starts
                        var relativePos = readPos - bytesBefore;
                        var slice = tempBuffer.slice(relativePos, relativePos + actualLength);
                        slice.copy(buffer, offset);
                    } else {
                        tempBuffer = readChunk(state.entryKey, state.meta, 0);
                        if (!tempBuffer) throw new Error("VFD Read Fail");
                        var slice = tempBuffer.slice(readPos, readPos + actualLength);
                        slice.copy(buffer, offset);
                    }

                    // Update position (always use absolute readPos)
                    if (position === null || position === undefined) {
                        state.position = readPos + actualLength;
                    }

                    return actualLength;
                } catch (e) {
                    return -1;
                }
            }

            // --- 7C: Advanced FS Hooks (open, read, close, createReadStream) ---
            var _fs_open_ref = { fn: fs.open };
            var _fs_openSync_ref = { fn: fs.openSync };

            setFsHook('openSync', function (p, flags, mode) {
                try {
                    var key = normalizePath(p);
                    var resolved = resolveVfsKey(key, 'file');
                    if (resolved) {
                        var vfd = allocateVFD(resolved);
                        if (vfd) return vfd;
                    }
                } catch (e) { }
                return _fs_openSync_ref.fn.apply(this, arguments);
            }, _fs_openSync_ref);

            setFsHook('open', function (p, flags, mode, callback) {
                if (typeof mode === 'function') { callback = mode; mode = null; }
                try {
                    var key = normalizePath(p);
                    var resolved = resolveVfsKey(key, 'file');
                    if (resolved) {
                        setImmediate(function () {
                            var vfd = allocateVFD(resolved);
                            if (vfd && callback) callback(null, vfd);
                            else if (callback) callback(new Error("VFD Allocation Failed"));
                        });
                        return;
                    }
                } catch (e) { }
                return _fs_open_ref.fn.apply(this, arguments);
            }, _fs_open_ref);

            // Hook fs.read / fs.readSync
            var _fs_read_ref = { fn: fs.read };
            var _fs_readSync_ref = { fn: fs.readSync };

            setFsHook('readSync', function (fd, buffer, offset, length, position) {
                if (fd >= VFD_BASE && VFD_MAP[fd]) {
                    return readFromVFD(fd, buffer, offset, length, position);
                }
                return _fs_readSync_ref.fn.apply(this, arguments);
            }, _fs_readSync_ref);

            setFsHook('read', function (fd, buffer, offset, length, position, callback) {
                if (fd >= VFD_BASE && VFD_MAP[fd]) {
                    setImmediate(function () {
                        try {
                            var bytesRead = readFromVFD(fd, buffer, offset, length, position);
                            if (callback) callback(null, bytesRead, buffer);
                        } catch (err) {
                            if (callback) callback(err);
                        }
                    });
                    return;
                }
                return _fs_read_ref.fn.apply(this, arguments);
            }, _fs_read_ref);

            // Hook fs.close / fs.closeSync
            var _fs_close_ref = { fn: fs.close };
            var _fs_closeSync_ref = { fn: fs.closeSync };

            setFsHook('closeSync', function (fd) {
                if (fd >= VFD_BASE && VFD_MAP[fd]) {
                    deallocateVFD(fd);
                    return; // Success (no error)
                }
                return _fs_closeSync_ref.fn.apply(this, arguments);
            }, _fs_closeSync_ref);

            setFsHook('close', function (fd, callback) {
                if (fd >= VFD_BASE && VFD_MAP[fd]) {
                    deallocateVFD(fd);
                    if (callback) setImmediate(function () { callback(null); });
                    return;
                }
                return _fs_close_ref.fn.apply(this, arguments);
            }, _fs_close_ref);

            // Hook fs.createReadStream
            var _fs_createReadStream_ref = { fn: fs.createReadStream };
            var stream = require('stream');

            setFsHook('createReadStream', function (p, options) {
                try {
                    var key = normalizePath(p);
                    if (IndexTable[hashPath(key)]) {
                        var fullData = decryptFullFile(key);
                        if (!fullData) throw new Error("Stream Decrypt Fail");

                        // Create a Readable stream from the decrypted buffer
                        var readableStream = new stream.Readable();
                        readableStream.push(fullData);
                        readableStream.push(null); // Signal EOF
                        return readableStream;
                    }
                } catch (e) { }
                return _fs_createReadStream_ref.fn.apply(this, arguments);
            }, _fs_createReadStream_ref);

            // --- 7D: fs.promises API Hooks ---
            if (fs.promises && typeof fs.promises === 'object') {
                // ── promises.readdir ──────────────────────────────────
                var _fsp_readdir = fs.promises.readdir.bind(fs.promises);
                Object.defineProperty(fs.promises, 'readdir', {
                    get: function () {
                        return function (p, options) {
                            if (shouldBypassVFS(p)) return _fsp_readdir(p, options);
                            var vfsFiles = [];
                            var key = normalizePath(p);
                            if (!key) return _fsp_readdir(p, options);

                            var resolvedDir = resolveVfsKey(key, 'dir');
                            if (resolvedDir) vfsFiles = getVirtualDirChildren(resolvedDir);

                            return _fsp_readdir(p, options)
                                .then(function (diskFiles) {
                                    if (vfsFiles.length > 0 && diskFiles.length > 0) {
                                        var m = {};
                                        vfsFiles.forEach(function (f) { m[f] = true; });
                                        diskFiles.forEach(function (f) { m[f] = true; });
                                        return _makeNodeArray(Object.keys(m).sort());
                                    }
                                    return vfsFiles.length > 0 ? _makeNodeArray(vfsFiles.sort()) : diskFiles;
                                })
                                .catch(function () {
                                    if (vfsFiles.length > 0) return _makeNodeArray(vfsFiles.sort());
                                    if (resolveVfsKey(key, 'dir')) return new _nodeArray(0);
                                    return _fsp_readdir(p, options);
                                });
                        };
                    },
                    configurable: true, enumerable: true
                });

                // ── promises.readFile ─────────────────────────────────
                var _fsp_readFile = fs.promises.readFile.bind(fs.promises);
                Object.defineProperty(fs.promises, 'readFile', {
                    get: function () {
                        return function (p, options) {
                            if (shouldBypassVFS(p)) return _fsp_readFile(p, options);
                            try {
                                var key = normalizePath(p);
                                var resolved = resolveVfsKey(key, 'file');
                                if (resolved) {
                                    var data = decryptFullFile(resolved);
                                    if (data) {
                                        var enc = (options && typeof options === 'object') ? options.encoding : options;
                                        return Promise.resolve(enc ? data.toString(enc) : data);
                                    }
                                }
                            } catch (e) { }
                            return _fsp_readFile(p, options);
                        };
                    },
                    configurable: true, enumerable: true
                });

                // ── promises.stat ─────────────────────────────────────
                var _fsp_stat = fs.promises.stat.bind(fs.promises);
                Object.defineProperty(fs.promises, 'stat', {
                    get: function () {
                        return function (p, options) {
                            if (shouldBypassVFS(p)) return _fsp_stat(p, options);
                            try {
                                var key = normalizePath(p);
                                var rf = resolveVfsKey(key, 'file');
                                if (rf) {
                                    var meta = resolveFileMetadata(rf);
                                    if (meta) {
                                        var mt = new Date(meta.mtime);
                                        return Promise.resolve(makeStatObject(true, false, meta.origSize, mt));
                                    }
                                }
                                var rd = resolveVfsKey(key, 'dir');
                                if (rd) {
                                    return _fsp_stat(p, options).catch(function () {
                                        return makeStatObject(false, true, 0, new Date());
                                    });
                                }
                            } catch (e) { }
                            return _fsp_stat(p, options);
                        };
                    },
                    configurable: true, enumerable: true
                });

                // ── promises.lstat ────────────────────────────────────
                var _fsp_lstat = fs.promises.lstat.bind(fs.promises);
                Object.defineProperty(fs.promises, 'lstat', {
                    get: function () {
                        return function (p, options) {
                            if (shouldBypassVFS(p)) return _fsp_lstat(p, options);
                            try {
                                var key = normalizePath(p);
                                var rf = resolveVfsKey(key, 'file');
                                if (rf) {
                                    var meta = resolveFileMetadata(rf);
                                    if (meta) {
                                        var mt = new Date(meta.mtime);
                                        return Promise.resolve(makeStatObject(true, false, meta.origSize, mt));
                                    }
                                }
                                var rd = resolveVfsKey(key, 'dir');
                                if (rd) {
                                    return _fsp_lstat(p, options).catch(function () {
                                        return makeStatObject(false, true, 0, new Date());
                                    });
                                }
                            } catch (e) { }
                            return _fsp_lstat(p, options);
                        };
                    },
                    configurable: true, enumerable: true
                });

                // ── promises.access ───────────────────────────────────
                var _fsp_access = fs.promises.access.bind(fs.promises);
                Object.defineProperty(fs.promises, 'access', {
                    get: function () {
                        return function (p, mode) {
                            if (shouldBypassVFS(p)) return _fsp_access(p, mode);
                            try {
                                var key = normalizePath(p);
                                if (resolveVfsKey(key, 'any')) return Promise.resolve(undefined);
                            } catch (e) { }
                            return _fsp_access(p, mode);
                        };
                    },
                    configurable: true, enumerable: true
                });
            }

            // ══════════════════════════════════════════════════════════════
            // SECTION 9: RPG Maker Engine Hooks
            //   URL interception for Graphics, Bitmap, WebAudio,
            //   Html5Audio, XMLHttpRequest, fetch, and Image.src.
            // ══════════════════════════════════════════════════════════════

            function getVirtualUrl(url) {
                try {
                    // [SAFETY] Skip if already processed or is data URI
                    if (url.indexOf('blob:') === 0 || url.indexOf('data:') === 0) {
                        if (url.indexOf('blob:') === 0) {
                            var _nestedBlobIdx = url.indexOf('/blob:', 5);
                            if (_nestedBlobIdx !== -1) {
                                return url.substring(_nestedBlobIdx + 1);
                            }
                        }
                        return url;
                    }

                    function safeDecodeURI(str) {
                        try {
                            return decodeURIComponent(str);
                        } catch (e) {
                            return str.replace(/(%[0-9A-Fa-f]{2})+/g, function (match) {
                                try {
                                    return decodeURIComponent(match);
                                } catch (err) {
                                    return match;
                                }
                            });
                        }
                    }

                    var decoded = safeDecodeURI(url);

                    // Handle chrome-extension:// URLs (NW.js internal format)
                    if (decoded.indexOf('chrome-extension://') === 0) {
                        var withoutProtocol = decoded.substring(19);
                        var firstSlash = withoutProtocol.indexOf('/');
                        if (firstSlash !== -1) {
                            decoded = withoutProtocol.substring(firstSlash + 1);
                        }
                    }
                    // Handle file:// protocol with robust relativization
                    else if (decoded.indexOf('file://') === 0) {
                        var _rawPath = decoded.replace(/^file:\/\/\//, '').replace(/^file:\/\//, '').replace(/\\/g, '/');
                        var _basePath = path.dirname(process.mainModule.filename).replace(/\\/g, '/');

                        if (_rawPath.toLowerCase().indexOf(_basePath.toLowerCase()) === 0) {
                            decoded = _rawPath.substring(_basePath.length).replace(/^\/+/, '');
                        } else {
                            decoded = _rawPath;
                        }
                    } else {
                        decoded = decoded.replace(/^\/+/, '');
                    }

                    var cleanPath = decoded.split('?')[0];
                    var key = normalizePath(cleanPath);
                    if (!key) return url;
                    var blobUrl = getBlobUrl(key);

                    return blobUrl || url;
                } catch (e) {
                    return url;
                }
            }

            var _Graphics_setLoadingImage = Graphics.setLoadingImage;
            Graphics.setLoadingImage = function (src) { _Graphics_setLoadingImage.call(this, _earlyBlobResolve ? getVirtualUrl(src) : src); };

            // ── [V8 SNAPSHOT HELPERS] ─────────────────────────────────────────────
            // Shared utilities used by the XHR, fetch, and HTMLScriptElement hooks.
            //
            // _isV8SnapshotFile(url)
            //   Returns true when url resolves to a file already baked into the
            //   V8 snapshot (__SECU_V8_FILES__ is injected by the packer at Pack
            //   time; keys are normalizePath()-normalized lowercase paths).
            //
            // _getV8EmptyScriptUrl()
            //   Lazily creates ONE shared empty-JS blob URL and reuses it for all
            //   script-tag cache-hit redirects.  A single never-revoked blob URL is
            //   cheaper than creating + revoking one per request.
            //   (fetch/XHR return an empty Response directly, no blob URL needed.)
            // ─────────────────────────────────────────────────────────────────────
            function _isV8SnapshotFile(url) {
                if (!url || typeof url !== 'string') return false;
                if (url.indexOf('blob:') === 0 || url.indexOf('data:') === 0) return false;
                try {
                    if (typeof __SECU_V8_FILES__ === 'undefined' || !__SECU_V8_FILES__) return false;
                    var _k = normalizePath(url.split('?')[0]);
                    return !!(_k && __SECU_V8_FILES__[_k]);
                } catch (_e) { return false; }
            }

            var _v8EmptyScriptUrl = null;
            function _getV8EmptyScriptUrl() {
                if (!_v8EmptyScriptUrl) {
                    try {
                        _v8EmptyScriptUrl = URL.createObjectURL(
                            new Blob([''], { type: 'text/javascript' })
                        );
                    } catch (_e) { return null; }
                }
                return _v8EmptyScriptUrl;
            }
            // ─────────────────────────────────────────────────────────────────────

            var _xhr_open = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function (method, url) {
                var args = Array.prototype.slice.call(arguments);
                if (typeof url === 'string') {
                    // [V8 SNAPSHOT GUARD] Already executed via snapshot -> empty response.
                    // Prevents re-execution if a plugin does eval(xhr.responseText).
                    if (_isV8SnapshotFile(url)) {
                        var _eu = _getV8EmptyScriptUrl();
                        if (_eu) { args[1] = _eu; return _xhr_open.apply(this, args); }
                    }
                    args[1] = getVirtualUrl(url);
                }
                return _xhr_open.apply(this, args);
            };

            // [FETCH SUPPORT] Intercept fetch for VFS support
            var _window_fetch = window.fetch;
            window.fetch = function (input, init) {
                if (typeof input === 'string') {
                    // [V8 SNAPSHOT GUARD] Return an empty resolved Response immediately.
                    if (_isV8SnapshotFile(input)) {
                        return Promise.resolve(new Response('', {
                            status: 200,
                            headers: { 'Content-Type': 'text/javascript' }
                        }));
                    }
                    input = getVirtualUrl(input);
                } else if (input instanceof Request) {
                    try {
                        if (input.url) {
                            if (_isV8SnapshotFile(input.url)) {
                                return Promise.resolve(new Response('', {
                                    status: 200,
                                    headers: { 'Content-Type': 'text/javascript' }
                                }));
                            }
                            var newUrl = getVirtualUrl(input.url);
                            if (newUrl !== input.url) {
                                input = new Request(newUrl, input);
                            }
                        }
                    } catch (e) { }
                }
                return _window_fetch.call(this, input, init);
            };

            (function () {
                if (typeof window === 'undefined' || typeof window.open !== 'function') return;

                var _win_open_orig = window.open;

                // Resolve a relative asset path against the VFS directory of the HTML file.
                // Returns a blob URL if the asset exists in VFS, otherwise null.
                function _resolveAsset(attrVal, vfsDir) {
                    if (!attrVal || typeof attrVal !== 'string') return null;
                    if (attrVal.indexOf(':') !== -1) return null;  // absolute (http:, blob:, data:…)
                    if (attrVal.charAt(0) === '#') return null;    // anchor
                    var _resolved;
                    if (attrVal.charAt(0) === '/') {
                        _resolved = normalizePath(attrVal.replace(/^\/+/, ''));
                    } else {
                        _resolved = normalizePath(vfsDir + attrVal);
                    }
                    if (!_resolved) return null;
                    var _vKey = resolveVfsKey(_resolved, 'file');
                    if (!_vKey) return null;
                    return getBlobUrl(_vKey);
                }

                // Check if a URL (before query string) resolves to a VFS HTML file.
                // Returns the VFS key, or null if not found / not HTML.
                function _getVfsHtmlKey(rawUrl) {
                    if (!rawUrl || typeof rawUrl !== 'string') return null;
                    var _qIdx = rawUrl.indexOf('?');
                    var _base = _qIdx !== -1 ? rawUrl.substring(0, _qIdx) : rawUrl;
                    var _norm = normalizePath(_base);
                    if (!_norm) return null;
                    var _vKey = resolveVfsKey(_norm, 'file');
                    if (!_vKey) return null;
                    var _ext = path.extname(_vKey).toLowerCase();
                    return (_ext === '.html' || _ext === '.htm') ? _vKey : null;
                }

                function _writeVfsHtml(childWin, vKey) {
                    try {
                        var _raw = decryptFullFile(vKey);
                        if (!_raw) return false;
                        var _htmlStr = _raw.toString('utf8');

                        // VFS directory of this HTML file, for relative path resolution.
                        var _vfsDir = vKey.indexOf('/') !== -1
                            ? vKey.substring(0, vKey.lastIndexOf('/') + 1)
                            : '';

                        // Parse into a real DOM tree — handles <script> content, comments,
                        // and malformed markup correctly without any regex.
                        var _parser = new DOMParser();
                        var _doc = _parser.parseFromString(_htmlStr, 'text/html');

                        // ── src="..." ──
                        // Targets only elements that actually load external resources.
                        var _srcEls = _doc.querySelectorAll(
                            'img[src], script[src], audio[src], video[src], ' +
                            'source[src], track[src], embed[src], iframe[src], input[src]'
                        );
                        for (var _i = 0; _i < _srcEls.length; _i++) {
                            var _blob = _resolveAsset(_srcEls[_i].getAttribute('src'), _vfsDir);
                            if (_blob) _srcEls[_i].setAttribute('src', _blob);
                        }

                        // ── href="..." ── stylesheet links only
                        var _linkEls = _doc.querySelectorAll('link[href]');
                        for (var _j = 0; _j < _linkEls.length; _j++) {
                            var _blob = _resolveAsset(_linkEls[_j].getAttribute('href'), _vfsDir);
                            if (_blob) _linkEls[_j].setAttribute('href', _blob);
                        }

                        // ── url(...) inside <style> blocks ──
                        var _styleEls = _doc.querySelectorAll('style');
                        for (var _k = 0; _k < _styleEls.length; _k++) {
                            var _css = _styleEls[_k].textContent;
                            _styleEls[_k].textContent = _css.replace(
                                /url\(\s*(['"]?)(.*?)\1\s*\)/gi,
                                function (m, q, val) {
                                    if (!val || val.indexOf(':') !== -1) return m;
                                    var _blob = _resolveAsset(val, _vfsDir);
                                    return _blob ? "url('" + _blob + "')" : m;
                                }
                            );
                        }

                        // Serialize back to HTML string and inject into the child window.
                        var _rewritten = '<!DOCTYPE html>\n' + _doc.documentElement.outerHTML;
                        childWin.document.open();
                        childWin.document.write(_rewritten);
                        childWin.document.close();
                        return true;
                    } catch (e) { return false; }
                }

                window.open = function (url, name, features) {
                    // ── Pattern A: URL given directly ──
                    if (typeof url === 'string' && url !== '' && url !== 'about:blank') {
                        var _htmlKeyA = _getVfsHtmlKey(url);
                        if (_htmlKeyA) {
                            // Open blank, write HTML into it — no file:// navigation needed.
                            var _childA = _win_open_orig.call(this, 'about:blank', name, features);
                            if (_childA) _writeVfsHtml(_childA, _htmlKeyA);
                            return _childA;
                        }
                        // Non-HTML VFS file (image, audio…): use blob URL as before.
                        var _qIdx = url.indexOf('?');
                        var _base = _qIdx !== -1 ? url.substring(0, _qIdx) : url;
                        var _vUrl = getVirtualUrl(_base);
                        if (_vUrl !== _base) url = _vUrl;
                    }

                    var _childWin = _win_open_orig.call(this, url, name, features);
                    if (!_childWin || typeof Proxy === 'undefined') return _childWin;

                    // ── Pattern B: blank then navigate — intercept location.href ──
                    function _makeLocationProxy(realLoc) {
                        return new Proxy(realLoc, {
                            get: function (locTarget, locProp) {
                                var _lv = locTarget[locProp];
                                return (typeof _lv === 'function') ? _lv.bind(locTarget) : _lv;
                            },
                            set: function (locTarget, locProp, value) {
                                if (locProp === 'href' && typeof value === 'string') {
                                    var _htmlKeyB = _getVfsHtmlKey(value);
                                    if (_htmlKeyB) {
                                        // Intercept: write HTML instead of navigating.
                                        // _childWin is captured from outer closure.
                                        _writeVfsHtml(_childWin, _htmlKeyB);
                                        return true;
                                    }
                                    // Non-HTML VFS file: substitute blob URL.
                                    var _hqIdx = value.indexOf('?');
                                    var _hBase = _hqIdx !== -1 ? value.substring(0, _hqIdx) : value;
                                    var _vHref = getVirtualUrl(_hBase);
                                    locTarget.href = (_vHref !== _hBase) ? _vHref : value;
                                    return true;
                                }
                                try { locTarget[locProp] = value; } catch (e) { }
                                return true;
                            }
                        });
                    }

                    return new Proxy(_childWin, {
                        get: function (winTarget, winProp) {
                            if (winProp === 'location') {
                                try { return _makeLocationProxy(winTarget.location); }
                                catch (e) { return winTarget.location; }
                            }
                            var _wv = winTarget[winProp];
                            return (typeof _wv === 'function') ? _wv.bind(winTarget) : _wv;
                        },
                        set: function (winTarget, winProp, value) {
                            winTarget[winProp] = value;
                            return true;
                        }
                    });
                };
            })();

            if (typeof CSSStyleSheet !== 'undefined') {
                var _orig_insertRule = CSSStyleSheet.prototype.insertRule;
                if (_orig_insertRule) {
                    CSSStyleSheet.prototype.insertRule = function (rule, index) {
                        if (typeof rule === 'string' && rule.indexOf('url(') !== -1) {
                            rule = rule.replace(/url\(\s*(?:(["'])(.*?)\1|([^)\s]+))\s*\)/g, function (match, q, u1, u2) {
                                var u = u1 || u2;
                                if (!u || u.startsWith('data:') || u.startsWith('blob:') || u.indexOf(':') !== -1) return match;
                                var cleanUrl;
                                try { cleanUrl = decodeURIComponent(u).replace(/^(\.\.\/)+/, ''); } catch (_) { return match; }
                                var vUrl = getVirtualUrl(cleanUrl);
                                if (vUrl !== cleanUrl) return "url('" + vUrl + "')";
                                return match;
                            });
                        }
                        return _orig_insertRule.call(this, rule, index);
                    };
                }

                var _orig_addRule = CSSStyleSheet.prototype.addRule;
                if (_orig_addRule) {
                    CSSStyleSheet.prototype.addRule = function (selector, style, index) {
                        if (typeof style === 'string' && style.indexOf('url(') !== -1) {
                            style = style.replace(/url\(\s*(?:(["'])(.*?)\1|([^)\s]+))\s*\)/g, function (match, q, u1, u2) {
                                var u = u1 || u2;
                                if (!u || u.startsWith('data:') || u.startsWith('blob:') || u.indexOf(':') !== -1) return match;
                                var cleanUrl;
                                try { cleanUrl = decodeURIComponent(u).replace(/^(\.\.\/)+/, ''); } catch (_) { return match; }
                                var vUrl = getVirtualUrl(cleanUrl);
                                if (vUrl !== cleanUrl) return "url('" + vUrl + "')";
                                return match;
                            });
                        }
                        return _orig_addRule.call(this, selector, style, index);
                    };
                }
            }

            // [GENERIC] Hook element .src setter to route through VFS
            function _trackBlobRef(element, blobUrl) {
                _addBlobRef(blobUrl);
                var _isMedia = (element.tagName === 'VIDEO' || element.tagName === 'AUDIO');
                var _onDone = function () {
                    element.removeEventListener('load', _onDone);
                    element.removeEventListener('error', _onDone);
                    element.removeEventListener('ended', _onDone);
                    _releaseBlobRef(blobUrl);
                };
                if (_isMedia) {
                    element.addEventListener('ended', _onDone);
                    element.addEventListener('error', _onDone);
                } else {
                    element.addEventListener('load', _onDone);
                    element.addEventListener('error', _onDone);
                }
            }

            function hookElementSrcSetter(ElementProto) {
                if (typeof ElementProto === 'undefined') return;
                var descriptor = Object.getOwnPropertyDescriptor(ElementProto, 'src');
                if (!descriptor || !descriptor.set) return;

                Object.defineProperty(ElementProto, 'src', {
                    get: function () {
                        // Return original file path if available to prevent .replace() on blob URLs
                        return this._secuOriginalSrc || descriptor.get.call(this);
                    },
                    set: function (value) {
                        if (typeof value === 'string' && value.length > 0) {
                            if (!value.startsWith('blob:') && !value.startsWith('data:')) {
                                this._secuOriginalSrc = value;
                                var converted = getVirtualUrl(value);
                                if (converted !== value && converted.startsWith('blob:')) {
                                    _trackBlobRef(this, converted);
                                }
                                value = converted;
                            } else if (value.startsWith('blob:') && BlobUrlToKey[value] !== undefined) {
                                if (!this._secuOriginalSrc) {
                                    this._secuOriginalSrc = BlobUrlToKey[value];
                                }
                                _trackBlobRef(this, value);
                            }
                        }
                        descriptor.set.call(this, value);
                    },
                    configurable: true,
                    enumerable: true
                });
            }

            // Hook Image and Media element src to route through VFS
            if (typeof HTMLImageElement !== 'undefined') hookElementSrcSetter(HTMLImageElement.prototype);
            if (typeof HTMLMediaElement !== 'undefined') hookElementSrcSetter(HTMLMediaElement.prototype);
            if (typeof window !== 'undefined' && typeof window.Audio === 'function') {
                (function () {
                    var _OrigAudio = window.Audio;
                    function _VfsAudio(src) {
                        var instance = new _OrigAudio();
                        if (src !== undefined && typeof src === 'string' && src.length > 0) {
                            instance.src = src;
                        }
                        return instance;
                    }
                    try { _VfsAudio.prototype = _OrigAudio.prototype; } catch (e) { }
                    window.Audio = _VfsAudio;
                })();
            }
            if (typeof HTMLSourceElement !== 'undefined') hookElementSrcSetter(HTMLSourceElement.prototype);
            if (typeof HTMLIFrameElement !== 'undefined') hookElementSrcSetter(HTMLIFrameElement.prototype);
            if (typeof HTMLTrackElement !== 'undefined') hookElementSrcSetter(HTMLTrackElement.prototype);
            if (typeof HTMLEmbedElement !== 'undefined') hookElementSrcSetter(HTMLEmbedElement.prototype);
            if (typeof HTMLInputElement !== 'undefined') hookElementSrcSetter(HTMLInputElement.prototype);
            if (typeof HTMLFrameElement !== 'undefined') hookElementSrcSetter(HTMLFrameElement.prototype);

            function hookElementHrefSetter(ElementProto) {
                if (typeof ElementProto === 'undefined') return;
                var descriptor = Object.getOwnPropertyDescriptor(ElementProto, 'href');
                if (!descriptor || !descriptor.set) return;

                Object.defineProperty(ElementProto, 'href', {
                    get: descriptor.get,
                    set: function (value) {
                        if (typeof value === 'string' && value.length > 0) {
                            if (!value.startsWith('blob:') && !value.startsWith('data:')) {
                                value = getVirtualUrl(value);
                            }
                        }
                        descriptor.set.call(this, value);
                    },
                    configurable: true,
                    enumerable: true
                });
            }

            if (typeof HTMLLinkElement !== 'undefined') hookElementHrefSetter(HTMLLinkElement.prototype);

            // ─────────────────────────────────────────────────────────────────────
            // [SHARED HELPERS] URL rewriters for CSS contexts.
            // Defined here (enclosing scope) so ALL subsequent hooks can reference them
            // without scope bugs — placing helpers inside a nested if-block would make
            // them inaccessible to sibling hooks (ReferenceError in strict mode).
            // ─────────────────────────────────────────────────────────────────────

            // Rewrites url() tokens inside a CSS value string (background-image, cursor, etc.).
            // Skips blob:, data:, and any scheme that contains a colon.
            function _rewriteCssUrlValue(value) {
                if (typeof value !== 'string' || value.indexOf('url(') === -1) return value;
                return value.replace(/url\(\s*(?:(["'])(.*?)\1|([^)\s"']+))\s*\)/g, function (match, q, u1, u2) {
                    var u = u1 !== undefined ? u1 : u2;
                    if (!u || u.indexOf(':') !== -1) return match;
                    var vUrl = getVirtualUrl(u);
                    return vUrl !== u ? "url('" + vUrl + "')" : match;
                });
            }

            // Rewrites resource URLs inside raw HTML strings injected via
            // innerHTML or insertAdjacentHTML.  Uses <template> for safe,
            // inert DOM parsing instead of regex — no scripts execute, no
            // images load, no stylesheets apply inside a template fragment.
            function _rewriteHtmlUrls(htmlString) {
                if (typeof htmlString !== 'string') return htmlString;

                var hasSrc = htmlString.indexOf('src=') !== -1;
                var hasLink = htmlString.indexOf('<link') !== -1;
                var hasUrl = htmlString.indexOf('url(') !== -1;
                if (!hasSrc && !hasLink && !hasUrl) return htmlString;

                try {
                    var tpl = document.createElement('template');
                    originalInnerHTML.set.call(tpl, htmlString);
                    var frag = tpl.content;
                    var changed = false;

                    // (1) src= on resource-loading elements only
                    if (hasSrc) {
                        var srcEls = frag.querySelectorAll(
                            'img[src],script[src],audio[src],video[src],' +
                            'source[src],track[src],embed[src],iframe[src],input[src]'
                        );
                        for (var _si = 0; _si < srcEls.length; _si++) {
                            var sv = srcEls[_si].getAttribute('src');
                            if (sv && sv.indexOf(':') === -1) {
                                var vu = getVirtualUrl(sv);
                                if (vu !== sv) { srcEls[_si].setAttribute('src', vu); changed = true; }
                            }
                        }
                    }

                    // (2) href= on <link> elements only (not <a>)
                    if (hasLink) {
                        var linkEls = frag.querySelectorAll('link[href]');
                        for (var _li = 0; _li < linkEls.length; _li++) {
                            var hv = linkEls[_li].getAttribute('href');
                            if (hv && hv.indexOf(':') === -1) {
                                var vu2 = getVirtualUrl(hv);
                                if (vu2 !== hv) { linkEls[_li].setAttribute('href', vu2); changed = true; }
                            }
                        }
                    }

                    // (3) url() in inline style= attributes
                    if (hasUrl) {
                        var styledEls = frag.querySelectorAll('[style]');
                        for (var _ui = 0; _ui < styledEls.length; _ui++) {
                            var sty = styledEls[_ui].getAttribute('style');
                            if (sty && sty.indexOf('url(') !== -1) {
                                var ns = _rewriteCssUrlValue(sty);
                                if (ns !== sty) { styledEls[_ui].setAttribute('style', ns); changed = true; }
                            }
                        }

                        // (4) url() in <style> tag bodies
                        var styleEls = frag.querySelectorAll('style');
                        for (var _sti = 0; _sti < styleEls.length; _sti++) {
                            var css = styleEls[_sti].textContent;
                            if (css && css.indexOf('url(') !== -1) {
                                var nc = _rewriteCssUrlValue(css);
                                if (nc !== css) { styleEls[_sti].textContent = nc; changed = true; }
                            }
                        }
                    }

                    return changed ? tpl.innerHTML : htmlString;
                } catch (e) {
                    return htmlString;
                }
            }

            (function () {
                if (typeof CSSStyleDeclaration === 'undefined') return;

                // -- setProperty path --
                var _origSetProp = CSSStyleDeclaration.prototype.setProperty;
                if (_origSetProp) {
                    try {
                        CSSStyleDeclaration.prototype.setProperty = function (prop, value, priority) {
                            if (typeof value === 'string' && value.indexOf('url(') !== -1) {
                                var p = (prop || '').toLowerCase().replace(/^-webkit-/, '');
                                if (p === 'background-image' || p === 'background' ||
                                    p === 'border-image' || p === 'border-image-source' ||
                                    p === 'mask-image' || p === 'list-style-image' ||
                                    p === 'cursor' || p === 'content') {
                                    value = _rewriteCssUrlValue(value);
                                }
                            }
                            return _origSetProp.call(this, prop, value, priority);
                        };
                    } catch (e) { }
                }

                // -- camelCase setter path (primary) --
                // Works when Chromium exposes CSSStyleDeclaration properties as configurable
                // JS descriptors on the prototype (newer NW.js / Chromium 60+).
                var _cssUrlProps = [
                    'backgroundImage', 'background',
                    'borderImage', 'borderImageSource',
                    'maskImage', 'webkitMaskImage',
                    'listStyleImage', 'cursor', 'content'
                ];
                var _hookedCount = 0;
                _cssUrlProps.forEach(function (propName) {
                    try {
                        var desc = Object.getOwnPropertyDescriptor(CSSStyleDeclaration.prototype, propName);
                        if (!desc || !desc.set || !desc.configurable) return;
                        var origSetter = desc.set;
                        Object.defineProperty(CSSStyleDeclaration.prototype, propName, {
                            get: desc.get,
                            set: function (value) {
                                origSetter.call(this, _rewriteCssUrlValue(value));
                            },
                            configurable: true,
                            enumerable: true
                        });
                        _hookedCount++;
                    } catch (e) { }
                });

                // -- HTMLElement.prototype.style Proxy (fallback) --
                // When CSSStyleDeclaration properties have no JS descriptor on the prototype
                // (older NW.js / Chromium Packs), prototype hooks above produce 0/N.
                // In that case element.style.backgroundImage = '...' goes straight to C++
                // and bypasses every other hook. Wrapping the .style getter in a Proxy
                // intercepts the assignment before it reaches C++ regardless of Chromium version.
                // The Proxy is only installed when prototype hooks produced 0 successes to avoid
                // double-processing in environments where the prototype hooks already work.
                if (_hookedCount === 0 && typeof Proxy !== 'undefined') {
                    (function () {
                        var _styleProto = (typeof HTMLElement !== 'undefined' && HTMLElement.prototype)
                            ? HTMLElement.prototype
                            : (typeof Element !== 'undefined' ? Element.prototype : null);
                        if (!_styleProto) return;

                        // Try HTMLElement first, fall back to Element
                        var _styleDesc = Object.getOwnPropertyDescriptor(_styleProto, 'style');
                        if (!_styleDesc) {
                            _styleProto = (typeof Element !== 'undefined') ? Element.prototype : null;
                            if (_styleProto) _styleDesc = Object.getOwnPropertyDescriptor(_styleProto, 'style');
                        }
                        if (!_styleDesc || !_styleDesc.get) return;

                        // Properties whose values may contain url() and must be rewritten.
                        // Stored as an Object for O(1) lookup inside the hot Proxy set trap.
                        var _URL_PROP_SET = {
                            backgroundImage: true, background: true,
                            borderImage: true, borderImageSource: true,
                            maskImage: true, webkitMaskImage: true,
                            listStyleImage: true, cursor: true, content: true
                        };

                        // WeakMap keyed on the element — avoids creating a new Proxy on every
                        // .style access while keeping element references GC-able.
                        var _cache = typeof WeakMap !== 'undefined' ? new WeakMap() : null;

                        function _makeStyleProxy(realStyle) {
                            return new Proxy(realStyle, {
                                set: function (target, prop, value) {
                                    if (typeof value === 'string' &&
                                        value.indexOf('url(') !== -1 &&
                                        _URL_PROP_SET[prop]) {
                                        value = _rewriteCssUrlValue(value);
                                    }
                                    // Assign to the real CSSStyleDeclaration — NOT the proxy.
                                    // Avoids recursive trap re-entry.
                                    target[prop] = value;
                                    return true;
                                },
                                get: function (target, prop) {
                                    var val = target[prop];
                                    // Bind methods to the real object so 'this' is correct
                                    // (e.g. target.removeProperty(), target.setProperty()).
                                    if (typeof val === 'function') return val.bind(target);
                                    return val;
                                }
                            });
                        }

                        try {
                            Object.defineProperty(_styleProto, 'style', {
                                get: function () {
                                    var realStyle = _styleDesc.get.call(this);
                                    if (!_cache) return _makeStyleProxy(realStyle);
                                    if (!_cache.has(this)) _cache.set(this, _makeStyleProxy(realStyle));
                                    return _cache.get(this);
                                },
                                configurable: true,
                                enumerable: _styleDesc.enumerable !== false
                            });
                        } catch (e) { }
                    })();
                }
            })();

            if (typeof Element !== 'undefined') {
                var originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
                if (!originalInnerHTML && typeof HTMLElement !== 'undefined') {
                    originalInnerHTML = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML');
                }
                if (originalInnerHTML && originalInnerHTML.set) {
                    var targetProto = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML') ? Element.prototype : HTMLElement.prototype;
                    Object.defineProperty(targetProto, 'innerHTML', {
                        get: originalInnerHTML.get,
                        set: function (htmlString) {
                            if (typeof htmlString === 'string') {
                                htmlString = _rewriteHtmlUrls(htmlString);
                            }
                            originalInnerHTML.set.call(this, htmlString);
                        },
                        configurable: true,
                        enumerable: true
                    });
                }

                if (Element.prototype.insertAdjacentHTML) {
                    var _insertAdjacentHTML = Element.prototype.insertAdjacentHTML;
                    Element.prototype.insertAdjacentHTML = function (position, htmlString) {
                        if (typeof htmlString === 'string') {
                            htmlString = _rewriteHtmlUrls(htmlString);
                        }
                        return _insertAdjacentHTML.call(this, position, htmlString);
                    };
                }
            }

            if (typeof HTMLScriptElement !== 'undefined') {
                var originalScriptSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLScriptElement.prototype, 'src');
                if (originalScriptSrcDescriptor && originalScriptSrcDescriptor.set) {
                    Object.defineProperty(HTMLScriptElement.prototype, 'src', {
                        get: originalScriptSrcDescriptor.get,
                        set: function (value) {
                            if (typeof value === 'string' && value.length > 0) {
                                if (!value.startsWith('blob:') && !value.startsWith('data:')) {
                                    // [V8 SNAPSHOT GUARD] If this file is already baked into the
                                    // V8 snapshot, point the <script> tag at the shared empty blob.
                                    // The browser fires onload (load-chain continues) but executes
                                    // nothing, preventing double-eval crashes and 404 errors on
                                    // files that were deleted from disk after packing.
                                    if (_isV8SnapshotFile(value)) {
                                        var _emptyUrl = _getV8EmptyScriptUrl();
                                        if (_emptyUrl) {
                                            originalScriptSrcDescriptor.set.call(this, _emptyUrl);
                                            return;
                                        }
                                    }
                                    value = getVirtualUrl(value);
                                }
                            }
                            originalScriptSrcDescriptor.set.call(this, value);
                        },
                        configurable: true,
                        enumerable: true
                    });
                }
            }

            var _Bitmap_load = Bitmap.load;
            Bitmap.load = function (url) {
                var resolvedUrl = url;
                var hasEnc = false;
                if (typeof Decrypter !== 'undefined' && Decrypter.hasEncryptedImages) hasEnc = true;
                if (typeof Utils !== 'undefined' && Utils.hasEncryptedImages && Utils.hasEncryptedImages()) hasEnc = true;

                if (!hasEnc && _earlyBlobResolve) {
                    resolvedUrl = getVirtualUrl(url);
                }
                var bm = _Bitmap_load.call(this, resolvedUrl);
                if (bm && typeof bm === 'object' && resolvedUrl !== url) {
                    bm._secuVfsPath = url;

                    if (bm._url && bm._url.indexOf('blob:') === 0) {
                        bm._url = url;
                    }
                }
                return bm;
            };

            if (Bitmap.prototype._startLoading) {
                var _Bitmap_startLoading = Bitmap.prototype._startLoading;
                Bitmap.prototype._startLoading = function () {
                    var hasEnc = false;
                    if (typeof Decrypter !== 'undefined' && Decrypter.hasEncryptedImages) hasEnc = true;
                    if (typeof Utils !== 'undefined' && Utils.hasEncryptedImages && Utils.hasEncryptedImages()) hasEnc = true;

                    if (this._url && !hasEnc && _earlyBlobResolve) {
                        var _lookupUrl = this._url;
                        if (this._url.indexOf('blob:') === 0 && this._secuVfsPath) {
                            _lookupUrl = this._secuVfsPath;
                        }

                        var _blobUrl = getVirtualUrl(_lookupUrl);

                        if (_blobUrl !== this._url) {
                            // Temporarily set _url to the fresh blob so the original
                            // _startLoading sets _image.src correctly, then RESTORE _url to
                            // the original VFS path so the next flush+retry can refresh again.
                            this._url = _blobUrl;
                            if (!this._secuVfsPath && _lookupUrl.indexOf('blob:') !== 0) {
                                this._secuVfsPath = _lookupUrl;
                            }
                            var _ret = _Bitmap_startLoading.call(this);
                            // CRITICAL: restore to original path, not the blob URL.
                            this._url = _lookupUrl;
                            return _ret;
                        }
                    }
                    return _Bitmap_startLoading.call(this);
                };
            }

            // Also hook _requestImage for older RPG Maker MV versions
            if (Bitmap.prototype._requestImage) {
                var _Bitmap_requestImage = Bitmap.prototype._requestImage;
                Bitmap.prototype._requestImage = function (url) {
                    var resolvedUrl = url;
                    var hasEnc = false;
                    if (typeof Decrypter !== 'undefined' && Decrypter.hasEncryptedImages) hasEnc = true;
                    if (typeof Utils !== 'undefined' && Utils.hasEncryptedImages && Utils.hasEncryptedImages()) hasEnc = true;

                    if (!hasEnc && _earlyBlobResolve) {
                        var lookupUrl = url;
                        if (url.indexOf('blob:') === 0 && this._secuVfsPath) {
                            lookupUrl = this._secuVfsPath;
                        }
                        resolvedUrl = getVirtualUrl(lookupUrl);

                        // Save original path for future refreshes if not yet recorded
                        if (!this._secuVfsPath && lookupUrl.indexOf('blob:') !== 0 && resolvedUrl !== lookupUrl) {
                            this._secuVfsPath = lookupUrl;
                        }
                    }
                    return _Bitmap_requestImage.call(this, resolvedUrl);
                };
            }

            var _WebAudio_initialize = WebAudio.prototype.initialize;
            WebAudio.prototype.initialize = function (url) {
                var resolvedUrl = url;
                var hasEnc = false;
                if (typeof Decrypter !== 'undefined' && Decrypter.hasEncryptedAudio) hasEnc = true;
                if (typeof Utils !== 'undefined' && Utils.hasEncryptedAudio && Utils.hasEncryptedAudio()) hasEnc = true;

                if (!hasEnc) {
                    if (_earlyBlobResolve) {
                        resolvedUrl = getVirtualUrl(url);
                    } else {
                        resolvedUrl = url;
                    }
                }
                _WebAudio_initialize.call(this, resolvedUrl);
            };

            // [MV ONLY] Html5Audio does not exist in MZ
            if (typeof Html5Audio !== 'undefined' && Html5Audio.setup) {
                var _Html5Audio_setup = Html5Audio.setup;
                Html5Audio.setup = function (url) { _Html5Audio_setup.call(this, _earlyBlobResolve ? getVirtualUrl(url) : url); };
            }

            var _Graphics_playVideo = Graphics.playVideo;
            Graphics.playVideo = function (src) { _Graphics_playVideo.call(this, _earlyBlobResolve ? getVirtualUrl(src) : src); };

            // ══════════════════════════════════════════════════════════════
            // SECTION 10: Blob Cache Lifecycle Management
            //   Flushes BlobCache at safe boundaries so that revokeObjectURL
            //   is never called while RPG Maker still holds a reference.
            //
            //   Two flush points:
            //     (A) Scene_Base.terminate — covers battle, menu, title, etc.
            //         Any scene swap where the old scene is fully destroyed.
            //     (B) Scene_Map.onTransferEnd — covers field/dungeon/town map
            //         transfers where Scene_Map itself never terminates.
            //         Previous map resources are no longer needed at this point.
            //
            //   Boot/system resources (icon, CSS, fonts) are injected once at
            //   startup and stored separately, so flushing BlobCache here does
            //   not affect them.
            // ══════════════════════════════════════════════════════════════

            function _addBlobRef(blobUrl) {
                BlobRefCount[blobUrl] = (BlobRefCount[blobUrl] || 0) + 1;
            }

            function _releaseBlobRef(blobUrl) {
                if (!blobUrl || typeof blobUrl !== 'string') return;
                BlobRefCount[blobUrl] = Math.max(0, (BlobRefCount[blobUrl] || 0) - 1);
                if (BlobRefCount[blobUrl] === 0 && PendingRevoke[blobUrl]) {
                    delete PendingRevoke[blobUrl];
                    delete BlobRefCount[blobUrl];
                    delete BlobUrlToKey[blobUrl];
                    try { URL.revokeObjectURL(blobUrl); } catch (e) { }
                }
            }

            function _flushBlobCache() {
                var vfsKeys = Object.keys(BlobCache);
                for (var _i = 0; _i < vfsKeys.length; _i++) {
                    var _key = vfsKeys[_i];
                    var _blobUrl = BlobCache[_key];
                    if ((BlobRefCount[_blobUrl] || 0) > 0) {
                        PendingRevoke[_blobUrl] = true;
                    } else {
                        delete BlobRefCount[_blobUrl];
                        delete BlobUrlToKey[_blobUrl];
                        try { URL.revokeObjectURL(_blobUrl); } catch (e) { }
                    }
                }
                BlobCache = Object.create(null);
            }

            // (A) Scene termination — all scene types
            if (typeof Scene_Base !== 'undefined') {
                var _Scene_Base_terminate = Scene_Base.prototype.terminate;
                Scene_Base.prototype.terminate = function () {
                    _Scene_Base_terminate.call(this);
                    _flushBlobCache();
                };
            }

            // (B) Map transfer — fires after new map is ready, old map resources safe to release
            if (typeof Scene_Map !== 'undefined') {
                var _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
                Scene_Map.prototype.onTransferEnd = function () {
                    _Scene_Map_onTransferEnd.call(this);
                    _flushBlobCache();
                };
            }

            // ══════════════════════════════════════════════════════════════
            // SECTION 11: Player Auto Update
            //   Automatically updates game.bin from GitHub releases when the packed game starts.
            //   Intercepts Scene_Boot just before scene transition to maintain a black screen,
            //   then proceeds normally or moves to the update scene when the check is complete.
            // ══════════════════════════════════════════════════════════════

            // [PACK-TIME INJECTED] Replaced with actual values by transformLoaderCode() at Pack time.
            var _pau_enabled = "%__INJECT_PAU_ENABLED__%" === "true";
            var _pau_url = "%__INJECT_PAU_URL__%";
            var _pau_tag_raw = "%__INJECT_pau_tag__%";          // JSON array string
            var _pau_disable_no_net = "%__INJECT_PAU_DISABLE_NO_NET__%" === "true";
            var _pau_disable_fail = "%__INJECT_PAU_DISABLE_FAIL__%" === "true";
            // [PAU UI] Update screen customisation (injected at pack time)
            var _pau_ui_update_text = "%__INJECT_PAU_UI_UPDATE_TEXT__%";
            var _pau_ui_complete_text = "%__INJECT_PAU_UI_COMPLETE_TEXT__%";
            var _pau_ui_failed_text = "%__INJECT_PAU_UI_FAILED_TEXT__%";
            var _pau_ui_blink = "%__INJECT_PAU_UI_BLINK__%" === "true";
            var _pau_ui_blink_speed = "%__INJECT_PAU_UI_BLINK_SPEED__%";
            var _pau_ui_show_progress = "%__INJECT_PAU_UI_SHOW_PROGRESS__%" === "true";
            var _pau_ui_bg_type = "%__INJECT_PAU_UI_BG_TYPE__%";
            var _pau_ui_bg_color = "%__INJECT_PAU_UI_BG_COLOR__%";
            var _pau_ui_bg_image = "%__INJECT_PAU_UI_BG_IMAGE__%";
            var _pau_ui_bg_video = "%__INJECT_PAU_UI_BG_VIDEO__%";
            var _pau_ui_bg_fit = "%__INJECT_PAU_UI_BG_FIT__%";
            var _pau_ui_title_x_offset = "%__INJECT_PAU_UI_TITLE_X_OFFSET__%";
            var _pau_ui_title_y_offset = "%__INJECT_PAU_UI_TITLE_Y_OFFSET__%";
            var _pau_ui_title_size = "%__INJECT_PAU_UI_TITLE_SIZE__%";
            var _pau_ui_title_color = "%__INJECT_PAU_UI_TITLE_COLOR__%";
            var _pau_ui_sub_x_offset = "%__INJECT_PAU_UI_SUB_X_OFFSET__%";
            var _pau_ui_sub_y_offset = "%__INJECT_PAU_UI_SUB_Y_OFFSET__%";
            var _pau_ui_sub_size = "%__INJECT_PAU_UI_SUB_SIZE__%";
            var _pau_ui_sub_color = "%__INJECT_PAU_UI_SUB_COLOR__%";
            var _pau_ui_title_outline_width = "%__INJECT_PAU_UI_TITLE_OUTLINE_WIDTH__%";
            var _pau_ui_title_outline_color = "%__INJECT_PAU_UI_TITLE_OUTLINE_COLOR__%";
            var _pau_ui_sub_outline_width = "%__INJECT_PAU_UI_SUB_OUTLINE_WIDTH__%";
            var _pau_ui_sub_outline_color = "%__INJECT_PAU_UI_SUB_OUTLINE_COLOR__%";
            var _pau_ui_video_loop = "%__INJECT_PAU_UI_VIDEO_LOOP__%" === "true";
            var _pau_ui_video_volume = "%__INJECT_PAU_UI_VIDEO_VOLUME__%";
            var _pau_ui_bg_music = "%__INJECT_PAU_UI_BG_MUSIC__%";
            var _pau_ui_bg_music_volume = "%__INJECT_PAU_UI_BG_MUSIC_VOLUME__%";
            var _pau_ui_bg_music_loop = "%__INJECT_PAU_UI_BG_MUSIC_LOOP__%" === "true";

            // ══════════════════════════════════════════════════════════════
            // SECTION 10.5: Additional Settings — Key Blocking
            //   Blocks F2 (frame rate), F4 (fullscreen toggle), F5 (refresh)
            //   to prevent players from accessing unintended behaviours.
            // ══════════════════════════════════════════════════════════════

            // [PACK-TIME INJECTED] Additional Settings
            var _block_resize = "%__INJECT_BLOCK_RESIZE__%" === "true";
            var _block_f2 = "%__INJECT_BLOCK_F2__%" === "true";
            var _block_f4 = "%__INJECT_BLOCK_F4__%" === "true";
            var _block_f5 = "%__INJECT_BLOCK_F5__%" === "true";

            if (_block_resize) {
                try {
                    var _nwGui = (typeof nw !== 'undefined') ? nw : require('nw.gui');
                    var _nwWin = _nwGui.Window.get();
                    _nwWin.setResizable(false);
                } catch (_re) { }
            }

            if (_block_f2 || _block_f4 || _block_f5) {
                (function () {
                    var _kh = function (e) {
                        var k = e.keyCode;
                        if (_block_f2 && k === 113) { e.preventDefault(); e.stopPropagation(); return false; }
                        if (_block_f4 && k === 115) { e.preventDefault(); e.stopPropagation(); return false; }
                        if (_block_f5 && k === 116) { e.preventDefault(); e.stopPropagation(); return false; }
                    };
                    document.addEventListener('keydown', _kh, true);
                    window.addEventListener('keydown', _kh, true);
                })();
            }

            // Skip entirely if in dev mode or PAU is disabled
            if (_pau_enabled && _pau_url && _pau_url.indexOf('%') !== 0) {
                (function () {
                    var _pau_https = require('https');
                    var _pau_dns = require('dns');

                    // ── Parse tag list ─────────────────────────────────
                    var _pau_tag = [];
                    try {
                        if (_pau_tag_raw && _pau_tag_raw.indexOf('%') !== 0) {
                            _pau_tag = JSON.parse(_pau_tag_raw);
                        }
                    } catch (_e) { }

                    // ── GitHub URL -> {owner, repo} ────────────────────
                    function _pau_parseRepo(url) {
                        var s = url.replace(/https?:\/\//i, '').replace(/^github\.com\//i, '').split('/');
                        if (s.length < 2) return null;
                        return { owner: s[0], repo: s[1].replace(/\.git$/i, '') };
                    }

                    // ── HTTPS GET -> JSON (with redirect following) ────────────
                    function _pau_getJSON(url, cb) {
                        try {
                            var urlMod = require('url');
                            var p = urlMod.parse(url);
                            var opts = {
                                hostname: p.hostname, path: p.path, method: 'GET',
                                headers: {
                                    'User-Agent': 'SecuPacker-PAU/1.0',
                                    'Accept': 'application/vnd.github.v3+json'
                                }
                            };
                            var req = _pau_https.request(opts, function (res) {
                                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                                    res.resume(); _pau_getJSON(res.headers.location, cb); return;
                                }
                                if (res.statusCode < 200 || res.statusCode >= 300) {
                                    res.resume(); cb(new Error('HTTP ' + res.statusCode)); return;
                                }
                                var chunks = [];
                                var _totalBytes = 0;
                                var _RES_LIMIT = 5 * 1024 * 1024; // 5MB hard cap
                                res.on('data', function (c) {
                                    _totalBytes += c.length;
                                    if (_totalBytes > _RES_LIMIT) {
                                        try { res.destroy(); } catch (_) { }
                                        cb(new Error('Response too large'));
                                        return;
                                    }
                                    chunks.push(c);
                                });
                                res.on('end', function () {
                                    try { cb(null, JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
                                    catch (e) { cb(e); }
                                });
                                res.on('error', cb);
                            });
                            req.on('error', cb);
                            req.setTimeout(10000, function () {
                                try { req.destroy(); } catch (_) { }
                                cb(new Error('Timeout'));
                            });
                            req.end();
                        } catch (e) { cb(e); }
                    }

                    // ── Compute local game.bin SHA256 ────────────────────────
                    function _pau_localHash(binPath) {
                        var fd = null;
                        try {
                            var h = crypto.createHash('sha256');
                            fd = fs.openSync(binPath, 'r');
                            var sz = fs.fstatSync(fd).size;
                            var pos = 0; var CHUNK = 4 * 1024 * 1024;
                            while (pos < sz) {
                                var rd = Math.min(CHUNK, sz - pos);
                                var buf = Buffer.alloc ? Buffer.alloc(rd) : new Buffer(rd);
                                fs.readSync(fd, buf, 0, rd, pos);
                                h.update(buf); pos += rd;
                            }
                            return h.digest('hex');
                        } catch (_) {
                            return null;
                        } finally {
                            if (fd !== null) { try { fs.closeSync(fd); } catch (_) { } }
                        }
                    }

                    // ── Select target release from release list ──────────────────────
                    function _pau_pickRelease(releases) {
                        if (!Array.isArray(releases) || !releases.length) return null;
                        if (_pau_tag.length > 0) {
                            for (var i = 0; i < releases.length; i++) {
                                var tag = (releases[i].tag_name || '').trim();
                                for (var j = 0; j < _pau_tag.length; j++) {
                                    if (tag === _pau_tag[j])
                                        return releases[i];
                                }
                            }
                            return null;
                        }
                        return releases[0]; // No tag specified -> use latest release
                    }

                    // ── Find binary asset from a release ───────────
                    // Rules:
                    //   1 asset -> always use it regardless of name.
                    //   Multiple assets -> prefer the one matching the local filename (name + extension).
                    //                    If no match, use the first asset.
                    function _pau_findAssets(release) {
                        var assets = release.assets || [];
                        var binA = null;

                        if (assets.length === 1) {
                            // Only one asset -> always use it
                            binA = assets[0];
                        } else if (assets.length > 1) {
                            // Find the asset whose name + extension matches the local file.
                            // actual_bin_name was never defined — use _vfsBinName which is
                            // captured at the top of the if(masterKey) block before env deletion.
                            var localLower = (_vfsBinName || 'game.bin').toLowerCase();
                            for (var _ai = 0; _ai < assets.length; _ai++) {
                                if ((assets[_ai].name || '').toLowerCase() === localLower) {
                                    binA = assets[_ai];
                                    break;
                                }
                            }
                            // If none found, use the first asset
                            if (!binA) binA = assets[0];
                        }

                        return { bin: binA };
                    }

                    // ── Download game.bin -> verify -> replace ──────────────
                    function _pau_download(url, binPath, expectedHash, onProgress, cb, _hopCount) {
                        _hopCount = (_hopCount || 0);
                        if (_hopCount > 5) { cb(new Error('Too many redirects')); return; }
                        try {
                            var urlMod = require('url');
                            var p = urlMod.parse(url);
                            var opts = {
                                hostname: p.hostname, path: p.path, method: 'GET',
                                headers: { 'User-Agent': 'SecuPacker-PAU/1.0' }
                            };
                            var req = _pau_https.request(opts, function (res) {
                                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                                    res.resume(); _pau_download(res.headers.location, binPath, expectedHash, onProgress, cb, _hopCount + 1); return;
                                }
                                if (res.statusCode < 200 || res.statusCode >= 300) {
                                    res.resume(); cb(new Error('DL HTTP ' + res.statusCode)); return;
                                }
                                var total = parseInt(res.headers['content-length'] || '0', 10);
                                var downloaded = 0;
                                var tmpPath = binPath + '.pau_tmp';
                                var out = fs.createWriteStream(tmpPath);
                                res.on('data', function (chunk) {
                                    downloaded += chunk.length;
                                    if (onProgress && total > 0) onProgress(downloaded, total);
                                });
                                res.pipe(out);
                                out.on('finish', function () {
                                    out.close(function () {
                                        try {
                                            // [INTEGRITY] Verify downloaded file against expected hash before replacing
                                            if (expectedHash) {
                                                var actualHash = _pau_localHash(tmpPath);
                                                if (!actualHash || actualHash !== expectedHash) {
                                                    try { if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); } catch (_) { }
                                                    cb(new Error('Hash mismatch — download may have been tampered'));
                                                    return;
                                                }
                                            }

                                            try {
                                                if (typeof FileDescriptor !== 'undefined' && FileDescriptor !== null) {
                                                    fs.closeSync(FileDescriptor);
                                                    FileDescriptor = null;
                                                }
                                            } catch (_) { }
                                            // [SPLIT] Close split file descriptors before replacing the bin
                                            try {
                                                if (typeof SplitFds !== 'undefined' && SplitFds) {
                                                    for (var _spfd in SplitFds) {
                                                        if (_spfd === '_names') continue;
                                                        try { if (typeof SplitFds[_spfd] === 'number') fs.closeSync(SplitFds[_spfd]); } catch (_) { }
                                                        delete SplitFds[_spfd];
                                                    }
                                                }
                                            } catch (_) { }

                                            if (fs.existsSync(binPath)) fs.unlinkSync(binPath);
                                            fs.renameSync(tmpPath, binPath);
                                            cb(null);
                                        } catch (e) {
                                            try { if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); } catch (_) { }
                                            cb(e);
                                        }
                                    });
                                });
                                out.on('error', function (e) {
                                    try { if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath); } catch (_) { }
                                    cb(e);
                                });
                                res.on('error', cb);
                            });
                            req.on('error', cb);
                            req.setTimeout(120000, function () {
                                try { req.destroy(); } catch (_) { }
                                cb(new Error('DL Timeout'));
                            });
                            req.end();
                        } catch (e) { cb(e); }
                    }

                    // ── Scene_PlayerUpdateProgress ────────────────────────
                    function Scene_PlayerUpdateProgress() { this.initialize.apply(this, arguments); }
                    Scene_PlayerUpdateProgress.prototype = Object.create(Scene_Base.prototype);
                    Scene_PlayerUpdateProgress.prototype.constructor = Scene_PlayerUpdateProgress;
                    Scene_PlayerUpdateProgress.status = { title: _pau_ui_update_text, sub: '' };
                    Scene_PlayerUpdateProgress.prototype.isReady = function () { return true; };
                    Scene_PlayerUpdateProgress.prototype.initialize = function () {
                        Scene_Base.prototype.initialize.call(this);
                        this._breathTime = 0;
                        this._bgVideoEl = null;
                        this._bgBmPending = null;
                        this._bgMusicAudio = null;
                    };
                    Scene_PlayerUpdateProgress.prototype.start = function () {
                        Scene_Base.prototype.start.call(this);
                    };
                    Scene_PlayerUpdateProgress.prototype.create = function () {
                        Scene_Base.prototype.create.call(this);

                        if (!Graphics.width || !Graphics.height) {
                            try { Graphics.resize(window.innerWidth, window.innerHeight); } catch (_) { }
                        }
                        if (!Graphics.boxWidth) Graphics.boxWidth = Graphics.width;
                        if (!Graphics.boxHeight) Graphics.boxHeight = Graphics.height;

                        var w = Graphics.boxWidth, h = Graphics.boxHeight;

                        // ── Background ──────────────────────────────────────
                        if (_pau_ui_bg_type === 'image' && _pau_ui_bg_image) {
                            try {
                                // Fallback solid colour so screen is never empty while image loads
                                var _bgFb = new Sprite();
                                var _bgFbBm = new Bitmap(w, h); _bgFbBm.fillAll('black'); _bgFb.bitmap = _bgFbBm;
                                this.addChild(_bgFb);
                                var _bgSp = new Sprite();
                                // @dir img: picker stores path relative to img/ without extension
                                // (e.g. 'system/GameOver'). Restore img/ prefix and .png extension.
                                // If already has img/ prefix or extension, use as-is.
                                var _bgImgBase = /^img[\/\\]/i.test(_pau_ui_bg_image)
                                    ? _pau_ui_bg_image
                                    : 'img/' + _pau_ui_bg_image;
                                var _bgImgSrc = /\.[^./\\]+$/.test(_bgImgBase)
                                    ? _bgImgBase
                                    : _bgImgBase + '.png';
                                var _bgBm = Bitmap.load(_bgImgSrc);
                                _bgSp.bitmap = _bgBm;
                                _bgSp.x = 0; _bgSp.y = 0;
                                this.addChild(_bgSp);
                                this._bgSp = _bgSp;
                                this._bgBmPending = _bgBm; // will scale once ready
                            } catch (_bgErr) {
                                var _bgFb2 = new Sprite();
                                var _bgFb2Bm = new Bitmap(w, h); _bgFb2Bm.fillAll(_pau_ui_bg_color || 'black'); _bgFb2.bitmap = _bgFb2Bm;
                                this.addChild(_bgFb2);
                            }
                        } else if (_pau_ui_bg_type === 'video' && _pau_ui_bg_video) {
                            // Solid colour behind the video
                            var _bgVBase = new Sprite();
                            var _bgVBaseBm = new Bitmap(w, h); _bgVBaseBm.fillAll('black'); _bgVBase.bitmap = _bgVBaseBm;
                            this.addChild(_bgVBase);
                            try {
                                var _vid = document.createElement('video');
                                var _vVol = parseInt(_pau_ui_video_volume, 10);
                                if (isNaN(_vVol)) _vVol = 100;
                                _vVol = Math.max(0, Math.min(100, _vVol));
                                _vid.autoplay = true; _vid.loop = _pau_ui_video_loop;
                                _vid.muted = (_vVol <= 0);
                                _vid.volume = _vVol / 100;
                                _vid.playsInline = true;
                                _vid.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;opacity:0;pointer-events:none;';
                                _vid.src = _pau_ui_bg_video;
                                document.body.appendChild(_vid);

                                var _vidObjFit = (_pau_ui_bg_fit === 'contain' || _pau_ui_bg_fit === 'fill') ? _pau_ui_bg_fit : 'cover';
                                var _vidCanvas = document.createElement('canvas');
                                _vidCanvas.width = w; _vidCanvas.height = h;
                                var _vidCtx = _vidCanvas.getContext('2d');
                                var _vidTexture = typeof PIXI.Texture.fromCanvas === 'function'
                                    ? PIXI.Texture.fromCanvas(_vidCanvas)  // PIXI v4 (MV)
                                    : PIXI.Texture.from(_vidCanvas);        // PIXI v5 (MZ)
                                var _vidSp = new PIXI.Sprite(_vidTexture);
                                _vidSp.width = w; _vidSp.height = h;
                                this.addChild(_vidSp);
                                this._bgVideoEl = _vid;
                                this._bgVideoCanvas = _vidCanvas;
                                this._bgVideoCtx = _vidCtx;
                                this._bgVideoTexture = _vidTexture;
                                this._bgVideoObjFit = _vidObjFit;
                            } catch (_vidErr) { }
                        } else {
                            // Solid colour (default)
                            var _bgSolid = new Sprite();
                            var _bgSolidBm = new Bitmap(w, h); _bgSolidBm.fillAll(_pau_ui_bg_color || 'black'); _bgSolid.bitmap = _bgSolidBm;
                            this.addChild(_bgSolid);
                        }

                        // ── Background Music (plays alongside any background type, including video) ──
                        if (_pau_ui_bg_music) {
                            try {
                                // Use WebAudio (RPG Maker's own audio engine).
                                // AudioManager.audioFileExt() returns .ogg (NW.js) or
                                // .m4a (mobile) — no extension guessing needed.
                                var _mVol = parseInt(_pau_ui_bg_music_volume, 10);
                                if (isNaN(_mVol)) _mVol = 80;
                                _mVol = Math.max(0, Math.min(100, _mVol));
                                // @dir audio: picker stores path relative to audio/ without extension
                                // (e.g. 'bgm/Town1'). Restore audio/ prefix then append extension.
                                // AudioManager.audioFileExt() returns .ogg (NW.js) or .m4a (mobile).
                                var _bgmBase = /^audio[\/\\]/i.test(_pau_ui_bg_music)
                                    ? _pau_ui_bg_music
                                    : 'audio/' + _pau_ui_bg_music;
                                var _bgmPath = /\.[^./\\]+$/.test(_bgmBase)
                                    ? _bgmBase
                                    : _bgmBase + AudioManager.audioFileExt();
                                var _bgmAudio = new WebAudio(_bgmPath);
                                _bgmAudio.volume = _mVol / 100;
                                _bgmAudio.play(_pau_ui_bg_music_loop, 0);
                                this._bgMusicAudio = _bgmAudio;
                            } catch (_bgmErr) { }
                        }

                        // ── Title sprite ────────────────────────────────────────
                        var _titleH = Math.max(64, Math.ceil(_pau_ui_title_size * 2));
                        this._titleBitmapH = _titleH;
                        this._titleSp = new Sprite();
                        this._titleSp.bitmap = new Bitmap(w, _titleH);
                        this._titleSp.bitmap.fontSize = _pau_ui_title_size;
                        this._titleSp.bitmap.textColor = _pau_ui_title_color;
                        this._titleSp.bitmap.outlineWidth = _pau_ui_title_outline_width;
                        this._titleSp.bitmap.outlineColor = _pau_ui_title_outline_color;
                        this._titleSp.anchor.x = 0.5; this._titleSp.anchor.y = 0.5;
                        this._titleSp.x = w / 2 + _pau_ui_title_x_offset;
                        this._titleSp.y = h / 2 + _pau_ui_title_y_offset;
                        this.addChild(this._titleSp);

                        // ── Sub-text sprite ─────────────────────────────────────
                        var _subH = Math.max(32, Math.ceil(_pau_ui_sub_size * 2));
                        this._subBitmapH = _subH;
                        this._subSp = new Sprite();
                        this._subSp.bitmap = new Bitmap(w, _subH);
                        this._subSp.bitmap.fontSize = _pau_ui_sub_size;
                        this._subSp.bitmap.textColor = _pau_ui_sub_color;
                        this._subSp.bitmap.outlineWidth = _pau_ui_sub_outline_width;
                        this._subSp.bitmap.outlineColor = _pau_ui_sub_outline_color;
                        this._subSp.anchor.x = 0.5;
                        this._subSp.x = w / 2 + _pau_ui_sub_x_offset;
                        this._subSp.y = h / 2 + _pau_ui_sub_y_offset;
                        this.addChild(this._subSp);

                        this._lastTitle = ''; this._lastSub = '';
                    };
                    Scene_PlayerUpdateProgress.prototype.terminate = function () {
                        Scene_Base.prototype.terminate.call(this);
                        // Clean up video element
                        if (this._bgVideoEl) {
                            try { this._bgVideoEl.pause(); } catch (_) { }
                            try { if (this._bgVideoEl.parentNode) this._bgVideoEl.parentNode.removeChild(this._bgVideoEl); } catch (_) { }
                            this._bgVideoEl.src = '';
                            this._bgVideoEl = null;
                        }
                        // Clean up video canvas texture
                        if (this._bgVideoTexture) {
                            try { this._bgVideoTexture.destroy(true); } catch (_) { }
                            this._bgVideoTexture = null;
                        }
                        this._bgVideoCanvas = null;
                        this._bgVideoCtx = null;
                        // Clean up background music (WebAudio)
                        if (this._bgMusicAudio) {
                            try { this._bgMusicAudio.stop(); } catch (_) { }
                            this._bgMusicAudio = null;
                        }
                    };
                    Scene_PlayerUpdateProgress.prototype.update = function () {
                        try {
                            if (typeof Graphics === 'undefined' || this._finished) return;
                            Scene_Base.prototype.update.call(this);

                            if (this._bgVideoEl && this._bgVideoCtx && this._bgVideoTexture) {
                                var _vel = this._bgVideoEl;
                                if (_vel.videoWidth > 0 && _vel.readyState >= 2) {
                                    var _cw = Graphics.boxWidth, _ch = Graphics.boxHeight;
                                    var _vw = _vel.videoWidth, _vh = _vel.videoHeight;
                                    var _ctx = this._bgVideoCtx;
                                    _ctx.clearRect(0, 0, _cw, _ch);
                                    var _fit = this._bgVideoObjFit || 'cover';
                                    if (_fit === 'contain') {
                                        var _sc = Math.min(_cw / _vw, _ch / _vh);
                                        _ctx.drawImage(_vel, (_cw - _vw * _sc) / 2, (_ch - _vh * _sc) / 2, _vw * _sc, _vh * _sc);
                                    } else if (_fit === 'cover') {
                                        var _sc = Math.max(_cw / _vw, _ch / _vh);
                                        _ctx.drawImage(_vel, (_cw - _vw * _sc) / 2, (_ch - _vh * _sc) / 2, _vw * _sc, _vh * _sc);
                                    } else {
                                        _ctx.drawImage(_vel, 0, 0, _cw, _ch);
                                    }
                                    try { this._bgVideoTexture.baseTexture.update(); } catch (_) { }
                                }
                            }

                            // Scale pending background image once it's ready
                            if (this._bgBmPending && this._bgBmPending.isReady()) {
                                var _bw = this._bgBmPending.width, _bh = this._bgBmPending.height;
                                if (_bw > 0 && _bh > 0 && this._bgSp) {
                                    var _sw = Graphics.boxWidth / _bw;
                                    var _sh = Graphics.boxHeight / _bh;
                                    if (_pau_ui_bg_fit === 'contain') {
                                        var _sc = Math.min(_sw, _sh);
                                        this._bgSp.scale.x = _sc;
                                        this._bgSp.scale.y = _sc;
                                        this._bgSp.x = (Graphics.boxWidth - _bw * _sc) / 2;
                                        this._bgSp.y = (Graphics.boxHeight - _bh * _sc) / 2;
                                    } else if (_pau_ui_bg_fit === 'fill') {
                                        this._bgSp.scale.x = _sw;
                                        this._bgSp.scale.y = _sh;
                                        this._bgSp.x = 0;
                                        this._bgSp.y = 0;
                                    } else {
                                        var _sc = Math.max(_sw, _sh);
                                        this._bgSp.scale.x = _sc;
                                        this._bgSp.scale.y = _sc;
                                        this._bgSp.x = (Graphics.boxWidth - _bw * _sc) / 2;
                                        this._bgSp.y = (Graphics.boxHeight - _bh * _sc) / 2;
                                    }
                                }
                                this._bgBmPending = null;
                            }

                            // Blink / opacity animation on title
                            if (_pau_ui_blink) {
                                this._breathTime += _pau_ui_blink_speed;
                                if (this._titleSp) this._titleSp.opacity = 155 + Math.sin(this._breathTime) * 100;
                            } else {
                                if (this._titleSp) this._titleSp.opacity = 255;
                            }

                            var st = Scene_PlayerUpdateProgress.status;

                            // Redraw title only when text changes
                            if (this._titleSp && this._lastTitle !== st.title) {
                                this._lastTitle = st.title;
                                this._titleSp.bitmap.clear();
                                this._titleSp.bitmap.drawText(this._lastTitle, 0, 0, Graphics.boxWidth, this._titleBitmapH, 'center');
                            }

                            // Redraw sub-text: honour showProgress flag
                            if (this._subSp) {
                                var _subText = _pau_ui_show_progress ? st.sub : (st._forceShow ? st.sub : '');
                                if (this._lastSub !== _subText) {
                                    this._lastSub = _subText;
                                    this._subSp.bitmap.clear();
                                    if (_subText) this._subSp.bitmap.drawText(_subText, 0, 0, Graphics.boxWidth, this._subBitmapH, 'center');
                                }
                            }
                        } catch (e) { if (e.name === 'ReferenceError') return; }
                    };

                    // ── Block scene transition: hold black screen until check is complete ──
                    var _pau_done = false;
                    var _pau_pending = null; // { self, fn }

                    function _pau_hookBoot() {
                        if (isRPGMakerMZ()) {
                            var _orig = Scene_Boot.prototype.startNormalGame;
                            Scene_Boot.prototype.startNormalGame = function () {
                                if (_pau_done) { _orig.call(this); }
                                else { _pau_pending = { self: this, fn: _orig }; }
                            };
                        } else {
                            var _origS = Scene_Boot.prototype.start;
                            Scene_Boot.prototype.start = function () {
                                if (_pau_done) { _origS.call(this); }
                                else { _pau_pending = { self: this, fn: _origS }; }
                            };
                        }
                    }

                    // ── Proceed normally ─────────────────────────────────────
                    function _pau_proceed() {
                        _pau_done = true;
                        if (_pau_pending) {
                            try { _pau_pending.fn.call(_pau_pending.self); } catch (_) { }
                            _pau_pending = null;
                        }
                    }

                    // ── Extract actual binary path ─────────────────────────
                    // process.env.__BIN_NAME__ was deleted by initResourceLoader() after
                    // saving its value to _vfsBinName (outer closure). Use _vfsBinName so
                    // that games with a renamed binary (e.g. "story.bin") are handled
                    // correctly instead of always falling back to 'game.bin'.
                    function _pau_getBinPath() {
                        var actual = _vfsBinName || 'game.bin';
                        return { name: actual, path: path.join(path.dirname(process.mainModule.filename), actual) };
                    }

                    // ── Error handling ─────────────────────────────────────
                    function _pau_handleError(isNoNet) {
                        var shouldStop = isNoNet ? _pau_disable_no_net : _pau_disable_fail;
                        var msg = isNoNet
                            ? 'No internet connection.\nCannot check for updates. Exiting.'
                            : 'Cannot connect to update server.\nThe game cannot be started.';
                        if (shouldStop) {
                            // Wipe memory, then alert -> exit
                            if (typeof emergencyWipe === 'function') emergencyWipe();
                            _pau_done = true; _pau_pending = null;
                            alert(msg);
                            try { process.exit(0); } catch (_) { }
                        } else {
                            _pau_proceed();
                        }
                    }

                    // ── Download update + restart ───────────────────────
                    function _pau_doUpdate(downloadUrl, expectedHash) {
                        _pau_done = true; _pau_pending = null;
                        try { SceneManager.goto(Scene_PlayerUpdateProgress); } catch (_) { }
                        var binInfo = _pau_getBinPath();
                        var binPath = binInfo.path;
                        Scene_PlayerUpdateProgress.status = { title: _pau_ui_update_text, sub: '' };
                        _pau_download(downloadUrl, binPath, expectedHash,
                            function (dl, total) {
                                // Only update sub text if showProgress is enabled
                                if (_pau_ui_show_progress) {
                                    var pct = Math.floor((dl / total) * 100);
                                    Scene_PlayerUpdateProgress.status = {
                                        title: _pau_ui_update_text,
                                        sub: pct + '% (' + Math.floor(dl / 1024) + 'KB / ' + Math.floor(total / 1024) + 'KB)'
                                    };
                                }
                            },
                            function (err) {
                                if (err) {
                                    // Error sub-text always shown regardless of showProgress
                                    Scene_PlayerUpdateProgress.status = { title: _pau_ui_failed_text, sub: err.message, _forceShow: true };
                                    setTimeout(function () { try { process.exit(1); } catch (_) { } }, 3000);
                                    return;
                                }
                                Scene_PlayerUpdateProgress.status = { title: _pau_ui_complete_text, sub: '' };
                                setTimeout(function () {
                                    try {
                                        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.reload)
                                            chrome.runtime.reload();
                                        else location.reload();
                                    } catch (_) { try { process.exit(0); } catch (__) { } }
                                }, 1000);
                            }
                        );
                    }

                    // ── Main flow ─────────────────────────────────────────
                    function _pau_main() {
                        var apiUrl;
                        if (/github\.com/i.test(_pau_url)) {
                            var repo = _pau_parseRepo(_pau_url);
                            if (!repo) { _pau_proceed(); return; }
                            apiUrl = 'https://api.github.com/repos/' + repo.owner + '/' + repo.repo + '/releases';
                        } else {
                            if (!_pau_url) { _pau_proceed(); return; }
                            apiUrl = _pau_url;
                        }
                        var binInfo = _pau_getBinPath();
                        var binPath = binInfo.path;

                        // STEP 1: Check internet connection
                        _pau_dns.lookup('google.com', function (netErr) {
                            if (netErr && (netErr.code === 'ENOTFOUND' || netErr.code === 'EAI_AGAIN')) {
                                _pau_handleError(true); return;
                            }

                            // STEP 2: Fetch release list
                            _pau_getJSON(apiUrl, function (err, releases) {
                                if (err || !Array.isArray(releases) || !releases.length) {
                                    _pau_handleError(false); return;
                                }

                                // STEP 3: Select target release
                                var release = _pau_pickRelease(releases);
                                if (!release) { _pau_handleError(false); return; }

                                // STEP 4: Verify assets
                                var assets = _pau_findAssets(release);
                                if (!assets.bin) { _pau_handleError(false); return; }

                                var downloadUrl = assets.bin.browser_download_url;

                                // STEP 5: Compare hashes using GitHub auto-generated digest field
                                var remoteHash = (assets.bin.digest || '').indexOf('sha256:') === 0
                                    ? assets.bin.digest.slice(7).toLowerCase() : null;
                                if (!remoteHash) { _pau_doUpdate(downloadUrl, null); return; }
                                var localHash = _pau_localHash(binPath);
                                if (localHash && localHash === remoteHash) {
                                    // Same -> no update needed, proceed normally
                                    _pau_proceed();
                                } else {
                                    // Pass remoteHash so download is verified before replacing
                                    _pau_doUpdate(downloadUrl, remoteHash);
                                }
                            });
                        });
                    }

                    // Install hook then run
                    _pau_hookBoot();
                    _pau_main();

                })();
            } // end if (_pau_enabled)
        }

        // ══════════════════════════════════════════════════════════════
        // SECTION 12: Public API
        //   Sets up window.SecuPacker in Loader (packed-game) mode.
        //   Runs unconditionally so the API is available even when VFS
        //   fails to initialise (null masterKey → no if-block entry).
        //   Plugin command registration is handled exclusively by the
        //   Packer IIFE (which always runs via plugins.js eval), so no
        //   MV/MZ command registration is needed here.
        //
        //   window.SecuPacker.isPacked()     → always true in this path
        //   window.SecuPacker.getVersion()   → returns _SP_VERSION
        //   window.SecuPacker.isSplitAvailable(binName) → checks split bin
        // ══════════════════════════════════════════════════════════════
        (function () {
            if (typeof window === 'undefined') return;
            window.SecuPacker = window.SecuPacker || {};
            // Override unconditionally: Loader runs before plugins.js, so
            // the Packer's namespace may not exist yet — but even if it does,
            // Loader's isPacked=true is always the correct final value.
            window.SecuPacker.getVersion = function () { return _SP_VERSION; };
            window.SecuPacker.isPacked = function () { return true; };

            // isPlayerAutoUpdateReady (Loader / packed-game mode):
            //   _pau_enabled and _pau_url are var-scoped to the Loader IIFE,
            //   so they're directly readable here even though they're declared
            //   inside the if(masterKey) block.
            window.SecuPacker.isPlayerAutoUpdateReady = function () {
                return !!_pau_enabled && typeof _pau_url === 'string' && _pau_url.length > 0;
            };

            // isSplitAvailable (Loader / packed-game mode):
            //   Gate 0 : SplitFds._names — TOC-registered split list.
            //            If binName is not in this list it was never defined as a
            //            shard (or the TOC was never parsed because masterKey failed),
            //            so we return false immediately.  This prevents a stray file
            //            with the same name from producing a false positive.
            //   Fast path: SplitFds[binName] already holds an open fd → true.
            //   Slow path: try fs.openSync on the file → success true / error false.
            window.SecuPacker.isSplitAvailable = function (binName) {
                if (!binName) return false;
                binName = String(binName);

                // Gate 0: reject anything not in the TOC-registered split list
                if (typeof SplitFds === 'undefined' || SplitFds === null) return false;
                var _names = SplitFds._names;
                if (!_names || !Array.isArray(_names) || _names.indexOf(binName) === -1) {
                    return false;
                }

                // Fast path: split fd was already opened by initResourceLoader
                if (typeof SplitFds[binName] === 'number') return true;

                // Slow path: split fd open failed at init time; try again now
                if (typeof fs !== 'undefined' && fs !== null &&
                    typeof path !== 'undefined' && path !== null) {
                    try {
                        var _basePath = path.dirname(process.mainModule.filename);
                        var _splitPath = path.join(_basePath, binName);
                        var _sfd = fs.openSync(_splitPath, 'r');
                        fs.closeSync(_sfd);
                        return true;
                    } catch (e) { }
                }

                return false;
            };
        })();
    })();
}
// #endregion