import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollTosec = () => {
    const teamSection = document.getElementById("AboutGLUG");
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-screen min-h-[90vh] bg-[#03022] flex flex-col items-center justify-center overflow-hidden">
  
      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-canno text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 tracking-wide mb-10 pb-4">
          Unleash Innovation <br />Through Open Source
        </h1>
        <p className="text-base md:text-lg text-blue-200 mb-10 max-w-2xl mx-auto ">
          It is a student-led community hosting tech events, workshops and <br/>
hackathons with the support of industry sponsors.
        </p>
        <div className="font-helvetica flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
          >
            Join Us
          </Link>
          <button
            onClick={scrollTosec}
            className="inline-block bg-transparent border border-blue-400 text-blue-400 font-semibold rounded-full px-8 py-3 shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
