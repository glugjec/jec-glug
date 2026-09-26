import React from 'react';
import { isToday } from '@/lib/utils';
import EventImageGallery from './EventImageGallery';

const EventShowCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const hasTags = event.tags && event.tags.length > 0;
  const displayTags = hasTags ? event.tags : ['Hackathon', 'Innovation', 'Coding'];
  const visibleTags = displayTags.slice(0, 3);
  const extraTagsCount = displayTags.length - 3;

  return (
    <div className="group max-w-sm w-full bg-white rounded-[3rem] shadow-lg overflow-hidden border border-gray-900 flex flex-col h-full motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(138,230,255,0.12)]">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 w-full overflow-hidden rounded-t-[3rem]">
        <EventImageGallery
          imageUrls={event.imageUrls}
          imageUrl={event.imageUrl || '/images/default-event.png'}
          alt={event.title}
          className="w-full h-full"
          imgClassName="w-full h-full object-cover group-hover:scale-105 motion-safe:transition-transform motion-safe:duration-500"
        />
      </div>

      {/* Content Section */}
      <div className="font-poppins p-6 flex flex-col flex-grow bg-gradient-to-t from-gray-900 to-gray-500 text-white">
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex-1">
            {isToday(event.date) && (
              <span className="inline-block bg-red-600 text-white text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-1 shadow-sm border border-red-500 animate-pulse">
                Today
              </span>
            )}
            <h1 className="font-canno text-xl font-bold leading-tight">{event.title}</h1>
          </div>
          <p className="font-poppins text-sm bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full whitespace-nowrap">
            {formattedDate}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-white/90 mb-6 line-clamp-3">
          {event.description}
        </p>

        {/* Hashtags */}
        <div className="mt-auto flex flex-wrap gap-2 overflow-hidden">
          {visibleTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] tracking-wide font-medium text-white border border-white/20 uppercase"
            >
              #{tag.replace(/^[@#]/, '')}
            </span>
          ))}
          {extraTagsCount > 0 && (
            <span className="inline-block bg-[#8AE6FF]/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] tracking-wide font-medium text-[#8AE6FF] border border-[#8AE6FF]/30 uppercase">
              +{extraTagsCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventShowCard;
 