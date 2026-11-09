// ====== CONFIGURACIÓN: cambia estos datos ======
var WA_NUMERO="51942066066";            // WhatsApp con código de país, sin + ni espacios
var CORREO_TIENDA="jhonkaretera@gmail.com"; // correo que recibe los pedidos
// ===============================================
var P=[
 {
    id: 1,                  // Número único del producto
    n: "SHAMPOO 1LITRO NATURAL-MANZANILLA",                  // Nombre del producto
    d: "Shampoo para bebé Tuinies, disponible en variedades Natural y Manzanilla, en presentación de 1 litro por unidad. Cada caja contiene 12 unidades de un solo color.",                  // Descripción
    p: 162.0,                // Precio actual
                    // Precio anterior (opcional, para ofertas)
    s: 99999999,                   // Cantidad disponible en stock
    c: ["#6cb7f5", "#2f7fe0"], // Colores decorativos
    q: 12,                   // Cantidad de unidades por paquete
    e: "📦",                // Emoji del producto
    img: "img/shampo1.jpeg",                // Imagen principal
    fotos: [                // Fotografías adicionales
        "img/shampo2.png",
        "img/shampo3.png"
    ]
},

 {id:2,
  n:"TOALLAS HUMEDAS TUINIES 2X100 BIPACK",
  d:"Toallas húmedas con aroma a Aloe vera, en formato de 2x100 unidades.",
  p:34.0,
  o:38.0,
  s:99999999/*cantidad disponible o agotado para que nose pueda comprar*/,
  c:["#752341","#6bbc2e"],
  q:100,
  e:"🧸",
  img:"img/presenta bebe.png",
  fotos:[
    "img/descripcion toallas.png",
    "img/foto 3.png",
  ]
  
},
  
 /* aqui puedo agregar mas productos  copiando de llave a llave canbiando solo las descripciones*/
 {
    id: 3,                  // Número único del producto
    n: "SCOOTER CON ASIENTO DISNEY",                  // Nombre del producto
    d: "MUSICAL,CON LUCES LED EN LOS BORDES,LUCES EN LA LLANTA DELANTERA,CON BLUETOOTH INCORPORADO Y ASIENTO PLEGABLE  -CAJA DE📦10 UND",                  // Descripción
    p: 710.0,                // Precio actual
    o: 0.00,                // Precio anterior (opcional, para ofertas)
    s: 9999999,                   // Cantidad disponible en stock
    c: ["#6cb7f5", "#2f7fe0"], // Colores decorativos
    q: 10,                   // Cantidad de unidades por paquete
    e: "📦",                // Emoji del producto
    img: "img/scoter1.jpeg",                // Imagen principal
    fotos: [                // Fotografías adicionales
        "",
        ""
    ]
},
 
 
 
 
 {
    id: 4,                  // Número único del producto
    n: "SCOOTER SMALL-6 DISEÑOS",                  // Nombre del producto
    d: "Scooter con diseños de Disney caja surtida de 10 und",                  // Descripción
    p: 620.0,                // Precio actual
    o: 0.00,                // Precio anterior (opcional, para ofertas)
    s: 99999999,                   // Cantidad disponible en stock
    c: ["#6cb7f5", "#2f7fe0"], // Colores decorativos
    q: 10,                   // Cantidad de unidades por paquete
    e: "📦",                // Emoji del producto
    img: "img/scoter2.jpeg",                // Imagen principal
    fotos: [                // Fotografías adicionales
        "",
        ""
    ]
},
 
 
 /*{id:5,n:"Toallas Húmedas FABIBLUU Premium – 100 unidades",d:"Versión Premium en formato de 100 unidades. Disponible próximamente.",p:9.9,s:0,c:["#c9b2f2","#9a73e0"],q:100,e:"🐻"},
 
 {id:6,
 n:"Pilas AA Alcalinas – Pack de 4",
 d:"Pilas alcalinas de larga duración.",
 p:8.90,
 s:100,
 c:["#6cb7f5","#2f7fe0"],
 q:4,
 e:"🔋"},

 {id:7,
 n:"Guantes de Nitrilo – Caja x 100",
 d:"Guantes de nitrilo para uso profesional.",
 p:25.90,
 s:80,
 c:["#8fe3c4","#2fb68a"],
 q:100,
 e:"🧤"},

 {id:8,
 n:"Mascarillas – Pack x 50",
 d:"Mascarillas para protección y uso diario.",
 p:12.50,
 s:60,
 c:["#c9b2f2","#9a73e0"],
 q:50,
 e:"😷"},
{id:9,
  n:"SCOOTER DISNEY CON ASIENTO – caja x 10 ",
  d:"scooter con diseños surtidos.",
  p:710.00,
  s:100,
  c:["#6cb7f5","#2f7fe0"],
  q:4,
  e:"🛵"
},
{id:9,
  n:"SCOOTER DISNEY NORMAL – caja x 10 ",
  d:"scooter con diseños surtidos.",
  p:620.0,
  s:100,
  c:["#6cb7f5","#2f7fe0"],
  q:5,
  e:"🛵"

},*/
];
var cart={},favs={},filter="all",qtys={};
function money(v){return "S/ "+v.toFixed(2)}
function $(i){return document.getElementById(i)}
try{cart=JSON.parse(localStorage.getItem("fb_cart")||"{}");favs=JSON.parse(localStorage.getItem("fb_fav")||"{}")}catch(e){}
function save(){try{localStorage.setItem("fb_cart",JSON.stringify(cart));localStorage.setItem("fb_fav",JSON.stringify(favs))}catch(e){}}
function toast(t){var x=$("toast");x.textContent=t;x.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(function(){x.classList.remove("show")},2200)}
function get(id){return P.filter(function(x){return x.id==parseInt(id)})[0]}

