/* ---------- RENDER ---------- */
const $ = id => document.getElementById(id);

// Civilization and figure cards share one template
const card = (o, i, type) => `
  <article class="card glass rv" style="--d:${(i % 4) * 90}ms">
    <div class="thumb">${img(o.f, o.n, o.w)}</div>
    <div class="card-body">
      <h3>${o.n}</h3>
      <span class="meta">${type === 'civ' ? o.p : o.t + ', ' + o.e}</span>
      <p>${o.s}</p>
      <button class="btn" data-type="${type}" data-i="${i}">${tx(type === 'civ' ? 'Explore' : 'Read biography')}</button>
    </div>
  </article>`;

/* ---------- MODAL ---------- */
const modal = $('modal');

