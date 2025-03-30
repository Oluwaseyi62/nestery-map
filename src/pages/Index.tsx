
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import MapComponent from "@/components/Map";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import { ArrowRight, Home, Building, Search, MapPin } from "lucide-react";

export default function Index() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [activeView, setActiveView] = useState<"grid" | "map">("grid");
  const featuredProperties = properties.slice(0, 3);

  const handleFilterChange = (filters: PropertyFiltersType) => {
    let result = [...properties];
    
    if (filters.minPrice !== undefined) {
      result = result.filter(property => property.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(property => property.price <= filters.maxPrice!);
    }
    
    if (filters.bedrooms !== undefined) {
      result = result.filter(property => property.bedrooms >= filters.bedrooms!);
    }
    
    if (filters.bathrooms !== undefined) {
      result = result.filter(property => property.bathrooms >= filters.bathrooms!);
    }
    
    if (filters.propertyType) {
      result = result.filter(property => property.propertyType === filters.propertyType);
    }
    
    if (filters.status) {
      result = result.filter(property => property.status === filters.status);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
      result = result.filter(property => 
        filters.amenities!.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    setFilteredProperties(result);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-realestate-darkblue to-realestate-blue py-20 md:py-32 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Real estate background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Dream Home Today
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Browse thousands of properties across the country and find the perfect place to call home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-realestate-darkblue hover:bg-gray-100"
              >
                <Link to="/properties">
                  <Search className="mr-2 h-5 w-5" /> Browse Properties
                </Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
              >
                <Link to="/map">
                  <MapPin className="mr-2 h-5 w-5" /> View Map
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
            Find Properties by Type
          </h2>
          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
            Whether you're looking for an apartment in the city or a house in the suburbs, 
            we have the perfect property for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-realestate-lightblue/30 rounded-full mb-4">
                <Home className="h-8 w-8 text-realestate-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Houses</h3>
              <p className="text-muted-foreground mb-4">
                Spacious family homes with yards, perfect for growing families.
              </p>
              <Button asChild variant="link" className="text-realestate-blue">
                <Link to="/properties" className="flex items-center">
                  Browse Houses <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-realestate-lightblue/30 rounded-full mb-4">
                <Building className="h-8 w-8 text-realestate-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Apartments</h3>
              <p className="text-muted-foreground mb-4">
                Modern urban living with amenities and convenient locations.
              </p>
              <Button asChild variant="link" className="text-realestate-blue">
                <Link to="/properties" className="flex items-center">
                  Browse Apartments <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-realestate-lightblue/30 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-realestate-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Land</h3>
              <p className="text-muted-foreground mb-4">
                Build your dream home on a perfect plot of undeveloped land.
              </p>
              <Button asChild variant="link" className="text-realestate-blue">
                <Link to="/properties" className="flex items-center">
                  Browse Land <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Properties</h2>
              <p className="text-muted-foreground">Handpicked properties for you to explore</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/properties" className="flex items-center">
                View All Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Map Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore Properties on the Map</h2>
              <p className="text-muted-foreground">Find properties in your desired location</p>
            </div>
            <Button asChild className="mt-4 md:mt-0 bg-realestate-blue hover:bg-realestate-darkblue">
              <Link to="/map">Open Full Map</Link>
            </Button>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-sm">
            <MapComponent properties={properties} height="500px" />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-realestate-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Browse our extensive collection of properties and find the perfect place for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-realestate-darkblue hover:bg-gray-100">
              <Link to="/properties">Browse All Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/map">View Map</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
