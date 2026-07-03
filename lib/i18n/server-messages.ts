/* ============================================================
   Pesan sisi server (error yang dikembalikan ke pengguna + email
   balasan otomatis ke pengirim) dalam 3 bahasa. Dipisah dari kamus
   JSON supaya tidak ikut terkirim ke bundle klien. Email ke admin
   tetap Bahasa Indonesia (untuk pengelola). Batak masih draf.
   ============================================================ */
import "server-only";
import { fill } from "./fill";
import { isLocale } from "./config";

const id = {
  tooMany: "Terlalu banyak permintaan. Mohon tunggu sebentar lalu coba lagi.",
  invalidFormat: "Format permintaan tidak valid.",
  emailInvalid: "Alamat email tidak valid.",
  smtpUnset: "Layanan email belum dikonfigurasi. Hubungi pengelola situs.",
  maxFiles: "Maksimal {n} file.",
  fileType: "Tipe file {name} tidak didukung.",
  fileTypeWarta: "Tipe file {name} tidak didukung. Gunakan PDF, Word, atau gambar.",
  fileTotal20: "Total ukuran file melebihi 20 MB.",
  reqNamaEmailPesan: "Nama, email, dan pesan wajib diisi.",
  reqNamaEmail: "Nama dan email wajib diisi.",
  captchaWrong: "Jawaban verifikasi salah. Coba lagi.",
  pickPhoto: "Pilih minimal satu foto.",
  maxFotos: "Maksimal {n} foto sekali kirim.",
  onlyJpgPng: "Hanya foto JPG atau PNG yang diperbolehkan ({name}).",
  sizeExceed15: "Ukuran {name} melebihi 15 MB.",
  saveFailPhoto: "Gagal menyimpan foto. Coba lagi nanti.",
  attachWarta: "Lampirkan berkas warta.",
  sendFailPesan: "Gagal mengirim pesan. Coba lagi nanti.",
  sendFailLaporan: "Gagal mengirim laporan. Coba lagi nanti.",
  sendFail: "Gagal mengirim. Coba lagi nanti.",
  greeting: "Salam sejahtera",
  autoNote: "Email ini dikirim otomatis. Anda tidak perlu membalasnya.",
  blessing: "Tuhan Yesus memberkati.",
  permintaanAckSubject: "Permintaan Anda telah kami terima - HKBP Glugur",
  permintaanAckTitle: "Permintaan Anda telah kami terima",
  permintaanAckIntro: "Terima kasih. Permintaan Anda sudah kami terima. Tim HKBP Glugur akan meninjaunya dan menghubungi Anda bila diperlukan.",
  permintaanAckSummary: "Ringkasan pesan Anda",
  permintaanAckAttachment: "Lampiran terkirim: {n} file.",
  galeriAckSubject: "Foto Anda telah kami terima - HKBP Glugur",
  galeriAckTitle: "Foto Anda telah kami terima",
  galeriAckIntro: "Terima kasih telah membagikan foto untuk galeri HKBP Glugur. Kami sudah menerima {n} foto Anda. Tim kami akan meninjau lalu menampilkan yang sesuai di halaman galeri.",
  wartaAckSubject: "Warta Anda telah kami terima - HKBP Glugur",
  wartaAckTitle: "Warta Anda telah kami terima",
  wartaAckIntro: "Terima kasih telah mengirimkan Warta Tata Ibadah. Berkas Anda sudah kami terima. Tim kami akan memverifikasi lalu mengunggah versi rapinya ke halaman Warta Tata Ibadah.",
  wartaAckSummary: "Ringkasan kiriman",
  wartaAckAttachment: "Berkas terkirim: {n} file.",
  wartaAckKeterangan: "Keterangan",
};

type ServerMsg = typeof id;

