import React from 'react';

const EventShowCard = ({event}) => {
  return (
    <div className="max-w-xs w-full bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full mx-2 my-4" >
      <div className=" max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full  border-1 border-blue-900">
        {/* Gradient Image Section */}
        <div className=" p-4 flex justify-center bg-gray-200">
          <img src="images/Tux.svg" alt="HackVita Logo" className="h-32 w-32" />
        </div>
        
        {/* Content Section - flex-grow to take available space */}
        <div className="p-4 flex flex-col flex-grow bg-gradient-to-t from-gray-900 via-gray-600 to-blue-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold ">{event.title}</h1>
              
            </div>
            <p className=" mt-1">{event.date}</p>
          </div>
          
          <p className="mt-4 text-sm">
            {event.description}
          </p>
          
          {/* Hashtags div with mt-auto to push to bottom */}
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 text-xs">@Hackathon</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 text-xs">#Innovation</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 text-xs">#Coding</span>
          </div>
        </div>
      </div>
      </div>
  );
};

export default EventShowCard;