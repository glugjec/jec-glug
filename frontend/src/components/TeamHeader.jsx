import React from 'react'

const TeamHeader = () => {
  return (
   <div className="team-header text-center py-16 px-4">
      <h1 className="font-canno text-6xl font-bold text-white mb-8">
        Our Team
      </h1>
      <p className="font-poppins mission-text text-white text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
        Meet the passionate individuals who drive GLUG's mission of promoting open-source culture and innovation.
      </p>
      <div className="session-badge inline-block bg-gray-800 border border-gray-600 rounded-lg px-6 py-3 text-gray-100 font-medium">
        Session 2025-2026
      </div>
    </div>
  );
};

export default TeamHeader
