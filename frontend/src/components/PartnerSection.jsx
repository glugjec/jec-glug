import React from "react";
import { Link } from "react-router-dom";

const PartnerSection = () => {
  return (
    // The section already takes the full width, padding controls the inner spacing.
    <section className="w-screen bg-gradient-to-b from-white to-[#EBF5FF] py-20 px-8 md:px-16 lg:px-24">
      {/* MODIFICATION: Removed "max-w-7xl mx-auto" to allow content to fill the container.
        Changed "justify-center" to "justify-between" to push items to the sides.
      */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Content Block */}
        <div className="font-poppins max-w-2xl text-center md:text-left">
          <h2 className="text-4xl md:text-5xl text-[#0A1F44] mb-8">
            Partner with GLUG
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Collaborate with GLUG JEC to support innovation, learning, and open-source growth. By partnering, you help empower students through events, mentorship, and real-world tech exposure.
          </p>
          <Link
            to="/contact"
            className="font-helvetica inline-block bg-gradient-to-r from-blue-500 to-blue-400 hover:brightness-105 text-white font-medium rounded-lg px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Become a partner
          </Link>
        </div>

        {/* Right Graphic Block */}
        <div className="relative w-80 h-80 flex-shrink-0 hidden md:block">
          <div className="absolute top-0 left-0 w-64 h-64 border border-blue-300 rounded-full opacity-75"></div>
          <div className="absolute bottom-4 right-4 w-48 h-48 border-2 border-blue-400 rounded-full"></div>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;