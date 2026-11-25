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
function peaks(seed,base,hMin,hMax,n,fill,op,filt){
  var r=rng(seed),d="",i,x=-120;
  for(i=0;i<n;i++){var w=140+r()*180,h=hMin+r()*(hMax-hMin),cx=x+w*.5;
    d+="M"+x.toFixed(0)+" "+base+"L"+(x+w*.16).toFixed(0)+" "+(base-h*.4).toFixed(0)+"L"+(x+w*.3).toFixed(0)+" "+(base-h*.6).toFixed(0)+"L"+(cx-w*.05).toFixed(0)+" "+(base-h).toFixed(0)+"L"+(cx+w*.14).toFixed(0)+" "+(base-h*.72).toFixed(0)+"L"+(x+w*.78).toFixed(0)+" "+(base-h*.46).toFixed(0)+"L"+(x+w).toFixed(0)+" "+base+"Z";x+=w*.6}
  return'<path d="'+d+'" fill="'+fill+'" opacity="'+op+'"'+(filt?' filter="url(#'+filt+')"':"")+"/>"}
function pine(x,y,s){return'<g transform="translate('+x+" "+y+") scale("+s+')" fill="#14110e"><rect x="-1.5" y="0" width="3" height="26"/><path d="M0-26L13-6H-13Z"/><path d="M0-14L16 8H-16Z"/><path d="M0-2L19 20H-19Z"/></g>'}
function strokes(seed,x0,x1,y0,y1,n){var r=rng(seed),o="",i;for(i=0;i<n;i++){var x=x0+r()*(x1-x0),y=y0+r()*(y1-y0);o+="M"+x.toFixed(0)+" "+y.toFixed(0)+"l"+(r()*6-3).toFixed(1)+" "+(14+r()*34).toFixed(0)}return'<path d="'+o+'" stroke="#e9dfc9" stroke-opacity=".16" stroke-width="1.5" fill="none"/>'}
function hero(){
  var o='<svg class="tk-land" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><defs><filter id="tkb" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3"/></filter><filter id="tkm" x="-30%" y="-400%" width="160%" height="900%"><feGaussianBlur stdDeviation="26"/></filter><filter id="tkr" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".018 .055" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16"/><feGaussianBlur stdDeviation=".7"/></filter><linearGradient id="tkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#211D19" stop-opacity="0"/><stop offset="1" stop-color="#211D19"/></linearGradient></defs>';
  o+='<circle cx="1210" cy="190" r="74" fill="#8C302B" opacity=".5"/><circle cx="1210" cy="190" r="74" fill="none" stroke="#C6A46A" stroke-opacity=".25"/>';
  o+=peaks(3,470,330,520,9,"#8a7b66",.5,"tkb")+'<ellipse cx="500" cy="430" rx="620" ry="52" fill="#e9dfc9" opacity=".3" filter="url(#tkm)"/>';
  o+=peaks(8,540,260,460,9,"#5a4d40",.85,"tkr")+'<ellipse cx="1000" cy="520" rx="700" ry="56" fill="#e9dfc9" opacity=".28" filter="url(#tkm)"/>';
  o+=peaks(13,630,160,330,8,"#2f2822",.95,"tkr")+strokes(5,0,1600,380,640,260);
  o+='<g fill="#14110e" transform="translate(1080 410)"><path d="M-40 90H40V102H-40Z"/><path d="M-30 90V56M30 90V56M0 90V56" stroke="#14110e" stroke-width="3"/><path d="M-46 56Q0 40 46 56L34 44Q0 28-34 44Z"/><path d="M-30 44Q0 18 30 44L18 26Q0 6-18 26Z"/></g>';
  o+=pine(240,586,1.3)+pine(290,598,1)+pine(1390,596,1.4)+pine(1440,610,1.05)+pine(1340,614,.8);
  o+='<g transform="translate(700 650)"><path d="M-26 0Q0 10 26 0Z" fill="#14110e"/><path d="M0 0V-22" stroke="#14110e" stroke-width="2"/><path d="M0-22L14-6H0Z" fill="#14110e" opacity=".8"/></g>';
  o+=peaks(19,720,120,230,9,"#17130f",1,"tkr")+'<ellipse cx="800" cy="650" rx="900" ry="46" fill="#e9dfc9" opacity=".24" filter="url(#tkm)"/><rect y="450" width="1600" height="250" fill="url(#tkg)"/></svg>';
  return o;
}
function wdef(){
  var F='fill="currentColor"',S='fill="none" stroke="currentColor" stroke-linecap="round"',ban=function(id,ch){return'<symbol id="'+id+'" viewBox="0 0 100 200"><g '+F+'><rect x="18" y="18" width="4" height="180"/><circle cx="20" cy="14" r="6"/><path d="M24 30H94L82 62L94 94H24Z"/></g><path d="M20 12L8 0M20 12L32 0" '+S+' stroke-width="2"/><text x="58" y="74" text-anchor="middle" font-size="40" font-weight="700" font-family="Noto Serif SC,serif" fill="#211D19">'+ch+"</text></symbol>"};
  return'<svg class="tk-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>'+
  '<symbol id="tkw-ji" viewBox="0 0 100 200"><g '+F+'><rect x="48" y="34" width="4" height="164"/><path d="M50 0L57 30H43Z"/><path d="M52 36C88 32 92 74 62 88L52 76C72 70 74 52 52 50Z"/><rect x="44" y="30" width="12" height="6"/><path d="M50 188L42 200H58Z"/></g><path d="M45 38Q38 58 44 78" '+S+' stroke-width="2"/></symbol>'+
  '<symbol id="tkw-spear" viewBox="0 0 100 200"><g '+F+'><rect x="48.5" y="44" width="3" height="154"/><path d="M50 0C62 20 62 38 50 48C38 38 38 20 50 0Z"/><path d="M42 48H58L56 54H44Z"/></g><path d="M44 54Q34 82 40 100M56 54Q66 82 60 100" '+S+' stroke-width="2"/></symbol>'+
  '<symbol id="tkw-dao" viewBox="0 0 100 200"><g '+F+'><path d="M46 4H54L57 128H43Z"/><rect x="32" y="128" width="36" height="7" rx="2"/><rect x="47" y="135" width="6" height="34"/></g><circle cx="50" cy="182" r="12" '+S+' stroke-width="4"/></symbol>'+
  '<symbol id="tkw-jian" viewBox="0 0 100 200"><g '+F+'><path d="M50 0L58 122H42Z"/><rect x="28" y="122" width="44" height="8" rx="3"/><rect x="47" y="130" width="6" height="40"/><circle cx="50" cy="178" r="8"/></g></symbol>'+
  '<symbol id="tkw-nu" viewBox="0 0 100 200"><g '+S+' stroke-width="4"><path d="M4 70Q50 22 96 70"/><path d="M4 70L50 92L96 70" stroke-width="1.6"/></g><g '+F+'><rect x="45" y="66" width="10" height="126"/><rect x="38" y="84" width="24" height="26" rx="3"/><path d="M50 18L57 40H43Z"/></g><path d="M50 36V150" '+S+' stroke-width="2"/></symbol>'+
  '<symbol id="tkw-drum" viewBox="0 0 100 200"><g '+F+'><ellipse cx="50" cy="70" rx="38" ry="13"/><path d="M12 72V132Q50 152 88 132V72Q50 92 12 72Z" opacity=".85"/></g><path d="M12 90Q50 110 88 90M12 112Q50 132 88 112" '+S+' stroke="#211D19" stroke-width="2"/><path d="M22 140L8 196M78 140L92 196M50 148V196" '+S+' stroke-width="5"/></symbol>'+
  '<symbol id="tkw-cloud" viewBox="0 0 100 200"><g '+S+' stroke-width="3"><path d="M8 130C8 108 34 104 44 116C44 92 82 88 88 114C102 112 110 130 96 136H12Z"/><path d="M34 120C30 110 42 106 44 116M70 112C68 102 82 100 84 108"/></g></symbol>'+
  ban("tkw-bw","魏")+ban("tkw-bs","蜀")+ban("tkw-bu","吳")+"</defs></svg>";
}
var WS=["ji","dao","jian","nu","spear","drum","bw","bs","bu","cloud"];
function bgd(k){
  var r=rng(k*97+11),o="",i,used={};
  for(i=0;i<5;i++){var s;do{s=WS[Math.floor(r()*WS.length)]}while(used[s]);used[s]=1;
    var side=i%2,sz=190+r()*190,top=4+i*18+r()*8,rot=(r()*44-22).toFixed(0),off=2+r()*6;
    o+='<svg class="wm'+(i%3===1?" rd":"")+'" aria-hidden="true" style="'+(side?"right":"left")+":"+off.toFixed(1)+"%;top:"+top.toFixed(0)+"%;height:"+sz.toFixed(0)+"px;transform:rotate("+rot+'deg)"><use href="#tkw-'+s+'"/></svg>'}
  return'<div class="tk-bgd" aria-hidden="true">'+o+"</div>";
}
function palace(){
  var el=document.getElementById("tk-pal");if(el)return;
  var lan='<svg viewBox="0 0 40 90"><path d="M20 0V16" stroke="#C6A46A" stroke-width="1.5"/><rect x="12" y="14" width="16" height="5" fill="#C6A46A"/><path d="M20 19C42 22 42 64 20 68C-2 64-2 22 20 19Z" fill="#a8322b" stroke="#C6A46A" stroke-width="1.2"/><path d="M20 19V68M10 22C4 36 4 52 10 65M30 22C36 36 36 52 30 65" stroke="#e2b96f" stroke-width=".8" fill="none" opacity=".8"/><rect x="13" y="66" width="14" height="5" fill="#C6A46A"/><path d="M20 71V86M16 71V80M24 71V80" stroke="#C6A46A" stroke-width="1.2"/></svg>';
  el=document.createElement("div");el.id="tk-pal";el.setAttribute("aria-hidden","true");
  el.innerHTML='<i class="pl l"></i><i class="pl r"></i><i class="pt"></i><i class="pb"></i><span class="lw l">'+lan+'</span><span class="lw r">'+lan+"</span>";
  document.body.appendChild(el);document.documentElement.style.scrollPaddingTop="106px";
}
function unpalace(){var el=document.getElementById("tk-pal");if(el)el.remove();document.documentElement.style.scrollPaddingTop=""}
function seal(t,c){return'<span class="tk-seal'+(c?" "+c:"")+'" aria-hidden="true"><b>'+t+"</b></span>"}
function sec(id,y,l,cls,h,m){return'<section class="tks '+cls+'" id="'+id+'" data-y="'+y+'" data-l="'+l+'"><div class="tk-mt" aria-hidden="true"><svg viewBox="0 0 1600 200" preserveAspectRatio="none"><path d="'+ridge(m*5+2,170,110,10,1600).replace(/M0 600/,"M0 200").replace(/L1600 600Z/,"L1600 200Z")+'" fill="currentColor"/></svg></div>'+bgd(m)+'<div class="tk-w">'+h+"</div></section>"}
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
  h+='<section class="tks tk-hero" id="top" data-y="220" data-l="Overview">'+wdef()+hero()+'<div class="tk-ph tk-art" data-w="Travelers Among Mountains and Streams|Early Spring (painting)|Dwelling in the Fuchun Mountains|Shan shui" aria-hidden="true"><i></i></div><div class="tk-vei"></div>'+'<div class="tk-mist m1"></div><div class="tk-mist m2"></div><div class="tk-mist m3"></div><div class="tk-w tk-ht"><div class="tk-eb"><span>220 – 280 AD</span></div><h1 aria-label="The Three Kingdoms">'+(function(){var n=0;return"THE THREE KINGDOMS".split(" ").map(function(w){return'<span class="tk-wd">'+w.split("").map(function(c){return'<span style="--i:'+(n++)+'">'+c+"</span>"}).join("")+"</span>"}).join(" ")})()+'</h1><p class="tk-sub">An empire divided. Three kingdoms rising.</p><p class="tk-lead">'+d.lead+'</p><button class="tk-btn" type="button" data-go="tk-kg">'+seal("三國","sm")+'<span>Enter the Three Kingdoms</span></button></div><nav class="tk-nav" aria-label="Chapters">'+NAV.map(function(n){return'<button type="button" data-go="'+n[2]+'"><i>'+n[0]+"</i><span>"+n[1]+"</span></button>"}).join("")+"</nav></section>";
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
  palace();photos(root);
  var rv=root.querySelectorAll(".tk-rv");
  if(reduce||!window.IntersectionObserver){[].forEach.call(rv,function(e){e.classList.add("vis")})}
  else{io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})},{threshold:.08});[].forEach.call(rv,function(e){io.observe(e)})}
  fd(0);ev(0);sel=-1;pn(-1);
  var last=innerWidth;rz=function(){if(innerWidth!==last){last=innerWidth;map()}};addEventListener("resize",rz);
}
function unmount(){unpalace();if(io){io.disconnect();io=null}if(rz){removeEventListener("resize",rz);rz=null}}
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
