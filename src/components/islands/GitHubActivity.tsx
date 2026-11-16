import { useEffect, useState } from 'preact/hooks';

interface Props {
  username: string;
  locale: 'id' | 'en';
}

interface ActivitySummary {
  repo: string;
  repoUrl: string;
  action: string;
  detail: string;
  createdAt: string;
}

const CACHE_TTL_MS = 10 * 60 * 1000;

function formatRelative(iso: string, locale: 'id' | 'en'): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.max(1, Math.floor(diffMs / 60000));
  if (mins < 60) return locale === 'id' ? `${mins} menit lalu` : `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return locale === 'id' ? `${hours} jam lalu` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return locale === 'id' ? `${days} hari lalu` : `${days}d ago`;
}

export default function GitHubActivity({ username, locale }: Props) {
  const [activity, setActivity] = useState<ActivitySummary | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');

  useEffect(() => {
    const cacheKey = `alam_gh_activity_${username}`;

    try {
      const cachedRaw = window.sessionStorage.getItem(cacheKey);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw) as { ts: number; data: ActivitySummary };
        if (Date.now() - parsed.ts < CACHE_TTL_MS && parsed.data) {
          setActivity(parsed.data);
          setStatus('ready');
          return;
        }
      }
    } catch {
      // abaikan error sessionStorage
    }

    let cancelled = false;
    fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=5`)
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API unavailable');
        return res.json();
      })
      .then((events: Array<Record<string, unknown>>) => {
        if (cancelled || !Array.isArray(events) || events.length === 0) {
          setStatus('fallback');
          return;
        }

        const pushOrCreate =
          events.find((ev) => ev.type === 'PushEvent' || ev.type === 'CreateEvent') ?? events[0];
        const repoObj = (pushOrCreate.repo as { name?: string }) ?? {};
        const repoName = repoObj.name ?? `${username}/portfolio-alam`;
        const payload = (pushOrCreate.payload as {
          commits?: Array<{ message?: string }>;
          ref_type?: string;
        }) ?? {};

        let action = locale === 'id' ? 'Aktivitas terbaru' : 'Recent activity';
        let detail = '';

        if (pushOrCreate.type === 'PushEvent') {
          action = locale === 'id' ? 'Push commit ke' : 'Pushed commit to';
          detail = payload.commits?.[0]?.message?.split('\n')[0] ?? '';
        } else if (pushOrCreate.type === 'CreateEvent') {
          action = locale === 'id' ? 'Membuat repo/branch di' : 'Created repo/branch at';
        }

        const summary: ActivitySummary = {
          repo: repoName,
          repoUrl: `https://github.com/${repoName}`,
          action,
          detail,
          createdAt: String(pushOrCreate.created_at ?? new Date().toISOString()),
        };

        setActivity(summary);
        setStatus('ready');

        try {
          window.sessionStorage.setItem(
            cacheKey,
            JSON.stringify({ ts: Date.now(), data: summary }),
          );
        } catch {
          // abaikan
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('fallback');
      });

    return () => {
      cancelled = true;
    };
  }, [username, locale]);

  return (
    <div class="sticker-card rounded-md bg-paper p-5">
      <div class="flex items-center justify-between gap-2">
        <span class="font-mono text-xs font-bold uppercase tracking-wider text-ink">
          GitHub Live Log
        </span>
        <span class="bg-leaf text-paper inline-flex items-center gap-1 rounded-sm border border-ink px-2 py-0.5 font-mono text-[10px] font-bold">
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-paper" />
          PUBLIC API
        </span>
      </div>

      {status === 'loading' && (
        <p class="mt-3 font-mono text-xs text-ink-soft">
          {locale === 'id' ? 'Mengambil log commit terbaru...' : 'Fetching latest commit log...'}
        </p>
      )}

      {status === 'ready' && activity && (
        <div class="mt-3 space-y-1.5 text-sm">
          <p class="text-xs text-ink-soft">
            {activity.action}{' '}
            <span class="font-mono font-semibold text-ink">
              {formatRelative(activity.createdAt, locale)}
            </span>
          </p>
          <a
            href={activity.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-xs font-bold text-cobalt hover:underline break-all"
          >
            {activity.repo} &rarr;
          </a>
          {activity.detail && (
            <p class="bg-paper-2 rounded-sm border border-ink/30 px-2.5 py-1.5 font-mono text-[11px] text-ink-soft line-clamp-2">
              &ldquo;{activity.detail}&rdquo;
            </p>
          )}
        </div>
      )}

      {status === 'fallback' && (
        <div class="mt-3 space-y-2 text-xs text-ink-soft">
          <p>
            {locale === 'id'
              ? 'Lihat semua repositori & riwayat commit langsung di GitHub:'
              : 'Inspect all repositories & commit history directly on GitHub:'}
          </p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            class="sticker-btn bg-paper-2 text-ink rounded-sm px-3 py-1.5 font-mono text-xs"
          >
            github.com/{username} &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
