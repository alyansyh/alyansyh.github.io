/**
 * ==============================================================================
 * DATA SERTIFIKAT PORTFOLIO
 * ==============================================================================
 * File ini digunakan untuk menyimpan seluruh data sertifikat keahlian Anda.
 * Anda TIDAK PERLU mengedit kode HTML secara manual. Cukup tambahkan atau ubah
 * data di dalam array `certificates` di bawah ini, dan kartu sertifikat akan
 * otomatis dirender di website dengan tombol PDF dan verifikasi kredensial.
 * 
 * ------------------------------------------------------------------------------
 * CARA MENAMBAH SERTIFIKAT BARU:
 * ------------------------------------------------------------------------------
 * 1. Simpan gambar preview sertifikat Anda di folder:
 *    assets/images/certificates/nama-preview.jpg (atau .png / .svg / .webp)
 *    *Catatan: Jika Anda belum memiliki gambar preview, kosongkan string gambar:
 *     image: "" -> Website akan otomatis menampilkan kartu dengan ikon PDF yang elegan!
 * 
 * 2. Simpan file PDF sertifikat Anda di folder:
 *    assets/pdf/certificates/nama-file-sertifikat.pdf
 * 
 * 3. Salin (copy) satu blok kurung kurawal { ... } di bawah ini, lalu tempel (paste)
 *    sebelum tanda penutup kurung siku "];" di akhir file. Jangan lupa beri tanda
 *    koma (,) di antara setiap blok sertifikat.
 * 
 * 4. Isi setiap properti dengan penjelasan berikut:
 *    - title          : Nama lengkap sertifikat atau kompetensi yang diraih.
 *    - issuer         : Lembaga/institusi penerbit (contoh: Dicoding, Coursera, Kampus Merdeka, Google, AWS).
 *    - date           : Waktu penerbitan sertifikat (contoh: "Mei 2025" atau "Januari 2024").
 *    - image          : Jalur gambar preview (contoh: "assets/images/certificates/preview-dicoding.jpg").
 *                       Jika dikosongkan (""), ikon PDF keren akan muncul sebagai fallback.
 *    - pdf            : Jalur ke file PDF sertifikat untuk dilihat dan diunduh.
 *    - credentialLink : URL tautan verifikasi online dari lembaga penerbit.
 *                       Jika lembaga tidak menyediakan tautan verifikasi, kosongkan: credentialLink: ""
 * ==============================================================================
 */

const certificates = [
  {

    title: "Operator Komputer Madya",
    issuer: "BBPSDMP Makassar",
    date: "2023",
    image: "assets/images/certificates/Sertifikat_ALYAN SYAH PUTRA_Operator Komputer Madya.png",
    pdf: "assets/pdf/certificates/Sertifikat_ALYAN SYAH PUTRA_Operator Komputer Madya.pdf",
    credentialLink: ""
  },
  {
    title: "Associate Data Scientist",
    issuer: "BBPSDMP Makassar",
    date: "2024",
    image: "assets/images/certificates/Sertifikat_ALYAN SYAH PUTRA_Associate Data Scientist.png",
    pdf: "assets/pdf/certificates/Sertifikat_ALYAN SYAH PUTRA_Associate Data Scientist.pdf",
    credentialLink: ""
  },
  {
    title: "TOEFL Prediction",
    issuer: "Daily Bahasa Inggris",
    date: "2025",
    image: "assets/images/certificates/Sertifikat_ALYAN SYAH PUTRA_TOEFL.png",
    pdf: "assets/pdf/certificates/Sertifikat_ALYAN SYAH PUTRA_TOEFL.pdf",
    credentialLink: ""
},
  // CONTOH TEMPLATE UNTUK SERTIFIKAT BARU (Hapus tanda komentar saat dipakai):
  /*
  ,
  {
    title: "Nama Sertifikat Baru Anda",
    issuer: "Nama Lembaga Penerbit",
    date: "Bulan Tahun",
    image: "assets/images/certificates/nama-gambar-preview.jpg", // atau kosongkan "" jika belum ada gambar
    pdf: "assets/pdf/certificates/nama-sertifikat.pdf",
    credentialLink: "https://link-verifikasi-online.com" // atau kosongkan "" jika tidak ada
  }
  */
];
