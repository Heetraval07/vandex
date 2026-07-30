import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, ArrowUpRight, ChevronDown, ChevronUp, Building2, Users2 } from 'lucide-react';
import { Linkedin, Instagram, Facebook, Whatsapp } from './socials';
import { Logo, ScrollProgress } from './ui';
import { SmoothScroll, ScrollToTop } from '../lib/motion';
import { CustomCursor, Magnetic, SpotlightCards } from '../lib/fx';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/aircraft-parts', label: 'Aircraft Parts' },
  { to: '/supply-solutions', label: 'Supply Solutions' },
  { to: '/company', label: 'Company' },
  { to: '/contact', label: 'Contact' },
  { to: '/request-a-quote', label: 'Request a Quote' },
];

/* Company dropdown: label opens the page, items jump to sections */
const companyMenu = [
  { to: '/company', name: 'About Us', caption: 'Who we are & why operators choose us', Icon: Building2 },
  { to: '/company#industries', name: 'Industries We Serve', caption: 'Airlines, MROs, charter, distributors', Icon: Users2 },
];

/* Only three social channels are live. */
const socials = [
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
];

export function Layout() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <ScrollProgress />
      <CustomCursor />
      <SpotlightCards />
      <RouteWipe />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-light focus:text-navy focus:px-5 focus:py-2.5 focus:text-sm">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <div className="h-14 lg:hidden" aria-hidden />
      <MobileActionBar />
      <FloatingContact />
    </SmoothScroll>
  );
}

/* Floating contact rail: call, email, WhatsApp, one tap from anywhere */
function FloatingContact() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 300);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const items = [
    { label: 'Call us', href: 'tel:+97140000000', Icon: Phone, cls: 'bg-[#2b3138] ring-1 ring-white/15 shadow-black/40', size: 'h-5 w-5', pulse: false },
    { label: 'Email us', href: 'mailto:info@vandex.ae', Icon: Mail, cls: 'bg-[#2AABEE] shadow-[0_10px_26px_-8px_rgba(42,171,238,.7)]', size: 'h-5 w-5', pulse: false },
    { label: 'WhatsApp us', href: 'https://wa.me/971521927376', Icon: Whatsapp, cls: 'bg-gradient-to-br from-[#2af06f] to-[#128C4B] shadow-[0_10px_28px_-6px_rgba(37,211,102,.75)]', size: 'h-7 w-7', pulse: true },
  ];
  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col items-center gap-3.5 sm:right-5 lg:bottom-6">
      {/* back to top: appears after scrolling, stays put */}
      <AnimatePresence>
        {showTop && (
          <motion.button key="to-top" type="button" aria-label="Back to top" data-cursor
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.5, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.5, y: 10 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="grid h-12 w-12 place-items-center rounded-full bg-light text-navy shadow-lg ring-1 ring-black/10 transition-transform duration-300 hover:scale-110">
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {items.map(({ label, href, Icon, cls, size, pulse }) => {
        const external = href.startsWith('http');
        return (
          <a key={label} href={href} aria-label={label} data-cursor
            target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
            className={`group relative grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 ${cls}`}>
            {pulse && <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" />}
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-line bg-navy-2 px-3 py-1.5 text-xs font-medium text-light opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:block">
              {label}
            </span>
            <Icon className={`relative ${size}`} />
          </a>
        );
      })}
    </div>
  );
}

/* Persistent mobile conversion bar: Call AOG + Request a Quote, always one tap away */
function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line/60 bg-navy-2 lg:hidden">
      <a href="tel:+97140000000" data-cursor
        className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-orange">
        <Phone className="h-4 w-4" /> Call AOG
      </a>
      <Link to="/request-a-quote" data-cursor
        className="flex items-center justify-center gap-2 bg-light py-4 text-sm font-semibold text-navy">
        Request quote <ArrowUpRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function RouteWipe() {
  const { pathname } = useLocation();
  const first = useRef(true);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setKey((k) => k + 1);
  }, [pathname]);
  if (key === 0) return null;
  return (
    <motion.div key={key} aria-hidden className="pointer-events-none fixed inset-0 z-[90] bg-navy-2"
      initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ transformOrigin: 'top' }} />
  );
}

const ease = [0.76, 0, 0.24, 1] as const;

/* Language switcher: English / Arabic (visual toggle only) */
function LangToggle() {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-line text-[11px] font-semibold">
      {(['EN', 'AR'] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} data-cursor aria-pressed={lang === l}
          className={`px-2.5 py-1 transition-colors ${lang === l ? 'bg-sky text-navy' : 'text-muted hover:text-light'}`}>
          {l}
        </button>
      ))}
    </div>
  );
}

interface MenuItem { to: string; name: string; caption: string; Icon: typeof Building2; aog?: boolean }

