import React, { useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import { DragonCrest } from './DragonCrest';
import { FaChevronDown } from 'react-icons/fa';

const TeamSection = ({ title, members = [], onSelectMember }) => {
  const [listCollapse, setListCollapse] = useState(false);

  if (!members || members.length === 0) {
    return null;
  }

  const toggleCollapse = () => {
    setListCollapse(!listCollapse);
  };

  return (
    <div className="relative mx-4 sm:mx-6 lg:mx-8 xl:mx-auto my-6 sm:my-8 max-w-7xl">
      {/* Red Dragon Sanctum Container */}
      <div className="relative bg-gradient-to-b from-[#250811]/55 via-[#16040a]/75 to-[#0a0205]/90 
        backdrop-blur-xl 
        border border-red-500/30 hover:border-red-500/55 
        rounded-3xl p-5 sm:p-8 
        shadow-2xl shadow-black/80 
        transition-all duration-300 
        overflow-hidden"
      >
        {/* Subtle Ambient Red Dragon Glow in top-right */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div
          onClick={toggleCollapse}
          className="flex items-center justify-between gap-4 cursor-pointer pb-4 border-b border-red-500/20 select-none group"
        >
          {/* Title with Red Dragon Crest */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-red-500/20 border border-red-400/50 group-hover:border-red-400/80 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex-shrink-0 transition-colors">
              <DragonCrest className="w-5 h-5 sm:w-6 sm:h-6" glow={true} />
            </div>

            <div>
              <h3 className="font-canno text-lg sm:text-2xl font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-rose-200 to-amber-100 group-hover:from-rose-300 group-hover:to-white transition-all">
                {title}
              </h3>
            </div>

            {/* Member count badge */}
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-950/80 text-rose-300 border border-red-500/50 shadow-sm">
              {members.length} {members.length === 1 ? 'Member' : 'Members'}
            </span>
          </div>

          {/* Expand/Collapse Chevron Button */}
          <div className="flex items-center gap-2">
            <span className="sm:hidden text-xs text-rose-300/80 font-mono">
              ({members.length})
            </span>
            <button
              type="button"
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-rose-300 border border-white/10 hover:border-red-400/40 transition-all duration-300"
              aria-label={listCollapse ? "Expand section" : "Collapse section"}
            >
              <FaChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  listCollapse ? '-rotate-90' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Compact Members Grid */}
        {!listCollapse && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-fadeIn">
            {members.map((member, index) => (
              <TeamMemberCard
                key={member._id || index}
                member={member}
                onSelect={onSelectMember}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection;
