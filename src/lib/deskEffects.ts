import type { RoughAnnotationType } from 'rough-notation/lib/model';

let activeLenis: { destroy: () => void } | null = null;
let listenersBound = false;
let activeObserver: IntersectionObserver | null = null;

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

  if (activeObserver) {
    activeObserver.disconnect();
    activeObserver = null;
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

  // 2. Lenis smooth scroll (hanya aktif jika tidak meminta reduced-motion)
  if (activeLenis) {
    activeLenis.destroy();
    activeLenis = null;
  }
  if (!prefersReduced) {
    const { default: Lenis } = await import('lenis');
    activeLenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
    });
  }

  // 3. GSAP animasi kata-per-kata dari kiri ke kanan via IntersectionObserver (tidak pernah menyembunyikan teks!)
  const { gsap } = await import('gsap');

  const animateHeadingBlock = (heading: HTMLElement) => {
    if (heading.dataset.tensuraAnimated === '1') return;
    heading.dataset.tensuraAnimated = '1';

    const headerBlock = heading.parentElement;
    const badge = headerBlock?.querySelector<HTMLElement>('span');
    const sub = headerBlock?.querySelector<HTMLElement>('p');
    const words = splitHeadingWords(heading);

    const tl = gsap.timeline();

    if (badge) {
      tl.fromTo(
        badge,
        { x: -24, scale: 0.85, opacity: 0.2 },
        {
          x: 0,
          scale: 1,
          opacity: 1,
          duration: 0.34,
          ease: 'back.out(2)',
          clearProps: 'transform,opacity',
        },
      );
    }

    if (words.length > 0) {
      tl.fromTo(
        words,
        { x: -22, opacity: 0.15, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.4,
          stagger: 0.075,
          ease: 'power3.out',
          clearProps: 'clipPath,transform,opacity',
        },
        badge ? '-=0.2' : 0,
      );
    }

    if (sub) {
      tl.fromTo(
        sub,
        { x: -16, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          duration: 0.36,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
        '-=0.22',
      );
    }
  };

  // Hero heading langsung jalan saat tampil
  const heroHeading = document.querySelector<HTMLElement>('#hero-heading');
  if (heroHeading && heroHeading.dataset.tensuraAnimated !== '1') {
    heroHeading.dataset.tensuraAnimated = '1';
    const heroWords = splitHeadingWords(heroHeading);
    if (heroWords.length > 0) {
      gsap.fromTo(
        heroWords,
        { x: -22, opacity: 0.15, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0,
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.42,
          stagger: 0.075,
          ease: 'power3.out',
          clearProps: 'clipPath,transform,opacity',
        },
      );
    }
  }

  // Observer untuk semua judul section & kartu saat masuk layar
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);

        const el = entry.target as HTMLElement;
        if (el.matches('h2')) {
          animateHeadingBlock(el);
        } else if (el.classList.contains('sticker-card')) {
          gsap.fromTo(
            el,
            { y: 16 },
            {
              y: 0,
              duration: 0.42,
              ease: 'power2.out',
              clearProps: 'transform',
            },
          );
        }
      });
    },
    { threshold: 0.05 },
  );

  activeObserver = observer;

  document.querySelectorAll<HTMLElement>('main section h2').forEach((h2) => {
    if (h2.dataset.tensuraAnimated !== '1') {
      observer.observe(h2);
    }
  });

  document.querySelectorAll<HTMLElement>('.sticker-card').forEach((card) => {
    if (card.dataset.gsapInit !== '1') {
      card.dataset.gsapInit = '1';
      observer.observe(card);
    }
  });
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
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }
    if (activeLenis) {
      activeLenis.destroy();
      activeLenis = null;
    }
  });

  document.addEventListener('astro:page-load', () => {
    void runPageEffects();
  });

  if (document.readyState !== 'loading') {
    void runPageEffects();
  }
}
