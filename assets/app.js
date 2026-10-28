const WA="923232081800",EMAIL="m.yousufakhter@gmail.com";
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const page=document.body.dataset.page;

const MARK='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#F58A36" d="M16 16C13 8 4 7 3 14s6 11 13 2c7 9 14 5 13-2s-10-6-13 2z"/></svg>';
const ARW='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

/* ===== CATALOGUE: edit products here ===== */
const CATS=[
{id:"pos-machines",name:"POS Machines",art:"pos",blurb:"Complete all-in-one Windows POS terminals.",long:"All-in-one POS terminals put the screen, computer and customer display in one unit. The fanless design runs quietly and keeps dust out, which suits busy retail counters.",use:["All-in-one, fanless Windows terminal","Customer-facing display","Ready for POS software"],items:[["All-in-One Fanless Windows POS Terminal","Windows"],["PT-5014","15″ display with 11″ customer display"]]},
{id:"pos-printers",name:"POS Printers",art:"pprinter",blurb:"Thermal receipt printers with USB, LAN and Bluetooth options.",long:"Fast thermal receipt printers for billing counters, cafés and supermarkets. Connection options vary by model, so tell us your setup and we will match the right printer.",use:["80mm thermal receipt printing","USB, LAN and Bluetooth options","Quiet and ribbon-free"],items:[["RO PTP 70","USB thermal receipt OPOS printer"],["POSPRO PTP-80","Thermal receipt printer · USB + LAN + Bluetooth"],["Speed-X 300U","80mm thermal receipt printer"],["FAV USB Thermal Receipt Printer","USB"]]},
{id:"scanners",name:"Barcode Scanners",art:"scanner",blurb:"Handheld, hands-free and wireless scanners, in 1D and 2D.",long:"Scanners that read barcodes at the counter or in the stockroom. 1D models read standard retail barcodes, and 2D models also read QR codes and screens. Wireless units and portable data terminals suit stock counting.",use:["1D and 2D reading","Desktop, wired and wireless","Portable data terminals for stock-taking"],items:[["Desktop Handsfree Scanner","1D / 2D"],["Wired Barcode Scanner","1D / 2D"],["Wireless Barcode Scanner","1D / 2D"],["Portable Data Terminal","1D / 2D"]]},
{id:"label-printers",name:"Barcode Label Printers",art:"lprinter",blurb:"Desktop label printers for barcodes, price tags and shelf labels.",long:"Label printers for stores that print their own barcodes and price tags. Pick a compact desktop model for a single counter, or a Zebra unit for steady daily printing.",use:["Print your own barcode labels","Desktop footprint","Trusted Zebra models available"],items:[["TLP 200 Desktop Label Printer","203 DPI"],["Zebra ZD220 / ZD230","Desktop label printer"],["Zebra ZD888T","Desktop label printer"]]},
{id:"labels",name:"Barcode Labels",art:"labels",blurb:"Barcode and price labels for garments, shelves and stockrooms. Custom sizes available.",long:"Self-adhesive barcode labels for tagging stock and labelling shelves. The 1up, 2up and 3up codes show how many labels sit side by side on the roll. If your size is not listed, we make it to order.",use:["Standard sizes ready to ship","Custom sizes made to order","Works with transfer label printers"],items:[["TTL-50×25-1up","50 × 25mm · 1 across"],["TTL-50×25-2up","50 × 25mm · 2 across"],["TTL-38×26-1up","38 × 26mm · 1 across"],["TTL-32×19-3up","32 × 19mm · 3 across"],["Custom Barcode Labels","Made to your size"]]},
{id:"ribbons",name:"Thermal Transfer Ribbons",art:"ribbons",blurb:"Wax and extreme resin ribbons for label printers.",long:"Thermal transfer ribbons put a crisp, lasting print on barcode labels and price tags. Wax ribbons suit everyday paper labels, while resin ribbons are made for harder wear. All are sized for 110mm label printers.",use:["Fits 110mm thermal transfer printers","Clear, smudge-resistant barcodes","Long rolls mean fewer changeovers"],items:[["Premium Extreme Resin Ribbon","110mm × 70m"],["Premium Wax Ribbon","110mm × 300m"],["Premium Wax Ribbon","110mm × 450m"]]},
{id:"rolls",name:"Thermal Receipt Paper Rolls",art:"rolls",blurb:"79mm receipt rolls with black print. Custom sizes available.",long:"Thermal receipt rolls for billing counters. 48 GSM paper with black print works with standard 80mm thermal POS printers, and no ink or ribbon is needed. Pick a longer roll for busy counters.",use:["48 GSM, black print","No ink or ribbon required","Custom sizes made to order"],items:[["Thermal Receipt Roll","79mm × 65m · 48 GSM"],["Thermal Receipt Roll","79mm × 50m · 48 GSM"],["Thermal Receipt Roll","79mm × 40m · 48 GSM"],["Custom Receipt Rolls","Made to your size"]]},
{id:"drawers",name:"POS Cash Drawers",art:"drawers",blurb:"Sturdy cash drawers for the billing counter.",long:"Cash drawers sit under your POS printer or terminal and open when a sale is rung up. Choose the PCD-100 for a heavier build, or the PCD-50 for a compact counter.",use:["Counter-ready build","Bill and coin compartments","Pairs with POS printers"],items:[["PCD-100 Cash Drawer","7.3 KG"],["PCD-50 Cash Drawer","5 bills & 8 coins"]]},
{id:"hard-tags",name:"EAS Hard Tags",art:"hard",blurb:"Reusable security tags that protect garments and stock.",long:"Hard tags clip onto garments and set off the door alarm if a tag is not removed at the counter. They are reusable, and they are removed with a detacher at checkout.",use:["Reusable security tags","Pin-fastened to garments","Works with EAS door systems"],items:[["EAS Hard Tag Pins","Pins for hard tags"],["EAS Mini Square Hard Tag with Pin","48 × 42mm"]]},
{id:"soft-tags",name:"EAS Soft Tags",art:"soft",blurb:"Adhesive RF security labels and deactivators.",long:"Soft tags are slim adhesive labels for packaged goods and flat items. The cashier deactivates the tag at checkout, and untouched tags set off the door alarm.",use:["Slim adhesive RF labels","Deactivator with alarm","Suits packaged and flat items"],items:[["RF Deactivator with Alarm","RF"],["EAS Soft Tag","40 × 40mm"]]},
{id:"computers",name:"Laptops & Computers",art:"laptop",blurb:"Laptops and desktops for your counter and back office.",long:"We supply laptops and computers so one supplier can cover your counter, stockroom and back office. Tell us what you need and your budget, and we will send options.",use:["Counter, stockroom and back office","Models matched to your budget","Available on request"],items:[["Laptops & Computers","Available on request"]]}
];
const CLIENTS=["Expostore","Expocity","Brand Zone","Brand Expo","Kids N Kids","Barcode Garments","Fashion Blue","MENDEEZ","Sana’s Creation","Dua Designer","Growth","Peter Brown","Selection Plus","Gtex","ABS Studio","Ubaid Traders","One Dollar","Dfact","New Inam Box","CO2 Café","1885 Coffee Co.","Tag Card","Bilal Mart","Big Buy Super Market","Bin Amir Mart","Najlas Beauty Parlor","# Tag","Stylish Garments","Bin Rizwan","MZA Rice","Gareeb Sons (Store)","Salams"];
/* Add REAL customer reviews here, keyed by product id: {"pcd-100-cash-drawer":[{name:"Store name",rating:5,text:"..."}]} */
const REVIEWS={};
const FEATURED=["pt-5014","pospro-ptp-80","zebra-zd888t","wireless-barcode-scanner","pcd-100-cash-drawer","premium-wax-ribbon-110mm-300m"];
const PRODUCTS=CATS.flatMap(c=>c.items.map(([n,s])=>({id:slug(n+" "+(["ribbons","rolls"].includes(c.id)?s:"")),name:n,spec:s,cat:c})));
const byId=id=>PRODUCTS.find(p=>p.id==id);

