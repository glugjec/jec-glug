import * as React from "react"

import {Link } from "react-router-dom"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import EvenCard from "./EventCard"

const EventCarousel = () => {
  const items = [
    { id: 1, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
    { id: 2, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
    { id: 3, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
    { id: 4, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
    { id: 5, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
  ]

  return (
    <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
      <Carousel 
        className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-7xl xl:max-w-8xl mx-auto"
        opts={{
          align: "start",
          slidesToScroll: "auto",
        }}
    >
        <CarouselContent className="-ml-3">
          {
            items.map((event) => (
              <EvenCard key={event.id} event={event} />
            ))
          }
            
          
          {/* Make the whole card a link */}
          <Link to="/events" className="min-h-fit flex items-center justify-items-end p-4">
            {/* Main Card Container */}
            <div className="bg-gray-100 rounded-2xl p-8 w-80 shadow-2xl">
              
              {/* Placeholder Image Container */}
              <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
              </div>

              {/* Bottom Section with Text and Arrow */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <div>
                  <h3 className="text-center font-semibold text-lg">See more</h3>
                  <p className="text-center text-sm mt-1"> click here </p>
                </div>
                {/* Arrow Icon */}
                <div className="ml-4">
                </div>
              </div>
            </div>
          </Link>






          
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex scale-150 -left-16" />
        <CarouselNext className="hidden sm:flex scale-150 -right-16" />
      </Carousel>
    </div>
  )
}

export default EventCarousel