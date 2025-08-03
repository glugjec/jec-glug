import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const TeamMemberCard = ({ member }) => {
  const roles = Array.isArray(member.role) ? member.role.join(', ') : member.role || '';
  const imageSrc = member.imageUrl || `https://glug-website-backend.vercel.app/members/${member._id}/image`;

  return (
    <div className="bg-gradient-to-b from-black/70 to-slate-600/70 backdrop-blur-sm 
    sm:rounded-[25px] rounded-[20px] p-6 flex flex-col space-y-4 shadow-lg w-full h-full">
      <div className="flex items-start space-x-6">
        <img
          src={imageSrc}
          alt={member.name}
          className="w-28 h-28 object-cover rounded-full border-2 border-slate-700 flex-shrink-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/112x112/0f172a/334155?text=Error";
          }}
        />

        <div>
          <h4 className="font-bold sm:text-[34px] text-[25px] text-white">{member.name}</h4>
          
          <div className="flex items-center space-x-2 flex-wrap">
            <p className="uppercase text-green-400 sm:text-[19px] text-[16px] font-semibold tracking-wider">
              {roles}
            </p> 

            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
                <FaLinkedin />
              </a>
            )}

            {member.insta && (
              <a href={member.insta} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300">
                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      </div>

      <p className="text-white text-base leading-relaxed">{member.description}</p>
    </div>
  );
};

export default TeamMemberCard;
