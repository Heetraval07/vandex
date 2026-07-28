import { ShieldCheck, PackageCheck, Clock3, Globe2, FileWarning, ScanSearch, ListChecks, Users } from 'lucide-react';
import { Seo, breadcrumbSchema, faqSchema } from '../lib/seo';
import { PageHero, Reveal, SectionHead, Counter, CtaBand, FaqList } from '../components/ui';
import { industries } from '../data/content';

const metrics = [
  { to: 3, label: 'Continents in the sourcing network' },
  { to: 12, label: 'Product lines' },
  { to: 9, label: 'Services across the lifecycle' },
  { to: 1, label: 'Point of accountability' },
];

const qualitySystem = [
  { icon: ListChecks, t: 'Approved supplier list', d: 'We buy only from vendors on our approved list, reviewed for accreditation, documentation quality, and performance history. Vendors are removed on quality findings, not on price.' },
  { icon: ShieldCheck, t: 'Documentation review before quotation', d: 'Certification is reviewed against the part before we quote you. Anything that fails review is never offered — which is why we occasionally quote nothing at all on a request.' },
  { icon: PackageCheck, t: 'Goods-in inspection', d: 'Every receipt is inspected against its documentation — part number, serial number, condition, and physical state — recorded before stock is released.' },
  { icon: ScanSearch, t: 'Traceable records', d: 'Every transaction is recorded from receipt to shipment and retained, so any part we have supplied can be traced years later.' },
];

const accreditations = [
  { icon: ShieldCheck, t: 'ASA-100 aligned', d: 'Receiving inspection and vendor-audit discipline aligned to the Aviation Suppliers Association standard for parts distributors.' },
  { icon: PackageCheck, t: 'ISO 9001 principles', d: 'Documented process control across sourcing, receiving, and dispatch.' },
  { icon: Clock3, t: 'Certificate review first', d: 'Every release document is checked against the part before we quote — not after.' },
  { icon: Globe2, t: 'EASA · FAA · GCAA', d: 'Documentation formats accepted by operators regulated under EASA, FAA, and GCAA.' },
];

const counterfeit = [
  'Purchases restricted to approved vendors with verified accreditation',
  'Documentation authenticated at source, not accepted at face value',
  'Physical inspection against expected markings, finish, and packaging',
  'Non-Incident Statements required on relevant purchase orders',
  'Serial-number verification against manufacturer or repair-station records',
  'Any suspect item quarantined and reported, never returned to stock',
];

const faqs = [
  { q: 'What is EASA Form 1?', a: 'EASA Form 1 is the airworthiness release certificate issued by a European Union Aviation Safety Agency-approved organisation. It confirms a component has been manufactured, inspected, repaired, or overhauled in accordance with approved data and is eligible for installation, stating part number, serial number, condition, workscope, and the approval number of the issuing organisation.' },
  { q: 'What is FAA Form 8130-3?', a: 'FAA Form 8130-3, the Authorized Release Certificate, is the United States equivalent of EASA Form 1. It is issued by an FAA-approved production or repair organisation and certifies airworthiness approval for a component. Under bilateral agreements, 8130-3 and EASA Form 1 are mutually accepted in most circumstances, though the specific dual-release requirement depends on your authority and maintenance programme.' },
  { q: 'How do I verify a part’s traceability?', a: 'Traceability is verified by following the documentation chain from the current holder back to the original manufacturer or last approved release, confirming part and serial numbers match at every transfer and no gaps exist. For life-limited parts this extends back to birth. VANDEX supplies this chain with the quotation, so it can be reviewed before purchase.' },
  { q: 'What quality standards does VANDEX operate to?', a: 'Our quality system is aligned to ASA-100 and ISO 9001 principles, covering approved-vendor management, documentation review before quotation, goods-in inspection, and traceable record-keeping. Formal third-party accreditation status is published here as it is achieved.' },
  { q: 'How do you prevent counterfeit or unapproved parts entering your supply chain?', a: 'Through approved-vendor restriction, source-level documentation authentication, physical inspection against expected manufacturer markings, Non-Incident Statements, and serial-number verification. Suspect items are quarantined and reported, never returned to stock.' },
  { q: 'Can I audit VANDEX as a supplier?', a: 'Yes. We welcome customer quality audits and can share our quality process, approved-vendor summary, and sample documentation in advance — contact our team to arrange.' },
];

