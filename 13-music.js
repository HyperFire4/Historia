/* ---------- Soundtrack: original orchestral pieces, synthesised live with the Web Audio API ---------- */
const Music = (() => {
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const CH = {maj: [0, 4, 7], min: [0, 3, 7]};
  // Optional: add your own audio files here, e.g. {name:'My Theme', mood:'Short description', src:'assets/music/my-theme.mp3'}
  const FILES = [];
  // prog = [bass note (MIDI), chord] for 4 bars that loop; mel = melody per bar as [beat, MIDI note, length in beats]
  const TRACKS = [
    {name: 'Ancient Dawn', mood: 'Slow sunrise over the Nile', bpm: 66, dp: 62, style: 'none', choir: true,
      prog: [[38, 'min'], [34, 'maj'], [41, 'maj'], [36, 'maj']], drums: [[0, .8], [2, .5]],
      mel: [[[0, 69, 3], [3, 74, 1]], [[0, 72, 2], [2, 70, 2]], [[0, 72, 3], [3, 77, 1]], [[0, 76, 2], [2, 74, 1], [3, 72, 1]]]},
    {name: 'March of Empires', mood: 'Driving war drums and brass', bpm: 104, dp: 66, style: 'march', choir: false,
      prog: [[36, 'min'], [32, 'maj'], [39, 'maj'], [34, 'maj']], drums: [[0, 1], [1, .5], [1.5, .6], [2, .85], [3, .5], [3.5, .7]],
      mel: [[[0, 67, 1], [1, 72, 1], [2, 75, 2]], [[0, 75, 1], [1, 72, 1], [2, 80, 2]], [[0, 79, 1.5], [1.5, 75, .5], [2, 77, 1], [3, 79, 1]], [[0, 74, 1], [1, 77, 1], [2, 77, 2]]]},
    {name: 'Eternal Horizon', mood: 'Hopeful strings, harp and choir', bpm: 84, dp: 60, style: 'arp', choir: true,
      prog: [[38, 'maj'], [33, 'maj'], [35, 'min'], [31, 'maj']], drums: [[0, .7], [2, .5]],
      mel: [[[0, 78, 2], [2, 81, 2]], [[0, 81, 2], [2, 76, 2]], [[0, 78, 2], [2, 83, 2]], [[0, 79, 2], [2, 78, 1], [3, 74, 1]]]},
    {name: 'Fall of Giants', mood: 'Dark, heavy and cinematic', bpm: 62, dp: 48, style: 'none', choir: true,
      prog: [[33, 'min'], [29, 'maj'], [38, 'min'], [40, 'maj']], drums: [[0, 1], [2, .45], [3.5, .35]],
      mel: [[[0, 76, 3], [3, 72, 1]], [[0, 77, 3], [3, 76, 1]], [[0, 74, 2], [2, 77, 2]], [[0, 76, 2], [2, 80, 2]]]}
  ];
  const all = () => TRACKS.concat(FILES.map(f => Object.assign({file: true}, f)));
  let ctx, master, conv, noiseBuf, sessD = null, sessW = null, timer = 0, playing = false, cur = 0, barN = 0, nextT = 0, vol = .6, aud = null;
  const listeners = [], changed = () => listeners.forEach(f => f());
  const level = () => Math.pow(vol, 1.6) * .9;

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 5; comp.attack.value = .01; comp.release.value = .3;
    master = ctx.createGain(); master.gain.value = level(); master.connect(comp); comp.connect(ctx.destination);
    const len = ctx.sampleRate * 3, ir = ctx.createBuffer(2, len, ctx.sampleRate);   // hall reverb from decaying noise
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    conv = ctx.createConvolver(); conv.buffer = ir;
    const wet = ctx.createGain(); wet.gain.value = .9; conv.connect(wet); wet.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }
  function newSession() {
    sessD = ctx.createGain(); sessW = ctx.createGain(); sessD.connect(master); sessW.connect(conv);
    [sessD, sessW].forEach(g => { g.gain.setValueAtTime(0, ctx.currentTime); g.gain.linearRampToValueAtTime(1, ctx.currentTime + .8); });
  }
  function killSession() {
    if (!sessD) return; const d = sessD, w = sessW; sessD = sessW = null;
    [d, w].forEach(g => g.gain.setTargetAtTime(0, ctx.currentTime, .12));
    setTimeout(() => { try { d.disconnect(); w.disconnect(); } catch (e) {} }, 1500);
  }
  function send(node, w) {
    node.connect(sessD);
    if (w) { const s = ctx.createGain(); s.gain.value = w; node.connect(s); s.connect(sessW); }
  }

  // ----- instruments -----
  function tone(type, f, t, dur, o = {}) {
    const {a = .05, r = .4, peak = .05, det = 0, lp = 2000, wet: wt = .3, vib = 0} = o;
    const g = ctx.createGain(), fl = ctx.createBiquadFilter(), end = t + dur + r + .05;
    fl.type = 'lowpass'; fl.Q.value = .6; fl.frequency.setValueAtTime(lp * .45, t); fl.frequency.linearRampToValueAtTime(lp, t + Math.min(dur, a + .25));
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.setValueAtTime(peak, t + Math.max(a, dur)); g.gain.linearRampToValueAtTime(0, t + dur + r);
    fl.connect(g); send(g, wt);
    (det ? [-det, det] : [0]).forEach(c => {
      const os = ctx.createOscillator(); os.type = type; os.frequency.value = f; os.detune.value = c;
      if (vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5.2; lg.gain.value = f * .006; l.connect(lg); lg.connect(os.frequency); l.start(t); l.stop(end); }
      os.connect(fl); os.start(t); os.stop(end);
    });
  }
  function choir(f, t, d) {   // two vowel-like formant filters on detuned, vibrato saws
    const g = ctx.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.11, t + d * .3); g.gain.setValueAtTime(.11, t + d); g.gain.linearRampToValueAtTime(0, t + d + 1.2);
    send(g, .75);
    [[800, 3], [1250, 5]].forEach(([fr, Q]) => {
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = fr; bp.Q.value = Q; bp.connect(g);
      [-9, 9].forEach(c => {
        const os = ctx.createOscillator(), l = ctx.createOscillator(), lg = ctx.createGain();
        os.type = 'sawtooth'; os.frequency.value = f; os.detune.value = c; l.frequency.value = 5; lg.gain.value = f * .008;
        l.connect(lg); lg.connect(os.frequency); os.connect(bp); os.start(t); os.stop(t + d + 1.3); l.start(t); l.stop(t + d + 1.3);
      });
    });
  }
  function pluck(f, t, v) {
    const g = ctx.createGain(); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0005, t + 1.2); send(g, .55);
    [['triangle', 1], ['sine', 2]].forEach(([ty, m]) => { const os = ctx.createOscillator(); os.type = ty; os.frequency.value = f * m; os.connect(g); os.start(t); os.stop(t + 1.3); });
  }
  function hit(t, d, fr, pk, type) {
    const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; fl.type = type; fl.frequency.value = fr;
    g.gain.setValueAtTime(pk, t); g.gain.exponentialRampToValueAtTime(.001, t + d);
    s.connect(fl); fl.connect(g); send(g, .4); s.start(t); s.stop(t + d + .05);
  }
  function taiko(t, v, p) {
    const os = ctx.createOscillator(), g = ctx.createGain();
    os.frequency.setValueAtTime(p * 2.4, t); os.frequency.exponentialRampToValueAtTime(p, t + .14);
    g.gain.setValueAtTime(.001, t); g.gain.linearRampToValueAtTime(.5 * v, t + .006); g.gain.exponentialRampToValueAtTime(.001, t + 1.1);
    os.connect(g); send(g, .45); os.start(t); os.stop(t + 1.2);
    hit(t, .09, 1400, .16 * v, 'bandpass');
  }
  function riser(t, d) {
    const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; s.loop = true; fl.type = 'bandpass'; fl.Q.value = .8;
    fl.frequency.setValueAtTime(400, t); fl.frequency.exponentialRampToValueAtTime(5000, t + d);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12, t + d); g.gain.linearRampToValueAtTime(0, t + d + .15);
    s.connect(fl); fl.connect(g); send(g, .4); s.start(t); s.stop(t + d + .2);
  }

  // ----- one bar of music. 16-bar cycle: 4 bars strings only, 4 bars building, 8 bars full -----
  function bar(T, b, t) {
    const bt = 60 / T.bpm, [bass, kind] = T.prog[b % 4], q = CH[kind], pos = b % 16, lvl = pos < 4 ? 0 : pos < 8 ? 1 : 2, len = 4 * bt;
    tone('triangle', mtof(bass), t, len, {a: .3, r: 1.2, peak: .15, lp: 450, wet: .15});
    tone('triangle', mtof(bass + 12), t, len, {a: .5, r: 1.2, peak: .05, lp: 700, wet: .2});
    const pad = q.map(i => bass + 12 + i); if (lvl) pad.push(bass + 24 + q[0], bass + 24 + q[1]);
    pad.forEach(n => tone('sawtooth', mtof(n), t, len, {a: bt * 1.6, r: bt * 2, peak: .028, det: 8, lp: 700 + lvl * 650, wet: .7}));
    if (T.choir && lvl) [bass + 24 + q[1], bass + 24 + q[2], bass + 36 + q[0]].forEach(n => choir(mtof(n), t, len));
    if (T.style === 'arp') {
      const N = [q[0], q[1], q[2], 12 + q[0]], P = [0, 1, 2, 3, 2, 1, 2, 1];
      for (let k = 0; k < 8; k++) pluck(mtof(bass + 24 + N[P[k]]), t + k * bt / 2, .045 + lvl * .012);
    }
    if (T.style === 'march' && lvl) {
      const O = [0, 0, 7, 0, 0, 7, 12, 7];
      for (let k = 0; k < 8; k++) tone('sawtooth', mtof(bass + 24 + O[k]), t + k * bt / 2, bt * .42, {a: .012, r: .12, peak: .028 + lvl * .012, lp: 1400, wet: .25});
    }
    if (lvl) T.drums.slice(0, lvl > 1 ? 99 : 2).forEach(([d, v]) => taiko(t + d * bt, v * (lvl > 1 ? 1 : .65), T.dp));
    if (lvl && T.mel) T.mel[b % 4].forEach(([d, m, l]) => {
      const s = t + d * bt;
      tone('sawtooth', mtof(m), s, l * bt * .96, {a: .14, r: .6, peak: .06, det: 5, lp: 1500 + lvl * 900, wet: .55, vib: 1});
      if (lvl > 1) tone('sawtooth', mtof(m - 12), s, l * bt * .96, {a: .18, r: .6, peak: .035, lp: 1100, wet: .4});
    });
    if (pos === 8) hit(t, 2.2, 5500, .09, 'highpass');
    if (pos === 3 || pos === 7 || pos === 15) riser(t + 2 * bt, 2 * bt);
  }
  function tick() {
    if (!playing || !sessD) return;
    const T = TRACKS[cur];
    while (nextT < ctx.currentTime + 1.5) { bar(T, barN, nextT); nextT += 240 / T.bpm; barN++; }
  }

  // ----- transport -----
  async function play(i) {
    if (typeof i === 'number') cur = i;
    const T = all()[cur];
    clearInterval(timer); timer = 0; if (aud) aud.pause();
    if (!ctx) init();
    if (T.file) {
      killSession(); aud = aud || new Audio(); aud.src = T.src; aud.loop = true; aud.volume = Math.min(1, level());
      aud.play().catch(() => {}); playing = true; changed(); return;
    }
    await ctx.resume();
    killSession(); newSession();
    master.gain.setTargetAtTime(level(), ctx.currentTime, .1);
    barN = 0; nextT = ctx.currentTime + .15; playing = true;
    tick(); timer = setInterval(tick, 300); changed();
  }
  function stop() {
    if (!playing) return;
    playing = false; clearInterval(timer); timer = 0; if (aud) aud.pause();
    if (ctx) { killSession(); setTimeout(() => { if (!playing && ctx.state === 'running') ctx.suspend(); }, 900); }
    changed();
  }
  function setVolume(v) {
    vol = v; if (ctx) master.gain.setTargetAtTime(level(), ctx.currentTime, .05); if (aud) aud.volume = Math.min(1, level());
  }
  document.addEventListener('visibilitychange', () => {   // pause when the tab is hidden
    if (!ctx || !playing) return;
    if (document.hidden) { ctx.suspend(); if (aud) aud.pause(); }
    else { ctx.resume(); if (aud && all()[cur].file) aud.play().catch(() => {}); }
  });
  return {tracks: all, play, stop, setVolume, toggle: () => playing ? stop() : play(),
    get running() { return !!ctx && ctx.state === 'running'; },
    get playing() { return playing; }, get cur() { return cur; }, onChange: f => listeners.push(f)};
})();

