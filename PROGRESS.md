# PROGRESS.md — Log Pengerjaan Portfolio Alam

> Setiap sesi kerja **wajib** menambah entri baru di bagian bawah "Log Sesi".
> Zona waktu: **WIB (UTC+7)**.

---

## 📍 Status Saat Ini

| Item | Nilai |
|---|---|
| Fase aktif | **Fase 7 — Lanjutan (Seluruh 5 Fitur Selesai ✅)** |
| Fase berikutnya | **Pemeliharaan & Penambahan Konten Berkala via `/keystatic`** |
| Model disarankan berikutnya | **Gemini 3.8 Flash (Medium)** untuk update konten / teks ringan sehari-hari |
| URL live | _Live di Vercel_ |
| Repo GitHub | `https://github.com/BaharudinAlamsyah27/portfolio-alam` |

## ✅ Checklist Fase

- [x] **Fase 0 — Perancangan**
  - [x] Diskusi konsep & pilih gaya (Hybrid)
  - [x] Pilih stack (Astro + Vercel)
  - [x] Wawancara awal
  - [x] Buat `AGENTS.md` & `PROGRESS.md`
  - [x] Jawab pertanyaan terbuka
- [x] **Fase 1 — Fondasi**
  - [x] Scaffold Astro (`7.4.12`) + TypeScript (`strict`) + Tailwind CSS v4 (`@tailwindcss/vite 4.3.5`) + Preact (`11.2.0`)
  - [x] Design tokens (`src/styles/tokens.css`, `src/styles/global.css`) + tekstur kertas & hard shadow
  - [x] Font self-hosted via Fontsource (Bricolage Grotesque, Instrument Sans, Kalam, JetBrains Mono)
  - [x] Struktur i18n bilingual ID (default `/`) & EN (`/en/`)
  - [x] `BaseLayout.astro` + `<ClientRouter />` (View Transitions) + halaman awal + `404.astro`
  - [x] Verifikasi `astro check` (0 error) & `astro build` (3 halaman statis lolos)
- [x] **Fase 2 — Konten & CMS**
  - [x] Skema Astro Content Collections (`src/content.config.ts`) dengan Zod & dukungan bilingual ID/EN
  - [x] Konfigurasi Keystatic (`keystatic.config.ts`) mode *local* dev-only (`astro.config.mjs`)
  - [x] Daftar sosial media dinamis, profil, jogging stats, `/now`, skill, project (MDX), pengalaman, paspor jelajah, changelog
  - [x] Data contoh & placeholder `TODO(alam):` di `src/content/`
  - [x] Verifikasi `astro check` (0 errors) & `npm run build` (static output bersih)
- [x] **Fase 3 — Halaman inti**
  - [x] Elemen meja kerja & jejak tangan (`Tape.astro`, doodle SVG `HandDrawn.astro`, catatan pinggir font Kalam)
  - [x] Hero asimetris + **Audience Switcher** (`AudienceSwitcher.tsx`: Tamu Umum, Recruiter, Klien, Developer) dengan `localStorage` & pengurutan dinamis section beranda
  - [x] Section Projects (grid asimetris 7+5 kolom) + halaman studi kasus `/projects/[slug]` & `/en/projects/[slug]`
  - [x] Section Skills (dikelompokkan jujur: *Dikuasai*, *Sedang Didalami*, *Sedang Dieksplor* — tanpa bar persentase palsu)
  - [x] Section About + Timeline MagangHub + kartu `/now` + tombol CV
  - [x] Section Kontak (form Web3Forms + daftar sosial media dinamis dari Keystatic)
  - [x] Verifikasi `astro check` (0 errors, 23 file) & `npm run build` (7 halaman statis lolos)
