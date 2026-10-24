# 📘 PANDUAN MENGELOLA PORTOFOLIO (PROYEK & SERTIFIKAT)

Panduan ini dibuat khusus agar Anda dapat **menambah, mengubah, atau menghapus** proyek dan sertifikat dengan sangat mudah **tanpa perlu memahami coding yang rumit**.

---

## 🗺️ PETA STRUKTUR FOLDER & DATA

```text
📁 portfolio/
│
├── 📄 index.html                  <-- Halaman utama website
├── 📄 PANDUAN.md                  <-- Panduan ini
│
├── 📁 js/
│   ├── 📄 projects.js             <-- ✏️ EDIT INI UNTUK DATA PROYEK
│   ├── 📄 certificates.js         <-- ✏️ EDIT INI UNTUK DATA SERTIFIKAT
│   └── 📄 main.js                 <-- (Jangan diubah) Mesin perender otomatis
│
└── 📁 assets/
    ├── 📁 images/
    │   ├── 📁 projects/           <-- 🖼️ SIMPAN GAMBAR PROYEK DI SINI
    │   └── 📁 certificates/       <-- 🖼️ SIMPAN PREVIEW SERTIFIKAT DI SINI
    └── 📁 pdf/
        ├── 📄 cv.pdf              <-- 📄 FILE CV ANDA
        └── 📁 certificates/       <-- 📄 SIMPAN FILE PDF SERTIFIKAT DI SINI
```

---

## 1. CARA MENAMBAH PROYEK BARU

### Langkah 1: Simpan Gambar Proyek
Simpan gambar screenshot proyek Anda ke dalam folder:
`assets/images/projects/nama-proyek-anda.jpg` (bisa `.png`, `.jpg`, atau `.webp`).

### Langkah 2: Buka File `js/projects.js`
Tambahkan blok data baru ke dalam array `projects`.

```text
DIAGRAM ALUR MENAMBAH PROYEK:
[Gambar Proyek] ─── simpan ke ───> assets/images/projects/toko-baju.jpg
       │
       ▼
[js/projects.js] ─── tambahkan ──> { title: "Toko Baju Online", ... }
       │
       ▼
[Website Anda]  ─── reload (F5) ─> KARTU OTOMATIS MUNCUL! 🎉
```

### Format Kode yang Disalin:
Salin kode berikut dan tempel sebelum tanda penutup `];` di paling bawah:

```javascript
  {
    title: "Nama Proyek Baru Anda",
    description: "Penjelasan ringkas proyek ini dalam 1-2 kalimat.",
    image: "assets/images/projects/nama-proyek-anda.jpg",
    tech: ["HTML", "CSS", "JavaScript", "React"],
    category: "Web",
    demoLink: "https://demo-anda.com",
    sourceLink: "https://github.com/username/repo-anda"
  },
```

> **Catatan Penting:**
> - Jika **belum ada demo online**, kosongkan saja: `demoLink: ""` (tombol Live Demo akan otomatis disembunyikan).
> - Jika kode **bersifat rahasia/private**, kosongkan: `sourceLink: ""` (tombol Source Code akan otomatis disembunyikan).
> - **Kategori Baru**: Jika Anda mengetik kategori baru (misal: `"Desain"` atau `"Mobile"`), tombol filternya akan **otomatis dibuat sendiri** di bagian atas!

---

## 2. CARA MENAMBAH SERTIFIKAT BARU & PDF

### Langkah 1: Simpan Gambar & PDF
1. Simpan gambar preview ke: `assets/images/certificates/sertifikat-anda.jpg`
2. Simpan file dokumen PDF ke: `assets/pdf/certificates/sertifikat-anda.pdf`

*(Jika Anda belum sempat membuat gambar preview, jangan khawatir! Kosongkan saja properti `image: ""` dan website akan menampilkan kartu ikon PDF otomatis).*

### Langkah 2: Buka File `js/certificates.js`
Tambahkan blok data berikut sebelum tanda penutup `];`:

```javascript
  {
    title: "Nama Lengkap Sertifikat Anda",
    issuer: "Nama Penerbit (contoh: Dicoding / Coursera / Google)",
    date: "Juni 2025",
    image: "assets/images/certificates/sertifikat-anda.jpg",
    pdf: "assets/pdf/certificates/sertifikat-anda.pdf",
    credentialLink: "https://link-verifikasi-kredensial.com"
  },
```

