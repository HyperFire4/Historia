/* HISTORIA – Napoleonic Wars interface renderer. Needs war-nap-data.js and war-nap.css. */
(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,D=null,io=null,cur=0,rz=null,sid=0;
var NAV=[["I","The Era","nw-era"],["II","Campaigns","nw-camp"],["III","Great Battles","nw-bat"],["IV","Commanders","nw-cmd"],["V","The Armies","nw-arm"],["VI","The Aftermath","nw-aft"]];
var KX=20.07,KY=30,SERIF='"IM Fell English",Georgia,serif',BOD='"Bodoni Moda",Georgia,serif';
function P(lo,la){return[lo*KX,-la*KY]}
function star(cx,cy,R,r,n){var p=[],i,a;for(i=0;i<n*2;i++){a=Math.PI*i/n-Math.PI/2;var q=i%2?r:R;p.push((cx+q*Math.cos(a)).toFixed(1)+","+(cy+q*Math.sin(a)).toFixed(1))}return p.join(" ")}
/* shared engraved ornaments, drawn once and reused with <use> */
function defs(){
  var rose="",i;for(i=0;i<16;i++){var a=i*22.5;rose+='<line x1="100" y1="100" x2="100" y2="6" transform="rotate('+a+' 100 100)" stroke-width="'+(i%4?.6:1.2)+'"/>'}
  var sc="";for(i=0;i<5;i++)sc+='<ellipse cx="50" cy="27" rx="9.5" ry="25" transform="rotate('+i*72+' 50 50)"/>';
  return'<svg class="nw-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>'+
  '<symbol id="nw-bee" viewBox="0 0 40 40"><ellipse cx="20" cy="23" rx="6" ry="10" fill="currentColor"/><path d="M14 20H26M14.5 25H25.5M16 30H24" stroke="#211C18" stroke-width="1.6"/><circle cx="20" cy="11" r="3.6" fill="currentColor"/><ellipse cx="11" cy="16" rx="8" ry="4" transform="rotate(-35 11 16)" fill="currentColor" opacity=".8"/><ellipse cx="29" cy="16" rx="8" ry="4" transform="rotate(35 29 16)" fill="currentColor" opacity=".8"/><path d="M18 8Q15 3 12 3M22 8Q25 3 28 3" stroke="currentColor" fill="none" stroke-width="1"/></symbol>'+
  '<symbol id="nw-corner" viewBox="0 0 120 120"><g fill="none" stroke="currentColor"><path d="M3 3H78M3 3V78" stroke-width="3"/><path d="M11 11H52M11 11V52" stroke-width="1"/><path d="M22 22C22 56 54 62 66 40C74 24 56 14 46 26C40 34 48 42 54 36" stroke-width="1.6"/><path d="M22 22C56 22 62 54 40 66C24 74 14 56 26 46C34 40 42 48 36 54" stroke-width="1.6"/></g><path d="M3 3L11 3L3 11Z" fill="currentColor"/><circle cx="22" cy="22" r="3.5" fill="currentColor"/></symbol>'+
  '<symbol id="nw-rosew" viewBox="0 0 200 200"><g fill="none" stroke="currentColor"><circle cx="100" cy="100" r="92" stroke-width="1.5"/><circle cx="100" cy="100" r="80"/><circle cx="100" cy="100" r="30"/>'+rose+'</g><polygon points="'+star(100,100,92,18,8)+'" fill="currentColor" opacity=".55"/><polygon points="'+star(100,100,60,14,8)+'" fill="none" stroke="currentColor"/></symbol>'+
  '<symbol id="nw-star" viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="2.4">'+sc+'<circle cx="50" cy="50" r="12"/></g></symbol>'+
  '<symbol id="nw-sabres" viewBox="0 0 120 120"><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M14 14L98 98M106 14L22 98" stroke-width="3"/><path d="M96 78L112 94M24 78L8 94" stroke-width="5"/><path d="M82 90L100 72M38 90L20 72" stroke-width="3"/></g></symbol>'+
  '<symbol id="nw-laurel" viewBox="0 0 200 40"><g fill="currentColor"><path d="M4 22Q100 4 196 22" fill="none" stroke="currentColor" stroke-width="1.5"/>'+(function(){var o="",k;for(k=0;k<9;k++){var x=14+k*21,y=19-Math.sin(k/8*Math.PI)*8;o+='<ellipse cx="'+x+'" cy="'+(y-5)+'" rx="3.4" ry="8" transform="rotate(-25 '+x+' '+(y-5)+')"/><ellipse cx="'+x+'" cy="'+(y+6)+'" rx="3.4" ry="8" transform="rotate(30 '+x+' '+(y+6)+')"/>'}return o})()+'</g></symbol>'+
  '</defs></svg>';
}
function bgd(k){
  var u=function(id,c){return'<svg class="'+c+'" viewBox="0 0 100 100" aria-hidden="true"><use href="#'+id+'"/></svg>'};
  return'<div class="nw-bgd" aria-hidden="true">'+u("nw-corner","cr tl")+u("nw-corner","cr tr")+u("nw-corner","cr bl")+u("nw-corner","cr br")+
  [u("nw-rosew","wm w1"),u("nw-star","wm w2"),u("nw-sabres","wm w3"),u("nw-rosew","wm w4"),u("nw-star","wm w5"),u("nw-sabres","wm w6")][k%6]+u("nw-bee","bee b1")+u("nw-bee","bee b2")+"</div>";
}
function sec(id,y,l,cls,h,k){return'<section class="nws '+cls+'" id="'+id+'" data-y="'+y+'" data-l="'+l+'">'+bgd(k||0)+'<div class="nw-in2">'+h+"</div></section>"}
function head(n,t,s){return'<header class="nw-h nw-rv"><span class="nw-no">'+n+'</span><h2>'+t+"</h2><p>"+s+'</p><div class="nw-dv"><i></i><svg viewBox="0 0 40 40" aria-hidden="true"><use href="#nw-bee"/></svg><i></i></div></header>'}
function fr(w,c){return'<div class="nw-fr"><div class="nw-ph '+(c||"")+'" data-w="'+w+'" role="img" aria-label="'+w.split("|")[0]+'"><i></i></div></div>'}
/* the imperial wax seal: irregular wax, embossed laurel wreath, crown and monogram */
function seal(t,big){
  var id="sg"+(++sid),i,a,r,pts=[],lv="",s,j;
  for(i=0;i<=90;i++){a=i/90*6.2832;r=52+2.8*Math.sin(7*a+1)+2*Math.sin(13*a)+1.2*Math.sin(23*a);pts.push((60+r*Math.cos(a)).toFixed(1)+","+(60+r*Math.sin(a)).toFixed(1))}
  for(s=-1;s<=1;s+=2)for(j=0;j<9;j++){a=(90+s*(14+j*17))*Math.PI/180;var x=60+37*Math.cos(a),y=63+37*Math.sin(a),ro=(90+s*(14+j*17))+90+s*18;
    lv+='<ellipse cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" rx="3.6" ry="7.6" transform="rotate('+ro+" "+x.toFixed(1)+" "+y.toFixed(1)+')"/>'}
  var mono=big?'<path d="M47 52L49 42L54 47L60 38L66 47L71 42L73 52Z" fill="#9a504a" stroke="#4c2422" stroke-width=".8"/><rect x="47" y="52" width="26" height="4" fill="#9a504a" stroke="#4c2422" stroke-width=".8"/><circle cx="49" cy="41" r="1.6"/><circle cx="60" cy="37" r="1.8"/><circle cx="71" cy="41" r="1.6"/>':"";
  var ty=big?84:72,fs=big?36:19;
  return'<svg class="nw-sealsvg" viewBox="0 0 120 120" role="img" aria-label="Imperial seal"><defs><radialGradient id="'+id+'" cx="36%" cy="30%" r="80%"><stop offset="0" stop-color="#b8645c"/><stop offset=".5" stop-color="#8a3f3a"/><stop offset="1" stop-color="#4f2321"/></radialGradient></defs>'+
  '<path d="M'+pts.join("L")+'Z" fill="url(#'+id+')" stroke="#3b1a18" stroke-width="1.5"/><circle cx="60" cy="60" r="45" fill="none" stroke="#3b1a18" stroke-opacity=".55" stroke-width="2"/><circle cx="60" cy="60" r="47" fill="none" stroke="#d58f86" stroke-opacity=".35" stroke-width="1"/>'+
  '<g transform="translate(-.9 -.9)" fill="#d58f86" fill-opacity=".45">'+lv+'</g><g fill="#7b3732" stroke="#3b1a18" stroke-width=".6">'+lv+'</g>'+mono+
  '<text x="61" y="'+(ty+1.2)+'" text-anchor="middle" font-family="'+BOD+'" font-weight="700" font-size="'+fs+'" fill="#3b1a18" opacity=".8">'+t+'</text><text x="60" y="'+ty+'" text-anchor="middle" font-family="'+BOD+'" font-weight="700" font-size="'+fs+'" fill="#a5605a">'+t+"</text></svg>";
}
function html(d){
  var h="";
  h+=sec("top","1792","Overview","nw-hero",defs()+'<div class="nw-ht"><div class="nw-eyebrow"><span class="nw-comp" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width=".8"/><path d="M50 4V18M50 82V96M4 50H18M82 50H96" stroke="currentColor" stroke-width="2"/><g class="nw-nd"><path d="M50 14L56 50L50 86L44 50Z" fill="#B99A65"/><path d="M50 14L56 50L44 50Z" fill="#713B38"/></g><circle cx="50" cy="50" r="4" fill="#211C18" stroke="currentColor"/></svg></span><span>MDCCXCII — MDCCCXV</span></div><h1>The Napoleonic Wars</h1><p class="nw-sub">The Age of Empires</p><p class="nw-lead">'+d.lead+'</p><button class="nw-btn" type="button" data-go="nw-era"><span>Enter the Imperial Archives</span></button></div><div class="nw-hp">'+fr(d.hero,"nw-big")+'<div class="nw-seal">'+seal("N",1)+'</div></div><nav class="nw-nav" aria-label="Chapters">'+NAV.map(function(n){return'<button type="button" data-go="'+n[2]+'"><b>'+n[0]+"</b><span>"+n[1]+"</span></button>"}).join("")+"</nav>",0);
  h+=sec("nw-era","1792","The Era","nws-s",head("Chapter I","The Era","From Revolution to Empire")+d.era.map(function(e,i){return'<article class="nw-ch nw-rv'+(i%2?" rev":"")+'">'+fr(e[3])+'<div class="nw-pn"><small>'+e[1]+"</small><h3>"+e[0]+"</h3><p>"+e[2]+"</p></div></article>"}).join("")+'<ol class="nw-tl nw-rv" aria-label="Timeline">'+d.tl.map(function(t){return"<li><b>"+t[0]+"</b><span>"+t[1]+"</span></li>"}).join("")+"</ol>",1);
  h+=sec("nw-camp","1796","Campaigns","nws-s",head("Chapter II","Campaigns","The Atlas of Imperial Campaigns")+'<div class="nw-atlas nw-rv"><div class="nw-chips" role="tablist" aria-label="Campaigns">'+d.camps.map(function(c,i){return'<button type="button" role="tab" data-cm="'+i+'" aria-selected="'+(i===0)+'"><b>'+c[1]+"</b><span>"+c[0]+"</span></button>"}).join("")+'</div><div class="nw-mapw"><svg id="nw-map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Campaign map"></svg><div class="nw-cart" id="nw-cart"></div><div class="nw-sc" id="nw-sc"></div><div class="nw-rose" aria-hidden="true"><svg viewBox="0 0 200 200"><use href="#nw-rosew"/><path d="M100 4L108 28L92 28Z" fill="#713B38"/><text x="100" y="-2" text-anchor="middle" font-size="0"></text></svg></div></div><div class="nw-pn nw-ann" id="nw-ann"></div></div>',2);
  h+=sec("nw-bat","1805","Great Battles","nws-s",head("Chapter III","Great Battles","A Gallery of the Decisive Days")+'<div class="nw-g">'+d.bats.map(function(b){return'<article class="nw-bc nw-rv">'+fr(b[7])+'<div class="nw-bb"><small>'+b[1]+" · "+b[2]+"</small><h3>"+b[0]+"</h3><dl><dt>Armies</dt><dd>"+b[3]+"</dd><dt>Commanders</dt><dd>"+b[4]+"</dd><dt>Outcome</dt><dd>"+b[5]+"</dd></dl><p>"+b[6]+"</p></div></article>"}).join("")+"</div>",3);
  h+=sec("nw-cmd","1812","Commanders","nws-s",head("Chapter IV","Commanders","The Portrait Gallery")+'<div class="nw-g3">'+d.cmds.map(function(c){return'<article class="nw-cp nw-rv">'+fr(c[5],"nw-tall")+'<div class="nw-plate"><h3>'+c[0]+"</h3><small>"+c[1]+" · "+c[2]+"</small><em>"+c[3]+"</em></div><p>"+c[4]+"</p></article>"}).join("")+"</div>",4);
  h+=sec("nw-arm","1809","The Armies","nws-s",head("Chapter V","The Armies","The Military Archive")+'<div class="nw-g3">'+d.armies.map(function(a){return'<article class="nw-ar nw-rv"><div class="nw-ins" aria-hidden="true"><span>'+a[0]+"</span></div><h3>"+a[1]+"</h3><p>"+a[2]+"</p></article>"}).join("")+"</div>",5);
  h+=sec("nw-aft","1815","The Aftermath","nws-s",head("Chapter VI","The Aftermath","Waterloo, Vienna and the New Europe")+'<div class="nw-doc nw-rv"><div class="nw-pn"><small>Treaty and Final Act, 1815</small><ul>'+d.after.map(function(a){return"<li>"+a+"</li>"}).join("")+'</ul><div class="nw-seal sm">'+seal("1815")+'</div></div><div class="nw-pn nw-in"><small>South Asia</small><h3>India and the Napoleonic Wars</h3><p>'+d.india+"</p></div></div>",0);
  return h;
}
/* ---------- the antique map ---------- */
function ring(s){return s.split(" ").map(function(p){var q=p.split(",");var o=P(+q[0],+q[1]);return o[0].toFixed(1)+","+o[1].toFixed(1)}).join(" ")}
function line(s){return s.split(" ").map(function(p){var q=p.split(",");return P(+q[0],+q[1])})}
function camp(i){
  var c=D.camps[i],svg=document.getElementById("nw-map");if(!svg)return;cur=i;
  var r=svg.getBoundingClientRect(),W=r.width||600,H=r.height||420,pts=c[3].map(function(p){return P(p[1],p[2])}),x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
  pts.forEach(function(p){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});
  var w=Math.max(x1-x0,170)*1.6,hh=Math.max(y1-y0,120)*1.6,cx=(x0+x1)/2,cy=(y0+y1)/2;
  if(w/hh<W/H)w=hh*W/H;else hh=w*H/W;
  var u=w/W,vx=cx-w/2,vy=cy-hh/2,g=D.geo,o="",INK="#4a3a22";
  function vis(p,m){m=m||0;return p[0]>vx-m&&p[0]<vx+w+m&&p[1]>vy-m&&p[1]<vy+hh+m}
  o+='<defs><pattern id="nwh" width="'+7*u+'" height="'+4*u+'" patternUnits="userSpaceOnUse"><line x1="0" y1="'+2*u+'" x2="'+7*u+'" y2="'+2*u+'" stroke="#7c8a86" stroke-width="'+.55*u+'" opacity=".45"/></pattern><marker id="nwa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="'+14*u+'" markerHeight="'+14*u+'" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 1L9 5L0 9L2.5 5Z" fill="#713B38"/></marker></defs>';
  o+='<rect x="'+(vx-w)+'" y="'+(vy-hh)+'" width="'+3*w+'" height="'+3*hh+'" fill="#c8cdb7"/><rect x="'+(vx-w)+'" y="'+(vy-hh)+'" width="'+3*w+'" height="'+3*hh+'" fill="url(#nwh)"/>';
  [[-8,43],[20,37],[18,57]].forEach(function(cc){var q=P(cc[0],cc[1]);for(var k=0;k<16;k++){var an=k*Math.PI/8;o+='<line x1="'+q[0]+'" y1="'+q[1]+'" x2="'+(q[0]+4000*Math.cos(an))+'" y2="'+(q[1]+4000*Math.sin(an))+'" stroke="#6b5a3a" stroke-width="'+.7*u+'" opacity=".28"/>'}});
  for(var gd=-20;gd<=60;gd+=5){var ax=P(gd,0)[0];o+='<line x1="'+ax+'" y1="'+(vy-hh)+'" x2="'+ax+'" y2="'+(vy+2*hh)+'" stroke="#6b5a3a" stroke-width="'+.6*u+'" stroke-dasharray="'+2*u+' '+5*u+'" opacity=".5"/>'}
  for(gd=30;gd<=70;gd+=5){var ay=-gd*KY;o+='<line y1="'+ay+'" x1="'+(vx-w)+'" y2="'+ay+'" x2="'+(vx+2*w)+'" stroke="#6b5a3a" stroke-width="'+.6*u+'" stroke-dasharray="'+2*u+' '+5*u+'" opacity=".5"/>'}
  /* water-lining: ripples that fade away from every coast */
  g.land.forEach(function(l){var pr=ring(l);[[16,.16],[11,.2],[6.5,.26],[3,.34]].forEach(function(s){o+='<polygon points="'+pr+'" fill="none" stroke="#e8eadb" stroke-width="'+s[0]*u+'" stroke-linejoin="round" opacity="'+s[1]+'"/>'})});
  g.land.forEach(function(l){var pr=ring(l);o+='<polygon points="'+pr+'" fill="#eadcb8" stroke="'+INK+'" stroke-width="'+1.5*u+'" stroke-linejoin="round"/><polygon points="'+pr+'" fill="none" stroke="#b89a62" stroke-width="'+5*u+'" opacity=".22" stroke-linejoin="round"/>'});
  g.rivers.forEach(function(s){var q=line(s);if(!q.some(function(p){return vis(p,w)}))return;o+='<polyline points="'+q.map(function(p){return p[0].toFixed(1)+","+p[1].toFixed(1)}).join(" ")+'" fill="none" stroke="#5f7a86" stroke-width="'+1.5*u+'" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>'});
  g.ranges.forEach(function(s){var q=line(s),k,st=12*u,gl="";for(k=0;k<q.length-1;k++){var dx=q[k+1][0]-q[k][0],dy=q[k+1][1]-q[k][1],L=Math.hypot(dx,dy),n=Math.floor(L/st),m;for(m=0;m<=n;m++){var px=q[k][0]+dx*m/Math.max(n,1),py=q[k][1]+dy*m/Math.max(n,1);if(!vis([px,py],10*u))continue;var hgt=(6+((m*7+k*3)%4))*u;gl+='M'+(px-5*u).toFixed(1)+" "+(py+hgt/2).toFixed(1)+"L"+px.toFixed(1)+" "+(py-hgt).toFixed(1)+"L"+(px+5*u).toFixed(1)+" "+(py+hgt/2).toFixed(1)+"M"+px.toFixed(1)+" "+(py-hgt).toFixed(1)+"L"+(px+1.5*u).toFixed(1)+" "+(py+hgt/2).toFixed(1)}}
    if(gl)o+='<path d="'+gl+'" fill="none" stroke="#5a4a2e" stroke-width="'+1.1*u+'" stroke-linecap="round" opacity=".8"/>'});
  function txt(t,p,px,rot,fill,op,ls,it){if(!vis(p,0))return"";return'<text x="'+p[0].toFixed(1)+'" y="'+p[1].toFixed(1)+'" font-size="'+(px*u).toFixed(2)+'" text-anchor="middle" font-family="'+SERIF+'" '+(it?'font-style="italic" ':"")+'letter-spacing="'+(ls*u).toFixed(2)+'" fill="'+fill+'" opacity="'+op+'" transform="rotate('+rot+" "+p[0].toFixed(1)+" "+p[1].toFixed(1)+')">'+t+"</text>"}
  g.regions.forEach(function(t){var p=P(t[1],t[2]);o+=txt(t[0],p,t[3]*Math.max(1,Math.min(1.6,.5/Math.max(u,.3))),0,INK,.5,t[3]*.45,0)});
  g.seas.forEach(function(t){o+=txt(t[0],P(t[1],t[2]),t[3]*Math.max(1,Math.min(1.5,.5/Math.max(u,.3))),t[4],"#4d6470",.7,t[3]*.4,1)});
  var names={};c[3].forEach(function(p){names[p[0]]=1});
  g.cities.forEach(function(t){if(names[t[0]])return;var p=P(t[1],t[2]);if(!vis(p,0))return;o+='<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+2.6*u+'" fill="none" stroke="'+INK+'" stroke-width="'+1.1*u+'"/><circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="'+.9*u+'" fill="'+INK+'"/>'+txt(t[0],[p[0]+7*u+t[0].length*2.4*u,p[1]+3.5*u],11,0,INK,.9,0,1)});
  var rt=c[3].filter(function(p){return!p[5]}).map(function(p){var q=P(p[1],p[2]);return q[0].toFixed(1)+","+q[1].toFixed(1)}).join(" ");
  o+='<polyline id="nw-rt" points="'+rt+'" fill="none" stroke="#713B38" stroke-width="'+3*u+'" stroke-dasharray="'+9*u+' '+6*u+'" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#nwa)"/>';
  c[3].forEach(function(p,j){var q=P(p[1],p[2]),x=q[0],y=q[1];
    o+='<g class="nw-mk" tabindex="0" role="button" data-p="'+j+'" aria-label="'+p[0]+'"><circle cx="'+x+'" cy="'+y+'" r="'+20*u+'" fill="transparent"/><circle class="d" cx="'+x+'" cy="'+y+'" r="'+10*u+'" fill="#713B38" stroke="#211C18" stroke-width="'+1.6*u+'"/><circle cx="'+x+'" cy="'+y+'" r="'+7.6*u+'" fill="none" stroke="#d9bd84" stroke-width="'+.9*u+'"/><text x="'+x+'" y="'+(y+4*u)+'" text-anchor="middle" font-size="'+11*u+'" fill="#E7DCC5" font-family="'+BOD+'" font-weight="700">'+(j+1)+'</text><text x="'+(x+15*u)+'" y="'+(y+4.5*u)+'" font-size="'+15*u+'" fill="#211C18" font-family="'+SERIF+'" font-style="italic" stroke="#eadcb8" stroke-width="'+3.2*u+'" paint-order="stroke">'+p[0]+"</text></g>"});
  svg.setAttribute("viewBox",vx+" "+vy+" "+w+" "+hh);svg.innerHTML=o;
  var rl=document.getElementById("nw-rt");
  if(rl&&!reduce&&rl.getTotalLength){var L=rl.getTotalLength();if(L){rl.style.strokeDasharray=L;rl.style.strokeDashoffset=L;rl.getBoundingClientRect();rl.style.transition="stroke-dashoffset 2.2s ease";rl.style.strokeDashoffset=0;setTimeout(function(){if(rl.isConnected)rl.style.strokeDasharray=9*u+" "+6*u},2300)}}
  [].forEach.call(document.querySelectorAll(".nw-chips button"),function(b,j){b.setAttribute("aria-selected",j===i)});
  var ct=document.getElementById("nw-cart");if(ct)ct.innerHTML="<small>Théâtre de la Guerre</small><b>"+c[0]+"</b><i>"+c[1]+"</i>";
  var sc=document.getElementById("nw-sc");if(sc){var km=[50,100,200,500,1000],kmu=3.7,best=km[0],pxl;km.forEach(function(k){if(k/kmu/u<=130)best=k});pxl=best/kmu/u;sc.style.setProperty("--w",pxl+"px");sc.innerHTML="<i></i><span>"+best+" km</span>"}
  note(i,-1);
}
function note(i,j){
  var c=D.camps[i],el=document.getElementById("nw-ann");if(!el)return;
  el.innerHTML='<small>'+c[1]+"</small><h3>"+c[0]+"</h3><p>"+c[2]+'</p><ol>'+c[3].map(function(p,k){return'<li'+(k===j?' class="on"':"")+'><button type="button" data-p="'+k+'"><b>'+(k+1)+"</b><span>"+p[0]+"</span><em>"+p[3]+"</em></button>"+(k===j?"<p>"+p[4]+"</p>":"")+"</li>"}).join("")+"</ol>";
  [].forEach.call(document.querySelectorAll(".nw-mk"),function(m){m.classList.toggle("on",+m.dataset.p===j)});
}
/* ---------- images: one batched request for large, free-licence page images ---------- */
function photos(root){
  var els=[].slice.call(root.querySelectorAll(".nw-ph")),all={},i;
  els.forEach(function(e){e.dataset.w.split("|").forEach(function(t){if(t)all[t]=1})});
  var ts=Object.keys(all),ch=[];for(i=0;i<ts.length;i+=40)ch.push(ts.slice(i,i+40));
  Promise.all(ch.map(function(c){
    return fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=1400&titles="+encodeURIComponent(c.join("|"))).then(function(r){return r.json()}).then(function(j){return{c:c,q:j&&j.query}}).catch(function(){return{c:c,q:null}});
  })).then(function(rs){
    var url={};
    rs.forEach(function(r){if(!r.q)return;var al={},by={};(r.q.normalized||[]).concat(r.q.redirects||[]).forEach(function(n){al[n.from]=n.to});
      Object.keys(r.q.pages||{}).forEach(function(k){var p=r.q.pages[k];if(p.thumbnail)by[p.title]=p.thumbnail.source});
      r.c.forEach(function(t){var x=t,n=0;while(al[x]&&n++<4)x=al[x];if(by[x])url[t]=by[x]})});
    els.forEach(function(e){
      var u=e.dataset.w.split("|").map(function(t){return url[t]}).filter(Boolean)[0];
      if(!u){e.classList.add("none");return}
      var im=new Image();im.onload=function(){e.firstElementChild.style.backgroundImage="url('"+u+"')";e.classList.add("pic")};im.onerror=function(){e.classList.add("none")};im.src=u;
    });
  });
}
function mount(root){
  photos(root);
  var rv=root.querySelectorAll(".nw-rv");
  if(reduce||!window.IntersectionObserver){[].forEach.call(rv,function(e){e.classList.add("vis")})}
  else{io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("vis");io.unobserve(e.target)}})},{threshold:.08});[].forEach.call(rv,function(e){io.observe(e)})}
  camp(0);
  var last=innerWidth;rz=function(){if(innerWidth!==last){last=innerWidth;camp(cur)}};addEventListener("resize",rz);
}
function unmount(){if(io){io.disconnect();io=null}if(rz){removeEventListener("resize",rz);rz=null}}
document.addEventListener("click",function(e){
  if(!D||!document.getElementById("nw-map")&&!e.target.closest("[data-go]"))return;
  var b=e.target.closest("[data-go]");
  if(b){var s=document.getElementById(b.dataset.go);if(s)s.scrollIntoView({behavior:reduce?"auto":"smooth"});return}
  b=e.target.closest("[data-cm]");if(b){camp(+b.dataset.cm);return}
  b=e.target.closest("[data-p]");if(b&&document.getElementById("nw-map")){note(cur,+b.dataset.p)}
});
document.addEventListener("keydown",function(e){var m=e.target.closest&&e.target.closest(".nw-mk");if(m&&(e.key==="Enter"||e.key===" ")){e.preventDefault();note(cur,+m.dataset.p)}});
var _h=html;window.WARNAP={html:function(d){D=d;return _h(d)},mount:mount,unmount:unmount};
})();
