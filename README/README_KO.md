# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <b>한국어</b> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20플러그인_다운로드-4CAF50?style=for-the-badge" alt="플러그인 다운로드" />
</a>

RPG Maker MV / MZ용 리소스 보안 패킹 플러그인입니다.

> **Windows 전용입니다.** macOS, Linux에서는 동작하지 않습니다.

---

## 목차
<img src="../image/example.png" alt="Example Image" width="300" align="right" />

1. [사용 방법](#1-사용-방법)
2. [요구 사항](#2-요구-사항)
3. [파라미터 설명](#3-파라미터-설명)
   - [3-1. 일반 패킹 설정](#3-1-일반-패킹-설정)
   - [3-2. 파일 패킹 설정](#3-2-파일-패킹-설정)
   - [3-3. 보안 설정](#3-3-보안-설정)
   - [3-4. 추가 설정](#3-4-추가-설정)
   - [3-5. 플레이어 자동 업데이트 설정](#3-5-플레이어-자동-업데이트-설정)
4. [JavaScript API](#4-javascript-api)
5. [플러그인 커맨드](#5-플러그인-커맨드)
6. [주의 사항](#6-주의-사항)

---

## 1. 사용 방법

기본적인 패킹 흐름은 다음과 같습니다.

**1단계 — 플러그인 설치**

`Churitoring_SecuPacker.js`를 프로젝트의 `js/plugins/` 폴더에 넣고 RPG Maker 플러그인 관리자에서 활성화합니다. 파라미터는 이 단계에서 원하는 대로 설정해 둡니다.

**2단계 — 배포 폴더 생성**

RPG Maker에서 **파일 > 배포(Deployment)** 메뉴를 열고 **Windows** 플랫폼 대상으로 배포합니다.

**3단계 — 패킹 실행**

배포된 폴더 안의 게임 `.exe`를 실행합니다. 패킹 진행 화면이 자동으로 나타납니다. 이 상태에서 창을 닫으면 안 됩니다. 중간에 강제 종료하더라도 다음 실행 시 자동으로 복구될 확률이 높지만, 그냥 기다리는 게 낫습니다.

**4단계 — 배포**

패킹이 완료되면 게임이 알아서 다시 켜집니다. 이 배포 폴더를 유저에게 그대로 전달하면 됩니다.

단, 아래의 `Player Auto Update`가 `true`라면, 확인창이 뜬 이후, 다시 켜지지 않고 꺼집니다. 이때에 다시 켜신다면 이전 버전으로 업데이트를 시도하므로, 켜지 말고서 패킹 파일을 GitHub 릴리즈에 배포해야 합니다.

---

## 2. 요구 사항

- RPG Maker MV 1.6.0 이상 또는 RPG Maker MZ 1.0.0 이상
- NW.js 0.28.1 이상 (권장: 0.44.3 이상)

---

## 3. 파라미터 설명

### 3-1. 일반 패킹 설정

**Packer Auto Update**

패킹을 시작하기 전에 GitHub에서 이 플러그인의 최신 버전을 받아 `js/plugins/Churitoring_SecuPacker.js`를 덮어씁니다. 그래서 이 파일을 직접 수정한 내용이 있다면 반드시 `false`로 바꿔야 합니다. 그렇지 않으면 패킹할 때마다 수정 사항이 원본으로 되돌아갑니다. 수정 없이 그대로 쓰는 경우엔 `true`로 두세요.

**Game Binary Name**

패킹 결과로 생성되는 패킹 파일 이름입니다. 기본값은 `game.bin`이지만, 이름을 바꾸고 싶다면 여기서 변경하면 됩니다. 경로는 포함할 수 없고 파일명만 입력해야 합니다. 많은 경우에 대비해서 변경하시는것을 추천드립니다. 확장자도 변경 가능합니다.

**Track Runtime Writes**

테스트 플레이 중 다른 플러그인이 파일을 새로 만들거나 수정하면, 그 파일 경로를 `data/SecuPacker_RuntimeWrites.txt`에 기록해 둡니다. 이후 패킹할 때 이 목록의 파일들은 패킹 파일에 넣지 않고 디스크에 그대로 남겨둡니다.

설정 파일과 같은 파일들을 자동 생성하는 플러그인을 쓰고 있다면 이 옵션을 켜두세요. 특별한 이유가 없으면 기본값인 `true`를 유지하는 것을 권장합니다.

단, 여기에 속한 파일들은 플레이어 자동 업데이트와 SecuPacker의 보호대상에서 제외됩니다.

**Strip Read-Only Attributes**

패킹 마무리 단계에서 원본 리소스 파일들을 삭제하는데, 읽기 전용(R) 속성이 걸려 있으면 삭제가 실패합니다. Git으로 프로젝트를 관리했거나 일부 도구가 파일에 읽기 전용 속성을 자동으로 붙이는 환경이라면 이 옵션을 `true`로 두면 삭제 전에 `attrib -R`을 먼저 실행해서 문제를 방지합니다. 특별한 이유가 없으면 기본값인 `true`를 유지하는 것을 권장합니다.

---

### 3-2. 파일 패킹 설정

**File Split**

리소스를 하나의 패킹 파일에 모두 담는 대신 여러 파일로 나눌 수 있게 합니다. DLC 리소스를 본편과 분리하거나, 게임 볼륨이 커서 파일을 나눠야 할 때 사용합니다. `false`로 설정하면 아래 File Split List 설정도 전부 무시됩니다.

**File Split List**

어떤 파일/폴더를 어느 패킹 파일로 보낼지 규칙을 정합니다. 각 항목에는 두 가지를 설정합니다.

- **Split Bin File**: 이 규칙으로 묶일 파일 이름입니다. Game Binary Name에 설정한 메인 패킹 파일의 이름과 달라야 합니다. 예: `dlc.bin`, `bgm.bin`
- **Split Path Patterns**: 이 파일에 넣을 경로 목록입니다. `audio/bgm`처럼 폴더를 지정하면 하위 파일까지 전부 들어가고, `audio/se/boss.ogg`처럼 파일 하나만 지정할 수도 있습니다.

**Packed File Exclusions**

패킹 파일에 넣지 않고 디스크에 그대로 남길 파일 또는 폴더를 지정합니다. 경로는 프로젝트 루트 기준 상대 경로이며, 구분자는 슬래시(`/`)를 써야 합니다. 예: `img/system/Loading.png`, `audio/bgm`

게임 실행 중 외부에서 직접 읽어야 하는 파일이 있다면 여기에 추가하세요. 이 목록의 파일들은 패킹 대상에서 제외되어 삭제되지 않고 디스크에 남습니다.

단, 여기에 속한 파일들은 플레이어 자동 업데이트와 SecuPacker의 보호대상에서 제외됩니다.

---

### 3-3. 보안 설정

**Block Launch Args Whitelist**

패킹된 게임을 실행할 때 URL 쿼리스트링이나 NW.js 실행 인수에 이 목록에 없는 값이 하나라도 있으면 게임이 즉시 종료됩니다. 기본값은 빈 목록이므로 기본 상태에서는 모든 외부 인수를 차단합니다. 허용해야 하는 인수가 있다면 그 값을 목록에 추가하세요.

이 검사는 패킹된 배포 빌드에서만 동작하고, 개발 중 플레이테스트에서는 적용되지 않습니다.

**Early Blob Resolve**

게임이 이미지 파일을 불러올 때 경로를 패킹 파일 내부의 Blob URL로 변환하는 타이밍을 `Bitmap.load` 단계까지 앞당기는 옵션입니다. 대부분의 경우 `true`로 두면 됩니다.

단, `fs.readFile`이나 `XMLHttpRequest`를 직접 가로채서 자체적인 복호화를 처리하는 플러그인을 함께 사용할 경우, 충돌이 일어났을때에 `false`로 설정해야 합니다.

`false`로 설정할 경우, 호환성이 낮아질 수 있습니다.

**Enable Cheat Detection**

주기적으로 해킹 툴을 검사합니다.

**Excluded Binary Hashes**

환경 지문 해시를 계산할 때 제외할 바이너리 파일의 이름입니다.

기본값에 `ffmpeg`가 들어 있는 이유는 FFmpeg의 라이선스(LGPL) 때문입니다. LGPL은 유저가 해당 바이너리를 자신의 것으로 교체할 수 있어야 한다고 규정하는데, FFmpeg를 해시에 포함시키면 교체 시 해시가 달라져 게임이 실행되지 않으므로 라이선스 준수를 위해 기본적으로 제외되어 있습니다.

특별한 이유가 없으면 기본값을 그대로 유지하세요.

예: ffmpeg.dll (ffmpeg.dll만 제외)
예: ffmpeg (ffmpeg.dll과 ffmpegsumo.dll을 모두 제외)

**Hash Exe Files**

`true`로 설정하면 게임 `.exe` 파일도 환경 지문 해시에 포함됩니다. 이렇게 하면 패킹 파일을 다른 `.exe`와 조합해서는 실행할 수 없습니다. 중요한 점은, 아이콘 교체나 매니페스트 수정처럼 `.exe`를 건드리는 작업은 반드시 패킹 전에 마쳐야 한다는 것입니다. 패킹 후에 `.exe`를 수정하면 해시가 달라져 게임이 열리지 않습니다.

---

### 3-4. 추가 설정

**Block Window Resize**

`true`로 설정하면 플레이어가 게임 창의 크기를 조절하거나 최대화할 수 없습니다. 최대화 버튼이 사라지거나 작동하지 않을 수 있습니다.

**Block F2 / F4 / F5 Key**

각각 프레임 레이트 표시(F2), 전체화면 전환(F4), 새로고침(F5)을 차단합니다. 배포용 게임에서 이 기능들이 사용되는 것이 불편하다면 활성화하세요.

---

### 3-5. 플레이어 자동 업데이트 설정

**Player Auto Update**

`true`로 설정하면 게임 시작 시 GitHub 릴리스 서버와 통신해 새 버전의 패킹 파일이 있으면 자동으로 다운로드 후 교체합니다. 이 기능을 쓰려면 아래 `Player Auto Update URL`도 반드시 설정해야 합니다.

`true`로 설정되어있는 경우, 패킹 완료 이후에 다시 켜지지 않고 꺼집니다. 이때에 다시 켜신다면 이전 버전으로 업데이트를 시도하므로, 켜지 말고서 패킹 파일을 GitHub 릴리즈에 배포해야 합니다.

패킹이 잘 되었는지, 테스트가 필요한 경우, `false`로 설정한 후에 테스트를 해야 문제 없이 작동됩니다.

**Player Auto Update URL**

업데이트를 받아올 GitHub 저장소 URL입니다. `https://github.com/계정명/저장소명` 형태로 입력하면 됩니다. 비공개 저장소는 지원되지 않습니다.

예: https://github.com/Churitoring/SecuPacker

**Player Auto Update Tag**

비워두면 항상 최신 릴리스에서 업데이트합니다.

태그를 입력하셨다면, 해당 태그를 가진 가장 최신 릴리즈에서 업데이트합니다. 한개의 저장소를 만든 후, 해당 저장소의 릴리즈에서 해당 게임에 맞는 태그를 추가하는 것을 추천합니다. 이 경우, SecuPacker의 Player Auto Update 기능을 여러 게임에 사용해도 단일 저장소로 관리 가능하기 때문입니다.

예: SecuPacker

**Disable On No Internet / Disable On Fail**

인터넷이 없거나 업데이트 서버에 연결이 안 될 때의 동작을 설정합니다.

만약, 게임이 인터넷에 연결되어 있지 않을때에만 꺼지게 하고는 싶지만, 업데이트 기능을 사용하고 싶지 않으시다면, `Player Auto Update`를 `true`로, `Player Auto Update URL`를 빈칸으로, `Disable On No Internet`을 `true`로, `Disable On Fail`을 `false`로 설정하는 것을 추천합니다.

- `Disable On No Internet`을 `true`로 하면 인터넷이 없을 때 경고를 띄우고 게임을 종료합니다.
- `Disable On Fail`을 `true`로 하면 서버에는 연결됐지만 파일을 받아오는 데 실패해도 게임을 종료합니다.

**업데이트 화면 설정 (PAU Scene \*)**

자동 업데이트 진행 중에 표시되는 화면의 UI를 설정합니다.

*텍스트*

- **PAU Scene Update Text**: 업데이트 다운로드 중에 타이틀 영역에 표시할 텍스트입니다. 기본값: `Updating...`
- **PAU Scene Complete Text**: 업데이트가 성공적으로 완료됐을 때 타이틀 영역에 표시할 텍스트입니다. 기본값: `Update complete!`
- **PAU Scene Failed Text**: 업데이트가 실패했을 때 타이틀 영역에 표시할 텍스트입니다. 기본값: `Update failed`

*애니메이션*

- **PAU Scene Blink**: 타이틀 텍스트에 숨쉬듯 깜빡이는 불투명도 애니메이션을 적용합니다. 기본값: `true`
- **PAU Scene Blink Speed**: 깜빡임 속도입니다. 값이 클수록 빠릅니다. `0.050` 기준 약 2초에 한 사이클(60fps). 범위: `0.001` ~ `1.000`, 기본값: `0.050`

*진행률*

- **PAU Scene Show Progress**: 다운로드 중 서브 텍스트 영역에 진행률(%)과 용량(KB) 정보를 표시합니다. 기본값: `true`

*배경*

- **PAU Scene BG Type**: 배경 유형을 선택합니다. `color`(단색) / `image`(이미지) / `video`(동영상). 기본값: `color`
- **PAU Scene BG Color**: 배경 유형이 `color`일 때 사용할 CSS 색상 코드입니다. 기본값: `#000000`
- **PAU Scene BG Image**: 배경 유형이 `image`일 때 사용할 이미지 파일입니다. `img/` 폴더에서 선택합니다.
- **PAU Scene BG Video**: 배경 유형이 `video`일 때 사용할 동영상 경로입니다. 문자열로 직접 입력합니다. 예: `movies/bg.webm`
- **PAU Scene BG Fit**: 이미지 또는 동영상이 화면 비율과 맞지 않을 때의 맞춤 방식입니다. `cover`(화면을 꽉 채우도록 잘라냄) / `contain`(레터박스, 비율 유지) / `fill`(화면에 맞게 늘림). 기본값: `cover`
- **PAU Scene Video Loop**: 배경 동영상을 반복 재생합니다. `false`이면 마지막 프레임에서 정지합니다. 기본값: `true`
- **PAU Scene Video Volume**: 배경 동영상의 오디오 볼륨입니다. `0`(무음) ~ `100`. 기본값: `100`

*배경 음악*

- **PAU Scene BG Music**: 업데이트 화면에서 재생할 음악 파일입니다. `audio/` 폴더에서 선택합니다. 동영상 배경과 함께 사용 가능합니다.
- **PAU Scene BG Music Volume**: 배경 음악 볼륨입니다. `0`(무음) ~ `100`. 기본값: `80`
- **PAU Scene BG Music Loop**: 배경 음악을 반복 재생합니다. `false`이면 한 번 재생 후 정지합니다. 기본값: `true`

*타이틀 텍스트 스타일*

- **PAU Scene Title X Offset**: 타이틀 텍스트의 화면 중앙 기준 수평 오프셋(픽셀)입니다. `0` = 중앙. 기본값: `0`
- **PAU Scene Title Y Offset**: 타이틀 텍스트의 화면 중앙 기준 수직 오프셋(픽셀)입니다. 음수면 위로 이동합니다. 기본값: `-30`
- **PAU Scene Title Size**: 타이틀 텍스트의 폰트 크기(픽셀)입니다. 기본값: `36`
- **PAU Scene Title Color**: 타이틀 텍스트 색상입니다. CSS hex 형식으로 입력합니다. 기본값: `#ffffff`
- **PAU Scene Title Outline Width**: 타이틀 텍스트 외곽선 두께(픽셀)입니다. `0`이면 외곽선 없음. 기본값: `0`
- **PAU Scene Title Outline Color**: 타이틀 텍스트 외곽선 색상입니다. CSS hex 또는 `rgba()` 형식을 지원합니다. 기본값: `rgba(0,0,0,0.5)`

*서브 텍스트 스타일*

서브 텍스트는 진행률이나 상태 메시지가 표시되는 타이틀 아래 보조 줄입니다.

- **PAU Scene Sub X Offset**: 서브 텍스트의 화면 중앙 기준 수평 오프셋(픽셀)입니다. 기본값: `0`
- **PAU Scene Sub Y Offset**: 서브 텍스트의 화면 중앙 기준 수직 오프셋(픽셀)입니다. 기본값: `30`
- **PAU Scene Sub Size**: 서브 텍스트의 폰트 크기(픽셀)입니다. 기본값: `18`
- **PAU Scene Sub Color**: 서브 텍스트 색상입니다. CSS hex 형식으로 입력합니다. 기본값: `#888888`
- **PAU Scene Sub Outline Width**: 서브 텍스트 외곽선 두께(픽셀)입니다. `0`이면 외곽선 없음. 기본값: `0`
- **PAU Scene Sub Outline Color**: 서브 텍스트 외곽선 색상입니다. CSS hex 또는 `rgba()` 형식을 지원합니다. 기본값: `rgba(0,0,0,0.5)`

---

## 4. JavaScript API

플러그인 커맨드 대신 다른 플러그인이나 스크립트 호출에서 직접 사용할 수 있는 API입니다.

API 직접 호출 시 SecuPacker에 대한 의존성이 발생합니다. 플러그인 해제 시의 사이드 이펙트를 방지하기 위해 예외 처리(존재 여부 검사) 후 사용하시기 바랍니다.

**`SecuPacker.getVersion()`**

SecuPacker의 버전 문자열을 반환합니다.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

게임이 패킹된 상태로 실행 중이면 `true`, 아니면 `false`를 반환합니다. 개발 중 플레이테스트에서는 항상 `false`이므로, 패킹 여부에 따라 동작을 분기할 때 활용할 수 있습니다.

```javascript
if (SecuPacker.isPacked()) {
    // 배포 빌드에서만 실행할 코드
}
```

**`SecuPacker.isSplitAvailable(binName)`**

지정한 이름의 분할 패킹 파일이 존재하고 접근 가능하면 `true`를 반환합니다. DLC 파일이 설치되어 있는지 확인할 때 쓸 수 있습니다.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true 또는 false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

플레이어 자동 업데이트가 활성화되어 있고 URL이 설정된 경우 `true`를 반환합니다.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true 또는 false
```

---

## 5. 플러그인 커맨드

MZ에서 사용 가능한 플러그인 커맨드입니다.

**GetVersion** — SecuPacker의 버전 문자열을 게임 변수에 저장합니다.

**IsPacked** — 게임이 패킹된 상태이면 `true`, 아니면 `false`를 게임 변수에 저장합니다. 패킹 여부에 따라 게임 내 동작을 분기할 때 사용합니다.

**IsSplitAvailable** — 지정한 이름의 분할 패킹 파일이 존재하고 접근 가능한지 확인해 게임 변수에 저장합니다. DLC 파일 유무를 확인할 때 활용할 수 있습니다.

**IsPlayerAutoUpdateReady** — 플레이어 자동 업데이트가 활성화되어 있고 URL이 설정된 경우 `true`를 게임 변수에 저장합니다.

---

## 6. 주의 사항

- **프로젝트 파일 보호**: 배포 폴더 안에 `*.rpgproject` 또는 `*.rmmzproject` 파일이 있으면 개발 디렉터리로 판단해 패킹을 중단합니다. 반드시 배포된 폴더에서 실행하세요.
- **개인정보 주의**: 영원한 보안은 존재하지 않습니다. 아무리 안전하다고 해도, 누군가는 뚫을 수도 있으므로, ID, 비밀번호, API Key와 같은 개인정보/민감정보는 게임 파일에 포함하지 마세요.
- **저작권 주의**: 패킹 파일과 같은 경로에 존재하는 LICENSE.txt를 제거하지 마세요. 제거하고 배포하면, 저작권법에 저촉될 수 있습니다.
- **패킹 후 검은 화면**: 패킹 전 테스트 플레이에서는 정상적으로 작동했는데, 패킹 후 게임을 실행하면 오류 메시지와 함께, 검은 화면에서 멈추는 경우가 있습니다. 이때에는 MV의 경우 index.html, MZ의 경우 main.js에 등록된 스크립트에 오류가 있을때 발생합니다. 스크립트를 추가했거나, 등록된 스크립트를 수정한 경우, 그것의 문제일 확률이 높습니다.