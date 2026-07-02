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

/* Jadwal ibadah mingguan */
export const weeklyServices = [
  {
    day: "Minggu",
    time: "07.45 WIB",
    title: "Kebaktian Pagi",
    note: "Ibadah utama pembuka hari Tuhan.",
  },
  {
    day: "Minggu",
    time: "10.00 WIB",
    title: "Kebaktian Siang",
    note: "Ibadah keluarga terbuka untuk semua jemaat dan tamu.",
  },
  {
    day: "Minggu",
    time: "17.00 WIB",
    title: "Kebaktian Sore",
    note: "Ibadah penutup hari Minggu.",
  },
  {
    day: "Rabu & Kamis",
    time: "20.00 WIB",
    title: "Ibadah Sektor",
    note: "Partangiangan yang bergilir di rumah jemaat tiap lingkungan.",
  },
] as const;

/* Ibadah raya dan hari besar gerejawi.
   Tanggal hari besar yang berpindah mengikuti kalender Paskah, perbarui tiap tahun. */
export const specialServices = [
  { name: "Ibadah Natal", tanggal: "25 Desember 2026" },
  { name: "Ibadah Tahun Baru", tanggal: "1 Januari 2027" },
  { name: "Ibadah Jumat Agung", tanggal: "26 Maret 2027" },
  { name: "Ibadah Kebangkitan (Paskah)", tanggal: "28 Maret 2027" },
  { name: "Ibadah Kenaikan Yesus Kristus", tanggal: "6 Mei 2027" },
  { name: "Ibadah Pentakosta", tanggal: "16 Mei 2027" },
  { name: "Ibadah Kematian", tanggal: "Sesuai kebutuhan" },
] as const;

/* Statistik jemaat */
export const stats = [
  { value: "16", label: "Lingkungan", sub: "Wijk pelayanan jemaat" },
  { value: "47", label: "Sintua", sub: "Penatua yang melayani" },
  { value: "1861", label: "Warisan HKBP", sub: "Tahun berdirinya HKBP" },
  { value: "3", label: "Huria Pagaran", sub: "Gereja di bawah Ressort" },
] as const;

/* Huria pagaran di bawah Ressort Medan Utara */
export const ressort = {
  center: "HKBP Glugur",
  centerAlamat:
    "Jl. Pembangunan III No.57A, Glugur Darat II, Kec. Medan Timur, Kota Medan, Sumatera Utara 20238",
  name: "HKBP Ressort Medan Utara",
  distrik: "Distrik X Medan Aceh",
  note: "HKBP Glugur menjadi pusat Ressort Medan Utara. Tiga huria pagaran melayani di bawah naungan yang sama.",
  pagaran: [
    {
      name: "HKBP Pulo Brayan",
      role: "Huria Pagaran",
      desc: "Melayani jemaat di kawasan Pulo Brayan, Medan.",
      alamat:
        "Jl. KL. Yos Sudarso, Pulo Brayan Kota, Kec. Medan Barat, Kota Medan, Sumatera Utara 20239",
    },
    {
      name: "HKBP Marturia",
      role: "Huria Pagaran",
      desc: "Melayani jemaat di kawasan Tanjung Mulia, Medan Deli.",
      alamat:
        "Jl. Tol Mulia 5 No.17, Tj. Mulia Hilir, Kec. Medan Deli, Kota Medan, Sumatera Utara 20241",
    },
    {
      name: "HKBP Pardomuan Nauli",
      role: "Huria Pagaran",
      desc: "Melayani jemaat di kawasan Titi Papan, Medan Deli.",
      alamat: "Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242",
    },
  ],
} as const;

/* Makna elemen logo HKBP */
export const logoMeaning = [
  {
    title: "Salib",
    body: "Melambangkan pengorbanan Yesus Kristus. Iman kepada Kristus menjadi dasar gereja dalam memberitakan Injil dan melayani sesama.",
  },
  {
    title: "Lingkaran Trinitas",
    body: "Menggambarkan Allah yang esa dalam tiga pribadi, yaitu Bapa, Anak, dan Roh Kudus. Inilah pusat keyakinan HKBP.",
  },
  {
    title: "Tulisan HKBP",
    body: "Singkatan dari Huria Kristen Batak Protestan. Menegaskan identitas gereja Protestan yang lahir dari masyarakat Batak.",
  },
] as const;

