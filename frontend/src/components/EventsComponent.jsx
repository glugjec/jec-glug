import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import EventShowCard from './EventShowCard';
import { isToday } from '@/lib/utils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EventsComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(new Map());

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-6');
            entry.target.classList.add('opacity-100', 'translate-y-0');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    const currentCards = Array.from(cardsRef.current.entries())
      .filter(([key]) => key.startsWith(`${activeTab}-`))
      .map(([, el]) => el);

    currentCards.forEach(card => {
      if (card.classList.contains('opacity-0')) {
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [loading, activeTab, upcomingEvents, pastEvents]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseURL}/events`);
        const allUpcoming = res.data.upcoming || [];
        const allPast = res.data.past || [];

        const todayEvents = [];
        const remainingPast = [];
        const remainingUpcoming = [];

        allUpcoming.forEach(event => {
          if (isToday(event.date)) {
            todayEvents.push(event);
          } else {
            remainingUpcoming.push(event);
          }
        });

        allPast.forEach(event => {
          if (isToday(event.date)) {
            todayEvents.push(event);
          } else {
            remainingPast.push(event);
          }
        });

        setUpcomingEvents([...todayEvents, ...remainingUpcoming]);
        setPastEvents(remainingPast);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 relative">
      {/* Subtle Background Particles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-white rounded-full opacity-10 motion-safe:animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[25%] w-2 h-2 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-10 motion-safe:animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
      </div>

      <div className="text-center mb-6 sm:mb-8 mt-4 px-2 sm:px-4 relative z-0">
        <h1 className="bg-gradient-to-r from-[#8AE6FF] via-[#8AE6FF] to-[#FFFFFF] bg-clip-text text-transparent font-canno text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
          EVENTS
        </h1>
        <p className="font-poppins text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover our upcoming events and explore the exciting activities we've organized for the community.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-6 sm:mb-8 px-2">
        <div className="relative font-helvetica backdrop-blur-sm bg-black/50 p-1 rounded-2xl w-full max-w-md grid grid-cols-2">
          {/* Sliding Indicator */}
          <div
            className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-[14px] bg-blue-500 shadow-sm motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none ${
              activeTab === 'upcoming'
                ? 'translate-x-0'
                : 'translate-x-full'
            }`}
          />
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`relative z-10 px-4 sm:px-6 py-2 rounded-2xl font-medium transition-colors duration-300 text-sm sm:text-base flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              activeTab === 'upcoming'
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`relative z-10 px-4 sm:px-6 py-2 rounded-2xl font-medium transition-colors duration-300 text-sm sm:text-base flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
              activeTab === 'past'
                ? 'text-white'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:p-6 transition-all duration-300">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="max-w-sm w-full bg-gray-900/40 rounded-[3rem] shadow-lg border border-gray-800 flex flex-col h-full motion-safe:animate-pulse">
              <div className="h-40 w-full rounded-t-[3rem] bg-gray-800/80"></div>
              <div className="p-6 flex flex-col flex-grow bg-gradient-to-t from-gray-900 to-gray-800 rounded-b-[3rem]">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-12 bg-gray-700/80 rounded-full"></div>
                    <div className="h-6 w-3/4 bg-gray-700/80 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-700/80 rounded-full"></div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-gray-700/40 rounded"></div>
                  <div className="h-3 w-full bg-gray-700/40 rounded"></div>
                  <div className="h-3 w-4/5 bg-gray-700/40 rounded"></div>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-gray-700/30 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-700/30 rounded-full"></div>
                  <div className="h-6 w-14 bg-gray-700/30 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative w-full">
          {['upcoming', 'past'].map((type) => {
            const activeEvents = type === 'upcoming' ? upcomingEvents : pastEvents;
            const isActive = activeTab === type;

            return (
              <div
                key={type}
                className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                  isActive
                    ? 'opacity-100 relative z-10 translate-y-0'
                    : 'opacity-0 absolute top-0 left-0 w-full h-full pointer-events-none translate-y-2 overflow-hidden'
                }`}
              >
                {activeEvents.length === 0 ? (
                  <div className="w-full flex justify-center px-4 py-12">
                    <div className="w-full max-w-lg bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-10 sm:p-12 text-center flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-[#8AE6FF]/10 flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 text-[#8AE6FF]/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-canno text-2xl sm:text-3xl text-white font-bold mb-3 tracking-wide">
                        {type === 'upcoming' ? "No upcoming events" : "No past events"}
                      </h3>
                      <p className="font-poppins text-sm sm:text-base text-gray-300">
                        {type === 'upcoming'
                          ? "Stay tuned for upcoming workshops, sessions and events."
                          : "Past events will appear here once they are available."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:p-6">
                    {activeEvents.map((event, idx) => {
                      const delayClass = idx % 3 === 1 ? 'sm:delay-75' : idx % 3 === 2 ? 'sm:delay-150' : '';
                      return (
                        <div
                          key={event._id}
                          ref={(el) => {
                            const mapKey = `${type}-${event._id}`;
                            if (el) cardsRef.current.set(mapKey, el);
                            else cardsRef.current.delete(mapKey);
                          }}
                          className={`h-full w-full opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${delayClass}`}
                        >
                          <EventShowCard event={event} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsComponent;
