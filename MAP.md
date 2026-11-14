# HISTORIA — file map (give Claude THIS file + only the files listed for your change)

Load order is fixed in index.html. Never rename or reorder files without updating index.html.
Scripts share one global scope, so a change in one file can use names from earlier files.

## CSS (css/)
| File | What it styles |
|---|---|
| core.css | base, nav, hero, sections, timeline, footer, modal, tablet/mobile |
| polish.css | glass/gold look, photos, 3D timeline cards |
| hero-globe.css | rotating hero, Explore globe pop-up |
| cinematic.css | cinematic timeline |
| audio-mobile.css | soundtrack panel, full screen, phone layouts |
| lang-eras.css | Gujarati fonts, language panel, era pages, the gate |
| smooth.css | faces in photos, smoother scrolling and lighter effects on phones |
| explore.css | search, world map and quiz pop-ups, quick buttons |

## JS (js/) — in load order
| File | What it holds |
|---|---|
| 01-art.js | gold emblems, photo loading |
| 02-data.js | civilizations, timeline, figures, facts |
| 03-translations.js | Gujarati (and future language) text |
| 04-lang-core.js | LANG + tx/locI/locT/factT helpers |
| 05-eras-data.js | era periods + civs/figures per era |
| 06-cards.js | card template |
| 07-globe-data.js | world map data (huge, never upload) |
| 08-globe-modal.js | globe drawing + Explore pop-up |
| 09-timeline3d.js | Timeline of the Ancient World |
| 10-page-ui.js | fact box, nav, hero slides, particles, tilt |
| 11-cinematic-data.js | cinematic milestones |
| 12-cinematic.js | cinematic engine, scrub bar, full screen |
| 13-music.js | soundtrack + its UI |
| 14-lang-ui.js | language switcher |
| 15-autoplay.js | soundtrack autoplay |
| 16-eras.js | era pages + gate animation + startup |
| 17-explore.js | search, world map, quiz, M key, saved volume |

## Which files for which change
- Add/edit civilizations or figures: 02-data.js (or 05-eras-data.js for era lists)
- Add a language: 03-translations.js, 14-lang-ui.js
- Add cinematic milestones: 11-cinematic-data.js (+ translations if needed)
- Change cinematic look/behaviour: 12-cinematic.js + cinematic.css
- Music: 13-music.js, 15-autoplay.js
- Hero images/animation: 10-page-ui.js + core.css/hero-globe.css
- Page text/sections/buttons: index.html
- Mobile fixes: audio-mobile.css (+ the matching CSS file)
- Era pages / gate: 16-eras.js, 05-eras-data.js, lang-eras.css
- Search / world map / quiz: 17-explore.js + explore.css (quiz questions are the QUIZ list near the middle of 17-explore.js)
- Photo loading speed: 01-art.js (loadPhotos)
- Globe pop-up: 08-globe-modal.js, hero-globe.css

## Note: in the live repo all files sit in one flat folder, so index.html refers to them without css/ or js/.
- Faces cut off in one photo: set FACE_POS in 06-cards.js (e.g. FACE_POS['photo key'] = '50% 5%')
- Phone audio crackle: LITE settings at the top of 13-music.js
