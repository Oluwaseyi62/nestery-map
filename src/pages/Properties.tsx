
import { useState } from "react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import Footer from "@/components/Footer";
import { properties } from "@/data/properties";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Properties() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<string>("newest");

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
    
    sortProperties(result, sortOrder);
    setFilteredProperties(result);
  };

  const sortProperties = (props: Property[], order: string) => {
    switch (order) {
      case "price-asc":
        return props.sort((a, b) => a.price - b.price);
      case "price-desc":
        return props.sort((a, b) => b.price - a.price);
      case "newest":
        return props.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "bedrooms":
        return props.sort((a, b) => b.bedrooms - a.bedrooms);
      default:
        return props;
    }
  };

  const handleSort = (value: string) => {
    setSortOrder(value);
    const sorted = [...filteredProperties];
    sortProperties(sorted, value);
    setFilteredProperties(sorted);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Browse Properties</h1>
        <p className="text-muted-foreground mb-6">
          Find your perfect property from our extensive listings.
        </p>
        
        {/* Desktop filters */}
        <div className="hidden md:block">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>
        
        {/* Mobile filters in sheet */}
        <div className="md:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
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
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <p className="mb-4 sm:mb-0 text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProperties.length}</span> properties
          </p>
          
          <div className="flex items-center space-x-2">
            <Select value={sortOrder} onValueChange={handleSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 py-2 rounded-none rounded-l-md ${viewMode === "grid" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-3 py-2 rounded-none rounded-r-md ${viewMode === "list" ? "bg-muted" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border">
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search filters to find more properties.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilteredProperties(properties);
                // Reset filters would happen here in a real app
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className={`
            grid gap-6
            ${viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
            }
          `}>
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                className={viewMode === "list" ? "sm:flex sm:flex-row" : ""}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
