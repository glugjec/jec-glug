import React from 'react'
import EventCarousel from './EventCarousel'

const UpcomingEvent = ({singleEvent}) => {
  return (
    <div className="w-full min-h-fit flex flex-col xl:flex-row items-start justify-start py-12 gap-8">
      {/* Text Content - 2/5 width */}
      <div className="font-poppins w-full xl:w-2/5 px-6 xl:pr-8 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-light text-white tracking-wide">
            {singleEvent.title}
          </div>
          <p className="text-white mt-4 text-lg leading-relaxed">
            {singleEvent.description}
          </p>
        </div>
      </div>

      {/* Carousel - 3/5 width */}
      <div className="w-full xl:w-3/5 px-6 xl:px-0">
        <EventCarousel />
      </div>
    </div>



  )
}

export default UpcomingEvent
