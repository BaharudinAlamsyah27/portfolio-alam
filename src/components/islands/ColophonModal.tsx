import { useEffect, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

const SWATCHES = [
  { token: '--paper', hex: '#FFF8EC', label: 'Paper' },
  { token: '--paper-2', hex: '#F6EBD6', label: 'Paper 2' },
  { token: '--ink', hex: '#1F1B16', label: 'Ink' },
  { token: '--tomato', hex: '#F2542D', label: 'Tomato' },
  { token: '--cobalt', hex: '#2D5BFF', label: 'Cobalt' },
  { token: '--mustard', hex: '#F5B700', label: 'Mustard' },
  { token: '--leaf', hex: '#2BA84A', label: 'Leaf' },
  { token: '--blush', hex: '#FF8FB1', label: 'Blush' },
];

export default function ColophonModal({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const isEn = locale === 'en';

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      // abaikan
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        class="text-ink hover:text-tomato cursor-pointer underline decoration-dashed underline-offset-4 transition-colors"
      >
        {isEn ? 'Behind this desk ↗' : 'Di balik meja ini ↗'}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="colophon-title"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div class="sticker-card relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-md bg-paper p-5 text-left text-ink sm:p-6">
            <div class="flex items-start justify-between gap-3 border-b-2 border-ink pb-3">
              <div>
                <span class="bg-mustard text-ink inline-block rounded-sm border border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase">
                  COLOPHON · /USES
                </span>
                <h2 id="colophon-title" class="font-display mt-1 text-2xl font-extrabold">
                  {isEn ? 'Behind This Desk' : 'Di Balik Meja Ini'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={isEn ? 'Close modal' : 'Tutup jendela'}
                class="sticker-btn bg-paper-2 text-ink rounded-sm px-2.5 py-1 font-mono text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div class="mt-4 space-y-5 text-xs leading-relaxed sm:text-sm">
              <p class="text-ink-soft">
                {isEn
                  ? 'Built with a simple principle: warm like a real work desk, fast to load, zero paid hosting, and full of small details you only notice when you look closely.'
                  : 'Dibuat dengan prinsip sederhana: terasa hangat seperti meja kerja sungguhan, cepat dibuka, biaya Rp0, dan punya detail kecil yang baru terasa saat dieksplor.'}
              </p>

              {/* Palet Warna Interaktif */}
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <h3 class="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    {isEn ? 'Color Palette (click to copy hex)' : 'Palet Warna (klik untuk salin hex)'}
                  </h3>
                  {copiedHex && (
                    <span class="bg-leaf text-paper rounded-sm border border-ink px-1.5 py-0.5 font-mono text-[10px] font-bold">
                      ✓ {copiedHex}
                    </span>
                  )}
                </div>

                <div class="grid grid-cols-4 gap-2">
                  {SWATCHES.map((sw) => (
                    <button
                      key={sw.token}
                      type="button"
                      onClick={() => copyColor(sw.hex)}
                      class="group flex flex-col items-start rounded-sm border-2 border-ink bg-paper-2 p-1.5 text-left transition-transform hover:-translate-y-0.5"
                      title={`Copy ${sw.hex}`}
                    >
                      <span
                        class="mb-1.5 block h-7 w-full rounded-xs border border-ink"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <span class="font-mono text-[10px] font-bold text-ink">{sw.label}</span>
                      <span class="font-mono text-[9px] text-ink-soft">{sw.hex}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipografi & Stack */}
              <dl class="grid gap-3 rounded-sm border-2 border-dashed border-ink/30 bg-paper-2 p-3.5 font-mono text-xs sm:grid-cols-2">
                <div>
                  <dt class="text-[10px] font-bold uppercase text-ink-soft">
                    {isEn ? 'Typography' : 'Tipografi'}
                  </dt>
                  <dd class="mt-1 text-ink">
                    Bricolage Grotesque, Instrument Sans, Kalam, JetBrains Mono (self-hosted).
                  </dd>
                </div>
                <div>
                  <dt class="text-[10px] font-bold uppercase text-ink-soft">
                    {isEn ? 'Engine & Cost' : 'Mesin & Biaya'}
                  </dt>
                  <dd class="mt-1 text-ink">
                    Astro 7 + Preact + Tailwind v4 + Keystatic (local) · Rp0 di Vercel.
                  </dd>
                </div>
                <div>
                  <dt class="text-[10px] font-bold uppercase text-ink-soft">
                    {isEn ? 'Daily Setup' : 'Alat Kerja Harian'}
                  </dt>
                  <dd class="mt-1 text-ink">VS Code, Windows Terminal, Git, browser DevTools.</dd>
                </div>
                <div>
                  <dt class="text-[10px] font-bold uppercase text-ink-soft">
                    {isEn ? 'Hidden Shortcuts' : 'Pintasan Tersembunyi'}
                  </dt>
                  <dd class="mt-1 text-ink">
                    <kbd class="rounded border border-ink bg-paper px-1">Ctrl+K</kbd> Terminal ·{' '}
                    <kbd class="rounded border border-ink bg-paper px-1">↑↑↓↓←→←→BA</kbd>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
