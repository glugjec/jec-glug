import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const SponsorManager = () => {
  const [sponsors, setSponsors] = useState([
    { 
      id: 1, 
      title: 'Assam Sponsor', 
      tier: 'Gold', 
      partnerType: 'Official Partner',
      imageUrl: '/src/assets/sponsor_logo/assam.png'
    },
    { 
      id: 2, 
      title: 'Oil Company', 
      tier: 'Silver', 
      partnerType: 'Technical Partner',
      imageUrl: '/src/assets/sponsor_logo/oil.jpg'
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    title: '',
    tier: 'Gold',
    partnerType: 'Official Partner',
    imageUrl: ''
  });

  const tierOptions = ['Gold', 'Silver', 'Bronze', 'Platinum'];
  const partnerTypes = ['Official Partner', 'Technical Partner', 'Media Partner', 'Community Partner'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const action = editingSponsor ? 'update' : 'add';
    const sponsorName = editingSponsor ? editingSponsor.title : formData.title;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { sponsorName }
    });
  };

  const handleConfirmAction = () => {
    const sponsorData = {
      ...formData,
      imageUrl: formData.imageUrl
    };

    if (confirmModal.type === 'update') {
      setSponsors(sponsors.map(sponsor => 
        sponsor.id === editingSponsor.id 
          ? { ...sponsor, ...sponsorData }
          : sponsor
      ));
      setEditingSponsor(null);
    } else if (confirmModal.type === 'add') {
      setSponsors([...sponsors, { id: Date.now(), ...sponsorData }]);
    }
    setFormData({ title: '', tier: 'Gold', partnerType: 'Official Partner', imageUrl: '' });
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      title: sponsor.title,
      tier: sponsor.tier,
      partnerType: sponsor.partnerType,
      imageUrl: sponsor.imageUrl
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const sponsor = sponsors.find(s => s.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { sponsorName: sponsor?.title || 'this sponsor', id }
    });
  };

  const handleConfirmDelete = () => {
    setSponsors(sponsors.filter(sponsor => sponsor.id !== confirmModal.data.id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ title: '', tier: 'Gold', partnerType: 'Official Partner', imageUrl: '' });
    setEditingSponsor(null);
    setShowAddForm(false);
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 'Silver': return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 'Bronze': return 'bg-gradient-to-r from-orange-400 to-orange-500';
      default: return 'bg-gradient-to-r from-blue-400 to-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Sponsor Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
        >
          + Add Sponsor
        </button>
      </div>

      
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sponsor name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Tier
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tierOptions.map(tier => (
                    <option key={tier} value={tier} className="bg-[#161D58]">{tier}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Partner Type
              </label>
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({...formData, partnerType: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {partnerTypes.map(type => (
                  <option key={type} value={type} className="bg-[#161D58]">{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Sponsor Logo/Image URL
              </label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/logo.png or /src/assets/sponsor_logo/logo.png"
                required
              />
              <p className="text-xs text-blue-300 mt-2">
                Use external URL (https://...) or project file path (/src/assets/sponsor_logo/logo.png)
              </p>

             
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-xs text-blue-300 mb-2">Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg border-2 border-white/20 bg-white/5 p-2"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x80/161D58/FFFFFF?text=Logo';
                    }}
                  />
                </div>
              )}
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

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-center mb-4">
              <img
                src={sponsor.imageUrl}
                alt={sponsor.title}
                className="w-20 h-20 object-contain mx-auto mb-4 bg-white rounded-xl p-2"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/80x80/161D58/FFFFFF?text=Logo';
                }}
              />
              <h3 className="text-xl font-semibold text-white mb-2">{sponsor.title}</h3>
              <div className="flex flex-col space-y-2">
                <span className={`${getTierColor(sponsor.tier)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                  {sponsor.tier}
                </span>
                <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">
                  {sponsor.partnerType}
                </span>
              </div>
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
            : `Are you sure you want to add ${confirmModal.data?.sponsorName} as a sponsor?`
        }
        confirmText={confirmModal.type === 'delete' ? 'Delete' : (confirmModal.type === 'update' ? 'Update' : 'Add Sponsor')}
        cancelText="Cancel"
        type={confirmModal.type === 'delete' ? 'danger' : 'default'}
      />
    </div>
  );
};

export default SponsorManager;
