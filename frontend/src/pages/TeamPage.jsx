import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeamSection from '../components/TeamSection';
import TeamHeader from '../components/TeamHeader';

const TeamPage = () => {
  const [groupedTeamData, setGroupedTeamData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('https://glug-website-backend.vercel.app/members');
        const members = response.data;

        // Group members by their 'position' field
        const grouped = members.reduce((acc, member) => {
          const section = member.position || 'Team';
          if (!acc[section]) {
            acc[section] = [];
          }
          acc[section].push(member);
          return acc;
        }, {});

        setGroupedTeamData(grouped);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div className="min-h-screen pb-12">
      <TeamHeader />
      {loading ? (
        <p className="text-center mt-4">Loading team data...</p>
      ) : (
        Object.entries(groupedTeamData).map(([position, members], index) => (
          <TeamSection key={index} title={position} members={members} />
        ))
      )}
    </div>
  );
};

export default TeamPage;
