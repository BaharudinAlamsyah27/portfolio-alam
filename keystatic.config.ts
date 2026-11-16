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
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'AI', value: 'ai' },
  { label: 'Game', value: 'game' },
  { label: 'Jaringan', value: 'network' },
  { label: 'Lainnya', value: 'other' },
] as const;

export default config({
  storage: { kind: 'local' },

  ui: {
    brand: { name: 'Meja Kerja Alam' },
    navigation: {
      Profil: ['profile', 'skills', 'now'],
      Konten: ['projects', 'experience', 'places'],
      Website: ['changelog'],
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
        summary: localizedText('Ringkasan 1 kalimat (suara Alam)'),
        cover: fields.image({
          label: 'Gambar sampul',
          directory: 'src/assets/projects',
          publicPath: '../../assets/projects/',
        }),
        stack: fields.array(fields.text({ label: 'Teknologi' }), {
          label: 'Tech stack',
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
  },
});
