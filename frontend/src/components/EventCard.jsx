import React from 'react';

const EvenCard = () => {
  return (
    <div className="min-h-fit flex items-center justify-items-end p-4">
      {/* Main Card Container */}
      <div className="bg-slate-700 rounded-2xl p-8 w-80 shadow-2xl">
        
        {/* Placeholder Image Container */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-slate-600 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-slate-500 rounded-full flex items-center justify-center">
              <img src="/images/Tux.svg" className="h-48 w-48"/>
            </div>
          </div>
        </div>
        
        {/* Bottom Section with Text and Arrow */}
        <div className="bg-white rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-slate-800 font-semibold text-lg">Hackwith 4.0</h3>
            <p className="text-slate-500 text-sm mt-1">#hackathon #Innovation </p>
          </div>
          
          {/* Arrow Icon */}
          <div className="ml-4">
            <svg 
              className="w-6 h-6 text-slate-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 17L17 7M17 7H7M17 7V17" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvenCard;