// Google Apps Script สำหรับรับคำสั่งซื้อจากหน้าเว็บและบันทึกลง Google Sheets
// 1) สร้าง Google Sheet และตั้งชื่อแท็บว่า Orders
// 2) Extensions > Apps Script แล้ววางโค้ดนี้
// 3) Deploy > New deployment > Web app; Execute as Me; Who has access: Anyone
// 4) คัดลอก Web app URL ไปใส่ตัวแปร SHEETS_WEB_APP_URL ใน app.js
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('Orders');
  if (!sh) sh = ss.insertSheet('Orders');
  if (sh.getLastRow() === 0) sh.appendRow(['Order ID','Date','Customer','Phone','Address','SKU','Product','Qty','Unit Price','Total','Status']);
  const o = JSON.parse(e.postData.contents);
  sh.appendRow([o.orderId,o.date,o.customer,o.phone,o.address,o.sku,o.product,o.qty,o.unitPrice,o.total,o.status]);
  return ContentService.createTextOutput(JSON.stringify({ok:true,orderId:o.orderId})).setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  return ContentService.createTextOutput('HAIR CARE SHOP order endpoint is running.');
}