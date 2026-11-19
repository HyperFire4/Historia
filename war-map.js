/* HISTORIA – animated war map engine. Data lives in war-map-data.js (content) and war-geo.js (borders). */
(function(){
"use strict";
var NS="http://www.w3.org/2000/svg",GEO=window.WAR_GEO,MAPS=window.WAR_MAPS||{};
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var BB=[-14,22,64,68];                     /* lon/lat box covered by war-geo.js */
function merc(l){return Math.log(Math.tan(Math.PI/4+l*Math.PI/360))*180/Math.PI}
function px(lon,lat){return[lon*10,-merc(lat)*10]}
var X0=BB[0]*10,X1=BB[2]*10,Y0=px(0,BB[3])[1],Y1=px(0,BB[1])[1],WB=X1-X0,HB=Y1-Y0;
function el(n,a,p){var e=document.createElementNS(NS,n),k;if(a)for(k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}

var S=null;   /* state of the mounted map */

/* ---------- markup for the slide (drawn by war.js, filled by mount) ---------- */
function has(k){return!!(GEO&&MAPS[k])}
function html(k){
  var d=MAPS[k];
  return'<section class="mapwrap" id="warmap" data-y="'+esc(d.steps[0].y)+'" data-l="War map" style="--k:'+d.steps.length+'">'+
   '<div class="mstage">'+
   '<svg class="msvg" role="img" aria-label="Animated map of the war"></svg>'+
   '<div class="mtop"><b>'+esc(d.intro.k)+'</b><small>'+esc(d.intro.t)+'</small></div>'+
   '<aside class="mcard" aria-live="polite"></aside>'+
   '<div class="mleg" aria-hidden="true"></div>'+
   '<div class="mctl"><button class="mb mprev" type="button" aria-label="Previous step">&#8249;</button>'+
   '<button class="mb mplay" type="button" aria-label="Play the tour">&#9654;</button>'+
   '<button class="mb mnext" type="button" aria-label="Next step">&#8250;</button>'+
   '<div class="mtrack"></div></div>'+
   '<p class="mcr">'+esc(d.credit)+'</p>'+
   "</div></section>";
}

/* ---------- build ---------- */
function mount(k){
  unmount();
  var d=MAPS[k],wrap=document.getElementById("warmap");
  if(!d||!wrap)return;
  var st={},sts=[],i,n,grp,key;
  S={k:k,d:d,wrap:wrap,stage:wrap.querySelector(".mstage"),svg:wrap.querySelector(".msvg"),card:wrap.querySelector(".mcard"),
     leg:wrap.querySelector(".mleg"),track:wrap.querySelector(".mtrack"),playBtn:wrap.querySelector(".mplay"),
     K:d.steps.length,step:-1,cam:{x:0,y:0,z:1},W:0,H:0,s0:1,fx:.6,fy:.5,live:[],labels:[],inview:false,timer:0,raf:0,top:0,sh:1,ro:null,fns:[]};
  /* side of every country at every step (changes accumulate) */
  st=JSON.parse(JSON.stringify(d.init));
  d.steps.forEach(function(s){for(key in s.st)st[key]=s.st[key];sts.push(JSON.parse(JSON.stringify(st)))});
  S.sts=sts;
  var name2grp={};for(grp in d.groups)d.groups[grp].forEach(function(nm){name2grp[nm]=grp});
  var name2cls={};for(key in d.g20)d.g20[key].forEach(function(nm){name2cls[nm]=key});

  var svg=S.svg;
  var defs=el("defs",null,svg);
  [["cp","176,74,58","#f2c9a6"],["al","79,134,163","#bfe6f5"]].forEach(function(h){
    var p=el("pattern",{id:"wmh_"+h[0],width:7,height:7,patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)"},defs);
    el("rect",{width:7,height:7,fill:"rgba("+h[1]+",.32)"},p);
    el("line",{x1:0,y1:0,x2:0,y2:7,stroke:h[2],"stroke-width":1.8,"stroke-opacity":.75},p);
  });
  S.geo=el("g",{"class":"geo"},svg);
  /* graticule */
  var gr=el("g",{"class":"grat"},S.geo),v;
  for(v=-10;v<=60;v+=10)el("path",{d:"M"+v*10+" "+Y0+"V"+Y1,"class":"gr"},gr);
  for(v=30;v<=70;v+=10)el("path",{d:"M"+X0+" "+px(0,v)[1].toFixed(1)+"H"+X1,"class":"gr"},gr);
  /* the two border sets: 1914 coloured by alliance, 1920 coloured by outcome */
  S.sets={};
  ["14","20"].forEach(function(b){
    var g=el("g",{"class":"gb"+(b==="14"?"":" off")},S.geo),list=[];
    (GEO[b==="14"?"1914":"1920"]||[]).forEach(function(f){
      var p=el("path",{d:f.d,"class":"c ne"},g);
      list.push({el:p,g:b==="14"?name2grp[f.n]:null,c:b==="20"?(name2cls[f.n]||"ne"):null});
    });
    S.sets[b]={g:g,list:list};
  });
  S.sets["20"].list.forEach(function(o){o.el.setAttribute("class","c "+o.c)});
  /* overlay layers (screen space, so lines/labels keep a constant size while the camera zooms) */
  var L={};["area","lab","front","arrow","unit","mark"].forEach(function(n){L[n]=el("g",{"class":"L-"+n},svg)});
  S.items={area:{},front:{},arrow:{},unit:{},mark:{}};
  function world(pts){return pts.map(function(p){return px(p[0],p[1])})}
  function reg(type,id,it){it.type=type;it.on=false;S.items[type][id]=it;return it}
  var id,o,g2;
  for(id in d.areas){o=d.areas[id];
    reg("area",id,{w:world(o.p),el:el("polygon",{"class":"ar "+o.s},L.area),
      upd:function(it,f){it.el.setAttribute("points",it.w.map(f).join(" "))}})}
  for(id in d.fronts){
    g2=el("g",{"class":"fr"},L.front);
    reg("front",id,{w:world(d.fronts[id]),el:g2,a:el("path",{"class":"cs",pathLength:100},g2),b:el("path",{"class":"ln",pathLength:100},g2),
      upd:function(it,f){var s="M"+it.w.map(f).join("L");it.a.setAttribute("d",s);it.b.setAttribute("d",s)}})}
  for(id in d.arrows){o=d.arrows[id];
    g2=el("g",{"class":"aw "+o.s},L.arrow);
    reg("arrow",id,{w:world(o.p),el:g2,a:el("path",{"class":"sh",pathLength:100},g2),b:el("path",{"class":"ln",pathLength:100},g2),
      h:el("polygon",{"class":"hd"},g2),t:o.t?el("text",{"class":"at"},g2):null,txt:o.t,
      upd:arrowUpd})
    if(o.t)S.items.arrow[id].t.textContent=o.t}
  for(id in d.units){o=d.units[id];
    g2=el("g",{"class":"un "+o.s},L.unit);
    el("rect",{x:-13,y:-8,width:26,height:16,rx:2},g2);el("path",{d:"M-13-8L13 8M-13 8L13-8"},g2);
    el("text",{y:25},g2).textContent=o.t;
    reg("unit",id,{w:px(o.p[0],o.p[1]),el:g2,upd:function(it,f){var q=f(it.w);it.el.setAttribute("transform","translate("+q+")")}})}
  for(id in d.marks){o=d.marks[id];
    g2=el("g",{"class":"mk "+o.k},L.mark);
    el("circle",{"class":"pl",r:6},g2);el("circle",{"class":"dot",r:4.5},g2);
    el("text",{x:10,y:4},g2).textContent=o.t;
    reg("mark",id,{w:px(o.p[0],o.p[1]),el:g2,upd:function(it,f){var q=f(it.w);it.el.setAttribute("transform","translate("+q+")")}})}
  d.labels.forEach(function(l){
    var t=el("text",{"class":"lb"+(l.k==="s"?" sea":"")},L.lab);t.textContent=l.t;
    S.labels.push({el:t,w:px(l.p[0],l.p[1]),z:l.z,v:l.v,on:false});
  });

  /* timeline track */
  var h="",prevY="";
  d.steps.forEach(function(s,j){
    h+='<button type="button" class="mt" data-i="'+j+'" aria-label="'+esc(s.d+": "+s.h)+'"><i></i>'+(s.y!==prevY?"<span>"+s.y+"</span>":"")+"</button>";prevY=s.y;
  });
  S.track.innerHTML=h;

  /* events */
  function on(t,ev,fn,o){t.addEventListener(ev,fn,o);S.fns.push([t,ev,fn,o])}
  on(S.track,"click",function(e){var b=e.target.closest(".mt");if(b){stop();toStep(+b.dataset.i)}});
  on(wrap.querySelector(".mprev"),"click",function(){stop();toStep(S.step-1)});
  on(wrap.querySelector(".mnext"),"click",function(){stop();toStep(S.step+1)});
  on(S.playBtn,"click",function(){S.timer?stop():play()});
  on(window,"scroll",onScroll,{passive:true});
  on(window,"resize",measure,{passive:true});
  ["wheel","touchstart","pointerdown"].forEach(function(n){on(window,n,function(e){if(S.timer&&!(S.stage.contains(e.target)&&e.target.closest(".mctl")))stop()},{passive:true})});
  if(window.ResizeObserver){S.ro=new ResizeObserver(measure);S.ro.observe(S.stage)}
  measure();
  apply(0,true);
  onScroll();
}
function unmount(){
  if(!S)return;
  stop();cancelAnimationFrame(S.raf);if(S.ro)S.ro.disconnect();
  S.fns.forEach(function(f){f[0].removeEventListener(f[1],f[2],f[3])});
  document.body.classList.remove("inmap");
  S=null;
}

/* ---------- geometry ---------- */
function arrowUpd(it,f){
  var q=it.w.map(f),s="M"+q.join("L"),n=q.length,a=q[n-2],b=q[n-1],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.sqrt(dx*dx+dy*dy)||1,ux=dx/L,uy=dy/L,
      bx=b[0]-ux*13,by=b[1]-uy*13;
  it.a.setAttribute("d",s);it.b.setAttribute("d",s);
  it.h.setAttribute("points",b[0]+","+b[1]+" "+(bx-uy*6.5)+","+(by+ux*6.5)+" "+(bx+uy*6.5)+","+(by-ux*6.5));
  if(it.t){var m=q[Math.floor((n-1)/2)],m2=q[Math.ceil((n-1)/2)];it.t.setAttribute("x",((m[0]+m2[0])/2).toFixed(1));it.t.setAttribute("y",(((m[1]+m2[1])/2)-12).toFixed(1))}
}
function measure(){
  if(!S)return;
  var r=S.stage.getBoundingClientRect();
  S.W=r.width||innerWidth;S.H=r.height||innerHeight;
  var mob=S.W<=860;
  S.s0=Math.min(S.W/WB,S.H/HB)*(mob?1.2:1);
  S.fx=mob?.5:.6;S.fy=mob?.33:.5;
  S.svg.setAttribute("viewBox","0 0 "+S.W+" "+S.H);
  var rr=S.wrap.getBoundingClientRect();
  S.top=rr.top+window.scrollY;S.sh=(S.wrap.offsetHeight-S.stage.offsetHeight)/S.K;
  layout();
}
function layout(){
  if(!S)return;
  var c=S.cam,s=S.s0*c.z,tx=S.W*S.fx-c.x*s,ty=S.H*S.fy-c.y*s;
  S.geo.setAttribute("transform","translate("+tx.toFixed(2)+" "+ty.toFixed(2)+") scale("+s.toFixed(4)+")");
  function f(p){return(p[0]*s+tx).toFixed(1)+","+(p[1]*s+ty).toFixed(1)}
  S.live.forEach(function(it){it.upd(it,f)});
  S.labels.forEach(function(l){
    var show=(l.v==="all"||l.v===S.base)&&c.z>=l.z;
    if(show!==l.on){l.on=show;l.el.classList.toggle("on",show)}
    l.el.setAttribute("x",(l.w[0]*s+tx).toFixed(1));l.el.setAttribute("y",(l.w[1]*s+ty).toFixed(1));
  });
}

/* ---------- steps ---------- */
function setItem(it,want){
  if(want){
    if(!it.on){it.on=true;if(S.live.indexOf(it)<0)S.live.push(it);it.el.classList.add("on");layoutOne(it)}
  }else if(it.on){
    it.on=false;it.el.classList.remove("on");
    setTimeout(function(){if(S&&!it.on){var j=S.live.indexOf(it);if(j>=0)S.live.splice(j,1)}},1000);
  }
}
function layoutOne(it){
  var c=S.cam,s=S.s0*c.z,tx=S.W*S.fx-c.x*s,ty=S.H*S.fy-c.y*s;
  it.upd(it,function(p){return(p[0]*s+tx).toFixed(1)+","+(p[1]*s+ty).toFixed(1)});
}
function apply(i,instant){
  var d=S.d,s=d.steps[i],t,id;
  S.step=i;S.base=s.b;
  /* who is on which side */
  var sts=S.sts[i];
  S.sets["14"].list.forEach(function(o){o.el.setAttribute("class","c "+(sts[o.g]||"ne"))});
  S.sets["14"].g.classList.toggle("off",s.b!=="14");
  S.sets["20"].g.classList.toggle("off",s.b!=="20");
  /* overlays */
  var want={fr:"front",ar:"arrow",ao:"area",un:"unit",mk:"mark"},key;
  for(key in want){
    var ids={};s[key].forEach(function(x){ids[x]=1});
    for(id in S.items[want[key]])setItem(S.items[want[key]][id],!!ids[id]);
  }
  /* camera */
  var tgt=px(s.v[0],s.v[1]);
  fly({x:tgt[0],y:tgt[1],z:s.v[2]},instant);
  /* card, legend, track, HUD */
  var c=S.card;
  c.innerHTML='<div class="md">'+esc(s.d)+"</div><h3>"+esc(s.h)+"</h3><p>"+esc(s.tx)+"</p><ul class=\"mev\">"+
    s.ev.map(function(e){return"<li><b>"+esc(e[0])+"</b><span>"+esc(e[1])+"</span></li>"}).join("")+
    '</ul><div class="mn">'+(i+1)+" / "+S.K+"</div>";
  c.classList.remove("in");void c.offsetWidth;c.classList.add("in");
  legend(s,sts);
  var hasEx=false,q;for(q in sts)if(sts[q]==="ex")hasEx=true;
  [].forEach.call(S.track.children,function(b,j){b.classList.toggle("on",j===i);b.classList.toggle("done",j<i)});
  S.track.style.setProperty("--w",((i+.5)/S.K*100)+"%");
  hud();
}
function legend(s,sts){
  var h="";
  function sw(c,t){h+='<span><i class="sw '+c+'"></i>'+t+"</span>"}
  if(s.lg==="peace"){sw("al","Victorious Allies");sw("cp","Defeated Central Powers");sw("new","New states");sw("mand","Mandates");sw("ru","Russia / Soviet state")}
  else{
    sw("al","Allied Powers");sw("cp","Central Powers");sw("ne","Neutral");
    var q,ex=false;for(q in sts)if(sts[q]==="ex")ex=true;
    if(ex)sw("ex","Defeated / left the war");
    if(s.ao.length)sw("hatch","Occupied land");
    if(s.fr.length)sw("front","Front line");
    if(s.ar.length)sw("arrow","Offensive");
  }
  S.leg.innerHTML=h;
}
function hud(){
  if(!S||!S.inview)return;
  var s=S.d.steps[S.step],h=document.getElementById("hud");
  if(h&&h.dataset.k!==s.id){h.dataset.k=s.id;h.innerHTML="<b>"+s.y+"</b><small>"+esc(s.h)+"</small>"}
}
function fly(to,instant){
  cancelAnimationFrame(S.raf);
  var from={x:S.cam.x,y:S.cam.y,z:S.cam.z},t0=performance.now(),dur=(instant||reduce)?0:1700,lz0=Math.log(from.z),lz1=Math.log(to.z);
  if(!dur){S.cam={x:to.x,y:to.y,z:to.z};layout();return}
  (function tick(now){
    if(!S)return;
    var t=clamp((now-t0)/dur,0,1),e=ease(t);
    S.cam={x:from.x+(to.x-from.x)*e,y:from.y+(to.y-from.y)*e,z:Math.exp(lz0+(lz1-lz0)*e)};
    layout();
    if(t<1)S.raf=requestAnimationFrame(tick);
  })(t0);
}

/* ---------- scrolling, buttons, tour ---------- */
function stepPos(i){return S.top+i*S.sh+S.sh*.5}
function toStep(i){
  if(!S)return;
  i=clamp(i,0,S.K-1);
  window.scrollTo({top:stepPos(i),behavior:reduce?"auto":"smooth"});
}
function onScroll(){
  if(!S)return;
  var r=S.wrap.getBoundingClientRect(),vh=innerHeight,inview=r.top<vh*.5&&r.bottom>vh*.5;
  S.top=r.top+window.scrollY;   /* re-measure: photos above can load and shift the page */
  if(inview!==S.inview){
    S.inview=inview;document.body.classList.toggle("inmap",inview);
    if(inview){if(window.WAR&&WAR.act)WAR.act(S.wrap);var h=document.getElementById("hud");if(h)h.dataset.k="";hud()}
    else stop();
  }
  var o=window.scrollY-S.top,i=clamp(Math.floor(o/S.sh),0,S.K-1);
  if(i!==S.step)apply(i);
}
function play(){
  if(!S)return;
  S.playBtn.classList.add("on");S.playBtn.innerHTML="&#10074;&#10074;";S.playBtn.setAttribute("aria-label","Pause the tour");
  if(S.step>=S.K-1||!S.inview){toStep(0)}
  S.timer=setInterval(function(){
    if(!S||S.step>=S.K-1){stop();return}
    toStep(S.step+1);
  },6200);
}
function stop(){
  if(!S||!S.timer)return;
  clearInterval(S.timer);S.timer=0;
  S.playBtn.classList.remove("on");S.playBtn.innerHTML="&#9654;";S.playBtn.setAttribute("aria-label","Play the tour");
}
/* arrow keys move through the map; at either end they hand back to normal chapter navigation */
function key(d){
  if(!S||!S.inview)return false;
  var n=S.step+d;if(n<0||n>=S.K)return false;
  stop();toStep(n);return true;
}

window.WARMAP={has:has,html:html,mount:mount,unmount:unmount,key:key};
})();
