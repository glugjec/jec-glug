import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const HomeSponsorManager = () => {
  const [homeSponsors, setHomeSponsors] = useState([
    {
      id: 1,
      name: 'Assam Government',
      iconUrl: '/src/assets/sponsor_logo/assam.png',
      linkUrl: 'https://assam.gov.in',
      displayOrder: 1
    },
    {
      id: 2,
      name: 'Oil India Limited',
      iconUrl: '/src/assets/sponsor_logo/oil.jpg',
      linkUrl: 'https://www.oil-india.com',
      displayOrder: 2
    },
    {
      id: 3,
      name: 'Saurabhi Enterprise',
      iconUrl: '/src/assets/sponsor_logo/saurabhi.png',
      linkUrl: 'https://saurabhi.com',
      displayOrder: 3
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    name: '',
    iconUrl: '',
    linkUrl: '',
    displayOrder: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isDuplicateOrder = homeSponsors.some(sponsor => 
      sponsor.displayOrder === formData.displayOrder && 
      sponsor.id !== (editingSponsor ? editingSponsor.id : null)
    );
    
    if (isDuplicateOrder) {
      alert(`Display order ${formData.displayOrder} is already taken. Please choose a different number.`);
      return;
    }
    
    const action = editingSponsor ? 'update' : 'add';
    const sponsorName = editingSponsor ? editingSponsor.name : formData.name;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { sponsorName }
    });
  };

  const handleConfirmAction = () => {
    const sponsorData = {
      ...formData,
      iconUrl: formData.iconUrl
    };

    if (confirmModal.type === 'update') {
      setHomeSponsors(homeSponsors.map(sponsor => 
        sponsor.id === editingSponsor.id 
          ? { ...sponsor, ...sponsorData }
          : sponsor
      ));
      setEditingSponsor(null);
    } else if (confirmModal.type === 'add') {
      setHomeSponsors([...homeSponsors, { id: Date.now(), ...sponsorData }]);
    }
    setFormData({ name: '', iconUrl: '', linkUrl: '', displayOrder: 1 });
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      name: sponsor.name,
      iconUrl: sponsor.iconUrl,
      linkUrl: sponsor.linkUrl,
      displayOrder: sponsor.displayOrder
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const sponsor = homeSponsors.find(s => s.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { sponsorName: sponsor?.name || 'this sponsor', id }
    });
  };

  const handleConfirmDelete = () => {
    setHomeSponsors(homeSponsors.filter(sponsor => sponsor.id !== confirmModal.data.id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ name: '', iconUrl: '', linkUrl: '', displayOrder: 1 });
    setEditingSponsor(null);
    setShowAddForm(false);
  };

  const moveUp = (id) => {
    const sortedSponsors = [...homeSponsors].sort((a, b) => a.displayOrder - b.displayOrder);
    const index = sortedSponsors.findIndex(s => s.id === id);
    
    if (index > 0) {
      const currentSponsor = sortedSponsors[index];
      const previousSponsor = sortedSponsors[index - 1];
      
      
      const tempOrder = currentSponsor.displayOrder;
      currentSponsor.displayOrder = previousSponsor.displayOrder;
      previousSponsor.displayOrder = tempOrder;
      
      setHomeSponsors(homeSponsors.map(sponsor => {
        if (sponsor.id === currentSponsor.id) return currentSponsor;
        if (sponsor.id === previousSponsor.id) return previousSponsor;
        return sponsor;
      }));
    }
  };

  const moveDown = (id) => {
    const sortedSponsors = [...homeSponsors].sort((a, b) => a.displayOrder - b.displayOrder);
    const index = sortedSponsors.findIndex(s => s.id === id);
    
    if (index < sortedSponsors.length - 1) {
      const currentSponsor = sortedSponsors[index];
      const nextSponsor = sortedSponsors[index + 1];
      
      
      const tempOrder = currentSponsor.displayOrder;
      currentSponsor.displayOrder = nextSponsor.displayOrder;
      nextSponsor.displayOrder = tempOrder;
      
      setHomeSponsors(homeSponsors.map(sponsor => {
        if (sponsor.id === currentSponsor.id) return currentSponsor;
        if (sponsor.id === nextSponsor.id) return nextSponsor;
        return sponsor;
      }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Home Page Sponsors</h2>
          <p className="text-blue-200 text-sm mt-1">Manage sponsor icons displayed on the homepage</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
        >
          + Add Home Sponsor
        </button>
      </div>

      
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingSponsor ? 'Edit Home Sponsor' : 'Add New Home Sponsor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Sponsor Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter sponsor name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Sponsor Icon/Logo URL
              </label>
              <input
                type="text"
                value={formData.iconUrl}
                onChange={(e) => setFormData({...formData, iconUrl: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/logo.png or /src/assets/sponsor_logo/logo.png"
                required
              />
              {formData.iconUrl && (
                <div className="mt-3">
                  <p className="text-xs text-blue-300 mb-2">Preview:</p>
                  <img
                    src={formData.iconUrl}
                    alt="Preview"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg border-2 border-white/20 bg-white/5 p-2"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/64x64/161D58/FFFFFF?text=Icon';
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Website Link URL
              </label>
              <input
                type="text"
                value={formData.linkUrl}
                onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://sponsor-website.com"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
              >
                {editingSponsor ? 'Update' : 'Add'} Sponsor
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">Homepage Preview</h3>
        <div className="flex flex-wrap items-center justify-center gap-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl">
          {homeSponsors
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((sponsor) => (
              <div key={sponsor.id} className="group relative">
                <a 
                  href={sponsor.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-transform duration-300 hover:scale-110"
                >
                  <img
                    src={sponsor.iconUrl}
                    alt={sponsor.name}
                    className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x60/161D58/FFFFFF?text=Logo';
                    }}
                  />
                </a>
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {sponsor.name}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {homeSponsors
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((sponsor, index) => (
            <div key={sponsor.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <img
                  src={sponsor.iconUrl}
                  alt={sponsor.name}
                  className="w-20 h-16 object-contain mx-auto mb-3 bg-white/10 rounded-xl p-2"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/80x60/161D58/FFFFFF?text=Logo';
                  }}
                />
                <h3 className="text-lg font-semibold text-white mb-2">{sponsor.name}</h3>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">
                    Order: {sponsor.displayOrder}
                  </span>
                </div>
                <a 
                  href={sponsor.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 text-sm break-all"
                >
                  {sponsor.linkUrl}
                </a>
              </div>
              
              
              <div className="flex justify-center space-x-2 mb-4">
                <button
                  onClick={() => moveUp(sponsor.id)}
                  disabled={index === 0}
                  className="bg-blue-500/30 hover:bg-blue-500/50 disabled:bg-gray-500/20 disabled:text-gray-400 text-blue-200 px-3 py-1 rounded-lg transition-all duration-300 text-sm"
                >
                  ↑ Up
                </button>
                <button
                  onClick={() => moveDown(sponsor.id)}
                  disabled={index === homeSponsors.length - 1}
                  className="bg-blue-500/30 hover:bg-blue-500/50 disabled:bg-gray-500/20 disabled:text-gray-400 text-blue-200 px-3 py-1 rounded-lg transition-all duration-300 text-sm"
                >
                  ↓ Down
                </button>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(sponsor)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sponsor.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, type: '', data: null })}
        title={confirmModal.type === 'delete' ? 'Delete Sponsor' : (confirmModal.type === 'update' ? 'Update Sponsor' : 'Add Sponsor')}
        message={
          confirmModal.type === 'delete' 
            ? `Are you sure you want to delete ${confirmModal.data?.sponsorName || 'this sponsor'}? This action cannot be undone.`
            : confirmModal.type === 'update'
            ? `Are you sure you want to update ${confirmModal.data?.sponsorName}'s information?`
            : `Are you sure you want to add ${confirmModal.data?.sponsorName} as a home sponsor?`
        }
        confirmText={confirmModal.type === 'delete' ? 'Delete' : (confirmModal.type === 'update' ? 'Update' : 'Add Sponsor')}
        cancelText="Cancel"
        type={confirmModal.type === 'delete' ? 'danger' : 'default'}
      />
    </div>
  );
};

export default HomeSponsorManager;