function renderFilters(){
 var f=[["all","Todos"],["oferta","Ofertas"],["fav","Favoritos ♥"]];
 $("filters").innerHTML=f.map(function(a){return '<button data-f="'+a[0]+'" class="'+(filter==a[0]?"on":"")+'">'+a[1]+'</button>'}).join("");
}
function renderGrid(){
 var q=$("q").value.trim().toLowerCase();
 var list=P.filter(function(p){
  if(q&&(p.n+p.d).toLowerCase().indexOf(q)<0)return false;
  if(filter=="oferta")return !!p.o;
  if(filter=="fav")return favs[p.id];
  return true});
 if(!list.length){$("grid").innerHTML='<div class="empty">No encontramos productos. Prueba con otra búsqueda o filtro.</div>';return}
 $("grid").innerHTML=list.map(function(p){
  var out=p.s<=0,low=p.s>0&&p.s<=5,k=qtys[p.id]||1;
  return '<article class="card">'+(p.o?'<span class="tag">oferta</span>':'')+
  '<button class="fav" data-fav="'+p.id+'" aria-label="Favorito">'+(favs[p.id]?"♥":"♡")+'</button>'+
  /*'<div class="img" data-open="'+p.id+'" style="background:linear-gradient(135deg,'+p.c[0]+','+p.c[1]+')"><b>ACHA2BLE</b><em>'+p.q+'</em></div>'+  este codigo lo remplaso para subir imagenes a cada producto */
  '<div class="img" data-open="'+p.id+'">'+
  '<img src="'+(p.img||"imagenes/sin-imagen.jpg")+'" alt="'+p.n+'" style="width:100%;height:100%;object-fit:contain;">'+
  /*'<em>'+p.q+'</em>'+*/
  '</div>'+/* este codigo fue agregado por jhon*/
  '<h3 data-open="'+p.id+'">'+p.n+'</h3><p>'+p.d+'</p>'+
  '<div class="price">'+money(p.p)+(p.o?'<s>'+money(p.o)+'</s>':'')+'</div>'+
  '<div class="stk '+(out?"out":low?"low":"")+'">'+(out?"Agotado":low?"Quedan "+p.s:"Disponible")+'</div>'+
  '<div class="row"><div class="qty"><button data-q="-1" data-id="'+p.id+'" aria-label="Menos">−</button><span>'+k+'</span><button data-q="1" data-id="'+p.id+'" aria-label="Más">+</button></div>'+
  '<button class="add" data-add="'+p.id+'"'+(out?" disabled":"")+'>'+(out?"Agotado":"🛒 Agregar")+'</button></div><button class="more" data-open="'+p.id+'">Ver detalles y fotos📹🎞️</button></article>'}).join("");
}
function total(){var t=0,n=0;for(var id in cart){t+=get(id).p*cart[id];n+=cart[id]}return{t:t,n:n}}

