import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MessageCircle, MapPin, Clock3, CheckCircle2 } from 'lucide-react';
import { Linkedin, Instagram, Facebook } from '../components/socials';
import { Seo, breadcrumbSchema, localBusinessSchema, faqSchema } from '../lib/seo';
import { PageHero, Reveal, SectionHead, GridLines, FaqList } from '../components/ui';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  company: z.string().min(2, 'Please enter your company'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  type: z.enum(['RFQ / Quotation', 'AOG (Aircraft on Ground)', 'Program / Partnership', 'Surplus sale to VANDEX', 'Other']),
  message: z.string().min(10, 'Tell us a little more, part numbers help'),
});
type FormData = z.infer<typeof schema>;

const commitments = [
  ['Standard RFQ', 'Quoted within business hours'],
  ['AOG request', 'Priority handling, target 2 hours'],
  ['Documentation', 'Stated on the quotation, before purchase'],
  ['Confidentiality', 'Your requirements are treated as commercially confidential'],
];

const faqs = [
  { q: 'What information do you need to quote a part?', a: 'At minimum, the part number and quantity. Aircraft type, condition required, and required date let us prioritise correctly and quote the right option first time. If you only have a description, send that, we can often identify the correct part number from it.' },
  { q: 'Can I submit a full shortage list rather than individual parts?', a: 'Yes, paste a list directly into the message field or attach a file by email. There is no line limit and consolidated lists are quoted line by line.' },
  { q: 'Is my requirement information kept confidential?', a: 'Yes. Part numbers, quantities, and requirement schedules are commercially sensitive and treated as confidential. We do not share requirement data with third parties beyond what is necessary to source the part.' },
  { q: 'Do I need an account before requesting a quote?', a: 'No. Anyone can request a quotation. A trade account is only needed before an order is placed, and our team will guide you through setup once you are ready.' },
];

