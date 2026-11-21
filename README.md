# Georgia König – neuer Webauftritt

Statische, deutsch- und englischsprachige Website mit Astro 7, React 19, Tailwind CSS 4 und TypeScript. Das Projekt liegt vollständig in diesem Ordner. Die bisherige Website wurde nur gelesen und nicht verändert.

## Lokal arbeiten

Voraussetzung: Node.js 24 und npm.

```sh
npm ci
npm run dev
```

Die Konsole nennt die lokale Vorschauadresse, standardmäßig `http://127.0.0.1:4321/`.

```sh
npm run build
npm run test:site
npm run preview
```

`build` prüft Astro und TypeScript und erzeugt `dist/`. `test:site` prüft den fertigen Build auf interne Links, Anker, Bilder, eindeutige Seitentitel, Sprachangabe, Hauptüberschriften, Metadaten, JSON-LD, Weiterleitungsziele und Discovery-Dateien. Die Paketversionen sind festgelegt, der Lockfile gehört zum Projekt.

## Inhalte und Gestaltung

- Neu gestaltete Startseite mit Porträt, Leistungen, Profil, interaktivem Werdegang (sechs berufliche und vier Ausbildungsstationen), Portfolio, Kontrast-Demo, Wabiy, Downloads, übernommenen Kundenstimmen, FAQ und Kontakt.
- Vier eigenständige Leistungsseiten, beruflicher Werdegang, Impulsübersicht, zwei Beiträge und eine ausführliche Wabiy-Unterseite. Alle Inhalte auf Deutsch und Englisch mit expliziten Gegenstücken und hreflang-Tags.
- Impressum, Datenschutz, freiwillige Barrierefreiheitserklärung und übernommene AGB.
- Kontakt per E-Mail und Telefon. Es gibt kein vorgetäuschtes Kontaktformular und keinen notwendigen Mail-Backend-Dienst.
- Alle Schriften und Bilder lokal, keine Analyse, kein Marketing, keine externen Einbettungen, keine Analyse- oder Werbewiedererkennung. Nur das ausdrücklich gewählte Farbschema wird als funktionale Einstellung lokal unter `gk-theme` gespeichert. Ohne gespeicherte Wahl gilt die Systemeinstellung. Die Sprachauswahl verwendet URLs, keine Cookies. React wird für die Kontrast-Demo und den Originalvogel geladen.
- Semantische Struktur, Sprunglink, native Bedienelemente, Tastaturfokus, Escape im mobilen Menü, reduzierte Bewegung und Forced-Colors-Unterstützung.

Die zentralen Fakten und Leistungen liegen in `src/data.ts` und `src/data-en.ts`, der Werdegang in `src/career.ts`, Beiträge in `src/articles.ts` und `src/articles-en.ts`. Die Routenzuordnung liegt in `src/i18n.ts`, das neue Design in `src/styles/redesign.css`. Geteilte Start- und Wabiy-Seiten liegen in `src/views/`. Englische Rechtstexte liegen in `src/english-pages.ts`. Die Porträts und die beiden PDFs stammen aus dem bereitgestellten Altbestand. Der Wabiy-Vogel verwendet jetzt die auf die Standardvariante reduzierte Originalimplementierung aus Wabiy `Frontend/src/components/Home/AnimatedBird.tsx`, wie auf der Bitboulevard-Seite (`OriginalBird.tsx`). Unnötige Varianten sind entfernt. Die SVG-Gradienten erhalten eindeutige IDs. Blickverfolgung, Blinzeln, Hüpfen, Flügelschlag, Schlafen/Aufwachen und Herzen sind enthalten. Ein nativer Button unterstützt Tastatur und Touch; Animationen sind pausierbar. Bei reduzierter Bewegung wird die originale ruhende Zeichnung statt einer vereinfachten Ersatzzeichnung verwendet. Die PDFs sind sichtbar als Stand 2025 gekennzeichnet.

## Cloudflare Pages

Die Website ist für ein neues **Cloudflare-Pages-Projekt** vorbereitet. Sie wurde nicht auf die bestehende Domain veröffentlicht.

| Einstellung | Wert |
| --- | --- |
| Framework | Astro |
| Build-Befehl | `npm run build` |
| Ausgabeverzeichnis | `dist` |
| Node.js | 24 (`.node-version`) |
| Server / Functions | nicht erforderlich |
| Domain | `georgia-koenig.de` |

`public/_headers` enthält Sicherheitsheader, `public/_redirects` die permanenten Weiterleitungen der bisherigen HTML-Adressen. Cloudflare Pages verarbeitet diese Dateien bei der Veröffentlichung. Die Domain `www.georgia-koenig.de` sollte in Cloudflare auf die kanonische Domain ohne `www` umgeleitet werden. Alte Startseitenfragmente werden zusätzlich im Browser auf die neuen Abschnitte abgebildet, da URL-Fragmente den Server nicht erreichen.

Die bisherige Domain erst nach Prüfung der Vorschau umstellen. Cloudflare-Pages-Vorschaudomains erhalten einen `X-Robots-Tag: noindex` über die entsprechende Host-Regel. Für echte Veröffentlichung ist die eigene Domain vorgesehen. Wird die Website anderswo gehostet, müssen Header und Weiterleitungen dort entsprechend konfiguriert werden.

## SEO und maschinenlesbare Inhalte

Statisch gerendertes HTML, individuelle Titel und Beschreibungen, Canonical-URLs, Open Graph und Social Card, lokale responsive WebP-Bilder, Sitemap, `robots.txt`, `llms.txt` und JSON-LD für Person, ProfessionalService, Website, WebPage, Leistungen, Artikel und sichtbare FAQ. Kein erfundenes Bewertungsschema, keine erfundenen Zertifizierungen, Preise oder Projektergebnisse.

`llms.txt` ist eine zusätzliche Orientierung, keine Zugriffskontrolle oder Garantie für eine Aufnahme in KI-Antworten. Auch laut [Google Search Central](https://developers.google.com/search/docs/appearance/ai-features) bleiben die üblichen SEO-Grundlagen relevant; es gibt keine gesonderte garantierte KI-Optimierung. Nach dem Domainwechsel die Sitemap in der Search Console einreichen und tatsächliche Indexierung beobachten.

## Vor dem Livegang sachlich abgleichen

Die folgenden Punkte sind konkrete offene Betriebsangaben, keine abgeschlossene juristische Prüfung:

1. Georgia bestätigt Anschrift, Telefonnummer, USt-ID und aktuelle berufliche Angaben aus der bisherigen Website sowie die Freigabe der Porträts und Kundenstimmen.
2. Cloudflare wurde vom Auftraggeber als voraussichtlicher Anbieter genannt. Tatsächlich verwendetes Produkt, Vertragspartner, AV-Vertrag, Drittlandübermittlungen, aktivierte Sicherheitsfunktionen, eventuelle Cookies und konkrete Protokollfristen müssen zum finalen Account passen. Der Datenschutztext beschreibt die vorbereitete Konfiguration und nennt Hosting derzeit als vorgesehen. Nach bestätigtem Betrieb auf Cloudflare diese Formulierung konkretisieren. Cloudflare Web Analytics, Zaraz, Browser Insights, Turnstile und zusätzliche Widgets sind in diesem Projekt nicht eingebunden; nicht ungeprüft im Dashboard zuschalten.
3. Den tatsächlichen E-Mail-Anbieter und dessen Auftragsverarbeitung im Betriebsverzeichnis berücksichtigen. Mailto öffnet das eigene E-Mail-Programm; die Website verarbeitet keine Formulareingaben.
4. Die vorhandenen AGB (Stand August 2026) wurden inhaltlich übernommen, nicht als rechtlich neu geprüfte Bedingungen ausgegeben. Insbesondere Verbraucherverträge, Widerrufsrecht, Abnahmefiktion und Haftung müssen vor verbindlicher Nutzung fachlich überprüft werden. Die Website hat keinen Online-Vertragsschluss.
5. WCAG-Konformität nicht aus automatisierten Ergebnissen ableiten. Screenreader-Prüfung und Nutzertests vervollständigen; die alten PDF-Dateien bei Bedarf barrierefrei aufbereiten. Die öffentliche Erklärung benennt diese Einschränkungen ausdrücklich. Kein unbelegtes Zertifikat und keine pauschale Zuständigkeit einer Schlichtungsstelle.

## Quellen der Umsetzung

- Inhalte: lokaler Altbestand `georgia-koenig.de/main`; Wabiy-Zusammenarbeit zusätzlich durch den Auftraggeber bestätigt.
- [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html)
- [§ 25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html)
- [DSGVO](https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Cloudflare Datenschutz](https://www.cloudflare.com/privacypolicy/) und [DPA](https://www.cloudflare.com/cloudflare-customer-dpa/)
- [Astro auf Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Lokale Accessibility-Prüfung

`scripts/a11y-harness.html` ist ein Entwicklungswerkzeug für axe-core im Browser. Bei Bedarf kurzzeitig als `public/__qa.html` bereitstellen und `node_modules/axe-core/axe.min.js` als `public/__qa-axe.js` kopieren. Im lokalen Browser öffnen und die Breiten 1440, 390 und 320 prüfen. Die beiden temporären öffentlichen Dateien **vor jedem Produktionsbuild entfernen**. Der Harness gehört nicht zur ausgelieferten Website. Automatisierte Befunde und manuelle Verifikation sind ergänzende Verfahren.

### Durchgeführte Prüfung am 8. November 2026

- Erste Version: 14 Seiten bei jeweils 320, 390 und 1440 Pixeln: keine von axe-core erkannten Verstöße für die gewählten WCAG-Tags und Best Practices, kein seitliches Überlaufen.
- Prüfprotokoll: `reports/accessibility-audit.json`. Automatisiert nicht sicher bestimmbare Kontraste (u.a. über dekorativen Verläufen und Pseudoelementen) sind im Protokoll als `incomplete` erhalten. Die verwendeten Vollfarben und Bildbeschriftung wurden zusätzlich betrachtet; die Bildbeschriftung hat einen festen dunklen Hintergrund.
- Mobilmenü öffnen und mit Escape schließen, Kontrast-Schalter mit Leertaste, FAQ mit Enter und Vogel mit Enter im Browser geprüft. Keine beobachteten Browserwarnungen oder Skriptfehler.
- Screenshots der Startseite liegen unter `reports/`. Sie werden nicht ins Webangebot kopiert.
- Die automatisierte Prüfung ist keine vollständige manuelle WCAG-Prüfung und keine Konformitätszertifizierung. Insbesondere PDFs und Screenreader-Kombinationen bleiben offen, wie öffentlich erklärt.

## Überarbeitung: Werdegang, Originalvogel, zweisprachiges Design

Aktueller Umfang: 29 gebaute Seiten (14 deutsche und 14 englische Inhaltsseiten plus 404). Sprachumschalter führen jeweils zur entsprechenden Unterseite. Beide Farbschemata sind über CSS-Variablen abgestimmt und werden vor dem ersten Rendern gesetzt. Der Datenschutztext beschreibt die neue lokale Theme-Präferenz.

Die lokale Prüfoberfläche `scripts/a11y-harness-v2.html` prüft alle Seiten bei 320, 390 und 1440 Pixeln jeweils in Light und Dark. Für eine erneute Prüfung `PATHS_PLACEHOLDER` durch die Pfade aus `dist/sitemap-0.xml` plus `/404/` ersetzen, als `public/__qa.html` bereitstellen und axe-core als `public/__qa-axe.js` kopieren. Diese temporären öffentlichen Dateien vor dem finalen Build entfernen. Das neue Protokoll wird unter `reports/accessibility-audit-v2.json` abgelegt.

Wabiy-Plattforminformationen wurden am 8. November 2026 mit [der Homepage](https://wabiy.com/), [der Plattformübersicht](https://wabiy.com/de/platform/) und [der Mission](https://wabiy.com/de/about/) abgeglichen. Die Unterseite erklärt Funktionen, Ablauf und Grenzen automatisierter Prüfungen und verweist zum Anbieter. Sie enthält kein vorgetäuschtes Live-Audit.

Ergebnis der finalen lokalen Matrix: **174/174 Kombinationen abgeschlossen, keine von axe-core erkannten Verstöße, kein seitliches Überlaufen**. Die Matrix umfasst 29 Seiten × 3 Breiten × 2 Farbschemata. Das neue JSON enthält die im Browser verifizierte Zusammenfassung; das vollständige Detailprotokoll wurde beim Export nicht erhalten. Automatisiert nicht sicher bewertbare Kontraste bleiben manuelle Prüfpunkte. Zusätzlich wurden Sprachwechsel mit beibehaltener Unterseite, Theme-Wechsel über Navigation hinweg, das Mobilmenü mit Escape, die Karriere-Auswahl per Leertaste und die Interaktion/Pause des Originalvogels manuell im Browser geprüft. Dies ersetzt weiterhin keine vollständige Screenreader- und Nutzerprüfung.

## Lesbarkeit und Werdegang-Animation

Alle expliziten Schriftgrößen der Website betragen mindestens 14 CSS-Pixel. Fließtexte sind überwiegend 16 Pixel groß. Die Schriftgrößen gelten auch für mobile Ansichten, Metadaten, Footer, Vogelsteuerung und Code-Beispiele; Layout und Abstände wurden entsprechend angepasst. Die Startseite verwendet das Porträt nur noch einmal in der Hero-Section. Der Über-mich-Bereich zeigt stattdessen eine eigenständige typografische Darstellung des Arbeitsansatzes.

Der Werdegang nutzt IntersectionObserver und die native Web Animations API für ein gestaffeltes Einblenden der Stationen, dezente Bewegungen der Knoten und den farbigen Aufbau der Timeline. Der Wechsel zwischen Beruf und Ausbildung startet die Animationen der neuen Ansicht. Reduzierte Bewegung wird berücksichtigt, auch wenn die Systemeinstellung während des Besuchs geändert wird. Inhalte bleiben ohne Animationen zugänglich; ohne JavaScript werden beide Werdegang-Ansichten angezeigt.

Die Prüfhilfe `scripts/a11y-harness-v3.html` ergänzt die bestehende Matrix um tatsächlich berechnete Schriftgrößen und ein Layout-Check nach dem Umschalten zur Ausbildungsansicht. Temporär erzeugte QA-Dateien gehören weiterhin nicht in den Produktionsbuild.

Ergebnis der Lesbarkeitsprüfung: 174/174 Kombinationen, keine Texte unter 14 px, keine erkannten axe-Verstöße und kein seitliches Überlaufen, auch in der Ausbildungsansicht. Vollständiges Protokoll: `reports/readability-audit-v3.json`.

## Offizielle Logos und Markenfarben

Die vom Auftraggeber bereitgestellten PNGs bleiben unverändert im öffentlichen Ordner. `Logo_GK_ohne_Schriftzug_hell.png` wird für den hellen Modus verwendet; `Logo_Georgia_Konig_ohne_Schriftzug.png` für den dunklen Modus und den dauerhaft dunklen Footer. `scripts/prepare-brand.mjs` erstellt nur verkleinerte WebP-Dateien sowie PNG-Favicons und ein Touch-Icon; keine Umzeichnung oder Umfärbung. Die gemeinsame Komponente liegt in `src/components/Brand.astro`, die abgestimmte Farbwelt in `src/styles/brand.css`. Farben: Graphit, helle neutrale Flächen und dezentes Petrol; Wabiy behält seine eigene Identität. Favicons wechseln auch beim manuellen Farbschema-Wechsel. Beide Social Cards tragen das offizielle Logo, und strukturierte Unternehmensdaten enthalten die Logo-URL.

Nach der Logo- und Farbanpassung wurden erneut 174/174 Kombinationen geprüft: keine erkannten axe-Verstöße, keine Schriftgrößen unter 14 px und keine Überläufe. Vollständiges Protokoll: `reports/brand-audit-v4.json`. Logo- und Favicon-Wechsel sowie die feste Footer-Variante wurden zusätzlich im Browser geprüft.

## Visuelle Leistungsseiten

Alle vier Leistungen haben eigenständige deutsche und englische Inhalte mit interaktiven Illustrationen: verständliche Beschriftungen, Research → Wireframe → Interface, responsive Bildschirmansichten sowie Prüffragen entlang eines Nutzungspfads. Ergänzend zeigen Vergleichszeilen typische Verbesserungen, eine aufklappbare Timeline den Projektablauf und Dokumentvorschauen mögliche Ergebnisse. Die Illustrationen sind ausdrücklich als Beispiele gekennzeichnet. Inhalte: `src/service-stories.ts`; Aufbau: `src/views/Service.astro`; React-Illustrationen: `src/components/ServiceDemo.tsx`; Gestaltung: `src/styles/services.css`.

Native Buttons mit `aria-pressed`, eine angekündigte Textbeschreibung und native Details-Elemente ermöglichen Tastaturbedienung. Rein illustrative Oberflächen sind für assistive Technik ausgeblendet; die gleichwertige Erläuterung steht außerhalb. Animationen verwenden kurze Bewegungen ohne kontrastminderndes Ausblenden von Text. Die Systemeinstellung für reduzierte Bewegung wird berücksichtigt, auch bei späterem Wechsel. Der redaktionelle Inhalt und die Details bleiben ohne JavaScript lesbar.

Browserprüfung am 8. November 2026: 220 Zustände (11 Illustrationszustände × 2 Sprachen × 5 Breiten: 320, 390, 768, 1024, 1440 × 2 Farbschemata), einschließlich geöffneter Prozess- und FAQ-Bereiche. Keine erkannten axe-Verstöße, Texte unter 14 px, Seitenüberläufe oder fehlgeschlagenen Zustandswechsel. Nach einer Korrektur der Tablet-Illustration wurden alle 60 Webentwicklungszustände gezielt erneut geprüft; auch keine abgeschnittenen Illustrationen. Protokoll mit ursprünglichem Befund und Nachprüfung: `reports/services-audit-v5.json`. Leertaste für Illustrationsauswahl und Enter für Prozessschritte wurden zusätzlich manuell geprüft. Dies ersetzt keine vollständige manuelle WCAG- oder Screenreader-Prüfung.

Reproduzierbare Prüfhilfe: `scripts/service-harness.html` temporär als `public/__qa-services.html` bereitstellen und axe-core als `public/__qa-axe.js` kopieren; beide vor dem Produktionsbuild entfernen. Statische Dateien im öffentlichen Ordner sind von der TypeScript-Quellcodeprüfung ausgenommen.
