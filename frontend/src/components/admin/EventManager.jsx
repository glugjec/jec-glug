import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { buildXapiHeaders } from '../../config/xapiSession';
import EventImageGallery from '../EventImageGallery';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    tags: '',
    imageUrl: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/events`);
      const data = response.data;
      if (data && data.status === 'success') {
        const allEvents = [...(data.upcoming || []), ...(data.past || [])];
        setEvents(allEvents);
      } else {
        setEvents(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editingEvent && (!selectedImages || selectedImages.length === 0)) {
      alert('Please select at least one image for the event');
      return;
    }
    
    if (editingEvent && (!selectedImages || selectedImages.length === 0) && (!imagePreviews || imagePreviews.length === 0)) {
      alert('Please select at least one image for the event');
      return;
    }
    
    const action = editingEvent ? 'update' : 'add';
    const eventName = editingEvent ? editingEvent.title : formData.title;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { eventName }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const maxSize = 5 * 1024 * 1024;
      const validFiles = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) {
          alert(`File "${file.name}" size must be less than 5MB. Please choose a smaller image.`);
          continue;
        }
        validFiles.push(file);
      }
      
      if (validFiles.length > 0) {
        setSelectedImages(validFiles);
        
        const previews = new Array(validFiles.length);
        let loaded = 0;
        validFiles.forEach((file, index) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            previews[index] = e.target.result;
            loaded++;
            if (loaded === validFiles.length) {
              setImagePreviews(previews);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    if (editingEvent) {
      setImagePreviews(existingImages);
    } else {
      setImagePreviews([]);
    }
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleMoveImage = (index, direction) => {
    if (selectedImages.length === 0) return; // Can only rearrange newly selected files
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= selectedImages.length) return;

    const newSelected = [...selectedImages];
    const tempFile = newSelected[index];
    newSelected[index] = newSelected[targetIndex];
    newSelected[targetIndex] = tempFile;
    setSelectedImages(newSelected);

    const newPreviews = [...imagePreviews];
    const tempPreview = newPreviews[index];
    newPreviews[index] = newPreviews[targetIndex];
    newPreviews[targetIndex] = tempPreview;
    setImagePreviews(newPreviews);
  };

  const handleRemoveImage = (index) => {
    if (selectedImages.length === 0) return;
    const newSelected = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newSelected);
    setImagePreviews(newPreviews);
    if (newSelected.length === 0) {
      const fileInput = document.getElementById('image-upload');
      if (fileInput) {
        fileInput.value = '';
      }
    }
  };

  const handleConfirmAction = async (xapiKey) => {
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    
    // Convert date value from YYYY-MM-DD to DD/MM/YYYY for the backend
    let formattedDate = '';
    if (formData.date) {
      const parts = formData.date.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    
    formDataObj.append('date', formattedDate);
    formDataObj.append('time', '00:00'); // The backend expects time to compile the full Date object
    formDataObj.append('tags', formData.tags);
    
    if (selectedImages && selectedImages.length > 0) {
      if (selectedImages.length > 1) {
        selectedImages.forEach(file => {
          formDataObj.append('images', file);
        });
      } else {
        formDataObj.append('image', selectedImages[0]);
      }
    }

    try {
      if (confirmModal.type === 'update') {
        await axios.patch(`${baseURL}/events/${editingEvent._id}`, formDataObj, {
          headers: buildXapiHeaders(xapiKey, true)
        });
      } else if (confirmModal.type === 'add') {
        await axios.post(`${baseURL}/events`, formDataObj, {
          headers: buildXapiHeaders(xapiKey, true)
        });
      }
      fetchEvents();

      resetForm();
      setConfirmModal({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Error saving event:', error);
      throw new Error(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid X-API key'
      );
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    
    // Format date value back to YYYY-MM-DD for <input type="date" />
    let formattedDate = '';
    if (event.date) {
      const d = new Date(event.date);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toISOString().split('T')[0];
      }
    }

    setFormData({
      title: event.title || '',
      description: event.description || '',
      date: formattedDate,
      tags: Array.isArray(event.tags) ? event.tags.join(', ') : '',
      imageUrl: event.imageUrl || ''
    });
    
    const initialImages = event.imageUrls && event.imageUrls.length > 0
      ? event.imageUrls
      : (event.imageUrl ? [event.imageUrl] : []);
    setExistingImages(initialImages);
    setImagePreviews(initialImages);
    setSelectedImages([]);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const event = events.find(e => e._id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { eventName: event?.title || 'this event', id }
    });
  };

  const handleConfirmDelete = async (xapiKey) => {
    try {
      await axios.delete(`${baseURL}/events/${confirmModal.data.id}`, {
        headers: buildXapiHeaders(xapiKey)
      });
      fetchEvents();
      setConfirmModal({ isOpen: false, type: '', data: null });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Invalid X-API key'
      );
    }
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      description: '', 
      date: '', 
      tags: '', 
      imageUrl: ''
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setExistingImages([]);
    setEditingEvent(null);
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (index) => {
    const colors = [
      'bg-blue-500/30 text-blue-200',
      'bg-green-500/30 text-green-200',
      'bg-purple-500/30 text-purple-200',
      'bg-pink-500/30 text-pink-200',
      'bg-yellow-500/30 text-yellow-200',
      'bg-orange-500/30 text-orange-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Event Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
        >
          + Add Event
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event description"
                rows="3"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Workshop, Tech, Beginner"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Event Images <span className="text-red-400">*</span>
              </label>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                    required={!editingEvent || imagePreviews.length === 0}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 bg-white/5 ${
                      (!editingEvent && selectedImages.length === 0) || (editingEvent && selectedImages.length === 0 && imagePreviews.length === 0)
                        ? 'border-red-400/50 hover:border-red-400' 
                        : 'border-white/30 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-blue-300">
                        <span className="font-semibold">Click to upload multiple</span> or drag and drop
                      </p>
                      <p className="text-xs text-blue-400">PNG, JPG, JPEG or GIF (MAX. 5MB per image)</p>
                      {(!editingEvent && selectedImages.length === 0) || (editingEvent && selectedImages.length === 0 && imagePreviews.length === 0) ? (
                        <p className="text-xs text-red-400 mt-1">* At least one image required</p>
                      ) : null}
                    </div>
                  </label>
                </div>

                {imagePreviews && imagePreviews.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm text-blue-200 font-semibold">Previews ({imagePreviews.length} images)</span>
                        {selectedImages.length > 0 && (
                          <span className="text-[11px] text-blue-400">Hover images to reorder or remove</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleClearImages}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Clear Selection
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group rounded-xl overflow-hidden border border-white/20 h-28 bg-black/20">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-contain"
                          />
                          
                          {/* Reordering Overlay Controls */}
                          {selectedImages.length > 0 && (
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity duration-300">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, -1)}
                                  className="p-1 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors cursor-pointer"
                                  title="Move Left"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="p-1 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                                title="Remove"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              {index < selectedImages.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleMoveImage(index, 1)}
                                  className="p-1 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors cursor-pointer"
                                  title="Move Right"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}

                          <div className="absolute bottom-1 left-1 bg-black/60 text-white px-1.5 py-0.5 rounded text-[10px]">
                            {selectedImages.length > 0 ? `New #${index + 1}` : `Existing #${index + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedImages && selectedImages.length > 0 && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ {selectedImages.length} {selectedImages.length === 1 ? 'image' : 'images'} ready for upload: {selectedImages.map(f => f.name).join(', ')}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
              >
                {editingEvent ? 'Update' : 'Add'} Event
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
        <div className="text-white text-center py-10">Loading events...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
              <EventImageGallery
                imageUrls={event.imageUrls}
                imageUrl={event.imageUrl}
                alt={event.title}
                className="w-full h-48"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                  <span className="text-blue-300 text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                    {formatDate(event.date)}
                  </span>
                </div>
                <p className="text-blue-200 mb-4">{event.description}</p>
                
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(index)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, type: '', data: null })}
        title={confirmModal.type === 'delete' ? 'Delete Event' : (confirmModal.type === 'update' ? 'Update Event' : 'Add Event')}
        message={
          confirmModal.type === 'delete' 
            ? `Are you sure you want to delete "${confirmModal.data?.eventName || 'this event'}"? This action cannot be undone.`
            : confirmModal.type === 'update'
            ? `Are you sure you want to update "${confirmModal.data?.eventName}" event?`
            : `Are you sure you want to add "${confirmModal.data?.eventName}" event?`
        }
        confirmText={confirmModal.type === 'delete' ? 'Delete' : (confirmModal.type === 'update' ? 'Update' : 'Add Event')}
        cancelText="Cancel"
        type={confirmModal.type === 'delete' ? 'danger' : 'default'}
      />
    </div>
  );
};

export default EventManager;
