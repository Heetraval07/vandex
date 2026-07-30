import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Clock3, Globe2, PackageCheck } from 'lucide-react';
import { Seo, organizationSchema, websiteSchema, localBusinessSchema } from '../lib/seo';
import { prefersReduced } from '../lib/motion';
import { Preloader, SplitReveal } from '../lib/fx';
import { BtnPrimary, BtnGhost, Reveal, CtaBand } from '../components/ui';
import { products } from '../data/products';
import { services } from '../data/content';

/* Lightweight static gold visual: always-present base, shown until the
   hero video is ready (and the sole background on reduced-motion / save-data). */
function HeroFallback() {
  return (
    <div className="absolute inset-0 egrid">
      <div className="absolute left-1/2 top-1/2 h-[72vmin] w-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,.20),transparent_62%)] blur-2xl" />
      <div className="absolute left-1/2 top-1/2 h-[52vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2DD4BF]/20" />
      <div className="absolute left-1/2 top-1/2 h-[38vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B929C]/10" />
    </div>
  );
}

function FrameCounter() {
  const [n, setN] = useState(42);
  useEffect(() => {
    if (prefersReduced()) return;
    const t = setInterval(() => setN((v) => (v + 1) % 10000), 90);
    return () => clearInterval(t);
  }, []);
  return <span>TIMELAPSE · FRAME {String(n).padStart(4, '0')}</span>;
}

