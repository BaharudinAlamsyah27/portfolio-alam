import type { RoughAnnotationType } from 'rough-notation/lib/model';

let activeLenis: { destroy: () => void } | null = null;
let listenersBound = false;

async function runPageEffects() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

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

  // 2. Lenis smooth scroll
  if (activeLenis) {
    activeLenis.destroy();
    activeLenis = null;
  }
  const { default: Lenis } = await import('lenis');
  activeLenis = new Lenis({
    autoRaf: true,
    duration: 1.05,
  });

  // 3. GSAP subtle reveal pada sticker-card yang belum dianimasikan
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.sticker-card')).filter(
    (card) => card.dataset.gsapInit !== '1',
  );
  if (cards.length > 0) {
    cards.forEach((c) => {
      c.dataset.gsapInit = '1';
    });
    const { gsap } = await import('gsap');
    gsap.from(cards, {
      y: 14,
      opacity: 0,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
    });
  }
}

export function initDeskEffects() {
  if (listenersBound) return;
  listenersBound = true;

  // Delegated click handler untuk semua tombol pemicu Terminal Mode
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
    if (activeLenis) {
      activeLenis.destroy();
      activeLenis = null;
    }
  });

  document.addEventListener('astro:page-load', () => {
    void runPageEffects();
  });
}
