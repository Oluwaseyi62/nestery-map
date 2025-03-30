
import { useEffect, useRef, useState } from "react";
import { Property } from "@/types/property";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Since we would normally use Supabase for API keys, we'll use a temporary public token
// In a real application, this would be stored in a secure environment variable
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xlcXhic2tyMDh0aDN4cGd4cGxpc3o0bSJ9.nmQZ7sy7GfRK1zwFhGLMuw";

interface MapComponentProps {
  properties: Property[];
  selectedProperty?: Property;
  onPropertySelect?: (property: Property) => void;
  height?: string;
}

export default function MapComponent({
  properties,
  selectedProperty,
  onPropertySelect,
  height = "500px"
}: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [mapboxTokenInput, setMapboxTokenInput] = useState("");
  const [mapboxTokenSet, setMapboxTokenSet] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // For demo purposes, we'll use a temporary public token
  // In a real app connected to Supabase, you'd get this from environment variables
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_TOKEN);

  const initializeMap = () => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-98.5795, 39.8283], // Center of USA
        zoom: 3
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        addMarkersToMap();
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };

  const addMarkersToMap = () => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for each property
    properties.forEach(property => {
      const { location } = property;
      
      // Create HTML element for marker
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `
        <div class="${property.id === selectedProperty?.id 
          ? 'bg-realestate-blue text-white' 
          : 'bg-white text-realestate-darkblue'
        } rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-md cursor-pointer transform transition-transform hover:scale-110">
          <span class="text-xs font-bold">${formatPrice(property.price)}</span>
        </div>
      `;
      
      // Add marker to map
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="p-2">
            <img src="${property.images[0]}" alt="${property.title}" class="w-full h-32 object-cover rounded-md mb-2" />
            <h3 class="font-medium text-sm">${property.title}</h3>
            <p class="text-xs text-gray-500">${property.address.street}</p>
            <p class="font-bold text-sm mt-1">${formatPrice(property.price)}${property.status === 'For Rent' ? '/month' : ''}</p>
          </div>
        `))
        .addTo(map.current);
        
      // Add click event
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onPropertySelect) {
          onPropertySelect(property);
        }
      });
      
      markers.current.push(marker);
    });
    
    // If properties exist, fit bounds to include all properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach(property => {
        bounds.extend([property.location.lng, property.location.lat]);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  // Focus on selected property
  useEffect(() => {
    if (map.current && selectedProperty) {
      map.current.flyTo({
        center: [selectedProperty.location.lng, selectedProperty.location.lat],
        zoom: 15,
        essential: true
      });
    }
  }, [selectedProperty]);

  // Initialize map when component mounts
  useEffect(() => {
    initializeMap();
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Update markers when properties change
  useEffect(() => {
    if (map.current && mapLoaded) {
      addMarkersToMap();
    }
  }, [properties, mapLoaded, selectedProperty]);

  // Function to format price for marker display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`;
    } else {
      return `$${price}`;
    }
  };

  const handleSubmitToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxTokenInput) {
      setMapboxToken(mapboxTokenInput);
      setMapboxTokenSet(true);
      
      // Reset map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      setMapLoaded(false);
    }
  };

  return (
    <div className="relative">
      {!mapboxTokenSet && mapboxToken === "" ? (
        <Card className="p-4">
          <form onSubmit={handleSubmitToken} className="space-y-4">
            <h3 className="text-lg font-medium">Enter your Mapbox token</h3>
            <p className="text-sm text-muted-foreground">
              This is a temporary solution. In a production app, this would be handled via Supabase secrets.
            </p>
            <div className="flex gap-2">
              <Input
                value={mapboxTokenInput}
                onChange={(e) => setMapboxTokenInput(e.target.value)}
                placeholder="Enter your Mapbox public token"
                className="flex-1"
              />
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Apply
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div 
          ref={mapContainer} 
          className="rounded-lg overflow-hidden" 
          style={{ height }}
        />
      )}

      <style jsx>{`
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
