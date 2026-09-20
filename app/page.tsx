import { getAllLocations, getLocationBySlug, getRelatedLocations } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Page Not Found',
    };
  }

  const title = `Car Shipping from ${location.origin}, ${location.state}`;
  const description = `Need secure and dependable vehicle transport originating from ${location.origin} in ${location.state} (serving an estimated population of ${location.population.toLocaleString()}), we provide direct nationwide coverage utilizing major corridors like ${location.corridor}.`;

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

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Car Shipping and Vehicle Transport',
    'provider': {
      '@type': 'LocalBusiness',
      'name': `Nationwide Auto Transport - ${location.origin}`,
      'areaServed': {
        '@type': 'AdministrativeArea',
        'name': `${location.origin}, ${location.state}`,
      },
    },
    'description': `Secure and dependable vehicle transport services originating from ${location.origin}, ${location.state}.`,
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="max-w-4xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6">
          Home / Shipping / {location.state} / {location.origin}
        </nav>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Car Shipping from {location.origin}, {location.state}
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          If you need secure and dependable vehicle transport originating from <strong className="text-gray-900">{location.origin}</strong> in <strong className="text-gray-900">{location.state}</strong> (serving an estimated population of {location.population.toLocaleString()}), we provide direct nationwide coverage utilizing major corridors like {location.corridor}.
        </p>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Instant Route Estimate</h2>
          <p className="text-blue-800 text-sm mb-4">
            Transporting your vehicle from {location.origin} includes full carrier insurance, real-time satellite tracking, and zero upfront deposit.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors shadow-sm">
            Calculate Quote for {location.origin}
          </button>
        </div>

        <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Why Choose Our {location.origin} Transport Service?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Licensed and bonded carriers operating directly out of {location.state}.</li>
            <li>Transparent pricing with no hidden terminal fees.</li>
            <li>Dedicated support team monitoring your vehicle from pickup to drop-off.</li>
          </ul>
        </section>

        {relatedLocations.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              More Shipping Routes in {location.state}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedLocations.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/shipping/${rel.slug}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline text-sm block p-2 bg-gray-50 rounded border border-gray-100"
                  >
                    Car Shipping from {rel.origin} &rarr;
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}