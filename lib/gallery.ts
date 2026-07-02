/* ============================================================
   Galeri foto HKBP Glugur.
   Cara menambah foto:
   1. Taruh file gambar di folder public/gallery/ (mis. ibadah-1.webp).
   2. Tambahkan entri di array di bawah.
   Preview akan langsung muncul di halaman /media.
   ============================================================ */

export type GalleryPhoto = { src: string; alt: string };

export const galleryPhotos: GalleryPhoto[] = [
  // Contoh:
  // { src: "/gallery/gedung-gereja.webp", alt: "Gedung HKBP Glugur" },
  // { src: "/gallery/ibadah-natal.webp", alt: "Ibadah Natal HKBP Glugur" },
];
