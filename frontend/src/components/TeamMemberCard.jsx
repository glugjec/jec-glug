import React from 'react';
import { FaLinkedin, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import { DragonCrest, DragonFlame } from './DragonCrest';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const TeamMemberCard = ({ member, onSelect }) => {
  const roles = Array.isArray(member.role)
    ? member.role.join(' • ')
    : member.role || '';

  const imageSrc = member.imageUrl || (member._id ? `${baseURL}/members/${member._id}/image` : null);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(member);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col items-center text-center 
        bg-gradient-to-b from-[#250811]/85 via-[#16040a]/90 to-[#0a0104]/98 
        backdrop-blur-md 
        border border-red-500/30 
        hover:border-red-400/90 
        rounded-2xl p-5 sm:p-6 
        shadow-lg shadow-black/60 
        hover:shadow-2xl hover:shadow-red-600/35 
        transition-all duration-300 ease-out 
        hover:-translate-y-1.5 
        cursor-pointer 
        overflow-hidden"
    >
      {/* Red dragon flame aura on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-24 h-24 opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none">
        <DragonCrest className="w-full h-full" glow={false} />
      </div>

      {/* Top ruby flame accent line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/70 to-transparent group-hover:via-rose-400 transition-all duration-300" />

      {/* Compact Avatar with Red Dragon Aura Ring */}
      <div className="relative mb-3.5 flex-shrink-0">
        <img
          src={imageSrc || "https://placehold.co/112x112/1c0409/f43f5e?text=GLUG"}
          alt={member.name}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full 
            ring-2 ring-red-500/50 
            group-hover:ring-rose-400 
            group-hover:shadow-[0_0_24px_rgba(244,63,94,0.7)] 
            transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/112x112/1c0409/f43f5e?text=GLUG";
          }}
        />

        {/* Floating Mini Red Dragon Flame */}
        <div className="absolute -bottom-1 -right-1 p-1 bg-[#150308] rounded-full border border-red-500/50 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
          <DragonFlame className="w-3 h-3 text-red-400" />
        </div>
      </div>

      {/* Member Name */}
      <h4 className="font-poppins font-bold text-base sm:text-lg text-white group-hover:text-rose-200 transition-colors line-clamp-1 w-full">
        {member.name}
      </h4>

      {/* Role Badge (Red Dragon Flame Style) */}
      {roles && (
        <div className="mt-1.5 mb-2.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-red-950 to-[#3a0914] text-rose-300 border border-red-500/40 group-hover:border-rose-400/70 shadow-sm">
            {roles}
          </span>
        </div>
      )}

      {/* Bio Snippet (Revealed on hover / compact by default) */}
      <div className="w-full min-h-[36px] flex items-center justify-center">
        {member.description ? (
          <p className="text-gray-300/80 group-hover:text-gray-200 text-xs leading-relaxed line-clamp-2 transition-colors">
            {member.description}
          </p>
        ) : (
          <p className="text-gray-500 text-xs italic">GLUG JEC Member</p>
        )}
      </div>

      {/* Social Links & View Details Prompt */}
      <div className="mt-3 pt-3 w-full border-t border-red-500/20 flex items-center justify-between text-xs">
        {/* Social Icons */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {(member.linkedin || member.linkedinUrl) && (
            <a
              href={member.linkedin || member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-1.5 text-white/70 hover:text-white bg-white/5 hover:bg-blue-600/30 rounded-lg transition-colors border border-transparent hover:border-blue-400/40"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
          )}

          {(member.instagram || member.instagramUrl || member.insta) && (
            <a
              href={member.instagram || member.instagramUrl || member.insta}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="p-1.5 text-white/70 hover:text-white bg-white/5 hover:bg-rose-600/30 rounded-lg transition-colors border border-transparent hover:border-rose-400/40"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* View Profile Action Hint */}
        <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 group-hover:text-rose-300 font-medium">
          View Profile
          <FaExternalLinkAlt className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};

export default TeamMemberCard;
