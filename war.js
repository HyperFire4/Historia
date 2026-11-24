(function(){
"use strict";
var D=window.WAR_DATA,IMG=window.WAR_IMG||{};
var $=function(s){return document.querySelector(s)};
var main=$("#main"),rail=$("#rail"),hud=$("#hud"),tabs=document.querySelectorAll(".tabs button");
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,cur="",slides=[],idx=0,busy=false,io,io2;
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")};
function rng(s){s=Math.abs(Math.floor(s))||1;return function(){s=s*16807%2147483647;return(s-1)/2147483646}}

/* torn paper edge as a clip-path polygon (side = which edge is torn; m = mobile, torn at the bottom) */
function edge(side,s,m){
  var r=rng(s*977+13),p=[],n=24,i;
  function d(){var v=3+r()*9;if(r()>.82)v+=r()*9;return v}
  if(m){p.push("0 0","100% 0");for(i=n;i>=0;i--)p.push((i/n*100)+"% "+(100-d()*.8)+"%")}
  else if(side==="l"){p.push("100% 0","100% 100%");for(i=n;i>=0;i--)p.push(d()+"% "+(i/n*100)+"%")}
  else{p.push("0 0");for(i=0;i<=n;i++)p.push((100-d())+"% "+(i/n*100)+"%");p.push("0 100%")}
  return"polygon("+p.join(",")+")";
}

/* drawn archive-style scenes, used when no real photo is supplied */
function row(r,y,sc,n,helm,op){
  var o="",i,x,h;
  for(i=0;i<n;i++){x=i*(420/n)+r()*14;h=sc*(.85+r()*.3);
    o+='<g transform="translate('+x.toFixed(0)+' '+y+') scale('+h.toFixed(2)+')" fill="#0a0a0c" opacity="'+op+'"><path d="M-9 0L-8-30Q0-40 8-30L9 0Z"/><circle cy="-38" r="6"/>'+(helm?'<path d="M-9-39Q0-52 9-39Z"/>':"")+"</g>"}
  return o;
}
function art(k,s){
  var r=rng(s*31+7),o="",i;
  o+='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dadada"/><stop offset=".65" stop-color="#777"/><stop offset="1" stop-color="#222"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="7"/></filter></defs><rect width="400" height="300" fill="url(#g)"/>';
  o+='<circle cx="'+((70+r()*260)|0)+'" cy="'+((50+r()*50)|0)+'" r="'+((24+r()*20)|0)+'" fill="#fff" opacity=".6" filter="url(#b)"/>';
  for(i=0;i<5;i++)o+='<ellipse cx="'+((r()*400)|0)+'" cy="'+((90+r()*120)|0)+'" rx="'+((40+r()*50)|0)+'" ry="'+((14+r()*18)|0)+'" fill="#111" opacity=".28" filter="url(#b)"/>';
  if(k==="ship"){
    o+='<rect y="190" width="400" height="110" fill="#1b1b1b"/><path d="M50 190H350L326 216H78Z" fill="#0b0b0b"/><rect x="150" y="160" width="90" height="30" fill="#0b0b0b"/><rect x="100" y="170" width="3" height="20" fill="#0b0b0b"/>';
    for(i=0;i<3;i++)o+='<rect x="'+(165+i*28)+'" y="136" width="14" height="28" fill="#0b0b0b"/><ellipse cx="'+(172+i*38)+'" cy="118" rx="32" ry="12" fill="#222" opacity=".5" filter="url(#b)"/>';
    for(i=0;i<9;i++)o+='<path d="M'+((r()*400)|0)+" "+(225+i*8)+"h"+((30+r()*50)|0)+'" stroke="#999" stroke-width="1.5" opacity=".5"/>';
  }else if(k==="sky"){
    for(i=0;i<3;i++){var x=60+i*130+r()*40|0;o+='<path d="M'+x+" 300L"+(x-14)+" 0L"+(x+24)+' 0Z" fill="#fff" opacity=".16"/>'}
    for(i=0;i<6;i++)o+='<g transform="translate('+((r()*380)|0)+" "+((30+r()*110)|0)+") rotate("+((r()*40-20)|0)+") scale("+(.8+r()*.9).toFixed(2)+')" fill="#0b0b0b"><path d="M0-10L3-2L16 2V5L3 4L2 12L6 14V16H-6V14L-2 12L-3 4L-16 5V2L-3-2Z"/></g>';
    for(i=0;i<18;i++){var h=20+r()*70|0;o+='<rect x="'+(i*23)+'" y="'+(300-h)+'" width="'+(14+r()*12|0)+'" height="'+h+'" fill="#0c0c0c"/>'}
  }else{
    var c=k==="troops";
    o+=row(r,310,1.7,8,c,1)+row(r,255,1.05,13,c,.75)+row(r,205,.62,19,c,.5);
  }
  return"url('data:image/svg+xml,"+encodeURIComponent(o+"</svg>")+"')";
}
function kind(t){
  return/Gallipoli|Midway|Pearl|Dunkirk|Jutland|Missouri/i.test(t)?"ship":
  /Britain|Hiroshima/i.test(t)?"sky":
  /Treaty|Armistice|Brest|Assassination|Quit India|Victory|surrender|Versailles/i.test(t)?"crowd":"troops";
}
function pi(title,k,s){
  var img=IMG[title];
  return'<div class="pi" style="background-image:'+art(k,s)+'">'+(img?'<img src="'+esc(img)+'" alt="'+esc(title)+'" loading="lazy" onload="this.classList.add(&quot;ok&quot;)" onerror="this.remove()">':"")+"</div>";
}
function photo(title,side,s,second){
  var st="--clip:"+edge(side,s)+";--clipm:"+edge(side,s,1)+";--clip2:"+edge(side,s+5)+";--clipm2:"+edge(side,s+5,1)+";--dx:"+(side==="l"?"-1.6%":"1.6%")+";--rx:"+(side==="l"?"60px":"-60px");
  var k=kind(title);if(second)k=k==="sky"?"troops":k==="ship"?"sky":"crowd";
  var has=IMG[title];
  return'<div class="pw'+(second?" two":"")+'" style="'+st+'"'+(has?"":' aria-hidden="true"')+'><i class="pb"></i><div class="ph">'+pi(title,k,s)+"</div></div>";
}
function split(d){var y=d.match(/\d{4}/g)||[""];return[y[0],y.length>1?d:d.replace(/\s*\d{4}/,"").trim()]}
function sl(t,id,y,label,html,g){return'<section class="sl '+t+'" id="'+id+'" data-y="'+y+'" data-l="'+esc(label)+'"'+(g?' data-g="'+esc(g)+'"':"")+">"+html+"</section>"}
function dated(e){var y=split(e[0]);return'<div class="yr">'+y[0]+'</div><div class="dt">'+y[1]+"</div><p>"+e[2]+'</p><div class="stars">* * *</div><h3>'+e[1]+"</h3>"}

function evA(e,n){var y=split(e[0]);return sl("a","s"+n,y[0],e[1],'<div class="tx">'+dated(e)+"</div>"+photo(e[1],"l",n+3))}
function evC(e,n){
  var y=split(e[0]),k=kind(e[1]);
  return sl("c","s"+n,y[0],e[1],'<div class="tx">'+dated(e)+'</div><div class="doc"><b class="stamp">'+y[0]+'</b><div class="dph">'+pi(e[1],k,n+9)+'</div><div class="dl"><b>'+e[1]+"</b><span>"+y[1]+"</span></div></div>",e[2]);
}
function mid(id,y,label,head,text,foot,n){
  return sl("b",id,y,label,photo(label,"r",n)+'<div class="tx"><h3 class="top">'+head+'</h3><i class="rl"></i><p>'+text+'</p><div class="stars">* * *</div>'+foot+"</div>"+photo(label+"#2","l",n+4,1));
}
function evB(e,n){var y=split(e[0]);return mid("s"+n,y[0],e[1],e[1],e[2],'<h3 class="foot">'+e[0]+"</h3>",n)}

function build(k){
  var d=D[k];if(d.cold&&window[d.mod||"WARCOLD"])return window[d.mod||"WARCOLD"].html(d);var h=[],n=1,y0=d.years.match(/\d{4}/)[0],yl=d.years.match(/\d{4}/g).pop(),i;
  h.push(sl("a cover","top",y0,d.name,'<div class="tx"><div class="yr">'+d.years+"</div><h1>"+d.name+'</h1><p class="lead">'+d.lead+'</p><div class="st">'+d.stats.map(function(s){return"<div><b>"+s[0]+"</b><span>"+s[1]+"</span></div>"}).join("")+'</div><p class="fine">*Figures are estimates and vary by source.</p></div>'+photo(d.name,"l",7)+'<div class="clf" aria-hidden="true">Declassified<small>Archive file '+y0+'</small></div><div class="cue" aria-hidden="true"><span></span>Scroll</div>'));
  h.push(mid("origins",y0,"Origins of "+d.name,"How it began",d.why,d.sides.map(function(s){return"<h4>"+s[0]+'</h4><p class="sd">'+s[1]+"</p>"}).join(""),11));
  d.tl.forEach(function(e,j){n++;h.push([evA,evC,evB][j%3](e,n+j*2))});
  d.battles.forEach(function(b,j){
    var y=(b[1].match(/\d{4}/)||[yl])[0];
    h.push(mid("bt"+j,y,b[0],b[0],b[2],'<div class="big">'+b[3]+"</div><small>"+b[4]+'</small><h3 class="foot">'+b[1]+"</h3>",40+j*3));
  });
  h.push(sl("c ld","leaders",yl,"Leaders",'<div class="tx"><h3 class="top">Leaders</h3><i class="rl"></i><p class="hint">Drag or scroll sideways to meet them all →</p><div class="cnav"><button type="button" data-d="-1" aria-label="Previous leader">‹</button><button type="button" data-d="1" aria-label="Next leader">›</button></div></div><div class="cards">'+d.leaders.map(function(l,j){return'<article class="idc" style="--r:'+(j%2?2:-2)+'deg"><div class="ih"><span>Service record</span><span>'+d.years+'</span></div><div class="por" data-w="'+esc(l[3]||"")+'" role="img" aria-label="Portrait of '+esc(l[0])+'"></div><h3>'+l[0]+"</h3><small>"+l[1]+"</small><p>"+l[2]+"</p></article>"}).join("")+"</div>"));
  h.push(sl("a end","after",yl,"Aftermath",'<div class="tx"><h3 class="top">Aftermath</h3><i class="rl"></i><ul class="al">'+d.after.map(function(a){return"<li>"+a+"</li>"}).join("")+'</ul></div><div class="doc india"><div class="dl"><b>India and the war</b></div><p>'+d.india+"</p></div>"));
  if(window.WARMAP&&WARMAP.has(k))h.push(WARMAP.html(k));        /* the map sits right above the story */
  if(window.WARSTORY&&WARSTORY.has(k))h.push(WARSTORY.html(k));
  return h.join("");
}

var pc={};
function portrait(el){
  var t=el.dataset.w;if(!t)return;
  (pc[t]=pc[t]||fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+encodeURIComponent(t.replace(/ /g,"_"))).then(function(r){return r.ok?r.json():null}).catch(function(){return null})).then(function(o){
    var s=o&&o.thumbnail&&o.thumbnail.source;if(!s)return;
    var im=new Image();im.onload=function(){el.style.setProperty("--im","url('"+s+"')");el.classList.add("pic")};im.src=s;
  });
}
function act(el){
  hud.innerHTML="<b>"+el.dataset.y+"</b><small>"+el.dataset.l+"</small>";
  var i=slides.indexOf(el);idx=i;document.body.classList.toggle("instory",el.classList.contains("story"));slides.forEach(function(s){s.classList.toggle("cur",s===el)});
  [].forEach.call(rail.children,function(b,j){b.classList.toggle("on",j===i)});
}
function render(k){
  var d=D[k];if(!d)return;
  cur=k;document.body.dataset.war=k;document.title=d.name+" — HISTORIA";
  document.querySelector("meta[name=theme-color]").content=k==="ww1"?"#15140e":k==="cw"?"#171B19":k==="nw"?"#211C18":k==="tk"?"#211D19":"#0e1220";
  tabs.forEach(function(b){var on=b.dataset.k===k;b.setAttribute("aria-selected",on);if(on&&b.scrollIntoView)b.scrollIntoView({inline:"center",block:"nearest"})});
  if(io)io.disconnect();if(io2)io2.disconnect();
  if(window.WARMAP)WARMAP.unmount();if(window.WARSTORY)WARSTORY.unmount();if(window.WARCOLD)WARCOLD.unmount();if(window.WARNAP)WARNAP.unmount();if(window.WARTK)WARTK.unmount();
  main.innerHTML=(d.cold&&!window[d.mod||"WARCOLD"])?'<section class="sl a" data-y="1947" data-l="Module"><div class="tx"><h3>Module not loaded</h3><p>Upload the script, data and css files for this tab next to war.html.</p></div></section>':build(k);
  slides=[].slice.call(main.children);
  rail.innerHTML=slides.map(function(s,i){return'<button data-i="'+i+'" aria-label="'+esc(s.dataset.l)+'"><span>'+esc(s.dataset.l)+"</span></button>"}).join("");
  io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");act(en.target)}})},{threshold:.4});
  /* normal slides reveal at 40% visibility; tall sections (map, story) manage themselves */
  io2=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!en.target.classList.contains("mapwrap"))act(en.target)})},{threshold:.02});
  function reveal(){
    slides.forEach(function(s){
      if(s.classList.contains("sl")){reduce?s.classList.add("in"):io.observe(s)}
      else{s.classList.add("in");io2.observe(s)}
    });
  }
  /* while the gate is closed the page is built behind it; reveal animations wait for the doors to open */
  if(window.WARGATE&&WARGATE.opened)WARGATE.opened(reveal);else reveal();
  if(d.cold){var M=window[d.mod||"WARCOLD"];if(M)M.mount(main);else console.warn("HISTORIA: the module for "+k+" is not loaded.")}
  else if(window.WARMAP&&WARMAP.has(k))WARMAP.mount(k);
  if(!d.cold&&window.WARSTORY&&WARSTORY.has(k))WARSTORY.mount(k);
  [].forEach.call(main.querySelectorAll(".por"),portrait);
  window.scrollTo({top:0,behavior:"instant"});
  act(slides[0]);
  if(window.WARFX&&!d.cold)WARFX.set(k);
}
function go(k){
  if(k===cur||!D[k]||busy)return;
  history.replaceState(null,"","#"+k);
  if(reduce){render(k);return}
  busy=true;
  var f=$("#flash");f.classList.remove("go");void f.offsetWidth;f.classList.add("go");
  setTimeout(function(){render(k)},400);
  setTimeout(function(){busy=false},1000);
}
tabs.forEach(function(b){b.addEventListener("click",function(){go(b.dataset.k)})});
rail.addEventListener("click",function(e){var b=e.target.closest("button");if(b)slides[b.dataset.i].scrollIntoView({behavior:reduce?"auto":"smooth"})});
addEventListener("hashchange",function(){go(location.hash.slice(1))});

