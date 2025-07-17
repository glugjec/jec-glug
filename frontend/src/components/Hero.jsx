import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-screen min-h-[90vh] bg-gradient-to-b from-[#03022C] to-[#161D58] flex items-center justify-center overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vw] h-[120vw] bg-gradient-radial from-blue-500/30 to-transparent opacity-50 blur-3xl"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-blue-400 tracking-wide mb-6">
          Empowering Open Source<br />Through Community
        </h1>
        <p className="text-base md:text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
          The GNU/Linux Users Group of JEC fosters collaborative growth by hosting tech events, workshops, and hackathons to unleash student innovation.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full px-8 py-3 shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200"
        >
          Join the Team
        </Link>
      </div>
    </section>
  );
};

export default Hero;
