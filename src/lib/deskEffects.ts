import type { RoughAnnotationType } from 'rough-notation/lib/model';

let activeLenis: { destroy: () => void } | null = null;
let listenersBound = false;
let cleanupScrollTriggers: (() => void) | null = null;

async function runPageEffects() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Bersihkan ScrollTrigger halaman sebelumnya sebelum inisialisasi ulang
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

  // 2. GSAP + ScrollTrigger (ala reveal dinamis web Tensura saat scroll ke bawah)
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

  // 4. Reveal judul section saat discroll ke bawah (seperti "NEWS 新着情報" di web Tensura)
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
  sections.forEach((sec) => {
    // Lewati hero paling atas agar LCP tetap instan
    if (sec.querySelector('#hero-heading')) return;

    const heading = sec.querySelector<HTMLElement>('h2');
    if (heading && heading.dataset.tensuraInit !== '1') {
      heading.dataset.tensuraInit = '1';
      const headerBlock = heading.parentElement;
      const badge = headerBlock?.querySelector<HTMLElement>('span');
      const sub = headerBlock?.querySelector<HTMLElement>('p');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          once: true,
        },
      });

      if (badge) {
        tl.from(badge, {
          x: -20,
          scale: 0.85,
          opacity: 0,
          duration: 0.42,
          ease: 'back.out(1.8)',
          clearProps: 'opacity,transform',
        });
      }

      tl.from(
        heading,
        {
          y: 22,
          x: -14,
          opacity: 0,
          duration: 0.52,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        },
        badge ? '-=0.25' : 0,
      );

      if (sub) {
        tl.from(
          sub,
          {
            y: 12,
            opacity: 0,
            duration: 0.42,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
          },
          '-=0.3',
        );
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    }

    // 5. Reveal kartu (.sticker-card) secara bertahap saat masuk viewport scroll
    const secCards = Array.from(sec.querySelectorAll<HTMLElement>('.sticker-card')).filter(
      (c) => c.dataset.gsapInit !== '1',
    );
    if (secCards.length > 0) {
      secCards.forEach((c) => {
        c.dataset.gsapInit = '1';
      });
      const tween = gsap.from(secCards, {
        y: 26,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: secCards[0],
          start: 'top 90%',
          once: true,
        },
      });
      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    }
  });

  // Kartu hero paling atas (langsung tampil halus tanpa menunggu scroll)
  const heroCards = Array.from(document.querySelectorAll<HTMLElement>('.sticker-card')).filter(
    (c) => c.dataset.gsapInit !== '1',
  );
  if (heroCards.length > 0) {
    heroCards.forEach((c) => {
      c.dataset.gsapInit = '1';
    });
    gsap.from(heroCards, {
      y: 14,
      opacity: 0,
      duration: 0.45,
      stagger: 0.06,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
    });
  }

  cleanupScrollTriggers = () => {
    triggers.forEach((st) => st.kill());
  };
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
