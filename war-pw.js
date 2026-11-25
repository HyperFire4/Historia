/* HISTORIA – Peloponnesian War module. Interface used by war.js: html(d), mount(main), unmount(). */
(function(){
"use strict";
var D,root,ov,io,onScroll,last,sortAsc=true,filt="all",phase=0,layers={a:1,s:1,b:1,r:1};
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")};
var X=function(lo){return((lo-12)/17*1000).toFixed(1)},Y=function(la){return((41.5-la)*74.65).toFixed(1)};
var FN={a:"Athens",s:"Sparta"},ROM=["","I","II","III"];

function sec(c,y,l,h){return'<section class="pw '+c+'" data-y="'+y+'" data-l="'+l+'">'+h+"</section>"}
function head(e,t,p){return'<div class="pw-r"><div class="pw-eb">'+e+"</div><h2>"+t+'</h2><div class="pw-key"></div>'+(p?"<p>"+p+"</p>":"")+"</div>"}
var OWL='<svg viewBox="0 0 80 80" fill="none" stroke="#637E91" stroke-width="2.5"><circle cx="28" cy="34" r="13"/><circle cx="52" cy="34" r="13"/><circle cx="28" cy="34" r="4" fill="#637E91"/><circle cx="52" cy="34" r="4" fill="#637E91"/><path d="M36 44l4 8 4-8M20 22l-5-9 12 5M60 22l5-9-12 5M24 58q16 12 32 0"/></svg>';
var SHD='<svg viewBox="0 0 80 80" fill="none" stroke="#c25a5a" stroke-width="2.5"><circle cx="40" cy="40" r="32"/><circle cx="40" cy="40" r="24" stroke="#B18A50"/><path d="M28 58L40 22l12 36M33 46h14"/></svg>';

function html(d){
  D=d;var h="",i;
  var dust="";for(i=0;i<26;i++)dust+='<i style="left:'+(i*3.9+(i*37%9))+'%;animation-duration:'+(9+i%7*2)+'s;animation-delay:-'+(i%9*2)+'s"></i>';
  h+=sec("pw-hero","431 BC","Overview",'<div class="pw-bg" data-w="Hoplite" data-k="1600"></div><div class="pw-dust">'+dust+'</div><div class="pw-in"><div class="pw-eb pw-r">Historia Archives / Ancient Greece</div><h1 class="pw-r" id="pw-top">The Peloponnesian War</h1><div class="pw-date pw-r">431 BC — 404 BC</div><div class="pw-sub pw-r">The struggle that divided the Greek world.</div><p class="pw-r">'+d.lead+'</p><div class="pw-acts pw-r"><a class="pw-btn" href="#" data-go="3">Explore the war</a><a class="pw-btn" href="#" data-go="1">Discover the rival powers</a></div><div class="pw-id pw-r"><div class="a">ATHENS<small>The naval power</small></div><div class="s">SPARTA<small>The land power</small></div></div></div>');
  h+=sec("","432 BC","Rival Powers",'<div class="pw-in">'+head("Athens vs Sparta","The Rival Powers","Select a power to open its profile.")+'<div class="pw-split pw-r">'+d.powers.map(function(p,j){return'<button class="pw-fac '+p.k+'" data-f="'+j+'" aria-expanded="false">'+(j?SHD:OWL)+"<b>"+p.t+"</b><h3>"+p.n+"</h3><span>"+p.s+"</span></button>"}).join("")+'</div><div class="pw-prof" id="pw-prof"><div id="pw-pi"></div></div></div>');
  h+=sec("pw-map","431–404 BC","Campaign Map",'<div class="pw-in">'+head("Geography","Campaign Map","Choose a phase and toggle layers. Select any marker for details.")+'<div class="pw-ctl" id="pw-ph">'+["All phases","I · 431–421","II · 415–413","III · 413–404"].map(function(t,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-p="'+j+'">'+t+"</button>"}).join("")+'</div><div class="pw-ctl" id="pw-ly">'+[["a","Athenian side"],["s","Spartan side"],["b","Battles"],["r","Campaign routes"]].map(function(t){return'<button class="pw-btn s" aria-pressed="true" data-ly="'+t[0]+'">'+t[1]+"</button>"}).join("")+'</div><div class="pw-mw">'+map()+'</div><div class="pw-info" id="pw-in"><b>Campaign map</b><p>Select a city or a battle.</p></div><p class="pw-note">Coastlines: Natural Earth. Routes are schematic straight lines between known places, not exact paths.</p></div>');
  h+=sec("","431 BC","The Three Phases",'<div class="pw-in">'+head("Chronology","Three Phases of the War")+'<div class="pw-ph">'+d.phases.map(function(p,j){return'<div class="pw-it pw-r"><div class="pw-rn">'+p.r+"</div><h3>"+p.n+'</h3><div class="d">'+p.d+"</div><p>"+p.s+"</p><details><summary>Key events</summary><ul>"+p.h.map(function(x){return"<li>"+x+"</li>"}).join("")+"</ul></details></div>"}).join("")+"</div></div>");
  h+=sec("","432 BC","Battle Archive",'<div class="pw-in">'+head("The record","Battle Archive")+'<div class="pw-ctl" id="pw-fl">'+["all","land","sea","siege","politics"].map(function(t,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-t="'+t+'">'+t+"</button>"}).join("")+'<button class="pw-btn s" id="pw-so">Oldest first ↑</button></div><div class="pw-bt" id="pw-bt"></div></div>');
  h+=sec("","495 BC","Commanders",'<div class="pw-in">'+head("Personalities","Commanders &amp; Statesmen")+'<div class="pw-pp">'+d.people.map(function(p,j){return'<button class="pw-pc pw-r" data-pp="'+j+'"><div class="ph"><div class="im" data-w="'+esc(p.w)+'" data-k="420"></div></div><h3>'+p.n+"</h3><small class="+p.f+'>'+FN[p.f]+" · "+p.r+"</small><p>"+p.b+"</p></button>"}).join("")+"</div></div>");
  h+=sec("","Hoplites","Warfare",'<div class="pw-in">'+head("Arms &amp; strategy","Military Warfare")+'<div class="pw-wr pw-r"><div class="pw-wt" id="pw-wt">'+d.war.map(function(w,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-wt="'+j+'">'+w.n+"</button>"}).join("")+'</div><div class="pw-wp" id="pw-wp"></div></div></div>');
  h+=sec("pw-fall","404 BC","The Fall of Athens",'<div class="pw-in"><div class="pw-eb pw-r">Spring, 404 BC</div><h2 class="pw-r">The End of Athenian Supremacy</h2><div class="big pw-r">404 BC</div><div class="pw-key pw-r"></div><div class="pw-st">'+d.fall.map(function(t){return'<p class="pw-r">'+t+"</p>"}).join("")+"</div></div>");
  h+=sec("","371 BC","Legacy",'<div class="pw-in">'+head("Consequences","Legacy of the War")+'<div class="pw-lg">'+d.legacy.map(function(l){return'<div class="pw-r"><h3>'+l[0]+"</h3><p>"+l[1]+"</p></div>"}).join("")+'</div><div class="pw-gr pw-r" style="text-align:center">ΚΤΗΜΑ ΕΣ ΑΙΕΙ</div><div class="pw-end pw-r">THE WAR ENDED.<em>THE GREEK WORLD WOULD NEVER BE THE SAME.</em></div><div style="text-align:center"><a class="pw-btn" href="#" data-go="0">↑ Back to top</a></div></div>');
  return h;
}

function map(){
  var s='<svg viewBox="0 0 1000 523" role="img" aria-label="Map of Greece, the Aegean and Sicily"><rect width="1000" height="523" fill="#0d1318"/>';
  for(var g=12;g<=29;g+=2)s+='<line class="grid" x1="'+X(g)+'" x2="'+X(g)+'" y1="0" y2="523"/>';
  for(g=35;g<=41;g+=1)s+='<line class="grid" y1="'+Y(g)+'" y2="'+Y(g)+'" x1="0" x2="1000"/>';
  s+='<path class="land" fill-rule="evenodd" d="'+(window.PW_LAND||"")+'"/>';
  D.routes.forEach(function(r,i){s+='<polyline class="rt '+r[1]+'" data-i="'+i+'" points="'+r[3].map(function(p){return X(p[1])+","+Y(p[0])}).join(" ")+'"><title>'+r[0]+"</title></polyline>"});
  D.places.forEach(function(p,i){
    var b=p[4]==="battle",x=X(p[2]),y=Y(p[1]);
    s+='<g class="pw-m '+p[3]+" "+p[4]+'" data-i="'+i+'" tabindex="0" role="button" aria-label="'+esc(p[0])+'" transform="translate('+x+" "+y+')">'+(b?'<rect x="-7" y="-7" width="14" height="14" transform="rotate(45)"/>':'<circle r="8"/>')+'<text x="12" y="-10">'+p[0]+"</text></g>"});
  return s+"</svg>";
}
function mapUpdate(){
  $$(".pw-m",root).forEach(function(g){
    var p=D.places[g.dataset.i],ok=p[5]===0||p[5].indexOf(phase)>-1||phase===0;
    if(p[4]==="battle"&&!layers.b)ok=false;
    if(p[3]==="a"&&!layers.a&&p[4]==="city")ok=false;if(p[3]==="s"&&!layers.s&&p[4]==="city")ok=false;
    g.classList.toggle("off",!ok)});
  $$(".rt",root).forEach(function(r){var d=D.routes[r.dataset.i];r.classList.toggle("off",!(layers.r&&(phase===0||d[2].indexOf(phase)>-1)))});
  var i=phase?D.phases[phase-1]:null;
  if(i)$("#pw-in",root).innerHTML="<b>Phase "+ROM[phase]+" · "+i.n+"</b><p>"+i.m+"</p>";
}

function wimg(el){
  var t=el.dataset.w,W=+el.dataset.k||720;if(!t)return;
  (wimg.c=wimg.c||{})[t]=wimg.c[t]||fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(t.replace(/ /g,"_"))).then(function(r){return r.ok?r.json():null}).catch(function(){return null});
  wimg.c[t].then(function(o){
    var s=o&&o.thumbnail&&o.thumbnail.source;if(!s)return;
    if(o.originalimage&&o.originalimage.width>=W)s=s.replace(/\/\d+px-/,"/"+W+"px-");
    var im=new Image();im.onload=function(){el.style.backgroundImage="url('"+s+"')";el.classList.add("ok","img")};im.src=s});
}
function battles(){
  var a=D.battles.filter(function(b){return filt==="all"||b.t===filt}).sort(function(x,y){return sortAsc?x.yn-y.yn:y.yn-x.yn});
  $("#pw-bt",root).innerHTML=a.map(function(b){return'<button class="pw-bc" data-b="'+D.battles.indexOf(b)+'"><div class="im" data-w="'+esc(b.w)+'" data-k="900"></div><div class="tx"><small>'+b.y+" · "+b.p+"</small><h3>"+b.n+'</h3><div class="mo">'+b.v+" — "+b.o+"</div></div></button>"}).join("");
  $$("#pw-bt .im",root).forEach(wimg);
}
function warPanel(j){
  var w=D.war[j],dg="";
  if(w.ph){dg='<svg viewBox="0 0 320 120" aria-label="Phalanx: eight ranks deep">';for(var r=0;r<8;r++)for(var c=0;c<13;c++)dg+='<circle cx="'+(18+c*23)+'" cy="'+(12+r*14)+'" r="9" fill="'+(r?"#7a5f33":"#B18A50")+'" stroke="#101110"/>';dg+="</svg><p style='font-size:12px'>Eight ranks of hoplites, each shield overlapping the next.</p>"}
  else dg='<div class="pw-key" style="max-width:none;margin-top:24px"></div>';
  $("#pw-wp",root).innerHTML="<h3>"+w.n+"</h3><p>"+w.t+"</p>"+dg;
}
function open(h){ov.innerHTML='<article role="dialog" aria-modal="true"><button class="pw-btn s pw-x" data-x="1">Close ✕</button>'+h+"</article>";ov.classList.add("on");last=document.activeElement;$("button",ov).focus()}
function close(){ov.classList.remove("on");if(last&&last.focus)last.focus()}

function click(e){
  var t=e.target,b;
  if(b=t.closest("[data-go]")){e.preventDefault();var n=b.dataset.go,s=$$(".pw",root);(+n?s[+n]:s[0]).scrollIntoView({behavior:"smooth"});return}
  if(b=t.closest("[data-f]")){var p=D.powers[b.dataset.f],pr=$("#pw-prof",root),same=b.getAttribute("aria-expanded")==="true";
    $$(".pw-fac",root).forEach(function(f){f.setAttribute("aria-expanded","false")});
    if(same){pr.classList.remove("open");return}
    b.setAttribute("aria-expanded","true");$("#pw-pi",root).innerHTML='<div class="pw-pg">'+p.f.map(function(f){return"<div><h4>"+f[0]+"</h4><p>"+f[1]+"</p></div>"}).join("")+"</div>";pr.classList.add("open");return}
  if(b=t.closest("[data-p]")){phase=+b.dataset.p;$$("#pw-ph button",root).forEach(function(x){x.classList.toggle("on",x===b)});mapUpdate();return}
  if(b=t.closest("[data-ly]")){var k=b.dataset.ly,on=b.getAttribute("aria-pressed")!=="true";layers[k]=on?1:0;b.setAttribute("aria-pressed",on);mapUpdate();return}
  if(b=t.closest(".pw-m")){var q=D.places[b.dataset.i];$("#pw-in",root).innerHTML="<b>"+q[0]+" · "+(q[3]==="a"?"Athenian side":q[3]==="s"?"Spartan side":"Neutral")+"</b><p>"+q[6]+"</p>";return}
  if(b=t.closest("[data-t]")){filt=b.dataset.t;$$("#pw-fl [data-t]",root).forEach(function(x){x.classList.toggle("on",x===b)});battles();return}
  if(t.closest("#pw-so")){sortAsc=!sortAsc;t.closest("#pw-so").textContent=sortAsc?"Oldest first ↑":"Newest first ↓";battles();return}
  if(b=t.closest("[data-wt]")){$$("#pw-wt button",root).forEach(function(x){x.classList.toggle("on",x===b)});warPanel(+b.dataset.wt);return}
}
function ovClick(e){
  var t=e.target,b;
  if(t===ov||t.closest("[data-x]"))return close();
}
function bind(e){
  var b=e.target.closest("[data-b]"),p=e.target.closest("[data-pp]");
  if(b){var x=D.battles[b.dataset.b];open("<small class='pw-eb'>"+x.y+" · "+x.p+"</small><h3>"+x.n+"</h3><dl><dt>Sides</dt><dd>"+x.v+"</dd><dt>Outcome</dt><dd>"+x.o+"</dd><dt>Type</dt><dd>"+x.t+"</dd></dl><p>"+x.d+"</p>")}
  else if(p){var q=D.people[p.dataset.pp];open("<small class='pw-eb'>"+FN[q.f]+" · "+q.y+"</small><h3>"+q.n+"</h3><p><b>"+q.r+".</b> "+q.b+"</p><p>"+q.d+"</p>")}
}
function key(e){if(e.key==="Escape"&&ov.classList.contains("on"))close()}

function mount(main){
  root=main;D=D||window.WAR_DATA.pw;filt="all";sortAsc=true;phase=0;layers={a:1,s:1,b:1,r:1};
  ov=document.createElement("div");ov.className="pw-ov";ov.addEventListener("click",ovClick);document.body.appendChild(ov);
  root.addEventListener("click",click);root.addEventListener("click",bind);addEventListener("keydown",key);
  battles();warPanel(0);mapUpdate();
  $$("[data-w][data-k]",root).forEach(wimg);
  io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("v");io.unobserve(en.target)}})},{threshold:.12});
  $$(".pw-r",root).forEach(function(el,i){el.style.transitionDelay=(i%4)*90+"ms";io.observe(el)});
  var bg=$(".pw-bg",root),tick=false;
  onScroll=function(){if(tick||!bg)return;tick=true;requestAnimationFrame(function(){tick=false;bg.style.transform="translateY("+Math.min(innerHeight,scrollY)*.25+"px)"})};
  addEventListener("scroll",onScroll,{passive:true});
}
function unmount(){
  if(!root)return;
  root.removeEventListener("click",click);root.removeEventListener("click",bind);removeEventListener("keydown",key);
  if(onScroll)removeEventListener("scroll",onScroll);if(io)io.disconnect();
  if(ov&&ov.parentNode)ov.remove();ov=null;root=null;
}
window.WARPW={html:html,mount:mount,unmount:unmount};
})();
