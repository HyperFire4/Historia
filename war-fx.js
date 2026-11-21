(function(){
"use strict";
var $=function(s){return document.querySelector(s)};
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function r(a,b){return a+Math.random()*(b-a)}

/* ================= GATE ================= */
var gate=$("#gate"),openQ=[],isOpen=false,gateOn=false;
function openGate(){if(isOpen)return;isOpen=true;openQ.splice(0).forEach(function(f){f()})}
window.WARGATE={
  /* run fn when the doors open (immediately if there is no gate) */
  opened:function(fn){if(isOpen||!gateOn)fn();else openQ.push(fn)},
  run:function(done){
  var nav=performance.getEntriesByType&&performance.getEntriesByType("navigation")[0];
  /* play when arriving from a link / typed URL; skip on reload and back/forward */
  var ok=!reduce&&gate&&(!nav||nav.type==="navigate");
  if(!ok){if(gate)gate.remove();document.body.classList.remove("gated");isOpen=true;done();return}
  gateOn=true;
  var dust=$("#gdust"),h="",i,s,fin=0,rd=0,t1,t2,sk=gate.querySelector(".gskip");
  for(i=0;i<28;i++){s=r(2,5);
    h+='<i style="left:'+r(36,64).toFixed(1)+'%;width:'+s.toFixed(1)+'px;height:'+s.toFixed(1)+'px;--x:'+r(-12,12).toFixed(0)+'vw;--d:'+r(1.6,3).toFixed(1)+'s;--l:'+(1.85+Math.random()*.8).toFixed(2)+'s"></i>'}
  dust.innerHTML=h;
  var t3;
  function render(){if(!rd){rd=1;done()}}
  function end(){
    if(fin)return;fin=1;
    gate.classList.add("out");document.body.classList.remove("gated");
    document.removeEventListener("keydown",key);
    setTimeout(function(){gate.remove()},650);
  }
  function skip(){clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);render();openGate();end()}
  function key(e){if(e.key==="Escape")skip()}
  document.body.classList.add("gated");
  gate.classList.add("run");
  t1=setTimeout(render,250);    /* the heavy page build happens now, hidden behind the closed doors */
  t3=setTimeout(openGate,1750); /* reveal animations start as the doors part */
  t2=setTimeout(end,3700);
  sk.addEventListener("click",skip);
  document.addEventListener("keydown",key);
  sk.focus({preventScroll:true});
}};

/* ================= BATTLEFIELD FX ================= */
var cv=$("#fx"),cx=cv&&cv.getContext("2d"),btn=$("#fxbtn");
var mode="ww1",on=!reduce,W=0,H=0,P=[],T=[],F=[],raf=0,last=0,nT=60,nF=200,started=0;
try{if(localStorage.getItem("warfx")==="off")on=false}catch(e){}

function size(){
  var d=Math.min(devicePixelRatio||1,1.5);
  W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
}
function count(){return Math.round((W<700?.55:1)*(mode==="ww1"?48:64))}
function mk(init){
  var p={x:r(0,W),y:init?r(0,H):0,s:Math.random(),ph:r(0,6.28)};
  if(mode==="ww1"){
    if(Math.random()<.4){p.t=0;p.y=init?p.y:-12;p.sz=r(5,11);p.vy=r(.35,.85);p.rot=r(0,6.28);p.vr=r(-.015,.015)}   /* poppy petals */
    else{p.t=1;p.y=init?p.y:-6;p.sz=r(.8,2.4);p.vy=r(.12,.42)}                                                   /* ash */
  }else{
    if(Math.random()<.55){p.t=2;p.y=init?p.y:H+10;p.sz=r(.9,2.7);p.vy=-r(.4,1.3)}                                /* embers */
    else{p.t=1;p.y=init?p.y:-6;p.sz=r(.8,2.4);p.vy=r(.15,.5)}                                                    /* ash */
  }
  return p;
}
function seed(){var n=count(),i;P=[];for(i=0;i<n;i++)P.push(mk(true))}
function draw(p){
  if(p.t===0){
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(1,Math.cos(p.ph)*.5+.6);
    cx.fillStyle="rgba(176,28,18,.78)";cx.beginPath();cx.ellipse(0,0,p.sz,p.sz*.65,0,0,6.283);cx.fill();cx.restore();
  }else if(p.t===1){
    cx.fillStyle="rgba(205,200,185,"+(.18+p.s*.3)+")";cx.beginPath();cx.arc(p.x,p.y,p.sz,0,6.283);cx.fill();
  }else{
    var a=.45+.45*Math.sin(p.ph*4);
    cx.fillStyle="rgba(255,140,40,"+(a*.22)+")";cx.beginPath();cx.arc(p.x,p.y,p.sz*3.4,0,6.283);cx.fill();
    cx.fillStyle="rgba(255,"+((170+p.s*70)|0)+",80,"+(a*.9)+")";cx.beginPath();cx.arc(p.x,p.y,p.sz,0,6.283);cx.fill();
  }
}
function frame(t){
  raf=0;
  if(!on||document.hidden)return;
  if(document.body.classList.contains("inmap")||document.body.classList.contains("mfs-lock")){   /* the map is the heavy part: pause the weather */
    setTimeout(function(){if(!raf&&on&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame)}},500);return}
  var dt=Math.min(3,(t-last)/16.67||1),i,p,a,g,life,al,x0,k;
  last=t;cx.clearRect(0,0,W,H);

  for(i=0;i<P.length;i++){
    p=P[i];p.ph+=.02*dt;
    p.x+=(Math.sin(p.ph)*.5+.18)*dt*(p.t===0?1.3:1);p.y+=p.vy*dt;
    if(p.t===0)p.rot+=p.vr*dt;
    if(p.y>H+16||p.y<-24||p.x>W+24){p=P[i]=mk(false)}
    draw(p);
  }

  if(mode==="ww2"){   /* anti-aircraft tracer fire */
    nT-=dt;
    if(nT<=0){nT=r(70,160);x0=r(.1,.9)*W;k=Math.round(r(2,4));
      for(i=0;i<k;i++)T.push({x:x0+i*r(6,14),y:H+4,vx:r(-1.6,1.6)+(x0<W/2?.8:-.8),vy:-r(8,12),l:r(60,95)})}
    for(i=T.length-1;i>=0;i--){
      p=T[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;
      if(p.l<=0||p.y<-30){T.splice(i,1);continue}
      a=Math.min(1,p.l/25);
      cx.strokeStyle="rgba(255,214,120,"+(a*.85)+")";cx.lineWidth=1.8;cx.lineCap="round";
      cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-p.vx*2.6,p.y-p.vy*2.6);cx.stroke();
    }
  }else{              /* drifting star-shell flares */
    nF-=dt;
    if(nF<=0){nF=r(380,700);F.push({x:r(.12,.88)*W,y:H*.75,vy:-5.5,a:0})}
    for(i=F.length-1;i>=0;i--){
      p=F[i];p.a+=dt;p.vy=Math.min(.45,p.vy+.09*dt);p.y+=p.vy*dt;p.x+=Math.sin(p.a*.03)*.35*dt;
      life=p.a/540;
      if(life>=1||p.y>H){F.splice(i,1);continue}
      al=Math.min(1,p.a/28)*Math.min(1,(1-life)/.25);
      g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,110);
      g.addColorStop(0,"rgba(255,250,220,"+(.34*al)+")");g.addColorStop(.25,"rgba(255,235,170,"+(.14*al)+")");g.addColorStop(1,"rgba(255,235,170,0)");
      cx.fillStyle=g;cx.fillRect(p.x-110,p.y-110,220,220);
      cx.fillStyle="rgba(255,255,240,"+(.95*al)+")";cx.beginPath();cx.arc(p.x,p.y,2.6,0,6.283);cx.fill();
    }
  }
  raf=requestAnimationFrame(frame);
}
function apply(){
  document.body.classList.toggle("nofx",!on);
  if(btn)btn.setAttribute("aria-pressed",on?"true":"false");
  if(on){if(!raf){last=performance.now();raf=requestAnimationFrame(frame)}}
  else{cancelAnimationFrame(raf);raf=0;cx.clearRect(0,0,W,H)}
}

