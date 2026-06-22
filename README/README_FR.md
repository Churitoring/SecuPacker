# Churitoring_SecuPacker

<a href="https://github.com/Churitoring/SecuPacker">English</a> | <a href="README_KO.md">한국어</a> | <a href="README_JA.md">日本語</a> | <a href="README_DE.md">Deutsch</a> | <a href="README_ES.md">Español</a> | <b>Français</b> | <a href="README_IT.md">Italiano</a> | <a href="README_PT.md">Português</a> | <a href="README_RU.md">Русский</a> | <a href="README_ZH.md">简体中文</a> | <a href="README_ZH_TW.md">繁體中文</a> | <a href="README_PL.md">Polski</a>

<a href="https://github.com/Churitoring/SecuPacker/releases/latest/download/Churitoring_SecuPacker.js">
  <img src="https://img.shields.io/badge/⬇%20Télécharger_le_Plugin-4CAF50?style=for-the-badge" alt="Télécharger le Plugin" />
</a>

Un plugin de compression sécurisée des ressources pour RPG Maker MV / MZ.

> **Windows uniquement.** Ne fonctionne pas sur macOS ni Linux.

---

## Table des matières

1. [Comment utiliser](#1-comment-utiliser)
2. [Prérequis](#2-prérequis)
3. [Référence des paramètres](#3-référence-des-paramètres)
   - [3-1. Paramètres généraux de compression](#3-1-paramètres-généraux-de-compression)
   - [3-2. Paramètres de compression des fichiers](#3-2-paramètres-de-compression-des-fichiers)
   - [3-3. Paramètres de sécurité](#3-3-paramètres-de-sécurité)
   - [3-4. Paramètres supplémentaires](#3-4-paramètres-supplémentaires)
   - [3-5. Paramètres de mise à jour automatique du joueur](#3-5-paramètres-de-mise-à-jour-automatique-du-joueur)
4. [API JavaScript](#4-api-javascript)
5. [Commandes de plugin](#5-commandes-de-plugin)
6. [Notes](#6-notes)

---

## 1. Comment utiliser

Le processus de compression de base est le suivant.

**Étape 1 — Installer le plugin**

Placez `Churitoring_SecuPacker.js` dans le dossier `js/plugins/` de votre projet et activez-le dans le Gestionnaire de plugins de RPG Maker. Configurez les paramètres selon vos préférences à cette étape.

**Étape 2 — Créer le dossier de déploiement**

Dans RPG Maker, allez dans **Fichier > Déploiement** et déployez pour la plateforme **Windows**.

**Étape 3 — Lancer la compression**

Exécutez le fichier `.exe` du jeu dans le dossier déployé. Un écran de progression de la compression apparaîtra automatiquement. Ne fermez pas la fenêtre pendant ce processus. Même si vous forcez la fermeture à mi-chemin, le jeu se rétablira très probablement au prochain lancement — mais il est préférable d'attendre la fin.

**Étape 4 — Distribuer**

Une fois la compression terminée, le jeu se relancera automatiquement. Vous pouvez alors distribuer ce dossier de déploiement directement à vos joueurs.

Remarque : Si `Player Auto Update` est défini sur `true`, le jeu se fermera (au lieu de se relancer) après une boîte de dialogue de confirmation. Ne relancez pas le jeu à ce stade — cela déclencherait une tentative de mise à jour avec l'ancienne version. Téléversez d'abord les fichiers compressés sur GitHub Releases.

---

## 2. Prérequis

- RPG Maker MV 1.6.0 ou version ultérieure, ou RPG Maker MZ 1.0.0 ou version ultérieure
- NW.js 0.28.1 ou version ultérieure (recommandé : 0.44.3 ou supérieur)

---

## 3. Référence des paramètres

### 3-1. Paramètres généraux de compression

**Packer Auto Update**

Avant le début de la compression, le plugin récupère la dernière version depuis GitHub et écrase `js/plugins/Churitoring_SecuPacker.js`. Si vous avez apporté des modifications directes à ce fichier, vous devez définir ce paramètre sur `false` — sinon vos modifications seront annulées à chaque compression. Si vous utilisez le plugin tel quel sans aucune modification, laissez-le sur `true`.

**Game Binary Name**

Le nom du fichier de sortie compressé. La valeur par défaut est `game.bin`, mais vous pouvez le renommer ici. Seul un nom de fichier est accepté — les chemins ne sont pas autorisés. Il est recommandé de choisir un nom moins prévisible. L'extension du fichier peut également être modifiée.

**Track Runtime Writes**

Pendant le test du jeu, si d'autres plugins créent ou modifient des fichiers, ces chemins sont enregistrés dans `data/SecuPacker_RuntimeWrites.txt`. Lors de la compression, les fichiers listés sont exclus du pack et laissés sur le disque tels quels.

Si vous utilisez des plugins qui génèrent automatiquement des fichiers tels que des fichiers de configuration, activez cette option. Il est recommandé de laisser la valeur par défaut `true` sauf raison spécifique de la désactiver.

Remarque : Les fichiers suivis par cette option sont exclus de Player Auto Update et de la protection de SecuPacker.

**Strip Read-Only Attributes**

Durant la phase de nettoyage final de la compression, les fichiers de ressources originaux sont supprimés. Si des fichiers possèdent l'attribut lecture seule (R), la suppression échouera. Si vous gérez votre projet avec Git ou utilisez des outils qui marquent automatiquement les fichiers en lecture seule, définir ce paramètre sur `true` exécutera `attrib -R` avant la suppression pour éviter les problèmes. Il est recommandé de laisser la valeur par défaut `true` sauf raison spécifique de la désactiver.

---

### 3-2. Paramètres de compression des fichiers

**File Split**

Au lieu de tout compresser dans un seul fichier, cette option permet de répartir les ressources sur plusieurs fichiers compressés. Utile pour séparer les ressources DLC du jeu de base, ou pour diviser de grands projets en plusieurs fichiers. Définir ce paramètre sur `false` ignorera également toutes les entrées de la liste File Split List ci-dessous.

**File Split List**

Définit les règles déterminant quels fichiers/dossiers vont dans quel fichier compressé. Chaque entrée comporte deux paramètres :

- **Split Bin File** : Le nom du fichier pour ce groupe de fichiers. Doit être différent du nom du fichier principal défini dans Game Binary Name. Ex. : `dlc.bin`, `bgm.bin`
- **Split Path Patterns** : Une liste de chemins à inclure dans ce fichier. Spécifier un dossier comme `audio/bgm` inclura tous les fichiers qu'il contient de manière récursive. Vous pouvez également spécifier un seul fichier tel que `audio/se/boss.ogg`.

**Packed File Exclusions**

Spécifie les fichiers ou dossiers à exclure de la compression et à conserver sur le disque. Les chemins sont relatifs à la racine du projet et doivent utiliser des slashes (`/`). Ex. : `img/system/Loading.png`, `audio/bgm`

Ajoutez ici tous les fichiers qui doivent être lus directement depuis le disque à l'exécution. Les fichiers de cette liste sont exclus de la compression et ne seront pas supprimés.

Remarque : Les fichiers de cette liste sont exclus de Player Auto Update et de la protection de SecuPacker.

---

### 3-3. Paramètres de sécurité

**Block Launch Args Whitelist**

Si une chaîne de requête URL ou un argument de lancement NW.js est détecté au démarrage et ne figure pas dans cette liste, le jeu se fermera immédiatement. La valeur par défaut est une liste vide, ce qui signifie que tous les arguments externes sont bloqués par défaut. Ajoutez les arguments autorisés à cette liste.

Cette vérification s'applique uniquement aux versions de distribution compressées et n'est pas appliquée durant le test de développement.

**Early Blob Resolve**

Avance le moment auquel les chemins de fichiers sont convertis en URL Blob (dans le fichier compressé) jusqu'à l'étape `Bitmap.load`. Pour la plupart des cas d'utilisation, laissez ce paramètre sur `true`.

Cependant, si vous utilisez un plugin qui intercepte `fs.readFile` ou `XMLHttpRequest` directement pour gérer son propre déchiffrement, définissez-le sur `false` en cas de conflits.

Définir ce paramètre sur `false` peut réduire la compatibilité.

**Enable Cheat Detection**

Analyse périodiquement les outils de piratage s'exécutant en tant que processus en arrière-plan.

**Excluded Binary Hashes**

Les noms (ou noms partiels) des fichiers binaires à exclure lors du calcul du hachage de l'empreinte d'environnement.

La raison pour laquelle `ffmpeg` est inclus par défaut est due à la licence de FFmpeg (LGPL). La LGPL exige que les utilisateurs puissent remplacer le binaire par leur propre version. Inclure FFmpeg dans le hachage entraînerait un changement de hachage lors du remplacement, empêchant le lancement du jeu — il est donc exclu par défaut pour respecter la licence.

Laissez la valeur par défaut sauf raison spécifique de la modifier.

Exemple : `ffmpeg.dll` (exclut uniquement ffmpeg.dll)  
Exemple : `ffmpeg` (exclut à la fois ffmpeg.dll et ffmpegsumo.dll)

**Hash Exe Files**

Lorsque défini sur `true`, le fichier `.exe` du jeu est également inclus dans le hachage de l'empreinte d'environnement. Cela empêche le fichier compressé d'être lancé avec un `.exe` différent. Il est important de noter que toute modification du `.exe` — comme le remplacement de l'icône ou la modification du manifeste — doit être effectuée **avant** la compression. Modifier le `.exe` après la compression changera le hachage et empêchera le lancement du jeu.

---

### 3-4. Paramètres supplémentaires

**Block Window Resize**

Lorsque défini sur `true`, les joueurs ne peuvent pas redimensionner ni agrandir la fenêtre du jeu. Le bouton Agrandir peut disparaître ou cesser de fonctionner.

**Block F2 / F4 / F5 Key**

Bloque respectivement l'affichage de la fréquence d'images (F2), le basculement en plein écran (F4) et le rechargement du jeu (F5). Activez ces options si vous ne souhaitez pas que les joueurs accèdent à ces fonctions dans une version de distribution.

---

### 3-5. Paramètres de mise à jour automatique du joueur

**Player Auto Update**

Lorsque défini sur `true`, le jeu communique avec le serveur de versions GitHub au démarrage. Si une nouvelle version du fichier compressé est disponible, elle est automatiquement téléchargée et remplacée. Pour utiliser cette fonctionnalité, vous devez également configurer `Player Auto Update URL` ci-dessous.

Lorsque défini sur `true`, le jeu se fermera (au lieu de se relancer) après la fin de la compression. Ne relancez pas le jeu à ce stade — cela déclencherait une tentative de mise à jour avec l'ancienne version. Téléversez d'abord les fichiers compressés sur GitHub Releases.

Si vous avez besoin de tester si la compression a réussi, définissez ce paramètre sur `false` avant le test.

**Player Auto Update URL**

L'URL du dépôt GitHub depuis lequel les mises à jour seront récupérées. Entrez-la au format `https://github.com/nom_utilisateur/dépôt`. Les dépôts privés ne sont pas pris en charge.

Exemple : `https://github.com/Churitoring/SecuPacker`

**Player Auto Update Tag**

Si laissé vide, met toujours à jour depuis la dernière version.

Si un tag est spécifié, met à jour depuis la version la plus récente portant ce tag. Il est recommandé de créer un seul dépôt et d'attribuer des tags spécifiques au jeu aux versions qu'il contient — ainsi, la fonctionnalité Player Auto Update peut servir plusieurs jeux depuis un seul dépôt.

Exemple : `SecuPacker`

**Disable On No Internet / Disable On Fail**

Configure le comportement en l'absence de connexion Internet ou lorsque le serveur de mise à jour est inaccessible.

Si vous souhaitez que le jeu se ferme uniquement en l'absence de connexion Internet mais ne souhaitez pas réellement utiliser la fonctionnalité de mise à jour, il est recommandé de définir `Player Auto Update` sur `true`, de laisser `Player Auto Update URL` vide, de définir `Disable On No Internet` sur `true` et `Disable On Fail` sur `false`.

- Définir `Disable On No Internet` sur `true` affichera un avertissement et fermera le jeu en l'absence de connexion Internet.
- Définir `Disable On Fail` sur `true` fermera le jeu même si le serveur est accessible mais que le fichier ne peut pas être récupéré.

**Paramètres de l'écran de mise à jour (PAU Scene \*)**

Configure l'interface affichée durant le processus de mise à jour automatique.

*Texte*

- **PAU Scene Update Text** : Texte affiché dans la zone de titre pendant le téléchargement de la mise à jour. Par défaut : `Updating...`
- **PAU Scene Complete Text** : Texte affiché dans la zone de titre lorsque la mise à jour se termine avec succès. Par défaut : `Update complete!`
- **PAU Scene Failed Text** : Texte affiché dans la zone de titre lorsque la mise à jour échoue. Par défaut : `Update failed`

*Animation*

- **PAU Scene Blink** : Applique une animation d'opacité pulsée au texte du titre. Par défaut : `true`
- **PAU Scene Blink Speed** : Vitesse du cycle de clignotement. Des valeurs plus élevées = plus rapide. À `0.050`, environ un cycle toutes les 2 secondes à 60fps. Plage : `0.001` ~ `1.000`. Par défaut : `0.050`

*Progression*

- **PAU Scene Show Progress** : Affiche la progression du téléchargement (%) et la taille (Ko) dans la zone de sous-texte pendant la mise à jour. Par défaut : `true`

*Arrière-plan*

- **PAU Scene BG Type** : Sélectionne le type d'arrière-plan. `color` (couleur unie) / `image` / `video`. Par défaut : `color`
- **PAU Scene BG Color** : Code couleur CSS pour l'arrière-plan uni lorsque le type est `color`. Par défaut : `#000000`
- **PAU Scene BG Image** : Fichier image d'arrière-plan lorsque le type est `image`. Sélectionnez depuis le dossier `img/`.
- **PAU Scene BG Video** : Chemin du fichier vidéo lorsque le type est `video`. À entrer sous forme de chaîne. Ex. : `movies/bg.webm`
- **PAU Scene BG Fit** : Comment adapter l'image ou la vidéo lorsque le format ne correspond pas à l'écran. `cover` (recadrer pour remplir l'écran) / `contain` (letterbox, conserver le format) / `fill` (étirer). Par défaut : `cover`
- **PAU Scene Video Loop** : Boucle la vidéo d'arrière-plan. Si `false`, la vidéo s'arrête sur la dernière image. Par défaut : `true`
- **PAU Scene Video Volume** : Volume audio de la vidéo d'arrière-plan. `0` (muet) ~ `100`. Par défaut : `100`

*Musique de fond*

- **PAU Scene BG Music** : Fichier musical à lire sur l'écran de mise à jour. Sélectionnez depuis le dossier `audio/`. Peut être utilisé en parallèle d'un arrière-plan vidéo.
- **PAU Scene BG Music Volume** : Volume de la musique de fond. `0` (silencieux) ~ `100`. Par défaut : `80`
- **PAU Scene BG Music Loop** : Boucle la musique de fond. Si `false`, lit une fois puis s'arrête. Par défaut : `true`

*Style du texte du titre*

- **PAU Scene Title X Offset** : Décalage horizontal en pixels du texte du titre depuis le centre de l'écran. `0` = centré. Par défaut : `0`
- **PAU Scene Title Y Offset** : Décalage vertical en pixels du texte du titre depuis le centre de l'écran. Les valeurs négatives le déplacent vers le haut. Par défaut : `-30`
- **PAU Scene Title Size** : Taille de police du texte du titre en pixels. Par défaut : `36`
- **PAU Scene Title Color** : Couleur du texte du titre au format hex CSS. Par défaut : `#ffffff`
- **PAU Scene Title Outline Width** : Épaisseur du contour du texte du titre en pixels. `0` = pas de contour. Par défaut : `0`
- **PAU Scene Title Outline Color** : Couleur du contour du texte du titre. Prend en charge le format hex CSS ou `rgba()`. Par défaut : `rgba(0,0,0,0.5)`

*Style du sous-texte*

Le sous-texte est la ligne secondaire sous le titre qui affiche les messages de progression ou de statut.

- **PAU Scene Sub X Offset** : Décalage horizontal en pixels du sous-texte depuis le centre de l'écran. Par défaut : `0`
- **PAU Scene Sub Y Offset** : Décalage vertical en pixels du sous-texte depuis le centre de l'écran. Par défaut : `30`
- **PAU Scene Sub Size** : Taille de police du sous-texte en pixels. Par défaut : `18`
- **PAU Scene Sub Color** : Couleur du sous-texte au format hex CSS. Par défaut : `#888888`
- **PAU Scene Sub Outline Width** : Épaisseur du contour du sous-texte en pixels. `0` = pas de contour. Par défaut : `0`
- **PAU Scene Sub Outline Color** : Couleur du contour du sous-texte. Prend en charge le format hex CSS ou `rgba()`. Par défaut : `rgba(0,0,0,0.5)`

---

## 4. API JavaScript

Ces APIs peuvent être appelées directement depuis d'autres plugins ou des appels de script, comme alternative aux Commandes de plugin.

Appeler l'API directement crée une dépendance à SecuPacker. Pour éviter les effets de bord lorsque le plugin est désactivé, vérifiez toujours l'existence de l'objet avant d'appeler.

**`SecuPacker.getVersion()`**

Retourne la chaîne de version de SecuPacker.

```javascript
SecuPacker.getVersion();
```

**`SecuPacker.isPacked()`**

Retourne `true` si le jeu s'exécute en mode compressé, `false` sinon. Retourne toujours `false` pendant le test de développement, donc cela peut être utilisé pour conditionner le comportement selon que le jeu est une version de distribution ou non.

```javascript
if (SecuPacker.isPacked()) {
    // Code à exécuter uniquement dans les versions de distribution
}
```

**`SecuPacker.isSplitAvailable(binName)`**

Retourne `true` si le fichier compressé divisé spécifié existe et est accessible. Utile pour vérifier si un fichier DLC est installé.

```javascript
SecuPacker.isSplitAvailable("dlc.bin"); // true ou false
```

**`SecuPacker.isPlayerAutoUpdateReady()`**

Retourne `true` si Player Auto Update est activé et qu'une URL est configurée.

```javascript
SecuPacker.isPlayerAutoUpdateReady(); // true ou false
```

---

## 5. Commandes de plugin

Commandes de plugin disponibles dans MZ.

**GetVersion** — Stocke la chaîne de version de SecuPacker dans une variable de jeu.

**IsPacked** — Stocke `true` si le jeu est compressé, `false` sinon, dans une variable de jeu. Utilisez ceci pour conditionner le comportement en jeu selon que la version est une version de distribution ou non.

**IsSplitAvailable** — Vérifie si le fichier compressé divisé spécifié existe et est accessible, et stocke le résultat dans une variable de jeu. Utile pour vérifier si un fichier DLC est présent.

**IsPlayerAutoUpdateReady** — Stocke `true` dans une variable de jeu si Player Auto Update est activé et qu'une URL est configurée.

---

## 6. Notes

- **Protection des fichiers du projet** : Si un fichier `*.rpgproject` ou `*.rmmzproject` est trouvé dans le dossier de déploiement, le plugin le traitera comme un répertoire de développement et annulera la compression. Exécutez toujours le packer depuis le dossier déployé, et non depuis le dossier de votre projet de développement.
- **Avertissement de confidentialité** : Aucune sécurité n'est absolue. Quelle que soit la robustesse d'un système, quelqu'un pourra éventuellement trouver un moyen de le contourner — n'incluez donc jamais d'informations personnelles ou sensibles telles que des identifiants, mots de passe ou clés API dans vos fichiers de jeu.
- **Mention de droits d'auteur** : Ne supprimez pas le fichier `LICENSE.txt` situé dans le même répertoire que le fichier compressé. Le distribuer sans ce fichier peut constituer une violation des droits d'auteur.
- **Écran noir après la compression** : Si le jeu fonctionnait normalement pendant le test avant la compression mais se bloque sur un écran noir avec un message d'erreur après la compression, cela est généralement causé par une erreur dans un script enregistré dans `index.html` (MV) ou `main.js` (MZ). Si vous avez ajouté des scripts personnalisés ou modifié des scripts enregistrés, ce sont les causes les plus probables.
