import { type ReactNode, useEffect, useRef, useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useScroll } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { fadeUp } from '../lib/motion';
import { Magnetic } from '../lib/fx';
import logoUrl from '../assets/vandex-logo-header.png';

/* ---------- Logo: VANDEX gold V-mark + wordmark lockup ---------- */
export function Logo({ className = 'h-10' }: { className?: string }) {
  return (
    <img src={logoUrl} alt="VANDEX" className={`${className} w-auto select-none`} draggable={false} />
  );
}

/* ---------- Scroll progress ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-silver via-sky to-orange"
      style={{ scaleX: scrollYProgress }} aria-hidden="true" />
  );
}

/* ---------- Reveal ---------- */
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={delay} initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0 }}>
      {children}
    </motion.div>
  );
}

/* ---------- FAQ accordion: collapsed by default, expands on click ---------- */
export function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className="glass rounded-2xl">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={panelId} data-cursor
        className="flex w-full items-center justify-between gap-6 p-7 text-left">
        <h3 className="font-semibold text-light">{q}</h3>
        <span aria-hidden className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open ? 'rotate-45 border-sky/60 text-sky' : 'border-line text-muted'}`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="panel" id={panelId} role="region"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }, opacity: { duration: 0.25 } }}
            className="overflow-hidden">
            <p className="px-7 pb-7 text-[14.5px] leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((f) => (
        <Reveal key={f.q}><FaqItem q={f.q} a={f.a} /></Reveal>
      ))}
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({ plate, title, text, center = false }:
  { plate: string; title: string; text?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} mb-14 md:mb-20`}>
      <p className="plate mb-5">{plate}</p>
      <h2 className="text-4xl md:text-6xl leading-[0.98] font-semibold tracking-tight text-light">{title}</h2>
      {text && <p className="mt-6 text-[15px] leading-relaxed text-muted max-w-xl">{text}</p>}
    </Reveal>
  );
}

/* ---------- Counter ---------- */
export function Counter({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  useEffect(() => spring.on('change', (v) => {
    if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix;
  }), [spring, suffix]);
  return (
    <div>
      <span ref={ref} className="font-display text-5xl md:text-6xl font-semibold grad-text tabular-nums">0{suffix}</span>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </div>
  );
}

/* ---------- Buttons: engineered block with orange sweep ---------- */
export function BtnPrimary({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Magnetic>
      <Link to={to} data-cursor
        className="group relative inline-flex items-center gap-3 overflow-hidden bg-light px-8 py-4 text-sm font-semibold text-navy transition-colors duration-300">
        <span aria-hidden className="absolute inset-0 -translate-x-full bg-orange transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-x-0" />
        <span className="relative z-10 transition-colors duration-300 group-hover:text-white">{children}</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
      </Link>
    </Magnetic>
  );
}
export function BtnGhost({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Magnetic>
      <Link to={to} data-cursor
        className="group inline-flex items-center gap-3 border border-line px-8 py-4 text-sm font-semibold text-silver transition-colors duration-300 hover:border-sky/60 hover:text-sky">
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Magnetic>
  );
}

/* ---------- Page hero (interior) ---------- */
export function PageHero({ plate, title, text, crumbs }:
  { plate: string; title: string; text?: string; crumbs?: { name: string; path: string }[] }) {
  return (
    <header className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28 noise">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* ambient glows */}
        <div className="absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-sky/[0.07] blur-[170px]" />
        <div className="absolute -bottom-48 left-[-12%] h-[460px] w-[460px] rounded-full bg-blue/[0.06] blur-[160px]" />
        {/* faded dot texture */}
        <div className="absolute inset-0 dotgrid" />
        {/* radar rings: aviation motif, top-right */}
        <svg className="absolute -right-28 -top-32 h-[520px] w-[520px] text-sky/[0.12]" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" />
          <line x1="200" y1="4" x2="200" y2="396" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
          <line x1="4" y1="200" x2="396" y2="200" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 9" />
        </svg>
        {/* soft vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_38%,transparent_58%,rgba(0,0,0,0.38))]" />
        {/* top hairline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            {crumbs.map((c, i) => (
              <span key={c.path}>
                {i > 0 && <span className="mx-2 text-line">/</span>}
                {i < crumbs.length - 1 ? <Link className="hover:text-sky" to={c.path}>{c.name}</Link> : <span className="text-sky">{c.name}</span>}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          <p className="plate mb-5">{plate}</p>
          <h1 className="max-w-4xl text-5xl md:text-[5.2rem] font-semibold leading-[0.95] tracking-tight">{title}</h1>
          {text && <p className="mt-8 max-w-2xl text-muted leading-relaxed text-[15px]">{text}</p>}
        </Reveal>
      </div>
      <div className="contrail absolute bottom-0 left-0 right-0" />
    </header>
  );
}

/* ---------- Blueprint grid ---------- */
export function GridLines() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
      <defs>
        <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" fill="none" stroke="#8B929C" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

/* ---------- CTA band: oversized ---------- */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40 noise">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-x-0 top-1/2 h-[420px] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,.08),transparent_65%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <p className="plate plate-orange mb-6">Request for quotation</p>
          <h2 className="text-[11vw] md:text-[5.4rem] font-semibold leading-[0.95] tracking-tight">
            Send a part number.<br /><span className="grad-text">We handle the rest.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-muted">
            Quotes within hours. AOG response within minutes. One counterparty from sourcing to your stores.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <BtnPrimary to="/request-a-quote">Request a quote</BtnPrimary>
            <BtnGhost to="/supply-solutions#aog-support">24/7 AOG desk</BtnGhost>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
