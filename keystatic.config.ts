import { collection, config, fields, singleton } from '@keystatic/core';

/**
 * Panel admin Alam — jalan di `npm run dev` → http://localhost:4321/keystatic
 * Skema ini HARUS selaras dengan src/content.config.ts (Zod).
 */

const localizedText = (label: string, multiline = false) =>
  fields.object(
    {
      id: fields.text({ label: 'Bahasa Indonesia', multiline }),
      en: fields.text({
        label: 'English (opsional, kosong = pakai teks Indonesia)',
        multiline,
      }),
    },
    { label },
  );

const categoryOptions = [
  { label: 'Web App', value: 'web' },
  { label: 'AI & Data', value: 'ai' },
  { label: 'Sistem Kantor / Enterprise', value: 'enterprise' },
  { label: 'Geospasial / WebGIS', value: 'gis' },
  { label: 'Mobile App', value: 'mobile' },
  { label: 'Game Dev', value: 'game' },
  { label: 'Jaringan / Infra', value: 'network' },
  { label: 'Lainnya', value: 'other' },
] as const;

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Meja Kerja Alam' },
    navigation: {
      Profil: ['profile', 'skills', 'now'],
      Konten: ['projects', 'products', 'notes', 'experience', 'places'],
      Website: ['guestbook', 'changelog'],
    },
  },

  singletons: {
    profile: singleton({
      label: 'Profil & Sosial Media',
      path: 'src/content/singletons/profile',
      schema: {
        name: fields.text({ label: 'Nama lengkap', defaultValue: 'Baharudin Alamsyah' }),
        nickname: fields.text({ label: 'Nama panggilan', defaultValue: 'Alam' }),
        role: localizedText('Peran singkat (contoh: Web developer)'),
        tagline: localizedText('Tagline hero'),
        bio: localizedText('Bio / cerita singkat', true),
        location: fields.text({ label: 'Lokasi' }),
        photo: fields.image({
          label: 'Foto profil',
          directory: 'src/assets/profile',
          publicPath: '../../assets/profile/',
        }),
        email: fields.text({ label: 'Email publik' }),
        cvUrl: fields.text({
          label: 'Link/path CV (contoh: /cv/cv-alam.pdf)',
        }),
        openToWork: fields.checkbox({
          label: 'Terbuka untuk kerja / kolaborasi',
          defaultValue: true,
        }),
        socials: fields.array(
          fields.object({
            platform: fields.select({
              label: 'Platform',
              options: [
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'X / Twitter', value: 'x' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Threads', value: 'threads' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Email', value: 'email' },
                { label: 'Website lain', value: 'website' },
                { label: 'Lainnya', value: 'other' },
              ],
              defaultValue: 'github',
            }),
            label: fields.text({ label: 'Teks tampil (opsional)' }),
            url: fields.text({ label: 'URL / link' }),
          }),
          {
            label: 'Sosial media',
            itemLabel: (props) => props.fields.label.value || props.fields.platform.value,
          },
        ),
        jogging: fields.object(
          {
            totalKm: fields.number({ label: 'Total jogging (km)', defaultValue: 0 }),
            favoriteRoute: fields.text({ label: 'Rute favorit' }),
            note: localizedText('Catatan kecil jogging'),
          },
          { label: 'Statistik jogging' },
        ),
      },
    }),

    skills: singleton({
      label: 'Skill',
      path: 'src/content/singletons/skills',
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Nama skill / teknologi' }),
            category: fields.select({
              label: 'Kategori',
              options: [
                { label: 'Web', value: 'web' },
                { label: 'Mobile', value: 'mobile' },
                { label: 'AI', value: 'ai' },
                { label: 'Game', value: 'game' },
                { label: 'Jaringan', value: 'network' },
                { label: 'Tools', value: 'tool' },
                { label: 'Lainnya', value: 'other' },
              ],
              defaultValue: 'web',
            }),
            level: fields.select({
              label: 'Tingkat',
              options: [
                { label: 'Dikuasai', value: 'dikuasai' },
                { label: 'Sedang didalami', value: 'didalami' },
                { label: 'Sedang dieksplor', value: 'dieksplor' },
              ],
              defaultValue: 'dikuasai',
            }),
            note: localizedText('Catatan singkat (opsional)'),
          }),
          {
            label: 'Daftar skill',
            itemLabel: (props) => `${props.fields.name.value} · ${props.fields.level.value}`,
          },
        ),
      },
    }),

    now: singleton({
      label: 'Halaman /now',
      path: 'src/content/singletons/now',
      schema: {
        updatedAt: fields.date({ label: 'Terakhir diperbarui' }),
        summary: localizedText('Sedang apa sekarang?', true),
        learning: fields.array(fields.text({ label: 'Topik' }), { label: 'Sedang dipelajari' }),
        building: fields.array(fields.text({ label: 'Project' }), { label: 'Sedang dibangun' }),
        exploring: fields.array(fields.text({ label: 'Topik' }), { label: 'Sedang dieksplor' }),
      },
    }),

    guestbook: singleton({
      label: 'Buku Tamu Meja Kerja',
      path: 'src/content/singletons/guestbook',
      schema: {
        entries: fields.array(
          fields.object({
            name: fields.text({ label: 'Nama tamu' }),
            role: fields.text({ label: 'Peran / asal (contoh: Sesama Dev)' }),
            message: fields.text({ label: 'Pesan singkat', multiline: true }),
            color: fields.select({
              label: 'Warna kertas tempel',
              options: [
                { label: 'Kuning Mustard', value: 'mustard' },
                { label: 'Merah Muda Blush', value: 'blush' },
                { label: 'Kertas Krem', value: 'paper' },
                { label: 'Hijau Daun', value: 'leaf' },
              ],
              defaultValue: 'mustard',
            }),
            date: fields.text({ label: 'Tanggal (YYYY-MM-DD)', defaultValue: '2026-11-16' }),
          }),
          {
            label: 'Daftar catatan tamu yang ditempel di meja',
            itemLabel: (props) => `${props.fields.name.value} (${props.fields.role.value})`,
          },
        ),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Project',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'story' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Judul project' } }),
        tagline: fields.text({ label: 'Tagline singkat (maks. 12 kata)' }),
        summary: localizedText('Ringkasan singkat (2-3 kalimat, maks. 280 karakter)', true),
        cover: fields.image({
          label: 'Gambar sampul',
          directory: 'src/assets/projects',
          publicPath: '../../assets/projects/',
        }),
        role: fields.text({ label: 'Peran (contoh: Full-Stack Developer, Solo Project)' }),
        context: fields.text({ label: 'Konteks (contoh: Program MagangHub di BPRS Sragen)' }),
        duration: fields.text({ label: 'Durasi pengerjaan (contoh: 2 minggu)' }),
        stack: fields.array(fields.text({ label: 'Teknologi' }), {
          label: 'Tech stack',
          itemLabel: (props) => props.value,
        }),
        tags: fields.array(fields.text({ label: 'Tag / Keyword' }), {
          label: 'Tags / Keywords (untuk pencarian & filter)',
          itemLabel: (props) => props.value,
        }),
        category: fields.select({
          label: 'Kategori',
          options: [...categoryOptions],
          defaultValue: 'web',
        }),
        demoUrl: fields.text({ label: 'Link demo' }),
        repoUrl: fields.text({ label: 'Link repo (GitHub)' }),
        featured: fields.checkbox({ label: 'Tampilkan di beranda', defaultValue: false }),
        draft: fields.checkbox({
          label: 'Draft (disembunyikan dari website)',
          defaultValue: true,
        }),
        order: fields.integer({ label: 'Urutan (kecil = lebih awal)', defaultValue: 100 }),
        date: fields.date({ label: 'Tanggal' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Selesai', value: 'selesai' },
            { label: 'Berjalan', value: 'berjalan' },
            { label: 'Arsip', value: 'arsip' },
          ],
          defaultValue: 'selesai',
        }),
        story: fields.mdx({
          label: 'Studi kasus (Masalah → Proses → Hasil → Pelajaran)',
          options: {
            image: {
              directory: 'src/assets/projects',
              publicPath: '../../assets/projects/',
            },
          },
        }),
      },
    }),

    experience: collection({
      label: 'Pengalaman & Pendidikan',
      slugField: 'organization',
      path: 'src/content/experience/*',
      format: { data: 'yaml' },
      schema: {
        organization: fields.slug({ name: { label: 'Organisasi / institusi' } }),
        title: localizedText('Posisi / jurusan'),
        kind: fields.select({
          label: 'Jenis',
          options: [
            { label: 'Pendidikan', value: 'pendidikan' },
            { label: 'Kerja', value: 'kerja' },
            { label: 'Magang', value: 'magang' },
            { label: 'Lainnya', value: 'lainnya' },
          ],
          defaultValue: 'magang',
        }),
        start: fields.date({ label: 'Mulai' }),
        end: fields.date({ label: 'Selesai (kosongkan jika masih berjalan)' }),
        current: fields.checkbox({ label: 'Masih berjalan', defaultValue: false }),
        description: localizedText('Deskripsi singkat', true),
      },
    }),

    places: collection({
      label: 'Paspor Jelajah (tempat)',
      slugField: 'name',
      path: 'src/content/places/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({ name: { label: 'Nama tempat' } }),
        region: fields.text({ label: 'Kota / daerah' }),
        visitedAt: fields.date({ label: 'Tanggal berkunjung' }),
        note: localizedText('Catatan kecil', true),
        stamp: fields.image({
          label: 'Gambar cap (opsional)',
          directory: 'src/assets/places',
          publicPath: '../../assets/places/',
        }),
      },
    }),

    changelog: collection({
      label: 'Changelog website',
      slugField: 'title',
      path: 'src/content/changelog/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Judul' } }),
        date: fields.date({ label: 'Tanggal' }),
        version: fields.text({ label: 'Versi (opsional)' }),
        body: fields.mdx({ label: 'Isi' }),
      },
    }),

    notes: collection({
      label: 'Catatan & Cerita (/notes)',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Judul catatan' } }),
        summary: localizedText('Ringkasan singkat', true),
        category: fields.select({
          label: 'Rubrik / Kategori',
          options: [
            { label: 'Lab & Kode', value: 'lab' },
            { label: 'Belajar', value: 'belajar' },
            { label: 'Event & Lomba', value: 'event' },
            { label: 'Opini', value: 'opini' },
            { label: 'Cerita Jalan-jalan', value: 'jelajah' },
            { label: 'Cerita Hidup', value: 'hidup' },
          ],
          defaultValue: 'lab',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Topik / Tag',
          itemLabel: (props) => props.value,
        }),
        date: fields.date({ label: 'Tanggal' }),
        draft: fields.checkbox({ label: 'Draft (sembunyikan)', defaultValue: false }),
        body: fields.mdx({ label: 'Isi catatan' }),
      },
    }),

    products: collection({
      label: 'Toko Produk Web (/toko)',
      slugField: 'title',
      path: 'src/content/products/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Nama produk website' } }),
        summary: localizedText('Deskripsi singkat untuk kartu etalase', true),
        cover: fields.image({
          label: 'Gambar preview / screenshot',
          directory: 'src/assets/products',
          publicPath: '../../assets/products/',
        }),
        category: fields.select({
          label: 'Bidang',
          options: [
            { label: 'Administrasi', value: 'administrasi' },
            { label: 'Pendidikan', value: 'pendidikan' },
            { label: 'Geospasial / Peta', value: 'geospasial' },
            { label: 'Operasional & Piket', value: 'operasional' },
            { label: 'Data Gudang / Stok', value: 'gudang' },
            { label: 'Lainnya', value: 'lainnya' },
          ],
          defaultValue: 'administrasi',
        }),
        price: fields.text({
          label: 'Harga tampil (contoh: Rp350.000)',
          defaultValue: 'Rp350.000',
        }),
        scale: fields.select({
          label: 'Skala sistem',
          options: [
            { label: 'Sederhana', value: 'sederhana' },
            { label: 'Menengah', value: 'menengah' },
          ],
          defaultValue: 'sederhana',
        }),
        badge: fields.text({
          label: 'Label stiker (contoh: Siap Pakai / Bisa Custom)',
          defaultValue: 'Siap Pakai',
        }),
        features: fields.array(fields.text({ label: 'Fitur / yang didapat pembeli' }), {
          label: 'Daftar fitur utama',
          itemLabel: (props) => props.value,
        }),
        stack: fields.array(fields.text({ label: 'Teknologi' }), {
          label: 'Tech stack',
          itemLabel: (props) => props.value,
        }),
        demoUrl: fields.text({ label: 'Link live demo (opsional)' }),
        proofOfWork: fields.text({
          label: 'Bukti implementasi / social proof (contoh: Teruji di operasional BPRS Sukowati Sragen)',
        }),
        buyUrl: fields.text({
          label: 'Link checkout khusus (kosongkan = otomatis ke WhatsApp 087781308730)',
        }),
        order: fields.integer({ label: 'Urutan tampil', defaultValue: 100 }),
        draft: fields.checkbox({ label: 'Draft (sembunyikan dari toko)', defaultValue: false }),
        body: fields.mdx({ label: 'Detail lengkap produk & cara pakai' }),
      },
    }),
  },
});
