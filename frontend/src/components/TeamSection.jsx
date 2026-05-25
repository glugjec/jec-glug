import React, { useState } from 'react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection = ({ title, members = [] }) => {
  const [listCollapse, setListCollapse] = useState(true);

  if (!members || members.length === 0) {
    return null;
  }

  const hasPresident = members.some(
    (member) =>
      member.role.includes('CLUB HEAD') ||
      member.role.includes('CO-HEAD') ||
      member.role.includes('MENTOR')||
      member.role.includes('FACULTY-MENTOR')||
      member.role.includes('ADVISOR')
  );

  const handleClick = (e) => {
    e.stopPropagation();
    setListCollapse(!listCollapse);
  };

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(82, 82, 82, 0.4))',
      }}
      className="mx-4 sm:mx-6 lg:mx-8 xl:mx-auto my-6 sm:my-8 max-w-6xl backdrop-blur-lg shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transition-transform hover:scale-[1.01] sm:rounded-[25px] rounded-[22px]"
    >
      <div 
        onClick={handleClick}
        className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4 cursor-pointer"
      >
        <h3 className="font-canno text-lg sm:text-xl lg:text-2xl font-bold text-white uppercase leading-tight">
          {title}
        </h3>
        {!hasPresident && (
          <div className="text-white text-2xl sm:text-3xl font-bold hover:text-green-400 transition-colors flex-shrink-0 min-w-[40px] flex items-center justify-center">
            {listCollapse ? '+' : '-'}
          </div>
        )}
      </div>

      {(!listCollapse || hasPresident) && (
        <div className="team-members grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6" onClick={(e) => e.stopPropagation()}>
          {members.map((member, index) => (
            <TeamMemberCard key={member._id || index} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSection;
