import React, { useState, useRef, useEffect } from 'react'
import { FaHistory } from 'react-icons/fa'

const defaultSeasons = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023'];

const TeamHeader = ({ selectedSeason, onSeasonChange, sessions = defaultSeasons }) => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const seasonOptions = sessions.length > 0 ? sessions : defaultSeasons;

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current && !popupRef.current.contains(e.target) &&
        buttonRef.current && !buttonRef.current.contains(e.target)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSeasonSelect = (season) => {
    onSeasonChange(season);
    setShowPopup(false);
  };

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
      
      {/* Session badge + History button */}
      <div className="relative inline-flex items-center gap-3">
        {/* - The session badge.
          - `tracking-wider`: Added to increase the letter spacing in the badge.
          - `drop-shadow-lg`: A subtle shadow is added to lift the badge from the background.
        */}
        <div className="text-base sm:text-lg md:text-xl font-canno session-badge inline-block bg-gray-200 border 
        border-gray-600 rounded-2xl px-4 py-2 sm:px-6 sm:py-3 text-gray-900 font-medium tracking-wider 
        drop-shadow-lg">
          Session {selectedSeason}
        </div>

        {/* History Button */}
        <button
          ref={buttonRef}
          onClick={() => setShowPopup(!showPopup)}
          className="group relative inline-flex items-center justify-center 
            w-10 h-10 sm:w-12 sm:h-12 
            rounded-xl 
            bg-gradient-to-br from-white/20 to-white/5 
            border border-white/20 
            backdrop-blur-md 
            text-white 
            shadow-lg shadow-black/20 
            hover:from-white/30 hover:to-white/10 
            hover:border-white/40 
            hover:shadow-xl hover:shadow-cyan-500/10 
            hover:scale-105 
            active:scale-95 
            transition-all duration-300 ease-out 
            cursor-pointer"
          title="View previous seasons"
        >
          <FaHistory className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-[-20deg] transition-transform duration-300" />
          
          {/* Glow ring on hover */}
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 
            ring-1 ring-cyan-400/30 
            pointer-events-none" />
        </button>

        {/* Season Selector Popup */}
        {showPopup && (
          <div
            ref={popupRef}
            className="absolute top-full mt-3 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 
              min-w-[220px] 
              bg-gradient-to-b from-[#1a1f4e]/95 to-[#0d1033]/95 
              backdrop-blur-xl 
              border border-white/15 
              rounded-2xl 
              shadow-2xl shadow-black/40 
              overflow-hidden 
              animate-fadeInScale"
            style={{ transformOrigin: 'top center' }}
          >
            {/* Popup header */}
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs sm:text-sm font-canno text-cyan-300/80 uppercase tracking-widest">
                Select Season
              </p>
            </div>

            {/* Season options */}
            <div className="p-2">
              {seasonOptions.map((season) => {
                const isActive = season === selectedSeason;
                return (
                  <button
                    key={season}
                    onClick={() => handleSeasonSelect(season)}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl 
                      text-sm sm:text-base font-poppins font-medium 
                      transition-all duration-200 ease-out 
                      cursor-pointer
                      ${isActive
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/25 text-cyan-300 border border-cyan-400/30 shadow-inner'
                        : 'text-white/70 hover:text-white hover:bg-white/8 border border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{season}</span>
                      {isActive && (
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-400/20">
                          <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Decorative bottom gradient line */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamHeader
