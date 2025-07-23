import React from 'react'

const TeamMemberCard = ({ member }) => {
  return (
    
    <div className="bg-gradient-to-b from-[#000000]/50 via-[#020202]/50 via-[#282828]/50 via-[#383737]/50 via-[#444343]/50 to-[#545353]/50 backdrop-blur-sm rounded-xl p-5 flex flex-col space-y-4 shadow-md w-full h-full">
      <div className="flex items-start space-x-4">
        <img
          src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`}
          alt={member.name}
          className="w-24 h-24 object-cover rounded-full border border-white/20 flex-shrink-0"
          onError={(e) => {
            e.target.src = "/images/default.png";
          }}
        />
        <div>
          <h4 className="font-helvetica font-bold text-lg text-white">{member.name}</h4>
          <p className="uppercase text-green-400 text-sm">{member.role}</p>
        </div>
      </div>
      <p className="font-poppins text-gray-100 text-lg">{member.description}</p>
    </div>
  );
};

export default TeamMemberCard;