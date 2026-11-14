/* ===== HISTORIA script ===== */

// Art helper: every item gets a hand-drawn gold emblem (SVG, always loads).
// To use a real photo, save it as assets/images/<key>.jpg (e.g. egypt.jpg, hero.jpg);
// it will automatically cover the emblem. Missing photos are simply ignored.
const KEY = {'Kheops-Pyramid.jpg':['egypt',38],'The_Parthenon_in_Athens.jpg':['greece',215],'Colosseum_in_Rome,_Italy_-_April_2007.jpg':['rome',8],
 'Mohenjo_daro.jpg':['indus',22],'The_Great_Wall_of_China_at_Jinshanling-edit.jpg':['china',355],'Ziggurat_of_Ur_001.jpg':['mesopotamia',30],
 'Chichen_Itza_3.jpg':['maya',150],'Hagia_Sophia_Mars_2013.jpg':['ottoman',195],'Alexander_the_Great_mosaic.jpg':['alexander',265],
 'Gaius_Iulius_Caesar_(Vatican_Museum).jpg':['caesar',345],'Kleopatra-VII.-Altes-Museum-Berlin1.jpg':['cleopatra',175],'Lion_Capital_of_Ashoka.jpg':['ashoka',28],
 'Genghis_Khan.jpg':['genghis',225],'Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg':['leonardo',45]};
const R = (n, f) => Array.from({length: n}, (_, i) => f(i, i / n * 2 * Math.PI)).join('');
const ART = {
  egypt: '<circle cx="145" cy="55" r="16"/><path d="M12 160H188M22 160L85 68L148 160M108 160L148 102L188 160M85 68V160"/>',
  greece: '<path d="M28 82L100 46L172 82Z M34 90H166 M45 98V150 M72.5 98V150 M100 98V150 M127.5 98V150 M155 98V150 M28 156H172 M20 166H180"/>',
  rome: '<path d="M30 76H170M30 76V160H170V76"/>' + R(4, i => `<path d="M${30+i*35} 160V138a17.5 17.5 0 0 1 35 0V160M${30+i*35} 120V98a17.5 17.5 0 0 1 35 0V120"/>`),
  indus: '<rect x="30" y="40" width="140" height="120"/>' + R(4, i => `<path d="M${58+i*28} 40V160"/>`) + R(3, i => `<path d="M30 ${70+i*30}H170"/>`) + '<rect x="86" y="86" width="28" height="28" stroke-width="2.4"/>',
  china: '<path d="M8 152L50 118L92 134L132 98L170 114L192 88M8 164L50 130L92 146L132 110L170 126L192 100M44 118v-14h12v14M126 98V84h12v14M164 114v-14h12v14"/>',
  mesopotamia: '<path d="M28 160H172V135H152V110H130V85H70V110H48V135H28ZM88 85V62H112V85M100 160V85"/>',
  maya: '<path d="M28 160L46 134H154L172 160ZM46 134L62 112H138L154 134M62 112L76 90H124L138 112M76 90L88 70H112L124 90M88 70V52H112V70M100 160V70"/>',
  ottoman: '<path d="M54 122a46 46 0 0 1 92 0M48 122H152V160H48ZM100 76V58M104 52a6 6 0 1 0-4 10M26 160V92l5-14 5 14V160M164 160V92l5-14 5 14V160M92 160V140a8 8 0 0 1 16 0V160"/>',
  alexander: '<circle cx="100" cy="100" r="9"/><circle cx="100" cy="100" r="52"/>' + R(16, (i, a) => `<path d="M${100+18*Math.cos(a)} ${100+18*Math.sin(a)}L${100+(i%2?36:48)*Math.cos(a)} ${100+(i%2?36:48)*Math.sin(a)}"/>`),
  caesar: R(15, (i, a) => { if (Math.abs(a - Math.PI * 1.5) < .3) return ''; return `<ellipse cx="${100+46*Math.cos(a)}" cy="${100+46*Math.sin(a)}" rx="4" ry="12" transform="rotate(${a*180/Math.PI} ${100+46*Math.cos(a)} ${100+46*Math.sin(a)})"/>`; }) + '<path d="M92 150L100 166L108 150"/>',
  cleopatra: '<path d="M26 100Q100 40 174 100Q100 160 26 100Z M40 78Q100 30 160 78"/><circle cx="100" cy="100" r="17"/><circle cx="100" cy="100" r="6"/><path d="M100 130V152Q96 164 80 160"/>',
  ashoka: '<circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="44"/><circle cx="100" cy="100" r="8"/>' + R(24, (i, a) => `<path d="M${100+8*Math.cos(a)} ${100+8*Math.sin(a)}L${100+44*Math.cos(a)} ${100+44*Math.sin(a)}"/>`),
  genghis: '<path d="M100 28V176M64 70H136"/><circle cx="100" cy="46" r="10"/>' + R(9, i => `<path d="M${68+i*8} 70V${100+(i%3)*12}"/>`) + '<path d="M82 176H118"/>',
  leonardo: '<circle cx="100" cy="100" r="56"/><rect x="50" y="50" width="100" height="100"/><circle cx="100" cy="66" r="7"/><path d="M100 73V112M100 112L84 150M100 112L116 150M100 86L56 100M100 86L144 100M100 86L62 70M100 86L138 70"/>'
};
const WIKI = {egypt:'Great_Pyramid_of_Giza',greece:'Parthenon',rome:'Colosseum',indus:'Mohenjo-daro',china:'Great_Wall_of_China',mesopotamia:'Ziggurat_of_Ur',
  maya:'Chichen_Itza',ottoman:'Hagia_Sophia',alexander:'Alexander_the_Great',caesar:'Julius_Caesar',cleopatra:'Cleopatra',ashoka:'Ashoka',genghis:'Genghis_Khan',leonardo:'Leonardo_da_Vinci'};
// Each item = gold emblem (always visible) + a photo that fades in over it once loaded.
const img = (f, alt, w) => {
  const [k, h] = KEY[f] || ['egypt', 38];
  return `<div class="art" style="--h:${h}"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${alt}">${ART[k]}</svg></div><img class="ph" data-wiki="${w || WIKI[k]}" alt="${alt}" referrerpolicy="no-referrer">`;
};
// Looks up the lead photo of a Wikipedia article (free, no API key).
const wcache = {};
const wiki = t => wcache[t] || (wcache[t] = fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(t))
  .then(r => r.json())
  .then(j => { const o = j.originalimage, th = j.thumbnail; if (!th) return null;
    return { big: (o && o.width <= 960) ? o.source : th.source.replace(/\/\d+px-/, '/960px-'), huge: (o && o.width <= 1920) ? o.source : th.source.replace(/\/\d+px-/, '/1920px-'), small: th.source }; })
  .catch(() => null));
// Photos are only requested when they are about to scroll into view (saves data and speeds up the first load).
function fetchPhoto(el) {
  wiki(el.dataset.wiki).then(u => {
    if (!u) return;
    el.onerror = () => { el.onerror = () => el.remove(); el.src = u.small; };
    el.onload = () => el.classList.add('ok');
    el.decoding = 'async'; el.src = u.big;
  });
}
const photoIO = 'IntersectionObserver' in window ? new IntersectionObserver((es, o) => es.forEach(en => {
  if (en.isIntersecting) { o.unobserve(en.target); fetchPhoto(en.target); }
}), {rootMargin: '300px'}) : null;
function loadPhotos(root) {
  root.querySelectorAll('img[data-wiki]').forEach(el => { if (el.dataset.q) return; el.dataset.q = '1'; photoIO ? photoIO.observe(el) : fetchPhoto(el); });
}

