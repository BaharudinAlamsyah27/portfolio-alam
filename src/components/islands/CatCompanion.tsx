import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

const STORAGE_KEY = 'alam_cat_companion';
const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

type CatState = 'running' | 'sitting' | 'sleeping';

interface RainSticker {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  symbol: string;
}

const STICKER_COLORS = ['bg-tomato text-paper', 'bg-mustard text-ink', 'bg-blush text-ink', 'bg-cobalt text-paper'];
const STICKER_SYMBOLS = ['🐈', '🐾', 'meong!', 'zZz', '(=^･ω･^=)'];

export default function CatCompanion({ locale }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [catState, setCatState] = useState<CatState>('sitting');
  const [facingLeft, setFacingLeft] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [rainItems, setRainItems] = useState<RainSticker[]>([]);

  const catElRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 140, y: 140 });
  const posRef = useRef({ x: 140, y: 140 });
  const lastMoveRef = useRef(Date.now());
  const konamiIdxRef = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    setHasFinePointer(fine);

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'on') setEnabled(!reduced);
      else if (saved === 'off') setEnabled(false);
      else setEnabled(fine && !reduced);
    } catch {
      setEnabled(fine && !reduced);
    }
  }, []);

  const toggleCat = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        // abaikan jika localStorage diblokir
      }
      return next;
    });
  };

  const triggerKonami = () => {
    const items: RainSticker[] = Array.from({ length: 24 }, (_, idx) => ({
      id: idx,
      left: Math.round((idx * 4.1 + Math.random() * 4) % 96),
      delay: Math.random() * 0.9,
      duration: 2.2 + Math.random() * 1.6,
      color: STICKER_COLORS[idx % STICKER_COLORS.length],
      symbol: STICKER_SYMBOLS[idx % STICKER_SYMBOLS.length],
    }));
    setRainItems(items);
    setKonamiActive(true);
    setTimeout(() => {
      setKonamiActive(false);
      setRainItems([]);
    }, 4500);
  };

  // Konami code listener global
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === KONAMI[konamiIdxRef.current]) {
        konamiIdxRef.current += 1;
        if (konamiIdxRef.current === KONAMI.length) {
          konamiIdxRef.current = 0;
          triggerKonami();
        }
      } else {
        konamiIdxRef.current = key === KONAMI[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Pelacakan kursor & animasi kucing
  useEffect(() => {
    if (!enabled || !hasFinePointer) return;

    const onPointerMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX + 18, y: e.clientY + 18 };
      lastMoveRef.current = Date.now();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    let rafId = 0;
    const tick = () => {
      const dx = targetRef.current.x - posRef.current.x;
      const dy = targetRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (Math.abs(dx) > 2) {
        setFacingLeft(dx < 0);
      }

      if (dist > 3) {
        posRef.current.x += dx * 0.1;
        posRef.current.y += dy * 0.1;
      }

      if (catElRef.current) {
        catElRef.current.style.transform = `translate3d(${posRef.current.x.toFixed(1)}px, ${posRef.current.y.toFixed(1)}px, 0)`;
      }

      const idleMs = Date.now() - lastMoveRef.current;
      if (dist > 24) {
        setCatState('running');
      } else if (idleMs > 3000) {
        setCatState('sleeping');
      } else {
        setCatState('sitting');
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [enabled, hasFinePointer]);

  return (
    <div class="contents">
      {/* Tombol kontrol kucing di pojok kanan bawah */}
      {hasFinePointer && (
        <button
          type="button"
          onClick={toggleCat}
          aria-pressed={enabled}
          class="sticker-btn bg-paper text-ink fixed right-4 bottom-4 z-40 rounded-sm px-3 py-1.5 font-mono text-xs"
          title={
            locale === 'id'
              ? 'Nyalakan atau istirahatkan kucing pengikut kursor'
              : 'Toggle cursor companion cat'
          }
        >
          <span>{enabled ? '🐈' : '💤'}</span>
          <span>
            {locale === 'id'
              ? enabled
                ? 'Kucing: ON'
                : 'Kucing: OFF'
              : enabled
                ? 'Cat: ON'
                : 'Cat: OFF'}
          </span>
        </button>
      )}

      {/* Sprite Kucing SVG Piksel */}
      {enabled && hasFinePointer && (
        <div
          ref={catElRef}
          aria-hidden="true"
          class="pointer-events-none fixed top-0 left-0 z-50 will-change-transform"
        >
          <div class="relative flex flex-col items-center">
            {catState === 'sleeping' && (
              <span class="font-hand text-cobalt -mb-1 animate-bounce text-xs font-bold">
                zZz
              </span>
            )}
            <svg
              width="34"
              height="28"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                transform: facingLeft ? 'scaleX(-1)' : 'scaleX(1)',
                imageRendering: 'pixelated',
              }}
            >
              {/* Ekor */}
              <rect
                x={catState === 'running' ? '0' : '1'}
                y={catState === 'sleeping' ? '9' : '5'}
                width="3"
                height="2"
                fill="#1F1B16"
              />
              {/* Badan */}
              <rect x="3" y="6" width="9" height="5" fill="#1F1B16" />
              {/* Kepala */}
              <rect x="10" y="2" width="6" height="6" fill="#1F1B16" />
              {/* Telinga */}
              <rect x="10" y="0" width="2" height="2" fill="#1F1B16" />
              <rect x="14" y="0" width="2" height="2" fill="#1F1B16" />
              <rect x="11" y="1" width="1" height="1" fill="#FF8FB1" />
              <rect x="14" y="1" width="1" height="1" fill="#FF8FB1" />
              {/* Mata */}
              {catState === 'sleeping' ? (
                <rect x="13" y="4" width="2" height="1" fill="#F5B700" />
              ) : (
                <>
                  <rect x="12" y="4" width="1" height="1" fill="#F5B700" />
                  <rect x="14" y="4" width="1" height="1" fill="#F5B700" />
                </>
              )}
              {/* Kaki */}
              <rect
                x={catState === 'running' ? '3' : '4'}
                y="11"
                width="2"
                height={catState === 'sleeping' ? '1' : '3'}
                fill="#1F1B16"
              />
              <rect
                x={catState === 'running' ? '10' : '9'}
                y="11"
                width="2"
                height={catState === 'sleeping' ? '1' : '3'}
                fill="#1F1B16"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Hujan Stiker Konami Code */}
      {konamiActive && (
        <div
          aria-live="polite"
          class="pointer-events-none fixed inset-0 z-50 overflow-hidden"
        >
          <div class="bg-mustard text-ink mx-auto mt-16 max-w-md border-2 border-ink px-4 py-2.5 text-center font-mono text-xs font-bold shadow-[4px_4px_0_var(--ink)]">
            {locale === 'id'
              ? '🎮 Konami Code aktif! Kucing meja kerja mengambil alih layar!'
              : '🎮 Konami Code activated! The desk cat is taking over!'}
          </div>

          {rainItems.map((item) => (
            <span
              key={item.id}
              class={`absolute -top-10 rounded-sm border-2 border-ink px-2 py-1 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)] ${item.color}`}
              style={{
                left: `${item.left}%`,
                animation: `catRain ${item.duration}s linear ${item.delay}s forwards`,
              }}
            >
              {item.symbol}
            </span>
          ))}

          <style>{`
            @keyframes catRain {
              0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
              100% { transform: translateY(105vh) rotate(24deg); opacity: 0.2; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
