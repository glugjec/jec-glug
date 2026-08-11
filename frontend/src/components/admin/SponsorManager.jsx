import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const SponsorManager = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    title: '',
    tier: 'Gold',
    partnerType: 'Official Partner',
    imageUrl: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const tierOptions = ['Gold', 'Silver', 'Bronze', 'Platinum'];
  const partnerTypes = ['Official Partner', 'Technical Partner', 'Media Partner', 'Community Partner'];

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/sponsors`);
      setSponsors(response.data || []);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editingSponsor && !selectedImage) {
      alert('Please select a sponsor logo');
      return;
    }
    
    if (editingSponsor && !selectedImage && !imagePreview) {
      alert('Please select a sponsor logo');
      return;
    }
    
    const action = editingSponsor ? 'update' : 'add';
    const sponsorName = editingSponsor ? editingSponsor.title : formData.title;
    
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

  const handleConfirmAction = async () => {
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('tier', formData.tier);
    formDataObj.append('partnerType', formData.partnerType);
    if (selectedImage) {
      formDataObj.append('logo', selectedImage);
    }

    try {
      if (confirmModal.type === 'update') {
        await axios.patch(`${baseURL}/sponsors/${editingSponsor._id}`, formDataObj, {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else if (confirmModal.type === 'add') {
        await axios.post(`${baseURL}/sponsors`, formDataObj, {
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      fetchSponsors();
    } catch (error) {
      console.error('Error saving sponsor:', error);
      alert('Failed to save sponsor. Please verify your connection.');
    }

    setFormData({ title: '', tier: 'Gold', partnerType: 'Official Partner', imageUrl: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      title: sponsor.title || '',
      tier: sponsor.tier || 'Gold',
      partnerType: sponsor.partnerType || 'Official Partner',
      imageUrl: sponsor.imageUrl || ''
    });
    setImagePreview(sponsor.imageUrl || null);
    setSelectedImage(null);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const sponsor = sponsors.find(s => s._id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { sponsorName: sponsor?.title || 'this sponsor', id }
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/sponsors/${confirmModal.data.id}`, {
        headers: {
          'x-api-key': apiKey
        }
      });
      fetchSponsors();
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      alert('Failed to delete sponsor.');
    }
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ title: '', tier: 'Gold', partnerType: 'Official Partner', imageUrl: '' });
    setSelectedImage(null);
    setImagePreview(null);
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
                Sponsor Logo <span className="text-red-400">*</span>
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
                        <p className="text-xs text-red-400 mt-1">* Logo required</p>
                      ) : null}
                    </div>
                  </label>
                </div>

                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-32 object-contain rounded-xl border border-white/20 bg-white/5 p-4"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedImage(null);
                        setFormData({...formData, imageUrl: ''});
                      }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {selectedImage ? 'New Logo Selected' : 'Current Logo'}
                    </div>
                  </div>
                )}

                {selectedImage && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ Logo ready for upload: {selectedImage.name}
                  </div>
                )}
              </div>
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

      {loading ? (
        <div className="text-white text-center py-10">Loading sponsors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sponsors.map((sponsor) => (
            <div key={sponsor._id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
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
                  onClick={() => handleDelete(sponsor._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
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
