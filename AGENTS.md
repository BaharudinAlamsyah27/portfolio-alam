# AGENTS.md — Panduan Utama Portfolio "Alam"

> File ini adalah **sumber kebenaran tunggal** untuk semua agent/model AI yang mengerjakan repo ini.
> Baca file ini SEBELUM menulis kode. Catat setiap sesi kerja di [`PROGRESS.md`](./PROGRESS.md).

---

## 1. Tentang Pemilik

| Item | Isi |
|---|---|
| Nama | **Baharudin Alamsyah** — panggilan **Alam** |
| Status | Fresh graduate, sedang program **MagangHub** |
| Keahlian utama | Web programming |
| Sedang didalami | Mobile, AI |
| Sedang dieksplor | Game dev, jaringan |
| Kepribadian | Teliti, hati-hati, **lebih banyak kerja daripada bicara**, introvert |
| Hal yang disukai | 🐈 Kucing, 🏃 jogging, 🗺️ menjelajah tempat baru, 📚 belajar |

**Tagline konsep (draf):** *"Lebih banyak kode daripada kata."*
Kepribadian introvert diubah jadi kekuatan: website yang **pendiam tapi penuh kejutan** — makin dieksplor, makin banyak yang ditemukan.

---

## 2. Tujuan Website

Satu website melayani **3 tipe pengunjung** sekaligus:

1. **Recruiter / HR** → cepat melihat skill, pengalaman, CV.
2. **Calon klien freelance** → melihat hasil kerja, layanan, cara menghubungi.
3. **Sesama developer** → kode, detail teknis, Terminal Mode, easter egg.

Solusi: **Audience Switcher** di hero — *"Saya datang sebagai: Recruiter · Klien · Developer"* — mengubah urutan section, CTA, dan penekanan konten (disimpan di `localStorage`, default = netral).

Syarat non-negotiable:
- **Biaya Rp0** (hosting, domain dasar, form, analytics).
- **Terasa buatan manusia** — anti "AI slop" (lihat §6).
- **Ceria & berwarna** — bukan portfolio hitam-putih.
- **Cepat** — Lighthouse ≥ 95 di semua kategori.

---

## 3. Konsep: HYBRID

```
┌───────────────────────────────────────────────────────────┐
│  LAPISAN 1 — PROFESIONAL (default)                        │
│  Layout editorial/bento yang hangat, jelas untuk recruiter│
├───────────────────────────────────────────────────────────┤
│  LAPISAN 2 — KHAS PROGRAMMER                              │
│  Terminal Mode (Ctrl+K / tombol >_ / tombol `)            │
├───────────────────────────────────────────────────────────┤
│  LAPISAN 3 — UNIK & MENYENANGKAN                          │
│  Kucing pengikut kursor, skill berfisika, paspor jelajah, │
│  easter egg, coretan tangan, transisi halaman mulus       │
└───────────────────────────────────────────────────────────┘
```

---

## 4. Tech Stack

| Lapisan | Teknologi | Alasan |
|---|---|---|
| Framework | **Astro** (versi stabil terbaru) + **TypeScript** (strict) | Statis, super cepat, "islands" untuk interaktivitas |
| Komponen interaktif | **Preact** (via `@astrojs/preact`) | Ringan (~3KB), API mirip React |
| Styling | **Tailwind CSS v4** + CSS custom properties | Design token terpusat |
| Animasi | **GSAP + ScrollTrigger**, **Lenis** (smooth scroll) | Standar industri, gratis penuh |
| Transisi halaman | **Astro View Transitions** (`<ClientRouter />`) | Pindah halaman seperti aplikasi |
| Fisika | **Matter.js** (lazy-load) | Badge skill bisa dilempar/diseret |
| Coretan tangan | **Rough Notation** | Garis bawah/lingkaran ala spidol |
| Konten | **Astro Content Collections** (MDX + JSON/YAML, divalidasi Zod) | Data terpisah dari kode |
| Panel admin (CMS) | **Keystatic** (mode *local*) | Alam isi data lewat form UI, tersimpan sebagai file di repo |
| Font | **Fontsource** (self-hosted) | Tanpa request ke Google, cepat & privasi |
| Ikon | **Iconify / astro-icon** (Tabler / Phosphor) | Konsisten, tree-shaken |
| Form kontak | **Web3Forms** | Gratis, tanpa backend |
| Analytics | **Vercel Web Analytics** | Gratis, ramah privasi |
| Hosting | **Vercel** (Hobby/gratis) | Auto-deploy dari GitHub |
| Domain | `*.vercel.app` → opsional `alam.is-a.dev` (gratis) | |
| Kualitas | ESLint, Prettier, `astro check` | |

> ⚠️ Sebelum memasang dependency, cek versi terbaru & breaking change di dokumentasi resminya. Jangan menebak API dari ingatan.

### Tentang Panel Admin (Keystatic)
- Jalankan `npm run dev` → buka `http://localhost:4321/keystatic`.
- Isi/ubah project, skill, pengalaman, dll lewat **form** (upload gambar juga bisa).
- Keystatic menulis file ke `src/content/` → `git commit` + `git push` → Vercel otomatis deploy.
- Fase lanjutan (opsional): mode GitHub agar bisa edit dari browser di website live.

