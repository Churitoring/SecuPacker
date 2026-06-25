# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <b>Polski</b>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Download_Plugin-4CAF50?style=for-the-badge" alt="Pobierz wtyczkę" />
</a>

Wtyczka do bezpiecznego pakowania zasobów dla RPG Maker MV / MZ.

> **Tylko Windows.** Nie działa na macOS ani Linux.

---

## Spis treści
<img src="../image/example.png" alt="Example Image" width="300" align="right" />

1. [Jak używać](#1-jak-używać)
2. [Wymagania](#2-wymagania)
3. [Opis parametrów](#3-opis-parametrów)
   - [3-1. Ogólne ustawienia pakowania](#3-1-ogólne-ustawienia-pakowania)
   - [3-2. Ustawienia pakowania plików](#3-2-ustawienia-pakowania-plików)
   - [3-3. Ustawienia zabezpieczeń](#3-3-ustawienia-zabezpieczeń)
   - [3-4. Ustawienia dodatkowe](#3-4-ustawienia-dodatkowe)
   - [3-5. Ustawienia autoupdate gracza](#3-5-ustawienia-autoupdate-gracza)
4. [API JavaScript](#4-api-javascript)
5. [Polecenia wtyczki](#5-polecenia-wtyczki)
6. [Uwagi](#6-uwagi)

---

## 1. Jak używać

Podstawowy przepływ pakowania wygląda następująco.

**Krok 1 — Zainstaluj wtyczkę**

Umieść `Churitoring_SecuPacker.js` w folderze `js/plugins/` swojego projektu i włącz ją w Menedżerze Wtyczek RPG Maker. Skonfiguruj parametry zgodnie z własnymi preferencjami na tym etapie.

**Krok 2 — Utwórz folder dystrybucji**

W RPG Maker przejdź do **Plik > Deployment** i wyeksportuj dla platformy **Windows**.

**Krok 3 — Uruchom pakowanie**

Uruchom plik `.exe` gry w folderze dystrybucji. Automatycznie pojawi się ekran postępu pakowania. Nie zamykaj okna w trakcie tego procesu. Nawet jeśli wymusisz zamknięcie w połowie, gra najprawdopodobniej się odzyska przy następnym uruchomieniu — ale najlepiej po prostu poczekać.

**Krok 4 — Dystrybucja**

Po zakończeniu pakowania gra uruchomi się ponownie automatycznie. Możesz wtedy przekazać ten folder dystrybucji bezpośrednio swoim graczom.

Uwaga: Jeśli `Autoupdate gracza` jest ustawiony na `true`, gra zamknie się (zamiast uruchomić ponownie) po oknie dialogowym z potwierdzeniem. Nie uruchamiaj gry ponownie w tym momencie — spowoduje to próbę aktualizacji przy użyciu starej wersji. Najpierw prześlij spakowane pliki do GitHub Releases.

---

## 2. Wymagania

- RPG Maker MV 1.6.0 lub nowszy, albo RPG Maker MZ 1.0.0 lub nowszy
- NW.js 0.28.1 lub nowszy

---

## 3. Opis parametrów

### 3-1. Ogólne ustawienia pakowania

**Autoupdate Packera**

Przed rozpoczęciem pakowania wtyczka pobierze najnowszą wersję z GitHub i nadpisze `js/plugins/Churitoring_SecuPacker.js`. Jeśli dokonałeś bezpośrednich modyfikacji w tym pliku, musisz ustawić tę opcję na `false` — w przeciwnym razie Twoje zmiany zostaną cofnięte przy każdym pakowaniu. Jeśli używasz wtyczki bez żadnych modyfikacji, zostaw jako `true`.

**Nazwa pliku binarnego**

Nazwa pliku wyjściowego po spakowaniu. Wartość domyślna to `game.bin`, ale możesz ją zmienić tutaj. Akceptowana jest tylko nazwa pliku — ścieżki nie są dozwolone. Zaleca się zmianę na coś mniej przewidywalnego. Rozszerzenie pliku również można zmienić.

**Śledź zapis w trakcie gry**

Podczas testowania, jeśli inne wtyczki tworzą lub modyfikują pliki, ścieżki tych plików są zapisywane w `data/SecuPacker_RuntimeWrites.txt`. Podczas pakowania pliki wymienione tam są wykluczane z paczki i pozostawiane na dysku w niezmienionej postaci.

Jeśli używasz wtyczek, które automatycznie generują pliki takie jak pliki konfiguracyjne, włącz tę opcję. Zaleca się pozostawienie domyślnej wartości `true`, chyba że masz konkretny powód, by ją wyłączyć.

Uwaga: Pliki śledzone przez tę opcję są wykluczone z Autoupdate gracza i ochrony SecuPacker.

**Usuń atrybut tylko do odczytu**

Podczas końcowego etapu czyszczenia pakowania oryginalne pliki zasobów są usuwane. Jeśli jakiekolwiek pliki mają ustawiony atrybut tylko do odczytu (R), usunięcie się nie powiedzie. Jeśli zarządzasz projektem za pomocą Git lub używasz narzędzi, które automatycznie oznaczają pliki jako tylko do odczytu, ustawienie tego na `true` uruchomi `attrib -R` przed usunięciem, aby zapobiec problemom. Zaleca się pozostawienie domyślnej wartości `true`, chyba że masz konkretny powód, by ją wyłączyć.

---

### 3-2. Ustawienia pakowania plików

**Dzielenie plików**

Zamiast pakować wszystkie zasoby do jednego pliku, umożliwia to dystrybucję zasobów na kilka spakowanych plików. Przydatne do oddzielenia zasobów DLC od podstawowej gry lub do podziału dużych projektów na wiele plików. Ustawienie na `false` spowoduje również zignorowanie wszystkich wpisów z Listy podziału plików poniżej.

**Lista podziału plików**

Definiuje reguły, które pliki/foldery trafiają do którego spakowanego pliku. Każdy wpis ma dwa ustawienia:

- **Plik Bin fragmentu**: Nazwa pliku dla tej grupy plików. Musi różnić się od głównej nazwy paczki ustawionej w Nazwie pliku binarnego. Np.: `dlc.bin`, `bgm.bin`
- **Wzorce ścieżek fragmentu**: Lista ścieżek do dołączenia do tego pliku. Podanie folderu jak `audio/bgm` dołączy wszystkie pliki w nim zawarte rekurencyjnie. Możesz też podać pojedynczy plik, np. `audio/se/boss.ogg`.

**Wykluczenia z pakowania**

Określa pliki lub foldery do wykluczenia z pakowania i pozostawienia na dysku. Ścieżki są względne do katalogu głównego projektu i muszą używać ukośników (`/`). Np.: `img/system/Loading.png`, `audio/bgm`

Dodaj tutaj wszystkie pliki, które muszą być odczytywane bezpośrednio z dysku podczas działania gry. Pliki na tej liście są wykluczone z pakowania i nie zostaną usunięte.

Uwaga: Pliki na tej liście są wykluczone z Autoupdate gracza i ochrony SecuPacker.

---

### 3-3. Ustawienia zabezpieczeń

**Biała lista argumentów startowych**

Jeśli przy uruchomieniu zostanie wykryty argument zapytania URL lub NW.js, który nie jest na tej liście, gra natychmiast się zamknie. Domyślna wartość to pusta lista, co oznacza, że wszystkie zewnętrzne argumenty są domyślnie blokowane. Dodaj do tej listy wszelkie argumenty, które powinny być dozwolone.

To sprawdzenie dotyczy tylko spakowanych kompilacji dystrybucyjnych i nie jest egzekwowane podczas testowania w trybie deweloperskim.

**Wczesne rozwiązywanie Blob**

Przesuwa moment, w którym ścieżki plików są konwertowane na URL Blob (wewnątrz spakowanego pliku), do etapu `Bitmap.load`. W większości przypadków użycia zostaw jako `true`.

Jeśli jednak używasz wtyczki, która bezpośrednio przechwytuje `fs.readFile` lub `XMLHttpRequest`, aby obsługiwać własne deszyfrowanie, ustaw na `false`, jeśli występują konflikty.

Ustawienie na `false` może zmniejszyć kompatybilność.

**Wykrywanie oszustw**

Okresowo skanuje w poszukiwaniu narzędzi hakerskich działających jako procesy w tle.

**Wykluczone hashe binarne**

Nazwy (lub częściowe nazwy) plików binarnych do wykluczenia podczas obliczania hasha odcisku środowiska.

Powodem, dla którego `ffmpeg` jest domyślnie wykluczony, jest licencja FFmpeg (LGPL). LGPL wymaga, aby użytkownicy mogli zastąpić plik binarny własną wersją. Włączenie FFmpeg do hasha spowodowałoby zmianę hasha po zastąpieniu, uniemożliwiając uruchomienie gry — dlatego jest domyślnie wykluczony ze względu na zgodność z licencją.

Zostaw domyślną wartość, chyba że masz konkretny powód, aby ją zmienić.

Przykład: `ffmpeg.dll` (wyklucza tylko ffmpeg.dll)  
Przykład: `ffmpeg` (wyklucza zarówno ffmpeg.dll, jak i ffmpegsumo.dll)

**Hashuj pliki Exe**

Gdy ustawiono na `true`, plik `.exe` gry jest również dołączony do hasha odcisku środowiska. Zapobiega to uruchomieniu spakowanego pliku z innym `.exe`. Ważne: wszelkie zmiany w `.exe` — takie jak zastąpienie ikony lub modyfikacja manifestu — muszą być dokonane **przed** pakowaniem. Modyfikacja `.exe` po spakowaniu zmieni hash i uniemożliwi uruchomienie gry.

---

### 3-4. Ustawienia dodatkowe

**Blokuj zmianę rozmiaru okna**

Gdy ustawiono na `true`, gracze nie mogą zmieniać rozmiaru ani maksymalizować okna gry. Przycisk maksymalizacji może zniknąć lub przestać działać.

**Blokuj klawisz F2 / F4 / F5**

Blokuje odpowiednio wyświetlanie licznika klatek (F2), przełączanie trybu pełnoekranowego (F4) i odświeżanie gry (F5). Włącz te opcje, jeśli nie chcesz, aby gracze mieli dostęp do tych funkcji w kompilacji dystrybucyjnej.

---

### 3-5. Ustawienia autoupdate gracza

**Autoupdate gracza**

Gdy ustawiono na `true`, gra komunikuje się z serwerem wydań GitHub przy uruchomieniu. Jeśli dostępna jest nowa wersja spakowanego pliku, jest ona automatycznie pobierana i zastępowana. Aby korzystać z tej funkcji, musisz również skonfigurować `URL autoupdate` poniżej.

Gdy ustawiono na `true`, gra zamknie się (zamiast uruchomić ponownie) po zakończeniu pakowania. Nie uruchamiaj gry ponownie w tym momencie — spowoduje to próbę aktualizacji przy użyciu starej wersji. Najpierw prześlij spakowane pliki do GitHub Releases.

Jeśli chcesz sprawdzić, czy pakowanie powiodło się, przed testowaniem ustaw to na `false`.

**URL autoupdate**

Adres URL repozytorium GitHub, z którego będą pobierane aktualizacje. Wpisz w formacie `https://github.com/nazwauzytkownika/repozytorium`. Prywatne repozytoria nie są obsługiwane.

Przykład: `https://github.com/Churitoring/SecuPacker`

**Tag autoupdate**

Jeśli pozostawiony pusty, zawsze aktualizuje z najnowszego wydania.

Jeśli określony zostanie tag, aktualizuje z najnowszego wydania posiadającego ten tag. Zaleca się utworzenie jednego repozytorium i przypisywanie tagów specyficznych dla gry do wydań w nim — w ten sposób funkcja Autoupdate gracza może obsługiwać wiele gier z jednego repozytorium.

Przykład: `SecuPacker`

**Wyłącz przy braku internetu / Wyłącz przy błędzie**

Konfiguruje zachowanie, gdy nie ma połączenia z internetem lub serwer aktualizacji jest niedostępny.

Jeśli chcesz, aby gra zamykała się tylko w przypadku braku połączenia z internetem, ale nie chcesz faktycznie korzystać z funkcji aktualizacji, zaleca się ustawienie `Autoupdate gracza` na `true`, pozostawienie `URL autoupdate` pustego, ustawienie `Wyłącz przy braku internetu` na `true` i `Wyłącz przy błędzie` na `false`.

- Ustawienie `Wyłącz przy braku internetu` na `true` wyświetli ostrzeżenie i zamknie grę, gdy nie ma połączenia z internetem.
- Ustawienie `Wyłącz przy błędzie` na `true` zamknie grę nawet wtedy, gdy serwer jest dostępny, ale pliku nie można pobrać.

**Ustawienia ekranu aktualizacji (PAU Scene \*)**

Konfiguruje interfejs wyświetlany podczas procesu automatycznej aktualizacji.

*Tekst*

- **Tekst podczas aktualizacji**: Tekst wyświetlany w obszarze tytułu podczas pobierania aktualizacji. Domyślnie: `Updating...`
- **Tekst po ukończeniu**: Tekst wyświetlany w obszarze tytułu po pomyślnym ukończeniu aktualizacji. Domyślnie: `Update complete!`
- **Tekst przy błędzie**: Tekst wyświetlany w obszarze tytułu gdy aktualizacja się nie powiodła. Domyślnie: `Update failed`

*Animacja*

- **Efekt migania**: Stosuje animację pulsującej przezroczystości do tekstu tytułu. Domyślnie: `true`
- **Szybkość migania**: Prędkość cyklu migania. Wyższe wartości = szybciej. Przy `0.050`, około jeden cykl co 2 sekundy przy 60fps. Zakres: `0.001` ~ `1.000`. Domyślnie: `0.050`

*Postęp*

- **Pokaż postęp**: Wyświetla postęp pobierania (%) i rozmiar (KB) w obszarze podtytułu podczas aktualizacji. Domyślnie: `true`

*Tło*

- **Typ tła**: Wybiera typ tła. `color` (jednolity kolor) / `image` (obraz) / `video`. Domyślnie: `color`
- **Kolor tła**: Kod koloru CSS dla jednolitego tła gdy typ to `color`. Domyślnie: `#000000`
- **Obraz tła**: Plik obrazu tła gdy typ to `image`. Wybierz z folderu `img/`.
- **Wideo tła**: Ścieżka pliku wideo gdy typ to `video`. Wpisz jako ciąg znaków. Np.: `movies/bg.webm`
- **Tryb dopasowania tła**: Jak dopasować obraz lub wideo, gdy proporcje nie pasują do ekranu. `cover` (przytnij, aby wypełnić ekran) / `contain` (letterbox, zachowaj proporcje) / `fill` (rozciągnij do ekranu). Domyślnie: `cover`
- **Pętla wideo**: Odtwarza wideo tła w pętli. Jeśli `false`, wideo zatrzymuje się na ostatniej klatce. Domyślnie: `true`
- **Głośność wideo**: Głośność audio wideo tła. `0` (wyciszony) ~ `100`. Domyślnie: `100`

*Muzyka w tle*

- **Muzyka w tle**: Plik muzyczny do odtworzenia na ekranie aktualizacji. Wybierz z folderu `audio/`. Może być odtwarzany razem z wideo w tle.
- **Głośność muzyki**: Głośność muzyki w tle. `0` (cisza) ~ `100`. Domyślnie: `80`
- **Pętla muzyki**: Odtwarza muzykę w tle w pętli. Jeśli `false`, odtwarza raz i zatrzymuje. Domyślnie: `true`

*Styl tekstu tytułu*

- **Odsunięcie X tytułu**: Poziome przesunięcie tekstu tytułu od środka ekranu w pikselach. `0` = wyśrodkowany. Domyślnie: `0`
- **Odsunięcie Y tytułu**: Pionowe przesunięcie tekstu tytułu od środka ekranu w pikselach. Ujemne wartości przesuwają go w górę. Domyślnie: `-30`
- **Rozmiar czcionki tytułu**: Rozmiar czcionki tekstu tytułu w pikselach. Domyślnie: `36`
- **Kolor tekstu tytułu**: Kolor tekstu tytułu w formacie CSS hex. Domyślnie: `#ffffff`
- **Grubość obramowania tytułu**: Grubość obramowania tekstu tytułu w pikselach. `0` = brak obramowania. Domyślnie: `0`
- **Kolor obramowania tytułu**: Kolor obramowania tekstu tytułu. Obsługuje CSS hex lub format `rgba()`. Domyślnie: `rgba(0,0,0,0.5)`

*Styl podtytułu*

Podtytuł to dodatkowa linia pod tytułem, wyświetlająca komunikaty o postępie lub statusie.

- **Odsunięcie X podtytułu**: Poziome przesunięcie podtytułu od środka ekranu w pikselach. Domyślnie: `0`
- **Odsunięcie Y podtytułu**: Pionowe przesunięcie podtytułu od środka ekranu w pikselach. Domyślnie: `30`
- **Rozmiar czcionki podtytułu**: Rozmiar czcionki podtytułu w pikselach. Domyślnie: `18`
- **Kolor podtytułu**: Kolor podtytułu w formacie CSS hex. Domyślnie: `#888888`
- **Grubość obramowania podtytułu**: Grubość obramowania podtytułu w pikselach. `0` = brak obramowania. Domyślnie: `0`
- **Kolor obramowania podtytułu**: Kolor obramowania podtytułu. Obsługuje CSS hex lub format `rgba()`. Domyślnie: `rgba(0,0,0,0.5)`

---

## 4. API JavaScript

Te API mogą być wywoływane bezpośrednio z innych wtyczek lub wywołań skryptów, jako alternatywa dla Poleceń Wtyczki.

Bezpośrednie wywoływanie API tworzy zależność od SecuPacker. Aby uniknąć efektów ubocznych, gdy wtyczka jest wyłączona, zawsze sprawdzaj istnienie obiektu przed wywołaniem.

**`SecuPacker.getVersion()`**

Zwraca ciąg wersji SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Zwraca `true`, jeśli gra działa w trybie spakowanym, `false` w przeciwnym razie. Zawsze zwraca `false` podczas testowania w trybie deweloperskim, więc może być użyte do rozgałęzienia zachowania w zależności od tego, czy gra jest kompilacją dystrybucyjną.

```javascript
if (SecuPacker.isPacked()) {
    // Kod do uruchomienia tylko w kompilacjach dystrybucyjnych
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Zwraca `true`, jeśli określony podzielony plik spakowany istnieje i jest dostępny. Przydatne do sprawdzenia, czy plik DLC jest zainstalowany.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true lub false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Zwraca `true`, jeśli Autoupdate gracza jest włączony i skonfigurowany jest URL.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true lub false
```

---

## 5. Polecenia wtyczki

Polecenia wtyczki dostępne w MZ.

**GetVersion** — Przechowuje ciąg wersji SecuPacker w zmiennej gry.

**IsPacked** — Przechowuje `true`, jeśli gra jest spakowana, `false` w przeciwnym razie, w zmiennej gry. Użyj tego, aby rozgałęzić zachowanie w grze w zależności od tego, czy kompilacja jest kompilacją dystrybucyjną.

**IsSplitAvailable** — Sprawdza, czy określony podzielony plik spakowany istnieje i jest dostępny, i przechowuje wynik w zmiennej gry. Przydatne do sprawdzania, czy plik DLC jest obecny.

**IsPlayerAutoUpdateReady** — Przechowuje `true` w zmiennej gry, jeśli Autoupdate gracza jest włączony i skonfigurowany jest URL.

---

## 6. Uwagi

- **Ochrona pliku projektu**: Jeśli plik `*.rpgproject` lub `*.rmmzproject` zostanie znaleziony w folderze dystrybucji, wtyczka potraktuje go jako katalog deweloperski i przerwie pakowanie. Zawsze uruchamiaj packer z folderu dystrybucji, nie z folderu projektu deweloperskiego.
- **Ostrzeżenie o prywatności**: Żadne zabezpieczenie nie jest absolutne. Niezależnie od tego, jak bezpieczny jest system, ktoś może w końcu znaleźć sposób — więc nigdy nie umieszczaj danych osobowych ani poufnych, takich jak identyfikatory, hasła lub klucze API, w plikach gry.
- **Informacja o prawach autorskich**: Nie usuwaj pliku `credits.html`. Dystrybucja bez niego może stanowić naruszenie praw autorskich.
- **Czarny ekran po spakowaniu**: Jeśli gra działała normalnie podczas testowania przed spakowaniem, ale zawiesza się na czarnym ekranie z komunikatem o błędzie po spakowaniu, jest to zazwyczaj spowodowane błędem w skrypcie zarejestrowanym w `index.html` (MV) lub `main.js` (MZ). Jeśli dodałeś własne skrypty lub zmodyfikowałeś jakiekolwiek zarejestrowane skrypty, są one najbardziej prawdopodobnymi winowajcami.
