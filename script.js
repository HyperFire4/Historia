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
const img = (f, alt) => {
  const [k, h] = KEY[f] || ['egypt', 38];
  return `<div class="art" style="--h:${h}"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${alt}">${ART[k]}</svg></div><img src="assets/images/${k}.jpg" alt="${alt}" loading="lazy" onerror="this.remove()">`;
};

/* ---------- DATA ---------- */
const civs = [
  {n:'Ancient Egypt', p:'c. 3100 – 30 BCE', f:'Kheops-Pyramid.jpg',
   s:'A Nile Valley kingdom of pharaohs, pyramids and hieroglyphs.',
   d:['Egyptian civilization grew along the Nile, whose yearly floods made farming reliable. Around 3100 BCE, Upper and Lower Egypt were united under one ruler, according to tradition Narmer or Menes.',
      'Its monuments include the Great Pyramid of Giza, built around 2560 BCE for Pharaoh Khufu. Egyptians developed hieroglyphic writing, papyrus, and detailed medical and mathematical knowledge.',
      'Egypt became a Roman province after the death of Cleopatra VII in 30 BCE.']},
  {n:'Ancient Greece', p:'c. 800 – 146 BCE', f:'The_Parthenon_in_Athens.jpg',
   s:'City-states that gave the world democracy, philosophy and drama.',
   d:['Greece was a network of independent city-states, including Athens, Sparta and Corinth, sharing language, religion and festivals.',
      'Athens developed an early form of democracy in the 5th century BCE, though only adult male citizens could vote. Philosophers such as Socrates, Plato and Aristotle shaped Western thought.',
      'Roman conquest, completed with the sack of Corinth in 146 BCE, ended Greek political independence.']},
  {n:'Roman Empire', p:'27 BCE – 476 CE (West)', f:'Colosseum_in_Rome,_Italy_-_April_2007.jpg',
   s:'From a city on the Tiber to a power spanning the Mediterranean.',
   d:['Rome, traditionally founded in 753 BCE, became a republic and then an empire under Augustus in 27 BCE. At its height it surrounded the Mediterranean Sea.',
      'Romans spread Latin, written law, roads, aqueducts and concrete engineering across three continents.',
      'The Western Empire ended in 476 CE. The Eastern (Byzantine) Empire continued until 1453.']},
  {n:'Indus Valley Civilization', p:'c. 3300 – 1300 BCE', f:'Mohenjo_daro.jpg',
   s:'Planned cities with advanced drainage in South Asia.',
   d:['Centered on the Indus River basin in present-day Pakistan and northwest India, this civilization had major cities such as Mohenjo-daro and Harappa.',
      'Its cities were laid out on grids with standardized bricks and covered drains. Its script, found on seals, has not been deciphered, so much about its society remains uncertain.',
      'Its urban phase declined after about 1900 BCE; causes such as shifting rivers and climate change are still debated.']},
  {n:'Ancient China', p:'c. 2070 BCE – 220 CE', f:'The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
   s:'Dynasties that built canals, walls and a lasting imperial state.',
   d:['Early Chinese history includes the Shang and Zhou dynasties. The Shang left the oldest known Chinese writing on oracle bones. The Xia dynasty is traditional and lacks firm archaeological confirmation.',
      'In 221 BCE the Qin dynasty unified China under Qin Shi Huang. The Han dynasty that followed opened the Silk Road trade routes.',
      'The Great Wall is not one wall but several walls built and rebuilt over many centuries.']},
  {n:'Mesopotamia', p:'c. 3500 – 539 BCE', f:'Ziggurat_of_Ur_001.jpg',
   s:'The land between two rivers, home of the first cities and writing.',
   d:['Mesopotamia lies between the Tigris and Euphrates rivers, in modern Iraq. Sumerian cities such as Uruk and Ur appeared around 3500 BCE.',
      'Cuneiform writing, pressed into clay, emerged around 3400–3200 BCE. Later Akkadian, Babylonian and Assyrian states ruled the region, and Hammurabi of Babylon issued a famous law code around 1754 BCE.',
      'Babylon fell to Persian king Cyrus the Great in 539 BCE.']},
  {n:'Mayan Civilization', p:'c. 2000 BCE – 1500s CE', f:'Chichen_Itza_3.jpg',
   s:'Mesoamerican city-states of astronomers, builders and scribes.',
   d:['The Maya lived across southern Mexico, Guatemala, Belize and Honduras. Their Classic period, about 250–900 CE, saw great cities such as Tikal, Palenque and Copán.',
      'They created a full writing system, precise calendars and astronomical records, and used the concept of zero.',
      'Many Maya cities declined after 900 CE, but Maya peoples and languages continue today.']},
  {n:'Ottoman Empire', p:'c. 1299 – 1922 CE', f:'Hagia_Sophia_Mars_2013.jpg',
   s:'A multi-ethnic empire linking Europe, Asia and Africa for 600 years.',
   d:['Founded around 1299 in Anatolia, the Ottoman state expanded after Mehmed II captured Constantinople in 1453.',
      'Under Suleiman the Magnificent in the 16th century it reached its height, with architecture by Mimar Sinan and a large administrative system governing many faiths and peoples.',
      'The empire was dissolved after World War I; the Sultanate was abolished in 1922 and the Republic of Turkey founded in 1923.']}
];

