import * as React from "react"
import teams from './../team.json'
import { Link } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const TeamCarousel = () => {
  const allMembers = teams
    .filter(team => team.title === "CLUB LEADERSHIP")
    .flatMap(team => team.members);

  return (
    <div className="w-screen bg-[#03022C] relative left-1/2 right-1/2 -translate-x-1/2 -mt-12 px-6 sm:px-12 lg:px-16 xl:px-20 pt-7 pb-7">
    <Carousel 
      className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-7xl xl:max-w-8xl mx-auto"
      opts={{
        align: "start",
        slidesToScroll: "auto",
      }}>
        
        <CarouselContent className="-ml-3">
          {allMembers.map((member, index) => (
            <CarouselItem 
              key={index} 
              className="pl-3 basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <div className="p-3 relative">
                <img 
                  src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`} 
                  alt={member.name} 
                  className='w-full h-72 sm:h-80 md:h-96 object-cover rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
                />
                
                <div className="absolute bottom-0 left-0 right-0 mx-4 mb-4">
                  <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/40 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-800 text-base sm:text-lg font-semibold truncate flex-1 mr-4 group-hover:text-white transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      <div className="bg-black rounded-lg p-2 group-hover:bg-white/25 transition-all duration-300 flex-shrink-0">
                        <div className="w-5 h-5 flex items-center justify-center">
                          <span className="text-white font-bold text-sm leading-none">in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
          <CarouselItem key="see-more" className="pl-3 basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <div className="p-3 relative h-full flex items-center justify-center">
              <Link to="/team" className="w-full">
                <div className="w-full h-72 sm:h-80 md:h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:from-gray-100 hover:to-gray-200 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-gray-200">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-semibold text-lg sm:text-xl">See more</span>
                    <p className="text-gray-500 text-sm mt-1">View all members</p>
                  </div>
                </div>
              </Link>
            </div>
          </CarouselItem>

        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex scale-150 -left-16" />
        <CarouselNext className="hidden sm:flex scale-150 -right-16" />
      </Carousel>
    </div>
  )
}

export default TeamCarousel