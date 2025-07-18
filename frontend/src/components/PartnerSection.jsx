import React from "react";
import { Link } from "react-router-dom";

const PartnerSection = () => {
  return (
    <section className="w-screen bg-gradient-to-b from-[#FFFFFF] to-[#D2E9FC] py-16 px-6 flex flex-col md:flex-row items-center justify-between">
     
      <div className="font-helvetica max-w-xl mb-10 md:mb-0 mx-20">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A1F44] mb-4">
          Partner with GLUG
        </h2>
        <p className="text-gray-600 mb-6">
          Collaborate with GLUG JEC to support innovation, learning, and open-source growth. By partnering, you help empower students through events, mentorship, and real-world tech exposure.
        </p>
        <Link
          to="/contact"
          className="font-poppins inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl px-6 py-3 shadow transition duration-200"
        >
          Become a partner
        </Link>
      </div>

      <div className="relative w-64 h-64 flex-shrink-0">
        <div className="absolute top-0 left-1/4 w-40 h-40 border-2 border-blue-400 rounded-full opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 border-2 border-blue-500 rounded-full opacity-80"></div>
      </div>
    </section>
  );
};

export default PartnerSection;
