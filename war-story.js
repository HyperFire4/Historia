/* HISTORIA – "Read the full story" section. Text lives in war-story-data.js. */
(function(){
"use strict";
var DATA=window.WAR_STORY||{};
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}
function words(a){return a.join(" ").replace(/<[^>]+>/g," ").split(/\s+/).filter(Boolean).length}
var S=null;

function has(k){return!!DATA[k]}
function html(k){
  var d=DATA[k],toc="",body="",n=0,all=[];
  d.sections.forEach(function(s){
    all=all.concat(s.p);(s.sub||[]).forEach(function(b){all=all.concat(b.p)});
    if(s.h){
      n++;toc+='<li><a href="#st-'+s.id+'" data-t="st-'+s.id+'"><span>'+n+"</span>"+esc(s.h)+"</a></li>";
    }
    body+='<section class="sec" id="st-'+s.id+'">'+(s.h?'<h2><span class="hn">'+n+"</span>"+esc(s.h)+"</h2>":"")+
      s.p.map(function(p){return"<p>"+p+"</p>"}).join("")+
      (s.sub||[]).map(function(b){return"<h3>"+esc(b.h)+"</h3>"+b.p.map(function(p){return"<p>"+p+"</p>"}).join("")}).join("")+
      "</section>";
  });
  toc+='<li><a href="#st-terms" data-t="st-terms"><span>★</span>Key terms</a></li>';
  var mins=Math.max(1,Math.round((words(all)+words(d.terms.map(function(t){return t[1]})))/200));
  var info='<aside class="info"><h4>'+esc(d.title)+"</h4><dl>"+d.info.map(function(r){return"<dt>"+esc(r[0])+"</dt><dd>"+esc(r[1])+"</dd>"}).join("")+"</dl></aside>";
  var terms='<section class="sec" id="st-terms"><h2><span class="hn">★</span>Key terms</h2><dl class="terms">'+
    d.terms.map(function(t){return"<div><dt>"+esc(t[0])+"</dt><dd>"+esc(t[1])+"</dd></div>"}).join("")+"</dl></section>";
  return'<section class="story" id="story" data-y="'+esc(d.years)+'" data-l="The full story">'+
    '<div class="sthead"><span>Read the full story</span><h2>'+esc(d.title)+"</h2><p>"+esc(d.sub)+" · about "+mins+" min read</p></div>"+
    '<div class="stwrap">'+
      '<nav class="stoc" aria-label="Contents"><details open><summary>Contents</summary><ol>'+toc+'</ol></details><i class="sbar"><b></b></i></nav>'+
      '<article class="sart">'+info+body+terms+'<p class="snote">'+esc(d.note)+'</p><button type="button" class="stop">↑ Back to the top of the article</button></article>'+
    "</div></section>";
}

function mount(){
  unmount();
  var root=document.getElementById("story");
  if(!root)return;
  S={root:root,heads:[].slice.call(root.querySelectorAll(".sec")),links:[].slice.call(root.querySelectorAll(".stoc a")),
     bar:root.querySelector(".sbar b"),fns:[],tick:false};
  var mobile=matchMedia("(max-width:860px)");
  if(mobile.matches){var dt=root.querySelector(".stoc details");if(dt)dt.removeAttribute("open")}
  function on(t,ev,fn,o){t.addEventListener(ev,fn,o);S.fns.push([t,ev,fn,o])}
  /* contents links scroll inside the page without touching the #ww1 / #ww2 address */
  on(root,"click",function(e){
    var a=e.target.closest(".stoc a");
    if(a){
      e.preventDefault();
      var t=document.getElementById(a.dataset.t);
      if(t){var y=t.getBoundingClientRect().top+window.scrollY-84;window.scrollTo({top:y,behavior:reduce?"auto":"smooth"})}
      if(mobile.matches){var dt2=root.querySelector(".stoc details");if(dt2)dt2.removeAttribute("open")}
      return;
    }
    if(e.target.closest(".stop")){
      var h=root.querySelector(".sthead");
      window.scrollTo({top:h.getBoundingClientRect().top+window.scrollY-70,behavior:reduce?"auto":"smooth"});
    }
  });
  on(window,"scroll",function(){
    if(S.tick)return;S.tick=true;
    requestAnimationFrame(function(){if(!S)return;S.tick=false;spy()});
  },{passive:true});
  on(window,"resize",spy,{passive:true});
  /* sections fade in as you read */
  if(!reduce&&window.IntersectionObserver){
    S.io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");S.io.unobserve(en.target)}})},{rootMargin:"0px 0px -8% 0px",threshold:.05});
    S.heads.forEach(function(s){S.io.observe(s)});
  }else S.heads.forEach(function(s){s.classList.add("in")});
  spy();
}
function unmount(){
  if(!S)return;
  S.fns.forEach(function(f){f[0].removeEventListener(f[1],f[2],f[3])});
  if(S.io)S.io.disconnect();
  S=null;
}
/* highlight the contents entry for the section being read + article progress */
function spy(){
  if(!S)return;
  var cur=null,i,r;
  for(i=0;i<S.heads.length;i++){
    r=S.heads[i].getBoundingClientRect();
    if(r.top<innerHeight*.35)cur=S.heads[i].id;else break;
  }
  S.links.forEach(function(a){
    var on=a.dataset.t===cur;
    if(on!==a.classList.contains("on")){a.classList.toggle("on",on);if(on)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")}
  });
  var art=S.root.querySelector(".sart"),ar=art.getBoundingClientRect(),
      p=Math.max(0,Math.min(1,(innerHeight*.3-ar.top)/Math.max(1,ar.height-innerHeight*.3)));
  S.bar.style.transform="scaleY("+p+")";
}

window.WARSTORY={has:has,html:html,mount:mount,unmount:unmount};
})();
