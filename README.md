# VANDEX.AE — Corporate Aviation Website

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Three Fiber + Drei + Postprocessing · GSAP ScrollTrigger · Framer Motion · Lenis · SplitType · React Router · Helmet Async · RHF + Zod

## Run
```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Deploy
Static SPA — deploy `dist/` to Vercel, Netlify, or Cloudflare Pages.
Add an SPA rewrite (all routes → /index.html).

## Pages (16)
Home, About, Products (+12 category pages), Services (+9 detail pages), Industries, Why VANDEX, Global Network, Quality, News (+3 posts), FAQ, Gallery, Careers, Contact, 404, Privacy, Terms.

## SEO
Per-page meta + canonical + OG/Twitter, JSON-LD (Organization, LocalBusiness, Website, Product, FAQ, Breadcrumb), `public/sitemap.xml` (37 URLs), `public/robots.txt`.

## Before launch
- Replace placeholder contact data (+971 4 000 0000, sales@vandex.ae, WhatsApp link, Business Bay address).
- Replace schematic placeholders with real photography (alt text already written).
- Logo lives at `src/assets/vandex-logo-final-hd.png`, wired into `src/components/ui.tsx`.
- Populate the blog by editing `src/data/blog.ts` (placeholder posts are in place).
- Set final domain in `src/lib/seo.tsx` (SITE constant) and regenerate sitemap if URLs change.

## Design system — VANDEX gold
Ink Navy `#101418` (background) · Off-White `#F5F6F7` (text) · Steel Gray `#9CA0A6` (muted) · Vandex Gold `#D7AA5E` (primary accent) · Gold Light `#F0CF8B` (gradient hi) · Gold Deep `#A87831` (gradient lo / urgent accents).

## Signature interactions
Preloader with percent counter · procedural 3D jet turbine hero (instanced blades, bloom, mouse parallax, lazy-loaded) · pinned scroll-scrubbed aircraft wireframe draw · horizontal-scroll supply chain · radar-sweep global network · perspective tilt product cards with spec reveal · magnetic buttons · custom cursor · full-screen clip-path menu · route wipe transitions · ATA marquee · film grain + engineering grids throughout. All animation respects `prefers-reduced-motion`; 3D disables bloom and lowers DPR on mobile.
