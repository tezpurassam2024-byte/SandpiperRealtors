import { Property, Agent, Testimonial } from '../types';

export const INITIAL_DEMO_PROPERTIES: Omit<Property, 'id'>[] = [
  {
    title: 'The Azure Horizon Coastal Villa',
    slug: 'the-azure-horizon-coastal-villa',
    referenceNumber: 'SP-VIL-2026-001',
    description: 'An architectural masterpiece perched along the sun-drenched coastline. The Azure Horizon Villa embodies refined modern coastal living with floor-to-ceiling frameless glass panels, private infinity pool spilling into the horizon, Italian travertine flooring, and bespoke automated climate controls. Features a private wine cellar, bespoke kitchen by Boffi, and subterranean 4-bay automotive gallery.',
    propertyType: 'villa',
    listingType: 'sale',
    price: 8450000,
    currency: 'USD',
    location: {
      address: '744 Ocean Vista Boulevard',
      locality: 'Pelican Heights',
      city: 'Newport Beach',
      state: 'California',
      postcode: '92657',
      country: 'United States',
    },
    bedrooms: 5,
    bathrooms: 6,
    area: 7200,
    areaUnit: 'sq.ft',
    carpetArea: 6850,
    amenities: [
      'Infinity Pool',
      'Panoramic Ocean View',
      'Private Spa & Sauna',
      'Smart Home Automation',
      'Temperature-Controlled Wine Cellar',
      'Private Elevator',
      '4-Car Subterranean Garage',
      '24/7 Gated Security'
    ],
    furnishingStatus: 'furnished',
    constructionStatus: 'ready-to-move',
    parkingSpaces: 4,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
    ],
    floorPlans: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    agentId: 'agent-1',
    agentName: 'Eleanor Vance',
    featured: true,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: 'The Sovereign Sky Penthouse',
    slug: 'the-sovereign-sky-penthouse',
    referenceNumber: 'SP-PEN-2026-002',
    description: 'Commanding uninterrupted 360-degree city and park panoramas, The Sovereign Penthouse spans the top two levels of a signature skyscraper. Offering an opulent double-height atrium living room, private rooftop terrace with heated hydrotherapy pool, chef kitchen with Gaggenau suites, and private biometric direct elevator access.',
    propertyType: 'penthouse',
    listingType: 'sale',
    price: 12200000,
    currency: 'USD',
    location: {
      address: '880 Park Central Avenue, Tower 1',
      locality: 'Midtown Skyline',
      city: 'Manhattan',
      state: 'New York',
      postcode: '10022',
      country: 'United States',
    },
    bedrooms: 4,
    bathrooms: 5,
    area: 5850,
    areaUnit: 'sq.ft',
    carpetArea: 5500,
    amenities: [
      'Private Rooftop Terrace',
      'Heated Hydrotherapy Pool',
      'Direct Biometric Elevator',
      'Double-Height Ceiling (24ft)',
      'Concierge & Valet Service',
      'Private Fitness Suite',
      'Sub-Zero & Gaggenau Appliances'
    ],
    furnishingStatus: 'furnished',
    constructionStatus: 'ready-to-move',
    parkingSpaces: 3,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80'
    ],
    agentId: 'agent-2',
    agentName: 'Julian Sterling',
    featured: true,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: 'The Grove Heritage Residence',
    slug: 'the-grove-heritage-residence',
    referenceNumber: 'SP-HOU-2026-003',
    description: 'Immaculately restored classic Georgian-inspired estate surrounded by century-old oak groves. Featuring French oak herringbone parquetry, hand-carved limestone fireplaces, custom Clive Christian cabinetry, manicured English rose gardens, private tennis court, and detached guest lodge.',
    propertyType: 'house',
    listingType: 'sale',
    price: 6150000,
    currency: 'USD',
    location: {
      address: '14 Meadowlark Ridge Road',
      locality: 'Greenwich Country Club',
      city: 'Greenwich',
      state: 'Connecticut',
      postcode: '06830',
      country: 'United States',
    },
    bedrooms: 6,
    bathrooms: 7,
    area: 8400,
    areaUnit: 'sq.ft',
    carpetArea: 8000,
    amenities: [
      'Private Tennis Court',
      'Heated Saltwater Pool',
      'Detached Guest Carriage House',
      'English Boxwood Topiary Gardens',
      'Library with Custom Millwork',
      'Gourmet Outdoor Summer Kitchen'
    ],
    furnishingStatus: 'semi-furnished',
    constructionStatus: 'ready-to-move',
    parkingSpaces: 5,
    yearBuilt: 2021,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ],
    agentId: 'agent-1',
    agentName: 'Eleanor Vance',
    featured: true,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Aura Waterfront Luxury Flat',
    slug: 'aura-waterfront-luxury-flat',
    referenceNumber: 'SP-APT-2026-004',
    description: 'Contemporary waterfront apartment offering seamless indoor-outdoor terrace living. Panoramic harbor views, bespoke minimalist interior finishes, marble island kitchen, acoustic soundproofing, and full access to private marina slips.',
    propertyType: 'apartment',
    listingType: 'rent',
    price: 9500,
    currency: 'USD',
    location: {
      address: '320 Marina Walkway, Unit 14B',
      locality: 'Bayside Promenade',
      city: 'Miami',
      state: 'Florida',
      postcode: '33132',
      country: 'United States',
    },
    bedrooms: 3,
    bathrooms: 3,
    area: 2450,
    areaUnit: 'sq.ft',
    carpetArea: 2300,
    amenities: [
      'Marina Access',
      'Wraparound Terrace',
      'Harbor Sunset Views',
      '24/7 Doorman',
      'Olympic Lap Pool',
      'Resident Wellness Spa'
    ],
    furnishingStatus: 'furnished',
    constructionStatus: 'ready-to-move',
    parkingSpaces: 2,
    yearBuilt: 2023,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80'
    ],
    agentId: 'agent-3',
    agentName: 'Marcus Bennett',
    featured: false,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Solstice Prime Corporate Tower HQ',
    slug: 'solstice-prime-corporate-tower-hq',
    referenceNumber: 'SP-COM-2026-005',
    description: 'LEED Platinum-certified premier commercial office suite situated on an entire column-free floor. High acoustic ceilings, integrated enterprise fiber infrastructure, dedicated executive boardroom, and private executive terrace.',
    propertyType: 'office',
    listingType: 'commercial',
    price: 34000,
    currency: 'USD',
    location: {
      address: '500 Financial Boulevard, Level 28',
      locality: 'Financial District',
      city: 'Chicago',
      state: 'Illinois',
      postcode: '60606',
      country: 'United States',
    },
    bedrooms: 0,
    bathrooms: 4,
    area: 11500,
    areaUnit: 'sq.ft',
    carpetArea: 10800,
    amenities: [
      'LEED Platinum Certified',
      'High-Speed Dedicated Elevators',
      'Acoustic Executive Boardrooms',
      'Enterprise Fiber Connectivity',
      'Private Terrace',
      'Covered Executive Parking'
    ],
    furnishingStatus: 'semi-furnished',
    constructionStatus: 'ready-to-move',
    parkingSpaces: 10,
    yearBuilt: 2024,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80'
    ],
    agentId: 'agent-2',
    agentName: 'Julian Sterling',
    featured: true,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  },
  {
    title: 'The Luminara Eco-Architectural Villas',
    slug: 'the-luminara-eco-architectural-villas',
    referenceNumber: 'SP-NEW-2026-006',
    description: 'An exclusive enclave of ten boutique net-zero architectural villas nestled into lush native hillsides. Designed by internationally acclaimed studio Kanso Architects, each home features rammed earth feature walls, passive solar heating, geothermal cooling, and private organic vineyards.',
    propertyType: 'villa',
    listingType: 'new-development',
    price: 4950000,
    currency: 'USD',
    location: {
      address: '80 Silverado Hill Crest',
      locality: 'Oakville Valley',
      city: 'Napa Valley',
      state: 'California',
      postcode: '94558',
      country: 'United States',
    },
    bedrooms: 4,
    bathrooms: 5,
    area: 4600,
    areaUnit: 'sq.ft',
    carpetArea: 4400,
    amenities: [
      'Net-Zero Carbon Footprint',
      'Geothermal Climate System',
      'Private Micro-Vineyard',
      'Natural Stone Dipping Pool',
      'Integrated Solar Battery Array',
      'Floor-to-Ceiling Thermal Glazing'
    ],
    furnishingStatus: 'unfurnished',
    constructionStatus: 'under-construction',
    parkingSpaces: 3,
    yearBuilt: 2027,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    agentId: 'agent-3',
    agentName: 'Marcus Bennett',
    featured: true,
    publicationStatus: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString()
  }
];

