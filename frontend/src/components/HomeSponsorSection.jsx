import React, { useState, useEffect } from 'react'
import assamLogo from '../assets/sponsor_logo/assam.png';
import frintLogo from '../assets/sponsor_logo/frint.jpg';
import saurabhiLogo from '../assets/sponsor_logo/saurabhi.png';
import oilLogo from '../assets/sponsor_logo/oil.jpg';
import instrumentLogo from '../assets/sponsor_logo/instrument.jpg';

const HomeSponsorSection = () => {
  const sponsors = [
    { id: 1, src: assamLogo, alt: "Assam" },
    { id: 2, src: saurabhiLogo, alt: "Saurabhi" },
    { id: 3, src: frintLogo, alt: "Frint" },
    { id: 4, src: instrumentLogo, alt: "Instrument" },
    { id: 5, src: oilLogo, alt: "Oil" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        
        const nextIndex = prevIndex + 2;
        return nextIndex >= sponsors.length ? 0 : nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  // Get current pair of sponsors to display
  const getCurrentSponsors = () => {
    const current = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % sponsors.length;
      current.push(sponsors[index]);
    }
    return current;
  };

  return (
    <div className="w-screen py-6 mx-auto mt-12 mb-8 relative left-1/2 right-1/2 -translate-x-1/2">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Our Sponsors</h2>
      
      
      <div className="flex justify-center items-center gap-4 md:gap-8 px-4 min-h-[100px] md:min-h-[120px]">
        {getCurrentSponsors().map((sponsor, index) => (
          <div 
            key={`${sponsor.id}-${currentIndex}`}
            className={`p-3 md:p-4 rounded-xl w-28 h-20 md:w-36 md:h-24 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl ${
              index === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'
            }`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationFillMode: 'both'
            }}
          >
            <img 
              src={sponsor.src} 
              alt={sponsor.alt} 
              className="w-full h-full object-contain filter drop-shadow-md transition-all duration-300 hover:brightness-110" 
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeSponsorSection
