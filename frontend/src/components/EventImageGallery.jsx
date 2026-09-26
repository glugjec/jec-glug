import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const EventImageGallery = ({ imageUrls = [], imageUrl, alt = 'Event Image', className = '', imgClassName = '' }) => {
  const images = imageUrls && imageUrls.length > 0 
    ? imageUrls 
    : (imageUrl ? [imageUrl] : []);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  if (images.length === 0) {
    return (
      <div className={`bg-slate-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    );
  }

  const isMultiple = images.length > 1;

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full h-full" ref={isMultiple ? emblaRef : null}>
        {/* Embla Container */}
        <div className="flex w-full h-full">
          {images.map((src, index) => (
            <div className="flex-[0_0_100%] min-w-0 w-full h-full relative" key={`${src}-${index}`}>
              <img
                src={src}
                alt={`${alt} image ${index + 1}`}
                loading={index === 0 ? undefined : "lazy"}
                className={`w-full h-full object-cover block ${imgClassName}`}
                onError={(e) => {
                  const fallbackSrc = 'https://placehold.co/400x300/1e293b/ffffff?text=No+Image';
                  if (e.currentTarget.src !== fallbackSrc) {
                    e.currentTarget.src = fallbackSrc;
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {isMultiple && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm motion-safe:transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-10 cursor-pointer hidden sm:block outline-none focus-visible:ring-2 focus-visible:ring-[#8AE6FF]"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm motion-safe:transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 z-10 cursor-pointer hidden sm:block outline-none focus-visible:ring-2 focus-visible:ring-[#8AE6FF]"
            aria-label="Next image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {isMultiple && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => scrollTo(e, index)}
              className={`w-1.5 h-1.5 rounded-full motion-safe:transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#8AE6FF] focus-visible:ring-offset-1 focus-visible:ring-offset-transparent ${
                index === selectedIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventImageGallery;
