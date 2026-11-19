import { useState } from 'preact/hooks';

interface Props {
  locale?: 'id' | 'en';
}

const LINES_ID = [
  'bukan slime jahat kok.',
  '[Great Sage]: build aman, 0 error!',
  'slurp~ ngopi dulu sebelum debug.',
  'Jura Tempest Desk · mode santai.',
  'Predator: melahap bug produksi...',
];

const LINES_EN = [
  'not a bad slime, slurp!',
  '[Great Sage]: build green, 0 errors!',
  'slurp~ coffee first, debug later.',
  'Jura Tempest Desk · chill mode.',
  'Predator: absorbing production bugs...',
];

export default function RimuruSticker({ locale = 'id' }: Props) {
  const lines = locale === 'en' ? LINES_EN : LINES_ID;
  const [idx, setIdx] = useState(0);
  const [squished, setSquished] = useState(false);

  const handleClick = () => {
    setIdx((prev) => (prev + 1) % lines.length);
    setSquished(true);
    window.setTimeout(() => setSquished(false), 220);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={locale === 'id' ? 'Klik Rimuru!' : 'Poke Rimuru!'}
      aria-label={locale === 'id' ? 'Stiker Rimuru Slime interaktif' : 'Interactive Rimuru Slime sticker'}
      class="bg-slime-soft text-ink group inline-flex cursor-pointer rotate-2 items-center gap-2 rounded-md border-2 border-ink px-3 py-2 text-left shadow-[3px_3px_0_var(--ink)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
    >
      <svg
        viewBox="0 0 88 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class={`h-8 w-11 shrink-0 select-none transition-transform duration-200 ${
          squished ? 'scale-x-115 scale-y-85' : 'group-hover:scale-105'
        }`}
        aria-hidden="true"
      >
        <ellipse cx="44" cy="55" rx="31" ry="4.5" fill="var(--slime-deep)" fill-opacity="0.2" />
        <path
          d="M11 45C11 26 24 12 44 12C64 12 77 26 77 45C77 52.5 65 55 44 55C23 55 11 52.5 11 45Z"
          fill="var(--slime)"
          stroke="var(--ink)"
          stroke-width="2.6"
          stroke-linejoin="round"
        />
        <path
          d="M14.5 46.5C19 52 69 52 73.5 46.5C71 51.5 60 53.5 44 53.5C28 53.5 17 51.5 14.5 46.5Z"
          fill="var(--slime-deep)"
          fill-opacity="0.4"
        />
        <ellipse
          cx="29"
          cy="24"
          rx="7.5"
          ry="4"
          transform="rotate(-24 29 24)"
          fill="var(--paper)"
          fill-opacity="0.82"
        />
        <circle cx="21.5" cy="31" r="2.2" fill="var(--paper)" fill-opacity="0.82" />
        <path
          d={squished ? 'M30 38.5H37.5' : 'M30 37.5C32 35.8 35.5 35.8 37.5 37.5'}
          stroke="var(--ink)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <path
          d={squished ? 'M50.5 38.5H58' : 'M50.5 37.5C52.5 35.8 56 35.8 58 37.5'}
          stroke="var(--ink)"
          stroke-width="2.6"
          stroke-linecap="round"
        />
        <ellipse cx="26.5" cy="41.5" rx="3.5" ry="1.8" fill="var(--blush)" fill-opacity="0.7" />
        <ellipse cx="61.5" cy="41.5" rx="3.5" ry="1.8" fill="var(--blush)" fill-opacity="0.7" />
        <circle cx="81.5" cy="34" r="2.4" fill="var(--slime)" stroke="var(--ink)" stroke-width="1.6" />
      </svg>

      <span class="font-hand text-sm leading-tight text-slime-deep">{lines[idx]}</span>
    </button>
  );
}