export const INITIAL_DEMO_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Eleanor Vance',
    role: 'Principal Partner & Luxury Residential Lead',
    email: 'e.vance@sandpiperrealtors.com',
    phone: '+1 (555) 234-8901',
    bio: 'With over 16 years representing architectural icons and coastal estates across California and the Northeast, Eleanor is known for discrete representation and nuanced market insight.',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    active: true,
    assignedListingsCount: 14,
    specialization: 'Coastal Estates & Historic Architecture'
  },
  {
    id: 'agent-2',
    name: 'Julian Sterling',
    role: 'Senior Vice President — Commercial & Penthouses',
    email: 'j.sterling@sandpiperrealtors.com',
    phone: '+1 (555) 345-6789',
    bio: 'Julian advises family offices, REITs, and private institutional clients on high-yield trophy commercial acquisitions and world-class metropolitan penthouses.',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    active: true,
    assignedListingsCount: 9,
    specialization: 'Skyline Penthouses & Class-A Commercial'
  },
  {
    id: 'agent-3',
    name: 'Marcus Bennett',
    role: 'Director of New Architectural Developments',
    email: 'm.bennett@sandpiperrealtors.com',
    phone: '+1 (555) 456-7890',
    bio: 'Specialising in sustainable luxury developments and off-market waterfront enclaves, Marcus bridges architectural vision with strategic investor acquisition.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    active: true,
    assignedListingsCount: 11,
    specialization: 'Boutique Developments & Eco-Luxury'
  }
];

