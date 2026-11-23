/* HISTORIA – Cold War interface renderer. Needs war-cold-data.js and war-cold.css. */
(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,timers=[],tlN=0,D=null;
var NAV=[["OVERVIEW","top"],["TIMELINE","c-tl"],["SUPERPOWERS","c-sp"],["ARMS RACE","c-ar"],["CONFLICTS","c-cf"],["ESPIONAGE","c-es"],["KEY FIGURES","c-kf"],["ARCHIVES","c-ac"]];
function yr(d){return(d.match(/\d{4}/)||[""])[0]}
function sec(id,y,l,cls,h){return'<section class="cws '+cls+'" id="'+id+'" data-y="'+y+'" data-l="'+l+'">'+h+"</section>"}
function head(code,t){return'<header class="c-h"><span class="c-code">'+code+"</span><h2>"+t+'</h2><i class="c-led on"></i></header>'}
function gauge(g,max){
  var a=-90+Math.min(1,g[1]/max)*180;
  return'<div class="c-gw"><svg viewBox="0 0 200 124" role="img" aria-label="'+g[0]+': '+g[2]+' warheads"><path d="M20 104A80 80 0 0 1 180 104" fill="none" stroke="#0c0e0d" stroke-width="16"/><path d="M20 104A80 80 0 0 1 180 104" fill="none" stroke="#d5a64a" stroke-width="3" stroke-dasharray="2 8.4"/><path d="M148 38A80 80 0 0 1 180 104" fill="none" stroke="#b94a43" stroke-width="5"/><g class="nd" style="--a:'+a+'deg"><path d="M98 104L100 28L102 104Z" fill="#d5c7a0"/></g><circle cx="100" cy="104" r="8" fill="#3a403c" stroke="#0c0e0d" stroke-width="3"/></svg><b>'+g[2]+"</b><small>"+g[0]+"</small></div>";
}
function html(d){
  D=d;var h="",i;
  h+=sec("top","1947","Overview","c-hero",'<div class="c-hw"><div class="c-mon"><div class="crt c-scr"><div class="c-tty" id="c-tty" aria-live="off"></div></div><div class="c-knobs"><i class="c-led on"></i><i class="c-led am"></i><i class="c-led"></i><span>MOD. KR-47</span></div></div>'+
  '<div class="c-side"><div class="c-radar" aria-hidden="true"><i></i><b style="top:30%;left:62%"></b><b style="top:64%;left:34%"></b><b style="top:48%;left:76%"></b></div><div class="c-cnt" role="img" aria-label="Years 1947 to 1991"><span id="c-yr">1947</span><em>—</em><span>1991</span></div></div></div>'+
  '<div class="c-tt"><div class="c-st"><span><i class="c-led on"></i>SYSTEM ACTIVE</span><span><i class="c-led am"></i>GLOBAL MONITORING</span><span><i class="c-led on"></i>HISTORICAL DATABASE</span></div><h1>THE COLD WAR</h1><p class="c-sub">A WORLD DIVIDED. AN ERA DEFINED BY TECHNOLOGY, IDEOLOGY AND GLOBAL CONFLICT.</p><p class="c-lead">'+d.lead+'</p><button class="mbtn" type="button" data-go="c-tl"><i></i>START EXPLORATION</button></div>'+
  '<div class="c-nav" role="group" aria-label="Sections">'+NAV.map(function(n,j){return'<button type="button" class="tgl'+(j?"":" on")+'" data-go="'+n[1]+'"><i></i><span>'+n[0]+"</span></button>"}).join("")+"</div>");
  /* timeline */
  h+=sec("c-tl","1947","Timeline","c-sc",head("MOD. 01 / CHRONOMETER","Timeline")+'<div class="pnl"><div class="c-scale" id="c-scale" role="tablist" aria-label="Events">'+d.tl.map(function(e,j){return'<button type="button" role="tab" aria-selected="'+(j===0)+'" data-t="'+j+'"><i class="c-led'+(j===0?" on":"")+'"></i><b>'+yr(e[0])+"</b></button>"}).join("")+'</div><div class="crt c-ev" id="c-ev"></div><div class="c-ctl"><button class="mbtn sm" type="button" data-step="-1"><i></i>PREV</button><span id="c-ix"></span><button class="mbtn sm" type="button" data-step="1"><i></i>NEXT</button></div></div>');
  /* superpowers */
  h+=sec("c-sp","1949","Superpowers","c-sc",head("MOD. 02 / TERMINALS","Superpowers")+'<div class="c-2">'+d.powers.map(function(p){return'<div class="pnl"><div class="crt c-pf"><b class="c-pc">'+p[0]+"</b><h3>"+p[1].toUpperCase()+"</h3><dl><dt>LEADERSHIP</dt><dd>"+p[2]+"</dd><dt>IDEOLOGY</dt><dd>"+p[3]+"</dd><dt>ALLIANCES</dt><dd>"+p[4]+"</dd><dt>MILITARY</dt><dd>"+p[5]+"</dd></dl></div></div>"}).join("")+"</div>");
  /* arms */
  h+=sec("c-ar","1967","Arms race","c-sc",head("MOD. 03 / GAUGES","Arms race")+'<div class="pnl c-gs">'+d.arms.g.map(function(g){return gauge(g,d.arms.max)}).join("")+'<p class="tw">'+d.arms.note+"</p></div>");
  /* conflicts */
  h+=sec("c-cf","1950","Conflicts","c-sc",head("MOD. 04 / SITUATION REPORTS","Conflicts")+d.conf.map(function(c,j){return'<article class="pnl c-sr"><div class="c-ph" data-w="'+c[5]+'"><div class="c-rd" aria-hidden="true"><i></i></div></div><div class="c-fl"><small>SITREP '+String(j+1).padStart(2,"0")+" / "+c[2].toUpperCase()+"</small><h3>"+c[0]+'</h3><span class="c-dt">'+c[1]+"</span><dl><dt>PARTIES</dt><dd>"+c[3]+"</dd><dt>OUTCOME</dt><dd>"+c[4]+"</dd></dl></div></article>"}).join(""));
  /* espionage */
  h+=sec("c-es","1953","Espionage","c-sc",head("MOD. 05 / INTERCEPTS","Espionage")+'<div class="c-3">'+d.spy.map(function(s,j){return'<div class="tw pap"><small>FILE '+String(j+1).padStart(3,"0")+"</small><h3>"+s[0]+"</h3><p>"+s[1]+"</p></div>"}).join("")+"</div>");
  /* figures */
  h+=sec("c-kf","1985","Key figures","c-sc",head("MOD. 06 / PERSONNEL","Key figures")+'<div class="c-3">'+d.figs.map(function(f){return'<article class="fid"><div class="c-ph por2" data-w="'+f[5]+'" role="img" aria-label="Portrait of '+f[0]+'"></div><h3>'+f[0]+"</h3><dl><dt>DESIGNATION</dt><dd>"+f[1]+"</dd><dt>COUNTRY</dt><dd>"+f[2]+"</dd><dt>PERIOD</dt><dd>"+f[3]+"</dd></dl><p>"+f[4]+"</p></article>"}).join("")+"</div>");
  /* archives */
  h+=sec("c-ac","1991","Archives","c-sc",head("MOD. 07 / ARCHIVE","Archives")+'<div class="c-3">'+d.after.map(function(a,j){return'<div class="fold"><span class="stamp2">DECLASSIFIED</span><small>FOLDER '+String(j+1).padStart(2,"0")+"</small><p>"+a+"</p></div>"}).join("")+'</div><div class="tw pap c-in"><small>REGIONAL FILE / SOUTH ASIA</small><h3>India and the Cold War</h3><p>'+d.india+"</p></div>");
  return h;
}
function ev(n){
  var e=D.tl[n],el=document.getElementById("c-ev");if(!el)return;tlN=n;
  el.classList.remove("boot");void el.offsetWidth;if(!reduce)el.classList.add("boot");
  el.innerHTML='<small>'+e[0].toUpperCase()+"</small><h3>&gt; "+e[1]+'<span class="cur">_</span></h3><p>'+e[2]+"</p>";
  document.getElementById("c-ix").textContent=String(n+1).padStart(2,"0")+" / "+D.tl.length;
  [].forEach.call(document.querySelectorAll("#c-scale button"),function(b,j){b.setAttribute("aria-selected",j===n);b.firstChild.classList.toggle("on",j===n);if(j===n)b.scrollIntoView({block:"nearest",inline:"center",behavior:reduce?"auto":"smooth"})});
}
var cache={};
function photo(el){
  var t=el.dataset.w;if(!t)return;
  (cache[t]=cache[t]||fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(t.replace(/ /g,"_"))).then(function(r){return r.ok?r.json():null}).catch(function(){return null})).then(function(o){
    var s=o&&o.thumbnail&&o.thumbnail.source;if(!s)return;
    var im=new Image();im.onload=function(){el.style.backgroundImage="url('"+s+"')";el.classList.add("pic")};im.src=s;
  });
}
function mount(root){
  ev(0);
  [].forEach.call(root.querySelectorAll(".c-ph"),photo);
  var tty=document.getElementById("c-tty"),yEl=document.getElementById("c-yr");
  var L=["> BOOT HISTORIA-KR47 ........ OK","> LOADING ARCHIVE 1947-1991 ... OK","> BLOCS: NATO / WARSAW PACT","> STATUS: TENSION HIGH","> AWAITING OPERATOR_"];
  if(reduce){tty.innerHTML=L.join("<br>");yEl.textContent="1947";return}
  var li=0,ci=0,out="";
  (function type(){
    if(!document.body.contains(tty))return;
    if(li>=L.length)return;
    if(ci<L[li].length){ci++;tty.innerHTML=out+L[li].slice(0,ci)+'<span class="cur">█</span>';timers.push(setTimeout(type,24))}
    else{out+=L[li]+"<br>";li++;ci=0;timers.push(setTimeout(type,260))}
  })();
  var y=1947;timers.push(setInterval(function(){y=y>=1991?1947:y+1;yEl.textContent=y},140));
}
function unmount(){timers.forEach(function(t){clearTimeout(t);clearInterval(t)});timers=[]}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-go],[data-t],[data-step]");if(!b||!document.getElementById("c-scale")&&!b.dataset.go)return;
  if(b.dataset.go){var s=document.getElementById(b.dataset.go);if(s)s.scrollIntoView({behavior:reduce?"auto":"smooth"});
    [].forEach.call(document.querySelectorAll(".c-nav .tgl"),function(t){t.classList.toggle("on",t===b)})}
  else if(D&&b.dataset.t)ev(+b.dataset.t);
  else if(D&&b.dataset.step)ev((tlN+ +b.dataset.step+D.tl.length)%D.tl.length);
});
window.WARCOLD={html:html,mount:mount,unmount:unmount};
})();