/* Bidang pelayanan dan kategorial */
export const ministries = [
  {
    name: "Sekolah Minggu",
    desc: "Anak belajar iman lewat cerita Alkitab, nyanyian, dan kasih.",
  },
  {
    name: "Naposobulung (NHKBP)",
    desc: "Wadah pemuda dan pemudi bertumbuh dalam iman, talenta, dan kebersamaan.",
  },
  {
    name: "Punguan Ina",
    desc: "Persekutuan kaum ibu dalam doa, diakonia, dan pelayanan sosial.",
  },
  {
    name: "Punguan Ama",
    desc: "Persekutuan kaum bapak yang menopang pelayanan dan pembangunan gereja.",
  },
  {
    name: "Paduan Suara",
    desc: "Koor jemaat yang memuji Tuhan lewat marende dan musik gerejawi.",
  },
  {
    name: "Diakonia Sosial",
    desc: "Pelayanan kasih untuk jemaat yang sakit, lansia, dan yang membutuhkan.",
  },
] as const;

/* Linimasa sejarah HKBP, line by line dari Nommensen */
export const timeline = [
  {
    year: "1861",
    title: "Awal Pekabaran Injil",
    body: "Pada 7 Oktober 1861 para misionaris membuka misi di Tanah Batak. Tanggal ini menjadi hari lahir HKBP.",
  },
  {
    year: "1862",
    title: "Nommensen Datang",
    body: "Ingwer Ludwig Nommensen tiba sebagai utusan RMG. Dia mulai dari Padang, lalu Barus, menuju Silindung.",
  },
  {
    year: "1864",
    title: "Masuk Lembah Silindung",
    body: "Nommensen menetap di Huta Dame, Silindung. Dari sini Injil menyebar ke seluruh Tanah Batak.",
  },
  {
    year: "1865",
    title: "Baptisan Pertama",
    body: "Pada 27 Agustus 1865 Nommensen membaptis empat pasangan suami istri di Silindung.",
  },
  {
    year: "1881",
    title: "Ephorus Pertama",
    body: "Nommensen terpilih menjadi Ephorus pertama yang memimpin pelayanan HKBP.",
  },
  {
    year: "1918",
    title: "Nommensen Wafat",
    body: "Nommensen meninggal di Sigumpar. Jemaat mengenangnya sebagai Apostel Batak.",
  },
  {
    year: "1940",
    title: "HKBP Mandiri",
    body: "Pada Sinode Godang 1940, Pdt. K. Sirait menjadi Ephorus Batak pertama. HKBP berdiri sebagai gereja mandiri.",
  },
  {
    year: "1952",
    title: "Gereja Lutheran Dunia",
    body: "HKBP bergabung dengan Lutheran World Federation dan diakui secara internasional.",
  },
  {
    year: "Kini",
    title: "Terbesar di Asia Tenggara",
    body: "HKBP tumbuh menjadi gereja Kristen Protestan terbesar di Asia Tenggara dengan jutaan warga jemaat.",
  },
  {
    year: "Glugur",
    title: "Melayani Kota Medan",
    body: "HKBP Glugur berdiri di Glugur Darat sebagai pusat Ressort Medan Utara, Distrik X Medan Aceh.",
  },
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

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Tentang",
    href: "/#tentang",
    children: [
      { label: "Profil Gereja", href: "/#tentang" },
      { label: "Sejarah HKBP", href: "/#sejarah" },
      { label: "Huria Pagaran", href: "/#pagaran" },
      { label: "Pimpinan Gereja", href: "/kepemimpinan" },
    ],
  },
  {
    label: "Ibadah",
    href: "/#ibadah",
    children: [
      { label: "Jadwal Ibadah", href: "/#ibadah" },
      { label: "Warta Tata Ibadah", href: "/warta" },
    ],
  },
  {
    label: "Pelayanan",
    href: "/#pelayanan",
    children: [
      { label: "Bidang Pelayanan", href: "/#pelayanan" },
      { label: "Majelis Sintua", href: "/sintua" },
    ],
  },
  {
    label: "Buku Digital",
    href: "/buku",
    children: [
      { label: "Alkitab", href: "/buku/alkitab" },
      { label: "Buku Ende", href: "/buku/buku-ende" },
      { label: "Kidung Jemaat", href: "/buku/kidung-jemaat" },
    ],
  },
  { label: "Galeri", href: "/media" },
  {
    label: "Informasi",
    href: "/informasi",
    children: [
      { label: "Persembahan", href: "/informasi#persembahan" },
      { label: "Tarif Fasilitas", href: "/informasi#tarif" },
      { label: "Administrasi Pernikahan", href: "/informasi#pernikahan" },
    ],
  },
  { label: "Lokasi", href: "/#lokasi" },
];
