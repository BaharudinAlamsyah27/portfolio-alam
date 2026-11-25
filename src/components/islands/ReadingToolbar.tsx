import { useEffect, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
  readMins: number;
}

export default function ReadingToolbar({ locale, readMins }: Props) {
  const [copied, setCopied] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const isEn = locale === 'en';

  useEffect(() => {
    document.documentElement.dataset.focusRead = focusMode ? 'true' : 'false';
    return () => {
      document.documentElement.dataset.focusRead = 'false';
    };
  }, [focusMode]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // abaikan
    }
  };

  return (
    <div class="flex flex-wrap items-center gap-2 font-mono text-[11px]">
      <span class="bg-paper-2 text-ink-soft inline-flex items-center gap-1 rounded-sm border border-ink/40 px-2 py-1">
        <span aria-hidden="true">⏱</span>
        <span>
          ~{readMins} {isEn ? 'min read' : 'mnt baca'}
        </span>
      </span>

      <button
        type="button"
        onClick={handleCopyLink}
        class={`sticker-btn rounded-sm px-2.5 py-1 text-[11px] transition-colors ${
          copied ? 'bg-leaf text-paper' : 'bg-paper text-ink hover:bg-mustard/40'
        }`}
      >
        <span>{copied ? '✓' : '🔗'}</span>
        <span>
          {copied
            ? isEn
              ? 'Link Copied!'
              : 'Tautan Tersalin!'
            : isEn
              ? 'Copy Link'
              : 'Salin Tautan'}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setFocusMode((prev) => !prev)}
        aria-pressed={focusMode}
        class={`sticker-btn rounded-sm px-2.5 py-1 text-[11px] transition-colors ${
          focusMode ? 'bg-ink text-paper' : 'bg-paper-2 text-ink hover:bg-mustard/40'
        }`}
        title={isEn ? 'Dim side ornaments for calmer reading' : 'Redupkan ornamen samping agar bacaan lebih tenang'}
      >
        <span aria-hidden="true">{focusMode ? '💡' : '📖'}</span>
        <span>
          {focusMode
            ? isEn
              ? 'Focus: ON'
              : 'Fokus: AKTIF'
            : isEn
              ? 'Focus Mode'
              : 'Mode Fokus'}
        </span>
      </button>
    </div>
  );
}
