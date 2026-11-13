const cineSec = $('journey'), ccv = $('cineCv'), cc = ccv.getContext('2d'), cCard = $('cineCard');
const cl = (i, k) => { const g = LANG !== 'en' && TR[LANG] && TR[LANG].cm[i]; return g && g[k] ? g[k] : CM[i][k]; };   // label / date / title in the current language
const cpath = t => [Math.sin(t * .75) * 320 + Math.sin(t * .31 + 1) * 170, 30 * Math.sin(t * .5) + t * 14, t * 1000]; // the route of the glowing line
const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const crs3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nrm3 = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
const STARS = Array.from({length: 110}, () => [Math.random(), Math.random() * .62, Math.random() * 1.4 + .4, Math.random() * 6]);
let cW = 0, cH = 0, cDPR = 1, FOC = 800, cyH = 0;
let tc = -1.4, from = -1.4, to = 0, t0 = 0, dur = 2500, moving = false, ci = -1, target = 0, dwell = 0;
let playing = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches), cvis = false, started = false, craf = 0, last = 0, pausedAt = 0;
const gl = {lon: 20, lat: 15};

function sizeCine() {
  cDPR = Math.min(window.devicePixelRatio || 1, 2); cW = ccv.clientWidth; cH = ccv.clientHeight;
  ccv.width = cW * cDPR; ccv.height = cH * cDPR; FOC = Math.min(cH * 1.0, cW * 1.25); cyH = cH * .6;
}
function paintGlobe(c, cx, cy, r, lon, lat, pin, ts) { // same dot-globe as the Explore pop-up
  if (!landPts) buildDots();
  const l0 = lon * D2R, p0 = lat * D2R, s0 = Math.sin(p0), c0 = Math.cos(p0);
  const P = (la, lo) => { const dl = lo - l0, cl = Math.cos(la), k = s0 * Math.sin(la) + c0 * cl * Math.cos(dl);
    return [cx + r * cl * Math.sin(dl), cy - r * (c0 * Math.sin(la) - s0 * cl * Math.cos(dl)), k]; };
  const g = c.createRadialGradient(cx - r * .35, cy - r * .4, r * .1, cx, cy, r);
  g.addColorStop(0, '#1b2a5a'); g.addColorStop(1, '#060a1a');
  c.save(); c.shadowColor = 'rgba(255,170,80,.35)'; c.shadowBlur = 50; c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fillStyle = g; c.fill(); c.restore();
  c.lineWidth = 1.2; c.strokeStyle = 'rgba(255,190,110,.5)'; c.stroke();
  c.fillStyle = '#f0d9a0';
  for (let i = 0; i < landPts.length; i += 2) { const q = P(landPts[i], landPts[i + 1]); if (q[2] <= 0) continue;
    c.globalAlpha = .2 + q[2] * .7; const z = .9 + q[2] * 1.2; c.fillRect(q[0] - z / 2, q[1] - z / 2, z, z); }
  c.globalAlpha = 1;
  if (pin) { const q = P(pin[0] * D2R, pin[1] * D2R);
    if (q[2] > 0) { const k = (ts / 1400) % 1;
      [0, .5].forEach(o => { const kk = (k + o) % 1; c.beginPath(); c.arc(q[0], q[1], 5 + kk * 26, 0, 7); c.strokeStyle = `rgba(255,214,102,${(1 - kk) * .9})`; c.lineWidth = 2; c.stroke(); });
      c.beginPath(); c.arc(q[0], q[1], 5, 0, 7); c.fillStyle = '#ffd666'; c.fill(); c.lineWidth = 1.5; c.strokeStyle = '#fff'; c.stroke(); } }
}
function drawCine(now, dt) {
  const c = cc; c.setTransform(cDPR, 0, 0, cDPR, 0, 0); c.clearRect(0, 0, cW, cH);
  // stars
  c.fillStyle = '#fff';
  STARS.forEach(s => { c.globalAlpha = .2 + .35 * Math.sin(now / 900 + s[3]); c.fillRect(((s[0] * cW - tc * 4) % cW + cW) % cW, s[1] * cH, s[2], s[2]); });
  c.globalAlpha = 1;
  // globe in the background: spins, then turns to show where the current milestone happened
  const m = ci >= 0 ? CM[ci] : null, pin = (!moving && m && m.length > 8 && m[6] !== null) ? [m[6], m[7]] : null, mob = cW < 860;
  if (pin) { gl.lon += (((pin[1] - gl.lon + 540) % 360) - 180) * .05; gl.lat += (pin[0] * .8 - gl.lat) * .05; } else { gl.lon += dt * 9; gl.lat += (15 - gl.lat) * .03; }
  paintGlobe(c, mob ? cW / 2 : cW * .76, mob ? cH * .26 : cH * .31, mob ? Math.min(cW * .3, cH * .16) : Math.min(cW * .2, cH * .27), gl.lon, gl.lat, pin, now);
  // camera rides slightly behind and above the line, looking ahead
  const p = cpath(tc - .85), eye = [p[0] + Math.sin(now / 2600) * 30, p[1] + 210, p[2]], look = cpath(tc + 1.5);
  const f = nrm3(sub3(look, eye)), r = nrm3(crs3([0, 1, 0], f)), u = crs3(f, r);
  const toC = q => { const v = sub3(q, eye); return [dot3(v, r), dot3(v, u), dot3(v, f)]; };
  const prj = v => [cW / 2 + FOC * v[0] / v[2], cyH - FOC * v[1] / v[2]];
  const seg = (a, b) => { let A = toC(a), B = toC(b); const n = 40; if (A[2] < n && B[2] < n) return null;
    if (A[2] < n) { const k = (n - A[2]) / (B[2] - A[2]); A = [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k, n]; }
    else if (B[2] < n) { const k = (n - B[2]) / (A[2] - B[2]); B = [B[0] + (A[0] - B[0]) * k, B[1] + (A[1] - B[1]) * k, n]; }
    return [prj(A), prj(B), (A[2] + B[2]) / 2]; };
  const line = (a, b, col, w) => { const s = seg(a, b); if (!s) return; c.beginPath(); c.moveTo(s[0][0], s[0][1]); c.lineTo(s[1][0], s[1][1]); c.strokeStyle = col; c.lineWidth = w; c.stroke(); };
  // perspective floor grid
  const cp = cpath(tc), fy = cp[1] - 150, gz0 = Math.floor((cp[2] - 400) / 250) * 250, gx0 = Math.floor((cp[0] - 3000) / 250) * 250;
  for (let k = 0; k <= 24; k++) line([gx0 + k * 250, fy, cp[2] - 400], [gx0 + k * 250, fy, cp[2] + 6200], 'rgba(255,150,70,.11)', 1);
  for (let k = 0; k <= 26; k++) line([cp[0] - 3000, fy, gz0 + k * 250], [cp[0] + 3000, fy, gz0 + k * 250], 'rgba(255,150,70,.08)', 1);
  // the glowing line, drawn in three passes (halo, glow, bright core)
  const pts = []; for (let t = tc - 1.3; t <= tc + 6.5; t += .03) { const w = toC(cpath(t)); pts.push(w[2] > 40 ? [prj(w), w[2], t] : null); }
  [[44, .13, 'rgba(255,110,30,'], [16, .4, 'rgba(255,140,50,'], [4.5, 1, 'rgba(255,230,190,']].forEach(([wd, al, col], pass) => {
    c.lineCap = 'round'; if (pass === 2) { c.shadowColor = '#ff7a1a'; c.shadowBlur = 14; }
    for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; if (!a || !b) continue;
      const fade = Math.max(0, 1 - (b[2] - tc) / 7.6); c.beginPath(); c.moveTo(a[0][0], a[0][1]); c.lineTo(b[0][0], b[0][1]);
      c.strokeStyle = col + (al * Math.min(1, fade * 1.6)).toFixed(3) + ')'; c.lineWidth = Math.max(.6, wd * FOC / b[1] * .4); c.stroke(); }
    c.shadowBlur = 0; });
  // cross-ticks along the line
  for (let t = Math.ceil((tc - 1.2) / .1) * .1; t < tc + 5.5; t += .1) { const q = cpath(t); line([q[0] - 65, q[1] - 2, q[2]], [q[0] + 65, q[1] - 2, q[2]], `rgba(255,235,210,${Math.max(0, .4 - (t - tc) * .06).toFixed(2)})`, 1.4); }
  // milestone pins, far to near
  for (let i = CM.length - 1; i >= 0; i--) {
    if (i < tc - 1.2 || i > tc + 7) continue;
    const b = cpath(i), top = [b[0], b[1] + 300, b[2]], B = toC(b), T = toC(top); if (B[2] < 60) continue;
    const pb = prj(B), pt = prj(T), act = i === target && !moving, al = act ? 1 : Math.max(0, Math.min(1, 1 - Math.abs(i - tc) / 6.5)) * .85;
    c.globalAlpha = al; c.beginPath(); c.moveTo(pb[0], pb[1]); c.lineTo(pt[0], pt[1]); c.strokeStyle = act ? '#ffd9a0' : 'rgba(255,255,255,.7)'; c.lineWidth = act ? 1.8 : 1.1; c.stroke();
    c.beginPath(); c.arc(pt[0], pt[1], Math.max(2, 7 * FOC / B[2]), 0, 7); c.fillStyle = act ? '#ffd9a0' : '#fff'; c.fill();
    c.beginPath(); c.arc(pb[0], pb[1], Math.max(2.5, 11 * FOC / B[2]), 0, 7); c.fillStyle = '#ff7a1a'; c.shadowColor = '#ff7a1a'; c.shadowBlur = 12; c.fill(); c.shadowBlur = 0;
    const px = Math.min(72, 64 * FOC / T[2]);
    if (px > 9) { c.font = `700 ${px}px "Cormorant Garamond", "Noto Serif Gujarati", Georgia, serif`; c.textBaseline = 'alphabetic'; c.fillStyle = act ? '#ffd9a0' : 'rgba(235,235,245,.85)';
      c.fillText(cl(i, 0), pt[0] + 12, pt[1] + px * .35);
      if (px > 24 && !act && i - tc < 3.5) { c.font = `500 ${px * .3}px Inter, "Noto Sans Gujarati", sans-serif`; c.fillStyle = 'rgba(200,205,225,.8)'; c.fillText(cl(i, 2), pt[0] + 12, pt[1] + px * .35 + px * .4); } }
    if (act) { const k = (now / 1500) % 1;
      [0, .5].forEach(o => { const kk = (k + o) % 1, rr = (16 + kk * 46) * FOC / B[2]; c.beginPath(); c.ellipse(pb[0], pb[1], rr, rr * .38, 0, 0, 7); c.strokeStyle = `rgba(255,140,50,${((1 - kk) * .8).toFixed(2)})`; c.lineWidth = 2; c.stroke(); }); }
    c.globalAlpha = 1;
  }
}
// ----- navigation state: travel, arrive, show the card -----
const cineDots = [];
$('cScrub').innerHTML = CM.map((m, i) => `<button class="sd" data-i="${i}" aria-label="${m[2]}" title="${m[0]} · ${m[2]}"></button>`).join('');
$('cScrub').querySelectorAll('.sd').forEach(b => cineDots.push(b));
function syncCine() {
  cineDots.forEach((d, j) => { d.classList.toggle('on', j === target); d.classList.toggle('done', j < target); });
  $('cEra').textContent = `${eraT(CM[target][3])} · ${String(target + 1).padStart(2, '0')}/${CM.length}`;
  $('cPlay').textContent = playing ? '❚❚' : '▶'; $('cPlay').setAttribute('aria-label', playing ? 'Pause tour' : 'Play tour');
}
function showCineCard(i) {
  const m = CM[i], h = EHUE[m[3]];
  $('cFrame').innerHTML = `<div class="art" style="--h:${h}"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[m[4]]}</svg></div><img class="ph" data-wiki="${m[5]}" alt="${cl(i, 2)}" referrerpolicy="no-referrer">`;
  loadPhotos($('cFrame'));
  $('cBody').innerHTML = `<span class="tag">${eraT(m[3])}</span><div class="c-year">${cl(i, 1)}</div><h3>${cl(i, 2)}</h3><p>${m[8]}</p>` +
    (m[6] !== null ? `<div class="c-place">${tx("Shown on today's map")} · ${fmt(m[6], m[7])}</div>` : '');
  [...$('cBody').children].forEach((el, k) => el.style.setProperty('--i', k));
  cCard.classList.add('show');
}
function goCine(i) {
  i = Math.max(0, Math.min(CM.length - 1, i)); if (i === target && !moving && ci === i) return;
  from = tc; to = i; target = i; moving = true; t0 = performance.now(); dur = Math.max(1700, Math.min(4300, Math.abs(to - from) * 900 + 1200));
  cCard.classList.remove('show'); syncCine();
}
function cineFrame(now) {
  craf = requestAnimationFrame(cineFrame);
  const dt = Math.min((now - last) / 1000, .1); last = now;
  if (moving) {
    const k = Math.min((now - t0) / dur, 1), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    tc = from + (to - from) * e;
    if (k >= 1) { moving = false; tc = to; ci = to; dwell = now; showCineCard(ci); }
  } else if (playing && ci >= 0 && now - dwell > 8500) {
    if (ci < CM.length - 1) goCine(ci + 1); else { playing = false; syncCine(); }
  }
  drawCine(now, dt);
}
$('cNext').onclick = () => goCine(target + 1);
$('cPrev').onclick = () => goCine(target - 1);
$('cPlay').onclick = () => { if (!playing && ci === CM.length - 1 && !moving) goCine(0); playing = !playing; dwell = performance.now(); syncCine(); };
$('cScrub').addEventListener('click', e => { const b = e.target.closest('.sd'); if (b) goCine(+b.dataset.i); });
document.addEventListener('keydown', e => {
  if (!cvis || modal.classList.contains('open') || e.target.closest && e.target.closest('#tlScene')) return;
  if (e.key === 'ArrowRight') goCine(target + 1); if (e.key === 'ArrowLeft') goCine(target - 1);
});
let swx = null;
cineSec.addEventListener('pointerdown', e => { swx = e.clientX; });
cineSec.addEventListener('pointerup', e => { if (swx !== null && Math.abs(e.clientX - swx) > 80 && !e.target.closest('button, .cine-card')) goCine(target + (e.clientX < swx ? 1 : -1)); swx = null; });
window.addEventListener('resize', () => { if (cvis) sizeCine(); });
// run only while the section is on screen
new IntersectionObserver(es => es.forEach(en => {
  cvis = en.isIntersecting;
  if (cvis) {
    sizeCine();
    if (pausedAt) { const d = performance.now() - pausedAt; t0 += d; dwell += d; pausedAt = 0; }
    if (!craf) { last = performance.now(); craf = requestAnimationFrame(cineFrame); }
    if (!started) { started = true; goCine(0); }
  } else { cancelAnimationFrame(craf); craf = 0; pausedAt = performance.now(); }
}), { threshold: .2 }).observe(cineSec);
syncCine();

