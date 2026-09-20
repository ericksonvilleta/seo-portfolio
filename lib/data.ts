import { MetadataRoute } from 'next';
import { getAllLocations } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://seo-portfolio-beryl.vercel.app';
  const locations = getAllLocations();

  const locationUrls = locations.map((loc) => ({
    url: `${baseUrl}/shipping/${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...locationUrls,
  ];
}