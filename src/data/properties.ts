
import { Property } from '../types/property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'A beautiful modern apartment in the heart of downtown with stunning city views. This recently renovated unit features hardwood floors, stainless steel appliances, and floor-to-ceiling windows. The building offers a fitness center, rooftop terrace, and 24/7 concierge service.',
    price: 450000,
    currency: 'USD',
    address: {
      street: '123 Main Street, Apt 5B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    location: {
      lat: 40.7128,
      lng: -74.0060
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Elevator', 'Gym', 'Pool', 'Doorman', 'Parking'],
    propertyType: 'Apartment',
    status: 'For Sale',
    createdAt: '2023-05-10T10:30:00Z',
    updatedAt: '2023-05-15T14:20:00Z'
  },
  {
    id: '2',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood with excellent schools nearby. Features a large backyard, updated kitchen with granite countertops, and a finished basement perfect for entertaining. The two-car garage and ample driveway provide plenty of parking space.',
    price: 750000,
    currency: 'USD',
    address: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    location: {
      lat: 34.0522,
      lng: -118.2437
    },
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Garden', 'Garage', 'Fireplace', 'Basement', 'Central AC'],
    propertyType: 'House',
    status: 'For Sale',
    createdAt: '2023-04-20T09:15:00Z',
    updatedAt: '2023-04-28T11:45:00Z'
  },
  {
    id: '3',
    title: 'Waterfront Luxury Condo',
    description: 'Breathtaking waterfront condo with panoramic ocean views from every room. This luxury unit features high-end finishes, a gourmet kitchen, and a spacious terrace perfect for entertaining. The exclusive building includes valet parking, private beach access, and a full-service spa.',
    price: 1200000,
    currency: 'USD',
    address: {
      street: '789 Bayshore Drive, Unit 12A',
      city: 'Miami',
      state: 'FL',
      zipCode: '33131',
      country: 'USA'
    },
    location: {
      lat: 25.7617,
      lng: -80.1918
    },
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2200,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600607687644-8e64cdef0936?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Beach Access', 'Pool', 'Spa', 'Gym', 'Concierge', 'Security'],
    propertyType: 'Condo',
    status: 'For Sale',
    createdAt: '2023-06-05T08:00:00Z',
    updatedAt: '2023-06-10T16:30:00Z'
  },
  {
    id: '4',
    title: 'Cozy Studio Apartment',
    description: 'Perfect starter home or investment property in a trendy neighborhood. This efficiently designed studio features modern finishes, ample storage space, and large windows that flood the space with natural light. Building amenities include laundry facilities and a communal rooftop garden.',
    price: 1500,
    currency: 'USD',
    address: {
      street: '101 Pine Street, Apt 3C',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94111',
      country: 'USA'
    },
    location: {
      lat: 37.7749,
      lng: -122.4194
    },
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1630699144339-420f59eb6ef8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Laundry', 'Rooftop', 'Pet Friendly', 'Bike Storage'],
    propertyType: 'Studio',
    status: 'For Rent',
    createdAt: '2023-07-12T13:45:00Z',
    updatedAt: '2023-07-15T09:20:00Z'
  },
  {
    id: '5',
    title: 'Historic Townhouse',
    description: 'Beautifully preserved historic townhouse with original architectural details and modern updates. Features include soaring ceilings, hardwood floors, a wood-burning fireplace, and a private garden. Located on a tree-lined street in a highly sought-after historic district.',
    price: 925000,
    currency: 'USD',
    address: {
      street: '222 Walnut Street',
      city: 'Boston',
      state: 'MA',
      zipCode: '02108',
      country: 'USA'
    },
    location: {
      lat: 42.3601,
      lng: -71.0589
    },
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Fireplace', 'Garden', 'Original Hardwood', 'High Ceilings', 'Wine Cellar'],
    propertyType: 'Townhouse',
    status: 'For Sale',
    createdAt: '2023-03-18T11:30:00Z',
    updatedAt: '2023-03-25T14:10:00Z'
  },
  {
    id: '6',
    title: 'Mountain Retreat Cabin',
    description: 'Escape to this charming cabin nestled in the mountains with breathtaking views. The open-concept living area features exposed beams, a stone fireplace, and floor-to-ceiling windows overlooking the forest. Perfect for year-round outdoor activities and peaceful getaways.',
    price: 550000,
    currency: 'USD',
    address: {
      street: '333 Pine Trail',
      city: 'Aspen',
      state: 'CO',
      zipCode: '81611',
      country: 'USA'
    },
    location: {
      lat: 39.1911,
      lng: -106.8175
    },
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1506974210756-8e1b8985d348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ],
    amenities: ['Fireplace', 'Mountain View', 'Deck', 'Hiking Trails', 'Wood Stove'],
    propertyType: 'Cabin',
    status: 'For Sale',
    createdAt: '2023-02-05T16:20:00Z',
    updatedAt: '2023-02-12T10:15:00Z'
  }
];

export const propertyTypes = [
  'Apartment',
  'House',
  'Condo',
  'Studio',
  'Townhouse',
  'Cabin',
  'Duplex',
  'Loft',
  'Villa',
  'Land'
];

export const amenities = [
  'Elevator',
  'Gym',
  'Pool',
  'Doorman',
  'Parking',
  'Garden',
  'Garage',
  'Fireplace',
  'Basement',
  'Central AC',
  'Beach Access',
  'Spa',
  'Concierge',
  'Security',
  'Laundry',
  'Rooftop',
  'Pet Friendly',
  'Bike Storage',
  'Original Hardwood',
  'High Ceilings',
  'Wine Cellar',
  'Mountain View',
  'Deck',
  'Hiking Trails',
  'Wood Stove'
];

export const propertyStatus = [
  'For Sale',
  'For Rent',
  'Sold',
  'Pending'
];