function renderCart(){
  var T = total();

  $("cnt").textContent = T.n;
  $("dcount").textContent = "(" + T.n + (T.n == 1 ? " producto)" : " productos)");
  $("hdTot").textContent = money(T.t);
  $("tot").textContent = money(T.t);

  if($("checkoutTot")){
    $("checkoutTot").textContent = money(T.t);
  }

  var ids = Object.keys(cart);

  $("items").innerHTML = ids.length
    ? ids.map(function(id){
        var p = get(id);

        return '<div class="it">' +

          '<div class="mini" data-open="' + id.split("|")[0] + '" style="overflow:hidden;cursor:zoom-in;">' +
            (p.img
              ? '<img src="' + p.img + '" alt="' + p.n + '" style="width:100%;height:100%;object-fit:contain;">'
              : '<span>' + p.e + '</span>'
            ) +
          '</div>' +

          '<div class="t">' +
            '<strong data-open="' + id.split("|")[0] + '" style="cursor:pointer;">' + p.n + '</strong>' +
            '<small>Color: ' + vname(id) + ' · ' + money(p.p) + ' c/u</small>' +
            '<strong class="sub">' + money(p.p * cart[id]) + '</strong>' +
          '</div>' +

          '<div class="qty">' +
            '<button data-c="-1" data-id="' + id + '" aria-label="Menos">−</button>' +
            '<span>' + cart[id] + '</span>' +
            '<button data-c="1" data-id="' + id + '" aria-label="Más">+</button>' +
          '</div>' +

          '<button class="rm" data-rm="' + id + '" aria-label="Quitar">🗑</button>' +
        '</div>';
      }).join("")
    : '<div class="empty">Tu carrito está vacío. Agrega un producto para empezar.</div>';

  $("form").style.display = ids.length ? "grid" : "none";

  save();
}

function openCart(o){$("dr").classList.toggle("open",o);$("ov").classList.toggle("open",o)}

document.addEventListener("click",function(e){
 var o=e.target.closest("[data-open]");if(o){openModal(o.dataset.open);return}
 var b=e.target.closest("button,a");if(!b)return;
 var d=b.dataset;
 if(d.th){M.i=+d.th;renderModal();return}
 if(d.sw){M.v=+d.sw;renderModal();return}
 if(d.nav){M.i=(M.i+ +d.nav+slides(get(M.id)).length)%slides(get(M.id)).length;renderModal();return}
 if(d.mq){M.q=Math.max(1,Math.min(M.q+ +d.mq,get(M.id).s));renderModal();return}
 if(d.madd){if(addToCart(M.id,M.q,M.v)){M.q=1;renderModal()}return}
 if(d.rmimg){var A=extra[M.id];A.splice(M.i-3,1);try{localStorage.setItem("fb_img",JSON.stringify(extra))}catch(x){}M.i=Math.max(0,M.i-1);renderModal();return}
 if(d.f){filter=d.f;renderFilters();renderGrid();return}
 if(d.fav){favs[d.fav]=!favs[d.fav];save();renderGrid();return}
 if(d.q){var id=d.id,k=(qtys[id]||1)+ +d.q,p=get(id);qtys[id]=Math.max(1,Math.min(k,p.s));renderGrid();return}
 if(d.add){addToCart(d.add,qtys[d.add]||1,defVi(get(d.add)));return}
 if(d.c){var id=d.id,n=cart[id]+ +d.c;if(n<1)delete cart[id];else if(n<=get(id).s)cart[id]=n;else toast("Stock máximo alcanzado");renderCart();return}
 if(d.rm){delete cart[d.rm];renderCart()}
});
$("q").addEventListener("input",renderGrid);
$("openCart").onclick=function(){openCart(true)};
$("closeCart").onclick=$("ov").onclick=function(){openCart(false)};
document.addEventListener("keydown",function(e){if(e.key=="Escape"){openCart(false);closeModal()}});
$("clr").onclick=function(){cart={};renderCart()};

