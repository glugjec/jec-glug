import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import TeamSection from '../components/TeamSection';
import TeamHeader from '../components/TeamHeader';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const DEFAULT_SEASON = '2026-2027';

const normalizeSessions = (data) => {
  const sessions = Array.isArray(data)
    ? data
    : Array.isArray(data?.sessions)
      ? data.sessions
      : [];

  return sessions
    .map((session) => {
      if (typeof session === 'string') {
        return session;
      }

      return session?.session || session?.label || session?.value || '';
    })
    .filter(Boolean);
};

const normalizeMembers = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.members)) {
    return data.members;
  }

  return [];
};

const groupMembersByPosition = (members) => {
  const grouped = members.reduce((acc, member) => {
    const section = member.position || 'Team';

    if (!acc[section]) {
      acc[section] = [];
    }

    acc[section].push(member);
    return acc;
  }, {});

  for (const position in grouped) {
    if (position === 'CLUB ADVISORY' || position === 'CLUB ADVISOR') {
      const withIndex = grouped[position].map((m, i) => ({ member: m, index: i }));
      withIndex.sort((a, b) => {
        const aIsClubAdvisor = Array.isArray(a.member.role) && a.member.role.some(r => String(r).toUpperCase().includes('CLUB ADVISOR'));
        const bIsClubAdvisor = Array.isArray(b.member.role) && b.member.role.some(r => String(r).toUpperCase().includes('CLUB ADVISOR'));
        
        if (aIsClubAdvisor && !bIsClubAdvisor) return -1;
        if (!aIsClubAdvisor && bIsClubAdvisor) return 1;
        return a.index - b.index;
      });
      grouped[position] = withIndex.map(item => item.member);
    }
  }

  return grouped;
};


const sortSessions = (sessions) => {
  return [...sessions].sort((seasonA, seasonB) => {
    const startYearA = Number.parseInt(String(seasonA).split('-')[0], 10) || 0;
    const startYearB = Number.parseInt(String(seasonB).split('-')[0], 10) || 0;
    return startYearB - startYearA;
  });
};

const TeamPage = () => {
  const [groupedTeamData, setGroupedTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(DEFAULT_SEASON);
  const [availableSessions, setAvailableSessions] = useState([DEFAULT_SEASON]);

  useEffect(() => {
    const fetchAvailableSessions = async () => {
      try {
        const response = await axios.get(`${baseURL}/session-members/sessions`);
        const sessions = normalizeSessions(response.data);

        if (sessions.length > 0) {
          setAvailableSessions(sessions);

          if (!sessions.includes(DEFAULT_SEASON)) {
            setSelectedSeason(sessions[0]);
          }
        } else {
          setAvailableSessions([DEFAULT_SEASON]);
        }
      } catch (error) {
        console.error('Error fetching team sessions:', error);
        setAvailableSessions([DEFAULT_SEASON]);
      } finally {
        setSessionsLoading(false);
      }
    };

    fetchAvailableSessions();
  }, []);

  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${baseURL}/session-members`, {
          params: { session: selectedSeason },
        });

        const members = normalizeMembers(response.data);
        const grouped = groupMembersByPosition(members);

        setGroupedTeamData(grouped);
      } catch (error) {
        console.error(`Error fetching team data for session ${selectedSeason}:`, error);
        setGroupedTeamData({});
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [selectedSeason]);

  const handleSeasonChange = useCallback((season) => {
    setSelectedSeason(season);
  }, []);

  const sessionOptions = useMemo(() => sortSessions(availableSessions), [availableSessions]);

  const getPositionPriority = (position) => {
    const POSITION_PRIORITY = {
      'CLUB - MENTOR': 1,
      'CLUB - HEAD': 2,
      'CLUB ADVISORY': 3,
      'CLUB ADVISOR': 3,
      'CLUB LEADERSHIP': 4,
      'TECHNICAL TEAM': 5,
      'DESIGN TEAM': 6,
      'MANAGEMENT TEAM': 7,
      'SOCIAL MEDIA TEAM': 8,
      'GENERAL COORDINATORS': 9,
    };

    return POSITION_PRIORITY[position] ?? 999;
  };

  
  const sortedEntries = Object.entries(groupedTeamData).sort(([positionA], [positionB]) => {
    const pa = getPositionPriority(positionA);
    const pb = getPositionPriority(positionB);

    if (pa !== pb) return pa - pb;
    // fallback to alphabetical if same priority
    return String(positionA).localeCompare(String(positionB));
  });

  return (
    <div className="min-h-screen pb-12">
      <TeamHeader
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
        sessions={sessionOptions}
      />
      {(loading || sessionsLoading) ? (
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
        sortedEntries.length > 0 ? (
          sortedEntries.map(([position, members], index) => (
            <TeamSection key={`${selectedSeason}-${index}`} title={position} members={members} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh] px-4">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 sm:p-12 border border-white/10 text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-400/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-canno text-lg sm:text-xl mb-2">Coming Soon</h3>
              <p className="text-white/50 font-poppins text-sm sm:text-base">
                Team data for session {selectedSeason} will be available soon.
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TeamPage;
