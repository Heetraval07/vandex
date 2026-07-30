import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Wrench, ArrowRight, PackageSearch } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo';
import { products } from '../data/products';
import { PageHero, Reveal, SectionHead, CtaBand, BtnPrimary, FaqList } from '../components/ui';

const conditionCodes = [
  { code: 'NE', name: 'New', d: 'Factory-new, unused, with OEM certification and full trace.' },
  { code: 'NS', name: 'New Surplus', d: 'Unused but sourced from surplus stock, with trace to origin.' },
  { code: 'OH', name: 'Overhauled', d: 'Restored to zero-time by an approved facility, with 8130-3 or EASA Form 1.' },
  { code: 'SV', name: 'Serviceable', d: 'Inspected and certified fit for installation, with release documentation.' },
  { code: 'RP', name: 'Repaired', d: 'Specific defect rectified by an approved facility, with release tag.' },
  { code: 'IN', name: 'Inspected / Tested', d: 'Verified serviceable against defined criteria, with inspection record.' },
  { code: 'AR', name: 'As Removed', d: 'Removed from service, no airworthiness release. Sold for repair or teardown.' },
];

const documentation = [
  { t: 'FAA Form 8130-3', d: 'Airworthiness approval tag for parts released under FAA authority.' },
  { t: 'EASA Form 1', d: 'Equivalent release under European Union Aviation Safety Agency authority.' },
  { t: 'Certificate of Conformance', d: 'Manufacturer or distributor conformance statement for new and hardware items.' },
  { t: 'Non-Incident Statement', d: 'Written confirmation the part was not exposed to fire, crash, salt-water immersion, or extreme stress.' },
  { t: 'Back-to-Birth Trace', d: 'Complete ownership and service history, supplied on life-limited parts.' },
  { t: 'Teardown Report', d: 'Removal and condition record for parts sourced from teardown inventory.' },
];

const platforms = [
  { t: 'Narrowbody', d: 'Airbus A320 family · Boeing 737 family' },
  { t: 'Widebody', d: 'Airbus A330 family · Boeing 777 family' },
  { t: 'Regional & turboprop', d: 'Regional jet and turboprop fleets' },
  { t: 'Cargo conversions', d: 'P2F and dedicated freighter fleets' },
];

const sourcingSteps = [
  { n: '01', t: 'Request', d: 'Send a part number, description, or shortage list. Aircraft type and required date help us prioritize correctly.' },
  { n: '02', t: 'Source', d: 'We check our network first, then OEM channels, approved surplus, teardown inventory, and partner stock.' },
  { n: '03', t: 'Verify', d: 'Documentation is reviewed against the part before we quote. Anything that fails review is not offered.' },
  { n: '04', t: 'Quote', d: 'Price, condition, lead time, and documentation type, in writing, within hours.' },
  { n: '05', t: 'Deliver', d: 'Packed to specification, DG-compliant where required, with export documentation and tracking.' },
];

const faqs = [
  { q: 'What is the difference between a rotable and an expendable part?', a: 'A rotable is a high-value component that can be economically repaired and returned to service repeatedly, a hydraulic pump, for example. An expendable is discarded once removed or consumed, such as a filter, seal, or fastener. Rotables carry repair history and trace; expendables carry conformance and batch documentation.' },
  { q: 'Do you supply PMA parts as well as OEM?', a: 'Where the operator’s approved data permits, yes. PMA parts can offer meaningful cost savings, but acceptability depends on your maintenance programme and regulatory authority. We state clearly on every quotation whether a part is OEM or PMA so the decision stays yours.' },
  { q: 'What is ATA chapter numbering?', a: 'The ATA 100 system divides aircraft systems into standard numbered chapters: ATA 21 for air conditioning, ATA 32 for landing gear, ATA 34 for navigation, and so on. It gives the industry a common language for classifying parts and technical documentation regardless of manufacturer.' },
  { q: 'Can you supply life-limited parts?', a: 'Yes, with back-to-birth traceability and verified time-in-service data reviewed before purchase. We do not quote life-limited parts with incomplete records.' },
  { q: 'What if the part I need is obsolete?', a: 'Obsolescence sourcing is a core capability. We work through surplus channels, teardown inventory, and specialist partners, and where the original part is genuinely unavailable we identify approved alternatives rather than leave the request open.' },
];

