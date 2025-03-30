
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropertyGallery from "./PropertyGallery";
import MapComponent from "./Map";
import { Bed, Bath, SquareIcon, Heart, MapPin, Share2, Clock, Tag, BuildingIcon, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      toast.success("Added to favorites", {
        description: `${property.title} has been added to your favorites.`,
      });
    } else {
      toast.info("Removed from favorites", {
        description: `${property.title} has been removed from your favorites.`,
      });
    }
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", {
      description: "You can now share this property with others.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Home</span>
          <span>›</span>
          <span>{property.address.city}</span>
          <span>›</span>
          <span>{property.propertyType}</span>
        </div>
        
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-1 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{`${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zipCode}`}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-3xl font-bold text-realestate-darkblue">
              {property.status === 'For Rent' ? `${formatPrice(property.price, property.currency)}/mo` : formatPrice(property.price, property.currency)}
            </span>
            <Badge className="mt-1 bg-realestate-blue hover:bg-realestate-darkblue">
              {property.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <PropertyGallery images={property.images} title={property.title} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-wrap gap-6 py-4 border-y">
            <div className="flex items-center">
              <Bed className="h-5 w-5 mr-2 text-realestate-blue" />
              <div>
                <span className="font-semibold block">{property.bedrooms}</span>
                <span className="text-sm text-muted-foreground">Bedrooms</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2 text-realestate-blue" />
              <div>
                <span className="font-semibold block">{property.bathrooms}</span>
                <span className="text-sm text-muted-foreground">Bathrooms</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <SquareIcon className="h-5 w-5 mr-2 text-realestate-blue" />
              <div>
                <span className="font-semibold block">{property.area}</span>
                <span className="text-sm text-muted-foreground">{property.areaUnit}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <BuildingIcon className="h-5 w-5 mr-2 text-realestate-blue" />
              <div>
                <span className="font-semibold block">{property.propertyType}</span>
                <span className="text-sm text-muted-foreground">Property Type</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">About This Property</h2>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-realestate-blue" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <MapComponent 
              properties={[property]} 
              selectedProperty={property} 
              height="400px"
            />
          </div>
        </div>
        
        <div>
          <div className="bg-white border rounded-lg shadow-sm p-6 sticky top-20">
            <div className="flex flex-col space-y-4">
              <Button 
                className="flex items-center justify-center gap-2 bg-realestate-blue hover:bg-realestate-darkblue"
                onClick={() => toast.success("Request sent!", {
                  description: "A property agent will contact you soon.",
                })}
              >
                Request a Tour
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center justify-center gap-2"
                onClick={() => toast.success("Contact request sent!", {
                  description: "The property owner will get in touch with you.",
                })}
              >
                Contact Owner
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center"
                  onClick={handleFavoriteToggle}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center text-sm mb-3">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Listed on {formatDate(property.createdAt)}</span>
              </div>
              <div className="flex items-center text-sm">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Property ID: {property.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
