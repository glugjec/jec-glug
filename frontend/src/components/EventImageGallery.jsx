import React, { useState } from 'react';

const EventImageGallery = ({ imageUrls = [], imageUrl, alt = 'Event Image', className = '', imgClassName = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = imageUrls && imageUrls.length > 0 
    ? imageUrls 
    : (imageUrl ? [imageUrl] : []);

  if (images.length === 0) {
    return (
      <div className={`bg-slate-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  const isMultiple = images.length > 1;

  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {/* Image container */}
      <img
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className={`w-full h-full object-cover transition-all duration-300 ${imgClassName}`}
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/400x300/1e293b/ffffff?text=No+Image';
          e.currentTarget.onerror = null;
        }}
      />

      {/* Navigation Arrows */}
      {isMultiple && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 z-10 cursor-pointer"
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
              onClick={(e) => handleDotClick(e, index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
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
