import { useEffect, useState } from 'preact/hooks';

export type AudienceMode = 'semua' | 'recruiter' | 'klien' | 'dev';

interface Props {
  locale: 'id' | 'en';
  cvUrl?: string;
}

const STORAGE_KEY = 'alam_audience_mode';

const copy = {
  id: {
    prompt: 'Saya berkunjung sebagai:',
    modes: {
      semua: {
        label: 'Tamu Umum',
        tag: 'URUTAN STANDAR',
        pitch:
          'Urutan tampilan standar: Proyek pilihan, Daftar Skill, Tentang & Pengalaman, lalu Kontak.',
        primaryCta: { text: 'Lihat Proyek', href: '#projects' },
        secondaryCta: { text: 'Tentang Saya', href: '#about' },
      },
      recruiter: {
        label: 'Recruiter / HR',
        tag: 'MODE RECRUITER',
        pitch:
          'Bagian Skill dan Riwayat Pengalaman ditampilkan paling atas agar lebih cepat ditinjau.',
        primaryCta: { text: 'Lihat Skill & Pengalaman', href: '#skills' },
        secondaryCta: { text: 'Lihat Proyek', href: '#projects' },
      },
      klien: {
        label: 'Calon Klien',
        tag: 'MODE KLIEN',
        pitch:
          'Bagian Proyek dan Form Kontak dinaikkan ke atas agar Anda bisa langsung melihat hasil kerja dan berdiskusi.',
        primaryCta: { text: 'Lihat Hasil Kerja', href: '#projects' },
        secondaryCta: { text: 'Hubungi Saya', href: '#contact' },
      },
      dev: {
        label: 'Sesama Developer',
        tag: 'MODE DEVELOPER',
        pitch:
          'Urutan difokuskan ke studi kasus proyek, repository GitHub, dan tech stack. Tersedia juga Terminal Mode (Ctrl+K).',
        primaryCta: { text: 'Lihat Studi Kasus', href: '#projects' },
        secondaryCta: { text: 'Lihat Tech Stack', href: '#skills' },
      },
    },
    reorderHint: 'Urutan bagian di bawah otomatis menyesuaikan pilihan Anda.',
  },
  en: {
    prompt: 'I am visiting as:',
    modes: {
      semua: {
        label: 'General Visitor',
        tag: 'DEFAULT ORDER',
        pitch:
          'Standard layout order: Selected Projects, Skills, About & Experience, and Contact.',
        primaryCta: { text: 'View Projects', href: '#projects' },
        secondaryCta: { text: 'About Me', href: '#about' },
      },
      recruiter: {
        label: 'Recruiter / HR',
        tag: 'RECRUITER MODE',
        pitch:
          'Skills and Experience are moved to the top for a quicker overview.',
        primaryCta: { text: 'Skills & Experience', href: '#skills' },
        secondaryCta: { text: 'View Projects', href: '#projects' },
      },
      klien: {
        label: 'Potential Client',
        tag: 'CLIENT MODE',
        pitch:
          'Projects and the Contact form are moved up so you can review past work and reach out directly.',
        primaryCta: { text: 'View Work', href: '#projects' },
        secondaryCta: { text: 'Contact Me', href: '#contact' },
      },
      dev: {
        label: 'Fellow Developer',
        tag: 'DEV MODE',
        pitch:
          'Prioritizes project case studies, GitHub repos, and tech stack. Terminal Mode (Ctrl+K) is also available.',
        primaryCta: { text: 'Case Studies', href: '#projects' },
        secondaryCta: { text: 'Tech Stack', href: '#skills' },
      },
    },
    reorderHint: 'Sections below automatically reorder based on your selection.',
  },
} as const;

const modeOrder: AudienceMode[] = ['semua', 'recruiter', 'klien', 'dev'];

const modeAccent: Record<AudienceMode, string> = {
  semua: 'bg-mustard text-ink',
  recruiter: 'bg-leaf text-paper',
  klien: 'bg-tomato text-paper',
  dev: 'bg-cobalt text-paper',
};

export default function AudienceSwitcher({ locale, cvUrl }: Props) {
  const [mode, setMode] = useState<AudienceMode>('semua');
  const t = copy[locale];

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as AudienceMode | null;
      if (saved && modeOrder.includes(saved)) {
        setMode(saved);
        document.documentElement.dataset.audience = saved;
      } else {
        document.documentElement.dataset.audience = 'semua';
      }
    } catch {
      document.documentElement.dataset.audience = 'semua';
    }
  }, []);

  const handleSelect = (nextMode: AudienceMode) => {
    setMode(nextMode);
    document.documentElement.dataset.audience = nextMode;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // Abaikan jika private browsing memblokir localStorage
    }
  };

  const activeData = t.modes[mode];

  return (
    <div class="bg-paper-2 border-2 border-ink p-4 shadow-[4px_4px_0_var(--ink)] sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="font-mono text-xs font-bold uppercase tracking-wider text-ink">
          {t.prompt}
        </span>
        <span
          class={`rounded-sm border-2 border-ink px-2 py-0.5 font-mono text-[11px] font-bold ${modeAccent[mode]}`}
        >
          {activeData.tag}
        </span>
      </div>

      <div
        role="group"
        aria-label={t.prompt}
        class="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {modeOrder.map((item) => {
          const isActive = mode === item;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleSelect(item)}
              class={`rounded-sm border-2 border-ink px-3 py-2 text-left font-sans text-xs font-bold transition-all sm:text-sm ${
                isActive
                  ? `${modeAccent[item]} -translate-x-0.5 -translate-y-0.5 shadow-[3px_3px_0_var(--ink)]`
                  : 'bg-paper text-ink hover:bg-mustard/30 shadow-[1px_1px_0_var(--ink)]'
              }`}
            >
              <span class="block font-mono text-[10px] opacity-75">
                {isActive ? '●' : '○'} {item.toUpperCase()}
              </span>
              <span>{t.modes[item].label}</span>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        class="mt-3.5 border-t-2 border-dashed border-ink/25 pt-3 text-sm leading-relaxed text-ink"
      >
        {activeData.pitch}
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={activeData.primaryCta.href}
          class="sticker-btn bg-tomato text-paper rounded-sm px-4 py-2 text-xs sm:text-sm"
        >
          <span>{activeData.primaryCta.text}</span>
          <span aria-hidden="true">&rarr;</span>
        </a>

        <a
          href={activeData.secondaryCta.href}
          class="sticker-btn bg-paper text-ink rounded-sm px-3.5 py-2 text-xs sm:text-sm"
        >
          {activeData.secondaryCta.text}
        </a>

        {mode === 'recruiter' && cvUrl && (
          <a
            href={cvUrl}
            class="sticker-btn bg-mustard text-ink rounded-sm px-3.5 py-2 font-mono text-xs"
          >
            CV.pdf
          </a>
        )}

        <span class="ml-auto hidden font-hand text-sm text-ink-soft lg:inline">
          * {t.reorderHint}
        </span>
      </div>
    </div>
  );
}
