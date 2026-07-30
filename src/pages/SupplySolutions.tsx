import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo';
import { services, serviceBySlug, type Service } from '../data/content';
import { PageHero, Reveal, SectionHead, BtnPrimary, BtnGhost, FaqList } from '../components/ui';

const commitments = [
  ['AOG quotation', 'Target 2 hours, 24/7/365'],
  ['Standard quotation', 'Within business hours, same day'],
  ['Documentation', 'Issued with the quotation, before purchase'],
  ['Desk hours', 'Sun–Fri 08:30–18:00 GST · AOG 24/7'],
];

const aogSteps = [
  ['Call or submit', 'AOG line or priority form, 24/7/365'],
  ['Sourced immediately', 'Network checked first, then partners worldwide'],
  ['Quoted fast', 'Price, condition, documentation, and ETA, target 2 hours'],
  ['Moving same day', 'Booked, packed, and tendered on approval'],
  ['Tracked to the gate', 'Direct contact until the part is signed for'],
];

const faqs = [
  { q: 'What does AOG mean?', a: 'AOG stands for Aircraft on Ground: an aircraft that cannot fly until a defect is rectified, usually because a required part is unavailable. AOG requests take priority over all other work in our supply chain because every hour has a direct, measurable cost to the operator.' },
  { q: 'How does consignment stock work commercially?', a: 'VANDEX funds and manages the inventory. It can be held at your facility or reserved for you within our network, with stock levels reviewed against actual usage so slow-moving items are removed rather than left in place.' },
  { q: 'Can you manage repairs on components you did not supply?', a: 'Yes. Repair management is offered independently of parts supply. We route to approved facilities, control cost and turnaround, and return the unit with complete release documentation.' },
  { q: 'Do you handle dangerous goods shipments?', a: 'Yes. Batteries, oxygen generators, chemicals, and other regulated items are packed, declared, and labelled to IATA Dangerous Goods Regulations by trained staff.' },
  { q: 'Do you work with airlines, MROs, and operators directly, or only through brokers?', a: 'Directly. VANDEX is the counterparty on every transaction. Sourcing, quality, logistics, and documentation stay under one accountable desk regardless of your fleet size.' },
];

