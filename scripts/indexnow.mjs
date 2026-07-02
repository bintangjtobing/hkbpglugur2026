/* Submit URL situs ke IndexNow (Bing, Yandex, dll).
   Jalankan: node scripts/indexnow.mjs
   Jalankan ulang setiap kali konten halaman berubah. */

const HOST = "hkbpglugur.com";
const KEY = "9ec125c8cdc64ea294a36aabdea151e0";
const BASE = `https://${HOST}`;

const paths = [
  "/",
  "/tema-transformasi",
  "/kepemimpinan",
  "/sintua",
  "/informasi",
  "/media",
  "/pengembang",
  "/buku",
  "/buku/alkitab",
  "/buku/buku-ende",
  "/buku/kidung-jemaat",
];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${BASE}/${KEY}.txt`,
  urlList: paths.map((p) => `${BASE}${p === "/" ? "" : p}`),
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log("IndexNow status:", res.status);
console.log("URL dikirim:", body.urlList.length);
if (res.status !== 200 && res.status !== 202) {
  console.log("Respons:", await res.text());
}
