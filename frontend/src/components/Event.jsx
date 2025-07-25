import React from 'react'
import EventCarousel from './EventCarousel'

const UpcomingEvent = ({singleEvent}) => {
  return (
    <div className="w-full min-h-fit flex flex-col xl:flex-row items-start py-12 px-4 sm:px-6 lg:px-8 gap-8 xl:gap-12">
      {/* Text Content - 2/5 width */}
      {/* The container for the text block now aligns its content to the top-left on large screens */}
      <div className="w-full px-24 p-4 xl:w-2/5 flex justify-center xl:justify-start">
        {/* This div handles the responsive text alignment */}
        <div className="text-center xl:text-start">
          {/* Title */}
          <div className="text-4xl font-light text-white tracking-wide">
            {singleEvent.title}
          </div>

          {/* Decorative Underline */}
          {/* This div creates the short underline. */}
          {/* 'mx-auto xl:mx-0' makes it centered on mobile and left-aligned on large screens. */}
          {/* 'my-6' creates more space between the title and description. */}
          <div className="w-20 h-1 bg-blue-500 my-6 mx-auto xl:mx-0"></div>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed">
            {singleEvent.description}
          </p>
        </div>
      </div>

      {/* Carousel - 3/5 width */}
      <div className="w-full xl:w-3/5">
        <EventCarousel />
      </div>
    </div>


  )
}

export default UpcomingEvent