/* ---------- Soundtrack UI ---------- */
const musicBtn = $('musicBtn'), mPanel = $('mPanel'), mpList = $('mpList'), mpPlay = $('mpPlay'), cMusic = $('cMusic');
cMusic.innerHTML = ICO('<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>');
const buildTracks = () => { mpList.innerHTML = Music.tracks().map((tk, i) => `<button class="mp-t" data-i="${i}"><span class="mp-n">${i + 1}</span><span><b>${tx(tk.name)}</b><small>${tx(tk.mood)}</small></span></button>`).join(''); paintMusic(); };
function paintMusic() {
  const on = Music.playing;
  musicBtn.classList.toggle('on', on); if (on) musicBtn.classList.remove('nudge'); cMusic.setAttribute('aria-pressed', on);
  cMusic.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
  mpPlay.textContent = on ? '❚❚' : '▶'; mpPlay.setAttribute('aria-label', on ? 'Pause music' : 'Play music');
  [...mpList.children].forEach((b, i) => b.classList.toggle('on', i === Music.cur));
}
Music.onChange(paintMusic); buildTracks();
const setPanel = open => {
  mPanel.classList.toggle('open', open); mPanel.setAttribute('aria-hidden', !open); musicBtn.setAttribute('aria-expanded', open);
  if (open) { musicBtn.classList.remove('nudge'); closeMenu(); setLPanel(false); }
};
function closeMenu() { links.classList.remove('open'); burger.textContent = '☰'; burger.setAttribute('aria-expanded', 'false'); }
musicBtn.onclick = () => setPanel(!mPanel.classList.contains('open'));
$('mpClose').onclick = () => setPanel(false);
mpList.addEventListener('click', e => { const b = e.target.closest('.mp-t'); if (b) userPlay(+b.dataset.i); });
mpPlay.onclick = () => userToggle();
cMusic.onclick = () => userToggle();
$('mpVol').addEventListener('input', e => Music.setVolume(e.target.value / 100));
burger.addEventListener('click', () => { if (links.classList.contains('open')) setPanel(false); });
document.addEventListener('pointerdown', e => {   // tap outside closes the menu / music panel
  if (links.classList.contains('open') && !e.target.closest('#nav')) closeMenu();
  if (mPanel.classList.contains('open') && !e.target.closest('#mPanel, #musicBtn')) setPanel(false);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { setPanel(false); closeMenu(); } });

