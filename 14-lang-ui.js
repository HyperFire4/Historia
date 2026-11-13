/* ============ UPDATE 4: language switcher + soundtrack autoplay ============ */

/* ---------- Language ---------- */
// To add a language: add its entry here and a translation block in TR (same shape as TR.gu). [code, name shown in the list, short code on the button]
const LANGS = [['en', 'English', 'EN'], ['gu', 'ગુજરાતી', 'ગુ']];
const lBtn = $('langBtn'), lPanel = $('lPanel'), lList = $('lList');
const ST = ['#links a', '.foot nav a', '.hero h1', '.hero p', '.btns a', '.stat span', '.cine-head h2', '.cine-head p', '#eras h2', '#eras .lead', '#eraBackT', '#eraCivT', '#eraFigT',
  '#timeline h2', '#timeline .lead', '.tl-ctl span', '#discover h2', '#factBtn', '.foot > div > p', '.copy', '.mp-head b', '.mp-vol span', '.mp-note', '#fsHint'];
const AL = [['burger', 'Open menu'], ['top', 'Back to top'], ['musicBtn', 'Soundtrack'], ['langBtn', 'Language'], ['close', 'Close'], ['mpClose', 'Close soundtrack panel'],
  ['lClose', 'Close language panel'], ['tlPrev', 'Previous milestone'], ['tlNext', 'Next milestone'], ['cPrev', 'Previous milestone'], ['cNext', 'Next milestone']];
function buildLangUI() {
  lList.innerHTML = LANGS.map(([c, n]) => `<button class="mp-t${c === LANG ? ' on' : ''}" data-l="${c}"><span class="mp-n">${c.toUpperCase()}</span><span><b>${n}</b></span></button>`).join('');
  $('langCode').textContent = (LANGS.find(l => l[0] === LANG) || LANGS[0])[2];
}
function applyLang() {
  document.documentElement.lang = LANG;
  ST.forEach(sel => document.querySelectorAll(sel).forEach(el => { if (!el.dataset.en) el.dataset.en = el.textContent.trim(); el.textContent = tx(el.dataset.en); }));
  const h = document.querySelector('.hero h1');
  h.innerHTML = h.textContent.split(' ').map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ');
  document.querySelectorAll('.stat b').forEach(b => {
    if (b.dataset.div) b.dataset.s = ' ' + tx('bn');
    if (b.textContent !== '0') { const n = +b.dataset.n, dv = +b.dataset.div || 1; b.textContent = (dv > 1 ? (n / dv).toFixed(2) : n.toLocaleString()) + (b.dataset.s || ''); }
  });
  AL.forEach(([id, k]) => $(id).setAttribute('aria-label', tx(k)));
  renderEras(); if (eraOpen !== null) renderEraPage(eraOpen);
  buildTl(); layout();
  $('tlPlay').textContent = tx(tour ? '❚❚ Pause' : '▶ Auto tour');
  if (lastFact >= 0) $('factText').textContent = factT(lastFact);
  $('heroCap').textContent = tx(SL[shownSlide][1]);
  CM.forEach((m, i) => { cineDots[i].title = cl(i, 0) + ' · ' + cl(i, 2); cineDots[i].setAttribute('aria-label', cl(i, 2)); });
  syncCine(); if (cCard.classList.contains('show') && ci >= 0) showCineCard(ci);
  buildTracks();
  if (modal.classList.contains('open')) closeModal();
  buildLangUI();
}
function setLang(c) {
  if (c !== 'en' && !TR[c]) return;
  LANG = c; try { localStorage.setItem('historia-lang', c); } catch (e) {}
  applyLang(); setLPanel(false);
}
function setLPanel(open) {
  lPanel.classList.toggle('open', open); lPanel.setAttribute('aria-hidden', !open); lBtn.setAttribute('aria-expanded', open);
  if (open) { closeMenu(); setPanel(false); }
}
lBtn.onclick = () => setLPanel(!lPanel.classList.contains('open'));
$('lClose').onclick = () => setLPanel(false);
lList.addEventListener('click', e => { const b = e.target.closest('[data-l]'); if (b) setLang(b.dataset.l); });
burger.addEventListener('click', () => { if (links.classList.contains('open')) setLPanel(false); });
document.addEventListener('pointerdown', e => { if (lPanel.classList.contains('open') && !e.target.closest('#lPanel, #langBtn')) setLPanel(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setLPanel(false); });
buildLangUI();