/*function pedido(){
 var nom=$("nom").value.trim(),tel=$("tel").value.trim(),dir=$("dir").value.trim();
 if(!Object.keys(cart).length){$("err").textContent="Tu carrito está vacío.";return null}
 if(!nom||!tel||!dir){$("err").textContent="Completa nombre, celular y dirección.";return null}
 if(tel.replace(/\D/g,"").length<9){$("err").textContent="Escribe un celular válido de 9 dígitos.";return null}

 $("err").textContent="";
 var L=["*🛒NUEVO PEDIDO*",""];
 Object.keys(cart).forEach(function(id){var p=get(id);L.push("• "+cart[id]+" x "+p.n+" (Color: "+vname(id)+") – "+money(p.p*cart[id]))});
 L.push("","*Total: "+money(total().t)+"*","","Cliente: "+nom,"Celular: "+tel);
 if($("mail").value.trim())L.push("Correo: "+$("mail").value.trim());
 L.push("Dirección: "+dir);
 if($("nota").value.trim())L.push("Notas: "+$("nota").value.trim());
 return L.join("\n");
}*/


function pedido(){

  var nom=$("nom").value.trim();
  var tel=$("tel").value.trim();
  var dir=$("dir").value.trim();

  if(!Object.keys(cart).length){
    $("err").textContent="Tu carrito está vacío.";
    return null;
  }

  if(!nom||!tel||!dir){
    $("err").textContent="Completa nombre, celular y dirección.";
    return null;
  }

  if(tel.replace(/\D/g,"").length<9){
    $("err").textContent="Escribe un celular válido de 9 dígitos.";
    return null;
  }

  $("err").textContent="";

  var fecha=new Date().toLocaleDateString("es-PE");

  var L=[
    "🛒 *NUEVO PEDIDO*",
    "",
    "Fecha: "+fecha,
    "",
    "*DATOS DEL CLIENTE*",
    "",
    "Cliente: "+nom,
    "Celular: "+tel,
    "Dirección: "+dir,
    "",
    "*DETALLE DEL PEDIDO*",
    ""
  ];

  Object.keys(cart).forEach(function(id,i){

    var p=get(id);
    var cantidad=cart[id];
    var subtotal=p.p*cantidad;

    L.push(
      (i+1)+". *"+p.n+"*",
      "",
      "Cantidad: "+cantidad,
      "Precio caja: "+money(p.p),
      "Subtotal: "+money(subtotal),
      ""
    );

  });

  L.push(
    "━━━━━━━━━━━━━━━━",
    "",
    "*TOTAL: "+money(total().t)+"*",
    "",
    "Gracias por tu compra."
  );

  if($("mail").value.trim()){
    L.push("", "Correo: "+$("mail").value.trim());
  }

  if($("nota").value.trim()){
    L.push("Notas: "+$("nota").value.trim());
  }

  return L.join("\n");
}



function viaWa(t){window.open("https://wa.me/"+WA_NUMERO+"?text="+encodeURIComponent(t),"_blank")}
function viaMail(t){location.href="mailto:"+CORREO_TIENDA+"?subject="+encodeURIComponent("Hola, quiero confirmar mi pedido")+"&body="+encodeURIComponent(t.replace(/\*/g,""))}
function listo(){toast("Pedido enviado ✓ Gracias por tu compra");cart={};renderCart();renderGrid()}
$("sWa").onclick=function(){var t=pedido();if(t){viaWa(t);listo()}};
$("sMail").onclick=function(){var t=pedido();if(t){viaMail(t);listo()}};
$("sBoth").onclick=function(){var t=pedido();if(t){viaWa(t);setTimeout(function(){viaMail(t);listo()},700)}};
var h="https://wa.me/"+WA_NUMERO+"?text="+encodeURIComponent("Hola, tengo una consulta.");
$("waHelp").href=h;$("waFloat").href=h;
// ===== Detalle de producto: galería, colores y subida de fotos =====
var PAL=[["Celeste",["#6cb7f5","#2f7fe0"]],["Rosa",["#ffb3cf","#f27fae"]],["Verde",["#8fe3c4","#2fb68a"]],["Lila",["#c9b2f2","#9a73e0"]]];
P.forEach(function(p){p.v=PAL});
var M={id:1,i:0,v:0,q:1},extra={};
try{extra=JSON.parse(localStorage.getItem("fb_img")||"{}")}catch(e){}
function defVi(p){var k=0;PAL.forEach(function(a,i){if(a[1][0]==p.c[0])k=i});return k}
function vname(key){var s=String(key).split("|");return get(s[0]).v[s[1]||0][0]}
function vcol(key){var s=String(key).split("|");return get(s[0]).v[s[1]||0][1]}
function addToCart(id,k,vi){var p=get(id),cur=0;Object.keys(cart).forEach(function(x){if(parseInt(x)==id)cur+=cart[x]});
 if(cur+k>p.s){toast("Solo hay "+p.s+" unidades disponibles");return false}
 var key=id+"|"+vi;cart[key]=(cart[key]||0)+k;qtys[id]=1;renderCart();renderGrid();toast("Agregado al carrito ✓");return true}



