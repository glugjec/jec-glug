import React, { useState } from 'react';
import GalleryManager from './GalleryManager';
import SponsorManager from './SponsorManager';
import HomeSponsorManager from './HomeSponsorManager';
import TeamManager from './TeamManager';
import EventManager from './EventManager';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'sponsors', label: 'Sponsors', icon: '🤝' },
    { id: 'home-sponsors', label: 'Home Sponsors', icon: '🏠' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'events', label: 'Events', icon: '📅' },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'gallery':
        return <GalleryManager />;
      case 'sponsors':
        return <SponsorManager />;
      case 'home-sponsors':
        return <HomeSponsorManager />;
      case 'team':
        return <TeamManager />;
      case 'events':
        return <EventManager />;
      default:
        return <GalleryManager />;
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03022B] to-[#161D58]">
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className="h-8 sm:h-10"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1 className="text-lg sm:text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-3 py-2 sm:px-4 rounded-xl transition-all duration-300 border border-red-500/50 text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex relative">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <nav className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          w-64 sm:w-72 lg:w-64 xl:w-72
          bg-white/5 backdrop-blur-xl border-r border-white/20 
          min-h-screen p-4 sm:p-6
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-xl transition-all duration-300"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="space-y-2 mt-12 lg:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-blue-500/30 text-white border border-blue-400/50'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg sm:text-xl">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:ml-0 min-h-screen">
          <div className="max-w-full overflow-x-auto">
            {renderActiveComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
