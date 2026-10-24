/**
 * ==============================================================================
 * DATA PROYEK PORTFOLIO
 * ==============================================================================
 * File ini digunakan untuk menyimpan seluruh data proyek portofolio Anda.
 * Anda TIDAK PERLU mengedit kode HTML secara manual. Cukup tambahkan atau ubah
 * data di dalam array `projects` di bawah ini, dan kartu proyek akan otomatis
 * muncul di website dengan tampilan yang rapi.
 * 
 * ------------------------------------------------------------------------------
 * CARA MENAMBAH PROYEK BARU:
 * ------------------------------------------------------------------------------
 * 1. Simpan gambar screenshot proyek Anda di folder:
 *    assets/images/projects/nama-gambar-anda.jpg (atau .png / .svg / .webp)
 * 
 * 2. Salin (copy) satu blok kurung kurawal { ... } di bawah ini, lalu tempel (paste)
 *    sebelum tanda penutup kurung siku "];" di akhir file. Jangan lupa beri tanda
 *    koma (,) di antara setiap blok proyek.
 * 
 * 3. Isi setiap properti dengan penjelasan berikut:
 *    - title       : Judul proyek Anda.
 *    - description : Penjelasan singkat mengenai fitur dan tujuan proyek (1-2 kalimat).
 *    - image       : Jalur file gambar proyek. Jika belum ada, gunakan:
 *                    "assets/images/projects/placeholder-project.svg"
 *    - tech        : Array teknologi yang dipakai, contoh: ["HTML", "CSS", "JavaScript"]
 *    - category    : Kategori proyek (contoh: "Web", "Mobile", "Desain", "Fullstack").
 *                    Kategori ini akan otomatis dibuatkan tombol filter di halaman!
 *    - demoLink    : URL situs demo yang bisa dicoba pengunjung.
 *                    Jika BELUM ADA demo, kosongkan saja: demoLink: ""
 *    - sourceLink  : URL repositori GitHub/GitLab kode sumber Anda.
 *                    Jika kode bersifat pribadi (private), kosongkan: sourceLink: ""
 * ==============================================================================
 */

const projects = [
  {
    title: "My Speedtest",
    description: "Website monitoring jaringan seluler berbasis IoT yang menampilkan performa jaringan secara real-time dan terintegrasi dengan ESP32 untuk memantau sinyal serta mengontrol arah antena Yagi melalui website.",
    image: "assets/images/projects/My Speedtest.png",
    gallery: [
      "assets/images/projects/My Speedtest 2.png"
    ],
    tech: [
      "Next.js","React","JavaScript","CSS","ESP32","C++","Arduino"
    ],
    category: "Web & IoT",
    sourceLink: "https://github.com/alyansyh/My-Speedtest"
  },

  {
  title: "HeartGuard - Deteksi Penyakit Jantung",
  description: "Website deteksi dini penyakit jantung berbasis CNN (Convolutional Neural Network) dengan antarmuka modern dan responsif. Menampilkan halaman beranda, fitur deteksi, edukasi kesehatan, serta statistik tingkat akurasi model.",
  image: "assets/images/projects/Deteksi-Jantung-preview.png",
  gallery: [],
  tech: [
    "HTML","CSS","JavaScript","CNN","Deep Learning"
  ],
  category: "Web & AI",
  sourceLink: "https://github.com/alyansyh/Website-Deteksi-Jantung-CNN"
},

  {
    title: "Desain Alur Pendaftaran Haji",
    description: "Desain pamflet informatif untuk Kementerian Agama RI Kabupaten Maros yang menjelaskan alur dan tata cara pendaftaran haji secara ringkas, terstruktur, dan mudah dipahami masyarakat.",
    image: "assets/images/projects/Haji.png",
    tech: ["Canva"],
    category: "Desain",
    demoLink: "",
    sourceLink: ""
  },
  {
    title: "Desain Alur Pendaftaran Nikah",
    description: "Desain pamflet informatif untuk Kementerian Agama RI Kabupaten Maros yang menjelaskan alur dan tata cara pendaftaran nikah dengan penyajian informasi yang jelas, terstruktur, dan mudah dipahami masyarakat.",
    image: "assets/images/projects/Nikah.png",
    tech: ["Canva"],
    category: "Desain",
    demoLink: "",
    sourceLink: ""
  }
  
  // CONTOH TEMPLATE UNTUK PROYEK BARU (Hapus tanda komentar saat dipakai):
  /*
  ,
  {
    title: "Nama Proyek Baru Anda",
    description: "Tuliskan deskripsi ringkas 1-2 kalimat mengenai proyek ini.",
    image: "assets/images/projects/nama-file-gambar-anda.jpg",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    demoLink: "https://link-demo-anda.com",
    sourceLink: "https://github.com/username/nama-repo"
  }
  */
];
