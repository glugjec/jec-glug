import React, { useState } from 'react';
import EventShowCard from './EventShowCard';

const EventsComponent = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      id: 1,
      title: 'LINUX Installation Drive',
      description: 'Learn to install and configure Linux distributions. Bring your laptop! ',
      date: '2025-07-20',
      time: '10:00 AM',
      location: 'Computer Lab',
      image: 'https://via.placeholder.com/300x200/4A90E2/ffffff?text=LINUX+Event',
      type: 'workshop'
    },
    {
      id: 2,
      title: 'Python Workshop',
      description: 'Introduction to Python programming basics',
      date: '2025-07-25',
      time: '2:00 PM',
      location: 'Auditorium',
      image: 'https://via.placeholder.com/300x200/50C878/ffffff?text=Python+Workshop',
      type: 'workshop'
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      description: 'Full-stack web development intensive course',
      date: '2025-08-01',
      time: '9:00 AM',
      location: 'Tech Hub',
      image: 'https://via.placeholder.com/300x200/FF6B6B/ffffff?text=Web+Dev+Bootcamp',
      type: 'bootcamp'
    },
    {
      id: 4,
      title: 'AI/ML Seminar',
      description: 'Latest trends in Artificial Intelligence',
      date: '2025-08-10',
      time: '11:00 AM',
      location: 'Conference Room',
      image: 'https://via.placeholder.com/300x200/9B59B6/ffffff?text=AI+ML+Seminar',
      type: 'seminar'
    },
    {
      id: 5,
      title: 'Cybersecurity Workshop',
      description: 'Network security and ethical hacking',
      date: '2025-08-15',
      time: '1:00 PM',
      location: 'Security Lab',
      image: 'https://via.placeholder.com/300x200/E74C3C/ffffff?text=Cybersecurity',
      type: 'workshop'
    },
    {
      id: 6,
      title: 'Mobile App Development',
      description: 'React Native and Flutter development',
      date: '2025-08-20',
      time: '3:00 PM',
      location: 'Mobile Lab',
      image: 'https://via.placeholder.com/300x200/3498DB/ffffff?text=Mobile+Dev',
      type: 'workshop'
    }
  ];

  const pastEvents = [
    {
      id: 1,
      title: 'Hackverse 3.0',
      description: 'Annual hackathon with amazing projects',
      date: '2025-06-15',
      participants: 150,
      image: 'https://via.placeholder.com/300x200/FF9F43/ffffff?text=Hackverse+3.0',
      type: 'hackathon'
    },
    {
      id: 2,
      title: 'Docker Session',
      description: 'Containerization workshop with Docker',
      date: '2025-06-10',
      participants: 80,
      image: 'https://via.placeholder.com/300x200/00D2D3/ffffff?text=Docker+Session',
      type: 'session'
    },
    {
      id: 3,
      title: 'React.js Masterclass',
      description: 'Advanced React concepts and patterns',
      date: '2025-06-05',
      participants: 120,
      image: 'https://via.placeholder.com/300x200/61DAFB/ffffff?text=React+Masterclass',
      type: 'masterclass'
    },
    {
      id: 4,
      title: 'Database Design Workshop',
      description: 'SQL and NoSQL database fundamentals',
      date: '2025-05-28',
      participants: 90,
      image: 'https://via.placeholder.com/300x200/FD79A8/ffffff?text=Database+Workshop',
      type: 'workshop'
    },
    {
      id: 5,
      title: 'Cloud Computing Seminar',
      description: 'AWS and Azure cloud services overview',
      date: '2025-05-20',
      participants: 110,
      image: 'https://via.placeholder.com/300x200/A29BFE/ffffff?text=Cloud+Computing',
      type: 'seminar'
    },
    {
      id: 6,
      title: 'Open Source Contribution',
      description: 'How to contribute to open source projects',
      date: '2025-05-15',
      participants: 75,
      image: 'https://via.placeholder.com/300x200/00B894/ffffff?text=Open+Source',
      type: 'session'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="bg-gradient-to-r from-[#8AE6FF] via-[#8AE6FF] to-[#FFFFFF] bg-clip-text text-transparent font-canno text-6xl font-bold mb-8">
          EVENTs
        </h1>
        <p className="font-poppins text-gray-100 text-lg max-w-2xl mx-auto">
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
                ? 'bg-gray-400 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-2 rounded-2xl font-medium transition-all duration-500 ${
              activeTab === 'past'
                ? 'bg-gray-400 text-white shadow-sm'
                : 'text-white hover:text-gray-200'
            }`}
          >
            Past Events
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 transition-all duration-300">
        {activeTab === 'upcoming' 
          ? upcomingEvents.map(event => (
              <EventShowCard key={event.id} event={event} />
            ))
          : pastEvents.map(event => (
              <EventShowCard key={event.id} event={event} />
            ))
        }
      </div>
    </div>
  );
};

export default EventsComponent;