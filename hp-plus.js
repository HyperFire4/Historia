/* HISTORIA add-on: performance, sound controls, search, world map, quiz.
   Load in <head> (no defer) AFTER hp-data.js so the audio hook runs before the site's own scripts. */
(function(){
"use strict";
var D=window.HP_DATA,doc=document,root=doc.documentElement,store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
function el(t,c,x){var e=doc.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function toast(m){var t=el("div","hp-toast",m);t.setAttribute("role","status");doc.body.appendChild(t);setTimeout(function(){t.remove()},3200)}

/* ---------- 1. performance ---------- */
function lazy(i){if(!i.hasAttribute("decoding"))i.decoding="async";if(!i.hasAttribute("loading")&&!/hero/i.test(i.className+" "+i.id))i.loading="lazy"}
function perf(){
 doc.querySelectorAll("img").forEach(lazy);
 new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.tagName==="IMG")lazy(n);else n.querySelectorAll("img").forEach(lazy)})})}).observe(root,{childList:true,subtree:true});
}

/* ---------- 2. sound: hook play() so every audio/video is tracked ---------- */
var media=new Set(),muted=store.get("hp_mute")==="1",vol=store.get("hp_vol"),resume=[];
vol=vol===null?null:parseFloat(vol);
var origPlay=HTMLMediaElement.prototype.play;
HTMLMediaElement.prototype.play=function(){media.add(this);if(muted)this.muted=true;if(vol!==null)this.volume=vol;return origPlay.apply(this,arguments)};
function applySound(){media.forEach(function(m){m.muted=muted;if(vol!==null)m.volume=vol})}
doc.addEventListener("visibilitychange",function(){
 root.classList.toggle("hp-bg",doc.hidden);
 if(doc.hidden){resume=[];media.forEach(function(m){if(!m.paused){resume.push(m);m.pause()}})}
 else{resume.forEach(function(m){origPlay.call(m).catch(function(){})});resume=[]}
});

/* ---------- shared UI ---------- */
function modal(title){
 var back=el("div","hp-modal"),box=el("div","hp-box"),head=el("div","hp-head"),h=el("h2",null,title),x=el("button","hp-x","\u00d7");
 back.setAttribute("role","dialog");back.setAttribute("aria-modal","true");back.setAttribute("aria-label",title);x.setAttribute("aria-label","Close");
 head.append(h,x);box.appendChild(head);back.appendChild(box);doc.body.appendChild(back);
 var prev=doc.activeElement,api={body:box,onClose:null,close:function(){doc.removeEventListener("keydown",k);back.remove();if(api.onClose)api.onClose();if(prev&&prev.focus)prev.focus()}};
 function k(e){if(e.key==="Escape")api.close()}
 doc.addEventListener("keydown",k);x.onclick=api.close;back.addEventListener("pointerdown",function(e){if(e.target===back)api.close()});x.focus();return api}
function chips(parent,opts,cb){
 var w=el("div","hp-chips"),cur=opts[0];
 opts.forEach(function(o){var b=el("button","hp-chip",o);b.setAttribute("aria-pressed",o===cur);b.onclick=function(){cur=o;w.querySelectorAll("button").forEach(function(c){c.setAttribute("aria-pressed",c===b)});cb(o)};w.appendChild(b)});
 parent.appendChild(w)}

/* ---------- 4. search ---------- */
function goTo(it){
 var cfg=window.HP_CONFIG||{};if(cfg.openItem)return cfg.openItem(it);
 var n=it.n.toLowerCase(),c=[].slice.call(doc.querySelectorAll('[class*="card"],article')).filter(function(e){return e.offsetParent!==null&&e.textContent.toLowerCase().indexOf(n)>-1}).pop();
 if(!c){toast("Open the "+it.p+" period and press Explore to see "+it.n+".");return}
 c.scrollIntoView({behavior:"smooth",block:"center"});c.classList.add("hp-flash");setTimeout(function(){c.classList.remove("hp-flash")},2500)}
