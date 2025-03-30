
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MapComponent from "@/components/Map";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { PropertyFilters as PropertyFiltersType, Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { LayoutGrid, SlidersHorizontal, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

export default function MapView() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>(undefined);
  const [showPropertyList, setShowPropertyList] = useState(true);

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
    // Clear selected property if it's no longer in filtered results
    if (selectedProperty && !result.some(p => p.id === selectedProperty.id)) {
      setSelectedProperty(undefined);
    }
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    if (window.innerWidth < 768) {
      setShowPropertyList(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar with properties */}
        <div 
          className={`
            flex flex-col bg-white border-r w-full md:w-96 md:min-w-96
            ${showPropertyList ? 'md:flex' : 'hidden md:flex'}
            transition-all duration-300 ease-in-out
            h-[50vh] md:h-auto z-20
          `}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-medium">Properties ({filteredProperties.length})</h2>
            
            {/* Mobile filters button */}
            <div className="flex items-center gap-2 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh]">
                  <SheetHeader>
                    <SheetTitle>Search Filters</SheetTitle>
                    <SheetDescription>
                      Adjust filters to find your perfect property
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <PropertyFilters onFilterChange={handleFilterChange} />
                  </div>
                </SheetContent>
              </Sheet>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => setShowPropertyList(!showPropertyList)}
              >
                {showPropertyList ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Desktop view toggle */}
            <Button 
              asChild
              variant="ghost" 
              size="sm" 
              className="hidden md:flex"
            >
              <Link to="/properties">
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid View
              </Link>
            </Button>
          </div>
          
          {/* Desktop filters */}
          <div className="border-b p-4 hidden md:block">
            <PropertyFilters onFilterChange={handleFilterChange} />
          </div>
          
          {/* Property list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search filters.
                </p>
              </div>
            ) : (
              filteredProperties.map(property => (
                <div 
                  key={property.id} 
                  className={`
                    cursor-pointer transition-all border rounded-lg overflow-hidden
                    ${selectedProperty?.id === property.id 
                      ? 'ring-2 ring-realestate-blue border-realestate-blue' 
                      : 'hover:border-realestate-blue'
                    }
                  `}
                  onClick={() => handlePropertySelect(property)}
                >
                  <PropertyCard property={property} />
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Mobile view toggle button */}
        <button
          className={`
            md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30
            bg-white px-4 py-2 rounded-full shadow-lg border
            flex items-center gap-2 text-sm font-medium
          `}
          onClick={() => setShowPropertyList(!showPropertyList)}
        >
          {showPropertyList ? 'Hide List' : 'Show List'} 
          {showPropertyList ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </button>
        
        {/* Map and selected property view */}
        <div className="flex-1 flex flex-col h-full">
          {/* Selected property on mobile */}
          {selectedProperty && !showPropertyList && (
            <div className="bg-white border-b p-4 md:hidden">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mb-2" 
                onClick={() => setShowPropertyList(true)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to list
              </Button>
              <Link to={`/property/${selectedProperty.id}`}>
                <h3 className="text-lg font-bold">{selectedProperty.title}</h3>
                <p className="text-muted-foreground">{selectedProperty.address.street}</p>
              </Link>
            </div>
          )}
          
          {/* Map */}
          <div className="flex-1">
            <MapComponent 
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
