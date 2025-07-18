import React from 'react'
import TeamCarousel from '@/components/TeamCarousel'
import AboutGLUG from '@/components/AboutGLUG'
import Event from '@/components/Event'
import HomeSponsorSection from '@/components/HomeSponsorSection'
import Hero from '@/components/Hero'
import PartnerSection from '@/components/PartnerSection';

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
      <div className='bg-gradient-to-b from-[#03022C] to-[#161D58] text-white'>
        <div><Hero /></div>
        <div className="py-10 text-center text-3xl sm:text-4xl md:text-5xl">
          Our Team
        </div>
        <div className='w-full px-16 py-auto'>
          <TeamCarousel />
          </div>

        <AboutGLUG />
      </div>
      <div className=' bg-[#3B8FE1] text-white'>
       <HomeSponsorSection />
      </div>
      
      <div className="bg-[#03022C] color-white w-full py-12">
        {
          events.map(singleEvent => {
            return <Event singleEvent={singleEvent} key={singleEvent.id}/>
          })
        }
        </div>
        <div><PartnerSection /></div>
    </div>
  )
}

export default HomePage
