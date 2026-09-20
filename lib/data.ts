export interface FAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  origin: string;
  city: string;
  state: string;
  population: number;
  corridor: string;
  baseRate: number;
  leadTime: string;
  popularRoute: string;
  faqs: FAQ[];
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
  const baseLocations: LocationData[] = [];
  
  states.forEach((state) => {
    baseCities.forEach((city, index) => {
      const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-');
      const citySlug = city.name.toLowerCase().replace(/\s+/g, '-');
      const slug = `${stateSlug}-${citySlug}-to-miami`;
      const baseRateVal = 950 + (index * 75);
      const leadTimeVal = '24–48 Hours';
      const originName = `${city.name}, ${state.name}`;
      
      const faqs: FAQ[] = [
        {
          question: `How much does it cost to ship a car from ${originName} to Miami?`,
          answer: `Transport rates from ${originName} start at around $${baseRateVal}, depending on vehicle size, seasonality, and transport type.`
        },
        {
          question: `What is the typical transit and dispatch time from ${originName}?`,
          answer: `Carrier dispatch for routes along the ${state.corridor} typically takes ${leadTimeVal}.`
        },
        {
          question: `Is insurance included when shipping from ${state.name}?`,
          answer: `Yes, all vehicle transport services originating from ${state.name} include full cargo insurance coverage from pickup to delivery.`
        }
      ];

      baseLocations.push({
        slug,
        origin: originName,
        city: city.name,
        state: state.name,
        population: city.pop + index * 1000,
        corridor: state.corridor,
        baseRate: baseRateVal,
        leadTime: leadTimeVal,
        popularRoute: `${city.name} to Miami`,
        faqs,
      });
    });
  });

  const expandedLocations: LocationData[] = [];
  for (let i = 0; i < 75; i++) {
    baseLocations.forEach((loc, idx) => {
      const newRate = 900 + ((i + idx) % 350);
      const newLead = i % 2 === 0 ? '12–24 Hours' : '24–48 Hours';
      const expandedSlug = `${loc.slug}-${i}`;
      
      const expandedFaqs: FAQ[] = [
        {
          question: `How much does it cost to ship a car from ${loc.origin} (Route #${i})?`,
          answer: `Baseline rates for this specific route start at $${newRate} with full carrier protection.`
        },
        {
          question: `What is the estimated dispatch window for ${loc.origin}?`,
          answer: `Carriers along the ${loc.corridor} corridor are normally dispatched within ${newLead}.`
        },
        {
          question: `Do you provide door-to-door transport in ${loc.state}?`,
          answer: `Yes, we offer direct door-to-door vehicle pickup and delivery across all local districts in ${loc.state}.`
        }
      ];

      expandedLocations.push({
        slug: expandedSlug,
        origin: loc.origin,
        city: loc.city,
        state: loc.state,
        population: loc.population + i * 123,
        corridor: loc.corridor,
        baseRate: newRate,
        leadTime: newLead,
        popularRoute: loc.popularRoute,
        faqs: expandedFaqs,
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