/* ===== quote list (saved in the visitor's browser) ===== */
let mem=[];const Q={get(){try{return JSON.parse(localStorage.getItem("bzq"))||[]}catch(e){return mem}},set(a){mem=a;try{localStorage.setItem("bzq",JSON.stringify(a))}catch(e){}ui()},
add(id,n=1){const a=this.get(),x=a.find(i=>i.id==id);x?x.q=Math.min(999,x.q+n):a.push({id,q:n});this.set(a)},
setq(id,q){const a=this.get(),x=a.find(i=>i.id==id);if(x){x.q=Math.max(1,Math.min(999,q|0||1));this.set(a)}},
del(id){this.set(this.get().filter(i=>i.id!=id))},clear(){this.set([])},count(){return this.get().reduce((s,i)=>s+i.q,0)}};
let tt;const toast=m=>{let t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2200)};
function ui(){const n=Q.count();$$(".qn").forEach(e=>e.textContent=n);const p=$("#pq");if(p){p.hidden=!n||page=="cart";$("#pqn").textContent=n+(n==1?" item":" items")}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;
 const q=$("#qty")?+$("#qty").value:1;Q.add(b.dataset.add,q||1);const o=b.innerHTML;b.classList.add("done");b.textContent="Added ✓";toast("Added to your cart");setTimeout(()=>{b.classList.remove("done");b.innerHTML=o},1600)});

