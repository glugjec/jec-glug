import * as React from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import EvenCard from "./EventCard"

const EventCarousel = () => {

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
            <EvenCard />
            <EvenCard />
            <EvenCard />
            <EvenCard />
            <EvenCard />


        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex scale-150 -left-16" />
        <CarouselNext className="hidden sm:flex scale-150 -right-16" />
      </Carousel>
    </div>
  )
}

export default EventCarousel