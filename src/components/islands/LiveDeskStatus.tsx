import { useEffect, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

interface DeskMoment {
  time: string;
  emoji: string;
  label: string;
}

function getSragenMoment(locale: 'id' | 'en'): DeskMoment {
  const now = new Date();
  const timeFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const dayFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
  });

  const time = timeFmt.format(now);
  const hour = Number(time.split(':')[0] ?? 9);
  const day = dayFmt.format(now);
  const isWeekend = day === 'Sat' || day === 'Sun';

  if (hour >= 5 && hour < 7) {
    return {
      time,
      emoji: '🏃',
      label: locale === 'id' ? 'Mungkin lagi jogging pagi' : 'Probably out for a morning jog',
    };
  }
  if (hour >= 7 && hour < 8) {
    return {
      time,
      emoji: '☕',
      label: locale === 'id' ? 'Sarapan & siap-siap kerja' : 'Breakfast & warming up',
    };
  }
  if (hour >= 8 && hour < 17) {
    if (isWeekend) {
      return {
        time,
        emoji: '🗺️',
        label: locale === 'id' ? 'Akhir pekan · jelajah / ngulik' : 'Weekend · exploring or tinkering',
      };
    }
    return {
      time,
      emoji: '💻',
      label: locale === 'id' ? 'Di meja kerja · MagangHub' : 'At the desk · MagangHub',
    };
  }
  if (hour >= 17 && hour < 20) {
    return {
      time,
      emoji: '🐈',
      label: locale === 'id' ? 'Istirahat sore & santai' : 'Evening break & unwinding',
    };
  }
  if (hour >= 20 && hour < 23) {
    return {
      time,
      emoji: '⌨️',
      label: locale === 'id' ? 'Jam tenang · ngulik kode' : 'Quiet hours · coding & learning',
    };
  }
  return {
    time,
    emoji: '🌙',
    label: locale === 'id' ? 'Waktunya istirahat (meja gelap)' : 'Probably asleep (lights off)',
  };
}

export default function LiveDeskStatus({ locale }: Props) {
  const [moment, setMoment] = useState<DeskMoment | null>(null);

  useEffect(() => {
    const update = () => setMoment(getSragenMoment(locale));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, [locale]);

  return (
    <div
      class="bg-paper text-ink inline-flex items-center gap-2 rounded-sm border-2 border-ink px-2.5 py-1 font-mono text-[11px] shadow-[2px_2px_0_var(--ink)]"
      title={locale === 'id' ? 'Waktu lokal Sragen (WIB / UTC+7)' : 'Sragen local time (WIB / UTC+7)'}
    >
      <span aria-hidden="true">{moment?.emoji ?? '🕒'}</span>
      <span class="font-bold tabular-nums">{moment ? `${moment.time} WIB` : 'WIB'}</span>
      <span class="text-ink-soft/60" aria-hidden="true">·</span>
      <span class="text-ink-soft">
        {moment ? moment.label : locale === 'id' ? 'Sragen, Jawa Tengah' : 'Sragen, Central Java'}
      </span>
    </div>
  );
}
