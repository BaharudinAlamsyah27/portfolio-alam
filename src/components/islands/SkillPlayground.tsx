import { useEffect, useRef, useState } from 'preact/hooks';

export interface PlaygroundSkill {
  name: string;
  category: string;
  level: 'dikuasai' | 'didalami' | 'dieksplor';
}

interface Props {
  skills: PlaygroundSkill[];
  locale: 'id' | 'en';
  labels: {
    modeStatic: string;
    modePhysics: string;
    shake: string;
  };
}

const LEVEL_STYLES: Record<PlaygroundSkill['level'], string> = {
  dikuasai: 'bg-leaf text-paper',
  didalami: 'bg-cobalt text-paper',
  dieksplor: 'bg-mustard text-ink',
};

export default function SkillPlayground({ skills, locale, labels }: Props) {
  const [physicsMode, setPhysicsMode] = useState(false);
  const [filter, setFilter] = useState<'all' | PlaygroundSkill['level']>('all');
  const [loadingPhysics, setLoadingPhysics] = useState(false);

  const arenaRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const bodiesRef = useRef<Array<{ body: unknown; w: number; h: number }>>([]);
  const bounceFnRef = useRef<(() => void) | null>(null);

  const visibleSkills =
    filter === 'all' ? skills : skills.filter((s) => s.level === filter);

  useEffect(() => {
    if (!physicsMode) return;

    let cancelled = false;
    let rafId = 0;
    let cleanupMatter: (() => void) | null = null;

    async function bootMatter() {
      setLoadingPhysics(true);
      const Matter = await import('matter-js');
      if (cancelled || !arenaRef.current) return;
      setLoadingPhysics(false);

      const container = arenaRef.current;
      const width = Math.max(container.clientWidth, 300);
      const height = 340;

      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 0.9, scale: 0.001 },
      });
      const world = engine.world;

      // Dinding pembatas arena
      const wallOpts = { isStatic: true, restitution: 0.7, friction: 0.2 };
      const floor = Matter.Bodies.rectangle(width / 2, height + 25, width + 80, 50, wallOpts);
      const ceiling = Matter.Bodies.rectangle(width / 2, -25, width + 80, 50, wallOpts);
      const leftWall = Matter.Bodies.rectangle(-25, height / 2, 50, height + 80, wallOpts);
      const rightWall = Matter.Bodies.rectangle(width + 25, height / 2, 50, height + 80, wallOpts);
      Matter.Composite.add(world, [floor, ceiling, leftWall, rightWall]);

      const created: Array<{ body: Matter.Body; w: number; h: number }> = [];
      skills.forEach((_skill, idx) => {
        const el = badgeRefs.current[idx];
        const w = el ? Math.max(el.offsetWidth, 90) : 130;
        const h = el ? Math.max(el.offsetHeight, 36) : 40;
        const cols = Math.max(1, Math.floor((width - 40) / 150));
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const startX = Math.min(width - w / 2 - 12, Math.max(w / 2 + 12, 85 + col * 145));
        const startY = 48 + row * 56;

        const body = Matter.Bodies.rectangle(startX, startY, w, h, {
          restitution: 0.65,
          friction: 0.15,
          frictionAir: 0.015,
          chamfer: { radius: 6 },
        });
        Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.25);
        created.push({ body, w, h });
      });

      bodiesRef.current = created;
      Matter.Composite.add(
        world,
        created.map((c) => c.body),
      );

      // Kontrol mouse / sentuh untuk menyeret & melempar badge
      const mouse = Matter.Mouse.create(container);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Matter.Composite.add(world, mouseConstraint);

      bounceFnRef.current = () => {
        for (const item of created) {
          Matter.Body.setVelocity(item.body, {
            x: (Math.random() - 0.5) * 14,
            y: -(8 + Math.random() * 10),
          });
          Matter.Body.setAngularVelocity(item.body, (Math.random() - 0.5) * 0.25);
        }
      };

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const syncDom = () => {
        for (let i = 0; i < created.length; i++) {
          const el = badgeRefs.current[i];
          const { body, w, h } = created[i];
          if (el) {
            const x = body.position.x - w / 2;
            const y = body.position.y - h / 2;
            el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${body.angle.toFixed(3)}rad)`;
          }
        }
        rafId = requestAnimationFrame(syncDom);
      };
      rafId = requestAnimationFrame(syncDom);

      cleanupMatter = () => {
        cancelAnimationFrame(rafId);
        Matter.Runner.stop(runner);
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
        bounceFnRef.current = null;
      };
    }

    bootMatter();

    return () => {
      cancelled = true;
      if (cleanupMatter) cleanupMatter();
    };
  }, [physicsMode, skills]);

  return (
    <div class="sticker-card mb-7 rounded-md bg-paper p-5">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-ink/25 pb-4">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-pressed={!physicsMode}
            onClick={() => setPhysicsMode(false)}
            class={`rounded-sm border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold transition-all ${
              !physicsMode
                ? 'bg-ink text-paper shadow-[2px_2px_0_var(--mustard)]'
                : 'bg-paper-2 text-ink hover:bg-mustard/40'
            }`}
          >
            {labels.modeStatic}
          </button>

          <button
            type="button"
            aria-pressed={physicsMode}
            onClick={() => setPhysicsMode(true)}
            class={`rounded-sm border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold transition-all ${
              physicsMode
                ? 'bg-tomato text-paper shadow-[2px_2px_0_var(--ink)]'
                : 'bg-mustard text-ink hover:bg-mustard/80 shadow-[2px_2px_0_var(--ink)]'
            }`}
          >
            ⚡ {labels.modePhysics}
          </button>

          {physicsMode && (
            <button
              type="button"
              onClick={() => bounceFnRef.current?.()}
              class="sticker-btn bg-cobalt text-paper rounded-sm px-3 py-1.5 font-mono text-xs"
            >
              {labels.shake}
            </button>
          )}
        </div>

        {!physicsMode && (
          <div class="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {(['all', 'dikuasai', 'didalami', 'dieksplor'] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setFilter(lvl)}
                class={`rounded-sm border border-ink px-2.5 py-1 uppercase ${
                  filter === lvl ? 'bg-mustard font-bold text-ink' : 'bg-paper-2 text-ink-soft'
                }`}
              >
                {lvl === 'all' ? (locale === 'id' ? 'semua' : 'all') : lvl}
              </button>
            ))}
          </div>
        )}
      </div>

      {!physicsMode ? (
        <div class="mt-4 flex flex-wrap gap-2.5">
          {visibleSkills.map((skill) => (
            <span
              key={skill.name}
              class={`inline-flex items-center gap-2 rounded-sm border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)] ${LEVEL_STYLES[skill.level]}`}
            >
              <span>{skill.name}</span>
              <span class="opacity-75 text-[10px] uppercase">{skill.category}</span>
            </span>
          ))}
        </div>
      ) : (
        <div class="mt-4 space-y-2">
          <div
            ref={arenaRef}
            class="bg-paper-2 relative h-[340px] w-full select-none overflow-hidden rounded-sm border-2 border-ink shadow-inner"
            aria-label={
              locale === 'id'
                ? 'Arena fisika interaktif untuk badge skill'
                : 'Interactive physics arena for skill badges'
            }
          >
            {loadingPhysics && (
              <p class="p-4 font-mono text-xs text-ink-soft">
                {locale === 'id' ? 'Memuat mesin fisika Matter.js...' : 'Loading Matter.js engine...'}
              </p>
            )}
            {skills.map((skill, idx) => (
              <div
                key={skill.name}
                ref={(el) => {
                  badgeRefs.current[idx] = el;
                }}
                class={`pointer-events-none absolute top-0 left-0 cursor-grab rounded-sm border-2 border-ink px-3 py-1.5 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)] will-change-transform ${LEVEL_STYLES[skill.level]}`}
              >
                {skill.name}
              </div>
            ))}
          </div>
          <p class="font-hand text-sm text-ink-soft">
            {locale === 'id'
              ? 'Seret & lempar badge di kotak atas pakai mouse atau sentuhan!'
              : 'Grab & toss badges inside the box above with mouse or touch!'}
          </p>
        </div>
      )}
    </div>
  );
}
