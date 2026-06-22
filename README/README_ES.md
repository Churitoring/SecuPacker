# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <b>Español</b> | <a href="README_FR.md">Français</a> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="RDME/README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Download_Plugin-4CAF50?style=for-the-badge" alt="Download Plugin" />
</a>

Un plugin de empaquetado de seguridad de recursos para RPG Maker MV / MZ.

> **Solo para Windows.** No funciona en macOS ni Linux.

---

## Tabla de contenidos

1. [Cómo usar](#1-cómo-usar)
2. [Requisitos](#2-requisitos)
3. [Referencia de parámetros](#3-referencia-de-parámetros)
   - [3-1. Configuración general de empaquetado](#3-1-configuración-general-de-empaquetado)
   - [3-2. Configuración de empaquetado de archivos](#3-2-configuración-de-empaquetado-de-archivos)
   - [3-3. Ajustes de seguridad](#3-3-ajustes-de-seguridad)
   - [3-4. Ajustes adicionales](#3-4-ajustes-adicionales)
   - [3-5. Ajustes de actualización automática](#3-5-ajustes-de-actualización-automática)
4. [API de JavaScript](#4-api-de-javascript)
5. [Comandos de plugin](#5-comandos-de-plugin)
6. [Notas](#6-notas)

---

## 1. Cómo usar

El flujo básico de empaquetado es el siguiente.

**Paso 1 — Instalar el plugin**

Coloca `Churitoring_SecuPacker.js` en la carpeta `js/plugins/` de tu proyecto y actívalo en el Administrador de plugins de RPG Maker. Configura los parámetros a tu gusto en este paso.

**Paso 2 — Crear la carpeta de distribución**

En RPG Maker, ve a **Archivo > Despliegue** y despliega para la plataforma **Windows**.

**Paso 3 — Ejecutar el empaquetado**

Ejecuta el `.exe` del juego dentro de la carpeta desplegada. Aparecerá automáticamente una pantalla de progreso de empaquetado. No cierres la ventana durante este proceso. Incluso si fuerzas el cierre a mitad, lo más probable es que el juego se recupere en el siguiente inicio — pero lo mejor es simplemente esperar.

**Paso 4 — Distribuir**

Una vez completado el empaquetado, el juego se relanzará automáticamente. A partir de entonces, puedes distribuir esta carpeta de despliegue directamente a tus jugadores.

Nota: Si `Player Auto Update` está en `true`, el juego se cerrará (en lugar de relanzarse) después de un diálogo de confirmación. No relances el juego en ese momento — hacerlo provocará un intento de actualización usando la versión antigua. En su lugar, sube primero los archivos empaquetados a GitHub Releases.

---

## 2. Requisitos

- RPG Maker MV 1.6.0 o posterior, o RPG Maker MZ 1.0.0 o posterior
- NW.js 0.28.1 o posterior (recomendado: 0.44.3 o posterior)

---

## 3. Referencia de parámetros

### 3-1. Configuración general de empaquetado

**Packer Auto Update**

Antes de que comience el empaquetado, el plugin obtendrá la última versión de GitHub y sobreescribirá `js/plugins/Churitoring_SecuPacker.js`. Si has realizado modificaciones directas en este archivo, debes establecer esto en `false` — de lo contrario, tus cambios serán revertidos cada vez que empaquetes. Si usas el plugin tal cual, sin modificaciones, déjalo en `true`.

**Game Binary Name**

El nombre de archivo para el archivo de salida empaquetado. El valor predeterminado es `game.bin`, pero puedes cambiarlo aquí. Solo se acepta un nombre de archivo — no se permiten rutas. Se recomienda cambiarlo por algo menos predecible. La extensión del archivo también puede modificarse.

**Track Runtime Writes**

Durante el modo de prueba, si otros plugins crean o modifican archivos, esas rutas de archivo se registran en `data/SecuPacker_RuntimeWrites.txt`. Al empaquetar, los archivos listados allí quedan excluidos del paquete y se dejan en disco tal como están.

Si usas plugins que generan automáticamente archivos como archivos de configuración, activa esta opción. Se recomienda dejar el valor predeterminado `true` a menos que tengas una razón específica para desactivarlo.

Nota: Los archivos rastreados por esta opción quedan excluidos de Player Auto Update y de la protección de SecuPacker.

**Strip Read-Only Attributes**

Durante la etapa de limpieza final del empaquetado, los archivos de recursos originales son eliminados. Si algún archivo tiene el atributo de solo lectura (R), la eliminación fallará. Si gestionas tu proyecto con Git o usas herramientas que marcan automáticamente los archivos como solo lectura, establecer esto en `true` ejecutará `attrib -R` antes de la eliminación para evitar problemas. Se recomienda dejar el valor predeterminado `true` a menos que tengas una razón específica para desactivarlo.

---

### 3-2. Configuración de empaquetado de archivos

**File Split**

En lugar de empaquetar todos los recursos en un único archivo, esto permite distribuir los recursos en varios archivos empaquetados. Útil para separar recursos de DLC del juego base, o para dividir proyectos grandes en varios archivos. Establecer esto en `false` también ignorará todas las entradas de File Split List a continuación.

**File Split List**

Define reglas sobre qué archivos o carpetas van a qué archivo empaquetado. Cada entrada tiene dos configuraciones:

- **Split Bin File**: El nombre de archivo para este grupo de archivos. Debe ser diferente del nombre del paquete principal establecido en Game Binary Name. Ej.: `dlc.bin`, `bgm.bin`
- **Split Path Patterns**: Una lista de rutas a incluir en este archivo. Especificar una carpeta como `audio/bgm` incluirá todos los archivos dentro de ella de forma recursiva. También puedes especificar un archivo individual como `audio/se/boss.ogg`.

**Packed File Exclusions**

Especifica archivos o carpetas a excluir del empaquetado y dejar en disco. Las rutas son relativas a la raíz del proyecto y deben usar barras diagonales (`/`). Ej.: `img/system/Loading.png`, `audio/bgm`

Agrega aquí cualquier archivo que deba leerse directamente desde el disco en tiempo de ejecución. Los archivos en esta lista quedan excluidos del empaquetado y no serán eliminados.

Nota: Los archivos en esta lista quedan excluidos de Player Auto Update y de la protección de SecuPacker.

---

### 3-3. Ajustes de seguridad

**Block Launch Args Whitelist**

Si al iniciar se detecta algún argumento de cadena de consulta de URL o de inicio de NW.js que no esté en esta lista, el juego saldrá inmediatamente. El valor predeterminado es una lista vacía, lo que significa que todos los argumentos externos están bloqueados por defecto. Agrega a esta lista los argumentos que deban permitirse.

Esta comprobación solo se aplica a las versiones de distribución empaquetadas y no se aplica durante el modo de prueba de desarrollo.

**Early Blob Resolve**

Adelanta el momento en que las rutas de archivo se convierten a URLs Blob (dentro del archivo empaquetado) hasta la etapa `Bitmap.load`. Para la mayoría de los casos de uso, déjalo en `true`.

Sin embargo, si usas un plugin que intercepta directamente `fs.readFile` o `XMLHttpRequest` para gestionar su propio descifrado, establécelo en `false` si surgen conflictos.

Establecer esto en `false` puede reducir la compatibilidad.

**Enable Cheat Detection**

Analiza periódicamente los procesos en segundo plano en busca de herramientas de piratería.

**Excluded Binary Hashes**

Los nombres (o nombres parciales) de archivos binarios a excluir al calcular el hash de huella digital del entorno.

La razón por la que `ffmpeg` está incluido por defecto se debe a la licencia de FFmpeg (LGPL). La LGPL exige que los usuarios puedan reemplazar el binario con su propia versión. Incluir FFmpeg en el hash provocaría que el hash cambiara al ser reemplazado, impidiendo que el juego se inicie — por lo que se excluye por defecto para cumplir con la licencia.

Deja el valor predeterminado a menos que tengas una razón específica para cambiarlo.

Ejemplo: `ffmpeg.dll` (excluye solo ffmpeg.dll)  
Ejemplo: `ffmpeg` (excluye tanto ffmpeg.dll como ffmpegsumo.dll)

**Hash Exe Files**

Cuando se establece en `true`, el archivo `.exe` del juego también se incluye en el hash de huella digital del entorno. Esto impide que el archivo empaquetado se inicie con un `.exe` diferente. Es importante que cualquier cambio en el `.exe` — como reemplazar el icono o modificar el manifiesto — se realice **antes** de empaquetar. Modificar el `.exe` después del empaquetado cambiará el hash e impedirá que el juego se inicie.

---

### 3-4. Ajustes adicionales

**Block Window Resize**

Cuando se establece en `true`, los jugadores no pueden redimensionar ni maximizar la ventana del juego. El botón de maximizar puede desaparecer o dejar de funcionar.

**Block F2 / F4 / F5 Key**

Bloquea la visualización de la tasa de fotogramas (F2), el cambio a pantalla completa (F4) y la recarga del juego (F5), respectivamente. Activa estas opciones si no quieres que los jugadores accedan a estas funciones en una versión de distribución.

---

### 3-5. Ajustes de actualización automática

**Player Auto Update**

Cuando se establece en `true`, el juego se comunica con el servidor de lanzamientos de GitHub al inicio. Si hay disponible una nueva versión del archivo empaquetado, se descarga y reemplaza automáticamente. Para usar esta función, también debes configurar `Player Auto Update URL` a continuación.

Cuando se establece en `true`, el juego se cerrará (en lugar de relanzarse) al terminar el empaquetado, mostrando un diálogo de confirmación. No relances el juego en ese momento — hacerlo provocará un intento de actualización con la versión antigua. En su lugar, sube primero los archivos empaquetados a GitHub Releases.

Si necesitas comprobar si el empaquetado fue exitoso, establece esto en `false` antes de hacer la prueba.

**Player Auto Update URL**

La URL del repositorio de GitHub desde la que se obtendrán las actualizaciones. Introdúcela en el formato `https://github.com/usuario/repositorio`. No se admiten repositorios privados.

Ejemplo: `https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

Si se deja vacío, siempre se actualiza desde la última versión.

Si se especifica una etiqueta, se actualiza desde la versión más reciente que lleve esa etiqueta. Se recomienda crear un único repositorio y asignar etiquetas específicas por juego a las versiones dentro de él — de esta manera, la función Player Auto Update puede servir a múltiples juegos desde un único repositorio.

Ejemplo: `SecuPacker`

**Disable On No Internet / Disable On Fail**

Configura el comportamiento cuando no hay conexión a internet o el servidor de actualizaciones no es accesible.

Si quieres que el juego salga solo cuando no haya conexión a internet pero en realidad no quieres usar la función de actualización, se recomienda establecer `Player Auto Update` en `true`, dejar `Player Auto Update URL` en blanco, establecer `Disable On No Internet` en `true` y `Disable On Fail` en `false`.

- Establecer `Disable On No Internet` en `true` mostrará una advertencia y cerrará el juego cuando no haya conexión a internet.
- Establecer `Disable On Fail` en `true` cerrará el juego incluso si el servidor es accesible pero el archivo no se puede obtener.

**Configuración de la pantalla de actualización (PAU Scene \*)**

Configura la interfaz de usuario que se muestra durante el proceso de actualización automática.

*Texto*

- **PAU Scene Update Text**: Texto que se muestra en el área del título mientras se descarga la actualización. Valor predeterminado: `Updating...`
- **PAU Scene Complete Text**: Texto que se muestra en el área del título cuando la actualización se completa con éxito. Valor predeterminado: `Update complete!`
- **PAU Scene Failed Text**: Texto que se muestra en el área del título cuando la actualización falla. Valor predeterminado: `Update failed`

*Animación*

- **PAU Scene Blink**: Aplica una animación de opacidad tipo respiración al texto del título. Valor predeterminado: `true`
- **PAU Scene Blink Speed**: Velocidad del ciclo de parpadeo. Valores más altos = más rápido. Con `0.050`, aproximadamente un ciclo cada 2 segundos a 60fps. Rango: `0.001` ~ `1.000`. Valor predeterminado: `0.050`

*Progreso*

- **PAU Scene Show Progress**: Muestra el progreso de descarga (%) y el tamaño (KB) en el área de subtexto durante la actualización. Valor predeterminado: `true`

*Fondo*

- **PAU Scene BG Type**: Selecciona el tipo de fondo. `color` (color sólido) / `image` (imagen) / `video`. Valor predeterminado: `color`
- **PAU Scene BG Color**: Código de color CSS para el fondo sólido cuando el tipo es `color`. Valor predeterminado: `#000000`
- **PAU Scene BG Image**: Archivo de imagen de fondo cuando el tipo es `image`. Selecciona desde la carpeta `img/`.
- **PAU Scene BG Video**: Ruta del archivo de vídeo cuando el tipo es `video`. Introduce como cadena de texto. Ej.: `movies/bg.webm`
- **PAU Scene BG Fit**: Cómo ajustar la imagen o el vídeo cuando la relación de aspecto no coincide con la pantalla. `cover` (recortar para llenar la pantalla) / `contain` (letterbox, mantener relación de aspecto) / `fill` (estirar para llenar la pantalla). Valor predeterminado: `cover`
- **PAU Scene Video Loop**: Reproduce el vídeo de fondo en bucle. Si es `false`, el vídeo se detiene en el último fotograma. Valor predeterminado: `true`
- **PAU Scene Video Volume**: Volumen de audio del vídeo de fondo. `0` (silenciado) ~ `100`. Valor predeterminado: `100`

*Música de fondo*

- **PAU Scene BG Music**: Archivo de música que se reproducirá en la pantalla de actualización. Selecciona desde la carpeta `audio/`. Puede usarse junto con un vídeo de fondo.
- **PAU Scene BG Music Volume**: Volumen de la música de fondo. `0` (silenciado) ~ `100`. Valor predeterminado: `80`
- **PAU Scene BG Music Loop**: Reproduce la música de fondo en bucle. Si es `false`, se reproduce una vez y se detiene. Valor predeterminado: `true`

*Estilo del texto del título*

- **PAU Scene Title X Offset**: Desplazamiento horizontal en píxeles del texto del título desde el centro de la pantalla. `0` = centrado. Valor predeterminado: `0`
- **PAU Scene Title Y Offset**: Desplazamiento vertical en píxeles del texto del título desde el centro de la pantalla. Los valores negativos lo mueven hacia arriba. Valor predeterminado: `-30`
- **PAU Scene Title Size**: Tamaño de fuente del texto del título en píxeles. Valor predeterminado: `36`
- **PAU Scene Title Color**: Color del texto del título en formato CSS hex. Valor predeterminado: `#ffffff`
- **PAU Scene Title Outline Width**: Ancho del contorno del texto del título en píxeles. `0` = sin contorno. Valor predeterminado: `0`
- **PAU Scene Title Outline Color**: Color del contorno del texto del título. Admite CSS hex o formato `rgba()`. Valor predeterminado: `rgba(0,0,0,0.5)`

*Estilo del subtexto*

El subtexto es la línea secundaria debajo del título que muestra el progreso o mensajes de estado.

- **PAU Scene Sub X Offset**: Desplazamiento horizontal en píxeles del subtexto desde el centro de la pantalla. Valor predeterminado: `0`
- **PAU Scene Sub Y Offset**: Desplazamiento vertical en píxeles del subtexto desde el centro de la pantalla. Valor predeterminado: `30`
- **PAU Scene Sub Size**: Tamaño de fuente del subtexto en píxeles. Valor predeterminado: `18`
- **PAU Scene Sub Color**: Color del subtexto en formato CSS hex. Valor predeterminado: `#888888`
- **PAU Scene Sub Outline Width**: Ancho del contorno del subtexto en píxeles. `0` = sin contorno. Valor predeterminado: `0`
- **PAU Scene Sub Outline Color**: Color del contorno del subtexto. Admite CSS hex o formato `rgba()`. Valor predeterminado: `rgba(0,0,0,0.5)`

---

## 4. API de JavaScript

Estas APIs pueden llamarse directamente desde otros plugins o llamadas de script, como alternativa a los Comandos de Plugin.

Llamar directamente a la API crea una dependencia en SecuPacker. Para evitar efectos secundarios cuando el plugin esté desactivado, comprueba siempre la existencia del objeto antes de llamar.

**`SecuPacker.getVersion()`**

Devuelve la cadena de versión de SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Devuelve `true` si el juego está ejecutándose en modo empaquetado, `false` en caso contrario. Siempre devuelve `false` durante el modo de prueba de desarrollo, por lo que puede usarse para bifurcar el comportamiento según si el juego es una versión de distribución.

```javascript
if (SecuPacker.isPacked()) {
    // Código que solo se ejecuta en versiones de distribución
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Devuelve `true` si el archivo empaquetado dividido especificado existe y es accesible. Útil para comprobar si hay un archivo DLC instalado.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true o false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Devuelve `true` si Player Auto Update está habilitado y hay una URL configurada.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true o false
```

---

## 5. Comandos de plugin

Comandos de plugin disponibles en MZ.

**GetVersion** — Almacena la cadena de versión de SecuPacker en una variable del juego.

**IsPacked** — Almacena `true` si el juego está empaquetado, `false` en caso contrario, en una variable del juego. Úsalo para bifurcar el comportamiento en el juego según si la versión es una versión de distribución.

**IsSplitAvailable** — Comprueba si el archivo empaquetado dividido especificado existe y es accesible, y almacena el resultado en una variable del juego. Útil para comprobar si hay un archivo DLC presente.

**IsPlayerAutoUpdateReady** — Almacena `true` en una variable del juego si Player Auto Update está habilitado y hay una URL configurada.

---

## 6. Notas

- **Protección de archivos del proyecto**: Si se encuentra un archivo `*.rpgproject` o `*.rmmzproject` dentro de la carpeta de despliegue, el plugin lo tratará como un directorio de desarrollo y abortará el empaquetado. Ejecuta siempre el empaquetador desde la carpeta desplegada, no desde la carpeta de tu proyecto de desarrollo.
- **Aviso de privacidad**: Ninguna seguridad es absoluta. Por muy seguro que sea un sistema, alguien puede eventualmente encontrar una forma de pasarlo — así que nunca incluyas información personal o sensible como IDs, contraseñas o claves API en los archivos de tu juego.
- **Aviso de derechos de autor**: No elimines el archivo `LICENSE.txt` ubicado en el mismo directorio que el archivo empaquetado. Distribuirlo sin él puede constituir una violación de derechos de autor.
- **Pantalla negra tras el empaquetado**: Si el juego funcionaba con normalidad durante el modo de prueba antes de empaquetar, pero se congela en una pantalla negra con un mensaje de error tras el empaquetado, esto suele deberse a un error en un script registrado en `index.html` (MV) o `main.js` (MZ). Si has añadido scripts personalizados o modificado alguno de los scripts registrados, esos son los candidatos más probables.
