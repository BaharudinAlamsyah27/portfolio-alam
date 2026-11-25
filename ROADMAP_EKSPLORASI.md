# Peta Eksplorasi Dunia Coding — Gudang Proyek Alam

> **Prinsip utama:** Tidak semua proyek harus besar atau terlihat "enterprise".
> Satu proyek kecil 200–500 baris yang **ditulis & dipahami sendiri 100%** jauh lebih bernilai daripada proyek raksasa hasil generate massal AI.
> Gunakan file ini sebagai kompas untuk menjelajahi **semua cabang dunia pemrograman** secara bertahap.

---

## Cara Memakai Daftar Ini
- Pilih **1 cabang baru** setiap bulan/minggu agar tidak kewalahan.
- Aturan main untuk tiap proyek eksplorasi: **AI hanya boleh jadi guru (tanya konsep/error), bukan penulis seluruh kode.**
- Setelah selesai, masukkan ke `src/content/projects/` sesuai kategorinya — portofolio otomatis mengelompokkannya di rak kategori yang rapi.

---

## 01. Backend & Distributed Systems *(Server Sungguhan, Bukan Simulasi Browser)*
*Fokus belajar: database relasional, concurrency, transaksi ACID, caching, autentikasi, Docker.*

- [ ] **Mini Ledger / Transfer Saldo Anti-Double-Spend** — API transfer uang pakai Go atau Node.js + PostgreSQL + `SELECT FOR UPDATE` (uji dengan 50 request bersamaan agar saldo tidak pernah minus).
- [ ] **URL Shortener + Rate Limiter + Analytics** — REST API dengan Redis (token bucket rate limiting) + PostgreSQL + Docker Compose.
- [ ] **Job Queue & Worker Sender** — Sistem antrean pengiriman email/laporan PDF di background (BullMQ / Go worker pool) lengkap dengan retry & dead-letter queue.
- [ ] **Auth Service dari Nol** — Implementasi registrasi, login, bcrypt/Argon2, JWT access + refresh token rotation, dan RBAC tanpa library auth siap pakai.

---

## 02. Networking & Protocols *(Cara Kerja Internet Sebenarnya)*
*Fokus belajar: TCP/UDP socket, HTTP/1.1 dari nol, DNS, proxy, paket jaringan.*

- [ ] **Raw TCP Chat Server** — Server chat terminal multi-pengguna (room + nickname) murni pakai TCP socket (Go / Python / Node `net`) tanpa WebSocket library.
- [ ] **Mini HTTP Server dari Nol** — Parsing raw HTTP request (`GET / HTTP/1.1`), baca header, dan kirim file statis langsung lewat TCP socket.
- [ ] **Simple Reverse Proxy & Load Balancer** — Meneruskan trafik ke 3 backend berbeda dengan algoritma *Round-Robin* + *health check* otomatis.
- [ ] **Port Scanner & Network Latency Monitor** — Alat CLI edukatif untuk mengecek port terbuka di jaringan lokal sendiri & memantau ping/jitter.

---

## 03. CLI Tools & Developer Utilities *(Alat Harian di Terminal)*
*Fokus belajar: file I/O, argumen CLI, distribusi binary, open-source.*

- [ ] **Dead Link Checker CLI** — Cek seluruh tautan di file Markdown/HTML apakah ada yang 404 (berjalan paralel/concurrent).
- [ ] **Smart Folder Organizer** — Tool CLI untuk merapikan folder `Downloads` otomatis berdasarkan ekstensi/tanggal dengan mode `--dry-run`.
- [ ] **Log Analyzer Ringan** — Membaca file log server 100MB+ (streaming baris per baris tanpa boros RAM) dan merangkum error terbanyak.
- [ ] **Git Commit & Changelog Helper** — Membaca riwayat Conventional Commits dan langsung membuat ringkasan changelog Markdown.

---

## 04. Mobile Development *(Offline-First & Sensor HP Nyata)*
*Fokus belajar: Flutter / React Native, GPS, SQLite lokal, UX layar sentuh.*

- [ ] **Aplikasi Catatan Jogging Pribadi Alam** — Lacak jarak & rute lari pakai GPS HP sungguhan, simpan offline di SQLite, ekspor GPX/JSON (langsung terhubung dengan catatan jogging di portofolio!).
- [ ] **Pencatat Keuangan Harian 100% Offline** — Input pengeluaran dalam 3 detik, grafik bulanan lokal, backup/restore JSON.
- [ ] **Habit & Belajar Tracker** — Pengingat harian sederhana dengan notifikasi lokal & statistik streak.

---

## 05. Game Development & Creative Coding *(Loop, Fisika, & State)*
*Fokus belajar: 60 FPS game loop, collision detection, state machine, canvas/WebGL.*

