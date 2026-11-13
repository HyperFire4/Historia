let LANG = 'en'; try { LANG = localStorage.getItem('historia-lang') || 'en'; } catch (e) {}
if (!TR[LANG]) LANG = 'en';
const tx = k => (LANG !== 'en' && TR[LANG] && TR[LANG].ui[k]) || k;   // look a UI string up (English text is the key)
const locI = (o, type) => {   // a civilization or figure, in the current language
  const g = LANG !== 'en' && TR[LANG] && TR[LANG][type === 'civ' ? 'c' : 'f'][o.n], more = (g && g[type === 'civ' ? 3 : 4]) || MORE[o.n];
  if (!g) return Object.assign({}, o, {more});
  return type === 'civ' ? Object.assign({}, o, {n: g[0], p: g[1], s: g[2], more}) : Object.assign({}, o, {n: g[0], t: g[1], e: g[2], s: g[3], more});
};
const locT = (m, i) => { const g = LANG !== 'en' && TR[LANG] && TR[LANG].tl[i]; return g ? Object.assign({}, m, {y: g[0], t: g[1], d: g[2], why: g[3]}) : m; };
const factT = i => (LANG !== 'en' && TR[LANG] && TR[LANG].facts[i]) || facts[i];