var tick=false;
addEventListener("scroll",function(){
  if(tick)return;tick=true;
  requestAnimationFrame(function(){
    tick=false;
    var h=document.documentElement,vh=innerHeight;
    $("#prog").style.transform="scaleX("+(h.scrollTop/(h.scrollHeight-h.clientHeight||1))+")";
  });
},{passive:true});

/* leaders: arrow buttons + mouse drag */
main.addEventListener("click",function(e){
  var b=e.target.closest(".cnav button");if(!b)return;
  var c=main.querySelector(".cards");if(c)c.scrollBy({left:b.dataset.d*280,behavior:reduce?"auto":"smooth"});
});
(function(){
  var dn=0,sx=0,s0=0,c=null;
  main.addEventListener("pointerdown",function(e){
    if(e.pointerType!=="mouse"||e.button)return;
    c=e.target.closest(".cards");if(!c)return;
    dn=1;sx=e.clientX;s0=c.scrollLeft;c.classList.add("drag");
  });
  addEventListener("pointermove",function(e){if(dn)c.scrollLeft=s0-(e.clientX-sx)});
  addEventListener("pointerup",function(){if(!dn)return;dn=0;c.classList.remove("drag")});
})();
/* chapter-by-chapter keyboard navigation */
addEventListener("keydown",function(e){
  if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||document.body.classList.contains("gated")||(D[cur]&&D[cur].cold))return;
  var d={ArrowDown:1,PageDown:1,ArrowUp:-1,PageUp:-1}[e.key];if(!d)return;
  var cs=slides[idx];
  if(cs&&cs.classList.contains("story"))return;                 /* reading: normal scrolling */
  if(window.WARMAP&&WARMAP.key(d)){e.preventDefault();return}   /* map: step through time */
  e.preventDefault();
  var t=Math.max(0,Math.min(slides.length-1,idx+d));
  if(slides[t])slides[t].scrollIntoView({behavior:reduce?"auto":"smooth"});
});

window.WAR={act:act};
["WARMAP","WARSTORY"].forEach(function(n){if(!window[n])console.warn("HISTORIA: "+n+" is not loaded. Check that war-"+(n==="WARMAP"?"map":"story")+".js (and its data file) are uploaded next to war.html.")});
var start=D[location.hash.slice(1)]?location.hash.slice(1):"ww1";
document.body.dataset.war=start;
if(window.WARGATE){WARGATE.run(function(){render(start)})}
else{var g=$("#gate");if(g)g.remove();document.body.classList.remove("gated");render(start)}
})();
