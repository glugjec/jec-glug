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

  return (
    <div className="w-screen py-6 mx-auto mt-12 mb-8 relative left-1/2 right-1/2 -translate-x-1/2">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">Our Sponsors</h2>
      
     
      <div className="overflow-hidden w-full max-w-3xl mx-auto">
        <div className="flex animate-scroll">
          
          {sponsors.map((sponsor) => (
            <div 
              key={`first-${sponsor.id}`}
              className="flex-shrink-0 mx-3 md:mx-4"
            >
              <div className="p-3 md:p-4 rounded-xl w-28 h-18 md:w-36 md:h-22 lg:w-44 lg:h-26 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <img 
                  src={sponsor.src} 
                  alt={sponsor.alt} 
                  className="max-w-full max-h-full object-contain filter drop-shadow-md transition-all duration-300 hover:brightness-110" 
                />
              </div>
            </div>
          ))}
          
          {sponsors.map((sponsor) => (
            <div 
              key={`second-${sponsor.id}`}
              className="flex-shrink-0 mx-3 md:mx-4"
            >
              <div className="p-3 md:p-4 rounded-xl w-28 h-18 md:w-36 md:h-22 lg:w-44 lg:h-26 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                <img 
                  src={sponsor.src} 
                  alt={sponsor.alt} 
                  className="max-w-full max-h-full object-contain filter drop-shadow-md transition-all duration-300 hover:brightness-110" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeSponsorSection
