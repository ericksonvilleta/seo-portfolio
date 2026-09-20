export interface ServiceLocation {
  city: string;
  state: string;
  slug: string;
  population: string;
  popularRoute: string;
}

export function getAllLocations(): ServiceLocation[] {
  const cities = [
    "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", 
    "San Antonio", "San Diego", "Dallas", "Austin", "Jacksonville"
  ];
  const states = [
    "California", "Illinois", "Texas", "Arizona", "Pennsylvania", 
    "Texas", "California", "Texas", "Texas", "Florida"
  ];
  
  const locations: ServiceLocation[] = [];

  // Generating over 1,000 combinations programmatically for demonstration
  for (let i = 0; i < 120; i++) {
    cities.forEach((city, index) => {
      locations.push({
        city: `${city} District ${i + 1}`,
        state: states[index],
        slug: `${city.toLowerCase().replace(/\s+/g, "-")}-district-${i + 1}-to-miami`,
        population: `${(Math.random() * 500 + 50).toFixed(0)},000`,
        popularRoute: `Interstate ${Math.floor(Math.random() * 80 + 10)}`
      });
    });
  }

  return locations;
}

export function getLocationBySlug(slug: string): ServiceLocation | undefined {
  const locations = getAllLocations();
  return locations.find((loc) => loc.slug === slug);
}