/* ================= HERO ================= */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (prefersReduced()) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    setShowVideo(true);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={ref} className="dark-scope relative h-[100svh] overflow-hidden noise">
      {/* background: static gold base fading into the looping hero video */}
      <motion.div style={{ scale }} className="absolute inset-0" aria-hidden>
        <HeroFallback />
        {showVideo && (
          <video
            muted loop playsInline preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-navy/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/80 to-transparent" />
      </motion.div>

      {/* copy */}
      <motion.div style={{ y: yText, opacity }} className="relative z-10 mx-auto flex h-full max-w-[88rem] flex-col justify-end px-6 pb-24 md:pb-28">
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
          className="plate mb-6">Aircraft parts supply · Dubai, UAE</motion.p>
        <h1 className="max-w-5xl font-display font-semibold tracking-tight leading-[0.92] text-[13.5vw] text-light sm:text-7xl md:text-[6.8rem]">
          {['Every part', 'traceable.'].map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span className={`block ${li === 1 ? 'grad-gold' : ''}`}
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25 + li * 0.12, ease: [0.76, 0, 0.24, 1] }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-silver/85">
          VANDEX sources, certifies, and delivers aircraft spare parts for airlines, MROs, and operators,
          with complete documentation on every shipment and AOG requests prioritized around the clock.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-5">
          <BtnPrimary to="/request-a-quote">Request a quote</BtnPrimary>
          <span className="ml-2 inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            AOG DESK: LIVE 24/7
          </span>
        </motion.div>
      </motion.div>

      {/* data rail */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-8 text-right font-mono text-[10px] tracking-[0.2em] text-muted/70 xl:flex" aria-hidden>
        <span>25.19°N 55.27°E</span><span>GST +04:00</span><span>ASA-100 · ISO 9001</span><FrameCounter />
      </div>

      {/* scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2" aria-hidden>
        <div className="h-12 w-px overflow-hidden bg-line">
          <motion.span className="block h-4 w-px bg-sky" animate={{ y: [-16, 48] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ================= TRUST BAR: company value props ================= */
function TrustBar() {
  const items = [
    'ASA-100 aligned quality system',
    '24/7 AOG desk',
    'Full traceability on every part',
    'Dubai hub, worldwide delivery',
    'One counterparty, sourcing to delivery',
  ];
  return (
    <div className="border-y border-line/50 bg-navy-2/40 py-5">
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6">
        {items.map((it) => (
          <span key={it} className="flex items-center gap-2.5 text-[13px] font-medium text-silver">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-sky" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= WIREFRAME STORY: draw-on-view airframe ================= */
const wfDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1, opacity: 0.7,
    transition: { pathLength: { duration: 1.6, ease: 'easeInOut', delay: i * 0.18 }, opacity: { duration: 0.3, delay: i * 0.18 } },
  }),
};
const wfFade: Variants = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 0.3, transition: { duration: 0.8, delay: 0.3 + i * 0.15 } }),
};
const AIRFRAME = 'M200 28 C208 28 212 44 212 72 L212 150 L366 236 L366 260 L212 214 L212 300 L252 336 L252 354 L200 340 L148 354 L148 336 L188 300 L188 214 L34 260 L34 236 L188 150 L188 72 C188 44 192 28 200 28 Z';
function WireframeStory() {
  const labels = [
    { pos: 'left-[3%] top-[21%]', node: [200, 92], t: 'ATA 22–34', s: 'Avionics & instruments' },
    { pos: 'right-[2%] top-[39%]', node: [212, 190], t: 'ATA 51–57', s: 'Airframe & structures' },
    { pos: 'left-[5%] bottom-[27%]', node: [150, 250], t: 'ATA 70–80', s: 'Powerplant & engine' },
    { pos: 'right-[5%] bottom-[13%]', node: [200, 302], t: 'ATA 32', s: 'Landing gear systems' },
  ];
  return (
    <section className="dark-scope relative overflow-hidden bg-navy egrid noise py-24 md:py-32">
      <div className="relative z-10 px-6 text-center">
        <p className="plate mb-4">The aircraft, part by part</p>
        <SplitReveal className="mx-auto max-w-3xl text-4xl md:text-6xl font-semibold leading-[0.98] tracking-tight text-light">
          Every chapter of the airframe. One supply channel.
        </SplitReveal>
      </div>

      <div className="relative mx-auto mt-10 aspect-square w-[82vmin] max-w-[560px] md:mt-4">
        {/* glow */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,.18),transparent_66%)] blur-2xl" />
        {/* scan sweep */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[14%] h-px bg-gradient-to-r from-transparent via-[#2DD4BF]/70 to-transparent motion-safe:animate-[scanline_5.5s_ease-in-out_infinite]" />

        <motion.svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none" aria-hidden
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-12%' }}>
          <defs>
            <linearGradient id="vxFuse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E7EAEE" /><stop offset="0.55" stopColor="#AEB4BD" /><stop offset="1" stopColor="#5E656E" />
            </linearGradient>
          </defs>

          {/* rotating orbit rings */}
          <g className="motion-safe:animate-[sweep_70s_linear_infinite]" style={{ transformBox: 'view-box', transformOrigin: '200px 205px' }}>
            <motion.circle variants={wfFade} custom={0} cx="200" cy="205" r="176" stroke="#8B929C" strokeWidth="0.6" strokeDasharray="2 12" />
            <circle cx="200" cy="205" r="128" stroke="#2DD4BF" strokeOpacity="0.28" strokeWidth="0.6" strokeDasharray="1 15" />
          </g>
          <g className="motion-safe:animate-[sweep_50s_linear_infinite_reverse]" style={{ transformBox: 'view-box', transformOrigin: '200px 205px' }}>
            <motion.circle variants={wfFade} custom={1} cx="200" cy="205" r="150" stroke="#8B929C" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="1 9" />
          </g>

          {/* soft under-glow of the airframe */}
          <path d={AIRFRAME} stroke="#2DD4BF" strokeWidth="5" strokeOpacity="0.12" strokeLinejoin="round" />
          {/* airframe */}
          <motion.path variants={wfDraw} custom={0} d={AIRFRAME} stroke="url(#vxFuse)" strokeWidth="1.4" strokeLinejoin="round" />
          {/* centreline + datum */}
          <motion.line variants={wfDraw} custom={1} x1="200" y1="30" x2="200" y2="352" stroke="#2DD4BF" strokeWidth="0.6" strokeDasharray="3 5" />
          <motion.line variants={wfDraw} custom={2} x1="34" y1="248" x2="366" y2="248" stroke="#2DD4BF" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="2 8" />
          {/* engine pods */}
          <motion.ellipse variants={wfFade} custom={2} cx="150" cy="212" rx="7" ry="17" stroke="#2DD4BF" strokeWidth="1.1" />
          <motion.ellipse variants={wfFade} custom={2} cx="250" cy="212" rx="7" ry="17" stroke="#2DD4BF" strokeWidth="1.1" />

          {/* pulsing ATA nodes */}
          {labels.map((l) => (
            <g key={l.t}>
              <circle cx={l.node[0]} cy={l.node[1]} r="7" fill="#2DD4BF" opacity="0.2"
                className="motion-safe:animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              <circle cx={l.node[0]} cy={l.node[1]} r="2.6" fill="#C9A227" />
              <circle cx={l.node[0]} cy={l.node[1]} r="5" fill="none" stroke="#2DD4BF" strokeWidth="0.7" strokeOpacity="0.6" />
            </g>
          ))}
        </motion.svg>

        {/* labels */}
        {labels.map((l, i) => (
          <Reveal key={l.t} delay={i} className={`absolute ${l.pos} hidden md:block`}>
            <div className="glass px-4 py-3">
              <p className="font-mono text-[10px] tracking-[0.2em] text-sky">{l.t}</p>
              <p className="mt-1 text-sm text-silver">{l.s}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= PRODUCT SHOWCASE: tilt + spotlight cards ================= */
function TiltCard({ p, i }: { p: (typeof products)[number]; i: number }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - b.left) / b.width - 0.5) * 10);
    rx.set(-((e.clientY - b.top) / b.height - 0.5) * 10);
  };
  const reset = () => { rx.set(0); ry.set(0); };
  return (
    <Reveal delay={i % 3}>
      <motion.article onMouseMove={onMove} onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        className="card-hover group relative h-full overflow-hidden border border-line/70 bg-navy-2/50 p-7 will-change-transform">
        <div aria-hidden className="absolute inset-0 egrid egrid-fine opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative">
          <p className="font-mono text-[10px] tracking-[0.22em] text-sky">{p.ata}</p>
          <h3 className="mt-3 text-xl font-semibold text-light">{p.name}</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{p.tagline}</p>
          {/* spec sheet slides in: visible on mobile, hover on desktop */}
          <ul className="mt-5 space-y-1.5 max-h-40 opacity-100 transition-all duration-500 md:max-h-0 md:opacity-0 md:group-hover:max-h-40 md:group-hover:opacity-100">
            {p.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-center gap-2 font-mono text-[10.5px] tracking-wide text-silver/80">
                <span className="h-px w-3 bg-orange" />{f}
              </li>
            ))}
          </ul>
          <Link to={`/aircraft-parts#${p.slug}`} data-cursor className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-silver transition-colors md:group-hover:text-sky">
            View line <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.article>
    </Reveal>
  );
}
function ProductShowcase() {
  return (
    <section className="relative py-24 md:py-36 bg-navy-2/30 noise">
      <div className="mx-auto max-w-[80rem] px-6">
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-end justify-between gap-6 sm:gap-8 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <p className="plate mb-5">Product lines</p>
            <SplitReveal className="text-4xl md:text-6xl font-semibold leading-[0.98] tracking-tight">
              Indexed by ATA. Certified at source.
            </SplitReveal>
          </div>
          <BtnGhost to="/aircraft-parts">Full catalog</BtnGhost>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p, i) => <TiltCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ================= SERVICES STRIP: interactive hover list ================= */
function ServicesStrip() {
  return (
    <section className="relative py-24 md:py-32 noise">
      <div className="mx-auto max-w-[80rem] px-6">
        <div className="mb-14 flex flex-col sm:flex-row sm:flex-wrap items-end justify-between gap-6 sm:gap-8 md:mb-20">
          <div className="max-w-2xl">
            <p className="plate mb-5">Services</p>
            <SplitReveal className="text-4xl md:text-6xl font-semibold leading-[0.98] tracking-tight">
              One desk. Nine disciplines.
            </SplitReveal>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">
              Procurement, sourcing, AOG, logistics, and documentation, run as a single accountable service.
            </p>
          </div>
          <BtnGhost to="/supply-solutions">All nine services</BtnGhost>
        </div>

        <div className="border-t border-line/60">
          {services.slice(0, 5).map((s, i) => {
            const aog = s.slug === 'aog-support';
            return (
              <Reveal key={s.slug} delay={i % 3}>
                <Link to={`/supply-solutions#${s.slug}`} data-cursor
                  className="group relative flex items-center gap-5 overflow-hidden border-b border-line/60 py-7 md:gap-10 md:py-8">
                  {/* hover wash */}
                  <span aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${aog ? 'from-orange/[0.09]' : 'from-sky/[0.07]'}`} />
                  {/* index */}
                  <span className={`relative font-mono text-[12px] tracking-[0.2em] transition-colors ${aog ? 'text-orange/80 group-hover:text-orange' : 'text-muted group-hover:text-sky'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* icon */}
                  <span className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border text-muted transition-all duration-300 group-hover:scale-105 md:h-14 md:w-14 ${aog ? 'border-orange/30 group-hover:border-orange/70 group-hover:text-orange' : 'border-line group-hover:border-sky/60 group-hover:text-sky'}`}>
                    <s.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                  {/* copy */}
                  <div className="relative min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-silver transition-colors group-hover:text-light md:text-3xl">{s.name}</h3>
                      {aog && <span className="shrink-0 rounded-full border border-orange/40 bg-orange/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-orange">24/7</span>}
                    </div>
                    <p className="mt-1.5 truncate text-[13.5px] leading-relaxed text-muted md:whitespace-normal">{s.short}</p>
                  </div>
                  {/* arrow */}
                  <ArrowUpRight className={`relative hidden h-6 w-6 shrink-0 text-line transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:block ${aog ? 'group-hover:text-orange' : 'group-hover:text-sky'}`} />
                  {/* growing underline */}
                  <span aria-hidden className={`absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full ${aog ? 'bg-orange' : 'bg-sky'}`} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= QUALITY ================= */
function Quality() {
  return (
    <section className="relative overflow-hidden py-24 md:py-36 bg-navy-2/30 noise">
      <div className="mx-auto max-w-[80rem] px-6 grid gap-14 lg:grid-cols-2 items-center">
        <div>
          <p className="plate plate-orange mb-5">Quality & traceability</p>
          <SplitReveal className="text-4xl md:text-6xl font-semibold leading-[0.98] tracking-tight">
            Paperwork is the product.
          </SplitReveal>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">
            A part without its release certificate is scrap metal. Every VANDEX shipment carries verified trace,
            an FAA 8130-3 or EASA Form 1 where applicable, and an inspection record you can audit.
          </p>
          <ul className="mt-9 space-y-4">
            {[
              [ShieldCheck, 'ASA-100 aligned quality system, audited annually'],
              [PackageCheck, 'Incoming inspection with photo documentation'],
              [Clock3, 'Certificate review before quotation, not after'],
              [Globe2, 'EASA, FAA, and GCAA operator acceptance'],
            ].map(([Icon, t], i) => (
              <Reveal key={i} delay={i}>
                <li className="flex items-center gap-4 text-[14.5px] text-silver">
                  <Icon className="h-5 w-5 shrink-0 text-sky" />{t as string}
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10"><BtnPrimary to="/company">More about VANDEX</BtnPrimary></div>
        </div>
        {/* release record plate */}
        <Reveal className="relative">
          <div aria-hidden className="absolute -inset-6 egrid egrid-fine opacity-40" />
          <div className="glass relative p-7 md:p-9 font-mono text-[12px] leading-relaxed text-silver/90">
            <div className="flex items-center justify-between border-b border-line/70 pb-4">
              <span className="tracking-[0.22em] text-sky">AUTHORIZED RELEASE RECORD</span>
              <span className="text-muted">SAMPLE</span>
            </div>
            {[
              ['FORM', 'FAA 8130-3 / EASA FORM 1'],
              ['PART NO', 'VX-2810-114-01'],
              ['DESCRIPTION', 'ACTUATOR, TRIM, HORIZ STAB'],
              ['S/N', 'SN-88213'],
              ['CONDITION', 'OVERHAULED'],
              ['TRACE', '121 OPERATOR · BACK-TO-BIRTH'],
              ['STATUS', 'AIRWORTHY, RELEASED'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 border-b border-line/40 py-3">
                <span className="text-muted">{k}</span>
                <span className={k === 'STATUS' ? 'text-orange' : ''}>{v}</span>
              </div>
            ))}
            <div className="pt-4 text-muted/70">VERIFIED · VANDEX QA · DXB</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */
export default function Home() {
  return (
    <>
      <Seo
        title="VANDEX: Aircraft Spare Parts Supplier in Dubai, UAE"
        description="VANDEX supplies certified aircraft spare parts, components, and AOG support from Dubai, serving airlines, MROs, and operators across 40+ countries with full traceability."
        path="/"
        schema={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
      />
      <Preloader />
      <Hero />
      <TrustBar />
      <WireframeStory />
      <ProductShowcase />
      <ServicesStrip />
      <Quality />
      <CtaBand />
    </>
  );
}
