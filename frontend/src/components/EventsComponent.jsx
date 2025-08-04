import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventShowCard from './EventShowCard';

const EventsComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('https://glug-website-backend.vercel.app/events');
        setUpcomingEvents(res.data.upcoming || []);
        setPastEvents(res.data.past || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8 mt-4 px-4">
        <h1 className="bg-gradient-to-r from-[#8AE6FF] via-[#8AE6FF] to-[#FFFFFF] bg-clip-text text-transparent font-canno text-6xl font-bold mb-4 tracking-tight">
          EVENTS
        </h1>
        <p className="font-poppins text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Discover our upcoming events and explore the exciting activities we've organized for the community.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="font-helvetica backdrop-blur-sm bg-black/50 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
              activeTab === 'upcoming'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-2xl font-medium transition-all duration-500 ${
              activeTab === 'past'
                ? 'bg-green-500 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-300">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gradient-to-b from-gray-700/80 to-gray-800/80 backdrop-blur-sm rounded-[20px] overflow-hidden animate-pulse">
              
              <div className="h-36 bg-blue-400/30 animate-shimmer"></div>
              
              
              <div className="p-4 space-y-3">
                
                <div className="h-6 bg-blue-300/40 rounded w-3/4 animate-shimmer"></div>
                
                
                <div className="h-3 bg-blue-200/30 rounded w-1/3 animate-shimmer"></div>
                
                
                <div className="space-y-2">
                  <div className="h-3 bg-blue-200/30 rounded w-full animate-shimmer"></div>
                  <div className="h-3 bg-blue-200/30 rounded w-4/5 animate-shimmer"></div>
                </div>
                
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="h-5 bg-blue-400/40 rounded-full w-14 animate-shimmer"></div>
                  <div className="h-5 bg-blue-300/40 rounded-full w-16 animate-shimmer"></div>
                  <div className="h-5 bg-blue-500/40 rounded-full w-12 animate-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-300">
          {(activeTab === 'upcoming' ? upcomingEvents : pastEvents).map(event => (
            <EventShowCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsComponent;
