import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import EventShowCard from './EventShowCard';
import SkeletonCard from './ui/SkeletonCard';
import ErrorAlert from './ui/ErrorAlert';
import { isToday } from '@/lib/utils';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EventsComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const handleCountdownExpire = useCallback(() => {
    setCurrentTime(Date.now());
  }, []);

  const nearestUpcomingEvent = React.useMemo(() => {
    const futureEvents = upcomingEvents.filter((ev) => {
      if (!ev?.date) return false;
      const t = new Date(ev.date).getTime();
      return !isNaN(t) && t > currentTime;
    });

    if (futureEvents.length === 0) return null;

    return futureEvents.reduce((nearest, ev) => {
      if (!nearest) return ev;
      return new Date(ev.date).getTime() < new Date(nearest.date).getTime() ? ev : nearest;
    }, null);
  }, [upcomingEvents, currentTime]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${baseURL}/events`);
      const allUpcoming = res.data?.upcoming || [];
      const allPast = res.data?.past || [];

      const todayEvents = [];
      const remainingPast = [];
      const remainingUpcoming = [];

      allUpcoming.forEach((event) => {
        if (isToday(event.date)) {
          todayEvents.push(event);
        } else {
          remainingUpcoming.push(event);
        }
      });

      allPast.forEach((event) => {
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
      setError('Unable to load events from server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6 sm:mb-8 mt-4 px-2 sm:px-4">
        <h1 className="bg-gradient-to-r from-[#8AE6FF] via-[#8AE6FF] to-[#FFFFFF] bg-clip-text text-transparent font-canno text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
          EVENTS
        </h1>
        <p className="font-poppins text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Discover our upcoming events and explore the exciting activities we've organized for the community.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-6 sm:mb-8 px-2">
        <div className="font-helvetica backdrop-blur-sm bg-black/50 p-1 rounded-2xl w-full max-w-md sm:w-auto flex">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 sm:px-6 py-2 rounded-2xl font-medium transition-all duration-300 text-sm sm:text-base w-1/2 sm:w-auto flex items-center justify-center ${
              activeTab === 'upcoming'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 sm:px-6 py-2 rounded-2xl font-medium transition-all duration-500 text-sm sm:text-base w-1/2 sm:w-auto flex items-center justify-center ${
              activeTab === 'past'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      
      {error ? (
        <ErrorAlert message={error} onRetry={fetchEvents} />
      ) : loading ? (
        <SkeletonCard count={6} />
      ) : (activeTab === 'upcoming' ? upcomingEvents : pastEvents).length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">No {activeTab} events found at this moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:p-6 transition-all duration-300">
          {(activeTab === 'upcoming' ? upcomingEvents : pastEvents).map((event) => {
            const isNearest = activeTab === 'upcoming' && nearestUpcomingEvent && (
              (event._id && event._id === nearestUpcomingEvent._id) ||
              (!event._id && event.title === nearestUpcomingEvent.title)
            );

            return (
              <EventShowCard
                key={event._id || event.title}
                event={event}
                showCountdown={Boolean(isNearest)}
                onCountdownExpire={handleCountdownExpire}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventsComponent;
