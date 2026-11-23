/* ============ UPDATE 9: who lived at the same time, on this day, photo credits ============ */
(() => {
const mk = (t, c, x) => { const e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
const NOW = new Date().getFullYear();
Object.assign(TR.gu.ui, {'Alive at the same time':'તે જ સમયે જીવંત', 'On this day':'આજના દિવસે', 'Around this date':'આ તારીખની આસપાસ', 'Photo source':'ફોટોનો સ્રોત',
  'Photos: Wikipedia & Wikimedia Commons':'ફોટા: વિકિપીડિયા અને વિકિમીડિયા કૉમન્સ'});

/* ----- turn a date text such as "c. 3000 – 1100 BCE" or "1776 CE – present" into [from, to] years ----- */
function span(t) {
  if (!t) return null;
  t = String(t).replace(/\(.*?\)/g, '').replace(/\b[cr]\.\s*/g, '').trim();
  const parts = t.split(/\s*[\u2013-]\s*/), ago = /years ago/.test(t), last = parts[parts.length - 1];
  const val = (s, bc) => {
    if (/present|today/.test(s)) return NOW;
    const m = s.match(/([\d,.]+)\s*(million)?/); if (!m) return null;
    let n = parseFloat(m[1].replace(/,/g, '')); if (m[2]) n *= 1e6;
    return ago ? NOW - n : (/BCE/.test(s) || (bc && !/CE/.test(s))) ? -n : n;
  };
  const a = val(parts[0], /BCE/.test(last)), b = val(last, false);
  return a == null || b == null || isNaN(a) || isNaN(b) ? null : [Math.min(a, b), Math.max(a, b)];
}
const everyone = () => civs.map(o => ({o, type: 'civ', s: span(o.p)})).concat(figures.map(o => ({o, type: 'fig', s: span(o.e)}))).filter(x => x.s);

function sameTime(o, type) {
  const me = span(type === 'civ' ? o.p : o.e); if (!me) return [];
  const mid = (me[0] + me[1]) / 2;
  const rs = everyone().filter(x => x.o !== o).map(x => {
    const ov = Math.min(me[1], x.s[1]) - Math.max(me[0], x.s[0]), sh = Math.min(me[1] - me[0], x.s[1] - x.s[0]) || 1;
    return Object.assign({}, x, {k: ov >= Math.min(40, sh / 2) ? ov / sh : -1, d: Math.abs(mid - (x.s[0] + x.s[1]) / 2)});
  }).filter(x => x.k > 0).sort((a, b) => b.k - a.k || a.d - b.d);
  return rs.filter(x => x.type === 'civ').slice(0, 3).concat(rs.filter(x => x.type === 'fig').slice(0, 3));
}
function addSame(o, type) {
  const body = $('mBody'); if (!body) return;
  body.querySelectorAll('.xs-same').forEach(e => e.remove());
  const box = mk('div', 'xs-same'), list = sameTime(o, type);
  if (list.length) {
    box.appendChild(mk('b', null, tx('Alive at the same time')));
    const w = mk('div', 'xs-chips');
    list.forEach(x => { const b = mk('button', 'xs-chip', locI(x.o, x.type).n); b.onclick = () => openModal(x.o, x.type); w.appendChild(b); });
    box.appendChild(w);
  }
  if (o.w) {   // where the photo comes from
    const ph = mk('small', 'xs-ph', tx('Photo source') + ': '), a = mk('a', null, 'Wikipedia \u2013 ' + o.w.replace(/_/g, ' '));
    a.href = 'https://en.wikipedia.org/wiki/' + encodeURIComponent(o.w); a.target = '_blank'; a.rel = 'noopener'; ph.appendChild(a); box.appendChild(ph);
  }
  body.appendChild(box);
}
try {   // add the block every time a card is opened
  const orig = openModal;
  openModal = function (o, type) { const r = orig.apply(this, arguments); try { addSame(o, type); } catch (e) {} return r; };
} catch (e) {}

/* ----- on this day: a real event for today's date, or the nearest date we have ----- */
const DAY = [
 [1,1,'45 BCE','The Julian calendar takes effect in Rome.'],[1,26,'1950','India becomes a republic as its Constitution comes into force.'],
 [1,30,'1948','Mahatma Gandhi is assassinated in Delhi.'],[2,11,'1990','Nelson Mandela is released after 27 years in prison.'],
 [2,12,'1809','Charles Darwin and Abraham Lincoln are both born.'],[2,24,'1582','Pope Gregory XIII announces the Gregorian calendar.'],
 [3,12,'1930','Gandhi begins the Salt March from Sabarmati Ashram.'],[3,14,'1879','Albert Einstein is born in Ulm, Germany.'],
 [3,15,'44 BCE','Julius Caesar is assassinated in Rome on the Ides of March.'],[4,12,'1961','Yuri Gagarin becomes the first human in space.'],
 [4,14,'1865','Abraham Lincoln is shot at Ford’s Theatre; he dies the next day.'],[4,15,'1912','The RMS Titanic sinks in the North Atlantic.'],
 [4,21,'1526','Babur wins the First Battle of Panipat, beginning the Mughal Empire.'],[5,8,'1945','Germany surrenders, ending World War II in Europe.'],
 [5,20,'1498','Vasco da Gama reaches Calicut on India’s Malabar coast.'],[5,29,'1453','Constantinople falls to the Ottomans.'],
 [6,6,'1674','Shivaji is crowned Chhatrapati at Raigad Fort.'],[6,6,'1944','D-Day: Allied forces land in Normandy.'],
 [6,15,'1215','King John seals Magna Carta at Runnymede.'],[6,18,'1815','Napoleon is defeated at Waterloo.'],
 [6,28,'1914','Archduke Franz Ferdinand is assassinated in Sarajevo.'],[7,4,'1776','The American Declaration of Independence is adopted.'],
 [7,14,'1789','The Bastille is stormed in Paris.'],[7,20,'1969','Neil Armstrong and Buzz Aldrin walk on the Moon.'],
 [8,15,'1947','India becomes independent.'],[8,24,'79 CE','Vesuvius erupts and buries Pompeii (the traditional date).'],
 [9,2,'1945','Japan formally surrenders, ending World War II.'],[9,17,'1787','The United States Constitution is signed.'],
 [10,2,'1869','Mohandas Karamchand Gandhi is born in Porbandar.'],[10,4,'1957','The Soviet Union launches Sputnik 1, the first artificial satellite.'],
 [10,12,'1492','Columbus reaches the Caribbean.'],[10,14,'1066','The Battle of Hastings: William of Normandy defeats King Harold.'],
 [10,24,'1945','The United Nations officially comes into existence.'],[10,31,'1875','Sardar Vallabhbhai Patel is born in Nadiad, Gujarat.'],
 [11,9,'1989','The Berlin Wall falls.'],[11,11,'1918','An armistice ends fighting in World War I.'],[11,14,'1889','Jawaharlal Nehru is born in Allahabad.'],
 [11,19,'1863','Abraham Lincoln delivers the Gettysburg Address.'],[12,10,'1901','The first Nobel Prizes are awarded.'],
 [12,17,'1903','The Wright brothers make the first powered flight.'],[12,25,'800','Charlemagne is crowned emperor in Rome.'],
 [12,26,'1991','The Soviet Union is dissolved.']];
function dayCard() {
  const fact = document.querySelector('#discover .fact'); if (!fact || fact.nextElementSibling && fact.nextElementSibling.classList.contains('xs-day')) return;
  const n = new Date(), t = Date.UTC(2001, n.getMonth(), n.getDate());
  const dist = e => { const d = Math.abs(Date.UTC(2001, e[0] - 1, e[1]) - t) / 864e5; return Math.min(d, 365 - d); };
  const best = DAY.slice().sort((a, b) => dist(a) - dist(b)), d0 = dist(best[0]), evs = best.filter(e => dist(e) === d0).slice(0, 2);
  const card = mk('div', 'xs-day glass'); card.appendChild(mk('h3', null, tx(d0 === 0 ? 'On this day' : 'Around this date')));
  evs.forEach(e => {
    const p = mk('p'), b = mk('b', null, new Date(2001, e[0] - 1, e[1]).toLocaleDateString(LANG === 'gu' ? 'gu-IN' : 'en-GB', {day: 'numeric', month: 'long'}) + ' ' + e[2]);
    p.append(b, ' \u2013 ' + e[3]); card.appendChild(p);
  });
  fact.after(card);
}
dayCard();

/* ----- photo credit: a tiny note in the bottom corner that opens a small box on tap ----- */
const cr = mk('div', 'xs-credit'), btn = mk('button', 'xs-cbtn'), pop = mk('div', 'xs-cpop');
btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'Photo credits');
btn.append(mk('span', null, tx('Photos: Wikipedia & Wikimedia Commons')), mk('i', null, '\u00a9'));
pop.textContent = 'Photos come from Wikipedia and Wikimedia Commons. Each belongs to its photographer or artist, under an open licence such as CC BY-SA or the public domain. Open any card to see a link to the Wikipedia page where the author and licence are listed.';
btn.onclick = () => { const o = cr.classList.toggle('open'); btn.setAttribute('aria-expanded', o); };
document.addEventListener('pointerdown', e => { if (!cr.contains(e.target)) { cr.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
cr.append(pop, btn); document.body.appendChild(cr);
})();
