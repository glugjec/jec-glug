import React from 'react';
import { Link } from 'react-router-dom';
import { CarouselItem } from "@/components/ui/carousel";

const EvenCard = ({ event }) => {
  return (
    // Each card is a CarouselItem with responsive width settings.
    <CarouselItem className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
      {/* The Link wraps the entire card for better user experience */}
      <Link to={`/events/${event.id}`} className="block group">
        {/* Main Card Container 
          - Using relative positioning to contain the floating text box.
        */}
        <div className="bg-slate-800 rounded-lg overflow-hidden h-80 flex flex-col justify-between shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 relative">
          
          {/* Image Container */}
          <div className="flex-grow flex items-center justify-center p-4">
            <img 
              src="/images/Tux.svg" 
              alt={event.title} 
              className="h-28 w-28 object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/112x112/1e293b/ffffff?text=Icon'; e.currentTarget.onerror = null; }}
            />
          </div>
          
          {/* Floating Bottom Section Wrapper
            - `absolute` positioning makes this float over the card.
            - `bottom-0 left-0 right-0` pins it to the bottom.
            - `p-4` provides the space around the white box.
          */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* The actual white box with content */}
            <div className="bg-white rounded-md p-4 flex items-center justify-between transition-colors group-hover:bg-gray-200 shadow-md">
              <div>
                <h3 className="text-slate-900 font-semibold text-md truncate">{event.title}</h3>
                <p className="text-slate-500 text-sm mt-1 truncate">{event.hashtags}</p>
              </div>
              
              {/* Arrow Icon */}
              <div className="ml-4 text-slate-600 group-hover:text-blue-600 transition-colors">
                <svg 
                  className="w-6 h-6 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" 
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
      </Link>
    </CarouselItem>
  );
};

export default EvenCard;