/* ===== header, footer, floating pill ===== */
const NAV=[["index.html","Home","home"],["products.html","Products","products"],["index.html#solutions","Solutions","sol"],["about.html","About","about"],["contact.html","Contact","contact"]];
const SRCH='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><path d="M11 11l3.5 3.5"/></svg>';
$("#site-header").outerHTML=`<div class="bar" id="bar"></div><header class="hdr"><div class="wrap"><a class="logo" href="index.html" aria-label="BizSol Technology home">${MARK}<span>BizSol <b>Technology</b></span></a><nav class="menu" id="menu" aria-label="Main">${NAV.map(l=>`<a href="${l[0]}" class="${page==l[2]||(page=="product"&&l[2]=="products")?"on":""}">${l[1]}</a>`).join("")}<form class="msb" action="products.html">${SRCH}<input name="q" placeholder="Search products" aria-label="Search"></form></nav><form class="sbox" action="products.html">${SRCH}<input name="q" placeholder="Search products" aria-label="Search products"></form><a class="btn sm" href="cart.html">Cart <span class="qn">0</span></a><a class="wab" href="${wa("Hello BizSol, I need help choosing hardware.")}" aria-label="Chat on WhatsApp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M4 20l1.4-4.2A8.5 8.5 0 1 1 8 18.6z"/><path d="M9.2 8.6c-.3 1.6 1.4 4 3.6 4.9 1 .4 1.800.200 2.300-.8l-1.700-1-.9.8c-.9-.4-1.700-1.200-2.100-2.100l.8-.9-1-1.700c-.5.100-.9.4-1 .8z" fill="currentColor" stroke="none"/></svg></a><button class="burger" id="bg" aria-label="Menu" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5h12M3 9h12M3 13h12"/></svg></button></div></header>`;
$("#site-footer").outerHTML=`<footer><div class="wrap"><div class="foot"><div><a class="logo" href="index.html" style="color:#fff">${MARK}<span>BizSol <b style="color:var(--or)">Technology</b></span></a><p style="margin-top:16px;max-width:340px">The backbone of your business. POS hardware, barcode and receipt consumables, security tags and computers in Karachi, since 2015.</p></div><div><h3>Explore</h3>${NAV.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join("")}<a href="contact.html">Get a quote</a></div><div><h3>Visit or call</h3><p>Suit #151, 4th Floor, Wazir Mansion, Bolton Market, Karachi</p><a href="${wa("Hello BizSol")}">WhatsApp: 0323-2081800</a><a href="tel:+923222263335">Telephone: 0322 2263335</a><a href="mailto:${EMAIL}">${EMAIL}</a></div></div><div class="big" aria-hidden="true">bizsol</div><p class="copy">© ${new Date().getFullYear()} BizSol Technology. All rights reserved.</p></div></footer><a class="pq" id="pq" href="cart.html" hidden>Your cart <b id="pqn">0</b> View cart →</a><div class="toast" id="toast" role="status"></div>`;
$("#bg").onclick=()=>{const o=$("#menu").classList.toggle("open");$("#bg").setAttribute("aria-expanded",o)};