function search(){
 var m=modal("Search the museum"),inp=el("input","hp-in"),list=el("ul","hp-res"),per="All";
 inp.type="search";inp.placeholder="Civilization, figure or place";inp.setAttribute("aria-label","Search");m.body.appendChild(inp);
 chips(m.body,["All"].concat(D.periods),function(p){per=p;run()});m.body.appendChild(list);
 function run(){
  var q=inp.value.trim().toLowerCase();list.textContent="";
  var r=D.items.filter(function(i){return(per==="All"||i.p===per)&&(i.n+" "+i.r+" "+i.k+" "+i.p).toLowerCase().indexOf(q)>-1});
  if(!r.length){list.appendChild(el("li","hp-sub","Nothing matches. Try a shorter word or choose All."));return}
  r.forEach(function(i){var li=el("li"),b=el("button",null,i.n),s=el("small",null,(i.t==="fig"?"Figure":"Civilization")+", "+i.p+", "+i.r);b.appendChild(s);b.onclick=function(){m.close();goTo(i)};li.appendChild(b);list.appendChild(li)})}
 inp.addEventListener("input",run);run();inp.focus()}

/* ---------- 5. world map ---------- */
var libs;
function script(u){return new Promise(function(ok,no){var s=el("script");s.src=u;s.onload=ok;s.onerror=no;doc.head.appendChild(s)})}
function loadLibs(){return libs||(libs=Promise.all([script("https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"),script("https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js")]).then(function(){return fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")}).then(function(r){return r.json()}))}
function worldMap(){
 var m=modal("World map"),per="All",info=el("div","hp-info"),cv=el("canvas","hp-map"),on=true,drag=null,rot=[-30,-20],spin=true,hit=[];
 m.body.appendChild(el("p","hp-sub","Drag to turn the globe. Tap a pin to read about it."));
 chips(m.body,["All"].concat(D.periods),function(p){per=p});m.body.append(cv,info);
 info.textContent="Loading map...";m.onClose=function(){on=false};
 loadLibs().then(function(w){
  if(!on)return;info.textContent="Tap a pin to read about it.";
  var land=topojson.feature(w,w.objects.land),ctx=cv.getContext("2d"),proj=d3.geoOrthographic().clipAngle(90),path=d3.geoPath(proj,ctx),grat=d3.geoGraticule10(),W=0;
  function size(){var r=cv.getBoundingClientRect(),dpr=window.devicePixelRatio||1;W=r.width;cv.width=W*dpr;cv.height=r.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);proj.translate([r.width/2,r.height/2]).scale(Math.min(r.width,r.height)/2-6)}
  size();
  function draw(){
   if(!on)return;if(spin&&!drag)rot[0]+=.15;proj.rotate(rot);ctx.clearRect(0,0,cv.width,cv.height);
   ctx.beginPath();path({type:"Sphere"});ctx.fillStyle="#0b1020";ctx.fill();ctx.strokeStyle="rgba(212,175,55,.5)";ctx.stroke();
   ctx.beginPath();path(grat);ctx.strokeStyle="rgba(255,255,255,.07)";ctx.stroke();
   ctx.beginPath();path(land);ctx.fillStyle="#1b2540";ctx.fill();ctx.strokeStyle="rgba(255,255,255,.2)";ctx.stroke();
   hit=[];D.items.forEach(function(i){
    if(per!=="All"&&i.p!==per)return;
    if(d3.geoDistance([i.lo,i.la],[-rot[0],-rot[1]])>Math.PI/2)return;
    var p=proj([i.lo,i.la]);hit.push({i:i,x:p[0],y:p[1]});
    ctx.beginPath();ctx.arc(p[0],p[1],i.t==="fig"?4:6,0,7);ctx.fillStyle=D.colors[i.p];ctx.fill();ctx.strokeStyle="#0b1020";ctx.stroke()});
   requestAnimationFrame(draw)}
  draw();
  cv.addEventListener("pointerdown",function(e){drag={x:e.clientX,y:e.clientY,r:rot.slice(),moved:0};cv.setPointerCapture(e.pointerId)});
  cv.addEventListener("pointermove",function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.moved=Math.abs(dx)+Math.abs(dy);rot=[drag.r[0]+dx*.4,Math.max(-80,Math.min(80,drag.r[1]-dy*.4))]});
  cv.addEventListener("pointerup",function(e){
   var d=drag;drag=null;if(!d||d.moved>6)return;spin=false;
   var r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,best=null,bd=18;
   hit.forEach(function(h){var dd=Math.hypot(h.x-x,h.y-y);if(dd<bd){bd=dd;best=h.i}});
   if(!best)return;info.textContent="";var t=el("strong",null,best.n),s=el("span","hp-sub",best.p+", "+best.r),b=el("p",null,best.b),g=el("button","hp-go","Find on the site");g.onclick=function(){m.close();goTo(best)};info.append(t,s,b,g)});
  window.addEventListener("resize",size);
 }).catch(function(){info.textContent="The map could not load. Check your connection and try again."})}

/* ---------- 6. quiz ---------- */
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function quiz(){
 var m=modal("Quiz hall"),body=el("div");m.body.appendChild(body);menu();
 function menu(){
  body.textContent="";var best=store.get("hp_best");
  body.appendChild(el("p","hp-sub","Choose a period. "+(best?"Best score: "+best+".":"")));
  chips(body,["All"].concat(D.periods),function(p){per=p});var per="All",go=el("button","hp-go","Start quiz");go.onclick=function(){start(per)};body.appendChild(go)}
 function start(p){
  var qs=shuffle(D.quiz.filter(function(q){return p==="All"||q.p===p})),n=0,score=0;next();
  function next(){
   body.textContent="";if(n>=qs.length)return done();
   var q=qs[n];body.appendChild(el("p","hp-sub","Question "+(n+1)+" of "+qs.length));body.appendChild(el("p","hp-q",q.q));
   var w=el("div","hp-opts"),fb=el("p");body.append(w,fb);
   shuffle(q.o.map(function(t,i){return{t:t,i:i}})).forEach(function(o){var b=el("button","hp-opt",o.t);b.onclick=function(){
    w.querySelectorAll("button").forEach(function(x){x.disabled=true});
    if(o.i===q.a){score++;b.classList.add("ok");fb.textContent="Correct. "+q.e}else{b.classList.add("no");[].forEach.call(w.children,function(x){if(x.textContent===q.o[q.a])x.classList.add("ok")});fb.textContent="Not quite. "+q.e}
    var nb=el("button","hp-go",n+1<qs.length?"Next question":"See score");nb.onclick=function(){n++;next()};body.appendChild(nb);nb.focus()};w.appendChild(b)})}
  function done(){
   var key="hp_best";if(p==="All"&&score>(parseInt(store.get(key),10)||0))store.set(key,String(score));
   body.appendChild(el("p","hp-q","You scored "+score+" of "+qs.length+"."));
   var a=el("button","hp-go","Play again");a.onclick=menu;body.appendChild(a)}}}

/* ---------- dock ---------- */
function dock(){
 var d=el("div","hp-dock"),s=el("div","hp-snd"),v=el("input","hp-vol"),sb=el("button","hp-btn");
 v.type="range";v.min="0";v.max="1";v.step=".05";v.value=vol===null?1:vol;v.setAttribute("aria-label","Volume");
 v.oninput=function(){vol=parseFloat(v.value);store.set("hp_vol",vol);applySound()};
 function paint(){sb.textContent=muted?"\ud83d\udd07":"\ud83d\udd0a";sb.setAttribute("aria-label",muted?"Unmute sound":"Mute sound");sb.setAttribute("aria-pressed",muted)}
 sb.onclick=function(){muted=!muted;store.set("hp_mute",muted?"1":"0");applySound();paint()};paint();s.append(v,sb);
 function mk(t,l,f){var b=el("button","hp-btn",t);b.setAttribute("aria-label",l);b.onclick=f;return b}
 d.append(mk("\ud83d\udd0d","Search",search),mk("\ud83c\udf0d","World map",worldMap),mk("\u2753","Quiz hall",quiz),s);doc.body.appendChild(d);
 doc.querySelectorAll("audio,video").forEach(function(m){media.add(m)});applySound();
 doc.addEventListener("keydown",function(e){var t=e.target.tagName;if(/INPUT|TEXTAREA/.test(t))return;if(e.key==="/"||(e.key.toLowerCase()==="k"&&(e.ctrlKey||e.metaKey))){e.preventDefault();search()}})}

if(doc.readyState==="loading")doc.addEventListener("DOMContentLoaded",function(){perf();dock()});else{perf();dock()}
})();
