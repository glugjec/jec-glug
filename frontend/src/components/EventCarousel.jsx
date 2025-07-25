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

const EventCarousel = () => {
  const items = [
    { id: 1, title: "Hackwith 4.0", hashtags: "#hackathon #Innovation" },
    { id: 2, title: "Linux Installation Drive", hashtags: "#linux #foss" },
    { id: 3, title: "Git & GitHub Masterclass", hashtags: "#git #collaboration" },
    { id: 4, title: "Intro to Docker", hashtags: "#devops #containers" },
    { id: 5, title: "Web Dev Workshop", hashtags: "#frontend #backend" },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {/* Map through the event items and render a card for each */}
          {items.map((event) => (
            <EvenCard key={event.id} event={event} />
          ))}
          
          {/* "See More" Card - styled to match the image */}
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
        {/* Hide navigation buttons on mobile for a cleaner look */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
};

export default EventCarousel;
