import * as React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EvenCard from "./EventCard";

const EventCarousel = ({ events = [] }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Carousel className="w-full" opts={{ align: "start" }}>
        <CarouselContent className="-ml-4">
          {events.map((event) => (
            <EvenCard key={event._id} event={event} />
          ))}

          {/* "See More" Card */}
          <CarouselItem className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <Link to="/events" className="block group">
              <div className="bg-slate-800 rounded-lg h-80 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-blue-500/20 transition-shadow duration-300">
                <p className="text-lg font-semibold">See more</p>
                <div className="mt-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <svg 
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M7 17L17 7M17 7H7M17 7V17" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex portrait:flex portrait:absolute portrait:top-1/2 portrait:left-2 portrait:-translate-y-1/2 portrait:w-12 portrait:h-12 portrait:bg-white portrait:rounded-full portrait:shadow-lg portrait:text-black portrait:justify-center portrait:items-center z-30" />
        <CarouselNext className="hidden sm:flex portrait:flex portrait:absolute portrait:top-1/2 portrait:right-2 portrait:-translate-y-1/2 portrait:w-12 portrait:h-12 portrait:bg-white portrait:rounded-full portrait:shadow-lg portrait:text-black portrait:justify-center portrait:items-center z-30" />
      </Carousel>
    </div>
  );
};

export default EventCarousel;