- [x] **Fase 4 — Fitur WOW**
  - [x] **Terminal Mode** (`TerminalModal.tsx` + `terminalEngine.ts`): `Ctrl/Cmd+K`, `` ` ``, atau tombol `>_` dengan perintah `help`, `whoami`, `ls projects`, `open <slug>`, `skills`, `cat`, `cat about.md`, `jog`, `contact`, `theme`, `sudo hire-me`, riwayat ↑/↓, & autocomplete Tab
  - [x] **Skill Playground** (`SkillPlayground.tsx`): mode rapi berfilter + mode fisika 2D (**Matter.js** di-lazy-load) lengkap dengan seret/lempar & tombol *Pantulkan!*
  - [x] **Kucing Pengikut Kursor & Konami Code** (`CatCompanion.tsx`): kucing SVG piksel yang berlari/duduk/tidur (`zZz`), tombol ON/OFF di `localStorage`, plus hujan stiker Konami (`↑↑↓↓←→←→BA`)
  - [x] **Paspor Jelajah & Log Jogging** (`PassportSection.astro` + `places/*.yaml` + `profile.yaml`)
  - [x] **Coretan & Gerak** (`deskEffects.ts`): Rough Notation, Lenis smooth scroll, & GSAP reveal (otomatis nonaktif saat `prefers-reduced-motion: reduce`)
  - [x] Verifikasi `astro check` (0 errors, 0 warnings, 0 hints pada 29 file) & `npm run build` (7 halaman statis lolos dalam 4.28s)
- [x] **Fase 5 — Poles**
  - [x] Halaman `/now` & `/en/now` (`NowView.astro`) + tautan di footer
  - [x] Halaman `/log` & `/en/log` (`LogView.astro`) + catatan rilis `0-4-0-fitur-wow.mdx`
  - [x] Filter kategori ringan di `ProjectsSection.astro` (`semua`, `web`, `mobile`, dll.)
  - [x] SEO lengkap: `public/favicon.svg`, `public/og/cover.svg`, `public/robots.txt`, `src/pages/sitemap.xml.ts`, `<link rel="canonical">`, Open Graph, Twitter Card, & JSON-LD `Person`
  - [x] Halaman `404.astro` kreatif (kucing mengintip + tombol `ls projects` di terminal)
  - [x] Verifikasi `astro check` (0 errors, 0 warnings, 0 hints pada 36 file) & `npm run build` (11 halaman statis + `sitemap.xml` lolos dalam 3.65s)
- [x] **Fase 6 — Pengisian Konten Asli**
  - [x] Profil & Sosial Media lengkap (GitHub, LinkedIn, Instagram, Email, asal Brebes domisili Sragen)
  - [x] Pengalaman MagangHub di BPRS Sukowati Sragen (web portal, eSurat, CMMS, pemantauan keaktifan anggota)
  - [x] 3 Project andalan dari GitHub: eSurat BPRS, Sistem Pembiayaan Kredit Elektronik, Sistem Manajemen Armada Transportasi
  - [x] Foto asli Alam dipasang dan dioptimasi otomatis oleh Astro (`src/assets/profile/alam.jpg` → `.webp`)
  - [x] CV asli disalin ke `public/cv/CV-Baharudin-Alamsyah.pdf` dan tombol unduh aktif
  - [x] Paspor Jelajah diisi titik Brebes (asal) dan Sragen (domisili/magang)
  - [x] Verifikasi: `astro check` (0 error, 36 file) & `npm run build` (15 halaman statis lolos)
- [ ] **Deploy Vercel & GitHub**
- [ ] **Fase 7 — Lanjutan (opsional)**

## ❓ Pertanyaan Terbuka (untuk Alam)

_Semua pertanyaan Fase 0 sudah terjawab:_
1. **Bahasa:** Default Bahasa Indonesia (`/`), bisa diubah ke Bahasa Inggris (`/en/`).
2. **Sosial media:** Dikelola lewat daftar dinamis di panel admin (Keystatic), bisa tambah/ubah kapan saja.
3. **Maskot kucing:** Kucing piksel random (turut berduka cita untuk kucing Alam sebelumnya).
4. **Foto diri:** Ada, disiapkan saat pengisian konten & dirapikan agar tetap terlihat profesional dan autentik.
5. **Domain:** Pakai `*.vercel.app` dulu saat deploy awal, lalu opsional tambah `alam.is-a.dev` (gratis) di Fase 6.

---

## 🧭 Log Keputusan

| Tanggal | Keputusan | Alasan |
|---|---|---|
| 2026-11-16 | Konsep **Hybrid** (Profesional + Terminal + Unik) | Melayani recruiter, klien, dan developer sekaligus |
| 2026-11-16 | **Astro + TS + Tailwind v4 + Preact** | Cepat, statis, island untuk interaksi |
| 2026-11-16 | Hosting **Vercel** gratis | Biaya Rp0, auto-deploy |
| 2026-11-16 | **Keystatic** (mode local) sebagai panel admin | Alam bisa isi data via form tanpa edit kode |
| 2026-11-16 | Design system **"Meja Kerja yang Ceria"** | Ceria, berwarna, anti AI-slop |
| 2026-11-16 | Kucing sebagai maskot & tema easter egg | Dari hobi Alam |
| 2026-11-16 | **Bilingual ID (default) + EN** sejak Fase 1 | Memenuhi kebutuhan recruiter lokal & internasional |

---

## 📝 Log Sesi

### Format entri
```
### Sesi N — YYYY-MM-DD HH:MM–HH:MM WIB
**Model:** ...
**Fase:** ...
**Dikerjakan:**
- ...
**Keputusan / dependency baru:**
- ...
**Masalah / catatan:**
- ...
**Berikutnya:**
- ...
```

---

### Sesi 1 — 2026-11-16 10:01–10:20 WIB
**Model:** Claude Opus 5.5 (Medium) · wawancara direkomendasikan Gemini 3.8 Flash
**Fase:** 0 — Perancangan

**Dikerjakan:**
- Diskusi opsi gaya (Profesional, Terminal, Desktop OS, 3D, Hybrid) → dipilih **Hybrid**.
- Diskusi hosting gratis (Vercel, is-a.dev, Web3Forms, Vercel Analytics).
- Diskusi skill/plugin AI: pakai skill bawaan (modern-web-guidance, chrome-devtools, a11y-debugging, debug-optimize-lcp); disarankan pasang plugin Vercel.
- Rencana anti-AI-slop & teknologi "wow" (GSAP, Lenis, View Transitions, Matter.js, Rough Notation).
- Wawancara Alam (profil, tujuan, skill, hobi).
- Membuat `AGENTS.md` (arsitektur lengkap) dan `PROGRESS.md`.

**Keputusan / dependency baru:**
- Lihat Log Keputusan. Belum ada dependency terpasang.

**Masalah / catatan:**
- Alam belum punya ide easter egg pribadi → diusulkan berbasis kucing, jogging, dan jelajah tempat.
- Data project akan diisi Alam sendiri via panel admin Keystatic.

**Berikutnya:**
- Alam menjawab pertanyaan terbuka.
- Mulai **Fase 1 — Fondasi** dengan Claude Sonnet 5.5 / Gemini 4 Hydrogen.

---

### Sesi 2 — 2026-11-16 10:23–10:37 WIB
**Model:** Gemini 4 Hydrogen (Medium)
**Fase:** 1 — Fondasi

**Dikerjakan:**
- Memperbarui `AGENTS.md` & `PROGRESS.md` dengan jawaban 5 pertanyaan terbuka (bilingual ID/EN, sosmed via Keystatic, kucing piksel random, foto diri nanti, domain `*.vercel.app` → opsional `alam.is-a.dev`).
- Setup `package.json`, `tsconfig.json` (strict + Preact JSX), `astro.config.mjs` (Preact, Tailwind v4 Vite plugin, i18n ID/EN `prefixDefaultLocale: false`), `.gitignore`, dan `.prettierrc`.
- Membuat design system token `src/styles/tokens.css` dan `src/styles/global.css` ("Meja Kerja yang Ceria": palet hangat, tekstur kertas SVG, `.sticker-card`, `.sticker-btn`, `prefers-reduced-motion`).
- Membuat helper i18n `src/i18n/ui.ts` & `src/i18n/utils.ts`.
- Membuat `src/layouts/BaseLayout.astro` dengan Fontsource self-hosted, `<ClientRouter />`, skip-to-content, dan tombol ganti bahasa ID/EN.
- Membuat `src/components/sections/FoundationPreview.astro`, `src/pages/index.astro`, `src/pages/en/index.astro`, dan `src/pages/404.astro`.
- Verifikasi: `astro check` (0 errors, 0 warnings, 0 hints) dan `npm run build` (3 halaman statis lolos dalam 3.61s).

**Keputusan / dependency baru:**
- `astro@^7.4.12`, `@astrojs/preact@^6.1.6`, `preact@^11.2.0`, `@tailwindcss/vite@^4.3.5`, `tailwindcss@^4.3.5`
- `@fontsource-variable/bricolage-grotesque`, `@fontsource/instrument-sans`, `@fontsource/kalam`, `@fontsource/jetbrains-mono`
- Dev: `@astrojs/check`, `typescript`, `prettier`, `prettier-plugin-astro`

**Masalah / catatan:**
- Di sandbox Windows, `astro check` / `astro build` perlu `ASTRO_TELEMETRY_DISABLED=1` agar `@astrojs/telemetry` tidak mencoba `mkdir` di `AppData\Roaming`.

**Berikutnya:**
- Masuk **Fase 2 — Konten & CMS**: setup Astro Content Collections (`src/content.config.ts`) + **Keystatic** (`keystatic.config.ts`) termasuk daftar sosmed dinamis, project, skill, pengalaman, paspor jelajah, dan profil.
- Rekomendasi model: **Claude Sonnet 5.5** atau tetap **Gemini 4 Hydrogen** (setelah itu bisa pakai **Gemini 3.8 Flash** untuk mengisi data contoh).

---

### Sesi 3 — 2026-11-16 10:38–10:44 WIB
**Model:** Claude Sonnet 5.5 (Medium) → Gemini 4 Hydrogen (Medium)
**Fase:** 2 — Konten & CMS

**Dikerjakan:**
- Membuat skema Zod lengkap di `src/content.config.ts` untuk `projects`, `experience`, `places`, `profile`, `skills`, `now`, dan `changelog` (dengan dukungan teks bilingual `id`/`en`).
- Membuat panel admin Keystatic di `keystatic.config.ts` (mode `local`), termasuk pengelolaan **sosial media dinamis**, upload gambar, serta pembatasan **dev-only** di `astro.config.mjs` agar build produksi tetap 100% statis.
- Menyiapkan data awal & placeholder `TODO(alam):` di `src/content/` (`singletons/profile.yaml`, `singletons/skills.yaml`, `singletons/now.yaml`, `experience/maganghub.yaml`, `projects/contoh-project.mdx`, `places/contoh-tempat.yaml`, `changelog/0-1-0-fondasi.mdx`).
- Memperbaiki struktur `maganghub.yaml` agar sesuai skema bilingual dan memverifikasi `astro check` (0 errors, 11 file) serta `npm run build` (3 halaman statis lolos dalam 2.58s).

**Keputusan / dependency baru:**
- `@keystatic/core@^0.6.9`, `@keystatic/astro@^6.0.0`, `@astrojs/react`, `@astrojs/mdx`, `react`, `react-dom`, `yaml`.
- React diisolasi hanya untuk `keystatic`, sedangkan Preact tetap untuk island website (`include` filter di `astro.config.mjs`).

**Masalah / catatan:**
- Di `maganghub.yaml`, `title` harus berupa objek `{ id, en }` sesuai skema bilingual — sudah diperbaiki dan tervalidasi.

**Berikutnya:**
- Masuk **Fase 3 — Halaman Inti**: Hero + Audience Switcher (Recruiter / Klien / Developer), Projects + filter + studi kasus `/projects/[slug]`, Skills statis, About + timeline + CV, dan Kontak (Web3Forms).
- Rekomendasi model: **Claude Opus 5.5** atau **Gemini 4 Argon** untuk merancang arah visual Hero + Audience Switcher agar anti-AI-slop, lalu lanjut dengan **Claude Sonnet 5.5** / **Gemini 4 Hydrogen**.

---

### Sesi 4 — 2026-11-16 10:45–10:53 WIB
**Model:** Gemini 4 Argon (Medium)
**Fase:** 3 — Halaman Inti

**Dikerjakan:**
- Membuat helper konten bilingual `src/lib/content.ts` dan melengkapi kamus UI `src/i18n/ui.ts` (ID & EN).
- Membuat elemen jejak tangan anti-AI-slop: `src/components/doodles/HandDrawn.astro` (garis bawah spidol, panah coretan tangan, dan ilustrasi kucing mengintip di atas kartu meja) serta `src/components/ui/Tape.astro` (selotip kertas).
- Membangun island interaktif `src/components/islands/AudienceSwitcher.tsx` (Preact) yang menyimpan pilihan pengunjung (`semua`, `recruiter`, `klien`, `dev`) di `localStorage`, menyesuaikan pitch & tombol CTA, serta mengubah urutan section halaman secara instan lewat `html[data-audience]` di `src/styles/global.css`.
- Membangun seluruh section meja kerja: `HeroSection.astro`, `ProjectsSection.astro` (grid asimetris 7+5 kolom), `SkillsSection.astro` (3 baki jujur tanpa persentase palsu), `AboutSection.astro` (cerita + timeline MagangHub + `/now`), `ContactSection.astro` (Web3Forms + sosmed dinamis), dan menyatukannya di `HomeDesk.astro`.
- Membuat halaman studi kasus project `src/components/sections/ProjectCaseStudy.astro`, `src/pages/projects/[slug].astro`, dan `src/pages/en/projects/[slug].astro`, plus studi kasus nyata `meja-kerja-portfolio.mdx`.
- Verifikasi: `astro check` lolos (**0 errors, 0 warnings, 0 hints** pada 23 file) dan `npm run build` menghasilkan **7 halaman statis** dalam 8.14s.

**Keputusan / dependency baru:**
- Tidak ada dependency baru (hemat ukuran bundle). Pengurutan ulang section via Audience Switcher menggunakan CSS flex `order` berbasis atribut `html[data-audience]` sehingga bebas *layout shift* berat dan ramah aksesibilitas.

**Masalah / catatan:**
- Semua checklist anti-slop (§6 `AGENTS.md`) terpenuhi: tidak ada gradien neon, tidak ada hero simetris "Hi, I'm X 👋", tidak ada bar persentase skill, dan tidak ada lorem ipsum.

**Berikutnya:**
- Masuk **Fase 4 — Fitur WOW**: **Terminal Mode** (`Ctrl+K` / tombol `>_` dengan perintah `help`, `whoami`, `ls projects`, `cat`, `jog`, `sudo hire-me`), **Skill Playground** berfisika (Matter.js lazy-load), **Kucing pengikut kursor** (bisa dimatikan), **Paspor Jelajah**, dan **Konami code**.
- Rekomendasi model: tetap di **Gemini 4 Argon** atau **Claude Opus 5.5** karena Fase 4 berisi logika interaktif & fisika yang paling kompleks.

---

### Sesi 5 — 2026-11-16 10:55–11:03 WIB
**Model:** Orchestrator (Argon)
**Fase:** 4 — Fitur WOW

**Dikerjakan:**
- Menambahkan helper `getPlacesData()` di `src/lib/content.ts`, melengkapi kamus `src/i18n/ui.ts`, serta menyiapkan data contoh Paspor Jelajah (`src/content/places/contoh-tempat.yaml`, `jalan-pagi-kota.yaml`) dan log jogging di `src/content/singletons/profile.yaml`.
- Membuat **Terminal Mode** (`src/lib/terminalEngine.ts` + `src/components/islands/TerminalModal.tsx`): aktif lewat `Ctrl/Cmd+K`, `` ` ``, atau tombol `>_` di navbar; mendukung `help`, `whoami`, `ls projects`, `open <slug>`, `skills`, `cat`, `cat about.md`, `jog`, `contact`, `theme <ink|paper|forest|amber>`, `sudo hire-me`, `clear`, `exit`, riwayat ↑/↓, dan autocomplete `Tab`.
- Membuat **Skill Playground** (`src/components/islands/SkillPlayground.tsx`) di `SkillsSection.astro`: tampilan rapi berfilter + mode fisika 2D (**Matter.js** di-lazy-load saat diklik) yang mendukung drag-and-throw badge dan tombol *Pantulkan!*.
- Membuat **Kucing Pengikut Kursor & Konami Code** (`src/components/islands/CatCompanion.tsx`): sprite kucing piksel SVG yang mengejar kursor, duduk, atau tidur (`zZz`) saat diam 3 detik (lengkap dengan toggle ON/OFF di pojok kanan bawah), serta hujan stiker saat Konami Code (`↑↑↓↓←→←→BA`) ditekan.
- Membuat **Paspor Jelajah & Log Jogging** (`src/components/sections/PassportSection.astro`) dan menambahkannya ke `HomeDesk.astro` dan `src/styles/global.css`.
- Membuat `src/lib/deskEffects.ts` (lazy-load **Rough Notation**, **Lenis** smooth scroll, dan **GSAP** reveal yang otomatis nonaktif saat `prefers-reduced-motion: reduce`), serta memasang seluruhnya di `src/layouts/BaseLayout.astro`.
- Verifikasi: `astro check` lolos (**0 errors, 0 warnings, 0 hints** pada 29 file) dan `npm run build` menghasilkan **7 halaman statis** dalam 4.28s.

**Keputusan / dependency baru:**
- `matter-js@0.20.0`, `@types/matter-js@0.20.2` (dev), `rough-notation@0.5.1`, `gsap@3.15.1`, `lenis@1.3.27`.
- Seluruh library berat di-lazy-load lewat dynamic `import()` hanya ketika dibutuhkan atau diizinkan oleh preferensi gerak pengguna.
- `TerminalModal` dan `CatCompanion` selalu me-render elemen wrapper DOM non-null saat SSR agar aman dengan Preact hydration di `client:idle`.

**Masalah / catatan:**
- Awalnya `TerminalModal` gagal di SSR Astro karena `if (!open) return null;` saat `client:idle` — sudah diperbaiki dengan mengembalikan `<div hidden aria-hidden="true" />` dan wrapper `<div class="contents">` pada `CatCompanion`.

**Berikutnya:**
- Masuk **Fase 5 — Poles**: halaman khusus `/now` & `/log` (dan versi `/en/now`, `/en/log`), filter kategori pada Projects, SEO lengkap (`sitemap`, `robots.txt`, Open Graph image, JSON-LD `Person`), peningkatan halaman `404` kreatif, uji aksesibilitas/Lighthouse, dan audit anti-AI-slop.
- Rekomendasi model: **Claude Sonnet 5.5 (Medium)** atau **Gemini 4 Hydrogen (Medium)** untuk halaman `/now`, `/log`, dan SEO, lalu **Claude Opus 5.5 (High)** / **Gemini 4 Argon** untuk audit akhir.

---

### Sesi 6 — 2026-11-16 11:03–11:06 WIB
**Model:** Gemini 4 Hydrogen (Medium)
**Fase:** 5 — Poles

**Dikerjakan:**
- Menambahkan `getChangelogData()` di `src/lib/content.ts` dan entri changelog `src/content/changelog/0-4-0-fitur-wow.mdx`.
- Membuat halaman `/now` & `/en/now` (`NowView.astro`, `src/pages/now.astro`, `src/pages/en/now.astro`) serta `/log` & `/en/log` (`LogView.astro`, `src/pages/log.astro`, `src/pages/en/log.astro`), lalu menautkan keduanya di footer `BaseLayout.astro`.
- Menambahkan filter kategori ringan pada `ProjectsSection.astro` tanpa menambah dependensi baru.
- Melengkapi SEO & aset statis: `public/favicon.svg`, `public/og/cover.svg`, `public/robots.txt`, `src/pages/sitemap.xml.ts`, canonical URL, Open Graph, Twitter Card, dan JSON-LD `Person` di `BaseLayout.astro`.
- Memperbarui `src/pages/404.astro` dengan ilustrasi kucing mengintip dan tombol pintas `ls projects`.
- Verifikasi: `astro check` lolos (**0 errors, 0 warnings, 0 hints** pada 36 file) dan `npm run build` menghasilkan **11 halaman statis** + `/sitemap.xml` dalam 3.65s.

**Keputusan / dependency baru:**
- Tidak menambah dependency baru (`sitemap.xml.ts` & SVG OG card dibuat native agar build tetap ringan dan Rp0).

**Masalah / catatan:**
- Semua fitur teknis inti sudah lengkap. Yang tersisa di Fase 6 adalah pengisian konten asli Alam (foto, CV PDF, daftar sosmed, project asli, access key Web3Forms) lewat `/keystatic` dan deploy ke Vercel.

**Berikutnya:**
- **Audit akhir** (cek aksesibilitas, Lighthouse, & checklist anti-AI-slop) + **Fase 6 — Rilis** (isi data asli Alam & deploy ke Vercel).
- Rekomendasi model: **Claude Opus 5.5 (High)** / **Gemini 4 Argon** jika ingin audit menyeluruh, atau langsung **Gemini 3.8 Flash** untuk membantu mengisi data & setup deploy Vercel.

---

### Sesi 7 — 2026-11-16 11:20–11:24 WIB
**Model:** Gemini 3.8 Flash (Medium)
**Fase:** 6 — Pengisian Konten Asli

**Dikerjakan:**
- Menyalin CV asli dari `c:\Users\ASUS\Documents\pribadi\CV.pdf` ke `public/cv/CV-Baharudin-Alamsyah.pdf`.
- Menyalin foto asli resmi Alam ke `src/assets/profile/alam.jpg`, langsung terintegrasi dan dioptimasi oleh Astro Image pipeline menjadi format WebP modern.
- Mengisi data profil asli di `src/content/singletons/profile.yaml`: nama lengkap Baharudin Alamsyah, email `alamsyaah1234@gmail.com`, domisili Sragen (asal Brebes), link akun resmi GitHub, LinkedIn, dan Instagram.
- Mengisi riwayat MagangHub di `src/content/experience/maganghub.yaml`: IT Staff di BPRS Sukowati Sragen (pemeliharaan web perusahaan, eSurat, CMMS, dan monitoring anggota).
- Menambahkan 3 project andalan nyata beserta link repositori GitHub resminya:
  1. `esurat-bprs.mdx`: Sistem Manajemen Persuratan & Disposisi Digital.
  2. `sistem-pembiayaan-kredit.mdx`: Sistem Penjualan & Pembiayaan Kredit Elektronik Toko.
  3. `manajemen-armada-transportasi.mdx`: Sistem Manajemen Armada Transportasi.
- Mengisi Paspor Jelajah di `src/content/places/`: `brebes.yaml` (kota asal) dan `sragen.yaml` (domisili magang).
- Memperbarui `/now` dengan aktivitas riil di BPRS Sukowati Sragen.
- Verifikasi build: `astro check` (**0 errors, 0 warnings, 0 hints**) dan `npm run build` menghasilkan **15 halaman statis** bersih dalam 10.53s.

**Keputusan / dependency baru:**
- Tidak ada dependensi baru.

**Berikutnya:**
- Git commit & push ke GitHub Alam (`BaharudinAlamsyah27`), lalu hubungkan ke Vercel untuk deploy online publik gratis (Rp0).
- Rekomendasi model: tetap **Gemini 3.8 Flash (Medium)**.

---

### Sesi 8 — 2026-11-16 11:44–11:47 WIB
**Model:** Gemini 4 Hydrogen (Medium)
**Fase:** 7 — Lanjutan (Batch 1)

**Dikerjakan:**
- **Catatan Lab Teknis (`/notes` & `/en/notes`):**
  - Menambahkan koleksi `notes` di `src/content.config.ts`, `keystatic.config.ts`, dan `getNotesData()` di `src/lib/content.ts`.
  - Membuat `NotesView.astro`, `NoteDetail.astro`, rute `/notes` & `/notes/[slug]` (beserta `/en/notes`), memperbarui `sitemap.xml.ts` dan navigasi/footer `BaseLayout.astro`.
  - Menulis 2 catatan lab awal nyata: `arsitektur-portfolio-rp0.mdx` dan `catatan-esurat-disposisi.mdx`.
- **GitHub Live Activity Widget (`GitHubActivity.tsx`):**
  - Island Preact (`client:visible`) di `AboutSection.astro` yang mengambil aktivitas commit publik dari GitHub API dengan cache `sessionStorage` 10 menit dan fallback rapi.
- **Audio Ambience Meja Kerja (`DeskAudio.tsx`):**
  - Island Preact (`client:idle`) di pojok kiri bawah menggunakan **Web Audio API** murni (0 KB file audio eksternal): mode *Hujan Halus*, *Kucing Purr*, dan *Fokus Hangat*, lengkap dengan pengatur volume.
- Menambahkan entri changelog `0-5-0-lab-notes-audio-github.mdx`.
- Verifikasi: `astro check` (**0 errors, 0 warnings, 0 hints** pada 44 file) dan `npm run build` menghasilkan **21 halaman statis** + `/sitemap.xml` dalam 2.44s.

**Keputusan / dependency baru:**
- Tidak ada dependency baru (Audio Ambience menggunakan Web Audio API native browser agar tetap Rp0 dan bebas bloat aset).

**Berikutnya:**
- `git add . && git commit && git push` agar perubahan ini otomatis ter-deploy ke Vercel.
- Lanjut ke Batch 2 Fase 7: perintah **`ask` AI** di Terminal Mode (Gemini API via Vercel Function) dan **Buku Tamu Meja Kerja**.
- Rekomendasi model: **Claude Sonnet 5.5 (Medium)** atau **Gemini 4 Argon (Medium)** (karena menyentuh Vercel Serverless Functions & integrasi API).

---

### Sesi 9 — 2026-11-16 11:48–13:16 WIB
**Model:** Gemini 4 Argon (Medium)
**Fase:** 7 — Lanjutan (Batch 2: AI `ask` + Buku Tamu Meja Kerja)

**Dikerjakan:**
- **Perintah `ask <pertanyaan>` di Terminal Mode (`api/ask.mjs` + `terminalEngine.ts` + `TerminalModal.tsx`):**
  - Membuat Vercel Serverless Function `api/ask.mjs` yang memanggil `gemini-2.5-flash` jika `GEMINI_API_KEY` diset di environment Vercel, tanpa perlu mengubah build Astro yang 100% statis.
  - Membuat mesin penjawab lokal pintar `answerQuestionLocally()` di `src/lib/terminalEngine.ts` sebagai fallback otomatis agar perintah `ask` langsung berfungsi 100% akurat baik di lokal maupun sebelum API key diisi.
- **Papan Catatan Tamu (`GuestbookWall.tsx` + `GuestbookSection.astro` + `guestbook.yaml`):**
  - Menambahkan singleton `guestbook` di `src/content.config.ts`, `keystatic.config.ts`, dan `src/lib/content.ts`.
  - Pengunjung dapat menempelkan catatan baru dengan pilihan warna kertas (`mustard`, `blush`, `paper`, `leaf`), langsung tampil di papan (`localStorage`), dan opsional mengirim notifikasi ke inbox Alam via Web3Forms untuk dikurasi permanen lewat `/keystatic`.
- Menambahkan `.env.example` dan entri changelog `0-6-0-ai-ask-guestbook.mdx`.
- Verifikasi: `astro check` (**0 errors, 0 warnings, 0 hints** pada 47 file) dan `npm run build` (**21 halaman statis** lolos).

**Keputusan / dependency baru:**
- Tidak ada dependency baru (`api/ask.mjs` memanggil REST endpoint Gemini API secara langsung menggunakan `fetch` bawaan Node.js di Vercel).

**Berikutnya:**
- Jalankan `git push` untuk memperbarui website live di Vercel.
- Untuk perawatan harian (tambah project/catatan baru), cukup gunakan **Gemini 3.8 Flash**.

---

### Sesi 11 — 2026-11-16 13:46–13:54 WIB
**Model:** Gemini 4 Hydrogen / Gemini 3.8 Flash (Medium)
**Fase:** 7 — Lanjutan (Fitur Konversi Toko: Kalkulator Custom, Akun Demo, FAQ & Garansi)

**Dikerjakan:**
- **Kalkulator Estimasi Custom Project (`CustomCostCalculator.tsx`):**
  - Island Preact interaktif (`client:visible`) di `/toko` untuk memilih sistem dasar (Piket, Gudang, WebGIS, atau Custom) dan mencentang add-on (install remote, hosting domain, notif WhatsApp gateway, kop surat PDF, multi role, GPS koordinat).
  - Menghitung grand total secara otomatis dan menyediakan tombol kirim rincian terformat ke WhatsApp Alam (`087781308730`) serta tombol salin rincian nota meja kerja.
- **Kartu Akun Demo Testing (`DemoAccountBox.astro`):**
  - Ditambahkan ke skema `products` (`demoCredentials` dan `proofOfWork`) di `content.config.ts` dan `keystatic.config.ts`.
  - Ditampilkan di halaman detail produk `/toko/[slug]` dengan kredensial testing per-role (Admin & Petugas) dan tombol buka demo live.
  - Memperbarui 3 produk awal dengan kredensial demo dan bukti implementasi nyata (BPRS Sukowati & UMKM).
- **Bagian Garansi & FAQ Toko (`ShopFaqSection.astro`):**
  - Komponen akordeon tanya-jawab seputar 100% unencrypted source code, bantuan instalasi lokal/remote AnyDesk, garansi bug 30 hari, penyesuaian alur SOP, dan metode pembayaran/pengiriman.
  - Ditambahkan trust badges bar di bagian bawah.
- **Cetak / Simpan Ringkasan Spek (PDF):**
  - Menambahkan tombol print siap cetak di `ProductDetail.astro` untuk mempermudah calon pembeli mengajukan anggaran ke atasan/kantor.
- **Changelog:** Menambahkan entri `0-8-0-kalkulator-demo-faq-toko.mdx`.
- Verifikasi: `astro check` (**0 errors, 0 warnings, 0 hints** pada 56 file) dan `npm run build` menghasilkan **31 halaman statis** + `/sitemap.xml` dalam 4.41s.

**Keputusan / dependency baru:**
- Tidak ada dependency baru (menggunakan Preact bawaan & styling Tailwind v4).

**Berikutnya:**
- Jalankan `git push` di terminal Anda agar seluruh fitur konversi toko live di Vercel.
- Siap mengerjakan project-project sistem berikutnya untuk diiklankan di toko!

**Model:** Gemini 4 Hydrogen (Medium)
**Fase:** 7 — Lanjutan (Etalase Toko `/toko` & 6 Rubrik `/notes`)

**Dikerjakan:**
- **Pengembangan `/notes` (Digital Garden Rubrik):**
  - Menambahkan field `category` (`lab`, `belajar`, `event`, `opini`, `jelajah`, `hidup`) di `src/content.config.ts` dan `keystatic.config.ts`.
  - Menambahkan filter rubrik interaktif, badge kategori berwarna, dan estimasi waktu baca di `NotesView.astro` serta `NoteDetail.astro`.
  - Menambahkan catatan non-teknis pertama: `src/content/notes/cerita-magang-sragen.mdx` (rubrik *Cerita Hidup*).
- **Galeri Toko Produk Web (`/toko` & `/en/toko`):**
  - Menambahkan koleksi `products` di `src/content.config.ts`, `keystatic.config.ts`, dan `getProductsData()` di `src/lib/content.ts`.
  - Membuat halaman etalase `ShopView.astro` (lengkap dengan filter bidang) dan halaman detail `ProductDetail.astro` (`/toko/[slug]` & `/en/toko/[slug]`) dengan tombol pemesanan otomatis ke WhatsApp Alam (`087781308730`) atau link checkout khusus (`buyUrl`).
  - Menambahkan 3 produk contoh siap pakai/iklan skala sederhana–menengah: `sistem-piket-absensi-kantor.mdx`, `sistem-data-gudang-stok.mdx`, dan `peta-geospasial-sekolah.mdx`.
  - Menautkan `/toko` ke navbar, footer `BaseLayout.astro`, dan `sitemap.xml.ts`, serta menambahkan changelog `0-7-0-toko-dan-rubrik-catatan.mdx`.
- Verifikasi: `astro check` (**0 errors, 0 warnings, 0 hints** pada 53 file) dan `npm run build` menghasilkan **31 halaman statis** + `/sitemap.xml` dalam 12.26s.

**Keputusan / dependency baru:**
- Tidak ada dependency baru. Pemesanan produk toko menggunakan `wa.me/6287781308730` dengan pesan terisi otomatis (atau `buyUrl` opsional untuk Lynk.id/Mayar) agar tetap Rp0 dan praktis.

**Berikutnya:**
- Jalankan `git push` agar halaman `/toko` dan rubrik `/notes` langsung live di Vercel.
- Isi produk/catatan baru atau unggah screenshot produk lewat `http://localhost:4321/keystatic`.
- Rekomendasi model untuk pengisian konten/teks selanjutnya: **Gemini 3.8 Flash (Medium)**.

---

### Sesi 12 — 2026-11-19 09:54–10:00 WIB
**Model:** Gemini 4 Neon (Medium)
**Fase:** 7 — Lanjutan (Live Interactive Website Preview & Project SentinelBank FDS)

**Dikerjakan:**
- **Komponen Pratinjau Website Langsung (`src/components/islands/LiveSitePreview.tsx`):**
  - Island Preact (`client:visible`, `loading="lazy"`) dengan 2 mode tampilan bergaya browser "Meja Kerja":
    - `variant="card"` di kartu beranda (`ProjectsSection.astro`): menampilkan tampilan asli website secara langsung dengan penskalaan proporsional responsif (`ResizeObserver` dari 1280×800), lengkap dengan tombol *Coba Klik / Kunci Scroll* dan *Buka ↗*.
    - `variant="full"` di halaman studi kasus (`ProjectCaseStudy.astro`): jendela pratinjau interaktif penuh dengan address bar, toggle *Desktop / Mobile (390px)*, tombol muat ulang (`↻`), dan tautan layar penuh.
- **Integrasi di `ProjectsSection.astro` & `ProjectCaseStudy.astro`:**
  - Otomatis menampilkan `LiveSitePreview` untuk setiap project yang memiliki `demoUrl` eksternal (`https://...`), atau fallback `<Image />` bila hanya memiliki `cover`.
  - Merapikan target tautan eksternal (`target="_blank" rel="noopener noreferrer"`) serta tipografi MDX (`blockquote`, `ol`, `ul`, `code`, `strong`).
- **Project Baru (`src/content/projects/sentinelbank-fds.mdx`):**
  - Menambahkan **SentinelBank FDS — Sistem Deteksi Kecurangan Transaksi Perbankan Hibrida** (`order: 0`, `category: ai`, `featured: true`) beserta tautan Live Demo Vercel dan repo GitHub, arsitektur 3 lapis, metrik evaluasi (`ROC-AUC 0,988`, `VDR 91,6%`, `CIR 2,55%`), dan panduan mencoba langsung.
- **Upgrade Filter & Kategori Proyek Skala Banyak (`ProjectsSection.astro`, `content.config.ts`, `keystatic.config.ts`):**
  - Menambahkan kategori `enterprise` (*Sistem Kantor / Enterprise*) dan `gis` (*Geospasial / WebGIS*) melengkapi `web`, `ai`, `mobile`, `game`, `network`, `other`.
  - Menambahkan panel filter lengkap di beranda: tab kategori dengan jumlah proyek, pencarian kata kunci, dropdown filter teknologi (`Tech Stack`), tombol toggle **Live Demo Saja**, counter hasil, tombol reset, empty state, dan auto-tombol *"Tampilkan Semua Proyek"* ketika jumlah proyek melebihi 6.
- **Changelog:** Menambahkan `src/content/changelog/0-9-0-live-preview-sentinelbank.mdx`.

**Keputusan / dependency baru:**
- Tidak ada dependency baru (menggunakan `<iframe>` dengan `loading="lazy"`, `sandbox` aman, dan `ResizeObserver` bawaan browser agar tetap Rp0 dan menjaga anggaran performa Lighthouse).

**Berikutnya:**
- Jalankan `git push` di terminal agar project SentinelBank FDS dan pratinjau live website-nya langsung tampil di Vercel.

---

### Sesi 13 — 2026-11-19 11:08–11:12 WIB
**Model:** Gemini 4 Neon (Medium)
**Fase:** 7 — Lanjutan (Update Project FleetFlow ERP + Live Demo Preview)

**Dikerjakan:**
- Memperbarui [`src/content/projects/manajemen-armada-transportasi.mdx`](src/content/projects/manajemen-armada-transportasi.mdx) menjadi **FleetFlow ERP — Sistem Manajemen Armada, Logistik & Akuntansi Multi-Cabang** (`order: 1`, `category: enterprise`, `demoUrl: "https://manajemen-armada-transportasi-8v88.vercel.app/"`) lengkap dengan alur end-to-end, spesifikasi teknis (Laravel 12, PHP 8, SAK EMKM double-entry, maker-checker, enkripsi, 12 tes PHPUnit / 84 asersi), dan panduan Demo Quick Login (`FFDEMO000001`).
- Otomatis mengaktifkan **Live Interactive Website Preview** di kartu beranda & halaman studi kasus, serta menyelaraskan urutan tampil (`order: 0` SentinelBank FDS, `order: 1` FleetFlow ERP, `order: 2` eSurat, `order: 3` Kredit Elektronik).

**Berikutnya:**
- Jalankan `git add . && git commit && git push` untuk deploy ke Vercel.

---

### Sesi 14 — 2026-11-19 11:28–13:31 WIB
**Model:** Gemini 4 Neon (Medium)
**Fase:** 7 — Lanjutan (Template Proyek 10 Bagian + Project PERISAI OPSEC)

**Dikerjakan:**
- Menambahkan dukungan penuh template deskripsi proyek standar (`tagline`, `role`, `context`, `duration`, `tags`, `previewImage`, `embedPreview`) di `src/content.config.ts`, `keystatic.config.ts`, `ProjectCaseStudy.astro`, `ProjectsSection.astro`, dan `docs/PROJECT_TEMPLATE.md`.
- Memperbarui `LiveSitePreview.tsx` agar mendukung mode `embed={false}` + `previewImage` (tampilan browser frame rapi dengan thumbnail OG untuk aplikasi yang memasang `X-Frame-Options: DENY`).
- Menambahkan project baru [`src/content/projects/perisai-opsec.mdx`](src/content/projects/perisai-opsec.mdx) (**PERISAI OPSEC** — Kartika Cyber Hackathon 2026, `order: 0`, Live Demo `https://perisai-opsec.vercel.app/`, preview OG image `https://perisai-opsec.vercel.app/og-image.png`).
- Membatasi tampilan proyek di beranda (`ProjectsSection.astro` mode `home`) maksimal **4 proyek teratas** + banner *"Lihat Semua Proyek"*, serta memindahkan daftar lengkap & panel filter ke halaman khusus `/projects` dan `/en/projects` (`src/pages/projects/index.astro`, `src/pages/en/projects/index.astro`, navbar `BaseLayout.astro`, dan `sitemap.xml.ts`). Memperbaiki `object-contain` pada OG preview agar teks banner tidak terpotong.
- Menambahkan project baru [`src/content/projects/cmms-asset-management.mdx`](src/content/projects/cmms-asset-management.mdx) (**CMMS Enterprise — Sistem Manajemen Aset & Maintenance Multi-Kantor**, `order: 0`, `category: enterprise`, live iframe demo `https://cmms-asset-management.vercel.app/login`).
- Menambahkan ornamen **Rimuru Tempest (Tensura)** bernuansa biru slime yang halus & selaras tema meja kerja: token `--slime`, `--slime-soft`, `--slime-deep` di `tokens.css`, komponen SVG `RimuruDoodle.astro` (`slime`, `slime-crown`, `divider`), stiker Rimuru interaktif (`RimuruSticker.tsx`), pemisah tipis di `HomeDesk.astro`, Rimuru bermahkota di footer `BaseLayout.astro`.
- Menambahkan ornamen budaya Indonesia & stiker hobi interaktif: pita **Batik Kawung** & cap **Gunungan Wayang** (`CultureOrnaments.astro`) di `AboutSection.astro` dan `PassportSection.astro`, stiker hobi interaktif (`HobbyStickers.tsx`: **YNWA · LFC**, **Gowes**, **Batik & Wayang**, **Tensura**), serta *easter egg* Terminal (`rimuru`, `ynwa`/`liverpool`, `gowes`/`sepeda`, `wayang`/`batik`).
- Memperkaya corak visual & audio meja kerja: menambahkan pita **Batik Mega Mendung Biru Rimuru** di header, pita Batik Kawung + Gunungan di footer, pemisah **Batik Parang + Wayang** di `HomeDesk.astro`, corak Kawung samar pada latar kertas (`global.css`), serta 2 mode musik Web Audio API merdu di `DeskAudio.tsx`: **🎵 Gamelan Jawa (Slendro + Gong)** dan **💧 Jura Tempest (Crystal Music Box + Fantasy Pad)**.
- Menerapkan suasana visual **"The Night We Met" (Meja Kerja Malam)** (`data-theme="midnight"` default + toggle `🌙 Malam` / `☀️ Pagi` di navbar `BaseLayout.astro`): palet indigo-midnight hangat & cahaya lampu pijar amber (`tokens.css`), pendaran cahaya hangat + film grain analog + jaminan kontras WCAG AA di atas stiker (`global.css`), serta lapisan kunang-kunang/bintang pelan & bulan sabit tipis (`MidnightAtmosphere.astro`, 0 KB JS).

**Berikutnya:**
- Jalankan `git add .`, `git commit`, dan `git push` untuk deploy ke Vercel.
