![logo](chrome_firefox/icons/lfbPlusIcon-48.png)
# LFB+
![version](https://img.shields.io/badge/version-2.5-blue) [![license](https://img.shields.io/badge/license-CC%20BY--NC%204.0-green)](https://creativecommons.org/licenses/by-nc/4.0/) ![maintained](https://img.shields.io/badge/maintained%3F-yes-lightgreen?style=flat)

[![mastodon](https://img.shields.io/badge/@MrDoubleH-1DA1F2?style=flat&logo=Mastodon&logoColor=white)](https://mastodon.social/@MrDblH)

## Überblick
Verbessert die Darstellung der Seiten zur Suche und die der Einzeldarstellung einer Fortbildung auf [https://lfbo.kultus-bw.de/lfb](https://lfbo.kultus-bw.de/lfb); umgangsprachlich auch LFB genannt.

Hinweis: Das ist ein privates Projekt; ich stehe bzgl. dieses Projektes _nicht_ in Kontakt mit dem ZSL oder dem KM.


## Änderungen an den LFB-Seiten
- **Seitenansicht zum Suchen von Fortbildungen:**

    Es werden Hyperlinks ergänzt, die die Fortbildung (direkt) mit einem Klick in einem neuen Tab öffnen. Die normalen Links bleiben dabei erhalten. Dies ist in der Kachel- aber auch Listenansicht möglich.

- **Seite einer einzelnen Fortbildung:**

    Es werden anhand des Titels der Fortbildung und der LFB-Identfikationsnummer zwei Buttons eingefügt. Mit deren Hilfe können Details oder auch einfach die URL in die Zwischenablage kopiert werden. Damit ist das Kopieren und Weitersagen leichter und schneller. Der Meldeschluss der Fortbildung wird ab Version 2.3 auch in die Zwischenablage kopiert. Ab Version 2.4 wird das Datum der Fortbildung ebenfalls kopiert. Der kopierte Text sieht wie folgend aus _"Mi DD.MM.YYYY - Do DD.MM.YYYY: Wirksam führen in Veränderungsprozessen (LFB: lfbID, Meldeschluss: DD.MM.YYYY): link_zur_lfb_FoBi_".

    Im Titel des Tabs steht statt _LFB_ nun die LFB-Identfikationsnummer gefolgt vom Titel der Fortbildung. Dadurch wird nicht nur die Organisation für Personen mit einem Hang zu vielen Tabs leichter, das Abspeichern in der Lesezeichenleiste wird auch übersichtlicher, da im Titel des Lesezeichens direkt der Titel der LFB-Fortbildung zu sehen ist.

    Auf der Seite der einzelnen Fortbildung wird das Meldeschluss-Datum ausgelesen und grafisch im oberen Teil direkt visualisert (s. Tabelle). Dadurch ist ein schnelles Scannen möglich und Fortbildungen, deren Anmeldetermin abgelaufen ist, _können_ schneller verworfen werden. Der Anmeldetermin steht - falls angegeben - stets im unteren Teil der Seite. Die graphische Hervorherbungen haben folgende Bedeutung wie in der folgenden Tabelle angegeben:

    | grün                | organge       | rot                                     | schwarz                     |
    |-------------------- |-------------- |---------------------------------------  |---------------------------- |
    | Melden gut möglich  | zügig Melden  | Meldeschluss vorbei                     | kein Meldeschluss gefunden z.B. bei Reihen, Abruf etc.   |

- **Für eingeloggte Nutzer: Seite der Mitteilungen:**

    Anhand der Mitteilung wird eine LFB-Nummer ausgelesen und als Link zu dieser Fortbildung hinzugefügt. Da der Titel oft nicht in der Mitteilung vorhanden ist, findet man ohne erneute Suche den Titel leichter mit einem Klick auf den generierten Link. Dieser öffnet in einem neuen Tab die Fortbildungs-Einzelseite.

- **Für eingeloggte Nutzer: Sind vorbereitende Unterlagen vorhanden?**

    Verkettete Büroklammern bei einer Veranstaltung - hier bei muss man dafür angemeldet sein - deuten auf hinterlegte Unterlagen hin. Diese sind am Ende der Website gelistet und werden doch häufiger übersehen. Die Büroklammern werden im Titel zusätzlich angezeigt.


## Installationshinweise
- für Firefox als Addon [hier](https://addons.mozilla.org/en-US/firefox/addon/lfb/) erhältlich; bitte ausschließlich von der offiziellen Mozilla-Addon-Seite laden.
- für Chrome als Addon [hier](https://chrome.google.com/webstore/detail/lfb%2B/bfmkdejboikhkccmdpdaojchaeojgnam) erhältlich
- als GreaseMonkey- oder TamperMonkey-Script: Dazu ist eines der folgenden Addons nötig, um das Script nutzen zu können: [Mozilla Firefox GM](https://addons.mozilla.org/de/firefox/addon/greasemonkey/), [Mozilla Firefox TM](https://addons.mozilla.org/de/firefox/addon/tampermonkey/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search), [Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=de). Diese Addons helfen dabei, ein JavaScript lokal im Browser ausführen zu können. Das Script aus dem Unterordner von hier downloaden oder kopieren und entweder im Addon-Dialog importieren oder manuell über Copy&Paste via _neues Benutzerscript_ ergänzen. Wichtig: auf diese Weise werden _keinerlei_ Updates geladen.
- Das Projekt ist [hier](https://github.com/Mr-DblH/LFBPlus) auf github zu finden.

## Lizenz
Creative Commons Attribution-NonCommercial 4.0 International [(CC BY-NC 4.0) ](https://creativecommons.org/licenses/by-nc/4.0/)

## Screenshots
![Suchseite](screenshots/640x400/lfbPlus_screenshot_search.jpg)

![Seite einer FoBi](screenshots/640x400/lfbPlus_screenshot_single.jpg)

![Titel der einzelnen Seiten](screenshots/640x400/lfbPlus_screenshot_title.jpg)