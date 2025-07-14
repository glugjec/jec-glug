import React from 'react'
import TeamCarousel from '@/components/TeamCarousel'
import EventCarousel from '@/components/EventCarousel'
import AboutGLUG from '@/components/AboutGLUG'

const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full min-h-fit flex items-center justify-left bg-gray-50 py-12">
        <div className="w-full px-4">
          <TeamCarousel />
        </div>
      </div>

      <div className="w-full max-w-5xl px-4 py-12">
        <AboutGLUG />
      </div>

      <div className="w-full min-h-fit flex items-center justify-left bg-gray-50 py-12">
        <div className="w-1/4 pr-8 pl-6">
          <div className="text-3xl font-light text-gray-800 tracking-wide">
            Upcoming Events
          </div>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            stay tuned for our upcoming events and activities. We have a lot in store for you.
          </p>
        </div>
        
        <div className="w-3/4">
          <EventCarousel />
        </div>
        
      </div>


      <div className="w-full min-h-fit flex items-center justify-left bg-gray-50 py-12">
        <div className="w-1/4 pr-8 pl-6">
          <div className="text-3xl font-light text-gray-800 tracking-wide">
            Recent Events
          </div>
          <p className="text-gray-600 mt-4 text-lg leading-relaxed">
            Check out our recent events and activities.
          </p>
        </div>
        
        <div className="w-3/4">
          <EventCarousel />
        </div>
        
      </div>
    </div>
  )
}

export default HomePage
