const PRODUCTS=[
 {sku:"HC-01",name:"Daily Cleanse Shampoo",type:"แชมพูทำความสะอาดเส้นผม",price:189,stock:30,description:"แชมพูสำหรับทำความสะอาดเส้นผม เหมาะสำหรับใช้เป็นประจำ ขนาด 300 มล."},
 {sku:"HC-02",name:"Smooth & Shine Hair Serum",type:"เซรั่มบำรุงเส้นผม",price:249,stock:25,description:"เซรั่มบำรุงเส้นผม ช่วยให้ผมดูเรียบลื่นและเงางาม ขนาด 50 มล."}
];
const money=n=>new Intl.NumberFormat('th-TH',{style:'currency',currency:'THB',maximumFractionDigits:0}).format(n);
const art=(extra='')=>`<div class="product-art"><div class="bottle ${extra}"><small>HAIR CARE</small><b>${extra?'SERUM':'SHAMPOO'}</b><span>DAILY CARE</span></div></div>`;
document.querySelector('#product-grid').innerHTML=PRODUCTS.map((p,i)=>`<article class="product">${art(i?'bottle-b':'')}<h3>${p.name}</h3><div class="sku">SKU: ${p.sku} · ${p.type}</div><p>${p.description}</p><div class="price">${money(p.price)}</div><button class="primary" onclick="document.querySelector('#sku').value='${p.sku}';document.querySelector('#order').scrollIntoView({behavior:'smooth'})">สั่งซื้อสินค้านี้</button></article>`).join('');
document.querySelector('#sku').innerHTML=PRODUCTS.map(p=>`<option value="${p.sku}">${p.name} — ${money(p.price)}</option>`).join('');
const SHEETS_WEB_APP_URL=''; // วาง URL จาก Google Apps Script Web App หลัง Deploy
document.querySelector('#order-form').addEventListener('submit',async e=>{
 e.preventDefault();const f=new FormData(e.target),p=PRODUCTS.find(x=>x.sku===f.get('sku')),qty=Number(f.get('qty'));
 if(qty>p.stock){document.querySelector('#notice').textContent=`สต็อกคงเหลือ ${p.stock} ชิ้น กรุณาลดจำนวน`;return}
 const order={orderId:'HC'+Date.now(),date:new Date().toISOString(),customer:f.get('customer'),phone:f.get('phone'),address:f.get('address'),sku:p.sku,product:p.name,qty,unitPrice:p.price,total:p.price*qty,status:'รอหยิบสินค้า'};
 const orders=JSON.parse(localStorage.getItem('hairOrders')||'[]');orders.push(order);localStorage.setItem('hairOrders',JSON.stringify(orders));
 if(SHEETS_WEB_APP_URL){try{await fetch(SHEETS_WEB_APP_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(order)})}catch(err){console.warn('ส่ง Google Sheets ไม่สำเร็จ',err)}}
 document.querySelector('#notice').textContent=`รับคำสั่งซื้อ ${order.orderId} แล้ว ยอดชำระ ${money(order.total)} — บันทึกออเดอร์ในระบบแล้ว`;
 e.target.reset();document.querySelector('#sku').selectedIndex=0;
});