export const INITIAL_DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Harrison & Claire Sterling',
    role: 'Private Clients, Newport Beach',
    content: 'Sandpiper Realtors orchestrated the acquisition of our coastal estate with total discretion and consummate expertise. Eleanor Vance understood our architectural criteria instantly.',
    rating: 5,
    approved: true,
    featured: true,
    propertyPurchased: 'The Azure Horizon Coastal Villa'
  },
  {
    id: 'test-2',
    author: 'Dr. Aris Thorne',
    role: 'Private Investor, New York City',
    content: 'Julian Sterling and the Sandpiper advisory team provided unparalleled analytical clarity when purchasing our Manhattan penthouse. Their contractual acumen was indispensable.',
    rating: 5,
    approved: true,
    featured: true,
    propertyPurchased: 'The Sovereign Sky Penthouse'
  },
  {
    id: 'test-3',
    author: 'Sophia Chen-Delacroix',
    role: 'Architectural Collector',
    content: 'The depth of market knowledge, integrity of communication, and seamless coordination of private inspections made working with Sandpiper an absolute pleasure.',
    rating: 5,
    approved: true,
    featured: true,
    propertyPurchased: 'The Grove Heritage Residence'
  }
];

export const POPULAR_LOCATIONS = [
  {
    id: 'loc-newport',
    name: 'Newport Beach',
    region: 'Southern California',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    propertyCount: 12,
    tag: 'Coastal Luxury'
  },
  {
    id: 'loc-manhattan',
    name: 'Manhattan Skyline',
    region: 'New York City',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    propertyCount: 18,
    tag: 'Metropolitan High-Rise'
  },
  {
    id: 'loc-greenwich',
    name: 'Greenwich Country',
    region: 'Connecticut',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    propertyCount: 8,
    tag: 'Equestrian & Heritage'
  },
  {
    id: 'loc-miami',
    name: 'Miami Bayside',
    region: 'South Florida',
    image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=80',
    propertyCount: 15,
    tag: 'Waterfront Living'
  }
];
