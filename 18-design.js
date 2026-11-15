/* ============ UPDATE 8: the background changes colour as you travel through the page ============ */
(() => {
  const bg = document.getElementById('bgArt'); if (!bg) return;
  const r = document.getElementById('rings');
  if (r) { const c = r.cloneNode(true); c.removeAttribute('id'); c.setAttribute('class', 'bg-rings'); bg.appendChild(c); }   // a huge faint astrolabe
  // section -> colour: gold, blue, green, ember, violet (the same colours as the eras on the world map)
  const map = [['home', 0], ['stats', 0], ['journey', 1], ['eras', 2], ['timeline', 3], ['discover', 4]];
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) document.body.dataset.tint = en.target.dataset.tint; }), {rootMargin: '-45% 0px -45% 0px'});
  map.forEach(([id, t]) => { const el = document.getElementById(id); if (el) { el.dataset.tint = t; io.observe(el); } });
})();
