import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {
  const [circleVisible, setCircleVisible] = useState(false);
  const scrollTosec = () => {
    const teamSection = document.getElementById("AboutGLUG");
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  //this is for the animation(swipe up)

  useEffect(() => {
    
    setTimeout(() => setCircleVisible(true), 100);
  }, []);

  return (
    <section className="relative w-screen min-h-[90vh] bg-[#03022B] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Sun Image 

      !!!!!!HELPPPPPPPP!!!!!!

      <img
        src="images/sun.jpg"
        alt="Sunrise background"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 w-full max-w-[1200px] pointer-events-none"
      />
       */}

      <img
          src="images/circle.png"
          alt="Half circle arc"
          className={`absolute top-[18%] sm:top-[18%] md:top-[18%] lg:-top-[8%] left-1/2 transform -translate-x-1/2 w-[90vw] max-w-[95vw] max-h-[60vh] sm:w-[70vw] sm:max-w-[80vw] md:w-[60vw] md:max-w-[700px] lg:w-[50vw] xl:w-[900px] max-w-[900px] pointer-events-none transition-all duration-2000 ease-out
            ${circleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'}
            z-10 portrait:z-0`}
      />

      {/* <div className="absolute top-[30%] sm:top-[28%] md:top-[26%] lg:top-[25.5%] xl:top-[25%] left-1/2 transform -translate-x-1/2 z-50">
        <Link
          to="/events"
          className="font-helvetica rounded-full bg-[#3b4065] text-white/80 text-sm px-6 py-2 shadow-md border border-white/15 font-medium opacity-85 hover:opacity-120"
        >
          Events
        </Link>
      </div> */}

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 pt-24">
      
      <h1 className="font-canno text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 tracking-wide leading-[1] drop-shadow-[0px_4px_24px_rgba(80,140,255,0.25)]">
        Unleash Innovation <br />Through Open Source
      </h1>
      
     
      <p className="tracking-tight text-base md:text-md text-blue-200 mb-10 max-w-lg mx-auto leading-relaxed">
        It is a student-led community hosting tech events, workshops and hackathons with the support of industry sponsors.
      </p>

      <div className="font-helvetica flex flex-col sm:flex-row items-center justify-center gap-4">
        
        <a
          href="https://www.whatsapp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full px-8 py-3 shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Join Us
        </a>
        
       
        <button
          onClick={scrollTosec}
          className="inline-block bg-transparent border-2 border-blue-400 text-blue-300 font-semibold rounded-full px-8 py-3 shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
        >
          Explore
        </button>
      </div>
    </div>
    </section>
  );
};

export default Hero;
