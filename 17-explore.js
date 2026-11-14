/* ============ UPDATE 6: search, world map, quiz, sound shortcut ============ */
(() => {
const ERA_COL = ['#d4af37', '#7fb5ff', '#6fcf97', '#e88a6a', '#c792ea'];   // one pin colour per era
const mk = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const store = {get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }};
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const everyone = () => civs.map(o => ({o, type: 'civ'})).concat(figures.map(o => ({o, type: 'fig'})));
const eraName = o => ERA_OF[o.n] != null ? tx(PERIODS[ERA_OF[o.n]].n) : '';
const metaOf = (o, type) => type === 'civ' ? o.p : o.t + ', ' + o.e;

/* ----- shared pop-up panel and filter chips ----- */
function panel(title) {
  const back = mk('div', 'xp'), box = mk('div', 'xp-box'), head = mk('div', 'xp-head'), x = mk('button', 'xp-x', '\u2715'), prev = document.activeElement;
  back.setAttribute('role', 'dialog'); back.setAttribute('aria-modal', 'true'); back.setAttribute('aria-label', title); x.setAttribute('aria-label', tx('Close'));
  head.append(mk('h2', null, title), x); box.appendChild(head); back.appendChild(box); document.body.appendChild(back);
  const api = {box, onClose: null, close() { document.removeEventListener('keydown', esc, true); back.remove(); if (api.onClose) api.onClose(); if (prev && prev.focus) prev.focus(); }};
  function esc(e) { if (e.key === 'Escape') { e.stopImmediatePropagation(); api.close(); } }
  document.addEventListener('keydown', esc, true);
  x.onclick = api.close; back.addEventListener('pointerdown', e => { if (e.target === back) api.close(); });
  x.focus(); return api;
}
function chips(parent, labels, cb, colors) {
  const w = mk('div', 'xp-chips'); parent.appendChild(w);
  labels.forEach((t, i) => {
    const b = mk('button', 'xp-chip', t); b.setAttribute('aria-pressed', i === 0);
    if (colors && colors[i]) b.style.borderColor = colors[i];
    b.onclick = () => { [...w.children].forEach(c => c.setAttribute('aria-pressed', c === b)); cb(i - 1); };   // -1 means "all"
    w.appendChild(b);
  });
}

/* ----- search ----- */
function openSearch() {
  const p = panel(tx('Search the museum')), inp = mk('input', 'xp-in'), list = mk('ul', 'xp-list'); let era = -1, kind = -1;
  inp.type = 'search'; inp.placeholder = tx('Civilization, person or place'); inp.setAttribute('aria-label', tx('Search the museum'));
  p.box.appendChild(inp);
  chips(p.box, [tx('All eras')].concat(PERIODS.map(e => tx(e.n))), i => { era = i; run(); });
  chips(p.box, [tx('All'), tx('civilizations'), tx('figures')], i => { kind = i; run(); });
  p.box.appendChild(list);
  function run() {
    const toks = norm(inp.value).split(/\s+/).filter(Boolean); list.textContent = '';
    const rs = everyone().filter(({o, type}) => {
      if (era >= 0 && ERA_OF[o.n] !== era) return false;
      if (kind === 0 && type !== 'civ') return false; if (kind === 1 && type !== 'fig') return false;
      const l = locI(o, type), x = EXTRA[o.n], hay = norm([o.n, l.n, metaOf(o, type), o.s, l.s, x ? x.at : '', eraName(o)].join(' '));
      return toks.every(t => hay.includes(t));
    });
    if (!rs.length) { list.appendChild(mk('li', 'xp-sub', tx('Nothing matches. Try a shorter word.'))); return; }
    rs.slice(0, 50).forEach(({o, type}) => {
      const l = locI(o, type), li = mk('li'), b = mk('button', 'xp-row', l.n);
      b.appendChild(mk('small', null, eraName(o) + ' \u00b7 ' + metaOf(l, type)));
      b.onclick = () => { p.close(); openModal(o, type); }; li.appendChild(b); list.appendChild(li);
    });
  }
  inp.addEventListener('input', run); run(); inp.focus();
}

/* ----- world map: the same dotted globe as the Explore pop-up, with every place as a pin ----- */
function openMap() {
  const p = panel(tx('World map')), cv = mk('canvas', 'xp-map'), info = mk('div', 'xp-info'); let era = -1, alive = true, drag = null, hits = [], auto = true;
  p.box.appendChild(mk('p', 'xp-sub', tx('Drag to turn the globe. Tap a pin to see who is there.')));
  chips(p.box, [tx('All eras')].concat(PERIODS.map(e => tx(e.n))), i => { era = i; info.textContent = ''; }, [null].concat(ERA_COL));
  p.box.append(cv, info); p.onClose = () => { alive = false; };
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) auto = false;
  if (!landPts) buildDots();
  const pins = everyone().filter(({o}) => EXTRA[o.n]).map(({o, type}) => ({o, type, la: EXTRA[o.n].lat * D2R, lo: EXTRA[o.n].lon * D2R, col: ERA_COL[ERA_OF[o.n]] || ERA_COL[0]}));
  const ctx = cv.getContext('2d'); let W = 0, H = 0, dpr = 1, rot = {lon: 75, lat: 18};
  const size = () => { const r = cv.getBoundingClientRect(); dpr = Math.min(window.devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; };
  size(); window.addEventListener('resize', size);
  function frame() {
    if (!alive) { window.removeEventListener('resize', size); return; }
    requestAnimationFrame(frame); if (document.hidden) return;
    if (auto && !drag) rot.lon += .12;
    const cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 8, l0 = rot.lon * D2R, p0 = rot.lat * D2R, s0 = Math.sin(p0), c0 = Math.cos(p0);
    const P = (la, lo) => { const dl = lo - l0, cl = Math.cos(la), cc = s0 * Math.sin(la) + c0 * cl * Math.cos(dl); return [cx + R * cl * Math.sin(dl), cy - R * (c0 * Math.sin(la) - s0 * cl * Math.cos(dl)), cc]; };
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const g = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R); g.addColorStop(0, '#1d2d5e'); g.addColorStop(1, '#070b1c');
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 1.4; ctx.strokeStyle = 'rgba(212,175,55,.55)'; ctx.stroke();
    ctx.fillStyle = '#e9d58f';
    for (let i = 0; i < landPts.length; i += 2) { const q = P(landPts[i], landPts[i + 1]); if (q[2] <= 0) continue; ctx.globalAlpha = .25 + q[2] * .7; const s = 1 + q[2] * 1.2; ctx.fillRect(q[0] - s / 2, q[1] - s / 2, s, s); }
    ctx.globalAlpha = 1; hits = [];
    pins.forEach(pn => {
      if (era >= 0 && ERA_OF[pn.o.n] !== era) return;
      const q = P(pn.la, pn.lo); if (q[2] <= .05) return;
      hits.push({x: q[0], y: q[1], pn}); ctx.beginPath(); ctx.arc(q[0], q[1], pn.type === 'civ' ? 6 : 4.5, 0, 7); ctx.fillStyle = pn.col; ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = '#0b1020'; ctx.stroke();
    });
  }
  requestAnimationFrame(frame);
  cv.addEventListener('pointerdown', e => { drag = {x: e.clientX, y: e.clientY, lon: rot.lon, lat: rot.lat, moved: 0}; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.moved = Math.abs(dx) + Math.abs(dy); rot.lon = drag.lon - dx * .35; rot.lat = Math.max(-80, Math.min(80, drag.lat + dy * .35)); });
  cv.addEventListener('pointerup', e => {
    const d = drag; drag = null; if (!d || d.moved > 6) return; auto = false;
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    const near = hits.filter(h => Math.hypot(h.x - x, h.y - y) < 18).sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y));
    info.textContent = ''; if (!near.length) return;
    near.forEach(({pn}) => {   // places that share a spot are all listed
      const l = locI(pn.o, pn.type), b = mk('button', 'xp-row', l.n); b.style.marginBottom = '.4rem';
      b.appendChild(mk('small', null, eraName(pn.o) + ' \u00b7 ' + EXTRA[pn.o.n].at)); b.onclick = () => { p.close(); openModal(pn.o, pn.type); }; info.appendChild(b);
    });
  });
}

