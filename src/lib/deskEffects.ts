import type { RoughAnnotationType } from 'rough-notation/lib/model';

let activeLenis: { destroy: () => void } | null = null;
let listenersBound = false;
let cleanupScrollTriggers: (() => void) | null = null;

function splitHeadingWords(el: HTMLElement): HTMLElement[] {
  if (el.dataset.wordsSplit === '1') {
    return Array.from(el.querySelectorAll<HTMLElement>('.word-reveal'));
  }
  const raw = el.textContent?.trim() ?? '';
  if (!raw) return [];
  el.dataset.wordsSplit = '1';
  el.textContent = '';

  const words = raw.split(/\s+/);
  const spans: HTMLElement[] = [];

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'word-reveal';
    span.textContent = word;
    el.appendChild(span);
    spans.push(span);
    if (i < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });

  return spans;
}

async function runPageEffects() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  if (cleanupScrollTriggers) {
    cleanupScrollTriggers();
    cleanupScrollTriggers = null;
  }

  // 1. Rough Notation: coretan spidol pada elemen bertanda [data-rough]
  const roughEls = document.querySelectorAll<HTMLElement>('[data-rough]');
  if (roughEls.length > 0) {
    const { annotate } = await import('rough-notation');
    roughEls.forEach((el) => {
      if (el.dataset.roughInit === '1') return;
      el.dataset.roughInit = '1';
      const type = (el.dataset.rough as RoughAnnotationType) || 'highlight';
      const color = el.dataset.roughColor || 'rgba(245, 183, 0, 0.45)';
      const annotation = annotate(el, {
        type,
        color,
        strokeWidth: 2,
        padding: type === 'highlight' ? 2 : 4,
        multiline: true,
        animationDuration: 550,
      });
      setTimeout(() => annotation.show(), 200);
    });
  }

  // 2. GSAP + ScrollTrigger
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  // 3. Lenis smooth scroll disinkronkan dengan ScrollTrigger
  if (activeLenis) {
    activeLenis.destroy();
    activeLenis = null;
  }
  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.05,
  });
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });
  activeLenis = lenis;

  const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

  // Hero heading: animasi kata muncul dari kiri ke kanan saat pertama tampil
  const heroHeading = document.querySelector<HTMLElement>('#hero-heading');
  if (heroHeading && heroHeading.dataset.tensuraInit !== '1') {
    heroHeading.dataset.tensuraInit = '1';
    const heroWords = splitHeadingWords(heroHeading);
    if (heroWords.length > 0) {
      gsap.from(heroWords, {
        x: -24,
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.45,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'clipPath,transform,opacity',
      });
    }
  }

  // 4. Reveal kata-per-kata dari kiri ke kanan saat tiap section discroll ke layar
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
  sections.forEach((sec) => {
    if (sec.querySelector('#hero-heading')) return;

    const heading = sec.querySelector<HTMLElement>('h2');
    if (heading && heading.dataset.tensuraInit !== '1') {
      heading.dataset.tensuraInit = '1';
      const headerBlock = heading.parentElement;
      const badge = headerBlock?.querySelector<HTMLElement>('span');
      const sub = headerBlock?.querySelector<HTMLElement>('p');
      const words = splitHeadingWords(heading);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 86%',
          toggleActions: 'play none none reset',
        },
      });

      if (badge) {
        tl.from(badge, {
          x: -26,
          scale: 0.78,
          opacity: 0,
          duration: 0.36,
          ease: 'back.out(2)',
        });
      }

      if (words.length > 0) {
        tl.from(
          words,
          {
            x: -22,
            opacity: 0,
            clipPath: 'inset(0 100% 0 0)',
            duration: 0.42,
            stagger: 0.075,
            ease: 'power3.out',
          },
          badge ? '-=0.22' : 0,
        );
      }

      if (sub) {
        tl.from(
          sub,
          {
            x: -16,
            opacity: 0,
            duration: 0.38,
            ease: 'power2.out',
          },
          '-=0.25',
        );
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    }

    // 5. Reveal kartu (.sticker-card) secara bertahap saat masuk viewport
    const secCards = Array.from(sec.querySelectorAll<HTMLElement>('.sticker-card')).filter(
      (c) => c.dataset.gsapInit !== '1',
    );
    if (secCards.length > 0) {
      secCards.forEach((c) => {
        c.dataset.gsapInit = '1';
      });
      const tween = gsap.from(secCards, {
        y: 30,
        opacity: 0,
        duration: 0.52,
        stagger: 0.09,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: secCards[0],
          start: 'top 88%',
          toggleActions: 'play none none reset',
        },
      });
      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    }
  });

  window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);

  cleanupScrollTriggers = () => {
    triggers.forEach((st) => st.kill());
  };
}

export function initDeskEffects() {
  if (listenersBound) return;
  listenersBound = true;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const trigger = target?.closest<HTMLElement>('[data-open-terminal], [data-open-terminal-cmd]');
    if (!trigger) return;
    const cmd = trigger.dataset.openTerminalCmd;
    window.dispatchEvent(
      new CustomEvent('alam:open-terminal', {
        detail: cmd ? { command: cmd } : undefined,
      }),
    );
  });

  document.addEventListener('astro:before-preparation', () => {
    if (cleanupScrollTriggers) {
      cleanupScrollTriggers();
      cleanupScrollTriggers = null;
    }
    if (activeLenis) {
      activeLenis.destroy();
      activeLenis = null;
    }
  });

  document.addEventListener('astro:page-load', () => {
    void runPageEffects();
  });
}