---

## 5. Design System — "Meja Kerja yang Ceria"

Metafora visual: **meja kerja Alam** — kertas krem, stiker, catatan tempel, coretan spidol, dan kucing yang suka lewat.

### 5.1 Warna
| Token | Hex | Pemakaian |
|---|---|---|
| `--paper` | `#FFF8EC` | Latar utama (krem hangat, BUKAN putih) |
| `--paper-2` | `#F6EBD6` | Kartu / section alternatif |
| `--ink` | `#1F1B16` | Teks utama (hitam hangat, BUKAN #000) |
| `--ink-soft` | `#5B5248` | Teks sekunder |
| `--tomato` | `#F2542D` | Aksen utama, CTA |
| `--cobalt` | `#2D5BFF` | Link, info, elemen teknis |
| `--mustard` | `#F5B700` | Highlight, stiker, stabilo |
| `--leaf` | `#2BA84A` | Status "online", sukses |
| `--blush` | `#FF8FB1` | Aksen kucing, momen manis |

- **Terminal Mode**: latar `--ink`, teks `--paper`, aksen tetap tomato/cobalt/mustard/leaf.
- Dark mode (opsional, fase akhir) = "meja kerja malam hari", tetap hangat, bukan biru-neon.
- Kontras teks wajib lolos **WCAG AA**.

### 5.2 Tipografi
| Peran | Font | Catatan |
|---|---|---|
| Display / judul | **Bricolage Grotesque** (variable) | Berkarakter, sedikit "nakal" |
| Body | **Instrument Sans** | Bersih, nyaman dibaca |
| Tulisan tangan (aksen saja!) | **Kalam** | Catatan pinggir, anotasi — maks. 1–2 per layar |
| Mono / terminal | **JetBrains Mono** | Terminal, potongan kode, label teknis |

DILARANG: Inter, Poppins, Roboto sebagai font utama.

### 5.3 Bentuk & Detail
- Radius bervariasi (4px, 12px, kadang 0) — tidak semua rounded-2xl.
- Bayangan **"hard shadow"** ala stiker: `4px 4px 0 var(--ink)` — bukan blur lembut.
- Elemen boleh sedikit miring (`rotate(-1.5deg)`) untuk kesan ditempel tangan.
- Tekstur kertas halus (SVG noise, opacity rendah).
- Ilustrasi/doodle: SVG buatan tangan (stroke tidak sempurna).

### 5.4 Gerak
- Animasi punya **tujuan** (mengarahkan perhatian / memberi umpan balik), bukan hiasan.
- Durasi 150–400ms untuk UI, easing natural (`power2.out`, spring).
- **Wajib** menghormati `prefers-reduced-motion` → matikan animasi besar, Lenis, fisika.

---

## 6. Aturan ANTI-AI-SLOP (WAJIB DIPATUHI)

### ❌ Dilarang
- Gradien ungu-biru/neon, teks bergradien, blob 3D mengambang generik.
- Glassmorphism di mana-mana.
- Hero center-center simetris + "Hi, I'm X 👋".
- Copy klise: *passionate, crafting digital experiences, innovative solutions, seamless, cutting-edge, elevate, unleash, dive in, journey*.
- Emoji sebagai bullet point; ikon ✨ sparkles.
- Grid kartu identik berulang tanpa variasi.
- Foto/avatar buatan AI, ilustrasi stok generik.
- Skill bar persentase ("React 90%") — tidak bermakna.
- Lorem ipsum atau teks placeholder yang lolos ke production.

### ✅ Wajib
1. **Copy dari suara Alam**: singkat, jujur, sedikit humor kering, tidak lebay. Kalimat pendek. Tidak memuji diri berlebihan — tunjukkan lewat bukti.
2. **Jejak tangan**: coretan Rough Notation, catatan pinggir font Kalam, stiker, selotip.
3. **Asimetri yang disengaja**: layout editorial, grid tidak seragam.
4. **Foto asli Alam** (dan kucing jika ada).
5. **Studi kasus jujur**: masalah → proses (termasuk bug/gagal) → hasil → pelajaran.
6. **Detail kecil yang bikin senyum** (lihat §7 easter egg).
7. **Bukti hidup**: halaman `/now`, changelog, tanggal update terakhir.

### Checklist review (jalankan sebelum merge fitur UI)
- [ ] Apakah ada satu saja pola dari daftar "Dilarang"?
- [ ] Apakah halaman ini bisa jadi milik siapa saja? (Jika ya → kurang personal, perbaiki.)
- [ ] Apakah copy terdengar seperti orang ngobrol, bukan brosur?
- [ ] Apakah warna dipakai dengan berani tapi terkendali (maks. 2 aksen dominan per section)?

---

## 7. Fitur

### 7.1 Inti (MVP)
| Fitur | Deskripsi |
|---|---|
| Hero + Audience Switcher | Perkenalan singkat + pilihan Recruiter/Klien/Developer |
| Projects | Grid bervariasi, filter per teknologi, kartu "ditempel" di meja |
| Studi kasus `/projects/[slug]` | Masalah, proses, hasil, pelajaran, tech stack, link demo & repo |
| Skills | **Skill Playground**: badge berfisika (Matter.js) dikelompokkan *Dikuasai / Sedang didalami / Sedang dieksplor* |
| About | Cerita singkat, timeline (pendidikan, MagangHub), unduh CV (PDF) |
| Kontak | Form Web3Forms + link sosial + email |
| SEO | Meta, Open Graph image, sitemap, robots, JSON-LD `Person` |

### 7.2 Khas Programmer — Terminal Mode
Buka dengan **Ctrl/⌘+K**, tombol **`>_`**, atau tombol **`** ` ``. Perintah:

| Perintah | Hasil |
|---|---|
| `help` | Daftar perintah |
| `whoami` | Profil singkat Alam |
| `ls projects` / `open <slug>` | Daftar & buka project |
| `skills` | Daftar skill |
| `cat about.md` | Tentang Alam |
| `cat` (tanpa argumen) | 🐈 Muncul kucing ASCII — *pun* untuk pencinta kucing |
| `contact` | Info kontak |
| `jog` | Animasi lari kecil + statistik jogging |
| `theme <nama>` | Ganti tema terminal |
| `sudo hire-me` | Easter egg → arahkan ke CV/kontak |
| `clear`, `exit` | Standar |
| `ask <pertanyaan>` | *(Fase 3)* Tanya AI tentang Alam |

Fitur terminal: riwayat perintah (↑/↓), autocomplete (Tab), bisa dipakai penuh dengan keyboard, data diambil dari Content Collections yang sama.

### 7.3 Unik & Menyenangkan
| Fitur | Ide |
|---|---|
| 🐈 **Kucing pengikut kursor** | Kucing piksel kecil mengejar kursor, tidur jika diam. Bisa dimatikan. |
| 🗺️ **Paspor Jelajah** | Halaman/section berisi "cap paspor" tempat-tempat yang pernah dijelajahi Alam |
| 🏃 **Statistik jogging** | Angka sederhana (total km, rute favorit) — diisi manual via CMS |
| 📌 **/now** | "Sedang apa sekarang": belajar apa, membangun apa |
| 📜 **/log** | Changelog website — bukti website ini hidup & dirawat |
| 🎮 **Konami code** | ↑↑↓↓←→←→BA → kejutan (mis. hujan kucing) |
| ✍️ **Catatan pinggir** | Komentar kecil tulisan tangan di beberapa section |

### 7.4 Fase Lanjutan (opsional)
- Dark mode "meja kerja malam".
- `ask` di terminal + chatbot "Tanya tentang Alam" (Gemini API free tier, via Vercel Function).
- Keystatic mode GitHub (edit dari browser).
- Blog teknis.
- Guestbook (Turso/Supabase free tier).

---

## 8. Struktur Folder (target)

```
/
├─ AGENTS.md              ← file ini
├─ PROGRESS.md            ← log sesi kerja
├─ keystatic.config.ts    ← skema panel admin
├─ astro.config.mjs
├─ public/
│  ├─ cv/                 ← CV PDF
│  └─ og/                 ← gambar Open Graph
└─ src/
   ├─ content/            ← SEMUA DATA (diedit via Keystatic / VS Code)
   │  ├─ projects/        ← *.mdx (satu file per project)
   │  ├─ experience/      ← *.yaml
   │  ├─ places/          ← *.yaml (paspor jelajah)
   │  ├─ skills.yaml
   │  ├─ profile.yaml     ← nama, bio, sosial, jogging stats, now
   │  └─ changelog/       ← *.md
   ├─ content.config.ts   ← skema Zod
   ├─ components/
   │  ├─ ui/              ← tombol, stiker, kartu, tag (Astro murni)
   │  ├─ sections/        ← Hero, Projects, Skills, About, Contact
   │  ├─ islands/         ← interaktif: Terminal, SkillPlayground, CatCursor, AudienceSwitcher
   │  └─ doodles/         ← SVG coretan tangan
   ├─ layouts/BaseLayout.astro
   ├─ lib/                ← terminal engine, util animasi, helper
   ├─ pages/              ← index, projects/, about, now, log, 404
   └─ styles/             ← global.css, tokens.css
```

### Skema konten utama — `projects`
```ts
{
  title: string; slug: string; summary: string;   // 1 kalimat, suara Alam
  cover: image; gallery?: image[];
  stack: string[];                                  // dicocokkan ke skills
  category: 'web' | 'mobile' | 'ai' | 'game' | 'network' | 'other';
  links: { demo?: url; repo?: url };
  featured: boolean; order: number;
  date: date; status: 'selesai' | 'berjalan' | 'arsip';
  story: { problem; process; result; lesson };      // body MDX
}
```

---

## 9. Konvensi Kode

- TypeScript `strict`; tidak ada `any` tanpa komentar alasan.
- Komponen: `PascalCase.astro` / `.tsx`; util: `camelCase.ts`.
- **Default Astro statis**; jadikan island hanya bila butuh interaksi. Gunakan `client:visible` / `client:idle`, hindari `client:load` kecuali wajib.
- Library berat (Matter.js, GSAP plugin) **di-lazy-load**.
- Semua warna/spasi/font lewat token — tidak ada hex hardcode di komponen.
- Gambar via `astro:assets` (`<Image />`), format modern, ukuran eksplisit.
- Aksesibilitas: HTML semantik, fokus terlihat, alt text bermakna, semua fitur bisa dipakai keyboard.
- Commit: Conventional Commits (`feat:`, `fix:`, `style:`, `content:`, `chore:`, `docs:`).
- Bilingual ID/EN: default **Bahasa Indonesia** (`/`), dapat diubah ke **Bahasa Inggris** (`/en/`) via Astro i18n (`prefixDefaultLocale: false`). Siapkan struktur i18n sejak Fase 1 agar tidak perlu refactor besar di akhir.

### Anggaran performa
- Lighthouse ≥ 95 (Performance, A11y, Best Practices, SEO).
- JS awal halaman beranda < 100KB gzip (di luar island yang di-lazy-load).
- LCP < 2.0s, CLS < 0.05.

### Definition of Done (per fitur)
1. `npm run build` & `astro check` lolos tanpa error.
2. Responsif (360px → 1440px+).
3. Bisa dipakai keyboard & lolos `prefers-reduced-motion`.
4. Lolos checklist anti-slop (§6).
5. Dicatat di `PROGRESS.md`.

---

## 10. Pembagian Model AI (Hemat & Bijak)

| Tingkat | Model | Untuk |
|---|---|---|
| 🔴 **Berat** | **Gemini 4 Argon** / **Claude Opus 5.5** (effort High) | Arsitektur, design system, hero & arah visual, Terminal engine, Skill Playground (fisika), koreografi animasi GSAP, debugging sulit, audit anti-slop |
| 🟡 **Menengah** | **Claude Sonnet 5.5** / **Gemini 4 Hydrogen** | Komponen UI, halaman, skema konten, Keystatic, integrasi, perbaikan bug biasa |
| 🟢 **Ringan** | **Gemini 3.8 Flash** / **GPT-OSS 120B** | Isi data/konten, file config, meta SEO, README, typo, rename, format, wawancara |
| 🧭 **Orkestrasi** | **Orchestrator (Argon)** | Menjalankan beberapa tugas paralel dalam satu fase besar |

Tips hemat kuota: kuota **Gemini** dan **Claude/GPT** terpisah — selang-seling agar tidak cepat habis.

---

## 11. Roadmap Fase

| Fase | Isi | Model utama |
|---|---|---|
| **0. Perancangan** | Wawancara, arsitektur, design system, dokumen ini | Opus / Argon ✅ |
| **1. Fondasi** | Scaffold Astro + TS + Tailwind + Preact, token, font, BaseLayout, repo GitHub, deploy awal Vercel | Sonnet / Hydrogen (config: Flash) |
| **2. Konten & CMS** | Skema Content Collections, Keystatic, data contoh | Sonnet (isi data: Flash) |
| **3. Halaman inti** | Hero + Audience Switcher, Projects + studi kasus, About, Skills (statis), Kontak | Arah visual hero: Opus/Argon → implementasi: Sonnet |
| **4. Fitur WOW** | Terminal Mode, Skill Playground, kucing kursor, animasi GSAP/Lenis, View Transitions, Paspor Jelajah, easter egg | Argon / Opus |
| **5. Poles** | SEO, OG image, a11y, performa, `/now`, `/log`, 404 kreatif, audit anti-slop | Sonnet + Flash; audit: Opus |
| **6. Rilis** | Domain, Vercel Analytics, uji lintas perangkat, isi konten final | Flash / Sonnet |
| **7. Lanjutan** | Dark mode, AI `ask`, blog, guestbook | Sesuai kebutuhan |

---

## 12. Aturan untuk Agent

1. Baca `AGENTS.md` + entri terakhir `PROGRESS.md` di awal setiap sesi.
2. Kerjakan **satu fase/tugas** dalam satu waktu; jangan mengubah hal di luar cakupan.
3. Jangan mengarang data pribadi Alam. Jika butuh konten → beri placeholder bertanda `TODO(alam):` dan tanyakan.
4. Jangan menambah dependency tanpa alasan jelas; catat alasannya di `PROGRESS.md`.
5. Akhiri setiap sesi dengan menambah entri di `PROGRESS.md` (format ada di file tersebut).
6. Jika keputusan arsitektur berubah → perbarui `AGENTS.md` dan catat di "Log Keputusan" pada `PROGRESS.md`.
