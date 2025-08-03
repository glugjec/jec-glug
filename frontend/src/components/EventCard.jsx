import React from 'react';
import { Link } from 'react-router-dom';
import { CarouselItem } from "@/components/ui/carousel";

const EventCard = ({ event }) => {
  // Since tags already include #, just join directly
  const tagString = event.tags?.join(' ') || '';

  return (
    <CarouselItem className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
      <Link to="/events" className="block group">
        <div className="bg-slate-800 rounded-lg overflow-hidden h-80 flex flex-col justify-between shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300 relative">
          
          <div className="flex-grow flex items-center justify-center p-4">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/320x320/1e293b/ffffff?text=No+Image';
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-white rounded-md p-4 flex items-center justify-between gap-4 transition-colors group-hover:bg-gray-200 shadow-md">
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 font-semibold text-md truncate">
                  {event.title}
                </h3>
                <p className="text-slate-500 text-sm mt-1 truncate">
                  {tagString}
                </p>
              </div>
              <div className="flex-shrink-0 text-slate-600 group-hover:text-blue-600 transition-colors">
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

export default EventCard;
