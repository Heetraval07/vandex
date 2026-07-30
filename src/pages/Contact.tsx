import { useState } from 'react';
import { Phone, Mail, MapPin, Check, CheckCircle2 } from 'lucide-react';
import { Seo, breadcrumbSchema, localBusinessSchema } from '../lib/seo';
import { Reveal } from '../components/ui';

const contacts = [
  { Icon: Phone, label: 'Call / WhatsApp', value: '+971 52 192 7376', href: 'https://wa.me/971521927376', external: true },
  { Icon: Mail, label: 'Email', value: 'info@vandex.ae', href: 'mailto:info@vandex.ae', external: false },
  { Icon: MapPin, label: 'Office', value: 'Business Bay, Dubai, UAE', href: '', external: false },
];

const assurances = [
  '24/7 AOG support',
  'Traceable documentation on every shipment',
  'Reply within one business day',
];

const services = ['Aircraft parts', 'Supply solutions / AOG', 'Program / partnership', 'Selling surplus to VANDEX', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState(false);

  const valid = form.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.message.trim().length > 4;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setSent(true); // wire to API/email service in production
  };
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const input = 'w-full rounded-xl border border-line bg-navy-2/60 px-4 py-3 text-base sm:text-sm placeholder:text-muted/50 focus:border-sky transition-colors';

  return (
    <>
      <Seo title="Contact VANDEX: Aviation Parts Supply, Dubai UAE"
        description="Talk to the VANDEX team in Dubai about aircraft parts, AOG support, or supply solutions. Call, WhatsApp, or email, we reply within one business day."
        path="/contact"
        schema={[
          localBusinessSchema(),
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
        ]} />

      {/* ---- Centered intro ---- */}
      <header className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-20 noise">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-12%] h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-sky/[0.07] blur-[170px]" />
          <div className="absolute inset-0 dotgrid" />
          <svg className="absolute -right-28 -top-32 h-[520px] w-[520px] text-sky/[0.12]" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1" />
            <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="2 10" />
            <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeOpacity="0.55" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_36%,transparent_60%,rgba(0,0,0,0.35))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <p className="plate mb-5">Get in touch</p>
            <h1 className="text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl">Talk to our team</h1>
            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-muted">
              Whether it's aircraft parts, an AOG on the ground, or a longer-term supply program, tell us what you need
              and we'll take it from there. Based in Dubai, we reply within one business day.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ---- Info + form ---- */}
      <section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* left: details */}
          <Reveal>
            <p className="plate mb-4">Direct lines</p>
            <h2 className="max-w-md text-4xl font-semibold leading-tight tracking-tight text-light md:text-5xl">
              Let's find the right part for your fleet
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
              Share a bit about what you're after (a part number, a shortage list, or an AOG) and we'll come back with
              condition, lead time, and documentation stated in writing.
            </p>

            <ul className="mt-10 space-y-6">
              {contacts.map(({ Icon, label, value, href, external }) => {
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-navy-2/50 text-sky transition-colors group-hover:border-sky/50">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">{label}</span>
                      <span className="mt-0.5 block text-[15px] font-medium text-light">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} data-cursor {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-4">{body}</a>
                    ) : (
                      <div className="group flex items-center gap-4">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <ul className="mt-10 space-y-3">
              {assurances.map((a) => (
                <li key={a} className="flex items-center gap-3 text-[14px] text-silver">
                  <Check className="h-4 w-4 shrink-0 text-sky" /> {a}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* right: form */}
          <Reveal delay={1}>
            {sent ? (
              <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-3xl p-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-teal" />
                <h3 className="mt-5 text-2xl font-semibold">Message received</h3>
                <p className="mt-3 max-w-sm text-sm text-muted">We'll reply within one business day. For a grounded aircraft, call or WhatsApp, it's faster.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="glass rounded-3xl p-8 md:p-10">
                <h3 className="mb-7 text-xl font-semibold text-light">Send us a message</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="plate mb-2 block">Name</label>
                    <input id="c-name" className={input} placeholder="Your full name" value={form.name} onChange={set('name')} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="plate mb-2 block">Work email</label>
                    <input id="c-email" type="email" className={input} placeholder="you@company.ae" value={form.email} onChange={set('email')} />
                  </div>
                  <div>
                    <label htmlFor="c-phone" className="plate mb-2 block">Phone / WhatsApp</label>
                    <input id="c-phone" className={input} placeholder="+971 5x xxx xxxx" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div>
                    <label htmlFor="c-company" className="plate mb-2 block">Company</label>
                    <input id="c-company" className={input} placeholder="Airline / MRO / Operator" value={form.company} onChange={set('company')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-service" className="plate mb-2 block">I'm interested in</label>
                    <select id="c-service" className={input} value={form.service} onChange={set('service')}>
                      <option value="">Select a service…</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="c-message" className="plate mb-2 block">Message</label>
                    <textarea id="c-message" rows={5} className={input} placeholder="Part numbers, quantities, aircraft type, or anything else." value={form.message} onChange={set('message')} />
                  </div>
                </div>
                {touched && !valid && <p role="alert" className="mt-3 text-xs text-red-400">Please add your name, a valid email, and a short message.</p>}
                <button type="submit"
                  className="mt-7 w-full bg-light py-4 text-sm font-semibold text-navy transition-colors hover:bg-orange hover:text-white">
                  Send message
                </button>
                <p className="mt-5 text-center text-[12.5px] text-muted">We reply within one business day. Your details stay private.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
