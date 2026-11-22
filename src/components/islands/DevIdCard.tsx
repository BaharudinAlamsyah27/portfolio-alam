import { useState } from 'preact/hooks';

interface Props {
  locale?: 'id' | 'en';
}

export default function DevIdCard({ locale = 'id' }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div class="flip-scene">
      <div class={`flip-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* SISI DEPAN: Kartu Identitas Developer */}
        <div
          class={`flip-face rounded-xl border-2 border-ink bg-paper p-5 shadow-[4px_4px_0_var(--ink)] ${
            flipped ? 'pointer-events-none' : ''
          }`}
        >
          <div class="flex items-center justify-between gap-2 border-b-2 border-dashed border-ink/25 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="h-2.5 w-2.5 rounded-full border border-ink bg-leaf" aria-hidden="true" />
              <span class="font-mono text-[11px] font-extrabold tracking-wider uppercase text-ink">
                DEV ID · 027-ALAM
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFlipped(true)}
              class="rounded-sm border border-ink bg-mustard px-2 py-0.5 font-mono text-[10px] font-bold text-ink shadow-[1px_1px_0_var(--ink)] hover:bg-tomato hover:text-paper"
            >
              {locale === 'id' ? 'Info & Fakta ↻' : 'Quick Facts ↻'}
            </button>
          </div>

          <div class="mt-3.5 grid grid-cols-1 gap-2 font-mono text-xs">
            <div class="flex items-center justify-between border-b border-ink/10 pb-1.5">
              <span class="text-ink-soft">{locale === 'id' ? 'Nama' : 'Name'}</span>
              <span class="font-bold text-ink">Baharudin Alamsyah</span>
            </div>
            <div class="flex items-center justify-between border-b border-ink/10 pb-1.5">
              <span class="text-ink-soft">{locale === 'id' ? 'Lulusan' : 'Degree'}</span>
              <span class="font-bold text-cobalt">S1 Informatika · UPGRIS</span>
            </div>
            <div class="flex items-center justify-between border-b border-ink/10 pb-1.5">
              <span class="text-ink-soft">{locale === 'id' ? 'Rute' : 'Origin'}</span>
              <span class="font-bold text-ink">Brebes → Sragen</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-ink-soft">{locale === 'id' ? 'Aktif' : 'Current'}</span>
              <span class="rounded-sm border border-ink bg-leaf/20 px-1.5 py-0.5 text-[10px] font-bold text-ink">
                MagangHub @ BPRS
              </span>
            </div>
          </div>
        </div>

        {/* SISI BELAKANG: Fakta Singkat & Ketertarikan */}
        <div
          class={`flip-face flip-back flex flex-col justify-between rounded-xl border-2 border-ink bg-paper-2 p-5 shadow-[4px_4px_0_var(--ink)] ${
            flipped ? '' : 'pointer-events-none'
          }`}
        >
          <div class="flex items-center justify-between gap-2 border-b-2 border-dashed border-ink/25 pb-2.5">
            <span class="font-mono text-[11px] font-extrabold tracking-wider uppercase text-tomato">
              {locale === 'id' ? 'CATATAN BELAKANG KARTU' : 'CARD BACK · NOTES'}
            </span>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              class="rounded-sm border border-ink bg-paper px-2 py-0.5 font-mono text-[10px] font-bold text-ink shadow-[1px_1px_0_var(--ink)] hover:bg-mustard"
            >
              {locale === 'id' ? 'Depan ↻' : 'Front ↻'}
            </button>
          </div>

          <ul class="mt-3 space-y-1.5 text-xs text-ink">
            <li>
              <span class="font-mono font-bold text-cobalt">Skripsi:</span>{' '}
              {locale === 'id' ? 'SPK SAW + optimasi bobot ROC' : 'DSS SAW + ROC weight optimization'}
            </li>
            <li>
              <span class="font-mono font-bold text-tomato">Stack:</span> Laravel, Astro, TypeScript, Tailwind
            </li>
            <li>
              <span class="font-mono font-bold text-leaf">Minat:</span>{' '}
              {locale === 'id' ? 'Kucing, lari pagi, foto alam & teknologi' : 'Cats, jogging, nature & tech photos'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
