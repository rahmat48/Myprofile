# Portofolio Rahmat Dwi Nurcahyo

Website portofolio modern, responsif, dan bilingual untuk **Rahmat Dwi Nurcahyo** — Spesialis IoT & Database Systems, Web Developer, dan Konten Kreator.

## 🚀 Fitur Utama
- **Fokus Keahlian**: Internet of Things (IoT) & Database Systems.
- **Tema & Warna**: Palet Cream/Beige & Coklat (Light Mode) dan Coklat Gelap & Gold (Dark Mode).
- **Tipografi**: Judul pixel elegan dengan Google Font *Press Start 2P* dipadukan dengan kenyamanan baca teks *Inter*.
- **Bilingual (ID / EN)**: Dukungan pergantian bahasa secara langsung dengan tombol toggle.
- **Dark Mode / Light Mode**: Tersimpan otomatis di `localStorage`.
- **Interaktivitas Modern**:
  - Animasi loading pixel saat pertama dimuat.
  - Efek ketik (*typing effect*) pada peran di bagian Hero.
  - Parallax latar belakang & indikator scroll.
  - Carousel sertifikat interaktif dengan rotasi otomatis dan jeda saat kursor diarahkan (*pause on hover*).
  - Lightbox sertifikat layar penuh (mendukung tombol ESC & klik latar belakang).
  - Transisi scroll halus (*smooth scroll*) & efek animasi saat komponen masuk viewport (*scroll reveal*).
  - Navigasi responsif untuk perangkat mobile & tablet.

## 📂 Struktur Proyek
```text
D:\CODING\Porto_Rahmat\
├── index.html       # Markup HTML5 semantik & bilingual
├── style.css        # Desain kustom, CSS variables tema, dan tata letak responsif
├── script.js       # Logika interaktif Vanilla JS tanpa dependensi eksternal
├── TODOLIST.txt     # Dokumentasi checklist roadmap proyek
└── assets/          # Seluruh gambar profil, proyek, sertifikat, dan media
    ├── profile.jpg
    ├── airdisenflex.jpg
    ├── smart-agriculture.png
    ├── asistensi.jpg
    ├── shopee.jpg
    ├── youtube.png
    ├── hobi-lari.png
    ├── hobi.png
    ├── website-wunut.png
    ├── sertifikat-amcc.png
    ├── sertifikat-database.png
    ├── sertifikat-hardware.png
    ├── sertifikat-mikrokontroler.png
    └── surat-magang.png
```

## 🛠️ Cara Menjalankan Secara Lokal
Cukup buka file `index.html` langsung di browser atau gunakan ekstensi VS Code seperti **Live Server**:
1. Buka folder `D:\CODING\Porto_Rahmat` di VS Code.
2. Klik kanan pada `index.html` dan pilih **Open with Live Server**.
3. Buka peramban di `http://127.0.0.1:5500`.

## 🌐 Deployment (GitHub Pages)
1. Inisialisasi Git:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio website ready for production"
   git branch -M main
   git remote add origin https://github.com/rahmat48/Myprofile.git
   git push -u origin main
   ```
2. Di GitHub: **Settings > Pages > Deploy from a branch** (`main` / `/root`).
3. Akses via `https://rahmat48.github.io/Myprofile/`.