/* ============ UPDATE 3 ============ */

/* ---------- Cinematic timeline: drag along the scrub bar (works with a finger) ---------- */
const scrubEl = $('cScrub');
let sdrag = false;
const scrubTo = e => {
  const r = scrubEl.getBoundingClientRect(), k = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
  goCine(Math.round(k * (CM.length - 1)));
};
scrubEl.addEventListener('pointerdown', e => { sdrag = true; try { scrubEl.setPointerCapture(e.pointerId); } catch (x) {} scrubTo(e); e.stopPropagation(); });
scrubEl.addEventListener('pointermove', e => { if (sdrag) scrubTo(e); });
['pointerup', 'pointercancel'].forEach(n => scrubEl.addEventListener(n, e => { sdrag = false; e.stopPropagation(); }));

/* ---------- Cinematic timeline: full screen ---------- */
const fsBtn = $('cFs'), fsHint = $('fsHint');
const ICO = d => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const FS_IN = ICO('<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>'), FS_OUT = ICO('<path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/>');
fsBtn.innerHTML = FS_IN;
let fakeFs = false, hintTimer = 0;
const fsNow = () => document.fullscreenElement || document.webkitFullscreenElement;
function paintFs(on) {
  cineSec.classList.toggle('is-fs', on);
  cineSec.classList.toggle('fake-fs', on && fakeFs);
  document.body.classList.toggle('fs-lock', on);
  fsBtn.innerHTML = on ? FS_OUT : FS_IN;
  fsBtn.setAttribute('aria-pressed', on);
  fsBtn.setAttribute('aria-label', on ? 'Exit full screen' : 'Enter full screen');
  [60, 400].forEach(ms => setTimeout(() => { if (cvis) sizeCine(); }, ms));
  clearTimeout(hintTimer); fsHint.classList.remove('show');
  if (on && window.innerHeight > window.innerWidth && window.matchMedia('(pointer:coarse)').matches) {
    fsHint.classList.add('show'); hintTimer = setTimeout(() => fsHint.classList.remove('show'), 3800);
  }
}
async function toggleFs() {
  if (fsNow() || fakeFs) {
    if (fsNow()) { try { await (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (e) {} }
    fakeFs = false; paintFs(false); return;
  }
  const req = cineSec.requestFullscreen || cineSec.webkitRequestFullscreen;
  if (req) { try { await req.call(cineSec); fakeFs = false; paintFs(true); return; } catch (e) {} }
  fakeFs = true; paintFs(true); // iPhone Safari has no element full screen: fill the whole viewport instead
}
fsBtn.onclick = toggleFs;
['fullscreenchange', 'webkitfullscreenchange'].forEach(n => document.addEventListener(n, () => {
  if (fsNow() === cineSec) paintFs(true); else if (!fakeFs) paintFs(false);
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && fakeFs) toggleFs(); });

