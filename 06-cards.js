/* ---------- RENDER ---------- */
const $ = id => document.getElementById(id);

// Civilization and figure cards share one template
// Where a photo is anchored inside its frame. Figures default to the upper part so faces stay in view.
// Override one person by their photo key (the f: value in the data), e.g. FACE_POS['hammurabi'] = '50% 5%'.
const FACE_POS = {};
const facePos = o => FACE_POS[o.f] || '50% 18%';
const card = (o, i, type) => `
  <article class="card glass rv" style="--d:${(i % 4) * 90}ms${type === 'fig' ? ';--fp:' + facePos(o) : ''}">
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

