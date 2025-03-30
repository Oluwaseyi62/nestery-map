
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  areaUnit: string;
  images: string[];
  amenities: string[];
  propertyType: string;
  status: 'For Sale' | 'For Rent' | 'Sold' | 'Pending';
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  amenities?: string[];
  status?: string;
}
