import React, { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import TeamSection from '../components/TeamSection';
import TeamHeader from '../components/TeamHeader';
import TeamMemberModal from '../components/TeamMemberModal';
import fallbackTeamData from '../team.json';
import { DragonCrest } from '../components/DragonCrest';

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

const getFallbackGrouped = () => {
  if (Array.isArray(fallbackTeamData)) {
    return fallbackTeamData.reduce((acc, sec) => {
      if (sec.title && Array.isArray(sec.members)) {
        acc[sec.title] = sec.members;
      }
      return acc;
    }, {});
  }
  return {};
};

const sortSessions = (sessions) => {
  return [...sessions].sort((seasonA, seasonB) => {
    const startYearA = Number.parseInt(String(seasonA).split('-')[0], 10) || 0;
    const startYearB = Number.parseInt(String(seasonB).split('-')[0], 10) || 0;
    return startYearB - startYearA;
  });
};

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

const TeamPage = () => {
  const [groupedTeamData, setGroupedTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(DEFAULT_SEASON);
  const [availableSessions, setAvailableSessions] = useState([DEFAULT_SEASON]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch sessions
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
        setAvailableSessions([DEFAULT_SEASON]);
      } finally {
        setSessionsLoading(false);
      }
    };

    fetchAvailableSessions();
  }, []);

  // Fetch team members for selected session
  useEffect(() => {
    const fetchTeamData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${baseURL}/session-members`, {
          params: { session: selectedSeason },
        });

        const members = normalizeMembers(response.data);
        if (members.length > 0) {
          const grouped = groupMembersByPosition(members);
          setGroupedTeamData(grouped);
        } else {
          // Fallback to local team.json if backend returns empty
          setGroupedTeamData(getFallbackGrouped());
        }
      } catch (error) {
        // Fallback to local team.json if backend is offline/error
        setGroupedTeamData(getFallbackGrouped());
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

  // Filter members by search query
  const filteredGroupedData = useMemo(() => {
    if (!searchQuery.trim()) {
      return groupedTeamData;
    }

    const query = searchQuery.toLowerCase().trim();
    const result = {};

    Object.entries(groupedTeamData).forEach(([position, members]) => {
      const matchingMembers = members.filter((member) => {
        const nameMatch = member.name?.toLowerCase().includes(query);
        const descMatch = member.description?.toLowerCase().includes(query);
        const roleMatch = Array.isArray(member.role)
          ? member.role.some((r) => String(r).toLowerCase().includes(query))
          : String(member.role || '').toLowerCase().includes(query);

        return nameMatch || descMatch || roleMatch;
      });

      if (matchingMembers.length > 0) {
        result[position] = matchingMembers;
      }
    });

    return result;
  }, [groupedTeamData, searchQuery]);

  const sortedEntries = useMemo(() => {
    return Object.entries(filteredGroupedData).sort(([positionA], [positionB]) => {
      const pa = getPositionPriority(positionA);
      const pb = getPositionPriority(positionB);

      if (pa !== pb) return pa - pb;
      return String(positionA).localeCompare(String(positionB));
    });
  }, [filteredGroupedData]);

  return (
    <div className="min-h-screen pb-20 relative bg-gradient-to-b from-[#140206]/95 via-[#1c040a]/95 to-[#0a0104]/98">
      {/* Ambient Red Dragon Background Glow Orbs */}
      <div className="fixed top-1/4 left-10 w-[420px] h-[420px] bg-red-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-10 w-[450px] h-[450px] bg-rose-700/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Header with Search and Session Controls */}
      <TeamHeader
        selectedSeason={selectedSeason}
        onSeasonChange={handleSeasonChange}
        sessions={sessionOptions}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Loading Skeleton in Reddish Tones */}
      {(loading || sessionsLoading) ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 space-y-8 max-w-7xl mx-auto">
          {[...Array(2)].map((_, secIndex) => (
            <div
              key={secIndex}
              className="w-full bg-gradient-to-b from-[#240810]/30 to-[#0a0205]/60 backdrop-blur-xl border border-red-500/20 rounded-3xl p-6 sm:p-8 animate-pulse"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-red-500/20 animate-shimmer" />
                <div className="h-7 bg-red-500/20 rounded w-48 animate-shimmer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3"
                  >
                    <div className="w-20 h-20 rounded-full bg-red-500/20 animate-shimmer" />
                    <div className="h-4 bg-rose-400/30 rounded w-3/4 animate-shimmer" />
                    <div className="h-3 bg-red-500/20 rounded w-1/2 animate-shimmer" />
                    <div className="h-3 bg-white/10 rounded w-4/5 animate-shimmer" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        sortedEntries.length > 0 ? (
          sortedEntries.map(([position, members], index) => (
            <TeamSection
              key={`${selectedSeason}-${position}-${index}`}
              title={position}
              members={members}
              onSelectMember={setSelectedMember}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[35vh] px-4">
            <div className="bg-gradient-to-b from-[#240810]/55 to-[#0b0205]/85 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-red-500/35 text-center max-w-md shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center border border-red-400/40">
                <DragonCrest className="w-8 h-8" glow={true} />
              </div>
              <h3 className="text-white font-canno text-xl mb-2">
                {searchQuery ? "No Matching Members" : "Coming Soon"}
              </h3>
              <p className="text-rose-200/70 font-poppins text-sm leading-relaxed">
                {searchQuery
                  ? `No members found matching "${searchQuery}". Try searching by another name or role.`
                  : `Team data for session ${selectedSeason} is currently being curated.`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-red-500/20 hover:bg-red-500/30 text-rose-300 border border-red-400/40 transition-all"
                >
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )
      )}

      {/* Member Details Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};

export default TeamPage;
