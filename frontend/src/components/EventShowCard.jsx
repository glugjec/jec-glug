import React from 'react';
import { isToday } from '@/lib/utils';
import EventImageGallery from './EventImageGallery';
import EventCountdown from './ui/EventCountdown';

const EventShowCard = ({ event, showCountdown = false, onCountdownExpire }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="max-w-sm w-full bg-white rounded-[3rem] shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-900">
      {/* Image Section */}
      <div className="bg-slate-900 w-full aspect-[16/9] overflow-hidden rounded-t-[3rem] flex items-center justify-center relative">
        <EventImageGallery
          imageUrls={event.imageUrls}
          imageUrl={event.imageUrl || '/images/default-event.png'}
          alt={event.title}
          className="w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="font-poppins p-6 flex flex-col flex-grow bg-gradient-to-t from-gray-900 to-gray-500 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            {isToday(event.date) && (
              <span className="inline-block bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1 shadow-sm border border-red-500 animate-pulse">
                Today
              </span>
            )}
            <h1 className="font-canno text-xl font-bold leading-tight">{event.title}</h1>
          </div>
          <p className="font-poppins text-sm bg-white/20 px-3 py-1 rounded-full ml-2 whitespace-nowrap">
            {formattedDate}
          </p>
        </div>

        {showCountdown && (
          <EventCountdown targetDate={event.date} onExpire={onCountdownExpire} />
        )}

        <p className="text-sm leading-relaxed text-white/90 mb-6">
          {event.description}
        </p>

        {/* Hashtags */}
        <div className="mt-auto flex flex-wrap gap-2">
          {event.tags && event.tags.length > 0 ? (
            event.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30"
              >
                #{tag}
              </span>
            ))
          ) : (
            <>
              <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
                @Hackathon
              </span>
              <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
                #Innovation
              </span>
              <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white border border-white/30">
                #Coding
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventShowCard;
 