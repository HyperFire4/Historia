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
var S={helm:'<path d="M20 55C20 28 36 14 50 14s30 14 30 41v26l-10 6-6-14H36l-6 14-10-6ZM34 52h32v6H34zM50 14v18"/>',col:'<path d="M24 14h52v8H24zM30 22c-8 0-10 12 0 12M70 22c8 0 10 12 0 12M34 34h32v52H34zM42 34v52M50 34v52M58 34v52M26 86h48v8H26z"/>',ship:'<path d="M8 62h84l-10 14H24zM8 62q-2-10 4-14M30 62V40h40v22M50 40V18l16 12-16 6M20 84q15 6 30 0t30 0"/>',laurel:'<path d="M50 90C20 82 12 52 22 28M50 90C80 82 88 52 78 28M22 56q-10-3-11-13M27 70q-10-1-13-10M78 56q10-3 11-13M73 70q10-1 13-10M30 40q-8-6-6-14M70 40q8-6 6-14"/>',owl:'<circle cx="34" cy="38" r="14"/><circle cx="66" cy="38" r="14"/><circle cx="34" cy="38" r="4"/><circle cx="66" cy="38" r="4"/><path d="M45 50l5 10 5-10M26 24l-6-12 14 6M74 24l6-12-14 6M28 66q22 22 44 0"/>',shield:'<circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="30"/><path d="M36 72L50 28l14 44M41 56h18"/>'};
function sv(k){return'<svg viewBox="0 0 100 100" aria-hidden="true">'+S[k]+"</svg>"}
function sym(k,c){return'<div class="pw-sym '+c+'">'+sv(k)+"</div>"}
function art(k,c){return'<div class="pw-art '+(c||"")+'" data-art="'+k+'"><div class="im"></div><small class="cap"></small></div>'}
var T=["Overview","Rival Powers","Timeline","Battles","Commanders","Map","Warfare","Legacy"],GN=["Α΄","Β΄","Γ΄","Δ΄","Ε΄","Ϛ΄","Ζ΄","Η΄"];
var ART={hero:[["Leonidas at Thermopylae","Jacques-Louis David, 1814 · Persian Wars"]],ath:[["Pericles' Funeral Oration","Philipp von Foltz, 1852"]],spa:[["Young Spartans Exercising","Edgar Degas, c. 1860"]],p1:[["Plague in an Ancient City","Michiel Sweerts, c. 1652"]],p2:[["Alcibiades Being Taught by Socrates","François-André Vincent, 1776"]],leg:[["The Death of Socrates","Jacques-Louis David, 1787"]]};
var EM={land:"helm",sea:"ship",siege:"col",politics:"laurel"};

