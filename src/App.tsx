import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/layout';

const Home = lazy(() => import('./pages/Home'));
const AircraftParts = lazy(() => import('./pages/AircraftParts'));
const SupplySolutions = lazy(() => import('./pages/SupplySolutions'));
const WhyVandex = lazy(() => import('./pages/WhyVandex'));
const RequestQuote = lazy(() => import('./pages/RequestQuote'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/RequestQuote').then(m => ({ default: m.NotFound })));
const Privacy = lazy(() => import('./pages/RequestQuote').then(m => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/RequestQuote').then(m => ({ default: m.Terms })));

function Loader() {
  return (
    <div className="flex min-h-svh items-center justify-center" role="status" aria-label="Loading">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-sky" />
    </div>
  );
}

/** Old /products/:slug and /services/:slug deep links now live as anchors on one page. */
function AnchorRedirect({ to }: { to: string }) {
  const { slug = '' } = useParams();
  return <Navigate to={`${to}#${slug}`} replace />;
}

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aircraft-parts" element={<AircraftParts />} />
          <Route path="supply-solutions" element={<SupplySolutions />} />
          <Route path="company" element={<WhyVandex />} />
          <Route path="request-a-quote" element={<RequestQuote />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />

          {/* legacy routes: redirect to the current 5-page structure */}
          <Route path="why-vandex" element={<Navigate to="/company" replace />} />
          <Route path="about" element={<Navigate to="/company" replace />} />
          <Route path="products" element={<Navigate to="/aircraft-parts" replace />} />
          <Route path="products/:slug" element={<AnchorRedirect to="/aircraft-parts" />} />
          <Route path="services" element={<Navigate to="/supply-solutions" replace />} />
          <Route path="services/:slug" element={<AnchorRedirect to="/supply-solutions" />} />
          <Route path="blog" element={<Navigate to="/" replace />} />
          <Route path="blog/:slug" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
