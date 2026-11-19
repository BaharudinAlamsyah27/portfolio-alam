export type TerminalTheme = 'ink' | 'paper' | 'forest' | 'amber';

export interface TerminalContext {
  locale: 'id' | 'en';
  profile: {
    name: string;
    nickname: string;
    role: string;
    bio: string;
    location: string;
    email: string;
    cvUrl: string;
    socials: Array<{ platform: string; label: string; url: string }>;
    jogging: { totalKm: number; favoriteRoute: string; note: string };
  };
  projects: Array<{
    slug: string;
    title: string;
    category: string;
    status: string;
    stack: string[];
    summary: string;
    href: string;
  }>;
  skills: Array<{
    name: string;
    category: string;
    level: string;
  }>;
}

export interface TerminalLine {
  kind: 'info' | 'accent' | 'muted' | 'error' | 'ascii';
  text: string;
}

export interface CommandResult {
  lines: TerminalLine[];
  clear?: boolean;
  close?: boolean;
  navigate?: string;
  scrollTo?: string;
  setTheme?: TerminalTheme;
  askQuestion?: string;
}

const VALID_THEMES: TerminalTheme[] = ['ink', 'paper', 'forest', 'amber'];

const BASE_COMMANDS = [
  'help',
  'whoami',
  'ls projects',
  'open ',
  'skills',
  'cat about.md',
  'cat',
  'contact',
  'jog',
  'ask ',
  'theme ',
  'sudo hire-me',
  'clear',
  'exit',
];

