/* ============ UPDATE 5: eras and the opening gate ============ */
Object.assign(EXTRA, {
 'Minoan Civilization':{lat:35.30,lon:25.16,at:'Knossos, Crete, Greece',tiles:[['Major centres','Knossos, Phaistos, Malia'],['Known for','Palace complexes, bull-leaping frescoes, Linear A and B scripts'],['Legacy','An early link between Egyptian, Near Eastern and Greek cultures']]},
 'Kingdom of Kush':{lat:16.94,lon:33.75,at:'Meroë, Sudan',tiles:[['Major centres','Napata, Meroë'],['Known for','Nubian pyramids, iron working, the Twenty-fifth Dynasty of Egypt'],['Legacy','Showed Nubia as a major power in its own right']]},
 'Maurya Empire':{lat:25.6,lon:85.1,at:'Pataliputra (modern Patna), India',tiles:[['Major centres','Pataliputra, Taxila, Ujjain'],['Known for',"Ashoka's edicts, a large centralised administration"],['Legacy','An early example of governing a vast, diverse realm']]},
 'Gupta Empire':{lat:25.14,lon:85.44,at:'Nalanda, Bihar, India',tiles:[['Major centres','Pataliputra, Ujjain, Prayaga'],['Known for','Mathematics, astronomy, Sanskrit literature, temple art'],['Legacy','Ideas in mathematics and astronomy spread to the Islamic world and beyond']]},
 'Chola Empire':{lat:10.78,lon:79.13,at:'Thanjavur, Tamil Nadu, India',tiles:[['Major centres','Thanjavur, Gangaikonda Cholapuram'],['Known for','Naval expeditions, the Brihadisvara Temple, bronze sculpture'],['Legacy','Spread Tamil and Hindu culture across South and Southeast Asia']]},
 'Abbasid Caliphate':{lat:33.31,lon:44.37,at:'Baghdad, Iraq',tiles:[['Major centres','Baghdad, Samarra, Basra'],['Known for','The House of Wisdom, the Arabic translation movement'],['Legacy','Preserved and extended ancient knowledge that later reached Europe']]},
 'Viking Age':{lat:51.62,lon:-55.53,at:"L'Anse aux Meadows, Newfoundland, Canada",tiles:[['Major centres','Hedeby, Dublin, York, Novgorod'],['Known for','Longships, exploration, trade routes'],['Legacy','Norse settlements and place names remain from Iceland to Normandy']]},
 'Maratha Empire':{lat:18.23,lon:73.44,at:'Raigad Fort, Maharashtra, India',tiles:[['Major centres','Raigad, Pune, Satara'],['Known for','Hill forts, flexible tactics, a naval fleet'],['Legacy','A regional identity and military tradition still celebrated in Maharashtra']]},
 'Songhai Empire':{lat:16.27,lon:-0.04,at:'Gao, Mali',tiles:[['Major centres','Gao, Timbuktu, Djenné'],['Known for','Gold and salt trade, Islamic scholarship, a river-based army'],['Legacy',"Its manuscripts form part of Timbuktu's written heritage"]]},
 'Meiji Japan':{lat:35.68,lon:139.77,at:'Tokyo, Japan',tiles:[['Major centres','Tokyo, Yokohama, Osaka'],['Known for','The Meiji Restoration, industrialisation, a new constitution'],['Legacy','Japan emerged as the first major non-Western industrial power']]},
 'Hammurabi':{lat:32.54,lon:44.42,at:'Babylon, Iraq',tiles:[['Seat of power','Babylon'],['Known for','The Code of Hammurabi'],['Legacy','An early example of laws published for everyone to see']]},
 'Ramesses II':{lat:22.34,lon:31.63,at:'Abu Simbel, Egypt',tiles:[['Seat of power','Pi-Ramesses and Thebes'],['Known for','The Battle of Kadesh; Abu Simbel'],['Legacy','Often called “Ramesses the Great”']]},
 'Hannibal':{lat:36.85,lon:10.32,at:'Carthage, near Tunis, Tunisia',tiles:[['Born','Carthage, 247 BCE'],['Known for','Crossing the Alps; the victory at Cannae'],['Legacy',"Remembered as one of history's great military commanders"]]},
 'Augustus':{lat:41.89,lon:12.49,at:'Rome, Italy',tiles:[['Born','Rome, 63 BCE'],['Known for','Founding the Roman Empire; the Pax Romana'],['Legacy','His system of government lasted for centuries']]},
 'Aryabhata':{lat:25.6,lon:85.1,at:'Kusumapura (near Pataliputra), India',tiles:[['Born','Probably in present-day Bihar, 476 CE'],['Known for',"The Aryabhatiya; an estimate of pi; the Earth's rotation"],['Legacy','Influenced later Indian and Islamic astronomy']]},
 'Charlemagne':{lat:50.77,lon:6.08,at:'Aachen, Germany',tiles:[['Seat of power','Aachen'],['Known for','Reuniting much of Western Europe; the 800 coronation'],['Legacy','Often called a “father of Europe”']]},
 'Saladin':{lat:30.05,lon:31.26,at:'Cairo, Egypt',tiles:[['Born','Tikrit, c. 1137'],['Known for','Victory at Hattin; retaking Jerusalem in 1187'],['Legacy','Founder of the Ayyubid dynasty']]},
 'Rajaraja Chola I':{lat:10.78,lon:79.13,at:'Thanjavur, Tamil Nadu, India',tiles:[['Seat of power','Thanjavur'],['Known for','The Brihadisvara Temple; Chola naval power'],['Legacy',"Laid the foundations for his son Rajendra I's overseas expeditions"]]},
 'Shivaji':{lat:18.23,lon:73.44,at:'Raigad Fort, Maharashtra, India',tiles:[['Born','Shivneri Fort, 1630'],['Known for','Hill forts, naval power, the 1674 coronation'],['Legacy','A lasting symbol of Maratha pride and statecraft']]},
 'Galileo Galilei':{lat:43.72,lon:10.4,at:'Pisa, Italy',tiles:[['Born','Pisa, 1564'],['Known for','Telescope discoveries; the moons of Jupiter'],['Legacy','Called the “father of modern science” by many']]},
 'Mahatma Gandhi':{lat:21.64,lon:69.6,at:'Porbandar, Gujarat, India',tiles:[['Born','Porbandar, Gujarat, 1869'],['Known for','Satyagraha; the Salt March of 1930'],['Legacy','Inspired civil rights movements around the world']]},
 'Sardar Vallabhbhai Patel':{lat:21.84,lon:73.72,at:'Statue of Unity, Gujarat, India',tiles:[['Born','Nadiad, Gujarat, 1875'],['Known for','Integrating the princely states; the Bardoli satyagraha'],['Legacy','Remembered each year on 31 October as National Unity Day']]},
 'Albert Einstein':{lat:48.4,lon:9.99,at:'Ulm, Germany',tiles:[['Born','Ulm, Germany, 1879'],['Known for','Relativity; E = mc²; the photoelectric effect'],['Legacy','Shaped modern physics, from GPS to cosmology']]},
 'Marie Curie':{lat:52.23,lon:21.01,at:'Warsaw, Poland',tiles:[['Born','Warsaw, 1867'],['Known for','Radioactivity; discovering polonium and radium'],['Legacy','Her work opened the way to modern nuclear medicine']]}
});

