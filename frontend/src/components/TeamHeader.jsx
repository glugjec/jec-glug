import React, { useState, useRef, useEffect } from 'react';
import { FaHistory, FaSearch, FaTimes } from 'react-icons/fa';
import { DragonCrest } from './DragonCrest';

const defaultSeasons = ['2026-2027', '2025-2026', '2024-2025', '2023-2024', '2022-2023'];

const TeamHeader = ({
  selectedSeason,
  onSeasonChange,
  sessions = defaultSeasons,
  searchQuery = '',
  onSearchChange,
}) => {
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
    <div id="team-section" className="relative team-header text-center pt-10 pb-8 sm:pb-12 px-4 max-w-5xl mx-auto overflow-hidden">
      {/* Background Red Dragon Flame / Nebula Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-red-600/25 via-orange-600/15 to-rose-700/20 rounded-full blur-3xl pointer-events-none" />

      {/* Red Dragon Crest Floating Emblem */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.35)]">
          <DragonCrest className="w-4 h-4 sm:w-5 sm:h-5" glow={true} />
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest text-rose-300 uppercase">
            GLUG JEC ROSTER
          </span>
        </div>
      </div>

      {/* Main Heading with Red Dragon Fire Glow */}
      <h1
        style={{
          backgroundImage: 'linear-gradient(to right, #FF4D4D 0%, #FFA07A 35%, #FFFFFF 70%, #FF4D4D 100%)',
        }}
        className="bg-clip-text text-transparent font-canno text-3xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-wider drop-shadow-[0_4px_35px_rgba(239,68,68,0.5)]"
      >
        The greatest Team Every Created
      </h1>

      {/* Subtitle */}
      <p className="font-poppins text-gray-200 text-sm sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
        The passionate minds, developers, and creators breathing the fire of open-source innovation at Jorhat Engineering College.
      </p>

      {/* Controls Bar: Session Badge + Season History + Search */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative z-10 max-w-lg mx-auto">
        {/* Session Badge with Dropdown Trigger */}
        <div className="relative inline-flex items-center gap-2">
          <div className="text-xs sm:text-sm font-canno inline-flex items-center gap-2 bg-gradient-to-r from-[#20060d] to-[#120307] border border-red-500/40 rounded-xl px-4 py-2.5 text-rose-200 font-medium tracking-wider shadow-lg shadow-black/50">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            Session {selectedSeason}
          </div>

          {/* History Button */}
          <button
            ref={buttonRef}
            onClick={() => setShowPopup(!showPopup)}
            className="group relative inline-flex items-center justify-center 
              w-10 h-10 
              rounded-xl 
              bg-gradient-to-br from-white/10 to-white/5 
              border border-red-500/35 
              backdrop-blur-md 
              text-rose-300 
              shadow-lg shadow-black/40 
              hover:border-red-400 
              hover:text-white 
              hover:shadow-red-500/25 
              hover:scale-105 
              active:scale-95 
              transition-all duration-300 ease-out 
              cursor-pointer"
            title="View previous seasons"
            aria-label="View previous seasons"
          >
            <FaHistory className="w-4 h-4 group-hover:rotate-[-20deg] transition-transform duration-300" />
            <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-red-400/40 pointer-events-none" />
          </button>

          {/* Season Selector Popup */}
          {showPopup && (
            <div
              ref={popupRef}
              className="absolute top-full mt-2 left-0 sm:left-1/2 sm:-translate-x-1/2 z-50 
                min-w-[220px] 
                bg-gradient-to-b from-[#1c0409]/95 to-[#0b0103]/98 
                backdrop-blur-xl 
                border border-red-500/40 
                rounded-2xl 
                shadow-2xl shadow-black/70 
                overflow-hidden 
                animate-fadeInScale"
              style={{ transformOrigin: 'top center' }}
            >
              <div className="px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
                <DragonCrest className="w-3.5 h-3.5" glow={false} />
                <p className="text-xs font-mono text-rose-300/80 uppercase tracking-widest">
                  Academic Sessions
                </p>
              </div>

              <div className="p-2 space-y-1">
                {seasonOptions.map((season) => {
                  const isActive = season === selectedSeason;
                  return (
                    <button
                      key={season}
                      onClick={() => handleSeasonSelect(season)}
                      className={`
                        w-full text-left px-3.5 py-2.5 rounded-xl 
                        text-xs sm:text-sm font-poppins font-medium 
                        transition-all duration-200 
                        cursor-pointer flex items-center justify-between
                        ${isActive
                          ? 'bg-gradient-to-r from-red-600/25 to-rose-600/25 text-rose-300 border border-red-400/40 shadow-inner'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                        }
                      `}
                    >
                      <span>{season}</span>
                      {isActive && (
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-red-500/25 text-rose-300 text-xs">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            </div>
          )}
        </div>

        {/* Live Search Input */}
        {onSearchChange && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search member or role..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-gradient-to-r from-[#20060d]/80 to-[#120307]/90 border border-red-500/40 rounded-xl text-white placeholder-rose-300/40 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 transition-all shadow-inner"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-red-400/70 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-white"
                aria-label="Clear search"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamHeader;
