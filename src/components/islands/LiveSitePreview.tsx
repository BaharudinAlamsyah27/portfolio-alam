import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  url: string;
  title: string;
  variant?: 'card' | 'full';
  locale?: 'id' | 'en';
  embed?: boolean;
  previewImage?: string;
}

function getHostname(rawUrl: string): string {
  try {
    return new URL(rawUrl).host;
  } catch {
    return rawUrl;
  }
}

export default function LiveSitePreview({
  url,
  title,
  variant = 'full',
  locale = 'id',
  embed = true,
  previewImage = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);
  const [loaded, setLoaded] = useState(false);
  const [interactive, setInteractive] = useState(variant === 'full');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [reloadKey, setReloadKey] = useState(0);

  const host = getHostname(url);

  useEffect(() => {
    if (variant !== 'card') return;
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(width / 1280);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [variant]);

  const handleReload = () => {
    setLoaded(false);
    setReloadKey((k) => k + 1);
  };

  if (variant === 'card') {
    return (
      <div class="overflow-hidden rounded-sm border-2 border-ink bg-paper-2 shadow-[3px_3px_0_var(--ink)]">
        {/* Browser Chrome Bar */}
        <div class="flex items-center justify-between gap-2 border-b-2 border-ink bg-paper-2 px-2.5 py-1.5">
          <div class="flex items-center gap-1.5" aria-hidden="true">
            <span class="h-2.5 w-2.5 rounded-full border border-ink bg-tomato" />
            <span class="h-2.5 w-2.5 rounded-full border border-ink bg-mustard" />
            <span class="h-2.5 w-2.5 rounded-full border border-ink bg-leaf" />
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class="min-w-0 flex-1 truncate rounded-sm border border-ink/40 bg-paper px-2 py-0.5 text-center font-mono text-[10px] text-ink-soft hover:text-cobalt"
            title={url}
          >
            {host}
          </a>

          <span class="flex shrink-0 items-center gap-1 rounded-sm border border-ink bg-leaf/20 px-1.5 py-0.5 font-mono text-[10px] font-bold text-ink">
            <span class="h-1.5 w-1.5 rounded-full bg-leaf" aria-hidden="true" />
            LIVE
          </span>
        </div>

        {/* Scaled Live Preview Frame or Static OG Preview (when X-Frame-Options: DENY) */}
        {!embed ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class="group relative block aspect-[16/10] w-full overflow-hidden bg-paper"
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt={`Preview ${title}`}
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div class="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-paper-2 p-4 text-center font-mono text-xs text-ink-soft">
                <span class="font-bold text-ink">{host}</span>
                <span>{locale === 'id' ? 'Klik untuk membuka live demo ↗' : 'Click to open live demo ↗'}</span>
              </div>
            )}
            <span class="absolute right-2 bottom-2 rounded-sm border-2 border-ink bg-mustard px-2 py-1 font-mono text-[10px] font-bold text-ink shadow-[2px_2px_0_var(--ink)] group-hover:bg-tomato group-hover:text-paper">
              {locale === 'id' ? 'Buka Live ↗' : 'Open Live ↗'}
            </span>
          </a>
        ) : (
          <div
            ref={containerRef}
            class="relative aspect-[16/10] w-full overflow-hidden bg-paper"
          >
            {!loaded && (
              <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-paper-2/90 p-4 text-center">
                <span class="font-mono text-xs font-bold text-ink">
                  {locale === 'id' ? 'Memuat tampilan live website...' : 'Loading live website preview...'}
                </span>
                <span class="font-mono text-[11px] text-ink-soft">{host}</span>
              </div>
            )}

            <iframe
              key={reloadKey}
              src={url}
              title={`Preview ${title}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
              referrerPolicy="no-referrer-when-downgrade"
              class={`absolute top-0 left-0 h-[800px] w-[1280px] border-0 bg-paper ${
                interactive ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
              }}
            />

            {/* Interactive Toggle Overlay */}
            <div class="pointer-events-none absolute right-2 bottom-2 z-20 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setInteractive((v) => !v)}
                class={`pointer-events-auto rounded-sm border-2 border-ink px-2 py-1 font-mono text-[10px] font-bold shadow-[2px_2px_0_var(--ink)] transition-transform active:translate-y-0.5 ${
                  interactive ? 'bg-tomato text-paper' : 'bg-paper text-ink hover:bg-mustard'
                }`}
              >
                {interactive
                  ? locale === 'id'
                    ? 'Kunci Scroll'
                    : 'Lock Scroll'
                  : locale === 'id'
                    ? 'Coba Klik'
                    : 'Interact'}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                class="pointer-events-auto rounded-sm border-2 border-ink bg-mustard px-2 py-1 font-mono text-[10px] font-bold text-ink shadow-[2px_2px_0_var(--ink)] hover:bg-tomato hover:text-paper"
              >
                {locale === 'id' ? 'Buka ↗' : 'Open ↗'}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <section
      aria-label={locale === 'id' ? 'Pratinjau langsung website' : 'Live website preview'}
      class="sticker-card overflow-hidden rounded-md bg-paper"
    >
      {/* Full Browser Toolbar */}
      <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-paper-2 px-3 py-2.5 sm:px-4">
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5" aria-hidden="true">
            <span class="h-3 w-3 rounded-full border-2 border-ink bg-tomato" />
            <span class="h-3 w-3 rounded-full border-2 border-ink bg-mustard" />
            <span class="h-3 w-3 rounded-full border-2 border-ink bg-leaf" />
          </div>
          <span class="ml-1 hidden items-center gap-1 rounded-sm border border-ink bg-leaf/20 px-2 py-0.5 font-mono text-[11px] font-bold text-ink sm:inline-flex">
            <span class="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" />
            LIVE PREVIEW
          </span>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          class="min-w-0 flex-1 truncate rounded-sm border-2 border-ink bg-paper px-3 py-1 font-mono text-xs text-ink-soft hover:text-cobalt"
          title={url}
        >
          {url}
        </a>

        <div class="flex flex-wrap items-center gap-1.5">
          <div
            class="inline-flex rounded-sm border-2 border-ink bg-paper p-0.5 font-mono text-[11px]"
            role="group"
            aria-label="Viewport size"
          >
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              aria-pressed={viewport === 'desktop'}
              class={`rounded-[2px] px-2 py-0.5 font-bold transition-colors ${
                viewport === 'desktop' ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              aria-pressed={viewport === 'mobile'}
              class={`rounded-[2px] px-2 py-0.5 font-bold transition-colors ${
                viewport === 'mobile' ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-2'
              }`}
            >
              Mobile
            </button>
          </div>

          <button
            type="button"
            onClick={handleReload}
            title={locale === 'id' ? 'Muat ulang preview' : 'Reload preview'}
            class="rounded-sm border-2 border-ink bg-paper px-2.5 py-1 font-mono text-xs font-bold text-ink hover:bg-mustard"
          >
            ↻
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-sm border-2 border-ink bg-mustard px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-[2px_2px_0_var(--ink)] hover:bg-tomato hover:text-paper"
          >
            {locale === 'id' ? 'Tab Baru ↗' : 'New Tab ↗'}
          </a>
        </div>
      </div>

      {/* Live Iframe Stage or Static OG Preview (when X-Frame-Options: DENY) */}
      {!embed ? (
        <div class="relative bg-paper-2/60">
          {previewImage ? (
            <a href={url} target="_blank" rel="noopener noreferrer" class="group relative block">
              <img
                src={previewImage}
                alt={`Preview ${title}`}
                loading="lazy"
                class="aspect-[1200/630] w-full object-cover"
              />
              <div class="absolute inset-0 flex items-end justify-end bg-ink/0 p-4 transition-colors group-hover:bg-ink/10">
                <span class="sticker-btn bg-mustard text-ink rounded-sm px-4 py-2 font-mono text-xs font-bold">
                  {locale === 'id' ? 'Buka Aplikasi Live ↗' : 'Launch Live App ↗'}
                </span>
              </div>
            </a>
          ) : (
            <div class="flex flex-col items-center justify-center gap-3 p-10 text-center">
              <p class="font-mono text-sm font-bold text-ink">{host}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                class="sticker-btn bg-mustard text-ink rounded-sm px-4 py-2 font-mono text-xs font-bold"
              >
                {locale === 'id' ? 'Buka Aplikasi Live ↗' : 'Launch Live App ↗'}
              </a>
            </div>
          )}
        </div>
      ) : (
        <div class="relative flex justify-center bg-paper-2/60">
          {!loaded && (
            <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-paper-2/95 p-6 text-center">
              <span class="font-mono text-sm font-bold text-ink">
                {locale === 'id'
                  ? `Memuat aplikasi langsung dari ${host}...`
                  : `Loading live app from ${host}...`}
              </span>
              <p class="max-w-md text-xs text-ink-soft">
                {locale === 'id'
                  ? 'Anda bisa langsung mengklik menu, simulator, dan grafik di dalam jendela ini setelah selesai dimuat.'
                  : 'You can interact directly with menus, simulators, and charts right inside this window once loaded.'}
              </p>
            </div>
          )}

          <iframe
            key={reloadKey}
            src={url}
            title={`Live demo ${title}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
            referrerPolicy="no-referrer-when-downgrade"
            class={`h-[560px] border-0 bg-paper transition-all duration-300 sm:h-[620px] ${
              viewport === 'mobile'
                ? 'w-[390px] max-w-full border-x-2 border-ink shadow-[0_0_0_2px_var(--ink)]'
                : 'w-full'
            }`}
          />
        </div>
      )}

      {/* Footer Hint */}
      <div class="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink bg-paper-2 px-3 py-2 font-mono text-[11px] text-ink-soft sm:px-4">
        <span>
          {!embed
            ? locale === 'id'
              ? 'Aplikasi memasang proteksi anti-clickjacking (X-Frame-Options: DENY) — klik untuk mencoba langsung.'
              : 'App enforces anti-clickjacking (X-Frame-Options: DENY) — click to launch live demo.'
            : locale === 'id'
              ? 'Pratinjau interaktif langsung — Anda bisa klik & coba fitur sistem di atas.'
              : 'Interactive live preview — feel free to click and test the system above.'}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-cobalt underline underline-offset-2 hover:text-tomato"
        >
          {locale === 'id' ? 'Tampilan layar penuh →' : 'Open fullscreen →'}
        </a>
      </div>
    </section>
  );
}
