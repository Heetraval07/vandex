import { createElement, useEffect, useRef, useState, type ReactNode, type ElementType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitType from 'split-type';
import { gsap, ScrollTrigger, prefersReduced } from './motion';

/* ---------- cursor-following gold spotlight for .card-hover ----------
   One delegated listener retrofits every card; rAF-throttled, desktop only. */
export function SpotlightCards() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    let el: HTMLElement | null = null;
    let x = 0, y = 0;
    const apply = () => {
      raf = 0;
      if (el) { el.style.setProperty('--mx', `${x}px`); el.style.setProperty('--my', `${y}px`); }
    };
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest?.('.card-hover') as HTMLElement | null;
      el = card;
      if (!card) return;
      const r = card.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return null;
}

/* ---------- custom cursor ---------- */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced() || !window.matchMedia('(pointer: fine)').matches) return;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    if (mem <= 4 || cores <= 4 || window.innerWidth < 1024) return;
    const d = dot.current!, r = ring.current!;
    d.style.display = 'block'; r.style.display = 'block';
    const qd = { x: gsap.quickTo(d, 'x', { duration: 0.12 }), y: gsap.quickTo(d, 'y', { duration: 0.12 }) };
    const qr = { x: gsap.quickTo(r, 'x', { duration: 0.4, ease: 'power3' }), y: gsap.quickTo(r, 'y', { duration: 0.4, ease: 'power3' }) };
    const move = (e: MouseEvent) => {
      qd.x(e.clientX - 3); qd.y(e.clientY - 3);
      qr.x(e.clientX - 18); qr.y(e.clientY - 18);
      const t = (e.target as HTMLElement).closest('a,button,[data-cursor]');
      r.classList.toggle('is-hover', !!t);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (<><div ref={dot} className="cursor-dot" style={{ display: 'none' }} /><div ref={ring} className="cursor-ring" style={{ display: 'none' }} /></>);
}

/* ---------- magnetic wrapper ---------- */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReduced()) return;
    const el = ref.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1,0.4)' });
    const move = (e: MouseEvent) => {
      const b = el.getBoundingClientRect();
      xTo((e.clientX - (b.left + b.width / 2)) * strength);
      yTo((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={className} style={{ display: 'inline-block' }}>{children}</div>;
}

/* ---------- split-text scroll reveal ---------- */
export function SplitReveal({ as: Tag = 'h2', children, className, once = true }:
  { as?: ElementType; children: string; className?: string; once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (prefersReduced()) return;
    const split = new SplitType(el as HTMLElement, { types: 'lines,words' });
    gsap.set(split.lines, { overflow: 'hidden' });
    const tween = gsap.fromTo(split.words, { yPercent: 110 }, {
      yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.03,
      scrollTrigger: { trigger: el, start: 'top 85%', once },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); split.revert(); };
  }, [children, once]);
  return createElement(Tag, { ref, className }, children);
}

/* ---------- preloader ---------- */
export function Preloader() {
  const [done, setDone] = useState(() => sessionStorage.getItem('vx-loaded') === '1');
  const [n, setN] = useState(0);
  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setN(v => {
      const next = Math.min(100, v + Math.ceil(Math.random() * 16));
      if (next === 100) { clearInterval(t); setTimeout(() => { sessionStorage.setItem('vx-loaded', '1'); setDone(true); }, 200); }
      return next;
    }), 28);
    return () => clearInterval(t);
  }, [done]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[10000] bg-navy flex items-end justify-between p-8 md:p-14"
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }} aria-hidden>
          <div>
            <div className="plate mb-3">VANDEX · Dubai · UAE</div>
            <div className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-silver">
              Aircraft parts.<br />Engineered supply.
            </div>
          </div>
          <div className="font-display font-semibold text-[18vw] leading-none text-navy-3 select-none tabular-nums">{n}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { ScrollTrigger };
