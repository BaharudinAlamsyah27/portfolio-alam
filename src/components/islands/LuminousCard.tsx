import { useState } from 'preact/hooks';

interface Props {
  locale?: 'id' | 'en';
  projectCount: number;
  liveDemoCount: number;
  projectsHref: string;
}

const QUOTES_ID = [
  'Hmph… silakan periksa karya Alam di bawah.',
  'Jangan cuma dilihat, coba langsung live demo-nya!',
  'Ruberios Desk Guard · 0 error terdeteksi.',
  'Coba klik kartu ini kalau mau lihat statistik cepat.',
];

const QUOTES_EN = [
  'Hmph… feel free to inspect Alam’s works below.',
  'Don’t just stare—try the live demos right away!',
  'Ruberios Desk Guard · 0 errors detected.',
  'Flip this card to see quick desk statistics.',
];

export default function LuminousCard({
  locale = 'id',
  projectCount,
  liveDemoCount,
  projectsHref,
}: Props) {
  const quotes = locale === 'en' ? QUOTES_EN : QUOTES_ID;
  const [flipped, setFlipped] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const nextQuote = (e: Event) => {
    e.stopPropagation();
    setQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  return (
    <div class="flip-scene mx-auto w-full max-w-[300px] pt-1 lg:mr-0 lg:ml-auto">
      <div class={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* ==================== SISI DEPAN: Arch Gotik Ruberios + Balon Dialog ==================== */}
        <div
          class={`flip-face relative rounded-md border-2 border-ink bg-paper p-3.5 shadow-[4px_4px_0_var(--ink)] ${
            flipped ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          {/* Selotip heterokromia kecil di atas */}
          <span
            aria-hidden="true"
            class="pointer-events-none absolute -top-2.5 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/50 bg-blush/70"
          />

          {/* Header kartu: 2 titik mata heterokromia merah & biru */}
          <div class="mb-2.5 flex items-center justify-between border-b border-dashed border-ink/25 pb-1.5 font-mono text-[10px]">
            <span class="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-ink">
              <span class="h-2 w-2 rounded-full border border-ink bg-tomato" aria-hidden="true" />
              <span class="h-2 w-2 rounded-full border border-ink bg-cobalt" aria-hidden="true" />
              <span>OCTAGRAM · 08</span>
            </span>
            <button
              type="button"
              onClick={() => setFlipped(true)}
              class="cursor-pointer rounded-sm border border-ink bg-paper-2 px-1.5 py-0.5 font-bold text-ink hover:bg-mustard"
              title={locale === 'id' ? 'Balik kartu untuk lihat statistik' : 'Flip card for stats'}
            >
              {locale === 'id' ? 'Balik ↻' : 'Flip ↻'}
            </button>
          </div>

          <div class="flex items-center gap-3">
            {/* Bingkai Arch Gotik Melengkung (klik untuk flip 3D) */}
            <button
              type="button"
              onClick={() => setFlipped(true)}
              class="group relative h-32 w-24 shrink-0 cursor-pointer overflow-hidden rounded-t-full rounded-b-sm border-2 border-ink bg-paper-2 shadow-[2px_2px_0_var(--ink)] focus:outline-none"
              aria-label={locale === 'id' ? 'Balik kartu Luminous Valentine' : 'Flip Luminous Valentine card'}
            >
              <img
                src="/images/luminous-valentine.jpg"
                alt="Luminous Valentine — Tensura"
                width="192"
                height="256"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                class="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-ink/40 to-transparent"
              />
            </button>

            {/* Info & Balon Dialog Interaktif */}
            <div class="flex min-w-0 flex-1 flex-col justify-between gap-2">
              <div>
                <p class="font-display text-sm font-extrabold leading-tight text-ink">
                  Luminous Valentine
                </p>
                <p class="font-mono text-[10px] text-ink-soft">Ruberios · Desk Guard</p>
              </div>

              <button
                type="button"
                onClick={nextQuote}
                title={locale === 'id' ? 'Klik untuk ganti dialog' : 'Click for next quote'}
                class="cursor-pointer rounded-sm border-2 border-ink bg-paper-2 p-2 text-left font-hand text-xs leading-snug text-ink shadow-[2px_2px_0_var(--ink)] transition-colors hover:bg-slime-soft"
              >
                &ldquo;{quotes[quoteIdx]}&rdquo;
              </button>

              <span class="font-mono text-[9.5px] text-ink-soft">
                {locale === 'id' ? 'klik dialog / balik kartu ↻' : 'tap quote / flip card ↻'}
              </span>
            </div>
          </div>
        </div>

        {/* ==================== SISI BELAKANG: Quick Stats Fungsional ==================== */}
        <div
          class={`flip-face flip-back flex flex-col justify-between rounded-md border-2 border-ink bg-paper-2 p-4 shadow-[4px_4px_0_var(--ink)] ${
            flipped ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <div class="flex items-center justify-between border-b-2 border-ink pb-2 font-mono text-[10px]">
            <span class="inline-flex items-center gap-1.5 font-bold uppercase text-ink">
              <span class="h-2 w-2 rounded-full border border-ink bg-tomato" aria-hidden="true" />
              <span class="h-2 w-2 rounded-full border border-ink bg-cobalt" aria-hidden="true" />
              <span>DESK STATS</span>
            </span>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              class="cursor-pointer rounded-sm border border-ink bg-paper px-1.5 py-0.5 font-bold text-ink hover:bg-mustard"
            >
              {locale === 'id' ? 'Depan ↻' : 'Front ↻'}
            </button>
          </div>

          <div class="my-2 grid grid-cols-3 gap-2 text-center">
            <div class="rounded-sm border-2 border-ink bg-paper p-2 shadow-[2px_2px_0_var(--ink)]">
              <div class="font-display text-lg font-extrabold text-tomato">{projectCount}</div>
              <div class="font-mono text-[9px] font-bold uppercase text-ink-soft">
                {locale === 'id' ? 'Proyek' : 'Projects'}
              </div>
            </div>
            <div class="rounded-sm border-2 border-ink bg-paper p-2 shadow-[2px_2px_0_var(--ink)]">
              <div class="font-display text-lg font-extrabold text-cobalt">{liveDemoCount}</div>
              <div class="font-mono text-[9px] font-bold uppercase text-ink-soft">Live</div>
            </div>
            <div class="rounded-sm border-2 border-ink bg-paper p-2 shadow-[2px_2px_0_var(--ink)]">
              <div class="font-display text-lg font-extrabold text-leaf">Rp0</div>
              <div class="font-mono text-[9px] font-bold uppercase text-ink-soft">Stack</div>
            </div>
          </div>

          <a
            href={projectsHref}
            class="sticker-btn bg-mustard text-ink w-full justify-center rounded-sm px-3 py-1.5 font-mono text-[11px] font-bold"
          >
            {locale === 'id' ? 'Buka Arsip Proyek →' : 'Open Project Archive →'}
          </a>
        </div>
      </div>
    </div>
  );
}
