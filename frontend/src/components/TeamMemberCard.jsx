import React from 'react'

const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-gradient-to-b from-[#000000] via-[#020202] via-[#282828] via-[#383737] via-[#444343] to-[#545353] backdrop-blur-sm rounded-xl p-5 flex flex-col space-y-4 shadow-md border border-white/10">
      <div className="flex items-center space-x-4">
        <img
          src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`}
          alt={member.name}
          className="w-24 h-24 object-cover rounded-full border border-white/20"
          onError={(e) => {
            e.target.src = "/images/default.png";
          }}
        />
        <div>
          <h4 className="font-helvetica font-bold text-white">{member.name}</h4>
          <p className="uppercase text-green-400 text-sm">{member.role}</p>
        </div>
      </div>
      <p className="font-poppins text-gray-100 text-sm">{member.description}</p>
    </div>
  );
};

export default TeamMemberCard