import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllLocations, getLocationBySlug } from '@/lib/data';

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
    return { title: 'Page Not Found' };
  }

  return {
    title: `Car Shipping from ${location.city}, ${location.state} | Nationwide Auto Transport`,
    description: `Looking for reliable auto transport from ${location.city}, ${location.state}? Get instant quotes, door-to-door tracking, and fully insured vehicle delivery.`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-sm text-gray-500 mb-4">
        Home / Shipping / {location.state} / {location.city}
      </div>
      
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
        Car Shipping from {location.city}, {location.state}
      </h1>
      
      <p className="text-lg text-gray-700 mb-8">
        If you need secure and dependable vehicle transport originating from 
        <strong className="text-gray-900"> {location.city}</strong> in <strong className="text-gray-900">{location.state}</strong> 
        (serving an estimated population of {location.population}), we provide direct nationwide coverage utilizing major corridors like {location.popularRoute}.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-3">Instant Route Estimate</h2>
        <p className="text-blue-700 mb-4">
          Transporting your vehicle from {location.city} includes full carrier insurance, real-time satellite tracking, and zero upfront deposit.
        </p>
        <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Calculate Quote for {location.city}
        </button>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Why Choose Our {location.city} Transport Service?</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Licensed and bonded carriers operating directly out of {location.state}.</li>
          <li>Transparent pricing with no hidden terminal fees.</li>
          <li>Dedicated support team monitoring your vehicle from pickup to drop-off.</li>
        </ul>
      </section>
    </main>
  );
}