const timeline = [
  {y:'3500 BCE', t:'Emergence of Mesopotamian cities', k:'Established', f:'Ziggurat_of_Ur_001.jpg',
   d:'Sumerian settlements such as Uruk grew into the first large cities, with temples, trade and administration. Dates are approximate and based on archaeology.'},
  {y:'3100 BCE', t:'Unification of Ancient Egypt', k:'Traditional date', f:'Kheops-Pyramid.jpg',
   d:'Tradition credits a ruler called Narmer or Menes with uniting Upper and Lower Egypt. The exact date and person are debated by scholars.'},
  {y:'2600 BCE', t:'Peak of Indus Valley urban development', k:'Approximate', f:'Mohenjo_daro.jpg',
   d:'Around this period, cities like Mohenjo-daro and Harappa flourished with planned streets and drainage. The mature phase is usually dated c. 2600–1900 BCE.'},
  {y:'776 BCE', t:'First recorded Olympic Games', k:'Traditional date', f:'The_Parthenon_in_Athens.jpg',
   d:'Ancient Greek writers dated the first Olympic Games to 776 BCE at Olympia. This date comes from later lists of winners, so it is traditional rather than firmly proven.'},
  {y:'753 BCE', t:'Founding of Rome', k:'Traditional date', f:'Colosseum_in_Rome,_Italy_-_April_2007.jpg',
   d:'Roman tradition, using the legend of Romulus, placed the city\'s founding in 753 BCE. Archaeology shows settlement on the Roman hills in this general period.'},
  {y:'323 BCE', t:'Death of Alexander the Great', k:'Established', f:'Alexander_the_Great_mosaic.jpg',
   d:'Alexander died in Babylon in June 323 BCE, aged 32. His empire was soon divided among his generals, the Diadochi.'},
  {y:'221 BCE', t:'Qin unifies China', k:'Established', f:'The_Great_Wall_of_China_at_Jinshanling-edit.jpg',
   d:'After defeating rival states, King Zheng of Qin became Qin Shi Huang, the first emperor of a unified China, and standardized writing, weights and measures.'},
  {y:'476 CE', t:'Fall of the Western Roman Empire', k:'Conventional date', f:'Colosseum_in_Rome,_Italy_-_April_2007.jpg',
   d:'The Germanic leader Odoacer deposed Romulus Augustulus in 476 CE. Historians use this as a convenient end date, though the decline was gradual.'},
  {y:'1453 CE', t:'Fall of Constantinople', k:'Established', f:'Hagia_Sophia_Mars_2013.jpg',
   d:'On 29 May 1453, Ottoman forces under Mehmed II captured Constantinople, ending the Byzantine Empire.'}
];

