(function(){"use strict";
var d=document,root=d.documentElement,WA="919849536502",MAIL="materials.enterprises@gmail.com",RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(i){return d.getElementById(i)}
function el(t,c,x){var e=d.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function qa(s){return Array.prototype.slice.call(d.querySelectorAll(s))}
function load(k){try{return JSON.parse(localStorage.getItem(k))||{}}catch(e){return {}}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
/* theme */
var tb=$("theme");
function setTheme(t){root.setAttribute("data-theme",t);if(tb){tb.textContent=t==="dark"?"White theme":"Black theme";tb.setAttribute("aria-pressed",t==="dark")}try{localStorage.setItem("me-theme",t)}catch(e){}}
setTheme(root.getAttribute("data-theme")==="dark"?"dark":"light");
if(tb)tb.addEventListener("click",function(){setTheme(root.getAttribute("data-theme")==="dark"?"light":"dark")});
/* menu */
var mb=$("menu"),nv=$("nav");
if(mb)mb.addEventListener("click",function(){var o=nv.classList.toggle("open");mb.setAttribute("aria-expanded",o)});
/* range images */
qa("[data-img]").forEach(function(i){var s=(window.ME_RANGE_IMG||{})[i.getAttribute("data-img")];if(s)i.src="data:image/webp;base64,"+s});
/* reveal + counters */
function count(n){var to=n.getAttribute("data-since")?new Date().getFullYear()-parseInt(n.getAttribute("data-since"),10):parseInt(n.getAttribute("data-to"),10),suf=n.getAttribute("data-suf")||"";
if(RM){n.textContent=to+suf;return}var t0=null;function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1200,1);n.textContent=Math.round(to*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
var els=qa(".reveal,.count");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var n=e.target;n.classList.add("in");if(n.classList.contains("count"))count(n);io.unobserve(n)}})},{threshold:.15});els.forEach(function(n){io.observe(n)})}
else els.forEach(function(n){n.classList.add("in");if(n.classList.contains("count"))count(n)});
/* store */
var cart=load("me-cart"),wish=load("me-wish"),mode="cart",D=null;
var IC={bag:'<path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',heart:'<path d="M12 20s-7-4.6-9-9.2C1.6 7.4 4 4.5 7 4.5c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3 0 5.4 2.9 4 6.3C19 15.4 12 20 12 20z"/>',eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'};
function icon(n,f){return '<svg viewBox="0 0 24 24" width="20" height="20" fill="'+(f?'currentColor':'none')+'" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[n]+'</svg>'}
function sum(o){var n=0;for(var k in o)n+=o[k];return n}
function counts(){var w=$("wb"),c=$("cb");if(w)w.innerHTML=icon("heart",sum(wish)>0)+'<span class="lbl">Wish list</span> <span>'+sum(wish)+'</span>';if(c)c.innerHTML=icon("bag")+'<span class="lbl">Quote cart</span> <span>'+sum(cart)+'</span>'}
var tt;function toast(m){var t=$("toast");if(!t){t=el("div");t.id="toast";t.setAttribute("role","status");t.setAttribute("aria-live","polite");d.body.appendChild(t)}t.textContent=m;t.className="on";clearTimeout(tt);tt=setTimeout(function(){t.className=""},1600)}
function withData(cb){if(window.ME_DATA){D=window.ME_DATA;D.forEach(function(x,i){x.id=i});cb();return}var s=el("script");s.src="products.js";s.onload=function(){withData(cb)};d.head.appendChild(s)}
function addCart(id){cart[id]=(cart[id]||0)+1;save("me-cart",cart);counts();toast("Added to quote cart");if(pn&&!pn.hidden&&mode==="cart")panel()}
function toggleWish(id){if(wish[id]){delete wish[id];toast("Removed from wish list")}else{wish[id]=1;toast("Added to wish list")}save("me-wish",wish);counts();if(draw)draw();if(pn&&!pn.hidden&&mode==="wish")panel()}
function photo(x){var p=el("div","ph"),i=d.createElement("img");i.alt=x[1];i.loading="lazy";i.src="data:image/webp;base64,"+x[3];p.appendChild(i);return p}
function ibtn(n,label,fn,pr){var b=el("button");b.type="button";b.innerHTML=icon(n,pr);b.setAttribute("aria-label",label);b.title=label;b.addEventListener("click",fn);return b}
var qv,pn;
function shell(){if(qv)return;qv=el("div","ov");qv.hidden=true;qv.appendChild(el("div","box")).setAttribute("role","dialog");qv.firstChild.setAttribute("aria-modal","true");qv.firstChild.setAttribute("aria-label","Quick view");
pn=el("aside","side");pn.hidden=true;pn.innerHTML='<header><h3 id="pt"></h3><button class="ibtn" id="px" type="button" aria-label="Close">&#10005;</button></header><div class="body" id="pl"></div><footer id="pf"></footer>';
d.body.appendChild(qv);d.body.appendChild(pn);qv.addEventListener("click",function(e){if(e.target===qv)closeAll()});$("px").addEventListener("click",closeAll)}
function closeAll(){if(qv)qv.hidden=true;if(pn)pn.hidden=true}
d.addEventListener("keydown",function(e){if(e.key==="Escape")closeAll()});
function quick(x){shell();var b=qv.firstChild;b.innerHTML="";var inf=el("div","info");inf.appendChild(el("h3","",x[1]));inf.appendChild(el("p","",(x[2]?x[2]+". ":"")+x[0]));
var r=el("div","row"),a=el("button","btn","Add to quote cart");a.type="button";a.addEventListener("click",function(){addCart(x.id)});
var w=el("button","btn alt",wish[x.id]?"Remove from wish list":"Add to wish list");w.type="button";w.addEventListener("click",function(){toggleWish(x.id);w.textContent=wish[x.id]?"Remove from wish list":"Add to wish list"});
r.appendChild(a);r.appendChild(w);inf.appendChild(r);var c=el("button","ibtn xb");c.type="button";c.setAttribute("aria-label","Close");c.innerHTML="&#10005;";c.addEventListener("click",closeAll);
b.appendChild(photo(x));b.appendChild(inf);b.appendChild(c);qv.hidden=false;c.focus()}
function panel(){shell();var pl=$("pl"),pf=$("pf"),o=mode==="cart"?cart:wish;$("pt").textContent=mode==="cart"?"Quote cart":"Wish list";pl.innerHTML="";pf.innerHTML="";
var ids=Object.keys(o);if(!ids.length)pl.appendChild(el("p","sub",mode==="cart"?"Your quote cart is empty. Tap the bag icon on any product to add it.":"Your wish list is empty. Tap the heart icon on any product to save it."));
ids.forEach(function(id){var x=D[id];if(!x)return;var li=el("div","li"),th=el("div","th");if(x[3]){var im=d.createElement("img");im.alt="";im.src="data:image/webp;base64,"+x[3];th.appendChild(im)}
var nm=el("div","nm",x[1]);if(x[2]&&x[3])nm.appendChild(el("small","",x[2]));li.appendChild(th);li.appendChild(nm);
if(mode==="cart"){var q=el("div","qty"),m=el("button","","\u2212"),p=el("button","","+");m.type=p.type="button";m.setAttribute("aria-label","Less");p.setAttribute("aria-label","More");
m.addEventListener("click",function(){cart[id]--;if(cart[id]<1)delete cart[id];save("me-cart",cart);counts();panel()});p.addEventListener("click",function(){cart[id]++;save("me-cart",cart);counts();panel()});
q.appendChild(m);q.appendChild(el("span","",String(o[id])));q.appendChild(p);li.appendChild(q)}
else{var a=el("button","sm","Add to cart");a.type="button";a.addEventListener("click",function(){addCart(id)});li.appendChild(a)}
var x2=el("button","ibtn");x2.type="button";x2.setAttribute("aria-label","Remove");x2.innerHTML="&#10005;";x2.addEventListener("click",function(){delete o[id];save(mode==="cart"?"me-cart":"me-wish",o);counts();if(draw)draw();panel()});li.appendChild(x2);pl.appendChild(li)});
if(mode==="cart"&&ids.length){var msg=function(){return "Hello, please send me a quote for:\n\n"+ids.map(function(id){var x=D[id];return "- "+x[1]+(x[2]&&x[3]?" ("+x[2]+")":"")+" x "+cart[id]}).join("\n")+"\n\nMy name and company:\n"};
var s=el("button","btn","Send quote request by email");s.type="button";s.addEventListener("click",function(){location.href="mailto:"+MAIL+"?subject="+encodeURIComponent("Quote request")+"&body="+encodeURIComponent(msg())});
var w=el("a","btn wa","Send on WhatsApp");w.href="https://wa.me/"+WA+"?text="+encodeURIComponent(msg());w.target="_blank";w.rel="noopener";w.style.textAlign="center";pf.appendChild(s);pf.appendChild(w)}
pn.hidden=false}
function open(m){mode=m;withData(function(){panel()})}
if($("wb"))$("wb").addEventListener("click",function(){open("wish")});if($("cb"))$("cb").addEventListener("click",function(){open("cart")});
counts();
/* grid */
var G=$("grid"),draw=null;
if(G)withData(function(){var range=G.getAttribute("data-range")||"",only=G.getAttribute("data-mode")==="search",PAGE=24,shown=PAGE,sub="All",q=$("q"),cnt=$("cnt"),more=$("more"),subs=$("subs");
var items=D.filter(function(x){return!range||x[0]===range});
if(subs&&range){var order=(window.ME_SUBS||{})[range]||[],have={};items.forEach(function(x){have[x[4]]=1});var L=["All"].concat(order.filter(function(s){return have[s]}));
if(L.length>2)L.forEach(function(n){var b=el("button","",n);b.type="button";b.setAttribute("aria-pressed",n===sub);b.addEventListener("click",function(){sub=n;shown=PAGE;qa("#subs button").forEach(function(k){k.setAttribute("aria-pressed",k.textContent===n)});draw()});subs.appendChild(b)})}
draw=function(){var t=q?q.value.trim().toLowerCase():"";if(only&&!t){G.innerHTML="";cnt.textContent="";more.style.display="none";return}
var o=items.filter(function(x){return(sub==="All"||x[4]===sub)&&(!t||(x[1]+" "+x[2]+" "+x[0]).toLowerCase().indexOf(t)>-1)});G.innerHTML="";
o.slice(0,shown).forEach(function(x){var c=el("article","card"+(x[3]?(x[0]==="Cleaning agents"?" wide":""):" txt"));
if(x[3]){var p=photo(x),a=el("div","acts");a.appendChild(ibtn("bag","Add to quote cart",function(){addCart(x.id)}));var hb=ibtn("heart",wish[x.id]?"Remove from wish list":"Add to wish list",function(){toggleWish(x.id)},!!wish[x.id]);hb.setAttribute("aria-pressed",!!wish[x.id]);a.appendChild(hb);a.appendChild(ibtn("eye","Quick view",function(){quick(x)}));p.appendChild(a);c.appendChild(p)}
var tx=el("div",x[3]?"tx":"");tx.appendChild(el("h3","",x[1]));if(x[2])tx.appendChild(el("small","",x[2]));c.appendChild(tx);G.appendChild(c)});
cnt.textContent=o.length?(o.length+(o.length===1?" product":" products")):"Nothing matched. Call or message us on WhatsApp and we will source it for you.";more.style.display=o.length>shown?"block":"none"};
if(q)q.addEventListener("input",function(){shown=PAGE;draw()});more.addEventListener("click",function(){shown+=PAGE;draw()});draw()});
})();