/* ===== photos: files live in assets/img/. Add a file, then list it here ===== */
const I="assets/img/";
const CIMG={"pos-machines":"pos-machine.webp","pos-printers":"pos-printer.webp","scanners":"scanner-wired.webp","label-printers":"label-printer.webp","labels":"labels-ttl.webp","ribbons":"ribbon-resin.webp","rolls":"receipt-rolls.webp","drawers":"cash-drawer.webp","hard-tags":"hard-tags.webp","soft-tags":"soft-tags.webp"};
const PIMG={"desktop-handsfree-scanner":"scanner-desktop.webp","zebra-zd220-zd230":"label-printer-zebra.webp","pcd-100-cash-drawer":"cash-drawer-pcd-100.webp"};
const soon=()=>`<div class="soon">${MARK}<span>Photo coming soon</span></div>`;
window.fb=el=>{const d=document.createElement("div");d.innerHTML=soon();el.replaceWith(d.firstChild)};
const photo=(f,alt)=>f?`<img class="pimg" src="${I}${f}" alt="${alt}" loading="lazy" onerror="fb(this)">`:soon();
const vis=p=>photo(PIMG[p.id]||CIMG[p.cat.id],p.name),cvis=c=>photo(CIMG[c.id],c.name);

/* ===== templates ===== */
const pcard=p=>`<article class="pc rv"><a class="tile" href="product.html?p=${p.id}" aria-label="${p.name}">${vis(p)}<span class="tag">Request price</span></a><div class="pb"><span class="cn">${p.cat.name}</span><h3><a href="product.html?p=${p.id}">${p.name}</a></h3><p>${p.spec}</p><div class="acts"><a class="lnk" href="product.html?p=${p.id}">View details</a><button class="btn sm" data-add="${p.id}">Add to cart</button></div></div></article>`;
if(page=="home"){
 const order=["rolls","drawers","pos-machines","CTA","pos-printers","scanners","label-printers","labels","ribbons","hard-tags","soft-tags","computers"];
 $("#cats").innerHTML=order.map((id,i)=>{
  if(id=="CTA")return `<div class="cat cta-card rv"><span class="eyebrow" style="align-self:flex-start"><i></i>Not sure what you need?</span><h3>Tell us your setup. We’ll match the hardware.</h3><div class="chips"><span class="chip">Custom sizes</span><span class="chip">Quick quotes</span><span class="chip">WhatsApp</span></div><a class="btn dk" href="${wa("Hello BizSol, I need help choosing hardware.")}">Chat with us ${ARW}</a></div>`;
  const c=CATS.find(x=>x.id==id);return `<a class="cat rv t${i%4} ${i==0?"hcat":""}" href="products.html?c=${c.id}"><div class="tile">${cvis(c)}</div><div class="pb"><div><h3>${c.name}</h3><small>${i==0?c.blurb:c.items.length+(c.items.length>1?" products":" product")}</small></div><span class="go">${ARW}</span></div></a>`}).join("");
 $("#feat").innerHTML=FEATURED.map(byId).filter(Boolean).map(pcard).join("");
 const m=CLIENTS.map(c=>`<span>${c}</span>`).join("");$("#mq").innerHTML=`<div>${m}</div><div aria-hidden="true">${m}</div>`;
 $("#months").innerHTML=["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"].map((m,i)=>`<span class="mo ${i==new Date().getMonth()?"now":""}" style="--k:${i}">${m}</span>`).join("");
 $("#dockt").innerHTML=["rolls","drawers","scanners","pos-printers"].map(id=>{const c=CATS.find(x=>x.id==id);return `<a href="products.html?c=${id}"><div class="tile">${cvis(c)}</div><div><b>${c.name}</b><small>${c.items.length} ${c.items.length>1?"products":"product"}</small></div></a>`}).join("");
 const HERO=["pcd-100-cash-drawer","thermal-receipt-roll-79mm-65m-48-gsm","desktop-handsfree-scanner","pospro-ptp-80"].map(byId),HN=["Cash drawer","Receipt rolls","Scanner","POS printer"];let hi=0,auto;
 const setHero=(i,now)=>{hi=i;const p=HERO[i],o=$("#objin"),put=()=>{o.innerHTML=vis(p);o.classList.remove("out")};now?put():(o.classList.add("out"),setTimeout(put,280));
  $("#hname").textContent=p.name;$("#hspec").textContent=p.spec;$("#hlink").href="product.html?p="+p.id;$$("#hsw button").forEach((b,j)=>b.classList.toggle("on",j==i))};
 $("#hsw").innerHTML=HN.map((n,i)=>`<button class="chip" data-i="${i}">${n}</button>`).join("");
 $("#hsw").onclick=e=>{if(e.target.dataset.i!=null){clearInterval(auto);setHero(+e.target.dataset.i)}};
 setHero(0,1);auto=setInterval(()=>setHero((hi+1)%HERO.length),6500);
}
if(page=="products"){
 const qs=new URLSearchParams(location.search);let cur=qs.get("c")||"all",term=(qs.get("q")||"").toLowerCase().trim(),sort="";$("#search").value=qs.get("q")||"";
 const draw=()=>{$("#filters").innerHTML=[["all","All products",PRODUCTS.length],...CATS.map(c=>[c.id,c.name,c.items.length])].map(([id,n,k])=>`<button class="fi ${cur==id?"on":""}" data-c="${id}"><span>${n}</span><em>${k}</em></button>`).join("");
  let r=PRODUCTS.filter(p=>(cur=="all"||p.cat.id==cur)&&(p.name+" "+p.spec+" "+p.cat.name).toLowerCase().includes(term));
  if(sort=="az")r=[...r].sort((a,b)=>a.name.localeCompare(b.name));
  $("#count").textContent=r.length+(r.length==1?" product":" products");
  $("#list").innerHTML=r.length?r.map(pcard).join(""):`<p>No products match. <a class="lnk" href="${wa("Hello BizSol, I am looking for: "+term)}">Ask us on WhatsApp</a> and we will find it for you.</p>`};
 $("#filters").onclick=e=>{const b=e.target.closest("[data-c]");if(b){cur=b.dataset.c;draw()}};$("#search").oninput=e=>{term=e.target.value.toLowerCase().trim();draw()};$("#sort").onchange=e=>{sort=e.target.value;draw()};draw();
}
if(page=="product"){
 const p=byId(new URLSearchParams(location.search).get("p"));
 if(!p)$("#detail").innerHTML=`<h1 class="d2">Product not found</h1><p style="margin:16px 0 28px">This product is not in our catalogue.</p><a class="btn" href="products.html">Browse all products</a>`;
 else{document.title=p.name+" | BizSol Technology";const c=p.cat,rv=REVIEWS[p.id]||[],rel=c.items.length>1?PRODUCTS.filter(x=>x.cat.id==c.id&&x.id!=p.id):[],custom=["labels","rolls"].includes(c.id);
  const g=[vis(p),vis(p),vis(p)];window.__g=g;
  $("#detail").innerHTML=`<div class="crumb"><a href="products.html">Products</a> / <a href="products.html?c=${c.id}">${c.name}</a> / ${p.name}</div><div class="detail"><div class="gal rv"><div class="gm" id="gm"><div class="gi" id="gi">${g[0]}</div><span class="tag">Request price</span></div><div class="gt">${g.map((x,i)=>`<button class="${i?"":"on"}" data-g="${i}" aria-label="View ${i+1}"><div class="gx ${i==1?"wm":i==2?"dkb":""}">${x}</div></button>`).join("")}</div></div>
  <div class="rv"><span class="eyebrow"><i></i>${c.name}</span><h1>${p.name}</h1><div class="rate"><span class="stars">☆☆☆☆☆</span><a href="#tabs" data-tab="r">Be the first to review</a></div><div class="price"><b>Price on request</b><span>Send your quantity and we reply with a quotation.</span></div><p style="margin:16px 0">${c.blurb} <b style="color:var(--ink)">${p.spec}</b></p><ul class="list">${c.use.map(u=>`<li>${u}</li>`).join("")}</ul><div class="row" style="margin-top:24px"><div class="step"><button onclick="qty.stepDown()" aria-label="Less">−</button><input id="qty" type="number" min="1" max="999" value="1" aria-label="Quantity"><button onclick="qty.stepUp()" aria-label="More">+</button></div><button class="btn" data-add="${p.id}">Add to cart</button><a class="btn dk" href="${wa("Hello BizSol, I would like a quote for: "+p.name+" ("+p.spec+").")}">Enquire on WhatsApp</a></div>
  <div class="trust"><div><b>Since 2015</b><span>Karachi-based supplier</span></div><div><b>Quotes on WhatsApp</b><span>Send your list</span></div><div><b>${custom?"Custom sizes":"Matched to your setup"}</b><span>${custom?"Made on request":"Tell us what you run"}</span></div><div><b>Warranty</b><span>Confirm with supplier</span></div></div></div></div>
  <div style="margin-top:72px" class="rv" id="tabs"><div class="tabs"><button class="on" data-tab="d">Description</button><button data-tab="s">Specifications</button><button data-tab="r">Reviews (${rv.length})</button></div>
  <div class="tp" id="tp-d"><p style="max-width:780px;font-size:17px">${c.long}</p><ul class="list" style="max-width:780px">${c.use.map(u=>`<li>${u}</li>`).join("")}</ul></div>
  <div class="tp" id="tp-s" hidden><table class="spec" style="max-width:780px"><tr><td>Product</td><td>${p.name}</td></tr><tr><td>Specification</td><td>${p.spec}</td></tr><tr><td>Category</td><td>${c.name}</td></tr><tr><td>Price</td><td>Request a quote</td></tr><tr><td>Availability</td><td>Confirm on enquiry</td></tr><tr><td>Warranty</td><td>Confirm with supplier</td></tr>${custom?"<tr><td>Custom sizes</td><td>Available on request</td></tr>":""}</table></div>
  <div class="tp" id="tp-r" hidden>${rv.length?rv.map(r=>`<div class="box" style="margin-bottom:16px;max-width:720px"><b>${"★".repeat(r.rating)}</b><p style="color:var(--ink)">${r.text}</p><p>— ${r.name}</p></div>`).join(""):`<div class="box" style="max-width:720px"><h3 style="font-size:20px;margin-bottom:8px">No reviews yet</h3><p style="margin-bottom:20px">Have you used this product? Tell us how it worked for you and we will publish it here.</p><a class="btn sm ln" href="${wa("Hello BizSol, my review of "+p.name+": ")}">Write a review</a></div>`}</div></div>
  ${rel.length?`<h2 class="d2 rv" style="margin:96px 0 32px">More from ${c.name}</h2><div class="grid">${rel.map(pcard).join("")}</div>`:""}`;
  document.addEventListener("click",e=>{const t=e.target.closest("[data-tab]");if(t){const k=t.dataset.tab;$$("#tabs .tabs button").forEach(b=>b.classList.toggle("on",b.dataset.tab==k));$$(".tp").forEach(x=>x.hidden=x.id!="tp-"+k);if(t.tagName=="A"){e.preventDefault();$("#tabs").scrollIntoView({behavior:"smooth"})}}
   const b=e.target.closest("[data-g]");if(b){const i=+b.dataset.g;$("#gi").innerHTML=window.__g[i];$("#gm").className="gm"+(i==1?" wm":i==2?" dkb":"");$$(".gt button").forEach(x=>x.classList.toggle("on",x==b))}});
  $("#gm").addEventListener("pointermove",e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--zx",(e.clientX-r.left)/r.width*100+"%");e.currentTarget.style.setProperty("--zy",(e.clientY-r.top)/r.height*100+"%")});
 }
}
if(page=="cart"){
 const ref="BZ-"+new Date().toISOString().slice(2,10).replace(/-/g,"")+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
 const items=()=>Q.get().map(i=>({...i,p:byId(i.id)})).filter(i=>i.p);
 const draw=()=>{const a=items();if(!$("#qdone").hidden)return;$("#qempty").hidden=a.length>0;$("#qwrap").hidden=!a.length;
  $("#qlist").innerHTML=a.map(i=>`<div class="qi"><div class="tile">${vis(i.p)}</div><div><b>${i.p.name}</b><p>${i.p.spec}</p></div><div class="step"><button data-m="${i.id}" aria-label="Less">−</button><input type="number" min="1" max="999" value="${i.q}" data-q="${i.id}" aria-label="Quantity"><button data-p="${i.id}" aria-label="More">+</button></div><button class="x" data-d="${i.id}">Remove</button></div>`).join("")};
 window.cartDraw=draw;
 $("#qlist").addEventListener("click",e=>{const t=e.target,g=k=>t.dataset[k],cur=id=>Q.get().find(x=>x.id==id).q;
  if(g("m"))Q.setq(g("m"),cur(g("m"))-1);else if(g("p"))Q.setq(g("p"),cur(g("p"))+1);else if(g("d"))Q.del(g("d"));else return;draw()});
 $("#qlist").addEventListener("change",e=>{if(e.target.dataset.q){Q.setq(e.target.dataset.q,+e.target.value);draw()}});
 const msg=f=>`Hello BizSol, I would like to place an order (${ref})\nName: ${f.name}${f.company?" ("+f.company+")":""}\nPhone: ${f.phone}\nCity: ${f.city}\nAddress: ${f.address}\n\nItems:\n`+items().map((i,n)=>`${n+1}. ${i.p.name} (${i.p.spec}) × ${i.q}`).join("\n")+(f.note?`\n\nNotes: ${f.note}`:"");
 const fd=()=>Object.fromEntries(new FormData($("#qf")));
 $("#qwa").onclick=()=>{if($("#qf").reportValidity())location.href=wa(msg(fd()))};
 $("#qf").onsubmit=async e=>{e.preventDefault();const b=$("#qsend"),er=$("#qerr");er.hidden=true;b.disabled=true;b.textContent="Placing order…";
  const f=fd(),its=items().map(i=>({name:i.p.name+" ("+i.p.spec+")",q:i.q}));
  try{let r=await fetch("/api/order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...f,ref,items:its})});
   if([404,405,501].includes(r.status)){const m=new FormData();Object.entries({...f,ref}).forEach(([k,v])=>m.append(k,v));m.append("items",JSON.stringify(its));r=await fetch("enquiry.php",{method:"POST",body:m})}
   const j=await r.json();if(!r.ok||!j.ok)throw 0;
   const w=wa(msg(f));Q.clear();$("#qwrap").hidden=true;$("#qdone").hidden=false;$("#qref").textContent=ref;$("#qdwa").href=w;scrollTo({top:0,behavior:"smooth"})}
  catch(x){er.hidden=false;b.disabled=false;b.textContent="Place order"}};
 draw();
}
if(page=="contact"){
 $("#form").onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target)),t=`Hello BizSol, I am ${f.name} (${f.phone}).\n${f.msg}`;
  location.href=e.submitter&&e.submitter.value=="mail"?`mailto:${EMAIL}?subject=${encodeURIComponent("Enquiry from "+f.name)}&body=${encodeURIComponent(t)}`:wa(t)};
}