const figures = [
  {n:'Alexander the Great', t:'King of Macedon', e:'356 – 323 BCE', f:'Alexander_the_Great_mosaic.jpg',
   s:'Conqueror who built an empire from Greece to India.',
   d:['Alexander became king of Macedon at 20 and was taught by Aristotle. Between 334 and 323 BCE he defeated the Persian Empire and reached the Indus region.','He founded many cities named Alexandria, helping spread Greek culture across Asia, an era known as the Hellenistic period.']},
  {n:'Julius Caesar', t:'Roman general and statesman', e:'100 – 44 BCE', f:'Gaius_Iulius_Caesar_(Vatican_Museum).jpg',
   s:'Conqueror of Gaul whose rise ended the Roman Republic.',
   d:['Caesar conquered Gaul (58–50 BCE), then won a civil war against Pompey. He was named dictator and introduced the Julian calendar in 46 BCE.','He was assassinated on 15 March 44 BCE by senators who feared his power. His heir Octavian became Rome\'s first emperor, Augustus.']},
  {n:'Cleopatra VII', t:'Last active ruler of Ptolemaic Egypt', e:'69 – 30 BCE', f:'Kleopatra-VII.-Altes-Museum-Berlin1.jpg',
   s:'A skilled diplomat who fought to keep Egypt independent.',
   d:['Cleopatra belonged to the Greek Macedonian Ptolemaic dynasty and reportedly spoke several languages, including Egyptian.','She allied with Julius Caesar and later Mark Antony. After their defeat at Actium in 31 BCE, she died in 30 BCE and Egypt became a Roman province.']},
  {n:'Ashoka the Great', t:'Emperor of the Maurya Empire', e:'c. 268 – 232 BCE', f:'Lion_Capital_of_Ashoka.jpg',
   s:'Emperor who embraced non-violence after the Kalinga War.',
   d:['Ashoka ruled most of the Indian subcontinent. According to his own edicts, the suffering of the Kalinga War (c. 261 BCE) led him to support Buddhism and moral governance.','His edicts, carved on rocks and pillars, are among the earliest deciphered Indian writings. The Lion Capital of Ashoka is India\'s national emblem.']},
  {n:'Genghis Khan', t:'Founder of the Mongol Empire', e:'c. 1162 – 1227 CE', f:'Genghis_Khan.jpg',
   s:'Unified the Mongol tribes and began history\'s largest contiguous land empire.',
   d:['Born Temüjin, he united the Mongol tribes and was proclaimed Genghis Khan in 1206. His armies used speed, discipline and skilled cavalry.','His campaigns caused great destruction, but the empire also protected trade on the Silk Road and promoted a written script and religious tolerance.']},
  {n:'Leonardo da Vinci', t:'Painter, engineer and scientist', e:'1452 – 1519 CE', f:'Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg',
   s:'Renaissance polymath behind the Mona Lisa and the Last Supper.',
   d:['Born in Vinci, Italy, Leonardo trained in Florence and worked in Milan and France. His paintings include the Mona Lisa and The Last Supper.','His notebooks hold studies of anatomy, flight, water and machines, showing a curiosity that connected art with science.']}
];

const facts = [
  'Cleopatra lived closer in time to the Moon landing in 1969 than to the building of the Great Pyramid of Giza.',
  'The University of Oxford was already teaching before the Aztec city of Tenochtitlan was founded in 1325.',
  'The dome of the Roman Pantheon, completed in the 2nd century CE, is still the largest unreinforced concrete dome in the world.',
  'Cities of the Indus Valley, such as Mohenjo-daro, had covered drains and private wells more than 4,000 years ago.',
  'The Great Wall of China is a series of walls built by different dynasties over many centuries, not one continuous structure.',
  'Cuneiform, one of the earliest known writing systems, was first used in Mesopotamia around 3400–3200 BCE.',
  'The ancient Olympic Games were held at Olympia for over a thousand years and ended in the late 4th century CE.',
  'The Maya independently developed the concept of zero and kept highly accurate astronomical calendars.',
  'Emperor Ashoka\'s edicts, carved on pillars and rocks across South Asia, are among the oldest deciphered Indian inscriptions.',
  'Hagia Sophia in Istanbul was completed in 537 CE under Emperor Justinian I, and has stood for almost 1,500 years.'
];

/* ---------- RENDER ---------- */
const $ = id => document.getElementById(id);

// Civilization and figure cards share one template
const card = (o, i, type) => `
  <article class="card glass rv">
    <div class="thumb">${img(o.f, o.n)}</div>
    <div class="card-body">
      <h3>${o.n}</h3>
      <span class="meta">${type === 'civ' ? o.p : o.t + ', ' + o.e}</span>
      <p>${o.s}</p>
      <button class="btn" data-type="${type}" data-i="${i}">${type === 'civ' ? 'Explore' : 'Read biography'}</button>
    </div>
  </article>`;
