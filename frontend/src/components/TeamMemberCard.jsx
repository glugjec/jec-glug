import React from 'react'

const TeamMemberCard = ({ member }) => {
  return (
    <div className="team-member-card bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="member-avatar mb-4 flex justify-center">
        {/* Avatar with initials */}
        <div className="avatar-placeholder w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center">
          <img src={`/images/${member.name.split(' ')[0].toLowerCase()}.jpg`} alt="Description" />
        </div>
      </div>
      <h3 className="member-name text-white font-semibold text-lg mb-2 text-center">{member.name}</h3>
      <p className="member-role text-cyan-400 text-sm font-medium mb-3 text-center uppercase">{member.role}</p>
      <p className="member-description text-gray-400 text-sm leading-relaxed text-center">{member.description}</p>
    </div>

  );
};

export default TeamMemberCard
