import React from 'react'
import EventCarousel from './EventCarousel'

const UpcomingEvent = ({singleEvent}) => {
  return (
    <div className="w-full min-h-fit flex items-center justify-left bg-gray-50 py-12">
            <div className="w-1/4 pr-8 pl-6">
              <div className="text-3xl font-light text-gray-800 tracking-wide">
                {singleEvent.title}
              </div>
              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                {singleEvent.description}
              </p>
            </div>
            
            <div className="w-3/4">
              <EventCarousel />
            </div>
            
          </div>
  )
}

export default UpcomingEvent
