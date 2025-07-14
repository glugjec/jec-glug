import React from 'react'
import TeamCarousel from '@/components/TeamCarousel'
import AboutGLUG from '@/components/AboutGLUG'
import Event from '@/components/Event'

const HomePage = () => {
  const events = [{
    id: 1, 
    title: "Upcoming events",
    description: "Upcoming events coming"
  }, {
    id: 2, 
    title: "Previous events",
    description: "Upcoming events coming"
  }]


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
      
        {
          events.map(singleEvent => {
            return <Event singleEvent={singleEvent} key={singleEvent.id}/>
          })
        }
    </div>
  )
}

export default HomePage
