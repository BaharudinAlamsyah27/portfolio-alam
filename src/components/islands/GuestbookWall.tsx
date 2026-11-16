import { useEffect, useState } from 'preact/hooks';

export interface GuestbookEntry {
  name: string;
  role: string;
  message: string;
  color: 'mustard' | 'blush' | 'paper' | 'leaf';
  date: string;
}

interface Props {
  initialEntries: GuestbookEntry[];
  locale: 'id' | 'en';
  web3formsKey?: string;
}

const STORAGE_KEY = 'alam_guestbook_user_notes';

const COLOR_STYLES: Record<GuestbookEntry['color'], string> = {
  mustard: 'bg-mustard text-ink',
  blush: 'bg-blush text-ink',
  paper: 'bg-paper text-ink',
  leaf: 'bg-leaf text-paper',
};

export default function GuestbookWall({ initialEntries, locale, web3formsKey }: Props) {
  const [userNotes, setUserNotes] = useState<GuestbookEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState(locale === 'id' ? 'Sesama Dev' : 'Fellow Dev');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<GuestbookEntry['color']>('mustard');
  const [sentNotice, setSentNotice] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as GuestbookEntry[];
        if (Array.isArray(parsed)) setUserNotes(parsed);
      }
    } catch {
      // abaikan
    }
  }, []);

  const allEntries = [...userNotes, ...initialEntries];

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMsg = message.trim();
    if (!cleanName || !cleanMsg) return;

    const newNote: GuestbookEntry = {
      name: cleanName.slice(0, 40),
      role: role.trim().slice(0, 40) || (locale === 'id' ? 'Tamu' : 'Visitor'),
      message: cleanMsg.slice(0, 180),
      color,
      date: new Date().toISOString().slice(0, 10),
    };

    const updated = [newNote, ...userNotes];
    setUserNotes(updated);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // abaikan
    }

    if (web3formsKey) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `Catatan Buku Tamu Baru dari ${newNote.name}`,
          name: newNote.name,
          role: newNote.role,
          message: newNote.message,
          color: newNote.color,
        }),
      }).catch(() => {
        // tetap tersimpan lokal meskipun offline
      });
    }

    setName('');
    setMessage('');
    setShowForm(false);
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 4000);
  };

  return (
    <div class="space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          class="sticker-btn bg-mustard text-ink rounded-sm px-4 py-2 font-mono text-xs"
        >
          <span>{showForm ? '✕' : '📌'}</span>
          <span>
            {showForm
              ? locale === 'id'
                ? 'Tutup Form'
                : 'Close Form'
              : locale === 'id'
                ? '+ Tempel Catatan Baru'
                : '+ Pin a New Note'}
          </span>
        </button>

        {sentNotice && (
          <span class="bg-leaf text-paper rounded-sm border-2 border-ink px-3 py-1 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)]">
            {locale === 'id'
              ? '✓ Catatanmu sudah tertempel di papan meja!'
              : '✓ Your note has been pinned to the board!'}
          </span>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          class="sticker-card max-w-xl space-y-4 rounded-md bg-paper p-5"
        >
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block space-y-1 text-xs font-bold text-ink">
              <span>{locale === 'id' ? 'Nama / Panggilan' : 'Name / Handle'}</span>
              <input
                type="text"
                required
                maxLength={40}
                value={name}
                onInput={(e) => setName((e.target as HTMLInputElement).value)}
                placeholder={locale === 'id' ? 'Misal: Budi' : 'e.g. Alex'}
                class="bg-paper-2 w-full rounded-sm border-2 border-ink px-3 py-1.5 text-sm font-normal"
              />
            </label>

            <label class="block space-y-1 text-xs font-bold text-ink">
              <span>{locale === 'id' ? 'Datang sebagai' : 'Visiting as'}</span>
              <input
                type="text"
                maxLength={40}
                value={role}
                onInput={(e) => setRole((e.target as HTMLInputElement).value)}
                placeholder={locale === 'id' ? 'Recruiter / Dev / Teman' : 'Recruiter / Dev / Friend'}
                class="bg-paper-2 w-full rounded-sm border-2 border-ink px-3 py-1.5 text-sm font-normal"
              />
            </label>
          </div>

          <label class="block space-y-1 text-xs font-bold text-ink">
            <span>{locale === 'id' ? 'Pesan Singkat (maks. 180 karakter)' : 'Short Note (max 180 chars)'}</span>
            <textarea
              required
              rows={3}
              maxLength={180}
              value={message}
              onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
              placeholder={
                locale === 'id'
                  ? 'Salam kenal Alam! Suka sama konsep meja kerjanya...'
                  : 'Hey Alam! Love the desk concept...'
              }
              class="bg-paper-2 w-full rounded-sm border-2 border-ink px-3 py-1.5 text-sm font-normal"
            />
          </label>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2 font-mono text-xs">
              <span class="text-ink-soft">{locale === 'id' ? 'Warna kertas:' : 'Note color:'}</span>
              {(['mustard', 'blush', 'paper', 'leaf'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={c}
                  class={`h-6 w-6 rounded-sm border-2 border-ink ${COLOR_STYLES[c]} ${
                    color === c ? 'ring-2 ring-cobalt ring-offset-1' : 'opacity-75'
                  }`}
                />
              ))}
            </div>

            <button
              type="submit"
              class="sticker-btn bg-tomato text-paper rounded-sm px-4 py-1.5 font-mono text-xs"
            >
              {locale === 'id' ? 'Tempel Sekarang' : 'Pin Note'} &rarr;
            </button>
          </div>
        </form>
      )}

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allEntries.map((item, idx) => {
          const tilt =
            idx % 3 === 0 ? '-rotate-[1deg]' : idx % 3 === 1 ? 'rotate-[0.8deg]' : '-rotate-[0.4deg]';
          return (
            <article
              key={`${item.name}-${idx}`}
              class={`sticker-card flex flex-col justify-between rounded-sm p-5 ${COLOR_STYLES[item.color]} ${tilt}`}
            >
              <p class="font-hand text-base leading-relaxed sm:text-lg">&ldquo;{item.message}&rdquo;</p>

              <div class="mt-4 flex items-center justify-between border-t border-dashed border-current/30 pt-2.5 font-mono text-[11px]">
                <div>
                  <strong class="block font-sans text-xs font-bold">{item.name}</strong>
                  <span class="opacity-80">{item.role}</span>
                </div>
                <span class="opacity-75">{item.date}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
