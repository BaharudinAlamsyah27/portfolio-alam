import { useState } from 'preact/hooks';

interface Props {
  locale?: 'id' | 'en';
}

type StickerId = 'lfc' | 'bike' | 'wayang' | 'rimuru';

const STICKERS: {
  id: StickerId;
  label: string;
  bg: string;
  tilt: string;
  noteId: string;
  noteEn: string;
}[] = [
  {
    id: 'lfc',
    label: 'YNWA · LFC',
    bg: 'bg-tomato text-paper',
    tilt: '-rotate-2',
    noteId: 'You’ll Never Walk Alone! Penggemar Liverpool & penikmat sepak bola.',
    noteEn: 'You’ll Never Walk Alone! Liverpool FC supporter & football fan.',
  },
  {
    id: 'bike',
    label: 'Gowes',
    bg: 'bg-slime-soft text-ink',
    tilt: 'rotate-1',
    noteId: 'Kring! Suka sepedaan santai & jogging buat jaga pikiran tetap segar.',
    noteEn: 'Ring-ring! Enjoy casual cycling & jogging to keep the mind fresh.',
  },
  {
    id: 'wayang',
    label: 'Batik & Wayang',
    bg: 'bg-mustard/60 text-ink',
    tilt: '-rotate-1',
    noteId: 'Akar budaya Jawa Tengah (Brebes ↔ Sragen) — tradisi ketemu teknologi.',
    noteEn: 'Central Java roots (Brebes ↔ Sragen) — tradition meets technology.',
  },
  {
    id: 'rimuru',
    label: 'Tensura',
    bg: 'bg-slime text-ink',
    tilt: 'rotate-2',
    noteId: '[Great Sage]: Rimuru Tempest approved — kerja rapi, hidup tetap santai.',
    noteEn: '[Great Sage]: Rimuru Tempest approved — neat code, chill life.',
  },
];

export default function HobbyStickers({ locale = 'id' }: Props) {
  const [active, setActive] = useState<StickerId | null>(null);
  const [pulseId, setPulseId] = useState<StickerId | null>(null);

  const handleSelect = (id: StickerId) => {
    setActive((prev) => (prev === id ? null : id));
    setPulseId(id);
    window.setTimeout(() => setPulseId(null), 260);
  };

  const activeItem = STICKERS.find((s) => s.id === active);

  return (
    <div class="border-t-2 border-dashed border-ink/25 pt-4">
      <div class="flex items-center justify-between gap-2">
        <span class="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-soft">
          {locale === 'id' ? 'Stiker Minat & Hobi (klik!)' : 'Hobby Stickers (click!)'}
        </span>
        <span class="font-hand text-xs text-cobalt">
          {locale === 'id' ? 'biar nggak kaku' : 'just for fun'}
        </span>
      </div>

      <div class="mt-3 flex flex-wrap items-center gap-2.5">
        {STICKERS.map((item) => {
          const isSelected = active === item.id;
          const isPulsing = pulseId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              aria-pressed={isSelected}
              class={`inline-flex cursor-pointer items-center gap-1.5 rounded-sm border-2 border-ink px-2.5 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)] transition-transform duration-150 hover:-translate-y-0.5 ${item.bg} ${item.tilt} ${
                isSelected ? 'ring-2 ring-ink ring-offset-1' : ''
              } ${isPulsing ? 'scale-105' : ''}`}
            >
              {item.id === 'lfc' && (
                <svg viewBox="0 0 20 20" class="h-4 w-4 shrink-0" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.6" />
                  <polygon points="10,6 13.5,8.5 12.2,12.5 7.8,12.5 6.5,8.5" fill="var(--ink)" />
                  <path d="M10 2V6M17.5 7.5L13.5 8.5M14.8 16.2L12.2 12.5M5.2 16.2L7.8 12.5M2.5 7.5L6.5 8.5" stroke="var(--ink)" stroke-width="1.2" />
                </svg>
              )}

              {item.id === 'bike' && (
                <svg viewBox="0 0 24 18" class="h-4 w-5 shrink-0" fill="none" aria-hidden="true">
                  <circle cx="5.5" cy="12.5" r="3.8" stroke="var(--ink)" stroke-width="1.7" />
                  <circle cx="18.5" cy="12.5" r="3.8" stroke="var(--ink)" stroke-width="1.7" />
                  <path d="M5.5 12.5L10.5 6H15.5L18.5 12.5M10.5 6L12 12.5H5.5M15.5 6L16.5 3.5H19M8.8 4H12" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}

              {item.id === 'wayang' && (
                <svg viewBox="0 0 18 22" class="h-4 w-3.5 shrink-0" fill="none" aria-hidden="true">
                  <path d="M9 1.5C12.5 6 15.5 10.5 16 16C16 17.8 14.5 19 12.5 19H5.5C3.5 19 2 17.8 2 16C2.5 10.5 5.5 6 9 1.5Z" fill="var(--paper)" stroke="var(--ink)" stroke-width="1.5" />
                  <path d="M9 5V21" stroke="var(--ink)" stroke-width="1.4" stroke-linecap="round" />
                </svg>
              )}

              {item.id === 'rimuru' && (
                <svg viewBox="0 0 24 18" class="h-3.5 w-4.5 shrink-0" fill="none" aria-hidden="true">
                  <path d="M2 13.5C2 7 6 2.5 12 2.5C18 2.5 22 7 22 13.5C22 15.8 18.5 16.5 12 16.5C5.5 16.5 2 15.8 2 13.5Z" fill="var(--paper)" fill-opacity="0.35" stroke="var(--ink)" stroke-width="1.6" />
                  <path d="M8 10.5H10.2M13.8 10.5H16" stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              )}

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {activeItem && (
        <p class="mt-3 rounded-sm border-2 border-ink bg-paper-2 px-3 py-2 font-hand text-sm text-ink shadow-[2px_2px_0_var(--ink)]">
          ↳ {locale === 'en' ? activeItem.noteEn : activeItem.noteId}
        </p>
      )}
    </div>
  );
}
