/* HISTORIA – Napoleonic Wars interface renderer. Needs war-nap-data.js and war-nap.css. */
(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,D=null,io=null,cur=0,rz=null;
var NAV=[["01","The Era","nw-era"],["02","Campaigns","nw-camp"],["03","Great Battles","nw-bat"],["04","Commanders","nw-cmd"],["05","The Armies","nw-arm"],["06","The Aftermath","nw-aft"]];
var KX=20.07,KY=30;
function P(lo,la){return[lo*KX,-la*KY]}
function sec(id,y,l,cls,h){return'<section class="nws '+cls+'" id="'+id+'" data-y="'+y+'" data-l="'+l+'">'+h+"</section>"}
function head(n,t,s){return'<header class="nw-h nw-rv"><span class="nw-no">'+n+'</span><h2>'+t+"</h2><p>"+s+'</p><div class="nw-dv"><i></i><b></b><i></i></div></header>'}
function fr(w,c){return'<div class="nw-fr"><div class="nw-ph '+(c||"")+'" data-w="'+w+'" role="img" aria-label="'+w+'"><i></i></div></div>'}
function seal(t){return'<span class="nw-seal" aria-hidden="true">'+t+"</span>"}
function html(d){
  D=d;var h="";
  h+=sec("top","1792","Overview","nw-hero",'<div class="nw-ht"><div class="nw-eyebrow"><span class="nw-comp" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M50 4V18M50 82V96M4 50H18M82 50H96" stroke="currentColor" stroke-width="2"/><g class="nw-nd"><path d="M50 14L56 50L50 86L44 50Z" fill="#B99A65"/><path d="M50 14L56 50L44 50Z" fill="#713B38"/></g><circle cx="50" cy="50" r="4" fill="#211C18" stroke="currentColor"/></svg></span><span>1792 — 1815</span></div><h1>The Napoleonic Wars</h1><p class="nw-sub">The Age of Empires</p><p class="nw-lead">'+d.lead+'</p><button class="nw-btn" type="button" data-go="nw-era"><span>Enter the Imperial Archives</span></button></div><div class="nw-hp">'+fr(d.hero,"nw-big")+seal("N")+'</div><nav class="nw-nav" aria-label="Chapters">'+NAV.map(function(n){return'<button type="button" data-go="'+n[2]+'"><b>'+n[0]+"</b><span>"+n[1]+"</span></button>"}).join("")+"</nav>");
  h+=sec("nw-era","1792","The Era","nws-s",head("01 — The Era","The Era","From Revolution to Empire")+d.era.map(function(e,i){return'<article class="nw-ch nw-rv'+(i%2?" rev":"")+'">'+fr(e[3])+'<div class="nw-pn"><small>'+e[1]+"</small><h3>"+e[0]+"</h3><p>"+e[2]+"</p></div></article>"}).join("")+'<ol class="nw-tl nw-rv" aria-label="Timeline">'+d.tl.map(function(t){return"<li><b>"+t[0]+"</b><span>"+t[1]+"</span></li>"}).join("")+"</ol>");
  h+=sec("nw-camp","1796","Campaigns","nws-s",head("02 — Campaigns","Campaigns","The Atlas of Imperial Campaigns")+'<div class="nw-atlas nw-rv"><div class="nw-chips" role="tablist" aria-label="Campaigns">'+d.camps.map(function(c,i){return'<button type="button" role="tab" data-cm="'+i+'" aria-selected="'+(i===0)+'"><b>'+c[1]+"</b><span>"+c[0]+"</span></button>"}).join("")+'</div><div class="nw-mapw"><svg id="nw-map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Campaign map"></svg><div class="nw-rose" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="M50 2L58 42L98 50L58 58L50 98L42 58L2 50L42 42Z" fill="#392D25" stroke="#B99A65" stroke-width="2"/><text x="50" y="16" text-anchor="middle" font-size="14" fill="#B99A65" font-family="Cinzel,serif">N</text></svg></div></div><div class="nw-pn nw-ann" id="nw-ann"></div></div>');
  h+=sec("nw-bat","1805","Great Battles","nws-s",head("03 — Great Battles","Great Battles","A Gallery of the Decisive Days")+'<div class="nw-g">'+d.bats.map(function(b){return'<article class="nw-bc nw-rv">'+fr(b[7])+'<div class="nw-bb"><small>'+b[1]+" · "+b[2]+"</small><h3>"+b[0]+"</h3><dl><dt>Armies</dt><dd>"+b[3]+"</dd><dt>Commanders</dt><dd>"+b[4]+"</dd><dt>Outcome</dt><dd>"+b[5]+"</dd></dl><p>"+b[6]+"</p></div></article>"}).join("")+"</div>");
  h+=sec("nw-cmd","1812","Commanders","nws-s",head("04 — Commanders","Commanders","The Portrait Gallery")+'<div class="nw-g3">'+d.cmds.map(function(c){return'<article class="nw-cp nw-rv">'+fr(c[5],"nw-tall")+'<div class="nw-plate"><h3>'+c[0]+"</h3><small>"+c[1]+" · "+c[2]+"</small><em>"+c[3]+"</em></div><p>"+c[4]+"</p></article>"}).join("")+"</div>");
  h+=sec("nw-arm","1809","The Armies","nws-s",head("05 — The Armies","The Armies","The Military Archive")+'<div class="nw-g3">'+d.armies.map(function(a){return'<article class="nw-ar nw-rv"><div class="nw-ins" aria-hidden="true"><span>'+a[0]+"</span></div><h3>"+a[1]+"</h3><p>"+a[2]+"</p></article>"}).join("")+"</div>");
  h+=sec("nw-aft","1815","The Aftermath","nws-s",head("06 — The Aftermath","The Aftermath","Waterloo, Vienna and the New Europe")+'<div class="nw-doc nw-rv"><div class="nw-pn"><small>Treaty and Final Act, 1815</small><ul>'+d.after.map(function(a){return"<li>"+a+"</li>"}).join("")+"</ul>"+seal("1815")+'</div><div class="nw-pn nw-in"><small>South Asia</small><h3>India and the Napoleonic Wars</h3><p>'+d.india+"</p></div></div>");
  return h;
}
/* map */
function ring(s){return s.split(" ").map(function(p){var q=p.split(",");var o=P(+q[0],+q[1]);return o[0].toFixed(1)+","+o[1].toFixed(1)}).join(" ")}
function camp(i){
  var c=D.camps[i],svg=document.getElementById("nw-map");if(!svg)return;cur=i;
  var r=svg.getBoundingClientRect(),W=r.width||600,H=r.height||420,pts=c[3].map(function(p){return P(p[1],p[2])}),
  x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  pts.forEach(function(p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
  var w=Math.max(x1-x0,150)*1.5,hh=Math.max(y1-y0,110)*1.5,cx=(x0+x1)/2,cy=(y0+y1)/2;
  if(w/hh<W/H)w=hh*W/H;else hh=w*H/W;
  var u=w/W,o='<rect x="-9999" y="-9999" width="19999" height="19999" fill="#bfc2ad"/>';
  for(var g=-20;g<=60;g+=10){var a=P(g,0)[0];o+='<line x1="'+a+'" y1="-9999" x2="'+a+'" y2="9999" stroke="#8d8668" stroke-width="'+.8*u+'" opacity=".5"/>'}
  for(g=30;g<=70;g+=10){a=-g*KY;o+='<line y1="'+a+'" x1="-9999" y2="'+a+'" x2="9999" stroke="#8d8668" stroke-width="'+.8*u+'" opacity=".5"/>'}
  D.geo.land.forEach(function(l){o+='<polygon points="'+ring(l)+'" fill="#e6d8b4" stroke="#6b5a3a" stroke-width="'+1.4*u+'" stroke-linejoin="round"/>'});
  var rt=c[3].filter(function(p){return!p[5]}).map(function(p){var q=P(p[1],p[2]);return q[0].toFixed(1)+","+q[1].toFixed(1)}).join(" ");
  o+='<polyline id="nw-rt" points="'+rt+'" fill="none" stroke="#713B38" stroke-width="'+3*u+'" stroke-dasharray="'+9*u+' '+6*u+'" stroke-linecap="round" stroke-linejoin="round"/>';
  c[3].forEach(function(p,j){var q=P(p[1],p[2]);
    o+='<g class="nw-mk" tabindex="0" role="button" data-p="'+j+'" aria-label="'+p[0]+'"><circle cx="'+q[0]+'" cy="'+q[1]+'" r="'+20*u+'" fill="transparent"/><circle class="d" cx="'+q[0]+'" cy="'+q[1]+'" r="'+10*u+'" fill="#211C18" stroke="#B99A65" stroke-width="'+2*u+'"/><text x="'+q[0]+'" y="'+(q[1]+4*u)+'" text-anchor="middle" font-size="'+12*u+'" fill="#E7DCC5" font-family="IBM Plex Mono,monospace">'+(j+1)+'</text><text x="'+(q[0]+15*u)+'" y="'+(q[1]+4*u)+'" font-size="'+13*u+'" fill="#211C18" font-family="Cinzel,serif" font-weight="700" stroke="#e6d8b4" stroke-width="'+3*u+'" paint-order="stroke">'+p[0]+"</text></g>"});
  svg.setAttribute("viewBox",(cx-w/2)+" "+(cy-hh/2)+" "+w+" "+hh);svg.innerHTML=o;
  var rl=document.getElementById("nw-rt");
  if(rl&&!reduce){var L=rl.getTotalLength?rl.getTotalLength():0;if(L){rl.style.strokeDasharray=L;rl.style.strokeDashoffset=L;rl.getBoundingClientRect();rl.style.transition="stroke-dashoffset 2.2s ease";rl.style.strokeDashoffset=0;setTimeout(function(){if(rl.isConnected)rl.style.strokeDasharray=9*u+" "+6*u},2300)}}
  [].forEach.call(document.querySelectorAll(".nw-chips button"),function(b,j){b.setAttribute("aria-selected",j===i)});
  note(i,-1);
}
function note(i,j){
  var c=D.camps[i],el=document.getElementById("nw-ann");if(!el)return;
  el.innerHTML='<small>'+c[1]+"</small><h3>"+c[0]+"</h3><p>"+c[2]+'</p><ol>'+c[3].map(function(p,k){return'<li'+(k===j?' class="on"':"")+'><button type="button" data-p="'+k+'"><b>'+(k+1)+"</b><span>"+p[0]+"</span><em>"+p[3]+"</em></button>"+(k===j?"<p>"+p[4]+"</p>":"")+"</li>"}).join("")+"</ol>";
  [].forEach.call(document.querySelectorAll(".nw-mk"),function(m){m.classList.toggle("on",+m.dataset.p===j)});
}
var cache={};
function photo(el){
  var t=el.dataset.w;if(!t)return;
  (cache[t]=cache[t]||fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(t.replace(/ /g,"_"))).then(function(r){return r.ok?r.json():null}).catch(function(){return null})).then(function(o){
    var s=o&&(o.originalimage&&o.originalimage.width<2600?o.originalimage.source:o.thumbnail&&o.thumbnail.source);if(!s)return;
    var im=new Image();im.onload=function(){el.firstElementChild.style.backgroundImage="url('"+s+"')";el.classList.add("pic")};im.src=s;
  });
}
function mount(root){
  [].forEach.call(root.querySelectorAll(".nw-ph"),photo);
  var rv=root.querySelectorAll(".nw-rv");
  if(reduce||!window.IntersectionObserver){[].forEach.call(rv,function(e){e.classList.add("vis")})}
  else{io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})},{threshold:.1});[].forEach.call(rv,function(e){io.observe(e)})}
  camp(0);
  var last=innerWidth;rz=function(){if(innerWidth!==last){last=innerWidth;camp(cur)}};addEventListener("resize",rz);
}
function unmount(){if(io){io.disconnect();io=null}if(rz){removeEventListener("resize",rz);rz=null}}
document.addEventListener("click",function(e){
  if(!D||!document.getElementById("nw-map")&&!e.target.closest("[data-go]"))return;
  var b=e.target.closest("[data-go]");
  if(b){var s=document.getElementById(b.dataset.go);if(s)s.scrollIntoView({behavior:reduce?"auto":"smooth"});return}
  b=e.target.closest("[data-cm]");if(b){camp(+b.dataset.cm);return}
  b=e.target.closest("[data-p]");if(b&&document.getElementById("nw-map")){note(cur,+b.dataset.p)}
});
document.addEventListener("keydown",function(e){var m=e.target.closest&&e.target.closest(".nw-mk");if(m&&(e.key==="Enter"||e.key===" ")){e.preventDefault();note(cur,+m.dataset.p)}});
window.WARNAP={html:html,mount:mount,unmount:unmount};
})();
