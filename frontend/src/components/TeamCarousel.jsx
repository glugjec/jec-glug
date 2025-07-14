import * as React from "react"
import teams from './../team.json'

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

    <Carousel className="w-full max-w-sm mx-auto">
      <CarouselContent className="-ml-1">
        {allMembers.map((member, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 relative">
              <img 
                src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`} 
                alt={member.name} 
                className='w-46 h-48 object-cover rounded-lg overflow-hidden'
            />
            
            
            <div className="absolute bottom-0 left-0 right-0 mx-2 mb-2">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-white/30 px-2 py-1.5 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-700 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between">
                    <h3 className="text-gray-800 text-xs font-medium truncate flex-1 mr-2 group-hover:text-white transition-colors duration-300">
                        {member.name}
                    </h3>
                    
                    <div className="bg-black rounded p-1 group-hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                        <div className="w-3 h-3 flex items-center justify-center">
                        <span className="text-white font-bold text-2xs leading-none">in</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </div>
          </CarouselItem>
        ))}
        <CarouselItem key="see-more" className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 relative h-full flex items-center justify-center">
                <div className="w-46 h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                <span className="text-gray-600 font-medium text-center w-full">See more</span>
                </div>
            </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default TeamCarousel