/* Primary-nav item with a hover/focus dropdown. The label itself still navigates. */
function NavDropdown({ to, label, menu, allLabel }: { to: string; label: string; menu: MenuItem[]; allLabel?: string }) {
  return (
    <div className="group relative">
      <NavLink to={to}
        className={({ isActive }) =>
          `relative flex items-center gap-1.5 py-1 text-[13px] font-medium tracking-wide transition-colors ${isActive ? 'text-sky' : 'text-light/70 group-hover:text-light'}`}>
        {({ isActive }) => (
          <>
            {label}
            <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-180" />
            <span className={`absolute -bottom-0.5 left-0 h-px bg-sky transition-all duration-400 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </>
        )}
      </NavLink>

      {/* pt-3 keeps a hover bridge so the panel doesn't close between label and menu */}
      <div className="invisible absolute left-1/2 top-full z-50 w-[21rem] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-2xl border border-line/70 bg-navy-2 p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,.85)]">
          {menu.map(({ to: href, name, caption, Icon, aog }) => (
            <Link key={href} to={href} data-cursor
              className={`group/it flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-navy-3/70 ${aog ? 'mb-1' : ''}`}>
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${aog ? 'border-orange/40 text-orange' : 'border-line text-sky group-hover/it:border-sky/50'}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-light">{name}</span>
                  {aog && <span className="rounded-full border border-orange/40 px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.14em] text-orange">24/7</span>}
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-muted">{caption}</span>
              </span>
            </Link>
          ))}
          {allLabel && (
            <>
              <div className="my-1 h-px bg-line/60" />
              <Link to={to} data-cursor
                className="group/all flex items-center justify-between rounded-xl px-3 py-2.5 text-[12px] font-medium text-silver transition-colors hover:bg-navy-3/70 hover:text-sky">
                {allLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => {
    // overflow:hidden alone does not block background scroll/bounce on iOS Safari,
    // so pin the body in place with position:fixed and restore the scroll offset on close.
    if (!open) return;
    const y = window.scrollY;
    const { style } = document.body;
    style.position = 'fixed';
    style.top = `-${y}px`;
    style.left = '0';
    style.right = '0';
    return () => {
      style.position = '';
      style.top = '';
      style.left = '';
      style.right = '';
      window.scrollTo(0, y);
    };
  }, [open]);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transform-gpu border-b backface-hidden transition-colors duration-500 ${scrolled ? 'border-line/60 bg-navy/90' : 'border-transparent bg-transparent'}`}>
        {/* top utility bar: contact + location + socials + language */}
        <div className={`hidden overflow-hidden border-b transition-all duration-500 lg:block ${scrolled ? 'max-h-0 border-transparent opacity-0' : 'max-h-12 border-line/30 opacity-100'}`}>
          <div className="mx-auto flex max-w-[80rem] items-center justify-between px-6 py-2.5 text-[12px]">
            <div className="flex items-center gap-6">
              <a href="tel:+97140000000" data-cursor className="flex items-center gap-2 text-silver transition-colors hover:text-sky">
                <Phone className="h-3.5 w-3.5 text-sky" /> +971 4 000 0000
              </a>
              <a href="mailto:info@vandex.ae" data-cursor className="flex items-center gap-2 text-silver transition-colors hover:text-sky">
                <Mail className="h-3.5 w-3.5 text-sky" /> info@vandex.ae
              </a>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-sky" /> Dubai, UAE</span>
              <span className="h-3.5 w-px bg-line" />
              <div className="flex items-center gap-3">
                {socials.map(({ Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} data-cursor className="text-muted transition-colors hover:text-sky">
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <span className="h-3.5 w-px bg-line" />
              <LangToggle />
            </div>
          </div>
        </div>

        {/* main nav row */}
        <div className={`mx-auto flex max-w-[80rem] items-center justify-between gap-6 px-6 transition-[padding] duration-500 ${scrolled ? 'py-3' : 'py-4'}`}>
          <Link to="/" aria-label="VANDEX home" data-cursor className="shrink-0">
            <Logo className={scrolled ? 'h-8' : 'h-10'} />
          </Link>

          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {nav.slice(1, -1).map((n) =>
              n.to === '/company'
                ? <NavDropdown key={n.to} to={n.to} label={n.label} menu={companyMenu} />
                : (
                  <NavLink key={n.to} to={n.to}
                    className={({ isActive }) =>
                      `group relative py-1 text-[13px] font-medium tracking-wide transition-colors ${isActive ? 'text-sky' : 'text-light/70 hover:text-light'}`}>
                    {({ isActive }) => (
                      <>
                        {n.label}
                        <span className={`absolute -bottom-0.5 left-0 h-px bg-sky transition-all duration-400 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </>
                    )}
                  </NavLink>
                ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Magnetic strength={0.35}>
              <Link to="/request-a-quote" data-cursor
                className="group relative inline-flex items-center gap-2 overflow-hidden bg-light px-5 py-2.5 text-[13px] font-semibold text-navy">
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-orange transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-x-0" />
                <span className="relative z-10 group-hover:text-white transition-colors">Request a quote</span>
              </Link>
            </Magnetic>
          </div>

          <button className="lg:hidden p-2 text-light" onClick={() => setOpen(true)} aria-label="Open menu" data-cursor><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[70] bg-navy-2 noise flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5">
              <Logo />
              <button className="p-2 text-light" onClick={() => setOpen(false)} aria-label="Close menu" data-cursor><X /></button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-0 py-4 px-6 sm:px-8 md:px-16" aria-label="Menu">
              {nav.map((n, i) => (
                <div key={n.to} className="overflow-hidden border-b border-line/40">
                  <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} exit={{ y: '110%' }}
                    transition={{ duration: 0.6, ease, delay: 0.04 * i }}>
                    <NavLink to={n.to} onClick={() => setOpen(false)} data-cursor
                      className={({ isActive }) =>
                        `group flex items-baseline gap-3 sm:gap-5 py-3 md:py-4 font-display text-2xl sm:text-4xl md:text-6xl font-semibold tracking-tight transition-colors ${isActive ? 'text-sky' : 'text-silver hover:text-light'}`}>
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted">{String(i + 1).padStart(2, '0')}</span>
                      {n.label}
                      <ArrowUpRight className="ml-auto h-6 w-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 text-sky" />
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </nav>
            <div className="space-y-5 px-6 sm:px-8 md:px-16 py-8">
              <div className="grid grid-cols-2 gap-3">
                <a href="tel:+97140000000" data-cursor
                  className="flex items-center justify-center gap-2 border border-orange/40 bg-orange/10 py-3.5 text-sm font-semibold text-orange">
                  <Phone className="h-4 w-4" /> Call AOG
                </a>
                <Link to="/request-a-quote" onClick={() => setOpen(false)} data-cursor
                  className="flex items-center justify-center gap-2 bg-light py-3.5 text-sm font-semibold text-navy">
                  Request a quote <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
                <span className="font-mono text-[11px] tracking-[0.2em]">DXB · AOG 24/7</span>
                <div className="flex items-center gap-4">
                  <a href="mailto:info@vandex.ae" className="hover:text-sky">info@vandex.ae</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-navy-2/60 noise">
      <div className="mx-auto max-w-[80rem] px-6 py-10 md:py-12">
        <div className="grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1.2fr]">
          {/* brand + trust badges + socials */}
          <div>
            <Logo className="h-9" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Certified aircraft spare parts and aviation components, supplied worldwide from Dubai, with verified
              documentation on every shipment and a 24/7 AOG desk.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} data-cursor
                  className="flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-sky hover:text-sky">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company" links={[
            ['Home', '/'],
            ['Aircraft Parts', '/aircraft-parts'],
            ['Supply Solutions', '/supply-solutions'],
            ['Company', '/company'],
            ['Contact', '/contact'],
            ['Request a Quote', '/request-a-quote'],
          ]} />

          <FooterCol title="Capabilities" links={[
            ['AOG Support 24/7', '/supply-solutions#aog-support'],
            ['Global Procurement', '/supply-solutions#global-procurement'],
            ['Aircraft Parts Sourcing', '/supply-solutions#parts-sourcing'],
            ['Worldwide Logistics', '/supply-solutions#worldwide-logistics'],
            ['Inventory Management', '/supply-solutions#inventory-management'],
            ['Export Documentation', '/supply-solutions#export-documentation'],
          ]} />

          <div>
            <h3 className="plate mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-muted">
              <li className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                </span>
                <a className="text-light hover:text-orange" href="tel:+97140000000">AOG 24/7: +971 4 000 0000</a>
              </li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-sky" /><a className="hover:text-light" href="tel:+97140000000">Sales: +971 4 000 0000</a></li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-sky" /><a className="hover:text-light" href="mailto:info@vandex.ae">info@vandex.ae</a></li>
            </ul>
          </div>
        </div>

        <div className="contrail my-6" />

        <div className="flex flex-col gap-4 text-[12px] text-muted/70 md:flex-row md:items-center md:justify-between">
          <p>© {year} VANDEX. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link className="hover:text-light" to="/privacy">Privacy policy</Link>
            <Link className="hover:text-light" to="/terms">Terms & conditions</Link>
            <Link className="hover:text-light" to="/company">Quality standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="plate mb-4">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map(([label, to]) => (
          <li key={to}><Link className="text-muted transition-colors hover:text-sky" to={to}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
