import { useLayoutEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Native scroll: the Lenis momentum layer was the main source of scroll lag.
   Kept as a passthrough so callers don't need to change. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  // useLayoutEffect (not useEffect): must run before the new page's Reveal/whileInView
  // observers set up, otherwise on iOS Safari they can observe the stale scroll position
  // from the previous page and never re-fire once we scroll back to top, leaving content
  // permanently invisible after client-side navigation.
  useLayoutEffect(() => {
    // Deep link / cross-page anchor (e.g. /supply-solutions#aog-support): the target
    // section may live inside a lazy page, so poll briefly until it mounts.
    if (hash) {
      let cancelled = false;
      const start = performance.now();
      const tick = () => {
        if (cancelled) return;
        const el = document.querySelector(hash);
        if (el) { el.scrollIntoView({ block: 'start' }); ScrollTrigger.refresh(); return; }
        if (performance.now() - start < 2000) setTimeout(tick, 50);
      };
      tick();
      return () => { cancelled = true; };
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    ScrollTrigger.refresh();
  }, [pathname, hash]);
  return null;
}

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] as const } }),
};
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
