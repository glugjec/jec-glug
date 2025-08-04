import React from 'react'

const TeamHeader = () => {
  return (
   <div id="team-section" className="team-header text-center py-8 sm:py-12 px-4">
      {/* - The main heading for the team section.
        - `tracking-tight`: Added to slightly tighten the letter spacing of the main heading.
        - `mb-4`: The bottom margin was reduced from mb-8 to decrease the space between the heading and the paragraph below.
      */}
      <h1
      style={{
        backgroundImage: 'linear-gradient(to right, #8AE6FF 0%, #8AE6FF 30%, #FFFFFF 70%, #FFFFFF 100%)'
      }}
       className="bg-clip-text text-transparent font-canno text-[48px] sm:text-[72px] md:text-[96px] 
        font-bold mb-2 sm:mb-4 tracking-wider">
        Our Team
      </h1>
      
      {/* --- SPACING MODIFICATION ---
        - `mb-8`: The bottom margin was reduced from mb-12 to decrease the space between the paragraph and the session badge below.
      */}
      <p className="font-poppins mission-text text-white text-[16px] sm:text-[20px] md:text-[25px] sm:max-w-[50%] 
      mx-auto mb-4 sm:mb-6 leading-relaxed">
        Meet the passionate individuals who drive GLUG's mission of promoting open-source culture and innovation.
      </p>
      
      {/* - The session badge.
        - `tracking-wider`: Added to increase the letter spacing in the badge.
        - `drop-shadow-lg`: A subtle shadow is added to lift the badge from the background.
      */}
      <div className="text-base sm:text-lg md:text-xl font-canno session-badge inline-block bg-gray-200 border 
      border-gray-600 rounded-2xl px-4 py-2 sm:px-6 sm:py-3 text-gray-900 font-medium tracking-wider 
      drop-shadow-lg">
        Session 2025-2026
      </div>
    </div>
  );
};

export default TeamHeader