/* ---------- Era hub: five cards; the people and civilizations appear only after pressing Explore ---------- */
let eraOpen = null;
function renderEras() {
  $('eraGrid').innerHTML = PERIODS.map((p, i) => {
    const nc = civs.filter(c => ERA_OF[c.n] === i).length, nf = figures.filter(c => ERA_OF[c.n] === i).length;
    return `<article class="card era-card glass rv" style="--d:${i * 90}ms"><div class="thumb">${img(p.f, tx(p.n), p.w)}</div>
      <div class="card-body"><span class="meta">${tx(p.r)}</span><h3>${tx(p.n)}</h3><p>${tx(p.b)}</p>
      <span class="ec-count">${nc} ${tx('civilizations')} · ${nf} ${tx('figures')}</span>
      <button class="btn" data-era="${i}">${tx('Explore')}</button></div></article>`; }).join('');
  loadPhotos($('eraGrid')); $('eraGrid').querySelectorAll('.rv').forEach(el => io.observe(el));
}
function renderEraPage(i) {
  const p = PERIODS[i];
  $('eraHead').innerHTML = `<div class="era-art">${img(p.f, tx(p.n), p.w)}</div><div class="era-title"><span class="meta">${tx(p.r)}</span><h2>${tx(p.n)}</h2><p>${tx(p.b)}</p></div>`;
  loadPhotos($('eraHead'));
  [['civGrid', civs, 'civ'], ['figGrid', figures, 'fig']].forEach(([id, list, type]) => {
    $(id).innerHTML = list.map((o, k) => ERA_OF[o.n] === i ? card(locI(o, type), k, type) : '').join('');
    loadPhotos($(id)); $(id).querySelectorAll('.rv').forEach(el => io.observe(el));
  });
}
function openEra(i) {
  gate(tx(PERIODS[i].n), () => {
    eraOpen = i; renderEraPage(i); $('era').scrollTop = 0;
    $('era').classList.add('open'); $('era').setAttribute('aria-hidden', 'false'); document.body.classList.add('era-lock');
  });
}
function closeEra() {
  eraOpen = null; $('era').classList.remove('open'); $('era').setAttribute('aria-hidden', 'true'); document.body.classList.remove('era-lock');
}
document.addEventListener('click', e => { const b = e.target.closest('[data-era]'); if (b) openEra(+b.dataset.era); });
$('eraBack').onclick = closeEra;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('open') && eraOpen !== null) closeEra(); }, true);

/* ---------- The gate: doors swing shut, the page changes behind them, then they swing open ---------- */
let gateBusy = false;
function gate(name, action) {
  const g = $('gate');
  if (gateBusy || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) { action(); return; }
  gateBusy = true;
  $('gSub').textContent = tx('Entering'); $('gName').textContent = name;
  g.className = 'gate on open';        // doors start open, so the page is still visible
  void g.offsetWidth;
  g.classList.remove('open');          // 1. the doors close
  setTimeout(action, 850);             // 2. the new page appears while the doors are shut
  setTimeout(() => g.classList.add('opening', 'open'), 1850);   // 3. the doors open with a flash of light
  setTimeout(() => { g.className = 'gate'; gateBusy = false; }, 3500);
}
document.addEventListener('click', e => {   // entering the cinematic timeline also goes through the gate
  const a = e.target.closest('a[href="#journey"]'); if (!a) return;
  e.preventDefault(); closeMenu();
  gate(tx('Journey Through Time'), () => window.scrollTo({top: $('journey').offsetTop, behavior: 'instant'}));
});

renderEras();
if (LANG !== 'en') applyLang();
