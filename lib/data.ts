export interface LocationData {
  slug: string;
  origin: string;
  state: string;
  population: number;
  corridor: string;
  baseRate: number;
  leadTime: string;
}

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
        baseRate: 950 + (index * 75),
        leadTime: '24–48 Hours',
      });
    });
  });

  const expandedLocations: LocationData[] = [];
  for (let i = 0; i < 75; i++) {
    locations.forEach((loc, idx) => {
      expandedLocations.push({
        ...loc,
        slug: `${loc.slug}-${i}`,
        population: loc.population + i * 123,
        baseRate: 900 + ((i + idx) % 350),
        leadTime: i % 2 === 0 ? '12–24 Hours' : '24–48 Hours',
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