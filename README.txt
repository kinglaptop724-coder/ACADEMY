ขั้นตอนอัปโหลด
1) Apps Script: วาง Code.gs ทับของเดิม (ลบ Index.html และ Logo.html ในโปรเจกต์ได้) → รันฟังก์ชัน setup 1 ครั้ง
   → ไปที่ชีตแท็บ "แอดมิน" พิมพ์รหัสแอดมินที่เซลล์ A2 (ใส่ A3, A4 ต่อเพื่อมีหลายรหัสได้)
   → Deploy > Manage deployments > Edit > New version
2) Web app: Execute as = Me, Who has access = Anyone
3) GitHub: สร้าง repo แล้วอัปโหลดไฟล์เหล่านี้ทั้งหมดไว้ที่ราก (root) ของ repo
      index.html
      manifest.webmanifest
      sw.js
      icon.svg
      icon-192.png
      icon-512.png
      icon-maskable-512.png
      apple-touch-icon.png
   แล้ว Settings > Pages > Deploy from branch (main, /root)
4) ลิงก์แจกนักเรียน: https://ชื่อคุณ.github.io/ชื่อrepo/?openExternalBrowser=1

การติดตั้งแอป (PWA)
- ต้องเปิดผ่าน https (GitHub Pages ใช้ได้เลย) และอัปโหลดไฟล์ข้างบนครบทุกไฟล์
- ปุ่มติดตั้ง (ไอคอนลูกศรลง) อยู่ที่หัวเว็บ ข้างปุ่มฟันเฟือง · เปิดจากไอคอนบนหน้าจอหลักแล้วปุ่มจะหายไปเอง
- Android/Chrome: กดปุ่มแล้วขึ้นหน้าต่างติดตั้งทันที (และมีแถบชวนติดตั้งขึ้นเองครั้งแรก ปิดแล้วไม่ขึ้นอีก 7 วัน)
- iPhone/iPad: ต้องติดตั้งจาก Safari เท่านั้น กดปุ่มแล้วมีขั้นตอนบอก (แชร์ > เพิ่มไปยังหน้าจอโฮม)
- เปิดจากในแอป LINE/Facebook ติดตั้งไม่ได้ ปุ่มจะบอกให้เปิดในเบราว์เซอร์ก่อน (ลิงก์ ?openExternalBrowser=1 ช่วยเรื่องนี้)
- อัปเดตเว็บ: แค่อัปโหลด index.html ใหม่ ผู้ใช้จะได้ของใหม่เองตอนเปิดแอปครั้งถัดไป
  (ถ้าแก้ไฟล์ไอคอน/manifest แล้วไม่เปลี่ยน ให้แก้เลข VERSION ใน sw.js)

ลีกละ 10 คน
- ตั้งค่า LEAGUE_CAP = 10 ทั้งใน Code.gs และ index.html (ต้องตรงกัน)
- แอดมินลบสมาชิก → คนที่เข้าก่อนสุดของลีกถัดไปจะเลื่อนมาเติมลีกที่ขาด แล้วไล่ต่อกันไปทุกลีก
- ครั้งแรกหลังเปลี่ยนจาก 20 เป็น 10: รันฟังก์ชัน rebalanceLeagues 1 ครั้งใน Apps Script เพื่อย้ายคนส่วนเกินของแต่ละลีก
