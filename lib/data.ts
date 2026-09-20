export interface LocationData {
  slug: string;
  origin: string;
  state: string;
  population: number;
  corridor: string;
}

// Mock dataset generator representing 1,200+ programmatic SEO pages
const states = [
  { name: 'California', abbr: 'CA', corridor: 'Interstate 5' },
  { name: 'Texas', abbr: 'TX', corridor: 'Interstate 35' },
  { name: 'Florida', abbr: 'FL', corridor: 'Interstate 95' },
  { name: 'New York', abbr: 'NY', corridor: 'Interstate 80' },
];

const baseCities = [
  { name: 'District 1', pop: 399000 },
  { name: 'District 2', pop: 245000 },
  { name: 'Metro Core', pop: 512000 },
  { name: 'Suburban Hub', pop: 188000 },
];

export function getAllLocations(): LocationData[] {
  const locations: LocationData[] = [];
  
  states.forEach((state) => {
    baseCities.forEach((city, index) => {
      const slug = `${city.name.toLowerCase().replace(/\s+/g, '-')}-to-miami`;
      locations.push({
        slug: `${state.name.toLowerCase().replace(/\s+/g, '-')}-${slug}`,
        origin: `${state.name} ${city.name}`,
        state: state.name,
        population: city.pop + index * 1000,
        corridor: state.corridor,
      });
    });
  });

  // Expand to simulate 1,200+ pages for portfolio demonstration
  const expandedLocations: LocationData[] = [];
  for (let i = 0; i < 75; i++) {
    locations.forEach((loc) => {
      expandedLocations.push({
        ...loc,
        slug: `${loc.slug}-${i}`,
        population: loc.population + i * 123,
      });
    });
  }

  return expandedLocations;
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  const locations = getAllLocations();
  return locations.find((loc) => loc.slug === slug);
}

export function getRelatedLocations(currentState: string, currentSlug: string, limit = 5): LocationData[] {
  const locations = getAllLocations();
  return locations
    .filter((loc) => loc.state === currentState && loc.slug !== currentSlug)
    .slice(0, limit);
}