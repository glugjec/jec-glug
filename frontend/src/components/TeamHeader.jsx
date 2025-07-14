import React from 'react'

const TeamHeader = () => {
  return (
   <div className="team-header text-center py-16 px-4">
      <h1 className="text-6xl font-bold bg-black bg-clip-text text-transparent mb-8">
        Our Team
      </h1>
      <p className="mission-text text-black text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
        Meet the passionate individuals who drive GLUG's mission of promoting open-source culture and innovation.
      </p>
      <div className="session-badge inline-block bg-gray-800 border border-gray-600 rounded-lg px-6 py-3 text-green-400 font-medium">
        Session 2025-2026
      </div>
    </div>
  );
};

export default TeamHeader
