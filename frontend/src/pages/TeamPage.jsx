import React from 'react';
import TeamData from './../team.json'
import TeamSection from '../components/TeamSection';
import TeamHeader from '../components/TeamHeader';

const TeamPage = () => {
  return (
    <div className="team-page">
      <TeamHeader />
        {
          TeamData.map((section, index) => (
            <TeamSection key={index} title={section.title} members={section.members} />
          ))
        }
    </div>
  );
};




export default TeamPage;