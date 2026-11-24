# HAIR CARE SHOP — โปรเจกต์งาน LSM496 ข้อ 003

## สิ่งที่มีในโปรเจกต์
- `index.html` — Landing Page แสดงสินค้าและฟอร์มสั่งซื้อ
- `admin.html` — ระบบดูออเดอร์ เปลี่ยนสถานะหยิบ/แพ็ก และพิมพ์ใบปะหน้าพัสดุ
- `app.js`, `styles.css` — การทำงานและรูปแบบเว็บไซต์
- `apps-script/Code.gs` — ตัวเชื่อมต่อ Google Sheets (ต้องตั้งค่า URL ก่อน)
- `HAIR_CARE_SHOP_data.xlsx` — ไฟล์ฐานข้อมูลเริ่มต้น มี Products, Orders, Picking_Packing, Shipping_Label, Instructions
- `products.csv`, `orders.csv` — ไฟล์ CSV สำหรับนำเข้า Google Sheets

## ข้อมูลสินค้า (ตัวอย่างสำหรับการศึกษา)
- HC-01 Daily Cleanse Shampoo — 300 มล. — 189 บาท — สต็อกตั้งต้น 30 ชิ้น
- HC-02 Smooth & Shine Hair Serum — 50 มล. — 249 บาท — สต็อกตั้งต้น 25 ชิ้น
ข้อมูลราคาและสินค้าเป็นข้อมูลสมมติ ไม่ใช่การอ้างอิงผลิตภัณฑ์แบรนด์จริง

## ทดลองใช้งาน
เปิด `index.html` ในเบราว์เซอร์ ทดลองสั่งซื้อ จากนั้นเปิด `admin.html` เพื่อดูรายการออเดอร์ กด “หยิบแล้ว”, “แพ็กแล้ว” หรือ “ใบปะหน้า”
หมายเหตุ: โหมดทดลองบันทึกออเดอร์ใน localStorage ของเบราว์เซอร์เครื่องนั้น ไม่ใช่ฐานข้อมูลกลาง

## เชื่อม Google Sheets จริง
1. อัปโหลด `products.csv` เข้า Google Sheets ตั้งชื่อแท็บ `Products`
2. เปิด Extensions > Apps Script แล้ววางโค้ดจาก `apps-script/Code.gs`
3. Deploy เป็น Web app: Execute as Me และ Who has access: Anyone
4. คัดลอก Web app URL แล้วใส่ใน `app.js` ที่ `const SHEETS_WEB_APP_URL=''`
5. Commit การแก้ไขขึ้น GitHub และ Deploy Vercel ใหม่
6. ทดสอบสั่งซื้อและตรวจว่าแถวใหม่ปรากฏในแท็บ Orders

## อัปโหลด GitHub และ Deploy Vercel
1. สร้าง GitHub repository ใหม่ เช่น `hair-care-shop`
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (ยกเว้นไฟล์ xlsx หากไม่ต้องการให้เป็น public)
3. เข้า Vercel > Add New > Project > Import Git Repository
4. Framework Preset: Other; Build Command: เว้นว่าง; Output Directory: `.` 
5. กด Deploy แล้วเปิด URL ที่ Vercel ให้
6. หน้าแอดมินอยู่ที่ `/admin.html`

## ข้อจำกัด/สิ่งที่ต้องตรวจ
- ไม่ได้เชื่อมบัญชี Google/GitHub/Vercel ให้อัตโนมัติ เพราะต้องให้เจ้าของบัญชีอนุญาตและกด Deploy เอง
- ระบบในชุดนี้เป็นต้นแบบเพื่อการเรียน การตัดสต็อกในหน้าตัวอย่างคำนวณจากออเดอร์ในเบราว์เซอร์ ไม่ใช่ระบบหลายผู้ใช้แบบ production
- ควรใช้ข้อมูลผู้รับทดสอบ ไม่ควรเผยแพร่ข้อมูลส่วนบุคคลจริงใน GitHub