$('civGrid').innerHTML = civs.map((c, i) => card(c, i, 'civ')).join('');
$('figGrid').innerHTML = figures.map((c, i) => card(c, i, 'fig')).join('');

/* ---------- MODAL ---------- */
const modal = $('modal');
function openModal(o, sub) {
  $('mImg').innerHTML = img(o.f, o.n);
  $('mBody').innerHTML = `<span class="meta">${sub}</span><h3>${o.n}</h3>` + o.d.map(t => `<p>${t}</p>`).join('');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('close').focus();
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-type]');
  if (!b) return;
  const o = (b.dataset.type === 'civ' ? civs : figures)[b.dataset.i];
  openModal(o, b.dataset.type === 'civ' ? o.p : o.t + ', ' + o.e);
});
$('close').onclick = closeModal;
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- TIMELINE ---------- */
$('rail').innerHTML = timeline.map((m, i) => `<button class="dot" data-m="${i}"><b>${m.y}</b></button>`).join('');
function showMilestone(i) {
  const m = timeline[i];
  document.querySelectorAll('.dot').forEach((d, j) => d.classList.toggle('on', i === j));
  $('tlPanel').innerHTML = `
    <div class="thumb">${img(m.f, m.t)}</div>
    <div class="tl-text"><span class="tag">${m.k}</span><h3>${m.y}: ${m.t}</h3><p>${m.d}</p></div>`;
}
$('rail').addEventListener('click', e => {
  const b = e.target.closest('.dot');
  if (b) showMilestone(+b.dataset.m);
});
showMilestone(0);

/* ---------- RANDOM FACT (never repeats the same fact twice in a row) ---------- */
let lastFact = -1;
function newFact() {
  let i;
  do { i = Math.floor(Math.random() * facts.length); } while (i === lastFact);
  lastFact = i;
  const p = $('factText');
  p.style.opacity = 0;
  setTimeout(() => { p.textContent = facts[i]; p.style.opacity = 1; }, 250);
}
$('factBtn').onclick = newFact;
newFact();

/* ---------- NAV: hamburger, active link, back-to-top ---------- */
const links = $('links'), burger = $('burger');
burger.onclick = () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
  burger.textContent = open ? '✕' : '☰';
};
links.addEventListener('click', e => {
  if (e.target.tagName === 'A') { links.classList.remove('open'); burger.textContent = '☰'; burger.setAttribute('aria-expanded', 'false'); }
});

const navLinks = [...links.querySelectorAll('a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
const top = $('top');
function onScroll() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let cur = 0;
  sections.forEach((s, i) => { if (s.offsetTop <= y) cur = i; });
  navLinks.forEach((a, i) => a.classList.toggle('active', i === cur));
  top.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
top.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- SCROLL REVEAL ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: .12 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ---------- HERO PARTICLES ---------- */
const pc = $('particles');
for (let i = 0; i < 22; i++) {
  const s = document.createElement('span');
  s.style.left = Math.random() * 100 + '%';
  s.style.animationDuration = 9 + Math.random() * 10 + 's';
  s.style.animationDelay = Math.random() * 10 + 's';
  pc.appendChild(s);
}

/* ---------- HERO ASTROLABE RINGS (one slow, decorative motion) ---------- */
const ring = document.getElementById('rings');
if (ring) ring.innerHTML =
  [380, 330, 250, 170].map((r, i) => `<circle cx="400" cy="400" r="${r}" ${i % 2 ? 'stroke-dasharray="2 10"' : ''}/>`).join('') +
  Array.from({length: 72}, (_, i) => { const a = i / 72 * 6.2832, l = i % 6 ? 8 : 20;
    return `<path d="M${400+380*Math.cos(a)} ${400+380*Math.sin(a)}L${400+(380-l)*Math.cos(a)} ${400+(380-l)*Math.sin(a)}"/>`; }).join('') +
  '<path d="M400 20V780M20 400H780" opacity=".4"/><circle cx="400" cy="400" r="6" fill="currentColor"/>';