export function WhyVandex() {
  return (
    <>
      <Seo
        title="Company — Quality, Traceability & Aviation Supply Standards"
        description="Documented traceability, an audited supplier network, and counterfeit-prevention controls on every component VANDEX supplies. Why airlines, MROs, and operators choose VANDEX."
        path="/company"
        schema={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }]),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        plate="Company"
        title="Trust is a process, not a promise"
        text="Anyone can source a part number. What matters is whether the documentation survives an audit — and that comes down to how a supplier is built."
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Company', path: '/company' }]}
      />

      {/* overview — editorial */}
      <section className="mx-auto max-w-[80rem] px-6 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="plate mb-5">Who we are</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Built around documentation, not just inventory</h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="space-y-5 lg:pt-4">
              <p className="text-[15px] leading-relaxed text-muted">
                VANDEX was founded in Dubai in 2026 to give airlines, MROs, and operators a counterparty that treats
                documentation, speed, and accountability as one promise, not three. We source, verify, and deliver
                aircraft spare parts — and we walk away from stock we cannot document, because a component without
                clean paperwork is not an aircraft part.
              </p>
              <p className="text-[15px] leading-relaxed text-muted">
                We work from Dubai for what the location does for our customers: positioned between the sourcing
                markets of the Americas and Europe and the growing fleets of Asia and Africa, with routed freight
                lanes reaching every continent.
              </p>
              <p className="border-l-2 border-sky/50 pl-5 text-[15px] leading-relaxed text-light/85">
                Our mission: keep aircraft flying with documentation that clears the first inspection — and grow from
                parts distribution into managed procurement for global fleets.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* metric band */}
      <section className="border-y border-line/50 bg-navy-2/30">
        <div className="mx-auto grid max-w-[80rem] grid-cols-2 gap-px bg-line/40 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-navy px-6 py-14 text-center sm:px-8">
              <Counter to={m.to} label={m.label} />
            </div>
          ))}
        </div>
      </section>

      {/* quality system — numbered editorial pillars */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <p className="plate mb-5">How we control what we sell</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Our quality system</h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                Four controls sit between a supplier&apos;s offer and your stores. Each one exists to make sure the
                paperwork survives an audit years later.
              </p>
            </Reveal>
            <div>
              {qualitySystem.map((q, i) => (
                <Reveal key={q.t} delay={i % 2}>
                  <div className="grid grid-cols-[auto_1fr] gap-5 border-t border-line/60 py-7 sm:gap-8">
                    <span className="font-display text-3xl font-semibold text-line md:text-4xl">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <q.icon className="h-4 w-4 shrink-0 text-sky" />
                        <h3 className="text-[15px] font-semibold text-light">{q.t}</h3>
                      </div>
                      <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{q.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* accreditations — hairline divider grid */}
      <section className="border-y border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <SectionHead plate="Standards we work to" title="Quality, aligned to industry standard"
            text="Formal third-party accreditation status is published here as it is achieved. Until then, we state plainly what we align to." />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/50 sm:grid-cols-2 lg:grid-cols-4">
            {accreditations.map((a) => (
              <div key={a.t} className="bg-navy p-8">
                <a.icon className="h-6 w-6 text-sky" />
                <h3 className="mt-5 text-[15px] font-semibold text-light">{a.t}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* counterfeit prevention — airy asymmetric */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[80rem] px-6">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <p className="plate plate-orange mb-5">Keeping unapproved parts out</p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Counterfeit prevention</h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
                Suspected Unapproved Parts are the most serious risk in component distribution. A convincing document
                attached to an unapproved part is more dangerous than no document at all.
              </p>
            </Reveal>
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {counterfeit.map((c, i) => (
                <Reveal key={c} delay={i % 2}>
                  <div className="flex items-start gap-3 border-t border-line/60 pt-5 text-[14px] leading-relaxed text-light/85">
                    <FileWarning className="mt-0.5 h-4.5 w-4.5 shrink-0 text-orange" />{c}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* industries served — hairline divider grid */}
      <section id="industries" className="scroll-mt-24 border-y border-line/50 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-[80rem] px-6">
          <SectionHead plate="Who we serve" title="Trusted across the aviation supply chain" />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line/60 bg-line/50 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-navy p-8">
                <h3 className="text-[15px] font-semibold text-light">{ind.name}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{ind.text}</p>
              </div>
            ))}
            {/* leadership note fills the sixth cell for a clean grid */}
            <div className="flex flex-col justify-center gap-3 bg-navy p-8">
              <Users className="h-6 w-6 text-sky" />
              <p className="text-[13.5px] leading-relaxed text-muted">
                Named leadership, credentials, and photography to follow at launch — operating from Dubai, UAE, with
                the AOG desk live 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHead plate="Common questions" title="Quality & traceability, answered" />
          <FaqList faqs={faqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
