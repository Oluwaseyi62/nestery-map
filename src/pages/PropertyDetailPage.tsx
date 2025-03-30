
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyDetail from "@/components/PropertyDetail";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { Property } from "@/types/property";
import { ArrowLeft } from "lucide-react";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get property by ID
    const foundProperty = properties.find(p => p.id === id) || null;
    setProperty(foundProperty);
    setLoading(false);
    
    if (foundProperty) {
      // Find similar properties (same type, similar price range)
      const similar = properties
        .filter(p => 
          p.id !== foundProperty.id && 
          (p.propertyType === foundProperty.propertyType || 
          Math.abs(p.price - foundProperty.price) < foundProperty.price * 0.3)
        )
        .slice(0, 3);
      setSimilarProperties(similar);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse">Loading property details...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Link to="/properties" className="text-realestate-blue hover:underline flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <PropertyDetail property={property} />
        
        {similarProperties.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map(prop => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
