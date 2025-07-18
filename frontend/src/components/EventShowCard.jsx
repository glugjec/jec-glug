import React from 'react';

const EventShowCard = ({event}) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-[3rem] shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-900">
      {/* Image Section */}
      <div className="p-6 flex justify-center bg-gray-200">
        <img src="images/Tux.svg" alt="HackVita Logo" className="h-32 w-32 object-contain" />
      </div>
      
      {/* Content Section */}
      <div className="font-poppins p-6 flex flex-col flex-grow bg-gradient-to-t from-gray-900 to-gray-500  text-white">
        <div className="flex justify-between items-start mb-4">
          <h1 className="font-canno text-xl font-bold leading-tight">{event.title}</h1>
          <p className="font-poppins text-sm bg-white/20 px-3 py-1 rounded-full ml-2 whitespace-nowrap">{event.date}</p>
        </div>
        
        <p className="text-sm leading-relaxed text-white/90 mb-6">
          {event.description}
        </p>
        
        {/* Hashtags - pushed to bottom */}
        <div className="mt-auto flex flex-wrap gap-2">
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
            @Hackathon
          </span>
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
            #Innovation
          </span>
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
            #Coding
          </span>
        </div>
      </div>
      </div>
  );
};

export default EventShowCard;