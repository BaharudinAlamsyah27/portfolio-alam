import { useState } from 'preact/hooks';

interface PolaroidPhoto {
  src: string;
  tag: { id: string; en: string };
  title: { id: string; en: string };
  note: { id: string; en: string };
}

interface Props {
  locale?: 'id' | 'en';
}

const PHOTOS: PolaroidPhoto[] = [
  {
    src: '/images/polaroids/bromo.jpg',
    tag: { id: 'ALAM · GUNUNG', en: 'NATURE · MOUNTAIN' },
    title: { id: 'Pagi di Kawasan Bromo', en: 'Morning at Mount Bromo' },
    note: { id: 'Siluet kawah dan cahaya emas pagi.', en: 'Volcanic ridges in golden morning light.' },
  },
  {
    src: '/images/polaroids/shuttle.jpg',
    tag: { id: 'TEKNOLOGI · ROKET', en: 'TECH · LAUNCH' },
    title: { id: 'Peluncuran Space Shuttle', en: 'Space Shuttle Liftoff' },
    note: { id: 'Daya dorong dan presisi rekayasa.', en: 'Raw thrust and engineering precision.' },
  },
  {
    src: '/images/polaroids/architecture.jpg',
    tag: { id: 'BANGUNAN · ARSITEKTUR', en: 'BUILDING · ARCHITECTURE' },
    title: { id: 'One WTC & Oculus', en: 'One WTC & The Oculus' },
    note: { id: 'Garis struktur kaca dan baja modern.', en: 'Modern glass and steel geometry.' },
  },
  {
    src: '/images/polaroids/ocean.jpg',
    tag: { id: 'ALAM · LAUT', en: 'NATURE · OCEAN' },
    title: { id: 'Garis Ombak Samudra', en: 'Horizon & Ocean Waves' },
    note: { id: 'Biru tenang untuk jeda dari layar.', en: 'Calm blue horizon away from screens.' },
  },
  {
    src: '/images/polaroids/falcon-sunset.jpg',
    tag: { id: 'TEKNOLOGI · SENJA', en: 'TECH · DUSK' },
    title: { id: 'Falcon 9 Saat Senja', en: 'Falcon 9 at Sunset' },
    note: { id: 'Roket modern menembus langit senja.', en: 'Modern orbital launch at dusk.' },
  },
  {
    src: '/images/polaroids/milkyway.jpg',
    tag: { id: 'ALAM · ANTARIKSA', en: 'NATURE · NIGHT SKY' },
    title: { id: 'Bentangan Bimasakti', en: 'Milky Way Core' },
    note: { id: 'Langit malam jernih penuh bintang.', en: 'Clear night sky full of stars.' },
  },
  {
    src: '/images/polaroids/nebula.jpg',
    tag: { id: 'ANTARIKSA · KOSMOS', en: 'SPACE · COSMOS' },
    title: { id: 'Debu Bintang & Nebula', en: 'Stardust & Nebula' },
    note: { id: 'Mengingatkan betapa luasnya semesta.', en: 'A reminder of how vast the cosmos is.' },
  },
];

export default function PolaroidStack({ locale = 'id' }: Props) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % PHOTOS.length);
  const prev = () => setIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length);

  const current = PHOTOS[index];
  const nextOne = PHOTOS[(index + 1) % PHOTOS.length];
  const nextTwo = PHOTOS[(index + 2) % PHOTOS.length];

  return (
    <div class="mt-6 border-t-2 border-dashed border-ink/25 pt-5">
      <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 class="font-display text-lg font-bold text-ink">
            {locale === 'id' ? 'Koleksi Visual Favorit' : 'Curated Visual Board'}
          </h4>
          <p class="font-hand text-sm text-ink-soft">
            {locale === 'id'
              ? 'Foto alam, bangunan & teknologi yang saya suka (klik foto untuk mengganti)'
              : 'Nature, architecture & tech photography I admire (click to cycle)'}
          </p>
        </div>

        <div class="flex items-center gap-1.5 font-mono text-xs">
          <button
            type="button"
            onClick={prev}
            aria-label={locale === 'id' ? 'Foto sebelumnya' : 'Previous photo'}
            class="sticker-btn bg-paper-2 text-ink rounded-sm px-2.5 py-1 text-xs"
          >
            &larr;
          </button>
          <span class="rounded-sm border border-ink bg-paper-2 px-2 py-1 text-[11px] font-bold tabular-nums">
            {index + 1} / {PHOTOS.length}
          </span>
          <button
            type="button"
            onClick={next}
            aria-label={locale === 'id' ? 'Foto berikutnya' : 'Next photo'}
            class="sticker-btn bg-mustard text-ink rounded-sm px-2.5 py-1 text-xs"
          >
            {locale === 'id' ? 'Kocok' : 'Next'} &rarr;
          </button>
        </div>
      </div>

      {/* Tumpukan Kartu Polaroid */}
      <div class="relative mx-auto max-w-md py-2">
        {/* Kartu bayangan ke-3 */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-x-3 top-3 bottom-1 rotate-3 rounded-sm border-2 border-ink bg-paper-2 opacity-80 shadow-[3px_3px_0_var(--ink)] transition-transform duration-300"
        >
          <img src={nextTwo.src} alt="" loading="lazy" class="h-44 w-full object-cover opacity-35" />
        </div>

        {/* Kartu bayangan ke-2 */}
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-x-1.5 top-2 bottom-2 -rotate-2 rounded-sm border-2 border-ink bg-paper-2 opacity-90 shadow-[3px_3px_0_var(--ink)] transition-transform duration-300"
        >
          <img src={nextOne.src} alt="" loading="lazy" class="h-44 w-full object-cover opacity-50" />
        </div>

        {/* Kartu utama di depan */}
        <button
          type="button"
          onClick={next}
          class="group relative block w-full cursor-pointer rounded-sm border-2 border-ink bg-paper p-3 pb-4 text-left shadow-[5px_5px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none"
        >
          {/* Selotip kecil di atas polaroid */}
          <span
            aria-hidden="true"
            class="bg-mustard/85 absolute -top-2.5 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 border border-ink/60"
          />

          <div class="relative overflow-hidden rounded-[2px] border-2 border-ink bg-ink">
            <img
              src={current.src}
              alt={current.title[locale]}
              loading="lazy"
              class="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <span class="bg-ink/85 text-paper absolute top-2 left-2 rounded-sm border border-paper/40 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider">
              {current.tag[locale]}
            </span>
          </div>

          <div class="mt-3 flex items-baseline justify-between gap-2 px-0.5">
            <div>
              <p class="font-display text-base font-extrabold text-ink">{current.title[locale]}</p>
              <p class="font-hand text-sm text-ink-soft">{current.note[locale]}</p>
            </div>
            <span class="shrink-0 font-mono text-[10px] font-bold text-cobalt group-hover:underline">
              {locale === 'id' ? 'Klik lanjut →' : 'Tap next →'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
