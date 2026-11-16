import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

type SoundMode = 'off' | 'rain' | 'purr' | 'focus';

export default function DeskAudio({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SoundMode>('off');
  const [volume, setVolume] = useState(0.35);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (ctxRef.current) {
      void ctxRef.current.close();
      ctxRef.current = null;
      masterGainRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopAudio();
  }, []);

  useEffect(() => {
    if (masterGainRef.current && ctxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.08);
    }
  }, [volume]);

  const startSound = (nextMode: SoundMode) => {
    stopAudio();
    if (nextMode === 'off') {
      setMode('off');
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);

    if (nextMode === 'rain') {
      // Pink/brown noise untuk suara hujan halus
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.03 * white) / 1.03;
        lastOut = data[i];
        data[i] *= 2.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;

      noise.connect(filter);
      filter.connect(master);
      noise.start();
    } else if (nextMode === 'purr') {
      // Dengkuran kucing (26Hz + 52Hz dengan modulasi napas)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.value = 26;
      osc2.frequency.value = 52;

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.35;
      lfoGain.gain.value = 0.25;

      const purrGain = ctx.createGain();
      purrGain.gain.value = 0.3;

      lfo.connect(lfoGain);
      lfoGain.connect(purrGain.gain);

      osc1.connect(purrGain);
      osc2.connect(purrGain);
      purrGain.connect(master);

      osc1.start();
      osc2.start();
      lfo.start();
    } else if (nextMode === 'focus') {
      // Hum hangat lo-fi untuk fokus ngoding
      const freqs = [130.81, 196.0, 246.94];
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;

      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.14;
      filter.connect(droneGain);
      droneGain.connect(master);

      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.value = f;
        osc.connect(filter);
        osc.start();
      });
    }

    ctxRef.current = ctx;
    masterGainRef.current = master;
    setMode(nextMode);
  };

  const labels = {
    title: locale === 'id' ? 'Suara Meja Kerja' : 'Desk Ambience',
    off: locale === 'id' ? 'Mati' : 'Off',
    rain: locale === 'id' ? '🌧️ Hujan Halus' : '🌧️ Soft Rain',
    purr: locale === 'id' ? '🐈 Kucing Purr' : '🐈 Cat Purr',
    focus: locale === 'id' ? '🎧 Fokus Hangat' : '🎧 Warm Focus',
  };

  return (
    <div class="fixed bottom-4 left-4 z-40">
      {open && (
        <div class="sticker-card mb-2 w-60 rounded-md bg-paper p-3.5 text-xs">
          <div class="mb-2.5 flex items-center justify-between border-b border-dashed border-ink/30 pb-2">
            <span class="font-mono font-bold text-ink">{labels.title}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              class="font-mono text-[11px] text-ink-soft hover:text-ink"
              aria-label="Tutup panel audio"
            >
              ✕
            </button>
          </div>

          <div class="grid grid-cols-2 gap-1.5 font-mono">
            {(['off', 'rain', 'purr', 'focus'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => startSound(item)}
                class={`rounded-sm border border-ink px-2 py-1.5 text-left text-[11px] font-bold ${
                  mode === item ? 'bg-mustard text-ink' : 'bg-paper-2 text-ink-soft hover:text-ink'
                }`}
              >
                {labels[item]}
              </button>
            ))}
          </div>

          <label class="mt-3 flex items-center gap-2 font-mono text-[11px] text-ink-soft">
            <span>Vol</span>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={volume}
              onInput={(e) => setVolume(Number((e.target as HTMLInputElement).value))}
              class="w-full accent-[var(--tomato)]"
            />
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        class={`sticker-btn rounded-sm px-3 py-1.5 font-mono text-xs ${
          mode !== 'off' ? 'bg-mustard text-ink' : 'bg-paper text-ink'
        }`}
        title={labels.title}
      >
        <span>{mode !== 'off' ? '🔊' : '🎧'}</span>
        <span>{mode !== 'off' ? labels[mode] : labels.title}</span>
      </button>
    </div>
  );
}
