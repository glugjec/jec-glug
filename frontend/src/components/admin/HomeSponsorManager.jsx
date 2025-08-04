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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!editingSponsor && !selectedImage) {
      alert('Please select a sponsor icon');
      return;
    }
    
    
    if (editingSponsor && !selectedImage && !imagePreview) {
      alert('Please select a sponsor icon');
      return;
    }
    
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
     
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 5MB. Please choose a smaller image.');
        e.target.value = ''; 
        return;
      }
      
      setSelectedImage(file);
      
    
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAction = () => {
    
    const finalIconUrl = selectedImage ? 
      imagePreview : 
      formData.iconUrl;

    const sponsorData = {
      ...formData,
      iconUrl: finalIconUrl
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
    setSelectedImage(null);
    setImagePreview(null);
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
    setImagePreview(sponsor.iconUrl);
    setSelectedImage(null);
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
    setSelectedImage(null);
    setImagePreview(null);
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
                Sponsor Icon <span className="text-red-400">*</span>
              </label>
              <div className="space-y-4">
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                    required={!editingSponsor || !imagePreview}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 bg-white/5 ${
                      (!editingSponsor && !selectedImage) || (editingSponsor && !selectedImage && !imagePreview)
                        ? 'border-red-400/50 hover:border-red-400' 
                        : 'border-white/30 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-blue-300">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-blue-400">PNG, JPG, JPEG or GIF (MAX. 5MB)</p>
                      {(!editingSponsor && !selectedImage) || (editingSponsor && !selectedImage && !imagePreview) ? (
                        <p className="text-xs text-red-400 mt-1">* Icon required</p>
                      ) : null}
                    </div>
                  </label>
                </div>

                
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-24 object-contain rounded-xl border border-white/20 bg-white/5 p-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedImage(null);
                        setFormData({...formData, iconUrl: ''});
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {selectedImage ? 'New Icon Selected' : 'Current Icon'}
                    </div>
                  </div>
                )}

                
                {selectedImage && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ Icon ready for upload: {selectedImage.name}
                  </div>
                )}
              </div>
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