function slides(p){
 var s=[{t:"pack"}];

 (p.fotos||[]).forEach(function(u){
  s.push({t:"img",u:u});
 });

 return s;
}

 /*function slides(p){var s=[{t:"pack"},{t:"uso"},{t:"info"}];(extra[p.id]||[]).forEach(function(u){s.push({t:"img",u:u})});return s}
 esta funcion la voy a remplasar por otra que canbia para fotografias
function stage(p,s,c){
 if(s.t=="img")return '<div class="stage"><img src="'+s.u+'" alt="Foto del producto"></div>';
 var h=s.t=="pack"?'<div><div class="big">FABIBLUU</div>Toallas húmedas para bebé<br><span class="badge">'+p.q+' unidades</span></div>':
  s.t=="uso"?'<div style="padding:18px"><div class="big" style="font-size:1.7rem">Cómo usar</div>1️⃣ Saca una toalla<br>2️⃣ Limpia con suavidad<br>3️⃣ Cierra bien el empaque</div>':
  '<div style="padding:18px"><div class="big" style="font-size:1.7rem">Detalles del producto</div>Imagen de ejemplo: aquí irá tu foto explicativa.</div>';
 return '<div class="stage" style="background:linear-gradient(135deg,'+c[0]+','+c[1]+')">'+h+'</div>'}*/

function stage(p,s,c){

 if(s.t=="img"){
  return '<div class="stage">'+
   '<img src="'+s.u+'" alt="'+p.n+'" style="width:100%;height:100%;object-fit:contain;">'+
   '</div>';
 }

 if(s.t=="pack" && p.img){
  return '<div class="stage">'+
   '<img src="'+p.img+'" alt="'+p.n+'" style="width:100%;height:100%;object-fit:contain;">'+
   '</div>';
 }

 return '<div class="stage">'+
  '<div class="big">'+p.n+'</div>'+
  '<p>'+p.d+'</p>'+
  '</div>';
}


function renderModal(){

 var p=get(M.id);
 var S=slides(p);
 var c=p.v[M.v][1];
 var out=p.s<=0;

 if(M.i>=S.length) M.i=0;

 $("mb").innerHTML=
 '<div class="mg">'+

  '<div>'+
   '<div class="gal">'+
    stage(p,S[M.i],c)+
    '<button class="ar l" data-nav="-1" aria-label="Anterior">‹</button>'+
    '<button class="ar r" data-nav="1" aria-label="Siguiente">›</button>'+
   '</div>'+
  '</div>'+

  '<div>'+
   '<h2 style="font-size:1.7rem;margin:8px 40px 8px 0">'+p.n+'</h2>'+
   '<div class="price">'+money(p.p)+
    (p.o?'<s>'+money(p.o)+'</s>':'')+
   '</div>'+

   '<p style="color:var(--mut)">'+p.d+'</p>'+

   '<div class="row">'+
    '<div class="qty">'+
     '<button data-mq="-1" aria-label="Menos">−</button>'+
     '<span>'+M.q+'</span>'+
     '<button data-mq="1" aria-label="Más">+</button>'+
    '</div>'+

    '<button class="add" data-madd="1"'+
     (out?" disabled":"")+'>'+
     (out?"Agotado":"🛒 Agregar al carrito")+
    '</button>'+
   '</div>'+
  '</div>'+

 '</div>';
}


