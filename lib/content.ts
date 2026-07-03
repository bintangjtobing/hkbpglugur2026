/* ============================================================
   HKBP Glugur, Sumber Data Konten
   Semua teks situs terpusat di sini agar mudah diperbarui.
   ============================================================ */

export const church = {
  name: "HKBP Glugur",
  fullName: "Huria Kristen Batak Protestan Glugur",
  ressort: "Ressort Medan Utara",
  distrik: "Distrik X Medan Aceh",
  tagline:
    "Rumah untuk bertumbuh dalam iman, kasih, dan pelayanan di Kota Medan.",
  verse: {
    text: "Marsiurupan ma hamu di na porsuk!",
    ref: "Galatia 6:2. Bertolong-tolonganlah kamu menanggung bebanmu.",
  },
  address: {
    street: "Jl. Pembangunan III No.57A",
    area: "Glugur Darat II, Kec. Medan Timur",
    city: "Kota Medan, Sumatera Utara 20238",
    maps: "https://maps.google.com/?q=HKBP+Glugur+Jl+Pembangunan+III+No+57A+Medan",
    embed:
      "https://www.google.com/maps?q=Jl.%20Pembangunan%20III%20No.57A%2C%20Glugur%20Darat%20II%2C%20Medan%20Timur%2C%20Medan&output=embed",
  },
  contact: {
    facebook: "https://www.facebook.com/hkbpglugurofficial/",
    facebookLabel: "facebook.com/hkbpglugurofficial",
    email: "hkbpglugurmdn@gmail.com",
    phone: "(061) 6611846",
    phoneLink: "+62616611846",
  },
} as const;

/* Data struktural beranda. Prosa (hari, judul, catatan, dst) ada di
   kamus dict.home dan disejajarkan per-indeks dengan array di sini. */

/* Jadwal ibadah mingguan: hanya jam yang tetap lintas bahasa. */
export const weeklyServices = [
  { time: "07.45 WIB" },
  { time: "10.00 WIB" },
  { time: "17.00 WIB" },
  { time: "20.00 WIB" },
] as const;

/* Ibadah raya dan hari besar gerejawi. Tanggal yang berpindah mengikuti
   kalender Paskah, perbarui tiap tahun. tanggal null = teks kondisional
   diambil dari kamus (mis. "Sesuai kebutuhan"). */
export const specialServices = [
  { tanggal: "25 Desember 2026" },
  { tanggal: "1 Januari 2027" },
  { tanggal: "26 Maret 2027" },
  { tanggal: "28 Maret 2027" },
  { tanggal: "6 Mei 2027" },
  { tanggal: "16 Mei 2027" },
  { tanggal: null },
] as const;

/* Statistik jemaat: hanya nilai angka. Label dan subteks ada di kamus. */
export const stats = [
  { value: "16" },
  { value: "47" },
  { value: "1861" },
  { value: "3" },
] as const;

/* Huria pagaran di bawah Ressort Medan Utara: nama dan alamat (proper noun). */
export const ressort = {
  center: "HKBP Glugur",
  centerAlamat:
    "Jl. Pembangunan III No.57A, Glugur Darat II, Kec. Medan Timur, Kota Medan, Sumatera Utara 20238",
  name: "HKBP Ressort Medan Utara",
  distrik: "Distrik X Medan Aceh",
  pagaran: [
    {
      name: "HKBP Pulo Brayan",
      alamat:
        "Jl. KL. Yos Sudarso, Pulo Brayan Kota, Kec. Medan Barat, Kota Medan, Sumatera Utara 20239",
    },
    {
      name: "HKBP Marturia",
      alamat:
        "Jl. Tol Mulia 5 No.17, Tj. Mulia Hilir, Kec. Medan Deli, Kota Medan, Sumatera Utara 20241",
    },
    {
      name: "HKBP Pardomuan Nauli",
      alamat: "Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242",
    },
  ],
} as const;

/* Tahun linimasa sejarah HKBP. Judul dan isi ada di kamus (per-indeks). */
export const timeline = [
  { year: "1861" },
  { year: "1862" },
  { year: "1864" },
  { year: "1865" },
  { year: "1881" },
  { year: "1918" },
  { year: "1940" },
  { year: "1952" },
  { year: "Kini" },
  { year: "Glugur" },
] as const;

/* Rating dan ulasan */
export const reviews = {
  google: {
    rating: "4,6",
    stars: 4.6,
    count: 59,
    url: "https://g.page/r/CbihAdgZ1EIaEBM/review",
  },
  facebook: {
    rating: "4,8",
    stars: 4.8,
    count: 35,
    url: "https://www.facebook.com/hkbpglugurofficial/reviews",
  },
} as const;

/* Navigasi. Label diambil dari kamus lewat `key` (dict.nav[key]),
   href tetap konstan dan diberi prefix locale saat dirender. */
export type NavItem = {
  key: string;
  href: string;
  children?: { key: string; href: string }[];
};

export const nav: NavItem[] = [
  { key: "beranda", href: "/" },
  {
    key: "tentang",
    href: "/#tentang",
    children: [
      { key: "profil", href: "/#tentang" },
      { key: "sejarahGlugur", href: "/sejarah-hkbp-glugur" },
      { key: "sejarahHkbp", href: "/#sejarah" },
      { key: "pagaran", href: "/#pagaran" },
      { key: "pimpinan", href: "/kepemimpinan" },
      { key: "lokasi", href: "/#lokasi" },
    ],
  },
  {
    key: "ibadah",
    href: "/#ibadah",
    children: [
      { key: "jadwal", href: "/#ibadah" },
      { key: "warta", href: "/warta" },
    ],
  },
  {
    key: "pelayanan",
    href: "/#pelayanan",
    children: [
      { key: "bidang", href: "/#pelayanan" },
      { key: "sintua", href: "/sintua" },
    ],
  },
  {
    key: "bukuDigital",
    href: "/buku",
    children: [
      { key: "alkitab", href: "/buku/alkitab" },
      { key: "bukuEnde", href: "/buku/buku-ende" },
      { key: "kidungJemaat", href: "/buku/kidung-jemaat" },
    ],
  },
  {
    key: "galeri",
    href: "/media",
    children: [
      { key: "galeriFoto", href: "/media" },
      { key: "ulasan", href: "/ulasan" },
    ],
  },
  {
    key: "informasi",
    href: "/informasi",
    children: [
      { key: "persembahan", href: "/informasi#persembahan" },
      { key: "tarif", href: "/informasi#tarif" },
      { key: "pernikahan", href: "/informasi#pernikahan" },
    ],
  },
];