/* ===== animation ===== */
const still=matchMedia("(prefers-reduced-motion: reduce)").matches,TK=/<span[^>]*>.*?<\/span>[^\s<]*|\S+/g,clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const AM={pos:"pos-machines",lprinter:"label-printers",hard:"hard-tags"};$$("[data-art]").forEach(e=>e.innerHTML=cvis(CATS.find(c=>c.id==AM[e.dataset.art])));
$$(".split").forEach(h=>{let i=0;h.innerHTML=h.innerHTML.split(/<br\s*\/?>/i).map(l=>`<span class="ln2">${(l.trim().match(TK)||[]).map(w=>`<span class="wd" style="animation-delay:${200+(i++)*80}ms">${w}</span>`).join(" ")}</span>`).join("")});
$$(".sw").forEach(p=>p.innerHTML=(p.innerHTML.match(TK)||[]).map(w=>`<span>${w}</span>`).join(" "));
const seen=new WeakSet();function reveal(){$$(".rv").forEach(el=>{if(seen.has(el))return;seen.add(el);const i=[...el.parentNode.children].indexOf(el);el.style.setProperty("--d",(i%4)*.09+"s")})}
function count(el){const n=+el.dataset.n,s=el.dataset.s||"",t0=performance.now();el.dataset.done=1;const f=t=>{const k=clamp((t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function tick(){
 $$(".rv:not(.in)").forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.92){e.classList.add("in");const c=e.querySelector("[data-n]:not([data-done])");if(c)count(c)}});
 $$("[data-n]:not([data-done])").forEach(e=>{if(e.getBoundingClientRect().top<innerHeight*.95)count(e)});
 $$(".sw").forEach(p=>{const r=p.getBoundingClientRect(),pr=clamp((innerHeight*.9-r.top)/(r.height+innerHeight*.35)),w=p.children;[...w].forEach((s,i)=>s.style.opacity=still?1:.18+.82*clamp((pr*1.1-i/w.length)*5))});
 const sc=$$(".sc");sc.forEach((c,i)=>{const n=sc[i+1];if(!n||innerWidth<900){c.style.transform="";return}const g=clamp(1-(n.getBoundingClientRect().top-c.getBoundingClientRect().top-120)/(innerHeight*.5));c.style.transform=`scale(${1-g*.05})`;c.style.filter=`brightness(${1-g*.25})`});
 if(!still)$$("[data-par]").forEach(e=>{const r=e.getBoundingClientRect();e.style.translate=`0 ${((r.top+r.height/2-innerHeight/2)*-(+e.dataset.par)).toFixed(1)}px`});
 const h=document.documentElement;$("#bar").style.transform=`scaleX(${clamp(scrollY/(h.scrollHeight-innerHeight||1))})`;
}
let tq=0;const sched=()=>{cancelAnimationFrame(tq);tq=requestAnimationFrame(tick)};
addEventListener("scroll",sched,{passive:true});addEventListener("resize",sched);
reveal();new MutationObserver(()=>{reveal();sched()}).observe(document.body,{childList:true,subtree:true});

/* hero product follows the cursor in 3D */
const ho=$("#ho");
if(ho&&!still){const o=$("#obj"),hero=$(".hero");let tx=0,ty=0,cx=0,cy=0,last=0;
 hero.addEventListener("pointermove",e=>{const r=ho.getBoundingClientRect();tx=clamp((e.clientX-(r.left+r.width/2))/(innerWidth*.45),-1,1);ty=clamp((e.clientY-(r.top+r.height/2))/(innerHeight*.45),-1,1);last=performance.now()});
 hero.addEventListener("pointerleave",()=>last=0);
 (function f(t){if(!last||t-last>2500){tx=Math.sin(t/1800)*.55;ty=Math.cos(t/2300)*.3}
  cx+=(tx-cx)*.07;cy+=(ty-cy)*.07;
  o.style.transform=`translate3d(${cx*46}px,${cy*30}px,0) rotateY(${cx*26}deg) rotateX(${-cy*18}deg)`;
  ho.style.setProperty("--gx",50+cx*45+"%");ho.style.setProperty("--gy",35+cy*45+"%");ho.style.setProperty("--sx",-cx*34+"px");ho.style.setProperty("--ss",1-Math.abs(cy)*.12);
  ho.style.setProperty("--hx",cx.toFixed(3));ho.style.setProperty("--hy",cy.toFixed(3));requestAnimationFrame(f)})(0)}
/* soft light that trails the pointer */
if(matchMedia("(pointer:fine)").matches&&!still){const g=document.createElement("div");g.className="cg";document.body.append(g);let gx=innerWidth/2,gy=300,tx=gx,ty=gy;
 addEventListener("pointermove",e=>{tx=e.clientX;ty=e.clientY},{passive:true});(function f(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;g.style.transform=`translate(${gx-220}px,${gy-220}px)`;requestAnimationFrame(f)})()}
/* magnetic buttons and card-image parallax */
document.addEventListener("pointermove",e=>{if(still||!e.target.closest)return;const b=e.target.closest(".btn");if(b){const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.28}px`}
 const c=e.target.closest(".pc,.cat");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--px",((e.clientX-r.left)/r.width-.5).toFixed(2));c.style.setProperty("--py",((e.clientY-r.top)/r.height-.5).toFixed(2))}});
document.addEventListener("pointerout",e=>{const b=e.target.closest&&e.target.closest(".btn");if(b)b.style.translate=""});
/* intro curtain, once per visit */
try{if(!sessionStorage.getItem("bzl")&&!still){sessionStorage.setItem("bzl",1);const l=document.createElement("div");l.className="ld";l.innerHTML=`${MARK}<b>BizSol <i>Technology</i></b><span>The backbone of your business.</span>`;document.body.append(l);document.documentElement.classList.add("held");
 setTimeout(()=>{l.classList.add("go");document.documentElement.classList.remove("held")},1300);setTimeout(()=>l.remove(),2300)}}catch(e){}
addEventListener("storage",e=>{if(e.key=="bzq"){ui();window.cartDraw&&window.cartDraw()}});
ui();requestAnimationFrame(()=>requestAnimationFrame(tick));