/* ================= CATALOG EXPLORER: one line in view at a time ================= */
function CatalogExplorer() {
  const { hash } = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // deep link: /aircraft-parts#rotables (Home cards, legacy /products/:slug) selects that line
  useEffect(() => {
    const slug = hash.replace('#', '');
    const idx = products.findIndex((p) => p.slug === slug);
    if (idx >= 0) {
      setActive(idx);
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start' }));
    }
  }, [hash]);

  const p = products[active];

  return (
    <section ref={sectionRef} id="catalog" className="scroll-mt-24 relative border-y border-line/50 bg-navy-2/30 py-24 md:py-32">
      <div className="mx-auto max-w-[80rem] px-6">
        <SectionHead plate="What we supply" title="Browse the catalog"
          text="Twelve component lines, indexed by ATA chapter. Select a line to see its conditions, scope, and typical applications." />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
          {/* desktop rail */}
          <div className="hidden lg:block">
            <ul>
              {products.map((c, i) => (
                <li key={c.slug}>
                  <button onClick={() => setActive(i)} data-cursor
                    className={`group flex w-full items-center justify-between gap-4 border-l-2 py-3.5 pl-5 pr-3 text-left transition-all duration-300 ${
                      i === active ? 'border-sky bg-navy-3/50' : 'border-line/40 hover:border-line hover:bg-navy-3/20'}`}>
                    <span className="flex flex-col">
                      <span className={`text-[15px] font-semibold transition-colors ${i === active ? 'text-light' : 'text-silver group-hover:text-light'}`}>{c.name}</span>
                      <span className="mt-0.5 font-mono text-[10px] tracking-[0.15em] text-muted">{c.ata}</span>
                    </span>
                    <ArrowRight className={`h-4 w-4 shrink-0 text-sky transition-all duration-300 ${i === active ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* mobile tab strip */}
          <div className="-mx-6 overflow-x-auto px-6 lg:hidden">
            <div className="flex gap-2.5 pb-1">
              {products.map((c, i) => (
                <button key={c.slug} onClick={() => setActive(i)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                    i === active ? 'border-sky/60 bg-sky/10 text-light' : 'border-line text-muted'}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* detail panel */}
          <div className="relative lg:min-h-[440px]">
            <AnimatePresence mode="wait">
              <motion.article key={p.slug}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-sky">{p.ata}</span>
                  <span className="h-px flex-1 bg-line/60" />
                  <span className="font-mono text-[11px] tracking-[0.15em] text-muted">{String(active + 1).padStart(2, '0')} / {products.length}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">{p.name}</h3>
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted">{p.description}</p>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  <div>
                    <p className="plate mb-5">What&apos;s included</p>
                    <ul className="space-y-3.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-light/85">
                          <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-teal" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="plate mb-5">Typical applications</p>
                    <ul className="space-y-3.5">
                      {p.applications.map((a) => (
                        <li key={a} className="flex items-start gap-3 text-sm text-light/85">
                          <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-sky" />{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12"><BtnPrimary to="/request-a-quote">Request availability</BtnPrimary></div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AircraftParts() {
  return (
    <>
      <Seo
        title="Aircraft Spare Parts & Aviation Components: Nose-to-Tail Supply"
        description="Rotables, avionics, engine components, landing gear, electrical systems, consumables, and standard hardware across 12 ATA-indexed product lines. Certified, traceable, and shipped from Dubai, UAE."
        path="/aircraft-parts"
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Aircraft Parts', path: '/aircraft-parts' }]),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        plate="Parts & components"
        title="Aircraft spare parts, supplied with complete documentation"
        text="Rotables, avionics, engine components, consumables, and standard hardware across the full ATA range, sourced through verified channels and delivered with airworthiness certification on every line."
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Aircraft Parts', path: '/aircraft-parts' }]}
      />

      <CatalogExplorer />

      {/* fleet coverage: slim divider grid */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
            <Reveal>
              <p className="plate mb-4">Fleet coverage</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Sourced across the platforms you fly</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                Our sourcing is part-number-driven, not fleet-restricted. Do not see your platform? Send the part
                number and aircraft type, we confirm availability.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/50 sm:grid-cols-2">
                {platforms.map((pl) => (
                  <div key={pl.t} className="bg-navy p-7">
                    <h3 className="text-[15px] font-semibold text-light">{pl.t}</h3>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-wide text-muted">{pl.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* condition codes: elegant reference table */}
      <section className="border-y border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHead plate="Condition codes, explained" title="Know exactly what you're buying"
            text="Condition designation is the difference between a part you can install and one you cannot. We state the code on every quotation and supply the matching documentation." />
          <div className="overflow-hidden rounded-3xl border border-line/60">
            {conditionCodes.map((c, i) => (
              <Reveal key={c.code}>
                <div className={`grid grid-cols-[56px_1fr] items-baseline gap-5 px-6 py-6 transition-colors hover:bg-navy-3/30 sm:grid-cols-[132px_1fr] sm:gap-8 sm:px-8 ${i > 0 ? 'border-t border-line/50' : ''}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-lg font-semibold text-sky">{c.code}</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-light">{c.name}</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{c.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* documentation standards: airy asymmetric layout */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal>
              <p className="plate mb-4">Documentation standards</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">What arrives with your part</h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                A component without correct paperwork is not an aircraft part. Every shipment carries the airworthiness
                release appropriate to the part and its condition, reviewed before we quote, not after you commit.
              </p>
            </Reveal>
            <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {documentation.map((d, i) => (
                <Reveal key={d.t} delay={i % 2}>
                  <div className="border-t border-line/60 pt-5">
                    <div className="flex items-center gap-2.5">
                      <PackageSearch className="h-4 w-4 shrink-0 text-sky" />
                      <h3 className="text-[15px] font-semibold text-light">{d.t}</h3>
                    </div>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{d.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* sourcing process */}
      <section className="border-t border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <SectionHead plate="How it works" title="From part number to delivery" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {sourcingSteps.map((s, i) => (
              <Reveal key={s.n} delay={i % 5}>
                <div className="card-hover group relative h-full border border-line/70 bg-navy-3/40 p-7">
                  <span className="font-display text-5xl font-semibold text-line transition-colors duration-500 group-hover:text-sky/30">{s.n}</span>
                  <h3 className="mt-5 text-lg font-semibold text-light">{s.t}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* obsolescence callout */}
      <section className="py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="glass grid items-center gap-8 rounded-3xl p-9 md:grid-cols-[1.4fr_1fr] md:p-14">
            <div>
              <p className="plate plate-orange mb-4">Hard-to-find &amp; obsolescence</p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">Can&apos;t find a part number in the catalog? Send it anyway.</h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                Obsolescence sourcing is a core capability, worked through OEM channels, approved surplus, teardown
                inventory, and our partner network. Where a part is genuinely unavailable, we say so and propose an
                alternative rather than leave a request open.
              </p>
            </div>
            <div className="flex md:justify-end"><BtnPrimary to="/request-a-quote">Submit a hard-to-find request</BtnPrimary></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHead plate="Common questions" title="Aircraft parts, answered" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
