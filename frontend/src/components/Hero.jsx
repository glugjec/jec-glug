import React, { useEffect, useState } from "react";

const Hero = () => {
  const [circleVisible, setCircleVisible] = useState(false);

  //swipeuppanimation
  useEffect(() => {
    setTimeout(() => setCircleVisible(true), 100);
  }, []);

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[90vh] bg-[#03022B] flex flex-col items-center justify-center overflow-hidden px-4">
      <img
        src="images/circle3.png"
        alt=""
        role="presentation"
        loading="lazy"
        className={`absolute top-[12%] sm:top-[18%] md:top-[18%] lg:top-[10%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] sm:max-w-[450px] md:max-w-[600px] h-auto pointer-events-none transition-all duration-1000 ease-out object-contain
          ${circleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"}
          z-10`}
      />

      {/* Hero stuff*/}
      <div className="relative z-20 text-center w-full max-w-4xl mx-auto px-2 sm:px-4 pt-20 sm:pt-24">
        <h1 className="font-canno text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 tracking-wide leading-[1.15] drop-shadow-[0px_4px_24px_rgba(80,140,255,0.25)] pb-4 break-words">
          Unleash Innovation <br className="hidden sm:inline" />Through Open Source
        </h1>

        <p className="tracking-tight text-sm md:text-base text-blue-200 mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed sm:leading-tight px-2 break-words">
          It is a student-led community hosting tech events, workshops and hackathons with the support of industry sponsors.
        </p>

        <div className="font-helvetica flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href="https://chat.whatsapp.com/C3ZPRyoG0OI5Uy5ZEs7xxL"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-full px-6 sm:px-8 py-3 shadow-md hover:from-blue-700 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            Join Us
          </a>

          <a
            href="https://community.glugjec.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-center inline-block bg-transparent border-2 border-blue-400 text-blue-300 font-semibold rounded-full px-6 sm:px-8 py-3 shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Explore Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
