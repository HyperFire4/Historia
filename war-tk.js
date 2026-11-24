/* HISTORIA – Three Kingdoms interface renderer. Needs war-tk-data.js and war-tk.css. */
(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,D=null,io=null,fi=0,ti=0,lay={W:1,S:1,U:1,c:1,b:1,r:1},rz=null,sel=-1;
var NAV=[["一","Overview","tk-ov"],["二","Kingdoms","tk-kg"],["三","Timeline","tk-tl"],["四","Battles","tk-bt"],["五","Commanders","tk-cm"],["六","Map","tk-mp"],["七","Strategy","tk-ml"],["八","Legacy","tk-lg"]];
var FC={W:"#6f9c8a",S:"#C6A46A",U:"#b98a4a",H:"#a99a7c"},KX=8.5,KY=10;
function P(lo,la){return[(lo-98)*KX,(43-la)*KY]}
function rng(s){return function(){s=s*16807%2147483647;return(s-1)/2147483646}}
function ring(s){return s.split(" ").map(function(p){var q=p.split(",");var o=P(+q[0],+q[1]);return o[0].toFixed(1)+","+o[1].toFixed(1)}).join(" ")}
function pts(s){return s.split(" ").map(function(p){var q=p.split(",");return P(+q[0],+q[1])})}
/* ink-wash ridge */
function ridge(seed,base,amp,n,W){var r=rng(seed),p=[],i,x,y,d="M0 600L0 "+base;
  for(i=0;i<=n;i++){x=i/n*W;y=base-amp*(.25+.75*Math.abs(Math.sin(i*1.7+seed)*r()+r()*.6));p.push([x,y])}
  for(i=0;i<p.length;i++){var q=p[i],pr=p[i-1]||[0,base];d+="Q"+((pr[0]+q[0])/2).toFixed(0)+" "+(Math.min(pr[1],q[1])-amp*.1).toFixed(0)+" "+q[0].toFixed(0)+" "+q[1].toFixed(0)}
  return d+"L"+W+" 600Z"}
function hero(){
  var W=1600,o='<svg class="tk-land" viewBox="0 0 1600 600" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><linearGradient id="tkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38251F" stop-opacity="0"/><stop offset="1" stop-color="#211D19"/></linearGradient></defs>';
  o+='<circle cx="1180" cy="170" r="70" fill="#8C302B" opacity=".55"/><circle cx="1180" cy="170" r="70" fill="none" stroke="#C6A46A" stroke-opacity=".25"/>';
  o+='<path d="'+ridge(3,360,200,9,W)+'" fill="#4a4036" opacity=".35"/><path d="'+ridge(7,420,170,11,W)+'" fill="#3a3028" opacity=".6"/>';
  /* fortress and banners on the middle ridge */
  o+='<g fill="#1d1916" opacity=".9" transform="translate(300 360)"><path d="M0 120V70H120V120ZM-14 70L60 34L134 70Z"/><path d="M20 34V10H100V34ZM6 10L60-18L114 10Z"/><rect x="50" y="-40" width="3" height="26"/></g>';
  [[760,340],[1020,365],[1380,330]].forEach(function(b,i){o+='<g transform="translate('+b[0]+" "+b[1]+')"><g class="tk-bn" style="animation-delay:'+i*.7+'s"><rect x="0" y="0" width="3" height="80" fill="#1d1916"/><path d="M3 4H46L38 16L46 28H3Z" fill="'+["#8C302B","#6f9c8a","#b98a4a"][i]+'" opacity=".85"/></g></g>'});
  o+='<path d="'+ridge(11,500,150,13,W)+'" fill="#26211c"/><path d="'+ridge(19,560,90,15,W)+'" fill="#1b1815"/><rect width="1600" height="600" fill="url(#tkg)"/></svg>';
  return o;
}
function seal(t,c){return'<span class="tk-seal'+(c?" "+c:"")+'" aria-hidden="true"><b>'+t+"</b></span>"}
function sec(id,y,l,cls,h,m){return'<section class="tks '+cls+'" id="'+id+'" data-y="'+y+'" data-l="'+l+'"><div class="tk-mt" aria-hidden="true"><svg viewBox="0 0 1600 200" preserveAspectRatio="none"><path d="'+ridge(m*5+2,170,110,10,1600).replace(/M0 600/,"M0 200").replace(/L1600 600Z/,"L1600 200Z")+'" fill="currentColor"/></svg></div><div class="tk-w">'+h+"</div></section>"}
function head(n,t,s){return'<header class="tk-h tk-rv"><span class="tk-no">'+n+'</span><h2>'+t+"</h2><p>"+s+'</p><div class="tk-dv"><i></i>'+seal("三國","sm")+"<i></i></div></header>"}
function ph(w,c){return'<div class="tk-ph '+(c||"")+'" data-w="'+w+'" role="img" aria-label="'+w.split("|")[0]+'"><i></i></div>'}
function scroll(w,c,inner){return'<div class="tk-hs '+(c||"")+'"><span class="tk-rl"></span><div class="tk-pp">'+inner+'</div><span class="tk-rl"></span></div>'}
function mini(i){
  var g=D.geo,o='<svg viewBox="0 0 221 245" aria-hidden="true"><polygon points="'+ring(g.coast)+'" fill="#e3d6b3"/>';
  g.terr.forEach(function(t,j){o+='<polygon points="'+ring(t[2])+'" fill="'+t[1]+'" opacity="'+(j===i?.95:.18)+'" stroke="'+t[1]+'" stroke-width="1"/>'});
  g.rivers.forEach(function(r){o+='<polyline points="'+pts(r).map(function(p){return p.join(",")}).join(" ")+'" fill="none" stroke="#4a5b60" stroke-width=".8" opacity=".6"/>'});
  return o+"</svg>";
}
var SL={"Cao Cao":"曹","Liu Bei":"劉","Sun Quan":"孫","Zhuge Liang":"諸","Guan Yu":"關","Zhang Fei":"張","Zhou Yu":"周","Sima Yi":"司","Lu Xun":"陸"};
function html(d){
  D=d;var h="",i;
  h+='<section class="tks tk-hero" id="top" data-y="220" data-l="Overview">'+hero()+'<div class="tk-mist m1"></div><div class="tk-mist m2"></div><div class="tk-mist m3"></div><div class="tk-w tk-ht"><div class="tk-eb"><span>220 – 280 AD</span></div><h1 aria-label="The Three Kingdoms">'+"THE THREE KINGDOMS".split("").map(function(c,j){return c===" "?" ":'<span style="--i:'+j+'">'+c+"</span>"}).join("")+'</h1><p class="tk-sub">An empire divided. Three kingdoms rising.</p><p class="tk-lead">'+d.lead+'</p><button class="tk-btn" type="button" data-go="tk-kg">'+seal("三國","sm")+'<span>Enter the Three Kingdoms</span></button></div><nav class="tk-nav" aria-label="Chapters">'+NAV.map(function(n){return'<button type="button" data-go="'+n[2]+'"><i>'+n[0]+"</i><span>"+n[1]+"</span></button>"}).join("")+"</nav></section>";
  h+=sec("tk-kg","220","Kingdoms","tk-s",head("The Three States","Wei, Shu and Wu","Three rival kingdoms rose from the ruins of the Han")+'<div class="tk-fcs" id="tk-fcs">'+d.fac.map(function(f,j){return'<button type="button" class="tk-fc '+["wei","shu","wu"][j]+(j===0?" on":"")+' tk-rv" data-f="'+j+'" aria-pressed="'+(j===0)+'"><span class="tk-ch" aria-hidden="true">'+f[1]+"</span><small>"+f[3]+"</small><h3>"+f[0]+"</h3><em>"+f[2]+'</em><div class="tk-mm">'+mini(j)+"</div><b>Explore ›</b></button>"}).join("")+'</div><div class="tk-fd" id="tk-fd"></div>',1);
  h+=sec("tk-ov","184","Chronicle","tk-s",head("Historical Chronicle","The Fall of the Han","From imperial decline to reunification")+d.era.map(function(e,j){return'<article class="tk-ch2 tk-rv'+(j%2?" rev":"")+'"><div class="tk-fr">'+ph(e[3])+"</div>"+scroll(0,"tk-ar",'<small>'+e[1]+"</small><h3>"+e[0]+"</h3><p>"+e[2]+"</p>")+"</article>"}).join(""),2);
  h+=sec("tk-tl","184","Timeline","tk-s",head("Timeline","Bamboo Slips of the Age","Choose a year to unroll the record")+'<div class="tk-bam tk-rv" id="tk-bam" role="tablist" aria-label="Events">'+d.tl.map(function(e,j){return'<button type="button" role="tab" data-t="'+j+'" aria-selected="'+(j===0)+'" style="--k:'+FC[e[3]]+'"><b>'+e[0]+"</b><span>"+e[1]+"</span></button>"}).join("")+'</div><div class="tk-rv" id="tk-ev"></div>',3);
  h+=sec("tk-bt","200","Battles","tk-s",head("Great Battles","Four Decisive Battles","Gallery of hanging scrolls")+'<div class="tk-g">'+d.bats.map(function(b){return'<article class="tk-bc tk-rv"><div class="tk-hang"><span class="tk-rl"></span><div class="tk-fr">'+ph(b[7],"tk-wide")+'</div><span class="tk-rl"></span></div><div class="tk-bb"><small>'+b[1]+" · "+b[2]+"</small><h3>"+b[0]+"</h3><dl><dt>Factions</dt><dd>"+b[3]+"</dd><dt>Commanders</dt><dd>"+b[4]+"</dd><dt>Outcome</dt><dd>"+b[5]+"</dd></dl><p>"+b[6]+"</p></div></article>"}).join("")+"</div>",4);
  h+=sec("tk-cm","208","Commanders","tk-s",head("Commanders and Strategists","The Portrait Gallery","Rulers, generals and ministers")+'<div class="tk-g3">'+d.cmds.map(function(c){var k={Wei:"wei",Shu:"shu",Wu:"wu"}[c[1]];return'<article class="tk-cp tk-rv '+k+'"><div class="tk-fr">'+ph(c[5],"tk-tall")+seal(SL[c[0]]||"史","sm")+'</div><div class="tk-pl"><h3>'+c[0]+"</h3><small>"+c[1]+" · "+c[2]+"</small><em>"+c[3]+"</em></div><p>"+c[4]+"</p></article>"}).join("")+"</div>",5);
  h+=sec("tk-mp","208","Map","tk-s",head("Campaign Map","The Land of the Three Kingdoms","Territories are approximate, c. AD 262")+'<div class="tk-map tk-rv"><div class="tk-lg" id="tk-leg" role="group" aria-label="Map legend">'+[["W","Wei","#5c7b70"],["S","Shu","#8C302B"],["U","Wu","#8a6a36"],["c","Cities",""],["b","Battles",""],["r","Campaigns",""]].map(function(l){return'<button type="button" data-l="'+l[0]+'" aria-pressed="true"><i style="'+(l[2]?"background:"+l[2]:"")+'"></i>'+l[1]+"</button>"}).join("")+'</div><div class="tk-mw"><svg id="tk-svg" viewBox="0 0 221 245" role="img" aria-label="Map of China in the Three Kingdoms period"></svg><div class="tk-cm2">Approximate territories, c. AD 262</div></div><div class="tk-pn" id="tk-pn"></div></div>',0);
  h+=sec("tk-ml","220","Strategy","tk-s",head("Military and Strategy","The Art of War","Armies, weapons and formations")+'<div class="tk-g3">'+d.mil.map(function(m){return'<article class="tk-mc tk-rv"><div class="tk-dg">'+diag(m[2])+"</div><h3>"+m[0]+"</h3><p>"+m[1]+"</p></article>"}).join("")+"</div>",1);
  h+=sec("tk-lg","280","Legacy","tk-s",head("Legacy and Reunification","After the Three Kingdoms","Jin, 280 AD and beyond")+'<ol class="tk-lt tk-rv">'+d.legacy.map(function(l){return"<li><b>"+l[0]+"</b><div><h3>"+l[1]+"</h3><p>"+l[2]+"</p></div></li>"}).join("")+'</ol><div class="tk-ft tk-rv">'+scroll(0,"tk-ar",d.legtext.map(function(t){return"<p>"+t+"</p>"}).join(""))+"</div>",2);
  return h;
}
function diag(k){
  var o='<svg viewBox="0 0 120 70" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4">',i,j;
  if(k==="inf"){for(j=0;j<3;j++)for(i=0;i<7;i++)o+='<circle cx="'+(18+i*14)+'" cy="'+(18+j*16)+'" r="3.2" fill="currentColor"/><path d="M'+(14+i*14)+" "+(26+j*16)+'h8"/>'}
  else if(k==="cav"){for(i=0;i<5;i++)o+='<path d="M'+(14+i*18)+" 54L"+(24+i*18)+" 18L"+(34+i*18)+' 54"/>';o+='<path d="M4 62H116" stroke-dasharray="3 4"/>'}
  else if(k==="xbo"){for(j=0;j<3;j++){o+='<path d="M10 '+(16+j*18)+"H50M30 "+(8+j*18)+"V"+(24+j*18)+'"/>';o+='<path d="M60 '+(16+j*18)+"H112M104 "+(12+j*18)+"L112 "+(16+j*18)+"L104 "+(20+j*18)+'"/>'}}
  else if(k==="sie"){o+='<path d="M60 64V20H112V64M60 20V10H70V20M80 20V10H90V20M100 20V10H110V20"/><path d="M14 64V30H40V64M14 30L27 20L40 30"/><path d="M42 50L58 36"/><circle cx="46" cy="30" r="3"/>'}
  else if(k==="nav"){for(j=0;j<3;j++)o+='<path d="M10 '+(18+j*16)+"Q30 "+(30+j*16)+" 54 "+(18+j*16)+'H10Z"/><path d="M32 '+(18+j*16)+"V"+(6+j*16)+'"/>';o+='<path d="M64 24Q74 14 84 24T104 24M64 44Q74 34 84 44T104 44"/>'}
  else{o+='<path d="M60 6V64M60 6L48 14M60 6L72 14M44 36H76"/><circle cx="60" cy="36" r="22" stroke-dasharray="3 4"/><path d="M12 58L36 40M108 58L84 40"/>'}
  return o+"</svg>";
}
function fd(i){
  var f=D.fac[i],el=document.getElementById("tk-fd");if(!el)return;fi=i;
  el.className="tk-fd "+["wei","shu","wu"][i];void el.offsetWidth;el.classList.add("on");
  el.innerHTML='<div class="tk-fdi"><div class="tk-fdh"><span class="tk-ch" aria-hidden="true">'+f[1]+"</span><div><small>"+f[5]+"</small><h3>"+f[0]+'</h3></div></div><dl><dt>Ruler</dt><dd>'+f[2]+'</dd><dt>Region</dt><dd>'+f[3]+'</dd><dt>Capital</dt><dd>'+f[4]+"</dd><dt>Colours</dt><dd>"+f[6]+"</dd><dt>Key figures</dt><dd>"+f[8]+"</dd></dl><p>"+f[7]+"</p></div>";
  [].forEach.call(document.querySelectorAll(".tk-fc"),function(b,j){b.classList.toggle("on",j===i);b.setAttribute("aria-pressed",j===i)});
}
function ev(i){
  var e=D.tl[i],el=document.getElementById("tk-ev");if(!el)return;ti=i;
  el.innerHTML=scroll(0,"tk-ar tk-un",'<small>'+e[0]+" AD</small><h3>"+e[1]+"</h3><p>"+e[2]+"</p>"+seal("史"));
  [].forEach.call(document.querySelectorAll(".tk-bam button"),function(b,j){b.setAttribute("aria-selected",j===i);if(j===i)b.scrollIntoView({inline:"center",block:"nearest",behavior:reduce?"auto":"smooth"})});
}
/* map */
function map(){
  var svg=document.getElementById("tk-svg");if(!svg)return;
  var g=D.geo,W=svg.getBoundingClientRect().width||600,u=221/W,o="";
  o+='<defs><pattern id="tkh" width="'+6*u+'" height="'+4*u+'" patternUnits="userSpaceOnUse"><line x1="0" y1="'+2*u+'" x2="'+6*u+'" y2="'+2*u+'" stroke="#6f8a8a" stroke-width="'+.5*u+'" opacity=".4"/></pattern></defs><rect width="221" height="245" fill="#c3ccbd"/><rect width="221" height="245" fill="url(#tkh)"/>';
  [[16,.14],[10,.2],[5,.3]].forEach(function(s){o+='<polygon points="'+ring(g.coast)+'" fill="none" stroke="#e9eadb" stroke-width="'+s[0]*u+'" opacity="'+s[1]+'" stroke-linejoin="round"/>'});
  o+='<polygon points="'+ring(g.coast)+'" fill="#e6d8b2" stroke="#4a3a22" stroke-width="'+1.3*u+'"/><polygon points="'+ring(g.bohai)+'" fill="#c3ccbd" stroke="#4a3a22" stroke-width="'+1.1*u+'"/>';
  g.terr.forEach(function(t){if(lay[t[0]])o+='<polygon points="'+ring(t[2])+'" fill="'+t[1]+'" fill-opacity=".34" stroke="'+t[1]+'" stroke-width="'+1.6*u+'" stroke-opacity=".8" stroke-dasharray="'+5*u+' '+3*u+'"/>'});
  g.mts.forEach(function(m){var q=pts(m),k,s="";q.forEach(function(p,k2){var n=k2<q.length-1?Math.floor(Math.hypot(q[k2+1][0]-p[0],q[k2+1][1]-p[1])/(10*u)):0,m2;for(m2=0;m2<=Math.max(n,0);m2++){var t2=n?m2/n:0,nx=k2<q.length-1?q[k2+1]:p,x=p[0]+(nx[0]-p[0])*t2,y=p[1]+(nx[1]-p[1])*t2,h=(5+(m2+k2)%3)*u;s+="M"+(x-4*u).toFixed(1)+" "+(y+h/2).toFixed(1)+"L"+x.toFixed(1)+" "+(y-h).toFixed(1)+"L"+(x+4*u).toFixed(1)+" "+(y+h/2).toFixed(1)}});o+='<path d="'+s+'" fill="none" stroke="#3a3128" stroke-width="'+1.1*u+'" stroke-linecap="round" opacity=".7"/>'});
  g.rivers.forEach(function(r){o+='<polyline points="'+pts(r).map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1)}).join(" ")+'" fill="none" stroke="#4d6f7c" stroke-width="'+1.7*u+'" stroke-linecap="round" stroke-linejoin="round"/>'});
  [["Yellow River",104,37.9,-18],["Yangtze",115,30.4,-8],["Qinling",109,34.7,-5]].forEach(function(l){var p=P(l[1],l[2]);o+='<text x="'+p[0]+'" y="'+p[1]+'" font-size="'+9*u+'" font-style="italic" font-family="Cormorant Garamond,serif" fill="#2f4a55" opacity=".9" transform="rotate('+l[3]+" "+p[0]+" "+p[1]+')">'+l[0]+"</text>"});
  [["WEI",108,38.5,"#3f5b50"],["SHU",103.2,28.8,"#6a1f1b"],["WU",116,26.5,"#6a5026"]].forEach(function(l){var p=P(l[1],l[2]);o+='<text x="'+p[0]+'" y="'+p[1]+'" text-anchor="middle" font-size="'+17*u+'" letter-spacing="'+5*u+'" font-family="Cormorant Garamond,serif" font-weight="600" fill="'+l[3]+'" opacity=".75">'+l[0]+"</text>"});
  if(lay.r)g.routes.forEach(function(r){o+='<polyline points="'+pts(r[2]).map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1)}).join(" ")+'" fill="none" stroke="'+(r[1]==="W"?"#2f5a4b":"#8C302B")+'" stroke-width="'+2.2*u+'" stroke-dasharray="'+6*u+' '+4*u+'" stroke-linecap="round"/>'});
  g.pts.forEach(function(p,j){
    if(!lay[p[0]])return;var q=P(p[2],p[3]),x=q[0],y=q[1],b=p[0]==="b",on=sel===j;
    o+='<g class="tk-mk'+(on?" on":"")+'" tabindex="0" role="button" data-p="'+j+'" aria-label="'+p[1]+'"><circle cx="'+x+'" cy="'+y+'" r="'+16*u+'" fill="transparent"/>'+
    (b?'<rect x="'+(x-5*u)+'" y="'+(y-5*u)+'" width="'+10*u+'" height="'+10*u+'" transform="rotate(45 '+x+" "+y+')" fill="#8C302B" stroke="#211D19" stroke-width="'+1.2*u+'"/><path d="M'+(x-3*u)+" "+(y-3*u)+"L"+(x+3*u)+" "+(y+3*u)+"M"+(x+3*u)+" "+(y-3*u)+"L"+(x-3*u)+" "+(y+3*u)+'" stroke="#E9DFC9" stroke-width="'+1*u+'"/>':'<rect x="'+(x-4*u)+'" y="'+(y-4*u)+'" width="'+8*u+'" height="'+8*u+'" fill="#211D19" stroke="#C6A46A" stroke-width="'+1.2*u+'"/><rect x="'+(x-1.5*u)+'" y="'+(y-1.5*u)+'" width="'+3*u+'" height="'+3*u+'" fill="#C6A46A"/>')+
    '<text x="'+(x+9*u)+'" y="'+(y+3.5*u)+'" font-size="'+11*u+'" font-family="Cormorant Garamond,serif" font-weight="600" font-style="'+(b?"italic":"normal")+'" fill="#211D19" stroke="#e6d8b2" stroke-width="'+3*u+'" paint-order="stroke">'+p[1]+"</text></g>"});
  svg.innerHTML=o;
  [].forEach.call(document.querySelectorAll(".tk-lg button"),function(b){b.setAttribute("aria-pressed",!!lay[b.dataset.l])});
}
function pn(j){
  var el=document.getElementById("tk-pn");if(!el)return;sel=j;
  if(j<0){el.innerHTML='<small>Select a marker</small><h3>Explore the map</h3><p>Tap a city or battle marker for its story. Use the legend to show or hide kingdoms, cities, battles and campaign routes.</p>'}
  else{var p=D.geo.pts[j];el.innerHTML="<small>"+(p[0]==="b"?"Battle site":"City")+"</small><h3>"+p[1]+"</h3><p>"+p[4]+"</p>"}
  map();
}
var cache={};
function photos(root){
  var els=[].slice.call(root.querySelectorAll(".tk-ph")),all={},i;
  els.forEach(function(e){e.dataset.w.split("|").forEach(function(t){if(t)all[t]=1})});
  var ts=Object.keys(all),ch=[];for(i=0;i<ts.length;i+=40)ch.push(ts.slice(i,i+40));
  Promise.all(ch.map(function(c){return fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=1200&titles="+encodeURIComponent(c.join("|"))).then(function(r){return r.json()}).then(function(j){return{c:c,q:j&&j.query}}).catch(function(){return{c:c,q:null}})})).then(function(rs){
    var url={};rs.forEach(function(r){if(!r.q)return;var al={},by={};(r.q.normalized||[]).concat(r.q.redirects||[]).forEach(function(n){al[n.from]=n.to});Object.keys(r.q.pages||{}).forEach(function(k){var p=r.q.pages[k];if(p.thumbnail)by[p.title]=p.thumbnail.source});r.c.forEach(function(t){var x=t,n=0;while(al[x]&&n++<4)x=al[x];if(by[x])url[t]=by[x]})});
    els.forEach(function(e){var u=e.dataset.w.split("|").map(function(t){return url[t]}).filter(Boolean)[0];if(!u){e.classList.add("none");return}
      var im=new Image();im.onload=function(){e.firstElementChild.style.backgroundImage="url('"+u+"')";e.classList.add("pic")};im.onerror=function(){e.classList.add("none")};im.src=u});
  });
}
function mount(root){
  photos(root);
  var rv=root.querySelectorAll(".tk-rv");
  if(reduce||!window.IntersectionObserver){[].forEach.call(rv,function(e){e.classList.add("vis")})}
  else{io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})},{threshold:.08});[].forEach.call(rv,function(e){io.observe(e)})}
  fd(0);ev(0);sel=-1;pn(-1);
  var last=innerWidth;rz=function(){if(innerWidth!==last){last=innerWidth;map()}};addEventListener("resize",rz);
}
function unmount(){if(io){io.disconnect();io=null}if(rz){removeEventListener("resize",rz);rz=null}}
document.addEventListener("click",function(e){
  if(!D)return;var b=e.target.closest("[data-go]");
  if(b){var s=document.getElementById(b.dataset.go);if(s&&document.body.dataset.war==="tk")s.scrollIntoView({behavior:reduce?"auto":"smooth"});return}
  if(document.body.dataset.war!=="tk")return;
  b=e.target.closest("[data-f]");if(b){fd(+b.dataset.f);return}
  b=e.target.closest("[data-t]");if(b){ev(+b.dataset.t);return}
  b=e.target.closest("#tk-leg [data-l]");if(b){lay[b.dataset.l]=!lay[b.dataset.l];map();return}
  b=e.target.closest(".tk-mk");if(b){pn(+b.dataset.p)}
});
document.addEventListener("keydown",function(e){var m=e.target.closest&&e.target.closest(".tk-mk");if(m&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pn(+m.dataset.p)}});
var _h=html;window.WARTK={html:function(d){D=d;return _h(d)},mount:mount,unmount:unmount};
})();
