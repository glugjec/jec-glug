import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { buildXapiHeaders } from '../../config/xapiSession';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const HomeSponsorManager = () => {
  const [homeSponsors, setHomeSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [operationError, setOperationError] = useState('');
  const [formData, setFormData] = useState({
    orderNo: 1,
    imageUrl: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchHomeSponsors();
  }, []);

  const fetchHomeSponsors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/homepage-sponsors`);
      setHomeSponsors(response.data || []);
    } catch (error) {
      console.error('Error fetching homepage sponsors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOperationError('');
    
    if (!editingSponsor && !selectedImage) {
      alert('Please select a sponsor icon');
      return;
    }
    
    if (editingSponsor && !selectedImage && !imagePreview) {
      alert('Please select a sponsor icon');
      return;
    }
    
    const isDuplicateOrder = homeSponsors.some(sponsor => 
      sponsor.orderNo === formData.orderNo && 
      sponsor._id !== (editingSponsor ? editingSponsor._id : null)
    );
    
    if (isDuplicateOrder) {
      alert(`Display order ${formData.orderNo} is already taken. Please choose a different number.`);
      return;
    }
    
    const action = editingSponsor ? 'update' : 'add';
    const sponsorName = `Sponsor #${formData.orderNo}`;
    
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

  const handleConfirmAction = async (xapiKey) => {
    const formDataObj = new FormData();
    formDataObj.append('orderNo', formData.orderNo);
    if (selectedImage) {
      formDataObj.append('logo', selectedImage);
    }

    try {
      if (confirmModal.type === 'update') {
        await axios.patch(`${baseURL}/homepage-sponsors/${editingSponsor._id}`, formDataObj, {
          headers: buildXapiHeaders(xapiKey, true)
        });
      } else if (confirmModal.type === 'add') {
        await axios.post(`${baseURL}/homepage-sponsors`, formDataObj, {
          headers: buildXapiHeaders(xapiKey, true)
        });
      }
      fetchHomeSponsors();

      setOperationError('');
      setFormData({ orderNo: 1, imageUrl: '' });
      setSelectedImage(null);
      setImagePreview(null);
      setShowAddForm(false);
      setConfirmModal({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Error saving home sponsor:', error);
      throw new Error(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid X-API key'
      );
    }
  };

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
    setFormData({
      orderNo: sponsor.orderNo || 1,
      imageUrl: sponsor.imageUrl || ''
    });
    setImagePreview(sponsor.imageUrl || null);
    setSelectedImage(null);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const sponsor = homeSponsors.find(s => s._id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { sponsorName: `Sponsor #${sponsor?.orderNo || ''}`, id }
    });
  };

  const handleConfirmDelete = async (xapiKey) => {
    try {
      await axios.delete(`${baseURL}/homepage-sponsors/${confirmModal.data.id}`, {
        headers: buildXapiHeaders(xapiKey)
      });
      fetchHomeSponsors();
      setOperationError('');
      setConfirmModal({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Error deleting home sponsor:', error);
      throw new Error(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid X-API key'
      );
    }
  };

  const resetForm = () => {
    setOperationError('');
    setFormData({ orderNo: 1, imageUrl: '' });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingSponsor(null);
    setShowAddForm(false);
  };

  const moveUp = async (id) => {
    const sortedSponsors = [...homeSponsors].sort((a, b) => a.orderNo - b.orderNo);
    const index = sortedSponsors.findIndex(s => s._id === id);
    
    if (index > 0) {
      const currentSponsor = sortedSponsors[index];
      const previousSponsor = sortedSponsors[index - 1];
      
      const tempOrder = currentSponsor.orderNo;
      const prevOrder = previousSponsor.orderNo;
      
      try {
        const fd1 = new FormData();
        fd1.append('orderNo', 9999); // temp order to avoid unique constraints violation
        await axios.patch(`${baseURL}/homepage-sponsors/${currentSponsor._id}`, fd1, {
          headers: buildXapiHeaders()
        });

        const fd2 = new FormData();
        fd2.append('orderNo', tempOrder);
        await axios.patch(`${baseURL}/homepage-sponsors/${previousSponsor._id}`, fd2, {
          headers: buildXapiHeaders()
        });

        const fd3 = new FormData();
        fd3.append('orderNo', prevOrder);
        await axios.patch(`${baseURL}/homepage-sponsors/${currentSponsor._id}`, fd3, {
          headers: buildXapiHeaders()
        });

        setOperationError('');
        fetchHomeSponsors();
      } catch (error) {
        console.error('Error reordering homepage sponsors:', error);
        setOperationError(
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to reorder homepage sponsors.'
        );
      }
    }
  };

  const moveDown = async (id) => {
    const sortedSponsors = [...homeSponsors].sort((a, b) => a.orderNo - b.orderNo);
    const index = sortedSponsors.findIndex(s => s._id === id);
    
    if (index < sortedSponsors.length - 1) {
      const currentSponsor = sortedSponsors[index];
      const nextSponsor = sortedSponsors[index + 1];
      
      const tempOrder = currentSponsor.orderNo;
      const nextOrder = nextSponsor.orderNo;
      
      try {
        const fd1 = new FormData();
        fd1.append('orderNo', 9999); // temp order to avoid unique constraints violation
        await axios.patch(`${baseURL}/homepage-sponsors/${currentSponsor._id}`, fd1, {
          headers: buildXapiHeaders()
        });

        const fd2 = new FormData();
        fd2.append('orderNo', tempOrder);
        await axios.patch(`${baseURL}/homepage-sponsors/${nextSponsor._id}`, fd2, {
          headers: buildXapiHeaders()
        });

        const fd3 = new FormData();
        fd3.append('orderNo', nextOrder);
        await axios.patch(`${baseURL}/homepage-sponsors/${currentSponsor._id}`, fd3, {
          headers: buildXapiHeaders()
        });

        setOperationError('');
        fetchHomeSponsors();
      } catch (error) {
        console.error('Error reordering homepage sponsors:', error);
        setOperationError(
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to reorder homepage sponsors.'
        );
      }
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

      {operationError && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200 text-sm">
          {operationError}
        </div>
      )}

      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingSponsor ? 'Edit Home Sponsor' : 'Add New Home Sponsor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Display Order (Order No)
              </label>
              <input
                type="number"
                value={formData.orderNo}
                onChange={(e) => setFormData({...formData, orderNo: parseInt(e.target.value) || 1})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1"
                min="1"
                required
              />
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
                        setFormData({...formData, imageUrl: ''});
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
        <div className="text-white text-center py-10">Loading homepage sponsors...</div>
      ) : (
        <>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Homepage Preview</h3>
            <div className="flex flex-wrap items-center justify-center gap-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl">
              {homeSponsors
                .sort((a, b) => a.orderNo - b.orderNo)
                .map((sponsor) => (
                  <div key={sponsor._id} className="group relative">
                    <img
                      src={sponsor.imageUrl}
                      alt={`Sponsor ${sponsor.orderNo}`}
                      className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/80x60/161D58/FFFFFF?text=Logo';
                      }}
                    />
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        Order: {sponsor.orderNo}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeSponsors
              .sort((a, b) => a.orderNo - b.orderNo)
              .map((sponsor, index) => (
                <div key={sponsor._id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  <div className="text-center mb-4">
                    <img
                      src={sponsor.imageUrl}
                      alt={`Sponsor ${sponsor.orderNo}`}
                      className="w-20 h-16 object-contain mx-auto mb-3 bg-white/10 rounded-xl p-2"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/80x60/161D58/FFFFFF?text=Logo';
                      }}
                    />
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                        Order No: {sponsor.orderNo}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-2 mb-4">
                    <button
                      onClick={() => moveUp(sponsor._id)}
                      disabled={index === 0}
                      className="bg-blue-500/30 hover:bg-blue-500/50 disabled:bg-gray-500/20 disabled:text-gray-400 text-blue-200 px-3 py-1 rounded-lg transition-all duration-300 text-sm"
                    >
                      ↑ Up
                    </button>
                    <button
                      onClick={() => moveDown(sponsor._id)}
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
                      onClick={() => handleDelete(sponsor._id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </>
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
