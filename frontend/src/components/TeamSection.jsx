import React from 'react'
import TeamMemberCard from './TeamMemberCard';
import { useState } from 'react';

const TeamSection = ({ title, members }) => {

  const [ListCollapse, setListCollapse] = useState(true);

  const handleClick = () => {
    setListCollapse(!ListCollapse);
  };

  const content = ListCollapse===false ?(
  <div className="team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {members.length > 0 ? (
      members.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))
    ) : (
      <p className="empty-section text-gray-300 text-center col-span-full py-8">Team members to be announced</p>
    )}
  </div>) 
  :
   (<div className="team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>);

    const collapseButton = ListCollapse ? '+' : '-';


  return (
    <div className="mx-auto my-8 max-w-5xl bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 transition-transform hover:scale-[1.01]">
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white uppercase">{title}</h3>
        <button
          onClick={handleClick}
          className="text-white text-3xl font-bold hover:text-green-400 transition-colors"
        >
          {collapseButton}
        </button>
      </div>
      {content}
    </div>
  );
};

export default TeamSection