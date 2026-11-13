/* ---------- RANDOM FACT (never repeats the same fact twice in a row) ---------- */
let lastFact = -1;
function newFact() {
  let i;
  do { i = Math.floor(Math.random() * facts.length); } while (i === lastFact);
  lastFact = i;
  const p = $('factText');
  p.style.opacity = 0; p.style.transform = 'translateY(14px)';
  setTimeout(() => { p.textContent = factT(i); p.style.opacity = 1; p.style.transform = 'none'; }, 280);
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
const toTop = $('top'), heroIn = document.querySelector('.hero-inner');
function onScroll() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let cur = 0;
  sections.forEach((s, i) => { if (s.offsetTop <= y) cur = i; });
  navLinks.forEach((a, i) => a.classList.toggle('active', i === cur));
  toTop.classList.toggle('show', window.scrollY > 600);
  const sy = window.scrollY, dh = document.documentElement.scrollHeight - window.innerHeight;
  $('prog').style.transform = `scaleX(${dh > 0 ? sy / dh : 0})`;
  $('nav').classList.toggle('sm', sy > 40);
  if (sy < window.innerHeight * 1.2) { heroIn.style.transform = `translateY(${sy * .3}px)`; heroIn.style.opacity = Math.max(0, 1 - sy / (window.innerHeight * .8)); }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- SCROLL REVEAL ---------- */
const io = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); setTimeout(() => en.target.classList.add('done'), 1600); io.unobserve(en.target); }
}), { threshold: .12 });
document.querySelectorAll('h2, .lead').forEach(el => el.classList.add('rv'));
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


/* ---------- HERO: photo changes every 15 seconds ---------- */
const SL = [['Giza_pyramid_complex', 'Pyramids of Giza, Egypt'], ['Acropolis_of_Athens', 'The Acropolis, Athens'], ['Colosseum', 'The Colosseum, Rome'],
  ['Great_Wall_of_China', 'The Great Wall, China'], ['Chichen_Itza', 'Chichén Itzá, Mexico'], ['Hagia_Sophia', 'Hagia Sophia, Istanbul']];
const hs = [$('hsA'), $('hsB')], hdots = $('heroDots');
let front = 0, idx = 0, slideTimer;
hdots.innerHTML = SL.map((_, i) => `<button aria-label="Show photo ${i + 1}" data-s="${i}"></button>`).join('');
function showSlide(i) {
  wiki(SL[i][0]).then(u => {
    if (!u) return;
    const im = new Image();
    im.onerror = () => { if (im.src !== u.big) im.src = u.big; };
    im.onload = () => {
      const nx = 1 - front;
      hs[nx].style.backgroundImage = `url("${im.src}")`;
      hs[nx].classList.add('on'); hs[front].classList.remove('on'); front = nx;
      shownSlide = i; $('heroCap').textContent = tx(SL[i][1]);
      [...hdots.children].forEach((d, j) => d.classList.toggle('on', j === i));
    };
    im.src = u.huge;
  });
}
function startSlides() { clearInterval(slideTimer); slideTimer = setInterval(() => { idx = (idx + 1) % SL.length; showSlide(idx); }, 15000); }
hdots.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { idx = +b.dataset.s; showSlide(idx); startSlides(); } });
showSlide(0); startSlides();
SL.slice(1).forEach(sl => wiki(sl[0])); // warm up the lookups

/* ---------- HERO TITLE: words rise in one by one ---------- */
const h1 = document.querySelector('.hero h1');
h1.innerHTML = h1.textContent.split(' ').map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ');

/* ---------- COUNT-UP NUMBERS ---------- */
const sio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; sio.unobserve(en.target);
  const b = en.target.querySelector('b'), n = +b.dataset.n, t0 = performance.now();
  (function f(t) { const k = Math.min((t - t0) / 1600, 1); const v = n * (1 - Math.pow(1 - k, 3)), dv = +b.dataset.div || 1; b.textContent = (dv > 1 ? (v / dv).toFixed(2) : Math.round(v).toLocaleString()) + (k === 1 ? (b.dataset.s || '') : ''); if (k < 1) requestAnimationFrame(f); })(t0);
}), { threshold: .5 });
document.querySelectorAll('.stat').forEach(e => sio.observe(e));

/* ---------- 3D TILT ON CARDS (mouse only) ---------- */
[$('civGrid'), $('figGrid')].forEach(g => {
  g.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const c = e.target.closest('.card'); if (!c) return; const r = c.getBoundingClientRect();
    c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 10 + 'deg');
    c.style.setProperty('--rx', -((e.clientY - r.top) / r.height - .5) * 10 + 'deg');
    c.style.setProperty('--ty', '-6px');
  });
  g.addEventListener('pointerout', e => {
    const c = e.target.closest('.card');
    if (c && !c.contains(e.relatedTarget)) ['--rx', '--ry', '--ty'].forEach(v => c.style.removeProperty(v));
  });
});

