import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const EventManager = () => {
  console.log('EventManager component is rendering');
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Open Source Workshop',
      description: 'Learn the basics of open source development and contributing to projects.',
      date: '2024-08-15',
      tags: ['Workshop', 'Open Source', 'Beginner'],
      imageUrl: 'https://placehold.co/400x200/161D58/FFFFFF?text=Workshop'
    },
    {
      id: 2,
      title: 'Hackathon 2024',
      description: 'A 24-hour coding competition to build innovative solutions.',
      date: '2024-09-20',
      tags: ['Hackathon', 'Competition', 'Innovation'],
      imageUrl: 'https://placehold.co/400x200/161D58/FFFFFF?text=Hackathon+2024'
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Event Management</h2>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold">
          + Add Event
        </button>
      </div>

      {/* Simple Event List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white">{event.title}</h3>
              <p className="text-blue-200 mt-2">{event.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-blue-300 text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                  {event.date}
                </span>
                <div className="flex space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventManager;
