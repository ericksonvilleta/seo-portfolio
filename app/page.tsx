import { getLocationBySlug, getRelatedLocations } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import RouteVisualizer from '@/components/RouteVisualizer';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = `Car Shipping from ${location.origin} - From $${location.baseRate}`;
  const description = `Looking for vehicle transport from ${location.origin}? Rates starting at $${location.baseRate} with dispatch in ${location.leadTime}. Serving population of ${location.population.toLocaleString()} via ${location.corridor}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ShippingPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const relatedLocations = getRelatedLocations(location.state, location.slug);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Car Shipping and Vehicle Transport',
    'provider': {
      '@type': 'LocalBusiness',
      'name': `Nationwide Auto Transport - ${location.origin}`,
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': `${location.origin}`,
      },
    },
    'description': `Secure vehicle transport services originating from ${location.origin}. Rates from $${location.baseRate}.`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': location.faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          Home / Shipping / {location.state} / {location.origin}
        </nav>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Car Shipping from {location.origin}
        </h1>

        <RouteVisualizer
          origin={location.origin}
          state={location.state}
          corridor={location.corridor}
          baseRate={location.baseRate}
        />

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          If you need secure and dependable vehicle transport originating from <strong className="text-gray-900">{location.origin}</strong> (serving an estimated population of {location.population.toLocaleString()}), we provide direct nationwide coverage utilizing major corridors like {location.corridor} with standard dispatch times of {location.leadTime}.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold text-blue-900">Instant Route Estimate</h2>
            <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
              Rates from ${location.baseRate}
            </span>
          </div>
          <p className="text-blue-800 text-sm mb-4">
            Transporting your vehicle from {location.origin} includes full carrier insurance, real-time satellite tracking, and zero upfront deposit. Typical carrier dispatch: {location.leadTime}.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            Calculate Quote for {location.origin}
          </button>
        </div>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions about {location.origin} Shipping
          </h2>
          <div className="space-y-6">
            {location.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{faq.question}</h3>
                <p className="text-sm text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Why Choose Our Transport Service?
          </h2>
          <p className="text-gray-700 mb-2">Licensed and bonded carriers operating directly out of the region.</p>
          <p className="text-gray-700 mb-2">Transparent baseline pricing starting at ${location.baseRate} with no hidden terminal fees.</p>
          <p className="text-gray-700">Dedicated support team monitoring your vehicle from pickup to drop-off.</p>
        </section>

        {relatedLocations.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              More Shipping Routes in {location.state}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedLocations.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/shipping/${rel.slug}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm block p-2 bg-gray-50 rounded border border-gray-100"
                >
                  Car Shipping from {rel.origin} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}