const en: ServerMsg = {
  tooMany: "Too many requests. Please wait a moment and try again.",
  invalidFormat: "Invalid request format.",
  emailInvalid: "The email address is not valid.",
  smtpUnset: "The email service is not configured. Please contact the site manager.",
  maxFiles: "A maximum of {n} files.",
  fileType: "The file type {name} is not supported.",
  fileTypeWarta: "The file type {name} is not supported. Use PDF, Word, or an image.",
  fileTotal20: "The total file size exceeds 20 MB.",
  reqNamaEmailPesan: "Name, email, and message are required.",
  reqNamaEmail: "Name and email are required.",
  captchaWrong: "The verification answer is wrong. Please try again.",
  pickPhoto: "Choose at least one photo.",
  maxFotos: "A maximum of {n} photos per submission.",
  onlyJpgPng: "Only JPG or PNG photos are allowed ({name}).",
  sizeExceed15: "The size of {name} exceeds 15 MB.",
  saveFailPhoto: "Failed to save the photos. Please try again later.",
  attachWarta: "Attach the bulletin file.",
  sendFailPesan: "Failed to send the message. Please try again later.",
  sendFailLaporan: "Failed to send the report. Please try again later.",
  sendFail: "Failed to send. Please try again later.",
  greeting: "Peace be with you",
  autoNote: "This email was sent automatically. You do not need to reply.",
  blessing: "The Lord Jesus bless you.",
  permintaanAckSubject: "We have received your request - HKBP Glugur",
  permintaanAckTitle: "We have received your request",
  permintaanAckIntro: "Thank you. We have received your request. The HKBP Glugur team will review it and contact you if needed.",
  permintaanAckSummary: "Summary of your message",
  permintaanAckAttachment: "Attachments sent: {n} files.",
  galeriAckSubject: "We have received your photos - HKBP Glugur",
  galeriAckTitle: "We have received your photos",
  galeriAckIntro: "Thank you for sharing photos for the HKBP Glugur gallery. We have received your {n} photos. Our team will review them and show the suitable ones on the gallery page.",
  wartaAckSubject: "We have received your bulletin - HKBP Glugur",
  wartaAckTitle: "We have received your bulletin",
  wartaAckIntro: "Thank you for sending the Worship Bulletin. We have received your file. Our team will verify it and upload the clean version to the Worship Bulletin page.",
  wartaAckSummary: "Submission summary",
  wartaAckAttachment: "Files sent: {n} files.",
  wartaAckKeterangan: "Notes",
};

// Batak Toba (draf, perlu review penutur asli).
const bbc: ServerMsg = {
  tooMany: "Lobi torop pangidoan. Paima jolo, ulangi muse.",
  invalidFormat: "Format pangidoan na so tama.",
  emailInvalid: "Alamat email na so tama.",
  smtpUnset: "Layanan email ndang dope dikonfigurasi. Hubungi ma pangelola situs.",
  maxFiles: "Maksimal {n} file.",
  fileType: "Tipe file {name} ndang didukung.",
  fileTypeWarta: "Tipe file {name} ndang didukung. Pangke ma PDF, Word, manang gambar.",
  fileTotal20: "Sude ukuran ni file lobi sian 20 MB.",
  reqNamaEmailPesan: "Goar, email, dohot pesan ingkon diisi.",
  reqNamaEmail: "Goar dohot email ingkon diisi.",
  captchaWrong: "Alus verifikasi na sala. Ulangi ma.",
  pickPhoto: "Pillit ma minimal sada foto.",
  maxFotos: "Maksimal {n} foto sahali kirim.",
  onlyJpgPng: "Holan foto JPG manang PNG na boi ({name}).",
  sizeExceed15: "Ukuran ni {name} lobi sian 15 MB.",
  saveFailPhoto: "Gagal manyimpan foto. Ulangi ma muse.",
  attachWarta: "Lampirhon ma berkas warta.",
  sendFailPesan: "Gagal mangirim pesan. Ulangi ma muse.",
  sendFailLaporan: "Gagal mangirim laporan. Ulangi ma muse.",
  sendFail: "Gagal mangirim. Ulangi ma muse.",
  greeting: "Horas",
  autoNote: "Email on dikirim otomatis. Ndang pola dialusi.",
  blessing: "Sai dipasupasu Tuhan Jesus ma ho.",
  permintaanAckSubject: "Nunga hujalo hami pangidoanmu - HKBP Glugur",
  permintaanAckTitle: "Nunga hujalo hami pangidoanmu",
  permintaanAckIntro: "Mauliate. Nunga hujalo hami pangidoanmu. Tim HKBP Glugur naeng manrisai jala manghubungi ho molo porlu.",
  permintaanAckSummary: "Ringkasan ni pesanmu",
  permintaanAckAttachment: "Lampiran na dikirim: {n} file.",
  galeriAckSubject: "Nunga hujalo hami fotomu - HKBP Glugur",
  galeriAckTitle: "Nunga hujalo hami fotomu",
  galeriAckIntro: "Mauliate naung mambagi foto tu galeri HKBP Glugur. Nunga hujalo hami {n} fotomu. Tim nami naeng manrisai jala patuduhon na tama di halaman galeri.",
  wartaAckSubject: "Nunga hujalo hami wartamu - HKBP Glugur",
  wartaAckTitle: "Nunga hujalo hami wartamu",
  wartaAckIntro: "Mauliate naung mangirim Warta Tata Parmingguon. Nunga hujalo hami berkasmu. Tim nami naeng manverifikasi jala mangunggah versi na denggan tu halaman Warta Tata Parmingguon.",
  wartaAckSummary: "Ringkasan ni kiriman",
  wartaAckAttachment: "Berkas na dikirim: {n} file.",
  wartaAckKeterangan: "Katerangan",
};

const byLocale: Record<string, ServerMsg> = { id, en, bbc };

export function serverMsg(locale: string): ServerMsg {
  return byLocale[isLocale(locale) ? locale : "id"] ?? id;
}

export { fill };
