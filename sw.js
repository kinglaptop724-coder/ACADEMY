/* Service worker: ทำให้ติดตั้งแอปได้ + เปิดหน้าเว็บได้เร็วขึ้น
 * - หน้าเว็บ (index.html): ดึงจากเน็ตก่อน ถ้าออฟไลน์ใช้ของที่เก็บไว้ → อัปเดตเว็บแล้วผู้ใช้ได้ของใหม่ทันที
 * - ไฟล์ไอคอน/manifest: ใช้ของที่เก็บไว้ก่อน แล้วอัปเดตเบื้องหลัง
 * - ไม่แตะ API (Apps Script) และคำขอข้ามโดเมนทั้งหมด ข้อมูลจึงสดใหม่เสมอ
 * เปลี่ยนเลข VERSION เมื่อต้องการล้างแคชเก่า */
var VERSION = 'v3';
var CACHE = 'fbcards-' + VERSION;
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(SHELL.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('fbcards-') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;           // API / ฟอนต์ ปล่อยผ่านไปที่เครือข่ายตามปกติ

  if (req.mode === 'navigate') {                              // เปิดหน้าเว็บ: เน็ตก่อน → แคช
    e.respondWith(fetch(req).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put('index.html', copy); });
      return res;
    }).catch(function () {
      return caches.match('index.html').then(function (r) { return r || caches.match('./'); });
    }));
    return;
  }

  e.respondWith(caches.match(req).then(function (hit) {       // ไฟล์อื่น: แคชก่อน + อัปเดตเบื้องหลัง
    var net = fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () { return hit; });
    return hit || net;
  }));
});
