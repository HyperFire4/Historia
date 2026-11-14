const EXTRA = {
 'Ancient Egypt':{lat:26.8,lon:30.8,at:'Nile Valley, North-East Africa',tiles:[['Major centres','Memphis, Thebes, Alexandria'],['Known for','Pyramids, hieroglyphs, mummification'],['Legacy','A 365-day calendar, early medicine and monumental architecture']]},
 'Ancient Greece':{lat:38.0,lon:23.7,at:'Aegean region, Greece',tiles:[['Major centres','Athens, Sparta, Corinth, Thebes'],['Known for','Democracy, philosophy, theatre, the Olympic Games'],['Legacy','Foundations of Western science, politics and art']]},
 'Roman Empire':{lat:41.9,lon:12.5,at:'Italian Peninsula, centred on Rome',tiles:[['Major centres','Rome, Ravenna, Carthage, Antioch'],['Known for','Law, roads, aqueducts, concrete'],['Legacy','Latin evolved into the Romance languages; Roman law shaped later legal systems']]},
 'Indus Valley Civilization':{lat:27.3,lon:68.1,at:'Indus River basin, South Asia',tiles:[['Major centres','Mohenjo-daro, Harappa, Dholavira, Lothal'],['Known for','Planned cities, covered drains, standard weights'],['Legacy','Its undeciphered script is still one of history\'s open puzzles']]},
 'Ancient China':{lat:34.3,lon:108.9,at:'Yellow River valley, East Asia',tiles:[['Major centres','Anyang, Luoyang, Chang\'an (Xi\'an)'],['Known for','Bronze casting, silk, paper, imperial bureaucracy'],['Legacy','Han-era Silk Road trade linked East Asia with Central Asia and the Mediterranean world']]},
 'Mesopotamia':{lat:32.5,lon:44.4,at:'Between the Tigris and Euphrates, Iraq',tiles:[['Major centres','Uruk, Ur, Babylon, Nineveh'],['Known for','Cuneiform, early law codes, a base-60 number system'],['Legacy','Our 60-minute hour and 360-degree circle trace back to Mesopotamian mathematics']]},
 'Mayan Civilization':{lat:17.2,lon:-89.6,at:'Southern Mexico and Central America',tiles:[['Major centres','Tikal, Palenque, Copán, Chichén Itzá'],['Known for','Hieroglyphic writing, astronomy, the concept of zero'],['Legacy','Millions of Maya people and their languages continue today']]},
 'Ottoman Empire':{lat:41.0,lon:29.0,at:'Anatolia and South-East Europe, Istanbul',tiles:[['Major centres','Bursa, Edirne, Istanbul'],['Known for','Mimar Sinan\'s architecture, military power, diverse administration'],['Legacy','Shaped the modern Balkans, Middle East and Turkey']]},
 'Alexander the Great':{lat:40.76,lon:22.52,at:'Pella, Macedonia (Greece)',tiles:[['Born','Pella, 356 BCE'],['Known for','Defeating the Persian Empire; never losing a major battle'],['Legacy','Hellenistic culture spread from Egypt to Central Asia']]},
 'Julius Caesar':{lat:41.9,lon:12.5,at:'Rome, Italy',tiles:[['Born','Rome, 100 BCE'],['Known for','Conquest of Gaul; crossing the Rubicon in 49 BCE'],['Legacy','The Julian calendar; "Caesar" later became a title for emperors']]},
 'Cleopatra VII':{lat:31.2,lon:29.9,at:'Alexandria, Egypt',tiles:[['Born','Probably Alexandria, 69 BCE'],['Known for','Alliances with Julius Caesar and Mark Antony'],['Legacy','Her death in 30 BCE ended the Ptolemaic dynasty']]},
 'Ashoka the Great':{lat:25.6,lon:85.1,at:'Pataliputra (modern Patna), India',tiles:[['Capital','Pataliputra'],['Known for','The Edicts of Ashoka, carved on pillars and rocks'],['Legacy','Helped spread Buddhism across Asia']]},
 'Genghis Khan':{lat:48.6,lon:109.0,at:'Khentii region, Mongolia',tiles:[['Born','Near the Onon River, c. 1162 CE'],['Known for','Uniting the Mongol tribes in 1206'],['Legacy','His empire connected East Asia, Central Asia and Europe']]},
 'Leonardo da Vinci':{lat:43.78,lon:10.93,at:'Vinci, Tuscany, Italy',tiles:[['Born','Vinci, 1452 CE'],['Known for','Mona Lisa, The Last Supper, his notebooks'],['Legacy','A lasting symbol of Renaissance curiosity']]}
};
Object.assign(EXTRA, {
 'Persian Empire':{lat:29.93,lon:52.89,at:'Persepolis, Iran',tiles:[['Major centres','Pasargadae, Susa, Persepolis, Babylon'],['Known for','The Royal Road, satrapies, the Cyrus Cylinder'],['Legacy','Its large-scale administration influenced later empires']]},
 'Aztec Empire':{lat:19.43,lon:-99.13,at:'Tenochtitlan, now Mexico City',tiles:[['Major centres','Tenochtitlan, Texcoco, Tlacopan'],['Known for','Chinampa farming, the Templo Mayor, a tribute system'],['Legacy','Mexico City stands on the site, and Nahuatl is still spoken']]},
 'Inca Empire':{lat:-13.53,lon:-71.97,at:'Cusco, Peru',tiles:[['Major centres','Cusco, Machu Picchu, Quito'],['Known for','The Qhapaq Ñan roads, terraced farming, quipu'],['Legacy','Quechua is still spoken by millions of people']]},
 'Byzantine Empire':{lat:41.01,lon:28.98,at:'Constantinople (Istanbul)',tiles:[['Major centres','Constantinople, Thessalonica, Ravenna (for a time)'],['Known for','Hagia Sophia, Justinian\'s law code, Orthodox Christianity'],['Legacy','Preserved Greek and Roman texts and shaped Eastern Europe']]},
 'Mongol Empire':{lat:47.2,lon:102.84,at:'Karakorum, Mongolia',tiles:[['Major centres','Karakorum, Khanbaliq (Beijing), Sarai'],['Known for','Cavalry warfare, the yam relay system'],['Legacy','Connected East and West, spreading goods, ideas and technologies']]},
 'Mali Empire':{lat:16.77,lon:-3.0,at:'Timbuktu, Mali',tiles:[['Major centres','Niani, Timbuktu, Djenné, Gao'],['Known for','Gold and salt trade, Islamic scholarship'],['Legacy','Timbuktu\'s manuscripts preserve centuries of African learning']]},
 'Khmer Empire':{lat:13.41,lon:103.87,at:'Angkor, Cambodia',tiles:[['Major centres','Angkor, Hariharalaya, Koh Ker'],['Known for','Angkor Wat, the Bayon, huge reservoirs (barays)'],['Legacy','Angkor Wat appears on Cambodia\'s national flag']]},
 'Mughal Empire':{lat:27.17,lon:78.04,at:'Agra, India',tiles:[['Major centres','Agra, Delhi, Fatehpur Sikri, Lahore'],['Known for','The Taj Mahal, miniature painting, Persianate court culture'],['Legacy','Shaped architecture, cuisine and language across South Asia']]},
 'Hatshepsut':{lat:25.74,lon:32.61,at:'Deir el-Bahari, near Thebes, Egypt',tiles:[['Seat of power','Thebes (modern Luxor)'],['Known for','The expedition to Punt; her temple at Deir el-Bahari'],['Legacy','A prosperous reign that left some of Egypt\'s finest architecture']]},
 'Cyrus the Great':{lat:30.19,lon:53.17,at:'Pasargadae, Iran',tiles:[['Capital','Pasargadae'],['Known for','Conquering Media, Lydia and Babylon'],['Legacy','A model of tolerant imperial rule, though the Cylinder\'s meaning is debated']]},
 'Confucius':{lat:35.6,lon:117.0,at:'Qufu, State of Lu (Shandong, China)',tiles:[['Born','State of Lu, 551 BCE'],['Known for','The Analects; ethics and education'],['Legacy','Influenced government, schooling and family life across East Asia']]},
 'Qin Shi Huang':{lat:34.33,lon:108.7,at:'Xianyang, Shaanxi, China',tiles:[['Capital','Xianyang'],['Known for','Unifying China in 221 BCE; the Terracotta Army'],['Legacy','The imperial system he began lasted until 1912']]},
 'Mansa Musa':{lat:16.77,lon:-3.0,at:'Timbuktu, Mali',tiles:[['Seat of power','Niani, with Timbuktu as a learning centre'],['Known for','The 1324 pilgrimage to Mecca'],['Legacy','Helped make Timbuktu a centre of learning']]},
 'Suleiman the Magnificent':{lat:41.01,lon:28.98,at:'Istanbul, Türkiye',tiles:[['Seat of power','Istanbul (Topkapı Palace)'],['Known for','Military victories and the Kanun legal codes'],['Legacy','A golden age of Ottoman art, architecture and law']]},
 'Akbar':{lat:27.09,lon:77.66,at:'Fatehpur Sikri, India',tiles:[['Born','Umarkot (Sindh), 1542'],['Known for','Administrative reforms and religious tolerance'],['Legacy','Strengthened the empire and encouraged cultural blending']]},
 'Joan of Arc':{lat:48.44,lon:5.67,at:'Domrémy, France',tiles:[['Born','Domrémy, c. 1412'],['Known for','Lifting the siege of Orléans in 1429'],['Legacy','Canonised in 1920; a national symbol of France']]}
});
const gc = $('globe'), gx = gc.getContext('2d'), D2R = Math.PI / 180;
let landPts = null, rot = {lon: 0, lat: 10}, tgt = null, raf = 0, gw = 0, gh = 0, gdpr = 1;