function html(d){
  D=d;var h="",i,dust="";
  for(i=0;i<22;i++)dust+='<i style="left:'+(i*4.4+(i*37%9))+'%;animation-duration:'+(10+i%7*2)+'s;animation-delay:-'+(i%9*2)+'s"></i>';
  h+=sec("pw-hero","431 BC","Overview",'<div class="pw-bg">'+art("hero")+sym("helm","c")+'</div><div class="pw-dust">'+dust+'</div><div class="pw-frame" aria-hidden="true"><i class="mt"></i><i class="mb"></i><i class="cl"></i><i class="cr"></i><b class="k1"></b><b class="k2"></b><b class="k3"></b><b class="k4"></b></div><div class="pw-in pw-hc"><div class="pw-gr pw-r">ΠΕΛΟΠΟΝΝΗΣΙΑΚΟΣ ΠΟΛΕΜΟΣ</div><div class="pw-date pw-r">431 — 404 BC</div><h1 class="pw-r" id="pw-top">The Peloponnesian War</h1><div class="pw-sub pw-r">The struggle that divided the Greek world.</div><p class="pw-r">For nearly three decades, Athens and Sparta fought for supremacy over the ancient Greek world, unleashing a conflict that would reshape the destiny of Greece.</p><a class="pw-btn big pw-r" href="#" data-go="1">Enter the Ancient Greek World</a></div><nav class="pw-tiles" aria-label="Sections">'+T.map(function(t,j){return'<button type="button" data-nav="'+t+'"><b>'+GN[j]+"</b><small>0"+(j+1)+" —</small><span>"+t+"</span></button>"}).join("")+"</nav>");
  h+=sec("","432 BC","Rival Powers",sym("col","l")+'<div class="pw-in">'+head("Athens vs Sparta","The Rival Powers","Select a power to open its profile.")+'<div class="pw-split pw-r">'+d.powers.map(function(p,j){return'<button class="pw-fac '+p.k+'" data-f="'+j+'" aria-expanded="false">'+art(p.k==="ath"?"ath":"spa")+'<span class="ic">'+sv(j?"shield":"owl")+"</span><b>"+p.t+"</b><h3>"+p.n+"</h3><span>"+p.s+"</span></button>"}).join("")+'</div><div class="pw-prof" id="pw-prof"><div id="pw-pi"></div></div></div>');
  h+=sec("","431 BC","Timeline",sym("ship","r")+'<div class="pw-in">'+head("Chronology","Three Phases of the War")+'<div class="pw-ph">'+d.phases.map(function(p,j){return'<div class="pw-it pw-r"><div class="pw-rn">'+p.r+'</div><div class="tx"><h3>'+p.n+'</h3><div class="d">'+p.d+"</div><p>"+p.s+"</p><details><summary>Key events</summary><ul>"+p.h.map(function(x){return"<li>"+x+"</li>"}).join("")+"</ul></details></div>"+(j<2?art("p"+(j+1),"side"):'<div class="pw-art side em3">'+sv("ship")+"</div>")+"</div>"}).join("")+"</div></div>");
  h+=sec("","432 BC","Battles",sym("helm","l")+'<div class="pw-in">'+head("The record","Battle Archive")+'<div class="pw-ctl" id="pw-fl">'+["all","land","sea","siege","politics"].map(function(t,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-t="'+t+'">'+t+"</button>"}).join("")+'<button class="pw-btn s" id="pw-so">Oldest first ↑</button></div><div class="pw-bt" id="pw-bt"></div></div>');
  h+=sec("","495 BC","Commanders",sym("laurel","r")+'<div class="pw-in">'+head("Personalities","Commanders &amp; Statesmen")+'<div class="pw-pp">'+d.people.map(function(p,j){return'<button class="pw-pc pw-r" data-pp="'+j+'"><div class="ph">'+sv(p.f==="a"?"owl":"helm")+'<div class="im" data-w="'+esc(p.w)+'"></div></div><h3>'+p.n+"</h3><small class="+p.f+'>'+FN[p.f]+" · "+p.r+"</small><p>"+p.b+"</p></button>"}).join("")+"</div></div>");
  h+=sec("pw-map","431–404 BC","Map",'<div class="pw-in">'+head("Geography","Campaign Map","Choose a phase and toggle layers. Select any marker for details.")+'<div class="pw-ctl" id="pw-ph">'+["All phases","I · 431–421","II · 415–413","III · 413–404"].map(function(t,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-p="'+j+'">'+t+"</button>"}).join("")+'</div><div class="pw-ctl" id="pw-ly">'+[["a","Athenian side"],["s","Spartan side"],["b","Battles"],["r","Campaign routes"]].map(function(t){return'<button class="pw-btn s" aria-pressed="true" data-ly="'+t[0]+'">'+t[1]+"</button>"}).join("")+'</div><div class="pw-mw">'+map()+'</div><div class="pw-info" id="pw-in"><b>Campaign map</b><p>Select a city or a battle.</p></div><p class="pw-note">Coastlines: Natural Earth. Routes are schematic straight lines between known places, not exact paths.</p></div>');
  h+=sec("","Hoplites","Warfare",sym("shield","l")+'<div class="pw-in">'+head("Arms &amp; strategy","Military Warfare")+'<div class="pw-wr pw-r"><div class="pw-wt" id="pw-wt">'+d.war.map(function(w,j){return'<button class="pw-btn s'+(j?"":" on")+'" data-wt="'+j+'">'+w.n+"</button>"}).join("")+'</div><div class="pw-wp" id="pw-wp"></div></div></div>');
  h+=sec("pw-fall","404 BC","The Fall of Athens",sym("col","c")+'<div class="pw-in"><div class="pw-eb pw-r">Spring, 404 BC</div><h2 class="pw-r">The End of Athenian Supremacy</h2><div class="big pw-r">404 BC</div><div class="pw-key pw-r"></div><div class="pw-st">'+d.fall.map(function(t){return'<p class="pw-r">'+t+"</p>"}).join("")+"</div></div>");
  h+=sec("pw-leg","371 BC","Legacy",art("leg","bgart")+'<div class="pw-in">'+head("Consequences","Legacy of the War")+'<div class="pw-lg">'+d.legacy.map(function(l){return'<div class="pw-r"><h3>'+l[0]+"</h3><p>"+l[1]+"</p></div>"}).join("")+'</div><div class="pw-gr pw-r" style="text-align:center">ΚΤΗΜΑ ΕΣ ΑΙΕΙ</div><div class="pw-end pw-r">THE WAR ENDED.<em>THE GREEK WORLD WOULD NEVER BE THE SAME.</em></div><div style="text-align:center"><a class="pw-btn" href="#" data-go="0">↑ Back to top</a></div></div>');
  return h;
}

function map(){
  var s='<svg viewBox="0 0 1000 523" role="img" aria-label="Map of Greece, the Aegean and Sicily"><rect class="sea" width="1000" height="523"/>';
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

var pc={};
function summ(t){return pc[t]=pc[t]||fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(t.replace(/ /g,"_"))).then(function(r){return r.ok?r.json():null}).catch(function(){return null})}
function sized(o,W){var u=o.originalimage,s=u.source;if(u.width<=W||!/upload\.wikimedia\.org\/wikipedia\/commons\/[0-9a-f]\//.test(s))return s;return s.replace("/commons/","/commons/thumb/")+"/"+W+"px-"+s.split("/").pop()}
/* only real high-resolution raster images are accepted; anything smaller keeps the drawn Greek emblem */
function load(el,list,min,W){
  var i=0;(function next(){
    if(i>=list.length||!el.isConnected)return;var c=list[i++],t=typeof c==="string"?c:c[0];
    summ(t).then(function(o){
      if(!o||!o.originalimage||o.originalimage.width<min||!/\.(jpe?g|png|webp)$/i.test(o.originalimage.source))return next();
      var s=sized(o,W),im=new Image();im.onload=function(){var b=el.querySelector(".im")||el;b.style.backgroundImage="url('"+s+"')";el.classList.add("ok");var cp=el.querySelector(".cap");if(cp&&c[1])cp.textContent=t+" — "+c[1]};im.onerror=next;im.src=s});
  })();
}
function battles(){
  var a=D.battles.filter(function(b){return filt==="all"||b.t===filt}).sort(function(x,y){return sortAsc?x.yn-y.yn:y.yn-x.yn});
  $("#pw-bt",root).innerHTML=a.map(function(b){return'<button class="pw-bc" data-b="'+D.battles.indexOf(b)+'"><div class="em">'+sv(EM[b.t])+'</div><div class="tx"><small>'+b.y+" · "+b.p+"</small><h3>"+b.n+'</h3><div class="mo">'+b.v+" — "+b.o+"</div></div></button>"}).join("");
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
  if(b=t.closest("[data-nav]")){var m=$$(".pw",root).filter(function(s){return s.dataset.l===b.dataset.nav})[0];if(m)m.scrollIntoView({behavior:"smooth"});return}
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
  $$(".pw-art[data-art]",root).forEach(function(e){load(e,ART[e.dataset.art],1000,e.classList.contains("side")?900:1800)});
  $$(".pw-pc .im",root).forEach(function(e){load(e.parentNode,[e.dataset.w],450,520)});
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
