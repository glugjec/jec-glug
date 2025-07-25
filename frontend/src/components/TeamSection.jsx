import React from 'react'
import TeamMemberCard from './TeamMemberCard';
import { useState } from 'react';

const TeamSection = ({ title, members }) => {
  
    const [isCollapsed, setIsCollapsed] = useState(true);

    
    const hasPresident = members.some(member => member.role === 'PRESIDENT' || member.role === 'CO-HEAD');

    
    const handleClick = () => {
      setIsCollapsed(!isCollapsed);
    };

    
    const content = !isCollapsed || hasPresident ? (
      <div className="team-members grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 pt-6">
        {members.length > 0 ? (
          members.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))
        ) : (
          <p className="empty-section text-gray-300 text-center col-span-full py-8">Team members to be announced</p>
        )}
      </div>
    ) : null; 

    
    const collapseButton = isCollapsed ? '+' : '−';

    return (
      
      <div className="mx-4 sm:mx-6 lg:mx-8 xl:mx-auto my-8 w-full max-w-6xl bg-gradient-to-br from-slate-600/30 to-slate-200/30 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-gray-900/10 p-8 sm:p-10 lg:p-12 border border-gray-600/20 transition-all hover:scale-[1.01] hover:shadow-blue-400/20 duration-300">
        
        <div className="flex justify-between items-center gap-4">
          <h3 className="font-canno text-lg sm:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider leading-tight">
            {title}
          </h3>
          
          
          {!hasPresident && (
            <button
              onClick={handleClick}
              className="text-white text-2xl sm:text-3xl font-bold hover:text-cyan-300 transition-colors flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-400/10"
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
            >
              {collapseButton}
            </button>
          )}
        </div>
        {content}
      </div>
    );
  };

export default TeamSection