function decodeTopo(t) { // tiny TopoJSON decoder -> list of polygons (each = list of [lon,lat] rings)
  const [sx, sy] = t.transform.scale, [tx, ty] = t.transform.translate;
  const arcs = t.arcs.map(a => { let x = 0, y = 0; return a.map(q => { x += q[0]; y += q[1]; return [x * sx + tx, y * sy + ty]; }); });
  const ring = ix => { let pts = []; ix.forEach(i => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; pts = pts.concat(pts.length ? a.slice(1) : a); }); return pts; };
  const o = t.objects.land, gs = o.type === 'GeometryCollection' ? o.geometries : [o], out = [];
  gs.forEach(g => (g.type === 'MultiPolygon' ? g.arcs : [g.arcs]).forEach(p => out.push(p.map(ring))));
  return out;
}
function inside(p, x, y) { // is the point inside this polygon? (ray casting)
  const bb = p.bb; if (x < bb[0] || x > bb[2] || y < bb[1] || y > bb[3]) return false;
  let c = false;
  p.forEach(r => { for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const a = r[i], b = r[j];
    if ((a[1] > y) !== (b[1] > y) && x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]) c = !c; } });
  return c;
}
function buildDots() { // sample the map on an even grid: one dot per land cell
  const polys = decodeTopo(LAND_TOPO); landPts = [];
  polys.forEach(p => { let a = 1e9, b = 1e9, c = -1e9, d = -1e9;
    p.forEach(r => r.forEach(([x, y]) => { a = Math.min(a, x); c = Math.max(c, x); b = Math.min(b, y); d = Math.max(d, y); })); p.bb = [a, b, c, d]; });
  for (let lat = -84; lat <= 84; lat += 2) {
    const st = 2 / Math.max(Math.cos(lat * D2R), .2);
    for (let lon = -180; lon < 180; lon += st) if (polys.some(p => inside(p, lon, lat))) landPts.push(lat * D2R, lon * D2R);
  }
}
function sizeGlobe() {
  const m = $('modal'); gdpr = Math.min(window.devicePixelRatio || 1, 2);
  gw = m.clientWidth; gh = m.clientHeight; gc.width = gw * gdpr; gc.height = gh * gdpr;
}
function drawGlobe(ts) {
  const w = gw, h = gh, mob = w < 860;
  const cx = mob ? w / 2 : w * .68, cy = mob ? h * .27 : h * .5, r = mob ? Math.min(w * .4, h * .19) : Math.min(w * .28, h * .38);
  gx.setTransform(gdpr, 0, 0, gdpr, 0, 0); gx.clearRect(0, 0, w, h);
  if (tgt) { rot.lon += (((tgt.lon - rot.lon + 540) % 360) - 180) * .04; rot.lat += (tgt.lat - rot.lat) * .04; }
  const l0 = rot.lon * D2R, p0 = rot.lat * D2R, s0 = Math.sin(p0), c0 = Math.cos(p0);
  const P = (la, lo) => { const dl = lo - l0, cl = Math.cos(la), cc = s0 * Math.sin(la) + c0 * cl * Math.cos(dl);
    return [cx + r * cl * Math.sin(dl), cy - r * (c0 * Math.sin(la) - s0 * cl * Math.cos(dl)), cc]; };
  // sphere body with a golden atmosphere
  const g = gx.createRadialGradient(cx - r * .35, cy - r * .4, r * .1, cx, cy, r);
  g.addColorStop(0, '#1d2d5e'); g.addColorStop(1, '#070b1c');
  gx.save(); gx.shadowColor = 'rgba(212,175,55,.45)'; gx.shadowBlur = 40;
  gx.beginPath(); gx.arc(cx, cy, r, 0, 7); gx.fillStyle = g; gx.fill(); gx.restore();
  gx.lineWidth = 1.4; gx.strokeStyle = 'rgba(212,175,55,.55)'; gx.stroke();
  // graticule (latitude / longitude lines)
  gx.lineWidth = .6; gx.strokeStyle = 'rgba(212,175,55,.16)'; gx.beginPath();
  const line = (pts) => { let pen = false; pts.forEach(([la, lo]) => { const q = P(la, lo); if (q[2] > 0) { pen ? gx.lineTo(q[0], q[1]) : gx.moveTo(q[0], q[1]); pen = true; } else pen = false; }); };
  for (let lo = -180; lo < 180; lo += 30) line(Array.from({length: 37}, (_, i) => [(-90 + i * 5) * D2R, lo * D2R]));
  for (let la = -60; la <= 60; la += 30) line(Array.from({length: 73}, (_, i) => [la * D2R, (-180 + i * 5) * D2R]));
  gx.stroke();
  // land landPts
  gx.fillStyle = '#e9d58f';
  for (let i = 0; i < landPts.length; i += 2) {
    const q = P(landPts[i], landPts[i + 1]); if (q[2] <= 0) continue;
    gx.globalAlpha = .25 + q[2] * .7; const sz = 1 + q[2] * 1.3; gx.fillRect(q[0] - sz / 2, q[1] - sz / 2, sz, sz);
  }
  gx.globalAlpha = 1;
  // pulsing pin + label
  if (tgt) {
    const q = P(tgt.la * D2R, tgt.lo * D2R);
    if (q[2] > 0) {
      const k = (ts / 1400) % 1;
      [0, .5].forEach(o => { const kk = (k + o) % 1; gx.beginPath(); gx.arc(q[0], q[1], 6 + kk * 30, 0, 7); gx.strokeStyle = `rgba(255,214,102,${(1 - kk) * .9})`; gx.lineWidth = 2; gx.stroke(); });
      gx.beginPath(); gx.arc(q[0], q[1], 6, 0, 7); gx.fillStyle = '#ffd666'; gx.fill(); gx.lineWidth = 2; gx.strokeStyle = '#fff'; gx.stroke();
      gx.font = '600 14px Inter, "Noto Sans Gujarati", sans-serif'; const tw = gx.measureText(tgt.name).width, left = q[0] + tw + 60 > w;
      const lx = left ? q[0] - 26 : q[0] + 26, ly = q[1] - 34;
      gx.beginPath(); gx.moveTo(q[0], q[1]); gx.lineTo(lx, ly); gx.lineWidth = 1.2; gx.strokeStyle = 'rgba(255,214,102,.9)'; gx.stroke();
      gx.fillStyle = 'rgba(11,16,32,.85)'; gx.strokeStyle = 'rgba(212,175,55,.8)';
      gx.beginPath(); gx.roundRect ? gx.roundRect(left ? lx - tw - 20 : lx, ly - 16, tw + 20, 28, 14) : gx.rect(left ? lx - tw - 20 : lx, ly - 16, tw + 20, 28); gx.fill(); gx.stroke();
      gx.fillStyle = '#f4e6b0'; gx.textBaseline = 'middle'; gx.fillText(tgt.name, left ? lx - tw - 10 : lx + 10, ly - 2);
    }
  }
}
function startGlobe(name, x) {
  if (!landPts) buildDots();
  sizeGlobe();
  tgt = {lat: x.lat * .85, lon: x.lon, la: x.lat, lo: x.lon, name};
  rot = {lon: x.lon + 120, lat: 0}; // starts turned away, then spins to the location
  cancelAnimationFrame(raf);
  const loop = ts => { drawGlobe(ts); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
}
window.addEventListener('resize', () => { if (modal.classList.contains('open')) sizeGlobe(); });

/* ---------- MODAL ---------- */
const fmt = (la, lo) => `${Math.abs(la).toFixed(1)}°${la >= 0 ? 'N' : 'S'}, ${Math.abs(lo).toFixed(1)}°${lo >= 0 ? 'E' : 'W'}`;
function openModal(o, type) {
  const x = EXTRA[o.n], l = locI(o, type);
  $('mImg').innerHTML = img(o.f, l.n, o.w);
  $('mImg').classList.toggle('fig', type === 'fig'); $('mImg').style.setProperty('--fp', type === 'fig' ? facePos(o) : '50% 50%');
  loadPhotos($('mImg'));
  $('mBody').innerHTML = `<span class="meta">${type === 'civ' ? l.p : l.t + ', ' + l.e}</span><h3>${l.n}</h3>` +
    (x ? `<div class="where">${x.at} · ${fmt(x.lat, x.lon)}</div>` : '') +
    o.d.map(p => `<p>${p}</p>`).join('') +
    (l.more ? `<div class="quick"><b>${tx('Quick fact')}</b>${l.more}</div>` : '') +
    (x ? `<div class="tiles">${x.tiles.map(([h, v]) => `<div class="tile"><b>${tx(h)}</b><span>${v}</span></div>`).join('')}</div>` : '');
  [...$('mBody').children].forEach((c, i) => c.style.setProperty('--i', i));
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('close').focus();
  if (x) startGlobe(l.n, x);
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { if (!modal.classList.contains('open')) cancelAnimationFrame(raf); }, 500);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-type]');
  if (!b) return;
  const o = (b.dataset.type === 'civ' ? civs : figures)[b.dataset.i];
  openModal(o, b.dataset.type);
});
$('close').onclick = closeModal;
modal.addEventListener('click', e => { if (e.target === modal || e.target === gc) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


