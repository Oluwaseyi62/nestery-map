
import { Property } from "@/types/property";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, SquareIcon, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export default function PropertyCard({ property, className }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formattedPrice = formatPrice(property.price, property.currency);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={`overflow-hidden transition-all property-card-shadow hover:border-realestate-blue ${className}`}>
      <Link to={`/property/${property.id}`} className="group">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img 
            src={property.images[0]} 
            alt={property.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <Badge 
            className="absolute top-3 left-3 bg-realestate-blue hover:bg-realestate-darkblue"
          >
            {property.status}
          </Badge>
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-realestate-blue transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1 text-realestate-darkblue" />
                <span className="line-clamp-1">
                  {`${property.address.street}, ${property.address.city}, ${property.address.state}`}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xl font-bold text-realestate-darkblue mt-3">
            {property.status === 'For Rent' ? `${formattedPrice}/month` : formattedPrice}
          </p>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1.5" />
              <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1.5" />
              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center">
              <SquareIcon className="h-4 w-4 mr-1.5" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <Badge variant="outline" className="text-xs font-normal">
            {property.propertyType}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Added {new Date(property.createdAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Link>
    </Card>
  );
}
