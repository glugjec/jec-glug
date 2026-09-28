import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import EventCountdown from '../components/EventCountdown';
import EventImageGallery from '../components/EventImageGallery';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // The backend doesn't support /events/:id, so fetch all and filter
        const res = await axios.get(`${baseURL}/events`);
        const allEvents = [...(res.data.upcoming || []), ...(res.data.past || [])];
        const foundEvent = allEvents.find(e => e._id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!loading && !error && event) {
      // Small delay to ensure render is ready before animating
      const timer = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(timer);
    }
  }, [loading, error, event]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-24">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#8AE6FF]/30 border-t-[#8AE6FF] rounded-full animate-spin"></div>
          <p className="font-poppins text-gray-400">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 pt-24 motion-safe:animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-red-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="font-canno text-3xl text-white font-bold mb-4">{error || 'Event not found'}</h2>
        <Link to="/events" className="font-poppins px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-md transition-colors border border-white/10">
          Back to Events
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hasTags = event.tags && event.tags.length > 0;
  const displayTags = hasTags ? event.tags : ['Hackathon', 'Innovation', 'Coding'];

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 md:py-16 pt-24 md:pt-32 transform motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} relative`}>
      {/* Subtle Background Particles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-[60%] left-[10%] w-1 h-1 bg-white rounded-full opacity-10 motion-safe:animate-pulse" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute top-[30%] right-[25%] w-2 h-2 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
        <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-10 motion-safe:animate-pulse" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-[#8AE6FF] rounded-full opacity-20 motion-safe:animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
      </div>

      {/* Back button */}
      <Link to="/events" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 font-poppins text-sm group">
        <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column: Image & Countdown */}
        <div className={`lg:col-span-7 flex flex-col gap-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full aspect-[4/3] md:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl border border-white/5 relative group flex items-center justify-center">
            <EventImageGallery
              imageUrls={event.imageUrls}
              imageUrl={event.imageUrl || '/images/default-event.png'}
              alt={event.title}
              className="w-full h-full"
              imgClassName="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          
          <div className="w-full">
            <EventCountdown targetDate={event.date} />
          </div>
        </div>

        {/* Right Column: Details */}
        <div className={`lg:col-span-5 flex flex-col justify-start pt-4 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block bg-[#8AE6FF]/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs md:text-sm tracking-wide font-medium text-[#8AE6FF] border border-[#8AE6FF]/30 w-fit mb-6 shadow-[0_0_15px_rgba(138,230,255,0.1)]">
            {formattedDate}
          </div>
          
          <h1 className="font-canno text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-sm">
            {event.title}
          </h1>

          <div className="font-poppins text-gray-300 mb-10 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
            {event.description}
          </div>

          <div className="mt-4">
            <h4 className="font-poppins text-sm text-gray-400 uppercase tracking-widest mb-4">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-white/5 backdrop-blur-md rounded-xl px-4 py-2 text-xs md:text-sm tracking-wider font-medium text-white border border-white/10 uppercase transition-all duration-300 hover:bg-white/15 hover:border-white/20 hover:-translate-y-0.5"
                >
                  #{tag.replace(/^[@#]/, '')}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
