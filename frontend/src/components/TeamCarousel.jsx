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
    .filter(team => team.title === "CLUB - HEAD" || team.title === "CLUB LEADERSHIP")
    .flatMap(team => team.members);

  const formatRole = (role) => {
    if (!role) return '';
    return role
      .toLowerCase()
      .split(/([ -])/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent className="-ml-3">
          {allMembers.map((member, index) => (
            <CarouselItem
              key={index}
              className="pl-3 basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
            >
              <div className="p-3 relative">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 mx-4 sm:mx-6 md:mx-8 mb-4 sm:mb-6 md:mb-8">
                  <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-white/40 px-3 py-2 sm:px-4 sm:py-3 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition-all duration-300 cursor-pointer group">
                    <div className="flex items-center justify-between gap-4">
                      {/* Name and role */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <h3 className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold truncate group-hover:text-white transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm font-medium group-hover:text-blue-100 transition-colors duration-300">
                          {formatRole(member.role)}
                        </p>
                      </div>

                      {/* LinkedIn Icon */}
                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm:flex bg-black rounded-lg p-2 group-hover:bg-white/25 transition-all duration-300 flex-shrink-0"
                          title="View LinkedIn"
                        >
                          <div className="w-5 h-5 flex items-center justify-center">
                            <span className="text-white font-bold text-sm leading-none">in</span>
                          </div>
                        </a>
                      ) : (
                        <div className="sm:flex bg-gray-400 rounded-lg p-2 flex-shrink-0 opacity-50 cursor-not-allowed">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <span className="text-white font-bold text-sm leading-none">in</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}

          {/* See More Card */}
          <CarouselItem className="pl-3 basis-1/1 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
            <div className="p-3 relative h-full flex items-center justify-center">
              <Link to="/team" className="w-full">
                <div className="w-full aspect-[3/4] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:from-gray-100 hover:to-gray-200 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl border border-gray-200">
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

        <CarouselPrevious className="text-black" />
        <CarouselNext className="text-black" />
      </Carousel>
    </div>
  );
}

export default TeamCarousel;


// import * as React from "react"
// import teams from './../team.json'
// import { Link } from "react-router-dom";

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// export default function TeamCarousel() {

//   const allMembers = teams
//     .filter(team => team.title === "CLUB LEADERSHIP")
//     .flatMap(team => team.members);

//   return (
//     <Carousel
//       opts={{
//         align: "start",
//       }}
//       className="w-full max-w-6xl mx-auto border-2 border-gray-200 rounded-lg shadow-lg" 
//     >
//       <CarouselContent>
//         {allMembers.map((member, index) => (
//           <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   <span className="text-3xl font-semibold">{member.name}</span>
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }
