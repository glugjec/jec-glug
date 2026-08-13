import React, { useEffect, useState } from 'react';
import TeamCarousel from '@/components/TeamCarousel';
import AboutGLUG from '@/components/AboutGLUG';
import Event from '@/components/Event';
import HomeSponsorSection from '@/components/HomeSponsorSection';
import Hero from '@/components/Hero';
import PartnerSection from '@/components/PartnerSection';
import ContactSection from '@/components/ContactSection';
import Gallery from "@/components/Gallery";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${baseURL}/events`);
        if (res.data.status === "success") {
          setUpcomingEvents(res.data.upcoming);
          setPastEvents(res.data.past);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEvents();
  }, []);

  const eventSections = [
    {
      id: 1,
      title: "Upcoming events",
      description: "Stay tuned for exciting workshops, hackathons and tech talks.",
      events: upcomingEvents,
    },
    {
      id: 2,
      title: "Previous events",
      description: "A glimpse into the events that shaped our open-source journey.",
      events: pastEvents,
    },
  ];

  return (
    <div className="flex flex-col items-center w-full">
      <div className='w-full bg-gradient-to-b from-[#03022C] to-[#161D58] text-white'>
        <Hero />
        <div className="font-canno py-10 text-center text-3xl sm:text-4xl md:text-5xl">
          Our Team
        </div>
        <div className='w-full px-4 sm:px-16 py-auto'>
          <TeamCarousel />
        </div>
        <AboutGLUG />
      </div>

      <div className='w-full bg-[#3B8FE1] text-white'>
        <HomeSponsorSection />
      </div>

      <div className="bg-[#03022C] color-white w-full py-12">
        {eventSections.map(section => (
          <Event key={section.id} singleEvent={section} />
        ))}
      </div>

      <Gallery />
      <PartnerSection />
      <div className='w-full'>
        <ContactSection bgColor="#03022C" />
      </div>
    </div>
  );
};

export default HomePage;