export function executeCommand(rawInput: string, ctx: TerminalContext): CommandResult {
  const trimmed = rawInput.trim();
  if (!trimmed) return { lines: [] };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(' ');
  const isId = ctx.locale === 'id';

  if (cmd === 'clear') {
    return { lines: [], clear: true };
  }

  if (cmd === 'exit' || cmd === 'quit') {
    return {
      lines: [{ kind: 'muted', text: isId ? 'Menutup terminal...' : 'Closing terminal...' }],
      close: true,
    };
  }

  if (cmd === 'help') {
    return {
      lines: [
        {
          kind: 'accent',
          text: isId ? 'Daftar perintah tersedia:' : 'Available commands:',
        },
        { kind: 'info', text: '  whoami            — ' + (isId ? 'Profil singkat Alam' : 'Short profile') },
        { kind: 'info', text: '  ls projects       — ' + (isId ? 'Daftar project' : 'List projects') },
        { kind: 'info', text: '  open <slug>       — ' + (isId ? 'Buka studi kasus project' : 'Open project case study') },
        { kind: 'info', text: '  skills            — ' + (isId ? 'Daftar skill dikelompokkan' : 'Grouped skill list') },
        { kind: 'info', text: '  cat about.md      — ' + (isId ? 'Tentang & hobi Alam' : 'About Alam & hobbies') },
        { kind: 'info', text: '  cat               — ' + (isId ? 'Panggil kucing ASCII 🐈' : 'Summon ASCII cat 🐈') },
        { kind: 'info', text: '  jog               — ' + (isId ? 'Statistik jogging pagi' : 'Morning jogging stats') },
        { kind: 'info', text: '  contact           — ' + (isId ? 'Info kontak & pindah ke form' : 'Contact info & scroll to form') },
        { kind: 'info', text: '  ask <pertanyaan>  — ' + (isId ? 'Tanya AI tentang Alam 🤖' : 'Ask AI about Alam 🤖') },
        { kind: 'info', text: '  theme <nama>      — ink | paper | forest | amber' },
        { kind: 'info', text: '  sudo hire-me      — ' + (isId ? 'Akses cepat HR / Klien' : 'Fast-track HR / Client mode') },
        { kind: 'info', text: '  clear / exit      — ' + (isId ? 'Bersihkan / tutup' : 'Clear / close') },
      ],
    };
  }

  if (cmd === 'whoami') {
    return {
      lines: [
        { kind: 'accent', text: `${ctx.profile.name} (${ctx.profile.nickname})` },
        { kind: 'info', text: `Role     : ${ctx.profile.role} · Fresh graduate (MagangHub)` },
        { kind: 'info', text: `Fokus    : Web programming | Mobile & AI | Game dev & Network` },
        { kind: 'info', text: `Lokasi   : ${ctx.profile.location}` },
        { kind: 'muted', text: `"${isId ? 'Lebih banyak kode daripada kata.' : 'More code than words.'}"` },
      ],
    };
  }

  if (cmd === 'projects' || (cmd === 'ls' && (!arg || arg === 'projects'))) {
    if (ctx.projects.length === 0) {
      return { lines: [{ kind: 'muted', text: isId ? 'Belum ada project terbit.' : 'No published projects yet.' }] };
    }
    const lines: TerminalLine[] = [
      {
        kind: 'accent',
        text: isId
          ? `Ditemukan ${ctx.projects.length} project (ketik "open <slug>" untuk membuka):`
          : `Found ${ctx.projects.length} projects (type "open <slug>" to view):`,
      },
    ];
    for (const p of ctx.projects) {
      lines.push({
        kind: 'info',
        text: `  [${p.category}] ${p.slug} — ${p.title} (${p.status})`,
      });
      lines.push({
        kind: 'muted',
        text: `     stack: ${p.stack.join(', ')}`,
      });
    }
    return { lines };
  }

  if (cmd === 'open') {
    if (!arg) {
      return {
        lines: [
          {
            kind: 'error',
            text: isId
              ? 'Pemakaian: open <slug>. Ketik "ls projects" untuk lihat daftar slug.'
              : 'Usage: open <slug>. Run "ls projects" to see available slugs.',
          },
        ],
      };
    }
    const target = ctx.projects.find((p) => p.slug.toLowerCase() === arg.toLowerCase());
    if (!target) {
      return {
        lines: [
          {
            kind: 'error',
            text: isId ? `Project "${arg}" tidak ditemukan.` : `Project "${arg}" not found.`,
          },
        ],
      };
    }
    return {
      lines: [
        {
          kind: 'accent',
          text: isId ? `Membuka ${target.title}...` : `Opening ${target.title}...`,
        },
      ],
      navigate: target.href,
      close: true,
    };
  }

  if (cmd === 'skills') {
    const levels = ['dikuasai', 'didalami', 'dieksplor'];
    const labels: Record<string, string> = isId
      ? {
          dikuasai: 'Dikuasai (Siap Kerja)',
          didalami: 'Sedang Didalami',
          dieksplor: 'Sedang Dieksplor',
        }
      : {
          dikuasai: 'Proficient (Production)',
          didalami: 'Deepening',
          dieksplor: 'Exploring',
        };
    const lines: TerminalLine[] = [];
    for (const lvl of levels) {
      const items = ctx.skills.filter((s) => s.level === lvl);
      if (items.length > 0) {
        lines.push({ kind: 'accent', text: `[${labels[lvl]}]` });
        lines.push({ kind: 'info', text: '  ' + items.map((i) => i.name).join(' · ') });
      }
    }
    return { lines };
  }

  if (cmd === 'ynwa' || cmd === 'liverpool' || cmd === 'lfc') {
    return {
      lines: [
        { kind: 'accent', text: '   ⚽  YOU’LL NEVER WALK ALONE!  ⚽   ' },
        {
          kind: 'info',
          text: isId
            ? 'Anfield spirit — dukung Liverpool sambil ngoding & nunggu jadwal tanding.'
            : 'Anfield spirit — supporting Liverpool FC between coding sessions.',
        },
        { kind: 'muted', text: '#YNWA · #LFC' },
      ],
    };
  }

  if (cmd === 'gowes' || cmd === 'sepeda') {
    return {
      lines: [
        { kind: 'ascii', text: '      __o     ' },
        { kind: 'ascii', text: '    _`\\<,_   kring-kring!' },
        { kind: 'ascii', text: '   (*)/ (*)   ' },
        {
          kind: 'muted',
          text: isId
            ? 'Gowes santai keliling Sragen/Brebes buat refresh otak dari bug.'
            : 'Casual cycling to refresh the brain from debugging.',
        },
      ],
    };
  }

  if (cmd === 'wayang' || cmd === 'batik') {
    return {
      lines: [
        { kind: 'accent', text: '       /\\       ' },
        { kind: 'accent', text: '      /||\\      Gunungan Wayang' },
        { kind: 'accent', text: '     /_||_\\     Batik Kawung · Jawa Tengah' },
        { kind: 'accent', text: '       ||       ' },
        {
          kind: 'muted',
          text: isId
            ? 'Asal Brebes, berkarya di Sragen — tradisi tetap jalan bareng teknologi.'
            : 'Born in Brebes, building in Sragen — heritage alongside technology.',
        },
      ],
    };
  }

  if (cmd === 'rimuru' || cmd === 'slime') {
    return {
      lines: [
        { kind: 'accent', text: '       .---.       ' },
        { kind: 'accent', text: '     /  o   \\      ' },
        { kind: 'accent', text: '    (  - ᴗ - )  ~  ' },
        { kind: 'accent', text: '     `-------´     ' },
        {
          kind: 'info',
          text: isId
            ? 'Rimuru Tempest: "Tenang, aku bukan slime jahat kok!"'
            : 'Rimuru Tempest: "Don’t worry, I’m not a bad slime, slurp!"',
        },
        {
          kind: 'muted',
          text: isId
            ? '[Great Sage]: Mode meja kerja Jura Tempest aktif.'
            : '[Great Sage]: Jura Tempest desk mode active.',
        },
      ],
    };
  }

  if (cmd === 'cat') {
    if (!arg) {
      return {
        lines: [
          { kind: 'ascii', text: '   /\\_/\\  ' },
          { kind: 'ascii', text: '  ( o.o )  meong~' },
          { kind: 'ascii', text: '   > ^ <  ' },
          {
            kind: 'muted',
            text: isId
              ? '*purrrr... (ketik "cat about.md" kalau mau baca profil Alam)*'
              : '*purrrr... (type "cat about.md" to read Alam’s profile)*',
          },
        ],
      };
    }
    if (arg.toLowerCase() === 'about.md' || arg.toLowerCase() === 'about') {
      return {
        lines: [
          { kind: 'accent', text: '# about.md' },
          { kind: 'info', text: ctx.profile.bio },
          {
            kind: 'muted',
            text: isId
              ? 'Kepribadian: Teliti, hati-hati, introvert, lebih banyak kerja daripada bicara.'
              : 'Traits: Thorough, careful, introverted, more work than talk.',
          },
          {
            kind: 'muted',
            text: isId
              ? 'Hobi: Kucing, jogging pagi, eksplor tempat baru, belajar hal teknis.'
              : 'Hobbies: Cats, morning jogging, exploring new places, learning.',
          },
        ],
      };
    }
    return {
      lines: [
        {
          kind: 'error',
          text: isId ? `cat: ${arg}: File tidak ada di meja.` : `cat: ${arg}: No such file on desk.`,
        },
      ],
    };
  }

  if (cmd === 'jog') {
    const j = ctx.profile.jogging;
    return {
      lines: [
        { kind: 'ascii', text: '    o   ' },
        { kind: 'ascii', text: '   /|\\   tap tap tap...' },
        { kind: 'ascii', text: '   / \\  ' },
        {
          kind: 'accent',
          text: isId ? `Total jarak tercatat : ${j.totalKm} km` : `Logged distance : ${j.totalKm} km`,
        },
        {
          kind: 'info',
          text: isId
            ? `Rute favorit        : ${j.favoriteRoute || '-'}`
            : `Favorite route  : ${j.favoriteRoute || '-'}`,
        },
        ...(j.note ? [{ kind: 'muted' as const, text: `Catatan: ${j.note}` }] : []),
      ],
    };
  }

  if (cmd === 'contact') {
    const lines: TerminalLine[] = [
      {
        kind: 'accent',
        text: isId ? 'Menuju bagian kontak...' : 'Scrolling to contact desk...',
      },
    ];
    if (ctx.profile.email) {
      lines.push({ kind: 'info', text: `Email : ${ctx.profile.email}` });
    }
    for (const s of ctx.profile.socials) {
      lines.push({ kind: 'info', text: `${s.platform.padEnd(10)}: ${s.url}` });
    }
    return {
      lines,
      scrollTo: '#contact',
      close: true,
    };
  }

  if (cmd === 'theme') {
    const next = arg.toLowerCase() as TerminalTheme;
    if (!arg || !VALID_THEMES.includes(next)) {
      return {
        lines: [
          {
            kind: 'info',
            text: isId
              ? `Tema tersedia: ${VALID_THEMES.join(', ')}. Contoh: theme forest`
              : `Available themes: ${VALID_THEMES.join(', ')}. Example: theme forest`,
          },
        ],
      };
    }
    return {
      lines: [
        {
          kind: 'accent',
          text: isId ? `Tema terminal diubah ke "${next}".` : `Terminal theme switched to "${next}".`,
        },
      ],
      setTheme: next,
    };
  }

  if (cmd === 'sudo' && arg.toLowerCase() === 'hire-me') {
    return {
      lines: [
        {
          kind: 'accent',
          text: isId
            ? '[sudo] Akses diberikan untuk Alam! Mengarahkan ke meja kontak...'
            : '[sudo] Access granted for Alam! Taking you to the contact desk...',
        },
        ...(ctx.profile.cvUrl
          ? [{ kind: 'info' as const, text: `CV: ${ctx.profile.cvUrl}` }]
          : []),
      ],
      scrollTo: '#contact',
      navigate: ctx.profile.cvUrl || undefined,
      close: true,
    };
  }

  if (cmd === 'ask') {
    if (!arg) {
      return {
        lines: [
          {
            kind: 'accent',
            text: isId
              ? 'Pemakaian: ask <pertanyaan tentang Alam>'
              : 'Usage: ask <question about Alam>',
          },
          {
            kind: 'muted',
            text: isId
              ? 'Contoh: ask apa saja project Alam di BPRS Sukowati?'
              : 'Example: ask what projects has Alam built?',
          },
        ],
      };
    }

    return {
      lines: [
        {
          kind: 'muted',
          text: isId ? '🤖 Memikirkan jawaban...' : '🤖 Thinking...',
        },
      ],
      askQuestion: arg,
    };
  }

  return {
    lines: [
      {
        kind: 'error',
        text: isId
          ? `Perintah "${trimmed}" tidak dikenal. Ketik "help" untuk daftar perintah.`
          : `Command "${trimmed}" not found. Type "help" for available commands.`,
      },
    ],
  };
}

export function autocompleteInput(partial: string, ctx: TerminalContext): string | null {
  const lower = partial.toLowerCase();
  if (!lower) return null;

  if (lower.startsWith('open ')) {
    const slugQuery = lower.slice(5);
    const match = ctx.projects.find((p) => p.slug.toLowerCase().startsWith(slugQuery));
    return match ? `open ${match.slug}` : null;
  }

  if (lower.startsWith('theme ')) {
    const themeQuery = lower.slice(6);
    const match = VALID_THEMES.find((th) => th.startsWith(themeQuery));
    return match ? `theme ${match}` : null;
  }

  const cmdMatch = BASE_COMMANDS.find((c) => c.startsWith(lower));
  return cmdMatch ?? null;
}

/**
 * Mesin penjawab lokal berbasis data Content Collections.
 * Digunakan ketika /api/ask (Gemini API) belum dikonfigurasi atau sedang offline,
 * sehingga perintah `ask <pertanyaan>` selalu bisa menjawab secara akurat & instan.
 */
export function answerQuestionLocally(question: string, ctx: TerminalContext): TerminalLine[] {
  const q = question.toLowerCase();
  const isId = ctx.locale === 'id';

  if (/(magang|bprs|sukowati|kantor|pengalaman|kerja|intern)/.test(q)) {
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? 'Saat ini Alam menjalani program MagangHub sebagai IT Staff di BPRS Sukowati Sragen. Di sana ia mengembangkan & merawat sistem internal seperti website perusahaan, eSurat (disposisi & arsip surat), CMMS, dan monitoring keaktifan anggota.'
          : 'Alam is currently an IT Staff intern (MagangHub) at BPRS Sukowati Sragen, building and maintaining internal systems including the corporate website, eSurat (digital correspondence), CMMS, and member monitoring.',
      },
    ];
  }

  if (/(project|proyek|buat|bikin|portofolio|esurat|kredit|armada)/.test(q)) {
    const titles = ctx.projects.map((p) => p.title).join('; ');
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? `Project utama Alam meliputi: ${titles}. Ketik "ls projects" lalu "open <slug>" untuk membaca masalah, proses, dan hasilnya.`
          : `Alam’s featured projects include: ${titles}. Type "ls projects" then "open <slug>" to read the full case studies.`,
      },
    ];
  }

  if (/(skill|keahlian|bisa|bahasa|framework|stack|teknologi|tech)/.test(q)) {
    const core = ctx.skills
      .filter((s) => s.level === 'dikuasai')
      .map((s) => s.name)
      .join(', ');
    const learning = ctx.skills
      .filter((s) => s.level === 'didalami')
      .map((s) => s.name)
      .join(', ');
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? `Pegangan utama Alam adalah Web Programming (${core}). Saat ini ia sedang mendalami ${learning}, serta mengeksplor game dev dan jaringan komputer.`
          : `Alam’s daily drivers are in Web Programming (${core}). He is actively deepening ${learning}, while exploring game dev and networking.`,
      },
    ];
  }

  if (/(lokasi|tinggal|domisili|asal|mana|sragen|brebes|remote|onsite|pindah)/.test(q)) {
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? `Alam berasal dari Brebes dan sekarang berdomisili di Sragen, Jawa Tengah. Ia terbuka untuk peluang kerja full-time (onsite/hybrid/remote) maupun kolaborasi proyek web.`
          : `Alam is originally from Brebes and currently based in Sragen, Central Java. He is open to full-time roles (onsite/hybrid/remote) and freelance web projects.`,
      },
    ];
  }

  if (/(kontak|hubungi|email|hire|rekrut|cv|resume|wa|linkedin)/.test(q)) {
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? `Kamu bisa menghubungi Alam lewat email ${ctx.profile.email}, LinkedIn, atau langsung ketik "sudo hire-me" untuk mengunduh CV (${ctx.profile.cvUrl}) dan menuju form kontak.`
          : `You can reach Alam at ${ctx.profile.email}, on LinkedIn, or type "sudo hire-me" to grab his CV (${ctx.profile.cvUrl}) and jump to the contact form.`,
      },
    ];
  }

  if (/(hobi|kucing|cat|jogging|lari|sifat|orangnya|introvert)/.test(q)) {
    return [
      {
        kind: 'accent',
        text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
      },
      {
        kind: 'info',
        text: isId
          ? `Di luar layar, Alam suka kucing, jogging pagi (sudah tercatat ${ctx.profile.jogging.totalKm} km), dan menjelajah tempat baru. Orangnya teliti, hati-hati, dan lebih banyak kerja daripada bicara.`
          : `Away from the keyboard, Alam enjoys cats, morning jogs (${ctx.profile.jogging.totalKm} km logged), and exploring new places. He’s thorough, careful, and prefers shipping code over long small talk.`,
      },
    ];
  }

  return [
    {
      kind: 'accent',
      text: isId ? '🤖 [Asisten Meja Alam]:' : '🤖 [Alam’s Desk Assistant]:',
    },
    {
      kind: 'info',
      text: isId
        ? `${ctx.profile.name} (${ctx.profile.nickname}) adalah fresh graduate & IT Staff (MagangHub) di BPRS Sukowati Sragen yang fokus di Web Programming, sedang mendalami Mobile & AI. Coba tanya soal project, skill, pengalaman magang, lokasi, atau cara menghubungi Alam!`
        : `${ctx.profile.name} (${ctx.profile.nickname}) is a fresh graduate & IT Staff intern (MagangHub) at BPRS Sukowati Sragen focused on Web Programming, deepening Mobile & AI. Try asking about his projects, skills, internship, location, or contact info!`,
    },
  ];
}