> **Fitur Otomatis Sertifikat:**
> - **Lihat Sertifikat**: Membuka dokumen PDF di tab baru (`target="_blank"`).
> - **Download PDF**: Otomatis mengunduh berkas PDF ke perangkat pengunjung.
> - **Verifikasi Kredensial**: Jika `credentialLink` diisi, tombol verifikasi akan otomatis tampil. Jika dikosongkan (`""`), tombol akan otomatis disembunyikan.

---

## 3. CARA MENGGANTI ATAU MENGHAPUS ITEM

```text
CARA MENGELOLA:
├── Ingin MENGUBAH teks/link?
│   └── Cukup buka js/projects.js atau js/certificates.js,
│       lalu ganti teks di dalam tanda kutip " ... ".
│
└── Ingin MENGHAPUS item?
    └── Blok dari kurung kurawal { sampai } termasuk tanda komanya,
        lalu tekan tombol Delete di keyboard Anda.
```

**Contoh Menghapus:**
```javascript
// HAPUS DARI SINI:
  {
    title: "Proyek Lama",
    description: "...",
    ...
  },
// SAMPAI SINI
```

---

## 4. ATURAN PENAMAAN FILE (WAJIB DIIKUTI)

Agar website berjalan lancar saat diunggah ke internet (GitHub Pages / Netlify / Vercel), ikuti aturan berikut:

| ❌ HINDARI (Bisa Rusak di Web Hosting) | ✅ FORMAT YANG BENAR |
| :------------------------------------- | :------------------- |
| `Sertifikat Dicoding Baru (1).pdf`     | `sertifikat-dicoding-baru.pdf` |
| `Screenshot Web Toko #2.png`           | `proyek-web-toko.png` |
| `CV SAYA UPDATE 2025.PDF`              | `cv.pdf` |

**Kaidah Emas:**
1. Gunakan **huruf kecil semua** (lowercase).
2. **Jangan gunakan spasi**; ganti spasi dengan tanda strip (`-`).
3. Jangan gunakan karakter khusus seperti `( )`, `#`, `@`, `%`, `&`.

---

## 5. PANDUAN PEMECAHAN MASALAH (TROUBLESHOOTING)

Jika gambar atau file PDF tidak muncul saat dibuka, periksa hal-hal berikut:

### 1. Huruf Besar & Huruf Kecil Berbeda (Case-Sensitive)
- Jika nama file di folder Anda adalah `gambar.JPG` (huruf kapital), tetapi di data ditulis `gambar.jpg` (huruf kecil), server web tidak akan bisa menemukannya.
- **Solusi**: Samakan persis huruf kecilnya.

### 2. Salah Letak Folder
- Perhatikan tanda garis miring (`/`).
- Pastikan jalur dimulai dari folder `assets/`, contoh:  
  `assets/images/projects/nama-file.jpg`  
  *(Bukan `C:\Users\...` atau `/assets/...`)*

### 3. Ekstensi File Tersembunyi di Windows
- Terkadang di Windows, file Anda bernama asli `sertifikat.pdf.pdf` karena ekstensi `.pdf` tersembunyi.
- **Solusi**: Di File Explorer Windows, klik menu **View** -> centang **File name extensions**.

### 4. Tanda Koma Tertinggal di File JavaScript
- Setiap blok item `{ ... }` harus dipisahkan oleh tanda koma (`,`).
- Jika Anda melihat layar kosong atau kartu tidak muncul sama sekali, tekan tombol `F12` di browser -> pilih tab **Console**. Jika ada pesan *SyntaxError*, periksa apakah ada tanda koma atau tanda petik yang lupa ditutup.

---

## 🚀 CARA MENGUNGGAH KE GITHUB PAGES (GRATIS)

1. Buat repositori baru di GitHub (misal: `portfolio`).
2. Unggah seluruh isi folder ini ke repositori tersebut.
3. Di halaman repositori GitHub, buka menu **Settings** -> **Pages**.
4. Pada bagian **Branch**, pilih `main` dan folder `/(root)`, lalu klik **Save**.
5. Tunggu 1 menit, dan website portofolio Anda sudah aktif di internet!
