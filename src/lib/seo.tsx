import { Helmet } from 'react-helmet-async';

const SITE = 'https://vandex.ae';
const NAME = 'VANDEX Aviation Supply';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: string;
  schema?: object[];
  noindex?: boolean;
}

export function Seo({ title, description, path, type = 'website', schema = [], noindex }: SeoProps) {
  const url = `${SITE}${path}`;
  const fullTitle = path === '/' ? title : `${title} | VANDEX`;
  const graph = [organizationSchema(), websiteSchema(), ...schema];
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_AE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
    </Helmet>
  );
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: NAME,
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    description: 'UAE-based supplier of aircraft spare parts, components, and aviation logistics solutions serving airlines, MROs, and operators worldwide.',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'info@vandex.ae', availableLanguage: ['en', 'ar'] },
    areaServed: ['AE', 'GCC', 'Middle East', 'Europe', 'Asia', 'Africa', 'Worldwide'],
  };
}

export function websiteSchema() {
  return { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: NAME, publisher: { '@id': `${SITE}/#organization` } };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.path}` })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function productSchema(name: string, description: string, path: string) {
  return {
    '@type': 'Product',
    name,
    description,
    url: `${SITE}${path}`,
    brand: { '@id': `${SITE}/#organization` },
    category: 'Aircraft Spare Parts',
  };
}

export function localBusinessSchema() {
  return {
    '@type': 'LocalBusiness',
    '@id': `${SITE}/#localbusiness`,
    name: NAME,
    url: SITE,
    telephone: '+971-4-000-0000',
    email: 'info@vandex.ae',
    address: { '@type': 'PostalAddress', streetAddress: 'Business Bay', addressLocality: 'Dubai', addressCountry: 'AE' },
    openingHours: 'Mo-Fr 08:30-18:00',
    priceRange: '$$$',
  };
}