/* ----- quiz: three questions per era, taken from what the site teaches ----- */
const QUIZ = [
 [0, 'Which Babylonian king is remembered for a law code carved on a stone pillar?', ['Hammurabi', 'Cyrus the Great', 'Ramesses II', 'Hatshepsut'], 'Hammurabi\u2019s code, dated to about 1754 BCE, put laws on public view.'],
 [0, 'Which pharaoh is linked to the Battle of Kadesh and the temples of Abu Simbel?', ['Ramesses II', 'Hatshepsut', 'Tutankhamun', 'Khufu'], 'Ramesses II fought the Hittites at Kadesh and built Abu Simbel.'],
 [0, 'In which region did cuneiform writing emerge, pressed into clay?', ['Mesopotamia', 'The Indus Valley', 'Crete', 'Kush'], 'Cuneiform appeared in Mesopotamia around 3400\u20133200 BCE.'],
 [1, 'Which mountain range did Hannibal cross on his way to fight Rome?', ['The Alps', 'The Andes', 'The Himalayas', 'The Atlas'], 'He crossed the Alps and later won the battle of Cannae.'],
 [1, 'Who became the first Roman emperor and began the Pax Romana?', ['Augustus', 'Julius Caesar', 'Hannibal', 'Alexander the Great'], 'Augustus founded the Roman Empire, and his system lasted for centuries.'],
 [1, 'Which Mauryan emperor spread his message through edicts across the empire?', ['Ashoka', 'Chandragupta', 'Qin Shi Huang', 'Aryabhata'], 'Ashoka\u2019s edicts are among the best-known records of the Maurya Empire.'],
 [2, 'In which year was Charlemagne crowned emperor?', ['800', '476', '1066', '1215'], 'He was crowned in Rome on Christmas Day, 800.'],
 [2, 'Which city did Saladin retake in 1187 after the victory at Hattin?', ['Jerusalem', 'Damascus', 'Cairo', 'Baghdad'], 'Saladin founded the Ayyubid dynasty after retaking Jerusalem.'],
 [2, 'Which dynasty built the Brihadisvara Temple at Thanjavur?', ['Chola', 'Maurya', 'Gupta', 'Mughal'], 'Rajaraja I of the Chola dynasty had it completed around 1010 CE.'],
 [3, 'At which fort was Shivaji crowned in 1674?', ['Raigad', 'Shivneri', 'Sinhagad', 'Pratapgad'], 'Shivneri is where he was born; the coronation took place at Raigad.'],
 [3, 'Galileo\u2019s telescope revealed four moons orbiting which planet?', ['Jupiter', 'Mars', 'Saturn', 'Venus'], 'They are now called the Galilean moons.'],
 [3, 'Who founded the Mughal Empire in 1526?', ['Babur', 'Akbar', 'Suleiman', 'Shivaji'], 'Babur won the First Battle of Panipat; his grandson Akbar expanded the empire.'],
 [4, 'Which leader began the Salt March in 1930?', ['Mahatma Gandhi', 'Sardar Vallabhbhai Patel', 'Albert Einstein', 'Marie Curie'], 'Gandhi walked from Sabarmati to Dandi to protest the salt tax.'],
 [4, 'Marie Curie discovered polonium and which other element?', ['Radium', 'Uranium', 'Helium', 'Plutonium'], 'She named polonium after Poland, her homeland.'],
 [4, 'The Meiji Restoration began the modernisation of which country?', ['Japan', 'China', 'India', 'Russia'], 'It made Japan the first major non-Western industrial power.']
];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function openQuiz() {
  const p = panel(tx('Quiz hall')), body = mk('div'); let era = -1; p.box.appendChild(body); menu();
  function menu() {
    body.textContent = ''; const best = store.get('historia-quiz-best');
    body.appendChild(mk('p', 'xp-sub', tx('Choose an era.') + (best ? ' ' + tx('Best score') + ': ' + best + '.' : '')));
    chips(body, [tx('All eras')].concat(PERIODS.map(e => tx(e.n))), i => { era = i; });
    const go = mk('button', 'xp-go', tx('Start quiz')); go.onclick = () => start(); body.appendChild(go);
  }
  function start() {
    let qs = shuffle(QUIZ.filter(q => era < 0 || q[0] === era)); if (era < 0) qs = qs.slice(0, 10);
    let n = 0, score = 0; next();
    function next() {
      body.textContent = ''; if (n >= qs.length) return finish();
      const q = qs[n], opts = mk('div', 'xp-opts'), fb = mk('p', 'xp-sub'); fb.setAttribute('aria-live', 'polite');
      body.append(mk('p', 'xp-sub', (n + 1) + ' / ' + qs.length), mk('p', 'xp-q', q[1]), opts, fb);
      shuffle(q[2]).forEach(t => {
        const b = mk('button', 'xp-opt', t);
        b.onclick = () => {
          [...opts.children].forEach(c => { c.disabled = true; if (c.textContent === q[2][0]) c.classList.add('ok'); });
          if (t === q[2][0]) { score++; fb.textContent = tx('Correct.') + ' ' + q[3]; } else { b.classList.add('no'); fb.textContent = tx('Not quite.') + ' ' + q[3]; }
          const nb = mk('button', 'xp-go', n + 1 < qs.length ? tx('Next question') : tx('See score')); nb.onclick = () => { n++; next(); }; body.appendChild(nb); nb.focus();
        };
        opts.appendChild(b);
      });
    }
    function finish() {
      if (era < 0 && score > (parseInt(store.get('historia-quiz-best'), 10) || 0)) store.set('historia-quiz-best', score + '/' + qs.length);
      body.append(mk('p', 'xp-q', tx('You scored') + ' ' + score + ' / ' + qs.length + '.')); const again = mk('button', 'xp-go', tx('Play again')); again.onclick = menu; body.appendChild(again); again.focus();
    }
  }
}

/* ----- quick buttons (bottom left) ----- */
const dock = mk('div', 'xp-dock');
[['<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>', 'Search', openSearch],
 ['<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>', 'World map', openMap],
 ['<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01"/>', 'Quiz hall', openQuiz]
].forEach(([ico, label, fn]) => { const b = mk('button', 'xp-fab'); b.innerHTML = ICO(ico); b.setAttribute('aria-label', tx(label)); b.title = tx(label); b.onclick = fn; dock.appendChild(b); });
document.body.appendChild(dock);
document.addEventListener('keydown', e => {
  if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('.xp')) return;
  if (e.key === '/' && eraOpen === null && !modal.classList.contains('open')) { e.preventDefault(); openSearch(); }
  if (e.key.toLowerCase() === 'm') userToggle();   // M turns the soundtrack on or off
});

/* ----- sound: remember the volume; performance: pause CSS animation while the tab is hidden ----- */
const vol = store.get('historia-vol');
if (vol !== null && !isNaN(+vol)) { $('mpVol').value = vol; Music.setVolume(vol / 100); }
$('mpVol').addEventListener('input', e => store.set('historia-vol', e.target.value));
document.addEventListener('visibilitychange', () => document.documentElement.classList.toggle('xp-away', document.hidden));
})();
