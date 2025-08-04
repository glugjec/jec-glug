import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await axios.get("https://glug-website-backend.vercel.app/gallery");

        const imagesWithDefaults = response.data.map((img, idx) => ({
          ...img,
          title: img.title || `Image ${idx + 1}`,
          description: img.description || "GLUG Gallery Image",
        }));

        setImages(imagesWithDefaults);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrevious = () =>
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  const goToNext = () =>
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);

  if (isLoading) {
    return (
      <section className="w-screen flex justify-center items-center py-12 min-h-[600px]" style={{ background: "linear-gradient(to bottom, #03022C, #151C57)" }}>
        <div className="text-white text-xl">Loading gallery...</div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="w-screen flex justify-center items-center py-12 min-h-[600px]" style={{ background: "linear-gradient(to bottom, #03022C, #151C57)" }}>
        <div className="text-white text-xl">No gallery images found.</div>
      </section>
    );
  }

  return (
    <section className="w-screen flex justify-center items-center py-12" style={{ background: "linear-gradient(to bottom, #03022C, #151C57)" }}>
      <div className="max-w-6xl w-full px-4">
        <h2 className="font-poppins text-4xl font-bold text-white mb-8 text-center">
          Gallery
        </h2>
        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
          <div className="relative overflow-hidden rounded-2xl mb-6 group">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image) => (
                <div key={image._id} className="w-full flex-shrink-0 relative">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/800x500/161D58/FFFFFF?text=Gallery+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2 line-clamp-1 overflow-hidden text-ellipsis">{image.title}</h3>
                      <p className="text-blue-200 line-clamp-2 overflow-hidden text-ellipsis">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail preview */}
          <div className="flex justify-center space-x-3 mb-4">
            {images.map((image, index) => (
              <button
                key={image._id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-400 scale-110' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/80x80/161D58/FFFFFF?text=Img';
                  }}
                />
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
