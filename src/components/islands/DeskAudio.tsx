import { useEffect, useRef, useState } from 'preact/hooks';

interface Props {
  locale: 'id' | 'en';
}

type SoundMode = 'off' | 'gamelan' | 'tensura' | 'rain' | 'purr' | 'focus';

export default function DeskAudio({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<SoundMode>('off');
  const [volume, setVolume] = useState(0.35);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const stopAudio = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
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

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);

    if (nextMode === 'gamelan') {
      // Gamelan Jawa Laras Slendro lembut (Gender/Saron + Gong Ageng)
      // Delay halus ala pendopo
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.28;
      const fb = ctx.createGain();
      fb.gain.value = 0.28;
      const wet = ctx.createGain();
      wet.gain.value = 0.35;
      delay.connect(fb);
      fb.connect(delay);
      delay.connect(wet);
      wet.connect(master);

      const slendro = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
      const balungan = [0, 1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 5, 4, 3, 1, 0];
      const ornament = [5, 4, 6, 5, 7, 5, 4, 3];

      const strikeBronze = (freq: number, peak: number, decay: number, bright = 2.76) => {
        const now = ctx.currentTime;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const g1 = ctx.createGain();
        const g2 = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);
        // Overtone khas bilah perunggu gamelan (sedikit inharmonik)
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * bright, now);

        g1.gain.setValueAtTime(0.0001, now);
        g1.gain.linearRampToValueAtTime(peak, now + 0.012);
        g1.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        g2.gain.setValueAtTime(0.0001, now);
        g2.gain.linearRampToValueAtTime(peak * 0.22, now + 0.008);
        g2.gain.exponentialRampToValueAtTime(0.0001, now + decay * 0.45);

        osc1.connect(g1);
        osc2.connect(g2);
        g1.connect(master);
        g1.connect(delay);
        g2.connect(master);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + decay + 0.05);
        osc2.stop(now + decay * 0.5 + 0.05);
      };

      const strikeGong = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(82.41, now); // Gong rendah hangat
        lfo.frequency.setValueAtTime(2.4, now); // Ombak khas gong Jawa
        lfoGain.gain.setValueAtTime(0.07, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(0.24, now + 0.08);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 4.4);

        lfo.connect(lfoGain);
        lfoGain.connect(g.gain);
        osc.connect(g);
        g.connect(master);

        osc.start(now);
        lfo.start(now);
        osc.stop(now + 4.5);
        lfo.stop(now + 4.5);
      };

      let step = 0;
      const tick = () => {
        if (ctx.state === 'closed') return;
        const noteIdx = balungan[step % balungan.length];
        strikeBronze(slendro[noteIdx], 0.16, 2.2);

        if (step % 2 === 1) {
          const ornIdx = ornament[(step >> 1) % ornament.length];
          window.setTimeout(() => {
            if (ctx.state !== 'closed') {
              strikeBronze(slendro[ornIdx], 0.075, 1.35, 2.82);
            }
          }, 260);
        }
        if (step % 8 === 0) {
          strikeGong();
        }
        step += 1;
      };

      tick();
      timerRef.current = window.setInterval(tick, 620);
    } else if (nextMode === 'tensura') {
      // Melodi Jura Tempest — Crystal Music Box + Warm Fantasy Pad (D Major / Lydian)
      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.36;
      const fb = ctx.createGain();
      fb.gain.value = 0.36;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 2400;
      const wet = ctx.createGain();
      wet.gain.value = 0.42;

      delay.connect(lp);
      lp.connect(fb);
      fb.connect(delay);
      lp.connect(wet);
      wet.connect(master);

      // Progresi akor hangat ala kota Jura Tempest: Dmaj7 -> Gmaj7 -> Bm7 -> Aadd9
      const chords = [
        [293.66, 369.99, 440.0, 554.37],
        [196.0, 293.66, 369.99, 493.88],
        [246.94, 293.66, 369.99, 440.0],
        [220.0, 329.63, 440.0, 493.88],
      ];
      // Melodi kristal tinggi (music box / harpa)
      const melody = [
        587.33, 739.99, 880.0, 739.99, 659.25, 587.33, 493.88, 587.33,
        739.99, 880.0, 987.77, 880.0, 739.99, 659.25, 587.33, 440.0,
      ];

      const playCrystal = (freq: number, peak: number, dur: number) => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const over = ctx.createOscillator();
        const g = ctx.createGain();
        const og = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        over.type = 'triangle';
        over.frequency.setValueAtTime(freq * 2, now);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.linearRampToValueAtTime(peak, now + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        og.gain.setValueAtTime(0.0001, now);
        og.gain.linearRampToValueAtTime(peak * 0.14, now + 0.01);
        og.gain.exponentialRampToValueAtTime(0.0001, now + dur * 0.4);

        osc.connect(g);
        over.connect(og);
        g.connect(master);
        g.connect(delay);
        og.connect(delay);

        osc.start(now);
        over.start(now);
        osc.stop(now + dur + 0.05);
        over.stop(now + dur * 0.5 + 0.05);
      };

      const playPad = (chord: number[]) => {
        const now = ctx.currentTime;
        const padFilter = ctx.createBiquadFilter();
        padFilter.type = 'lowpass';
        padFilter.frequency.value = 720;
        const pg = ctx.createGain();
        pg.gain.setValueAtTime(0.0001, now);
        pg.gain.linearRampToValueAtTime(0.045, now + 0.65);
        pg.gain.exponentialRampToValueAtTime(0.0001, now + 3.1);

        padFilter.connect(pg);
        pg.connect(master);

        chord.forEach((f) => {
          const o = ctx.createOscillator();
          o.type = 'triangle';
          o.frequency.setValueAtTime(f * 0.5, now);
          o.connect(padFilter);
          o.start(now);
          o.stop(now + 3.2);
        });
      };

      let step = 0;
      const tick = () => {
        if (ctx.state === 'closed') return;
        const freq = melody[step % melody.length];
        playCrystal(freq, 0.13, 1.9);

        if (step % 4 === 0) {
          playPad(chords[(step >> 2) % chords.length]);
        }
        step += 1;
      };

      tick();
      timerRef.current = window.setInterval(tick, 480);
    } else if (nextMode === 'rain') {
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

  const labels: Record<SoundMode | 'title', string> = {
    title: locale === 'id' ? 'Musik & Suara Meja' : 'Desk Music & Ambience',
    off: locale === 'id' ? 'Mati' : 'Off',
    gamelan: locale === 'id' ? '🎵 Gamelan Jawa' : '🎵 Javanese Gamelan',
    tensura: locale === 'id' ? '💧 Jura Tempest' : '💧 Jura Tempest',
    rain: locale === 'id' ? '🌧️ Hujan Halus' : '🌧️ Soft Rain',
    purr: locale === 'id' ? '🐈 Kucing Purr' : '🐈 Cat Purr',
    focus: locale === 'id' ? '🎧 Fokus Hangat' : '🎧 Warm Focus',
  };

  const modeOrder: SoundMode[] = ['gamelan', 'tensura', 'rain', 'purr', 'focus', 'off'];

  return (
    <div class="fixed bottom-4 left-4 z-40">
      {open && (
        <div class="sticker-card mb-2 w-64 rounded-md bg-paper p-3.5 text-xs">
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
            {modeOrder.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => startSound(item)}
                class={`rounded-sm border border-ink px-2 py-1.5 text-left text-[11px] font-bold transition-colors ${
                  mode === item
                    ? item === 'tensura'
                      ? 'bg-slime text-ink'
                      : 'bg-mustard text-ink'
                    : 'bg-paper-2 text-ink-soft hover:text-ink'
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
              class="w-full accent-[var(--slime-deep)]"
            />
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        class={`sticker-btn rounded-sm px-3 py-1.5 font-mono text-xs ${
          mode === 'tensura'
            ? 'bg-slime text-ink'
            : mode !== 'off'
              ? 'bg-mustard text-ink'
              : 'bg-paper text-ink'
        }`}
        title={labels.title}
      >
        <span>{mode !== 'off' ? '🔊' : '🎵'}</span>
        <span>{mode !== 'off' ? labels[mode] : labels.title}</span>
      </button>
    </div>
  );
}