export default function RequestQuote() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'RFQ / Quotation' },
  });
  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 700)); // wire to API/email service in production
    setSent(true);
  };
  const input = 'w-full rounded-xl border border-line bg-navy-2/60 px-4 py-3 text-base sm:text-sm placeholder:text-muted/50 focus:border-sky transition-colors';
  const err = (m?: string) => m && <p role="alert" className="mt-1.5 text-xs text-red-400">{m}</p>;

  return (
    <>
      <Seo title="Request a Quote: Aircraft Parts RFQ | Dubai, UAE"
        description="Send a part number and receive a written quote from VANDEX, with condition, lead time, and documentation stated. AOG requests get priority handling from Dubai, UAE."
        path="/request-a-quote"
        schema={[
          localBusinessSchema(),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/request-a-quote' }]),
          faqSchema(faqs),
        ]} />
      <PageHero plate="Request a quote" title="Send a part number. Get a real answer."
        text="Standard requests are quoted within business hours, with condition, lead time, and documentation stated in writing. AOG requests get priority handling."
        crumbs={[{ name: 'Home', path: '/' }, { name: 'Request a Quote', path: '/request-a-quote' }]} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
          <Reveal>
            {sent ? (
              <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-teal" />
                <h2 className="mt-5 text-2xl font-semibold">Request received</h2>
                <p className="mt-3 max-w-sm text-sm text-muted">Our desk will reply shortly. For AOG, call or WhatsApp now, it's faster.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass rounded-3xl p-8 md:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="plate mb-2 block">Name</label>
                    <input id="name" className={input} placeholder="Full name" {...register('name')} />
                    {err(errors.name?.message)}
                  </div>
                  <div>
                    <label htmlFor="company" className="plate mb-2 block">Company</label>
                    <input id="company" className={input} placeholder="Airline / MRO / Operator" {...register('company')} />
                    {err(errors.company?.message)}
                  </div>
                  <div>
                    <label htmlFor="email" className="plate mb-2 block">Email</label>
                    <input id="email" type="email" className={input} placeholder="you@company.com" {...register('email')} />
                    {err(errors.email?.message)}
                  </div>
                  <div>
                    <label htmlFor="phone" className="plate mb-2 block">Phone (optional)</label>
                    <input id="phone" className={input} placeholder="+971 ..." {...register('phone')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="type" className="plate mb-2 block">Enquiry type</label>
                    <select id="type" className={input} {...register('type')}>
                      {['RFQ / Quotation', 'AOG (Aircraft on Ground)', 'Program / Partnership', 'Surplus sale to VANDEX', 'Other'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="plate mb-2 block">Part numbers &amp; requirement</label>
                    <textarea id="message" rows={5} className={input} placeholder="Part numbers, quantities, condition, aircraft type…" {...register('message')} />
                    {err(errors.message?.message)}
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="mt-7 inline-flex items-center gap-2.5 bg-light px-8 py-4 text-sm font-semibold text-navy transition-colors hover:bg-orange hover:text-white disabled:opacity-60">
                  {isSubmitting ? 'Sending…' : 'Send request'}
                </button>
              </form>
            )}
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={1}>
              <div className="glass rounded-3xl p-8">
                <p className="plate mb-5">Direct lines</p>
                <ul className="space-y-4 text-sm">
                  <li><a className="flex items-center gap-3 text-light/85 hover:text-sky" href="tel:+97140000000"><Phone className="h-4.5 w-4.5 text-sky" /> +971 4 000 0000</a></li>
                  <li><a className="flex items-center gap-3 text-light/85 hover:text-teal" href="https://wa.me/971521927376" target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4.5 w-4.5 text-teal" /> WhatsApp: +971 52 192 7376</a></li>
                  <li><a className="flex items-center gap-3 text-light/85 hover:text-sky" href="mailto:info@vandex.ae"><Mail className="h-4.5 w-4.5 text-sky" /> info@vandex.ae</a></li>
                </ul>
                <div className="contrail my-6" />
                <ul className="space-y-3 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
                  <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-sky" /> Business Bay, Dubai, UAE</li>
                  <li className="flex items-center gap-3"><Clock3 className="h-4 w-4 text-sky" /> Sun–Fri 08:30–18:00 GST</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  {[{ Icon: Linkedin, label: 'LinkedIn' }, { Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }].map(({ Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-sky hover:text-sky"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl" role="img" aria-label="Map placeholder: VANDEX Dubai headquarters">
                <GridLines />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(45,212,191,.22),transparent_55%)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="relative mx-auto flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-teal" />
                  </span>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.18em] text-light/80 uppercase">Google Maps embed (placeholder)</p>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">25.19° N · 55.27° E</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* response commitments */}
      <section className="border-t border-line/50 bg-navy-2/30 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="glass grid gap-6 divide-y divide-line/50 rounded-3xl sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {commitments.map(([k, v]) => (
              <div key={k} className="p-6">
                <p className="font-semibold text-light">{k}</p>
                <p className="mt-1.5 font-mono text-[12.5px] tracking-wide text-teal">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHead plate="Common questions" title="Requesting a quote, answered" />
          <FaqList faqs={faqs} />
        </div>
      </section>
    </>
  );
}

/* ================= 404 ================= */
export function NotFound() {
  return (
    <>
      <Seo title="404: Page Not Found" description="The page you requested was not found on VANDEX." path="/404" noindex />
      <section className="flex min-h-svh items-center justify-center px-6 pt-24 text-center">
        <div>
          <p className="plate">Error 404 · Off the flight plan</p>
          <h1 className="mt-6 font-display text-[5rem] leading-none font-semibold grad-text md:text-[8rem]">404</h1>
          <p className="mx-auto mt-6 max-w-md text-muted">This page has been retired from service. The rest of the fleet is fully operational.</p>
          <div className="mt-9 flex justify-center gap-4">
            <Link to="/" className="bg-light px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-orange hover:text-white">Return home</Link>
            <Link to="/request-a-quote" className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-sky hover:text-sky">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= LEGAL ================= */
function Legal({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <Seo title={title} description={`${title} for VANDEX, UAE aviation supply company.`} path={path} noindex />
      <PageHero plate="Legal" title={title} crumbs={[{ name: 'Home', path: '/' }, { name: title, path }]} />
      <section className="mx-auto max-w-3xl px-6 py-16 text-[15px] leading-relaxed text-light/80 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-light [&_p]:mb-4">
        {children}
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <Legal title="Privacy Policy" path="/privacy">
      <p>Effective date: 1 July 2026. VANDEX.AE ("VANDEX", "we") respects the privacy of every visitor and customer. This policy explains what we collect and how we use it.</p>
      <h2>Information we collect</h2>
      <p>Contact details you submit through our forms (name, company, email, phone), enquiry content including part numbers, and standard technical data such as IP address and browser type collected through analytics.</p>
      <h2>How we use it</h2>
      <p>To respond to enquiries and quotations, operate AOG support, administer programs and contracts, meet export-compliance and record-keeping obligations, and improve our website. We do not sell personal data.</p>
      <h2>Sharing</h2>
      <p>Data is shared only with service providers necessary to fulfil your request (e.g., logistics partners, compliance screening) and where required by UAE or applicable international law.</p>
      <h2>Retention & security</h2>
      <p>Records are retained as required for aviation traceability and legal compliance, protected by appropriate technical and organisational measures.</p>
      <h2>Your rights</h2>
      <p>You may request access, correction, or deletion of your personal data by writing to privacy@vandex.ae. We respond within 30 days.</p>
    </Legal>
  );
}

export function Terms() {
  return (
    <Legal title="Terms & Conditions" path="/terms">
      <p>Effective date: 1 July 2026. These terms govern use of vandex.ae and, unless superseded by a signed agreement, form the basis of business with VANDEX.</p>
      <h2>Quotations & orders</h2>
      <p>Quotations are valid for the period stated and subject to prior sale. Orders are binding on written confirmation. Conditions (NE, OH, SV, AR), lead times, and incoterms are as stated on the quotation.</p>
      <h2>Documentation & airworthiness</h2>
      <p>Parts are supplied with the release documentation stated at quotation. Determination of airworthiness and fitness for installation remains the responsibility of the installing organisation.</p>
      <h2>Export compliance</h2>
      <p>All transactions are subject to UAE and applicable international export-control laws. The buyer warrants accuracy of end-use information and agrees not to re-export in violation of applicable regimes.</p>
      <h2>Liability</h2>
      <p>To the maximum extent permitted by law, VANDEX's liability is limited to the invoice value of the goods concerned. No liability is accepted for consequential loss, including loss of use or revenue.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the United Arab Emirates. Disputes fall under the exclusive jurisdiction of the Dubai courts.</p>
    </Legal>
  );
}
