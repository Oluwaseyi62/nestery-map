
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, User, Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-realestate-blue" />
              <span className="font-bold text-xl text-realestate-darkblue">NesteryMap</span>
            </Link>
            <nav className="hidden ml-10 md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-realestate-blue transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-sm font-medium text-gray-700 hover:text-realestate-blue transition-colors">
                Properties
              </Link>
              <Link to="/map" className="text-sm font-medium text-gray-700 hover:text-realestate-blue transition-colors">
                Map View
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-700">
              <Heart className="h-4 w-4 mr-2" />
              Saved
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button size="sm" className="bg-realestate-blue hover:bg-realestate-darkblue">
              List Property
            </Button>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-realestate-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-realestate-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/map" 
              className="flex items-center py-2 text-sm font-medium text-gray-700 hover:text-realestate-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Map View
            </Link>
            <hr className="my-2" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start text-gray-700 px-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="h-4 w-4 mr-2" />
              Saved Properties
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start text-gray-700 px-0"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4 mr-2" />
              My Account
            </Button>
            <Button 
              size="sm" 
              className="mt-2 w-full bg-realestate-blue hover:bg-realestate-darkblue"
              onClick={() => setIsMenuOpen(false)}
            >
              List Your Property
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
