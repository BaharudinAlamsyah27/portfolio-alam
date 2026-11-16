import { useEffect, useRef, useState } from 'preact/hooks';
import {
  answerQuestionLocally,
  autocompleteInput,
  executeCommand,
  type TerminalContext,
  type TerminalLine,
  type TerminalTheme,
} from '../../lib/terminalEngine';

interface Props {
  context: TerminalContext;
}

interface HistoryEntry {
  id: number;
  command?: string;
  lines: TerminalLine[];
}

const THEME_STYLES: Record<TerminalTheme, string> = {
  ink: 'bg-[#1F1B16] text-[#FFF8EC] border-[#FFF8EC]/30',
  paper: 'bg-[#FFF8EC] text-[#1F1B16] border-[#1F1B16]',
  forest: 'bg-[#13261B] text-[#E9F7EC] border-[#2BA84A]',
  amber: 'bg-[#261D0F] text-[#FFE8A3] border-[#F5B700]',
};

const QUICK_CMDS = [
  'help',
  'whoami',
  'ls projects',
  'skills',
  'ask apa keahlian Alam?',
  'cat',
  'jog',
  'sudo hire-me',
];

export default function TerminalModal({ context }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [theme, setTheme] = useState<TerminalTheme>('ink');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [entries, setEntries] = useState<HistoryEntry[]>([
    {
      id: 0,
      lines: [
        {
          kind: 'accent',
          text:
            context.locale === 'id'
              ? 'alam@meja-kerja:~$ Selamat datang di Terminal Mode.'
              : 'alam@desk:~$ Welcome to Terminal Mode.',
        },
        {
          kind: 'muted',
          text:
            context.locale === 'id'
              ? 'Ketik "help" untuk daftar perintah, "cat" untuk kejutan, atau klik chip di bawah.'
              : 'Type "help" for commands, "cat" for a surprise, or tap a chip below.',
        },
      ],
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (e.key === '`' && !isEditable) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (e.key === 'Escape' && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    const onOpenEvent = (ev: Event) => {
      setOpen(true);
      const custom = ev as CustomEvent<{ command?: string }>;
      if (custom.detail?.command) {
        runCommand(custom.detail.command);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('alam:open-terminal', onOpenEvent);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('alam:open-terminal', onOpenEvent);
    };
  }, [open, context]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, open]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const result = executeCommand(trimmed, context);

    if (result.setTheme) {
      setTheme(result.setTheme);
    }

    if (result.clear) {
      setEntries([]);
    } else {
      const entryId = nextId.current++;
      setEntries((prev) => [
        ...prev,
        { id: entryId, command: trimmed, lines: result.lines },
      ]);

      if (result.askQuestion) {
        const q = result.askQuestion;
        fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q, locale: context.locale }),
        })
          .then((res) => (res.ok ? res.json() : { fallback: true }))
          .then((data: { answer?: string; fallback?: boolean }) => {
            const finalLines: TerminalLine[] =
              data.answer && !data.fallback
                ? [
                    {
                      kind: 'accent',
                      text:
                        context.locale === 'id'
                          ? '🤖 [Gemini AI · Meja Alam]:'
                          : '🤖 [Gemini AI · Alam’s Desk]:',
                    },
                    { kind: 'info', text: data.answer },
                  ]
                : answerQuestionLocally(q, context);

            setEntries((prev) =>
              prev.map((item) => (item.id === entryId ? { ...item, lines: finalLines } : item)),
            );
          })
          .catch(() => {
            const fallbackLines = answerQuestionLocally(q, context);
            setEntries((prev) =>
              prev.map((item) => (item.id === entryId ? { ...item, lines: fallbackLines } : item)),
            );
          });
      }
    }

    setCmdHistory((prev) => [trimmed, ...prev.slice(0, 29)]);
    setHistoryIdx(-1);
    setInput('');

    if (result.scrollTo) {
      const targetEl = document.querySelector(result.scrollTo);
      if (targetEl) {
        setTimeout(() => targetEl.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }

    if (result.navigate) {
      const dest = result.navigate;
      setTimeout(() => {
        window.location.href = dest;
      }, 250);
    }

    if (result.close) {
      setTimeout(() => setOpen(false), 300);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(input);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const completed = autocompleteInput(input, context);
      if (completed) setInput(completed);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      if (cmdHistory[next] !== undefined) {
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput('');
      } else if (cmdHistory[next] !== undefined) {
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  if (!open) return <div hidden aria-hidden="true" />;

  const isLightTheme = theme === 'paper';

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#1F1B16]/70 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal Mode"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        class={`flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-md border-2 shadow-[8px_8px_0_var(--ink)] ${THEME_STYLES[theme]}`}
      >
        {/* Title bar terminal */}
        <div
          class={`flex items-center justify-between border-b-2 px-4 py-2.5 font-mono text-xs ${
            isLightTheme ? 'border-ink bg-paper-2' : 'border-white/15 bg-black/25'
          }`}
        >
          <div class="flex items-center gap-2">
            <span class="bg-tomato inline-block h-3 w-3 rounded-full border border-ink" />
            <span class="bg-mustard inline-block h-3 w-3 rounded-full border border-ink" />
            <span class="bg-leaf inline-block h-3 w-3 rounded-full border border-ink" />
            <span class="ml-2 font-bold">alam@meja-kerja — bash</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            class="rounded-sm border border-current px-2 py-0.5 text-[11px] font-bold hover:opacity-75"
          >
            ESC
          </button>
        </div>

        {/* Output log */}
        <div
          ref={scrollRef}
          class="flex-1 space-y-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm"
        >
          {entries.map((entry) => (
            <div key={entry.id} class="space-y-1">
              {entry.command && (
                <div class="flex items-center gap-2 font-bold">
                  <span class="text-leaf">&gt;</span>
                  <span>{entry.command}</span>
                </div>
              )}
              {entry.lines.map((line, i) => {
                const color =
                  line.kind === 'accent'
                    ? isLightTheme
                      ? 'text-cobalt font-bold'
                      : 'text-mustard font-bold'
                    : line.kind === 'error'
                      ? 'text-tomato font-semibold'
                      : line.kind === 'ascii'
                        ? 'text-blush whitespace-pre'
                        : line.kind === 'muted'
                          ? 'opacity-70'
                          : '';
                return (
                  <p key={i} class={`whitespace-pre-wrap break-words ${color}`}>
                    {line.text}
                  </p>
                );
              })}
            </div>
          ))}
        </div>

        {/* Quick chips */}
        <div
          class={`flex flex-wrap gap-1.5 border-t px-4 py-2 ${
            isLightTheme ? 'border-ink/20 bg-paper-2/60' : 'border-white/10 bg-black/20'
          }`}
        >
          {QUICK_CMDS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => runCommand(q)}
              class={`rounded-sm border px-2 py-0.5 font-mono text-[11px] transition-opacity hover:opacity-80 ${
                isLightTheme ? 'border-ink bg-paper text-ink' : 'border-white/25 bg-white/5'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input prompt */}
        <div
          class={`flex items-center gap-2 border-t-2 px-4 py-3 font-mono text-sm ${
            isLightTheme ? 'border-ink bg-paper' : 'border-white/15 bg-black/30'
          }`}
        >
          <span class="text-leaf font-bold" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
            onKeyDown={handleKeyDown}
            placeholder={
              context.locale === 'id'
                ? 'ketik perintah (Tab untuk autocomplete)...'
                : 'type a command (Tab to autocomplete)...'
            }
            aria-label="Terminal command input"
            class="w-full bg-transparent outline-none placeholder:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}
