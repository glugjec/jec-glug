import React from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-gradient-to-b from-black/70 to-slate-600/70 backdrop-blur-sm rounded-xl p-6 flex flex-col space-y-4 shadow-lg w-full h-full">
      <div className="flex items-start space-x-6">
        <img
          src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`}
          alt={member.name}
          className="w-28 h-28 object-cover rounded-full border-2 border-slate-700 flex-shrink-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/112x112/0f172a/334155?text=Error";
          }}
        />
        <div>
          <h4 className="font-bold text-2xl text-white">{member.name}</h4>
          
          <div className="flex items-center space-x-3">
            <p className="uppercase text-green-400 text-lg font-semibold tracking-wider">
              {member.role.replace('_', ' ')}
            </p>

            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300">
                <FaLinkedin />
              </a>
            )}

            {member.instagram && (
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300">
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
