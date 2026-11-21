/* HISTORIA – animated war map engine (canvas version: one <canvas>, drawn only while something moves).
   Content lives in war-map-data.js; borders in war-geo.js. */
(function(){
"use strict";
var GEO=window.WAR_GEO,MAPS=window.WAR_MAPS||{};
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
var BB=[-14,22,64,68];                                   /* lon/lat box covered by war-geo.js */
function merc(l){return Math.log(Math.tan(Math.PI/4+l*Math.PI/360))*180/Math.PI}
function px(lon,lat){return[lon*10,-merc(lat)*10]}
var X0=BB[0]*10,X1=BB[2]*10,Y0=px(0,BB[3])[1],Y1=px(0,BB[1])[1],WB=X1-X0,HB=Y1-Y0;
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
var COL={al:[79,134,163],cp:[176,74,58],ne:[108,106,88],ex:[106,95,122],"new":[216,176,74],mand:[63,154,138],ru:[138,90,60]};
var SIDE={al:"#3f7694",cp:"#b04a3a"},ARW={al:"#8fd4ec",cp:"#f27a60"},MK={b:"#ffcf6b",e:"#ffffff",s:"#8fd4ec"};
var SPEEDS=[["½×",7200],["1×",3600],["1.5×",2400],["2×",1700]];
var FONT="Montserrat,system-ui,sans-serif",SERIF="'Cormorant Garamond',Georgia,serif";
var S=null;

function has(k){return!!(GEO&&MAPS[k])}
function html(k){
  var d=MAPS[k];
  return'<section class="mapwrap" id="warmap" data-y="'+esc(d.steps[0].y)+'" data-l="War map" style="--k:'+d.steps.length+'">'+
   '<div class="mstage">'+
   '<canvas class="msvg" role="img" aria-label="Animated map of the war. The caption panel describes each step."></canvas>'+
   '<div class="mtop"><b>'+esc(d.intro.k)+'</b><small>'+esc(d.intro.t)+'</small></div>'+
   '<aside class="mcard" aria-live="polite"></aside>'+
   '<div class="mleg" aria-hidden="true"></div>'+
   '<div class="mctl"><button class="mb mprev" type="button" aria-label="Previous step">&#8249;</button>'+
   '<button class="mb mplay" type="button" aria-label="Play the tour">&#9654;</button>'+
   '<button class="mb mnext" type="button" aria-label="Next step">&#8250;</button>'+
   '<div class="mtrack"></div>'+
   '<button class="mb mspd" type="button" aria-label="Tour speed" title="Tour speed">1×</button>'+
   '<button class="mb mfsb" type="button" aria-label="Full screen" title="Full screen (F)">&#9974;</button></div>'+
   '<p class="mcr">'+esc(d.credit)+'</p>'+
   "</div></section>";
}

/* ---------- build ---------- */
function mount(k){
  unmount();
  var d=MAPS[k],wrap=document.getElementById("warmap");
  if(!d||!wrap)return;
  var mob=innerWidth<=860;
  var cv=wrap.querySelector(".msvg");
  S={k:k,d:d,wrap:wrap,stage:wrap.querySelector(".mstage"),cv:cv,cx:cv.getContext("2d"),card:wrap.querySelector(".mcard"),
     leg:wrap.querySelector(".mleg"),track:wrap.querySelector(".mtrack"),playBtn:wrap.querySelector(".mplay"),
     spdBtn:wrap.querySelector(".mspd"),fsBtn:wrap.querySelector(".mfsb"),
     K:d.steps.length,step:-1,cam:{x:0,y:0,z:1},tw:null,W:0,H:0,s0:1,fx:.6,fy:.5,dpr:Math.min(devicePixelRatio||1,mob?1.5:2),
     inview:false,fs:false,pfs:false,timer:0,speed:1,raf:0,last:0,top:0,sh:1,ro:null,fns:[],base:"14",
     sets:{},items:[],labels:[],wheelAcc:0,wheelT:0};
  var st=JSON.parse(JSON.stringify(d.init)),sts=[],key,name2grp={},name2cls={},grp;
  d.steps.forEach(function(s){for(key in s.st)st[key]=s.st[key];sts.push(JSON.parse(JSON.stringify(st)))});
  S.sts=sts;
  for(grp in d.groups)d.groups[grp].forEach(function(nm){name2grp[nm]=grp});
  for(key in d.g20)d.g20[key].forEach(function(nm){name2cls[nm]=key});

  /* geography: one Path2D per country (cached), plus one combined path for the borders */
  ["14","20"].forEach(function(b){
    var all=new Path2D(),list=[];
    (GEO[b==="14"?"1914":"1920"]||[]).forEach(function(f){
      var p=new Path2D(f.d);all.addPath(p);
      var g=b==="14"?name2grp[f.n]:null,c=b==="20"?(name2cls[f.n]||"ne"):"ne";
      list.push({p:p,g:g,rgb:COL[c].slice(),t:COL[c]});
    });
    S.sets[b]={all:all,list:list,a:b==="14"?1:0,ta:b==="14"?1:0};
  });
  /* hatch patterns for occupied land */
  S.pat={};
  [["cp","176,74,58","#f2c9a6"],["al","79,134,163","#bfe6f5"]].forEach(function(h){
    var c=document.createElement("canvas");c.width=c.height=8;var x=c.getContext("2d");
    x.fillStyle="rgba("+h[1]+",.34)";x.fillRect(0,0,8,8);
    x.strokeStyle=h[2];x.globalAlpha=.75;x.lineWidth=1.8;x.beginPath();x.moveTo(-1,9);x.lineTo(9,-1);x.moveTo(-1,1);x.lineTo(1,-1);x.moveTo(7,9);x.lineTo(9,7);x.stroke();
    S.pat[h[0]]=S.cx.createPattern(c,"repeat");
  });
  /* overlays */
  function world(pts){return pts.map(function(p){return px(p[0],p[1])})}
  function add(type,o){o.type=type;o.a=0;o.ta=0;o.p=0;o.tp=0;o.dl=0;o.pt=99999;S.items.push(o);return o}
  var id,o;S.byId={area:{},front:{},arrow:{},unit:{},mark:{}};
  for(id in d.areas){o=d.areas[id];S.byId.area[id]=add("area",{w:world(o.p),s:o.s})}
  for(id in d.fronts)S.byId.front[id]=add("front",{w:world(d.fronts[id])});
  for(id in d.arrows){o=d.arrows[id];S.byId.arrow[id]=add("arrow",{w:world(o.p),s:o.s,t:o.t})}
  for(id in d.units){o=d.units[id];S.byId.unit[id]=add("unit",{w:px(o.p[0],o.p[1]),s:o.s,t:o.t})}
  for(id in d.marks){o=d.marks[id];S.byId.mark[id]=add("mark",{w:px(o.p[0],o.p[1]),k:o.k,t:o.t})}
  d.labels.forEach(function(l){S.labels.push({t:l.t,w:px(l.p[0],l.p[1]),z:l.z,v:l.v,sea:l.k==="s",a:0,ta:0})});

  /* timeline track */
  var h="",prevY="";
  d.steps.forEach(function(s,j){
    h+='<button type="button" class="mt" data-i="'+j+'" aria-label="'+esc(s.d+": "+s.h)+'"><i></i>'+(s.y!==prevY?"<span>"+s.y+"</span>":"")+"</button>";prevY=s.y;
  });
  S.track.innerHTML=h;

  /* events */
  function on(t,ev,fn,opt){t.addEventListener(ev,fn,opt);S.fns.push([t,ev,fn,opt])}
  on(S.track,"click",function(e){var b=e.target.closest(".mt");if(b){stop();goTo(+b.dataset.i)}});
  on(wrap.querySelector(".mprev"),"click",function(){stop();goTo(S.step-1)});
  on(wrap.querySelector(".mnext"),"click",function(){stop();goTo(S.step+1)});
  on(S.playBtn,"click",function(){S.timer?stop():play()});
  on(S.spdBtn,"click",function(){S.speed=(S.speed+1)%SPEEDS.length;S.spdBtn.textContent=SPEEDS[S.speed][0];if(S.timer){stop();play(true)}});
  on(S.fsBtn,"click",function(){S.fs?exitFs():enterFs()});
  on(window,"scroll",onScroll,{passive:true});
  on(window,"resize",measure,{passive:true});
  on(document,"fullscreenchange",function(){if(S.fs&&!S.pfs&&!document.fullscreenElement)leaveFs()});
  on(document,"webkitfullscreenchange",function(){if(S.fs&&!S.pfs&&!document.fullscreenElement&&!document.webkitFullscreenElement)leaveFs()});
  on(document,"visibilitychange",function(){if(!document.hidden)schedule()});
  on(document,"keydown",function(e){
    if(e.altKey||e.ctrlKey||e.metaKey)return;
    var k2=e.key;
    if(!S.fs){if((k2==="f"||k2==="F")&&S.inview&&!document.body.classList.contains("gated"))enterFs();return}
    if(k2==="Escape"){if(S.pfs){e.preventDefault();exitFs()}}
    else if(k2==="ArrowRight"||k2===" "){e.preventDefault();stop();goTo(S.step+1)}
    else if(k2==="ArrowLeft"){e.preventDefault();stop();goTo(S.step-1)}
    else if(k2==="f"||k2==="F"){exitFs()}
  });
  /* in full screen the page cannot scroll, so wheel and swipe move through the steps */
  on(S.stage,"wheel",function(e){
    if(!S.fs)return;e.preventDefault();
    var now=performance.now();if(now-S.wheelT<650)return;
    S.wheelAcc+=e.deltaY;
    if(Math.abs(S.wheelAcc)>40){stop();goTo(S.step+(S.wheelAcc>0?1:-1));S.wheelAcc=0;S.wheelT=now}
  },{passive:false});
  var ty0=null;
  on(S.stage,"touchstart",function(e){ty0=S.fs&&e.touches.length===1?e.touches[0].clientY:null},{passive:true});
  on(S.stage,"touchend",function(e){
    if(ty0===null)return;var dy=ty0-e.changedTouches[0].clientY;ty0=null;
    if(Math.abs(dy)>50&&!e.target.closest(".mcard,.mctl")){stop();goTo(S.step+(dy>0?1:-1))}
  },{passive:true});
  ["wheel","touchstart","pointerdown"].forEach(function(n){on(window,n,function(e){if(S.timer&&!S.fs&&!(e.target.closest&&e.target.closest(".mctl")))stop()},{passive:true})});
  if(window.ResizeObserver){S.ro=new ResizeObserver(measure);S.ro.observe(S.stage)}
  measure();
  apply(0,true);
  onScroll();
}
function unmount(){
  if(!S)return;
  stop();cancelAnimationFrame(S.raf);if(S.ro)S.ro.disconnect();
  if(S.fs)leaveFs(true);
  S.fns.forEach(function(f){f[0].removeEventListener(f[1],f[2],f[3])});
  document.body.classList.remove("inmap");
  S=null;
}

/* ---------- sizing ---------- */
function measure(){
  if(!S)return;
  var r=S.stage.getBoundingClientRect();
  S.W=r.width||innerWidth;S.H=r.height||innerHeight;
  var mob=S.W<=860;
  S.dpr=Math.min(devicePixelRatio||1,mob?1.5:2);
  S.s0=Math.min(S.W/WB,S.H/HB)*(mob?1.2:1);
  S.fx=mob?.5:.6;S.fy=mob?.33:.5;
  S.cv.width=Math.round(S.W*S.dpr);S.cv.height=Math.round(S.H*S.dpr);
  var rr=S.wrap.getBoundingClientRect();
  if(!S.fs){S.top=rr.top+window.scrollY;S.sh=(S.wrap.offsetHeight-S.stage.offsetHeight)/S.K}
  schedule();
}

/* ---------- steps ---------- */
function apply(i,instant){
  var d=S.d,s=d.steps[i],id,key,sts=S.sts[i];
  S.step=i;S.base=s.b;
  /* who is on which side */
  S.sets["14"].list.forEach(function(o){o.t=COL[sts[o.g]||"ne"];if(instant)o.rgb=o.t.slice()});
  S.sets["14"].ta=s.b==="14"?1:0;S.sets["20"].ta=s.b==="20"?1:0;
  if(instant){S.sets["14"].a=S.sets["14"].ta;S.sets["20"].a=S.sets["20"].ta}
  /* overlays */
  var want={fr:"front",ar:"arrow",ao:"area",un:"unit",mk:"mark"};
  for(key in want){
    var ids={};s[key].forEach(function(x){ids[x]=1});
    for(id in S.byId[want[key]])setItem(S.byId[want[key]][id],!!ids[id],instant);
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
  [].forEach.call(S.track.children,function(b,j){b.classList.toggle("on",j===i);b.classList.toggle("done",j<i)});
  S.track.style.setProperty("--w",((i+.5)/S.K*100)+"%");
  hud();
  schedule();
}
function setItem(it,want,instant){
  if(want){
    if(it.ta!==1){it.ta=1;it.tp=1;it.pt=0;it.dl=it.type==="arrow"?350:0;if(instant){it.a=1;it.p=1;it.dl=0;it.pt=99999}else it.p=0}
  }else if(it.ta!==0){it.ta=0;if(instant){it.a=0;it.p=0;it.tp=0}}
}
function legend(s,sts){
  var h="";
  function sw(c,t){h+='<span><i class="sw s-'+c+'"></i>'+t+"</span>"}
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
  var gap=SPEEDS[S.speed][1],dur=(instant||reduce)?0:clamp(gap*.48,900,1700);
  if(!dur){S.cam={x:to.x,y:to.y,z:to.z};S.tw=null;return}
  S.tw={from:{x:S.cam.x,y:S.cam.y,z:S.cam.z},to:to,t0:performance.now(),dur:dur};
}

/* ---------- drawing loop: runs only while something is moving ---------- */
function schedule(){
  if(!S||S.raf||document.hidden)return;
  if(!S.inview&&!S.fs&&S.step>0)return;           /* off screen: nothing to draw, resume when scrolled back */
  S.raf=requestAnimationFrame(frame);
}
function frame(now){
  if(!S)return;
  S.raf=0;
  var dt=S.last?Math.min(64,now-S.last):16;S.last=now;
  var busy=update(dt,now);
  draw(now);
  if(busy)S.raf=requestAnimationFrame(frame);else S.last=0;
}
function update(dt,now){
  var busy=false,i,it,k;
  if(S.tw){
    var t=clamp((now-S.tw.t0)/S.tw.dur,0,1),e=ease(t),a=S.tw.from,b=S.tw.to;
    S.cam={x:a.x+(b.x-a.x)*e,y:a.y+(b.y-a.y)*e,z:Math.exp(Math.log(a.z)+(Math.log(b.z)-Math.log(a.z))*e)};
    if(t>=1)S.tw=null;else busy=true;
  }
  for(k in S.sets){
    var set=S.sets[k];
    if(set.a!==set.ta){set.a+=clamp(set.ta-set.a,-dt/1200,dt/1200);busy=true}
    if(set.a>.005||set.ta)set.list.forEach(function(o){
      var f=Math.min(1,dt/260),c=o.rgb,tg=o.t;
      if(c[0]!==tg[0]||c[1]!==tg[1]||c[2]!==tg[2]){
        for(var n=0;n<3;n++){c[n]+=(tg[n]-c[n])*f;if(Math.abs(tg[n]-c[n])<.6)c[n]=tg[n]}
        busy=true;
      }
    });
  }
  for(i=0;i<S.items.length;i++){
    it=S.items[i];
    if(it.a!==it.ta){it.a+=clamp(it.ta-it.a,-dt/700,dt/700);busy=true}
    if(it.type==="front"||it.type==="arrow"){
      if(it.ta&&it.p<1){
        if(it.dl>0){it.dl-=dt;busy=true}
        else{it.p=Math.min(1,it.p+dt/(it.type==="front"?2000:1500));busy=true}
      }
      if(!it.ta&&it.a<=0&&it.p){it.p=0;it.tp=0}
    }
    if(it.type==="mark"&&it.ta&&it.pt<3300){it.pt+=dt;busy=true}
  }
  S.labels.forEach(function(l){
    var show=(l.v==="all"||l.v===S.base)&&S.cam.z>=l.z?1:0;l.ta=show;
    if(l.a!==l.ta){l.a+=clamp(l.ta-l.a,-dt/600,dt/600);busy=true}
  });
  return busy;
}
function rgb(c){return"rgb("+(c[0]+.5|0)+","+(c[1]+.5|0)+","+(c[2]+.5|0)+")"}
function halo(cx,txt,x,y,lw,fill,stroke){cx.lineWidth=lw;cx.strokeStyle=stroke;cx.strokeText(txt,x,y);cx.fillStyle=fill;cx.fillText(txt,x,y)}
/* draw a polyline from its start up to a fraction of its length */
function trace(cx,q,f){
  var n=q.length,i,L=0,seg=[],tgt;
  for(i=1;i<n;i++){var dx=q[i][0]-q[i-1][0],dy=q[i][1]-q[i-1][1],l=Math.sqrt(dx*dx+dy*dy);seg.push(l);L+=l}
  tgt=L*f;cx.moveTo(q[0][0],q[0][1]);
  for(i=1;i<n;i++){
    if(tgt>=seg[i-1]){cx.lineTo(q[i][0],q[i][1]);tgt-=seg[i-1]}
    else{var r=seg[i-1]?tgt/seg[i-1]:0;cx.lineTo(q[i-1][0]+(q[i][0]-q[i-1][0])*r,q[i-1][1]+(q[i][1]-q[i-1][1])*r);break}
  }
}
function draw(now){
  var cx=S.cx,c=S.cam,s=S.s0*c.z,tx=S.W*S.fx-c.x*s,ty=S.H*S.fy-c.y*s,dpr=S.dpr,k,i,it,l,n;
  function P(w){return[w[0]*s+tx,w[1]*s+ty]}
  cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,S.W,S.H);
  /* graticule */
  cx.lineWidth=1;cx.strokeStyle="rgba(255,255,255,.06)";cx.beginPath();
  for(n=-10;n<=60;n+=10){var gx=n*10*s+tx;cx.moveTo(gx,0);cx.lineTo(gx,S.H)}
  for(n=30;n<=70;n+=10){var gy=px(0,n)[1]*s+ty;cx.moveTo(0,gy);cx.lineTo(S.W,gy)}
  cx.stroke();
  /* geography */
  cx.setTransform(dpr*s,0,0,dpr*s,dpr*tx,dpr*ty);
  cx.lineJoin="round";
  for(k in S.sets){
    var set=S.sets[k];if(set.a<.01)continue;
    cx.globalAlpha=set.a*.9;
    for(i=0;i<set.list.length;i++){cx.fillStyle=rgb(set.list[i].rgb);cx.fill(set.list[i].p)}
    cx.globalAlpha=set.a;cx.lineWidth=.9/s;cx.strokeStyle="#0a0f13";cx.stroke(set.all);
  }
  cx.globalAlpha=1;cx.setTransform(dpr,0,0,dpr,0,0);
  /* occupied areas */
  for(i=0;i<S.items.length;i++){
    it=S.items[i];if(it.type!=="area"||it.a<.01)continue;
    cx.globalAlpha=it.a;cx.beginPath();
    for(n=0;n<it.w.length;n++){var q=P(it.w[n]);n?cx.lineTo(q[0],q[1]):cx.moveTo(q[0],q[1])}
    cx.closePath();cx.fillStyle=S.pat[it.s];cx.fill();
    cx.setLineDash([5,4]);cx.lineWidth=1.4;cx.strokeStyle="rgba(255,255,255,.7)";cx.stroke();cx.setLineDash([]);
  }
  cx.globalAlpha=1;
  /* place and sea names */
  cx.textAlign="center";
  for(i=0;i<S.labels.length;i++){
    l=S.labels[i];if(l.a<.01)continue;
    var lp=P(l.w);cx.globalAlpha=l.a;
    if("letterSpacing"in cx)cx.letterSpacing=l.sea?"4px":"2.6px";
    if(l.sea){cx.font="italic 500 13px "+SERIF;halo(cx,l.t,lp[0],lp[1],0,"rgba(165,205,230,.55)","transparent")}
    else{cx.font="700 12px "+FONT;halo(cx,l.t,lp[0],lp[1],3,"rgba(255,255,255,.5)","rgba(0,0,0,.4)")}
  }
  if("letterSpacing"in cx)cx.letterSpacing="0px";
  cx.globalAlpha=1;cx.lineCap="round";cx.lineJoin="round";
  /* front lines */
  for(i=0;i<S.items.length;i++){
    it=S.items[i];if(it.type!=="front"||it.a<.01||it.p<=0)continue;
    var q1=it.w.map(P);cx.globalAlpha=it.a;
    cx.beginPath();trace(cx,q1,it.p);
    cx.strokeStyle="rgba(10,15,19,.75)";cx.lineWidth=7;cx.stroke();
    cx.strokeStyle="rgba(244,220,144,.2)";cx.lineWidth=9;cx.stroke();
    cx.strokeStyle="#f4dc90";cx.lineWidth=3.2;cx.stroke();
  }
  /* offensives */
  cx.textAlign="center";
  for(i=0;i<S.items.length;i++){
    it=S.items[i];if(it.type!=="arrow"||it.a<.01||it.p<=0)continue;
    var q2=it.w.map(P);cx.globalAlpha=it.a;
    cx.beginPath();trace(cx,q2,it.p);
    cx.strokeStyle="rgba(10,15,19,.6)";cx.lineWidth=8;cx.stroke();
    cx.strokeStyle=ARW[it.s];cx.lineWidth=4.2;cx.stroke();
    var ha=clamp((it.p-.9)/.1,0,1);
    if(ha>0){
      var m=q2.length,a1=q2[m-2],b1=q2[m-1],dx=b1[0]-a1[0],dy=b1[1]-a1[1],L=Math.sqrt(dx*dx+dy*dy)||1,ux=dx/L,uy=dy/L,bx=b1[0]-ux*13,by=b1[1]-uy*13;
      cx.globalAlpha=it.a*ha;cx.beginPath();cx.moveTo(b1[0],b1[1]);cx.lineTo(bx-uy*6.5,by+ux*6.5);cx.lineTo(bx+uy*6.5,by-ux*6.5);cx.closePath();
      cx.fillStyle=ARW[it.s];cx.fill();cx.lineWidth=1.5;cx.strokeStyle="#0a0f13";cx.stroke();
      if(it.t){
        var mi=q2[Math.floor((m-1)/2)],mj=q2[Math.ceil((m-1)/2)];
        cx.font="600 11px "+FONT;halo(cx,it.t,(mi[0]+mj[0])/2,(mi[1]+mj[1])/2-12,3.5,"#fff","#0a0f13");
      }
    }
  }
  /* armies */
  for(i=0;i<S.items.length;i++){
    it=S.items[i];if(it.type!=="unit"||it.a<.01)continue;
    var u=P(it.w);cx.globalAlpha=it.a;
    cx.fillStyle=SIDE[it.s];cx.fillRect(u[0]-13,u[1]-8,26,16);
    cx.lineWidth=1.6;cx.strokeStyle="#fff";cx.strokeRect(u[0]-13,u[1]-8,26,16);
    cx.lineWidth=1.4;cx.beginPath();cx.moveTo(u[0]-13,u[1]-8);cx.lineTo(u[0]+13,u[1]+8);cx.moveTo(u[0]-13,u[1]+8);cx.lineTo(u[0]+13,u[1]-8);cx.stroke();
    cx.font="600 10px "+FONT;halo(cx,it.t,u[0],u[1]+28,3.2,"#fff","#0a0f13");
  }
  /* places (with a short "ping" when they appear) */
  cx.textAlign="left";
  for(i=0;i<S.items.length;i++){
    it=S.items[i];if(it.type!=="mark"||it.a<.01)continue;
    var p2=P(it.w),col=MK[it.k]||MK.b;cx.globalAlpha=it.a;
    if(it.pt<3300){
      var ph=(it.pt%1100)/1100;cx.globalAlpha=it.a*(1-ph)*.9;cx.strokeStyle=col;cx.lineWidth=2;
      cx.beginPath();cx.arc(p2[0],p2[1],6*(.7+2.1*ph),0,6.283);cx.stroke();cx.globalAlpha=it.a;
    }
    cx.beginPath();cx.arc(p2[0],p2[1],4.5,0,6.283);cx.fillStyle=col;cx.fill();cx.lineWidth=2;cx.strokeStyle="#0a0f13";cx.stroke();
    cx.font="600 12px "+FONT;halo(cx,it.t,p2[0]+10,p2[1]+4,3.6,"#fff","#0a0f13");
  }
  cx.globalAlpha=1;
}

/* ---------- scrolling, buttons, tour, full screen ---------- */
function stepPos(i){return S.top+i*S.sh+S.sh*.5}
function goTo(i){
  if(!S)return;
  i=clamp(i,0,S.K-1);
  if(i===S.step)return;
  apply(i);
  if(!S.fs&&!S.pfs)window.scrollTo({top:stepPos(i),behavior:"instant"});   /* keep the page position in step, without a long smooth scroll */
}
function onScroll(){
  if(!S||S.fs)return;
  var r=S.wrap.getBoundingClientRect(),vh=innerHeight,inview=r.top<vh*.5&&r.bottom>vh*.5;
  S.top=r.top+window.scrollY;
  if(inview!==S.inview){
    S.inview=inview;document.body.classList.toggle("inmap",inview);
    if(inview){if(window.WAR&&WAR.act)WAR.act(S.wrap);var h=document.getElementById("hud");if(h)h.dataset.k="";hud();schedule()}
    else stop();
  }
  var o=window.scrollY-S.top,i=clamp(Math.floor(o/S.sh),0,S.K-1);
  if(i!==S.step)apply(i);
}
function play(restart){
  if(!S)return;
  S.playBtn.classList.add("on");S.playBtn.innerHTML="&#10074;&#10074;";S.playBtn.setAttribute("aria-label","Pause the tour");
  if(!S.inview&&!S.fs)window.scrollTo({top:stepPos(Math.max(0,S.step)),behavior:"smooth"});
  else if(!restart&&S.step>=S.K-1)goTo(0);
  S.timer=setInterval(function(){
    if(!S||S.step>=S.K-1){stop();return}
    goTo(S.step+1);
  },SPEEDS[S.speed][1]);
}
function stop(){
  if(!S||!S.timer)return;
  clearInterval(S.timer);S.timer=0;
  S.playBtn.classList.remove("on");S.playBtn.innerHTML="&#9654;";S.playBtn.setAttribute("aria-label","Play the tour");
}
function enterFs(){
  if(!S||S.fs)return;
  var st=S.stage,req=st.requestFullscreen||st.webkitRequestFullscreen;
  S.fs=true;S.pfs=false;st.classList.add("fs");S.fsBtn.innerHTML="&#10005;";S.fsBtn.setAttribute("aria-label","Exit full screen");
  function pseudo(){S.pfs=true;st.classList.add("pfs");document.body.classList.add("mfs-lock");measure()}
  if(req){
    try{var r=req.call(st);if(r&&r.catch)r.catch(pseudo)}catch(e){pseudo()}
  }else pseudo();            /* e.g. iPhone Safari has no element full screen: fill the window instead */
  setTimeout(measure,150);
}
function exitFs(){
  if(!S||!S.fs)return;
  if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen();
  else if(document.webkitFullscreenElement&&document.webkitExitFullscreen)document.webkitExitFullscreen();
  else leaveFs();
}
function leaveFs(quiet){
  if(!S)return;
  S.fs=false;S.pfs=false;S.stage.classList.remove("fs","pfs");document.body.classList.remove("mfs-lock");
  S.fsBtn.innerHTML="&#9974;";S.fsBtn.setAttribute("aria-label","Full screen");
  if(quiet)return;
  measure();
  window.scrollTo({top:stepPos(S.step),behavior:"instant"});      /* put the page back where this step lives */
  S.inview=false;onScroll();
}
/* arrow keys move through the map; at either end they hand back to normal chapter navigation */
function key(d){
  if(!S)return false;
  if(S.fs){stop();goTo(S.step+d);return true}
  if(!S.inview)return false;
  var n=S.step+d;if(n<0||n>=S.K)return false;
  stop();goTo(n);return true;
}

window.WARMAP={has:has,html:html,mount:mount,unmount:unmount,key:key};
})();
