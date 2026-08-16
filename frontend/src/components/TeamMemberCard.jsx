import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const baseURL = import.meta.env.VITE_API_BASE_URL;
 
const TeamMemberCard = ({ member }) => {
  const roles = Array.isArray(member.role) ? member.role.join(', ') : member.role || '';
  const imageSrc = member.imageUrl || `${baseURL}/members/${member._id}/image`;

  return (
    <div className="bg-gradient-to-b from-black/70 to-slate-600/70 backdrop-blur-sm 
    sm:rounded-[25px] rounded-[20px] p-6 flex flex-col space-y-4 shadow-lg w-full h-full hover:scale-105 hover:shadow-x1 transition-transform duration-300">
      
      <div className="flex items-start space-x-3 sm:space-x-6">
        <img
          src={imageSrc}
          alt={member.name}
          className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-full border-2 border-slate-700 flex-shrink-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/112x112/0f172a/334155?text=Error";
          }}
        />

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-[20px] sm:text-[25px] md:text-[34px] text-white break-words">{member.name}</h4>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            {roles && (
              <p className="uppercase text-green-400 text-[14px] sm:text-[16px] md:text-[19px] font-semibold tracking-wider break-words">
                {roles}
              </p>
            )}

            {(member.linkedin || member.linkedinUrl) && (
              <a href={member.linkedin || member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
                <FaLinkedin />
              </a>
            )}


            {(member.instagram || member.instagramUrl || member.insta) && (
              <a href={member.instagram || member.instagramUrl || member.insta} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300">

                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      </div>

      {member.description && (
        <p className="text-white text-sm sm:text-base leading-relaxed break-words">{member.description}</p>
      )}
    </div>
  );
};

export default TeamMemberCard;
