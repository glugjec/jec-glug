import React from 'react'
import assamLogo from '../assets/sponsor_logo/assam.png';
import frintLogo from '../assets/sponsor_logo/frint.jpg';
import saurabhiLogo from '../assets/sponsor_logo/saurabhi.png';
import oilLogo from '../assets/sponsor_logo/oil.jpg';
import instrumentLogo from '../assets/sponsor_logo/instrument.jpg';


const HomeSponsorSection = () => {
  return (
    <div className="w-screen py-6 mx-auto mt-12 mb-8 relative left-1/2 right-1/2 -translate-x-1/2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Sponsors</h2>
        <div className="flex justify-center items-center gap-4 overflow-x-auto px-4">
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={assamLogo} alt="Assam" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={saurabhiLogo} alt="Saurabhi" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={frintLogo} alt="Frint" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={instrumentLogo} alt="Instrument" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={oilLogo} alt="Oil" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
  )
}

export default HomeSponsorSection