/* distant artillery flash + ground rumble (the sound arrives a beat later) */
function boom(){
  if(on&&!document.hidden&&!document.body.classList.contains("inmap")){
    var f=$("#flk"),m=$("#main");
    f.style.setProperty("--fx",r(8,92).toFixed(0)+"%");
    f.classList.remove("pop");void f.offsetWidth;f.classList.add("pop");
    setTimeout(function(){m.classList.remove("rumble");void m.offsetWidth;m.classList.add("rumble")},220);
  }
  setTimeout(boom,r(7000,16000));
}

/* aircraft / airship silhouettes crossing the sky */
var PL="M0-10L3-2L16 2V5L3 4L2 12L6 14V16H-6V14L-2 12L-3 4L-16 5V2L-3-2Z";
function craft(){
  if(mode==="ww1"&&Math.random()<.5)
    return{w:300,d:70,h:'<svg viewBox="0 0 300 80" fill="currentColor"><ellipse cx="150" cy="38" rx="140" ry="21"/><path d="M26 38L4 12L40 29ZM26 38L4 64L40 47Z"/><rect x="128" y="56" width="40" height="9" rx="3"/></svg>'};
  var big=mode==="ww2",
      pts=big?[[84,44],[56,26],[56,62],[28,8],[28,80]]:[[74,44],[44,24],[44,64]];
  return{w:big?240:190,d:big?34:42,h:'<svg viewBox="0 -12 120 112" fill="currentColor">'+pts.map(function(q){
    return'<g transform="translate('+q[0]+' '+q[1]+') rotate(90) scale(1.15)"><path d="'+PL+'"/></g>'}).join("")+"</svg>"};
}
function fly(){
  if(on&&!document.hidden&&!document.body.classList.contains("inmap")){
    var c=craft(),e=document.createElement("div");
    e.className="fly";e.style.cssText="--t:"+r(6,32).toFixed(0)+"%;--w:"+c.w+"px;--d:"+c.d+"s";e.innerHTML=c.h;
    e.addEventListener("animationend",function(){e.remove()});
    $("#sky").appendChild(e);
  }
  setTimeout(fly,r(20000,38000));
}

/* if frames are slow (older phone, weak GPU) switch the effects off by themselves */
function toast(msg){
  var t=document.createElement("div");t.className="toast";t.setAttribute("role","status");t.textContent=msg;document.body.appendChild(t);
  requestAnimationFrame(function(){t.classList.add("show")});
  setTimeout(function(){t.classList.remove("show");setTimeout(function(){t.remove()},500)},6000);
}
var probed=false;
function probe(){
  if(probed||!on||reduce)return;probed=true;
  setTimeout(function(){
    var d=[],lastT=0,n=0;
    function f(t){
      if(document.hidden||document.body.classList.contains("inmap")||document.body.classList.contains("gated")){probed=false;return}
      if(lastT)d.push(t-lastT);lastT=t;
      if(++n<70)requestAnimationFrame(f);
      else{d.sort(function(a,b){return a-b});
        if(d[d.length>>1]>34&&on){on=false;apply();toast("Effects switched off to keep things smooth. Tap FX to turn them back on.")}}
    }
    requestAnimationFrame(f);
  },3500);
}
window.WARFX={set:function(k){
  mode=k;T=[];F=[];nT=60;nF=200;seed();
  if(!started){started=1;setTimeout(boom,6000);setTimeout(fly,9000);probe()}
  apply();
}};
if(cv){
  size();
  addEventListener("resize",size,{passive:true});
  document.addEventListener("visibilitychange",function(){if(!document.hidden)apply()});
  if(btn)btn.addEventListener("click",function(){
    on=!on;try{localStorage.setItem("warfx",on?"on":"off")}catch(e){}
    apply();
  });
}
})();