/*function renderModal(){
 var p=get(M.id),S=slides(p),c=p.v[M.v][1],out=p.s<=0;
 if(M.i>=S.length)M.i=S.length-1;
 var th=S.map(function(s,i){return '<button class="th'+(i==M.i?" on":"")+'" data-th="'+i+'" aria-label="Imagen '+(i+1)+'" style="'+(s.t=="img"?'background-image:url('+s.u+')':'background:linear-gradient(135deg,'+c[0]+','+c[1]+')')+'"></button>'}).join("");
 
 
 
 var sw=p.v.map(function(a,i){return '<button class="sw'+(i==M.v?" on":"")+'" data-sw="'+i+'" title="'+a[0]+'" aria-label="'+a[0]+'" style="background:linear-gradient(135deg,'+a[1][0]+','+a[1][1]+')"></button>'}).join("");*//*<div class="thumbs">'+th+'</div> este lo canbie entre button>.../div
 $("mb").innerHTML='<div class="mg"><div><div class="gal">'+stage(p,S[M.i],c)+'<button class="ar l" data-nav="-1" aria-label="Anterior">‹</button><button class="ar r" data-nav="1" aria-label="Siguiente">›</button></div>'+
  '<label class="up">📷 Subir fotos<input type="file" id="fup" accept="image/*" multiple hidden>  </label>'  aqui agregas fotos desde escritorio clientes  +(S[M.i].t=="img"?'<button class="rmimg" data-rmimg="1">Quitar esta foto</button>':'')+'</div>'+ 
  '<div><h2 style="font-size:1.7rem;margin:8px 40px 8px 0">'+p.n+'</h2><div class="price">'+money(p.p)+(p.o?'<s>'+money(p.o)+'</s>':'')+'</div>'+
  '<div class="stk '+(out?"out":p.s<=5?"low":"")+'">'+(out?"Agotado":p.s<=5?"Quedan "+p.s:"Disponible")+'</div><p style="color:var(--mut)">'+p.d+'</p>'+
  '<b>Color: '+p.v[M.v][0]+'</b><div class="sws">'+sw+'</div>'+


  '<div class="row"><div class="qty"><button data-mq="-1" aria-label="Menos">−</button><span>'+M.q+'</span><button data-mq="1" aria-label="Más">+</button></div><button class="add" data-madd="1"'+(out?" disabled":"")+'>'+(out?"Agotado":"🛒 Agregar al carrito")+'</button></div></div></div>';
}*/
function openModal(id){
  M={id:+id,
    i:0,
    v:defVi(get(id)),
    q:1};renderModal();
    $("md").classList.add("open");
    $("mov").classList.add("open")
  }
function closeModal(){$("md").classList.remove("open");$("mov").classList.remove("open")}
$("mx").onclick=$("mov").onclick=closeModal;
/*(aqui esta el encargado de subir archivo tamaño rev:)document.addEventListener("change",function(e){
 if(e.target.id!="fup")return;var p=get(M.id);
 Array.prototype.forEach.call(e.target.files,function(f){var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){
  var k=Math.min(1,900/Math.max(im.width,im.height)),cv=document.createElement("canvas");cv.width=im.width*k;cv.height=im.height*k;cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);
  (extra[p.id]=extra[p.id]||[]).push(cv.toDataURL("image/jpeg",.8));
  try{localStorage.setItem("fb_img",JSON.stringify(extra))}catch(x){toast("Foto agregada, pero no cabe para guardarla")}
  M.i=slides(p).length-1;renderModal()};im.src=r.result};r.readAsDataURL(f)})});*/
renderFilters();renderGrid();renderCart();

// ===== ABRIR VENTANA FINALIZAR PEDIDO =====

$("finalizeBtn").onclick=function(){

  if(!Object.keys(cart).length){
    toast("Primero agrega productos al carrito");
    return;
  }

  $("checkoutTot").textContent=money(total().t);

  $("checkoutOv").classList.add("open");

};


// ===== CERRAR VENTANA =====

function closeCheckout(){

  $("checkoutOv").classList.remove("open");

}

$("checkoutClose").onclick=closeCheckout;

$("checkoutOv").onclick=function(e){

  if(e.target===this){
    closeCheckout();
  }

};