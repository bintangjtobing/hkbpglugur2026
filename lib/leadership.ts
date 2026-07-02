/* ============================================================
   Kepemimpinan HKBP dan Distrik X Medan Aceh
   Periode 2024 sampai 2028. Sumber data: hkbp.or.id
   ============================================================ */

export type Leader = { jabatan: string; nama: string };

export const pimpinanHKBP: Leader[] = [
  { jabatan: "Ephorus", nama: "Pdt. Dr. Victor Tinambunan, MST." },
  { jabatan: "Sekretaris Jenderal", nama: "Pdt. Rikson M. Hutahaean, M.Th." },
  { jabatan: "Kepala Departemen Koinonia", nama: "Pdt. Dr. Deonal Sinaga" },
  { jabatan: "Kepala Departemen Marturia", nama: "Pdt. Bernard Manik, M.Th." },
  { jabatan: "Kepala Departemen Diakonia", nama: "Pdt. Eldarton Simbolon, D.Min." },
];

export const pimpinanDistrik: Leader[] = [
  { jabatan: "Praeses", nama: "Pdt. Suwandi Sinambela, S.Th., M.Psi." },
  { jabatan: "Sekretaris Distrik", nama: "Pdt. Indra Hutauruk, M.Th." },
  { jabatan: "Kepala Departemen Koinonia", nama: "Pdt. Darwin Sihombing, S.Th." },
  { jabatan: "Kepala Departemen Marturia", nama: "Pdt. Wahyu N.L. Siregar, S.Th." },
  { jabatan: "Kepala Departemen Diakonia", nama: "Pdt. Tunggul Swardi Aruan, S.Th." },
];
