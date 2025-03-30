
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };

  return (
    <>
      <div className="relative">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
          <img
            src={images[activeIndex]}
            alt={`${title} - Image ${activeIndex + 1}`}
            className="object-cover w-full h-full"
          />
          
          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/70 hover:bg-white rounded-full w-9 h-9"
            aria-label="View fullscreen"
          >
            <Expand className="h-5 w-5 text-gray-800" />
          </Button>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full w-9 h-9"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </Button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2 snap-x">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 cursor-pointer snap-center w-20 h-20 rounded-md overflow-hidden border-2 transition-all
                  ${activeIndex === index ? 'border-realestate-blue opacity-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => setActiveIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`${title} - Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 z-10"
            aria-label="Close fullscreen"
          >
            <X className="h-6 w-6 text-white" />
          </Button>
          
          <div className="relative w-full h-full flex items-center">
            <img
              src={images[activeIndex]}
              alt={`${title} - Fullscreen Image ${activeIndex + 1}`}
              className="max-h-[90vh] max-w-full mx-auto object-contain"
            />
          </div>
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full w-12 h-12"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full w-12 h-12"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </Button>
            </>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-md">
            {activeIndex + 1} / {images.length}
          </div>
          
          {/* Thumbnails */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <div 
                key={index}
                className={`flex-shrink-0 cursor-pointer w-16 h-16 rounded-md overflow-hidden border-2 transition-all
                  ${activeIndex === index ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                onClick={() => setActiveIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
