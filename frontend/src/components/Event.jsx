import React from 'react'
import EventCarousel from './EventCarousel'

const UpcomingEvent = ({ singleEvent }) => {
  return (
    <div className="w-full min-h-fit flex flex-col xl:flex-row items-start py-12 px-4 sm:px-6 lg:px-8 gap-8 xl:gap-12">
      {/* Text Content */}
      <div className="w-full px-24 p-4 xl:w-2/5 flex justify-center xl:justify-start">
        <div className="text-center xl:text-start">
          <div className="text-4xl font-light text-white tracking-wide">
            {singleEvent.title}
          </div>
          <div className="w-20 h-1 bg-blue-500 my-6 mx-auto xl:mx-0"></div>
          <p className="text-white text-lg leading-relaxed">
            {singleEvent.description}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full xl:w-3/5">
        <EventCarousel events={singleEvent.events} />
      </div>
    </div>
  );
};

export default UpcomingEvent;
