# Meja Kerja Digital — Baharudin Alamsyah (Alam)

> *"Lebih banyak kode daripada kata."*  
> Website portfolio personal dengan konsep **Hybrid**: profesional untuk recruiter, penuh detail teknis untuk developer, serta unik dan ceria tanpa sentuhan *AI-slop*.

---

## 🛠️ Tech Stack (Rp0 Stack)

- **Framework:** [Astro](https://astro.build/) (v7) + TypeScript (strict)
- **Komponen Interaktif:** [Preact](https://preactjs.com/) (islands architecture)
- **Styling & Token:** [Tailwind CSS v4](https://tailwindcss.com/)
- **CMS / Panel Admin:** [Keystatic](https://keystatic.com/) (mode lokal di dev)
- **Animasi & Interaktivitas:** GSAP, Lenis (smooth scroll), Rough Notation, dan Matter.js (fisika 2D)
- **Font Self-hosted:** Bricolage Grotesque, Instrument Sans, Kalam, JetBrains Mono
- **Form Kontak:** Web3Forms
- **Hosting:** [Vercel](https://vercel.com/) (Hobby / Gratis)

---

## ✨ Fitur Utama

1. **Audience Switcher (Hero):** Pengunjung dapat memilih peran (*Tamu Umum · Recruiter / HR · Calon Klien · Sesama Developer*) untuk mengurutkan ulang section beranda secara dinamis.
2. **Terminal Mode (`Ctrl+K` atau `>_`):** Terminal CLI interaktif dengan perintah `help`, `whoami`, `ls projects`, `open <slug>`, `skills`, `cat about.md`, `cat` (kucing ASCII), `jog`, `theme`, dan `sudo hire-me`.
3. **Skill Playground:** Peta skill jujur tanpa persentase palsu + Mode Fisika (Matter.js) di mana badge skill bisa dilempar dan diseret.
4. **Kucing Pengikut Kursor & Konami Code:** Maskot kucing piksel ramah yang berlari, duduk, dan tidur, serta hujan stiker saat Konami Code (`↑↑↓↓←→←→BA`) ditekan.
5. **Paspor Jelajah & Log Jogging:** Catatan tempat yang pernah dikunjungi dan statistik jogging pagi.
6. **Bilingual:** Mendukung Bahasa Indonesia (`/`) dan Bahasa Inggris (`/en/`).
7. **Panel Admin Lokal Keystatic:** Akses `http://localhost:4321/keystatic` saat mode dev untuk menambah project, mengubah profil, dan mengelola media tanpa sentuh kode.

---

## 🚀 Menjalankan Secara Lokal

```bash
# Pasang dependensi
npm install

# Jalankan server pengembangan (termasuk panel admin di /keystatic)
npm run dev

# Periksa tipe data dan linting
npm run check

# Bangun versi produksi statis
npm run build
```

---

Dibuat pelan-pelan oleh **Baharudin Alamsyah** · Sragen, Jawa Tengah.