/* ================= SERVICES EXPLORER: one capability in view at a time ================= */
function ServicesExplorer({ list }: { list: Service[] }) {
  const { hash } = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // deep link: /supply-solutions#worldwide-logistics (Home strip, footer, legacy /services/:slug)
  useEffect(() => {
    const slug = hash.replace('#', '');
    const idx = list.findIndex((s) => s.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start' }));
    }
  }, [hash, list]);

  const s = list[active];

  return (
    <section ref={sectionRef} id="capabilities" className="scroll-mt-24 relative py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6">
        <SectionHead plate="Beyond the AOG desk" title="The full supply chain, one desk"
          text="Eight capabilities that keep fleets supplied between emergencies. Select one to see how it works." />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          {/* desktop rail */}
          <div className="hidden lg:block">
            <ul>
              {list.map((c, i) => (
                <li key={c.slug}>
                  <button onClick={() => setActive(i)} data-cursor
                    className={`group flex w-full items-center gap-4 border-l-2 py-4 pl-5 pr-3 text-left transition-all duration-300 ${
                      i === active ? 'border-sky bg-navy-3/50' : 'border-line/40 hover:border-line hover:bg-navy-3/20'}`}>
                    <c.icon className={`h-5 w-5 shrink-0 transition-colors ${i === active ? 'text-sky' : 'text-muted group-hover:text-silver'}`} />
                    <span className={`text-[15px] font-semibold transition-colors ${i === active ? 'text-light' : 'text-silver group-hover:text-light'}`}>{c.name}</span>
                    <ArrowRight className={`ml-auto h-4 w-4 shrink-0 text-sky transition-all duration-300 ${i === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* mobile tab strip */}
          <div className="-mx-6 overflow-x-auto px-6 lg:hidden">
            <div className="flex gap-2.5 pb-1">
              {list.map((c, i) => (
                <button key={c.slug} onClick={() => setActive(i)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    i === active ? 'border-sky/60 bg-sky/10 text-light' : 'border-line text-muted'}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* detail panel */}
          <div className="relative lg:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.article key={s.slug}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-navy-3/40 text-sky"><s.icon className="h-5 w-5" /></span>
                  <span className="ml-auto font-mono text-[11px] tracking-[0.15em] text-muted">{String(active + 1).padStart(2, '0')} / {list.length}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{s.name}</h3>
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{s.description}</p>

                <div className="mt-10">
                  <p className="plate mb-5">Inside the service</p>
                  <ul className="grid gap-3.5 sm:grid-cols-2">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-sm text-light/85">
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" />{pt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12"><BtnPrimary to="/request-a-quote">Talk to the team</BtnPrimary></div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SupplySolutions() {
  const aog = serviceBySlug('aog-support')!;
  const others = services.filter((s) => s.slug !== 'aog-support');

  return (
    <>
      <Seo
        title="AOG Support & Aircraft Parts Supply Solutions"
        description="24/7 AOG support, global procurement, repair management, inventory and consignment programs, worldwide logistics, and vendor-managed sourcing: aviation supply solutions from Dubai, UAE."
        path="/supply-solutions"
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Supply Solutions', path: '/supply-solutions' }]),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        plate="Supply solutions"
        title="Aviation supply solutions, built around the aircraft"
        text="From a 24/7 AOG desk to managed consignment stock, our services answer one question: how quickly can this aircraft return to service?"
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Supply Solutions', path: '/supply-solutions' }]}
      />

      {/* AOG: hero-weight standout */}
      <section id={aog.slug} className="scroll-mt-24 relative overflow-hidden border-y border-orange/20 bg-navy-2/50 py-24 md:py-28 noise">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-orange/[0.07] blur-[130px]" />
        <div className="relative mx-auto max-w-[80rem] px-6">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 border border-orange/40 bg-orange/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-orange">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
                </span>
                24/7 · Priority desk
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">{aog.name}</h2>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted">{aog.description}</p>
              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {aog.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[14.5px] text-light/85">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange" />{pt}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="tel:+97140000000" data-cursor
                  className="group inline-flex items-center gap-3 bg-orange px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange/85">
                  <PhoneCall className="h-4 w-4" /> Call AOG: +971 4 000 0000
                </a>
                <BtnGhost to="/request-a-quote">Submit an AOG request</BtnGhost>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="glass rounded-3xl p-8 md:p-9">
                <p className="plate plate-orange mb-7">How AOG works</p>
                <ol className="space-y-6">
                  {aogSteps.map(([t, d], i) => (
                    <li key={t} className="flex gap-4">
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-orange/40 font-mono text-[11px] text-orange">{String(i + 1).padStart(2, '0')}</span>
                      <div><p className="font-semibold text-light">{t}</p><p className="mt-1 text-sm leading-relaxed text-muted">{d}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the rest of the supply chain: interactive explorer */}
      <ServicesExplorer list={others} />

      {/* service commitments: premium divider grid */}
      <section className="border-y border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <SectionHead plate="What we commit to" title="Service commitments" />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map(([k, v]) => (
              <div key={k} className="bg-navy p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky">{k}</p>
                <p className="mt-3 text-[17px] font-semibold leading-snug text-light">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHead plate="Common questions" title="Supply solutions, answered" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* closing AOG CTA */}
      <section className="relative overflow-hidden border-t border-line/50 py-24 md:py-28 noise">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <Reveal>
            <p className="plate plate-orange mb-6">Tell us what&apos;s grounded</p>
            <h2 className="text-4xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
              AOG requests get a desk, not a queue.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <a href="tel:+97140000000" data-cursor className="group inline-flex items-center gap-3 bg-orange px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange/85">
                <PhoneCall className="h-4 w-4" /> Call AOG Support
              </a>
              <BtnPrimary to="/request-a-quote">Request a quote</BtnPrimary>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
