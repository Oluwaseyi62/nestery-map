
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-6 w-6 text-realestate-blue" />
              <span className="font-bold text-xl text-realestate-darkblue">NesteryMap</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Find your dream home with our curated selection of properties across the country.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                aria-label="Facebook" 
                className="text-muted-foreground hover:text-realestate-blue transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="text-muted-foreground hover:text-realestate-blue transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className="text-muted-foreground hover:text-realestate-blue transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className="text-muted-foreground hover:text-realestate-blue transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Condos
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Townhouses
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-realestate-blue transition-colors">
                  Land
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Property Street</p>
              <p>Real Estate City, 90210</p>
              <p className="mt-4">Email: info@nesterymap.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NesteryMap. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="#" className="hover:text-realestate-blue transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-realestate-blue transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-realestate-blue transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