- [ ] **Pixel Cat Endless Runner (2D)** — Mini-game lompat rintangan pakai HTML5 Canvas murni (tanpa game engine) atau Godot.
- [ ] **Boids Flocking / Cellular Automata (Conway's Game of Life)** — Simulasi partikel & ekosistem sederhana yang interaktif dengan kursor.
- [ ] **Top-Down Mini Dungeon / Sokoban Puzzle** — Belajar tilemap, level loader dari JSON, dan sistem undo langkah.

---

## 06. AI / Machine Learning Murni *(Bukan Sekadar Wrapper API LLM)*
*Fokus belajar: model lokal, evaluasi objektif, computer vision, matematika ML.*

- [ ] **Deteksi Objek Real-Time di Browser (ONNX / WebGPU)** — Menjalankan model ringan langsung di perangkat tanpa server berbayar.
- [ ] **Naive Bayes / Logistic Regression dari Nol** — Implementasi klasifikasi spam/sentimen murni dengan NumPy/Python tanpa `scikit-learn` agar paham matematika gradiennya.
- [ ] **Benchmark & Eval Pipeline RAG** — Menguji kualitas jawaban RAG secara terukur (*precision@k*, *MRR*, *faithfulness*) pada dataset evaluasi buatan sendiri.
- [ ] **Local LLM Assistant (Ollama + Tool Calling)** — Asisten terminal 100% offline yang bisa membaca catatan lokal tanpa internet.

---

## 07. Security, Cryptography & Privacy *(Pola Pikir Defensif)*
*Fokus belajar: enkripsi simetris/asimetris, hashing, audit keamanan.*

- [ ] **Local Password Vault (AES-256-GCM + PBKDF2/Argon2)** — Brankas kata sandi CLI/web terenkripsi lokal dengan master password (tanpa cloud).
- [ ] **File Integrity Checker** — Menghitung & memverifikasi hash SHA-256 direktori untuk mendeteksi perubahan file tak terduga.
- [ ] **JWT Inspector & Security Header Auditor** — Tool kecil untuk memeriksa header keamanan HTTP (`CSP`, `HSTS`, `X-Frame-Options`) sebuah situs.

---

## 08. Browser Extension & Automation *(Otomatisasi Nyata)*
*Fokus belajar: Manifest V3, content scripts, DOM manipulation, produktivitas.*

- [ ] **Focus Reading Mode Extension** — Ekstensi Chrome/Edge buatan sendiri untuk membersihkan distraksi halaman artikel dengan 1 klik.
- [ ] **Tab Session Saver Ringan** — Simpan & pulihkan kumpulan tab kerja/belajar per proyek dalam format JSON lokal.

---

## 09. Data Engineering & Pipeline *(Bukan Cuma Visualisasi)*
*Fokus belajar: ETL, DuckDB/SQLite, kualitas data, automasi.*

- [ ] **Mini ETL Pipeline Data Publik (BPS / OJK / BMKG)** — Skrip Python terjadwal (GitHub Actions) yang menarik data mentah, membersihkan anomali, menyimpan ke Parquet/DuckDB, dan mengecek integritas data otomatis.
- [ ] **SQL Query Playground Lokal (DuckDB-WASM)** — Jalankan query SQL langsung ke file CSV/Parquet di browser tanpa upload.

---

## 10. Systems, Compilers & Low-Level *(Level Lanjutan — Sangat Memperkuat Fondasi)*
*Fokus belajar: parsing, AST, memori, cara kerja bahasa pemrograman.*

- [ ] **Mini JSON Parser dari Nol** — Tulis lexer & recursive descent parser sendiri (tanpa `JSON.parse`).
- [ ] **Tiny Calculator / Expression Evaluator (AST)** — Mendukung tanda kurung, variabel, dan prioritas operator (`2 + 3 * (4 - 1)`).
- [ ] **Mini Key-Value Store (Append-Only Log)** — Cara kerja dasar database (menulis ke file log + index di memori + compaction).

---

## Rekomendasi Urutan 5 Proyek Pertama untuk Alam
1. **Raw TCP Chat Server / Mini HTTP Server** *(Jaringan — cepat selesai, langsung membuka wawasan)*
2. **Dead Link Checker CLI** *(CLI — kecil, langsung berguna untuk ngecek portofolio sendiri)*
3. **Mini Ledger Anti-Double-Spend (PostgreSQL + Docker)** *(Backend produksi — sangat kuat buat interview)*
4. **Aplikasi Jogging GPS Offline** *(Mobile — langsung dipakai pribadi)*
5. **Pixel Cat Runner 2D (Canvas murni)** *(Game Dev — seru & personal)*
