
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CheckIcon, ChevronDown, Filter, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PropertyFilters } from "@/types/property";
import { amenities, propertyTypes, propertyStatus } from "@/data/properties";

interface PropertyFiltersProps {
  onFilterChange: (filters: PropertyFilters) => void;
}

export default function PropertyFiltersComponent({ onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const applyFilters = () => {
    const updatedFilters: PropertyFilters = {
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      amenities: selectedAmenities
    };
    onFilterChange(updatedFilters);
    setIsFiltersOpen(false);
  };

  const resetFilters = () => {
    setFilters({});
    setPriceRange([0, 2000000]);
    setSelectedAmenities([]);
    onFilterChange({});
    setIsFiltersOpen(false);
  };

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleBedroomsChange = (value: string) => {
    if (value === "") {
      const { bedrooms, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, bedrooms: parseInt(value) });
    }
  };

  const handleBathroomsChange = (value: string) => {
    if (value === "") {
      const { bathrooms, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, bathrooms: parseInt(value) });
    }
  };

  const handlePropertyTypeChange = (value: string) => {
    if (value === "") {
      const { propertyType, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, propertyType: value });
    }
  };

  const handleStatusChange = (value: string) => {
    if (value === "") {
      const { status, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, status: value });
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const activeFiltersCount = Object.keys(filters).length + (selectedAmenities.length > 0 ? 1 : 0);

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Search Properties</h2>
        {activeFiltersCount > 0 && (
          <Badge variant="outline" className="flex items-center gap-1">
            {activeFiltersCount} Filter{activeFiltersCount > 1 ? 's' : ''} Active
            <button onClick={resetFilters} className="ml-1 text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select value={filters.bedrooms?.toString() || ""} onValueChange={handleBedroomsChange}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select value={filters.bathrooms?.toString() || ""} onValueChange={handleBathroomsChange}>
            <SelectTrigger id="bathrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-type">Property Type</Label>
          <Select value={filters.propertyType || ""} onValueChange={handlePropertyTypeChange}>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Type</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status || ""} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Any Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any Status</SelectItem>
              {propertyStatus.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4">
        <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> 
              More Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 md:w-[500px] p-5" align="start">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <Slider
                  min={0}
                  max={2000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mt-2"
                />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.slice(0, 10).map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox 
                        id={amenity} 
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <label
                        htmlFor={amenity}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Reset All
                </Button>
                <Button onClick={applyFilters} className="bg-realestate-blue hover:bg-realestate-darkblue">
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.minPrice !== undefined && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Min: {formatPrice(filters.minPrice)}
              <button onClick={() => {
                const { minPrice, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {filters.maxPrice !== undefined && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Max: {formatPrice(filters.maxPrice)}
              <button onClick={() => {
                const { maxPrice, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {filters.bedrooms && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.bedrooms}+ Beds
              <button onClick={() => {
                const { bedrooms, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {filters.bathrooms && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.bathrooms}+ Baths
              <button onClick={() => {
                const { bathrooms, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {filters.propertyType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.propertyType}
              <button onClick={() => {
                const { propertyType, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.status}
              <button onClick={() => {
                const { status, ...rest } = filters;
                setFilters(rest);
              }}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
          {selectedAmenities.length > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedAmenities.length} Amenities
              <button onClick={() => setSelectedAmenities([])}>
                <X className="h-3 w-3 ml-1" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
