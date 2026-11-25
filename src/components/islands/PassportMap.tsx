import { useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

interface MapPin {
  id: string;
  name: string;
  x: number;
  y: number;
  tag: { id: string; en: string };
  coords: string;
  note: { id: string; en: string };
  color: string;
}

const PINS: MapPin[] = [
  {
    id: 'brebes',
    name: 'Brebes',
    x: 118,
    y: 92,
    tag: { id: 'Kota Asal', en: 'Hometown' },
    coords: '6.87° S, 109.04° E',
    note: {
      id: 'Tanah kelahiran. Di sini rasa penasaran soal komputer dan pemrograman pertama kali dimulai.',
      en: 'Hometown. Where my curiosity about computers and programming first began.',
    },
    color: 'var(--cobalt)',
  },
  {
    id: 'semarang',
    name: 'Semarang',
    x: 248,
    y: 86,
    tag: { id: 'Kampus · UPGRIS', en: 'University · UPGRIS' },
    coords: '6.99° S, 110.42° E',
    note: {
      id: 'Menempuh kuliah Informatika di UPGRIS, belajar rekayasa web, dan menyusun skripsi SPK (SAW-ROC).',
      en: 'Studied Informatics at UPGRIS, focused on web engineering and decision support systems (SAW-ROC).',
    },
    color: 'var(--mustard)',
  },
  {
    id: 'sragen',
    name: 'Sragen',
    x: 344,
    y: 132,
    tag: { id: 'Domisili · MagangHub', en: 'Current Base · MagangHub' },
    coords: '7.43° S, 111.02° E',
    note: {
      id: 'Tempat bertugas saat ini di BPRS Sukowati Sragen. Menjelajah sudut kota tenang dan rute jogging pagi.',
      en: 'Current base at BPRS Sukowati Sragen. Exploring quiet streets and morning jog routes.',
    },
    color: 'var(--tomato)',
  },
];

export default function PassportMap({ locale }: Props) {
  const [activeId, setActiveId] = useState<string>('sragen');
  const active = PINS.find((p) => p.id === activeId) ?? PINS[2];
  const isEn = locale === 'en';

  return (
    <div class="mt-6 rounded-sm border-2 border-ink bg-paper-2 p-4 shadow-[3px_3px_0_var(--ink)]">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <span class="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-soft">
            {isEn ? 'HAND-DRAWN ROUTE · CENTRAL JAVA' : 'PETA SKETSA · JAWA TENGAH'}
          </span>
          <h4 class="font-display text-base font-extrabold text-ink">
            {isEn ? 'Jejak Langkah di Peta' : 'Jejak Langkah di Peta'}
          </h4>
        </div>
        <span class="font-hand text-sm text-cobalt">
          {isEn ? 'click a pin ✎' : 'klik pin kota ✎'}
        </span>
      </div>

      {/* Peta Garis Tangan SVG (0 KB library eksternal) */}
      <div class="relative overflow-hidden rounded-sm border-2 border-dashed border-ink/40 bg-paper p-2">
        <svg
          viewBox="0 0 460 210"
          class="h-auto w-full select-none"
          role="img"
          aria-label={
            isEn
              ? 'Hand-drawn map of Central Java showing Brebes, Semarang, and Sragen'
              : 'Peta sketsa Jawa Tengah menampilkan Brebes, Semarang, dan Sragen'
          }
        >
          {/* Garis koordinat tipis ala peta lama */}
          <g stroke="var(--ink)" stroke-opacity="0.09" stroke-width="1" stroke-dasharray="3 4">
            <line x1="0" y1="52" x2="460" y2="52" />
            <line x1="0" y1="105" x2="460" y2="105" />
            <line x1="0" y1="158" x2="460" y2="158" />
            <line x1="115" y1="0" x2="115" y2="210" />
            <line x1="230" y1="0" x2="230" y2="210" />
            <line x1="345" y1="0" x2="345" y2="210" />
          </g>

          {/* Siluet Pulau Jawa Tengah sketsa tangan */}
          <path
            d="M 38 82 Q 86 72 135 84 Q 188 88 232 76 Q 272 60 306 72 Q 352 84 416 98 L 430 156 Q 382 174 334 166 Q 282 176 236 164 Q 186 154 132 162 Q 78 158 32 138 Z"
            fill="var(--paper-2)"
            stroke="var(--ink)"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          {/* Label Laut */}
          <text
            x="230"
            y="34"
            text-anchor="middle"
            font-family="var(--font-mono)"
            font-size="9"
            fill="var(--ink-soft)"
            opacity="0.7"
            letter-spacing="2"
          >
            LAUT JAWA
          </text>
          <text
            x="230"
            y="196"
            text-anchor="middle"
            font-family="var(--font-mono)"
            font-size="9"
            fill="var(--ink-soft)"
            opacity="0.7"
            letter-spacing="2"
          >
            SAMUDRA HINDIA
          </text>

          {/* Kompas kecil pojok kanan atas */}
          <g transform="translate(418, 34)" stroke="var(--ink)" stroke-width="1.4" fill="none">
            <circle cx="0" cy="0" r="14" stroke-dasharray="2 2" opacity="0.6" />
            <path d="M 0 -11 L 3 0 L 0 11 L -3 0 Z" fill="var(--tomato)" fill-opacity="0.25" />
            <text
              x="0"
              y="-17"
              text-anchor="middle"
              font-family="var(--font-mono)"
              font-size="8"
              font-weight="700"
              fill="var(--ink)"
              stroke="none"
            >
              U
            </text>
          </g>

          {/* Garis rute perjalanan putus-putus */}
          <path
            d="M 118 92 Q 185 68 248 86 T 344 132"
            fill="none"
            stroke="var(--tomato)"
            stroke-width="2"
            stroke-dasharray="5 5"
            stroke-linecap="round"
          />

          {/* Pin Kota Interaktif */}
          {PINS.map((pin) => {
            const isSelected = pin.id === active.id;
            return (
              <g
                key={pin.id}
                transform={`translate(${pin.x}, ${pin.y})`}
                class="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${pin.name} — ${pin.tag[locale]}`}
                aria-pressed={isSelected}
                onClick={() => setActiveId(pin.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(pin.id);
                  }
                }}
              >
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="15"
                    fill={pin.color}
                    fill-opacity="0.22"
                    stroke={pin.color}
                    stroke-width="1.5"
                    stroke-dasharray="3 2"
                  />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? 8 : 6}
                  fill={pin.color}
                  stroke="var(--ink)"
                  stroke-width="2"
                />
                <text
                  x="0"
                  y={pin.id === 'sragen' ? 24 : -13}
                  text-anchor="middle"
                  font-family="var(--font-mono)"
                  font-size="11"
                  font-weight="800"
                  fill="var(--ink)"
                >
                  {pin.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Kartu Info Kota Terpilih */}
      <div class="mt-3 flex flex-col justify-between gap-2 rounded-sm border-2 border-ink bg-paper p-3 sm:flex-row sm:items-center">
        <div class="space-y-0.5">
          <div class="flex flex-wrap items-center gap-2">
            <strong class="font-display text-sm font-extrabold text-ink">{active.name}</strong>
            <span class="bg-mustard text-ink rounded-sm border border-ink px-1.5 py-0.2 font-mono text-[10px] font-bold">
              {active.tag[locale]}
            </span>
            <span class="font-mono text-[10px] text-ink-soft">{active.coords}</span>
          </div>
          <p class="text-xs leading-relaxed text-ink-soft">{active.note[locale]}</p>
        </div>

        <div class="flex shrink-0 gap-1.5">
          {PINS.map((pin) => (
            <button
              key={pin.id}
              type="button"
              onClick={() => setActiveId(pin.id)}
              class={`rounded-sm border border-ink px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
                pin.id === active.id
                  ? 'bg-ink text-paper'
                  : 'bg-paper-2 text-ink hover:bg-mustard/40'
              }`}
            >
              {pin.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
