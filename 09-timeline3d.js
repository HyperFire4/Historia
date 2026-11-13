/* ---------- 3D TIMELINE ---------- */
const scene = $('tlScene'), stage = $('tlStage'), floor = $('floor'), rail = $('rail');
let cards = [], dots = [];
function buildTl() {   // (re)builds the 3D cards and the year rail in the current language
  stage.innerHTML = timeline.map((m0, i) => { const m = locT(m0, i);
    return `<article class="tcard"><div class="thumb">${img(m0.f, m.t, m0.w)}</div>
    <div class="tc-body"><span class="tag">${tx(m0.k)}</span><h3><small>${m.y}</small>${m.t}</h3><p>${m.d}</p><div class="why"><b>${tx('Why it matters')}</b>${m.why}</div></div></article>`; }).join('');
  loadPhotos(stage);
  rail.innerHTML = timeline.map((m0, i) => `<button class="dot" data-m="${i}"><b>${locT(m0, i).y}</b></button>`).join('');
  cards = [...stage.children]; dots = [...rail.children];
}
buildTl();
let cur = 0, sx = null, moved = false, tour = null;

// Place every card in 3D space relative to the active one
function layout() {
  const gap = cards[0].offsetWidth * (window.innerWidth < 700 ? .5 : .66);
  cards.forEach((c, i) => {
    const d = i - cur, a = Math.abs(d);
    c.style.transform = `translateX(${d * gap}px) translateZ(${a ? -a * 150 : 60}px) rotateY(${Math.max(-55, Math.min(55, -d * 38))}deg)`;
    c.style.opacity = a > 3 ? 0 : [1, .8, .5, .22][a];
    c.style.zIndex = 20 - a;
    c.style.pointerEvents = a > 3 ? 'none' : 'auto';
    c.classList.toggle('on', !d);
  });
  dots.forEach((x, j) => x.classList.toggle('on', j === cur));
  rail.scrollTo({ left: dots[cur].offsetLeft - rail.clientWidth / 2 + dots[cur].offsetWidth / 2, behavior: 'smooth' });
  floor.style.backgroundPosition = `${-cur * 140}px 0, 0 0`; // the grid floor glides as you travel through time
}
const go = i => { cur = Math.max(0, Math.min(timeline.length - 1, i)); layout(); };
$('tlPrev').onclick = () => { stopTour(); go(cur - 1); };
$('tlNext').onclick = () => { stopTour(); go(cur + 1); };
rail.addEventListener('click', e => { const b = e.target.closest('.dot'); if (b) { stopTour(); go(+b.dataset.m); } });
stage.addEventListener('click', e => { const c = e.target.closest('.tcard'); if (c && !moved) { stopTour(); go(cards.indexOf(c)); } });
scene.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { stopTour(); go(cur + 1); e.preventDefault(); }
  if (e.key === 'ArrowLeft') { stopTour(); go(cur - 1); e.preventDefault(); }
});
// Drag / swipe, plus a gentle mouse-follow tilt
scene.addEventListener('pointerdown', e => { sx = e.clientX; moved = false; });
scene.addEventListener('pointermove', e => {
  if (e.pointerType === 'mouse') {
    const r = scene.getBoundingClientRect(), mx = (e.clientX - r.left) / r.width - .5, my = (e.clientY - r.top) / r.height - .5;
    stage.style.transform = `rotateX(${-my * 5}deg) rotateY(${mx * 8}deg)`;
  }
  if (sx !== null && Math.abs(e.clientX - sx) > 60) { stopTour(); go(cur + (e.clientX < sx ? 1 : -1)); sx = e.clientX; moved = true; }
});
['pointerup', 'pointercancel'].forEach(n => scene.addEventListener(n, () => sx = null));
scene.addEventListener('pointerleave', () => { sx = null; stage.style.transform = ''; });
// Auto tour
function stopTour() { if (tour) { clearInterval(tour); tour = null; $('tlPlay').textContent = tx('▶ Auto tour'); } }
$('tlPlay').onclick = () => {
  if (tour) return stopTour();
  $('tlPlay').textContent = tx('❚❚ Pause');
  tour = setInterval(() => { if (cur === timeline.length - 1) cur = -1; go(cur + 1); }, 3500);
};
window.addEventListener('resize', layout);
layout();

