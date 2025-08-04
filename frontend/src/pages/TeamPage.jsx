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

  
  const getPositionPriority = (position) => {
    if (position === 'CLUB - MENTOR') return 1;
    if (position === 'CLUB - HEAD') return 2;
    if (position === 'CLUB LEADERSHIP') return 3;
    return 999;
  };

  
  const sortedEntries = Object.entries(groupedTeamData).sort(([positionA], [positionB]) => {
    return getPositionPriority(positionA) - getPositionPriority(positionB);
  });

  return (
    <div className="min-h-screen pb-12">
      <TeamHeader />
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 sm:space-y-8">
          
          <div className="w-full max-w-6xl px-2 sm:px-4 space-y-6 sm:space-y-8">
            
            <div className="bg-gradient-to-b from-white/30 to-gray-500/30 backdrop-blur-lg rounded-[20px] sm:rounded-[25px] p-4 sm:p-6 animate-pulse">
              <div className="mb-4 sm:mb-6">
                <div className="h-6 sm:h-8 bg-blue-400/40 rounded w-32 sm:w-48 mb-3 sm:mb-4 animate-shimmer"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gradient-to-b from-black/40 to-slate-600/40 backdrop-blur-sm rounded-[16px] sm:rounded-[20px] p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-6">
                      <div className="w-16 h-16 sm:w-28 sm:h-28 bg-blue-400/30 rounded-full flex-shrink-0 animate-shimmer"></div>
                      <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                        <div className="h-5 sm:h-8 bg-blue-300/40 rounded w-3/4 animate-shimmer"></div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="h-3 sm:h-5 bg-blue-500/40 rounded w-16 sm:w-24 animate-shimmer"></div>
                          <div className="w-3 h-3 sm:w-5 sm:h-5 bg-blue-400/50 rounded animate-shimmer"></div>
                          <div className="w-3 h-3 sm:w-5 sm:h-5 bg-blue-300/50 rounded animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-blue-200/40 rounded w-full animate-shimmer"></div>
                      <div className="h-3 sm:h-4 bg-blue-200/40 rounded w-4/5 animate-shimmer"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            
            <div className="bg-gradient-to-b from-white/30 to-gray-500/30 backdrop-blur-lg rounded-[20px] sm:rounded-[25px] p-4 sm:p-6 animate-pulse">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <div className="h-5 sm:h-7 bg-blue-400/40 rounded w-28 sm:w-40 animate-shimmer"></div>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-300/40 rounded animate-shimmer"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="bg-gradient-to-b from-black/40 to-slate-600/40 backdrop-blur-sm rounded-[16px] sm:rounded-[20px] p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-6">
                      <div className="w-16 h-16 sm:w-28 sm:h-28 bg-blue-400/30 rounded-full flex-shrink-0 animate-shimmer"></div>
                      <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                        <div className="h-5 sm:h-8 bg-blue-300/40 rounded w-2/3 animate-shimmer"></div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="h-3 sm:h-5 bg-blue-500/40 rounded w-20 sm:w-32 animate-shimmer"></div>
                          <div className="w-3 h-3 sm:w-5 sm:h-5 bg-blue-400/50 rounded animate-shimmer"></div>
                          <div className="w-3 h-3 sm:w-5 sm:h-5 bg-blue-300/50 rounded animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-blue-200/40 rounded w-full animate-shimmer"></div>
                      <div className="h-3 sm:h-4 bg-blue-200/40 rounded w-3/4 animate-shimmer"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        sortedEntries.map(([position, members], index) => (
          <TeamSection key={index} title={position} members={members} />
        ))
      )}
    </div>
  );
};

export default TeamPage;
