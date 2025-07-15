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
      <p className="empty-section text-gray-400 text-center col-span-full py-8">Team members to be announced</p>
    )}
  </div>) 
  :
   (<div className="team-members grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>);

    const collapseButton = ListCollapse ? '+' : '-';


  return (
    <div className="team-section bg-gray-900 rounded-lg p-6 mx-4 mb-6 border border-gray-700">
      
      <h2 className="section-title flex items-center justify-between text-white text-xl font-semibold mb-6 ">
        
        {title}
        <button className="text-blue-400" onClick={handleClick}>{collapseButton}</button>
      </h2>
      {content}
    </div>
  );
};

export default TeamSection
