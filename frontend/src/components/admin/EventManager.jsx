import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const EventManager = () => {
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!editingEvent && !selectedImage) {
      alert('Please select an image for the event');
      return;
    }
    
    
    if (editingEvent && !selectedImage && !imagePreview) {
      alert('Please select an image for the event');
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
    const file = e.target.files[0];
    if (file) {
      
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('File size must be less than 5MB. Please choose a smaller image.');
        e.target.value = ''; 
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAction = () => {
    
    const finalImageUrl = selectedImage ? 
      imagePreview : 
      formData.imageUrl;

    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: finalImageUrl
    };

    if (confirmModal.type === 'update') {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...eventData }
          : event
      ));
      setEditingEvent(null);
    } else if (confirmModal.type === 'add') {
      setEvents([...events, { id: Date.now(), ...eventData }]);
    }
    
    resetForm();
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      tags: Array.isArray(event.tags) ? event.tags.join(', ') : '',
      imageUrl: event.imageUrl
    });
    setImagePreview(event.imageUrl);
    setSelectedImage(null);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const event = events.find(e => e.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { eventName: event?.title || 'this event', id }
    });
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter(event => event.id !== confirmModal.data.id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ 
      title: '', 
      description: '', 
      date: '', 
      tags: '', 
      imageUrl: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingEvent(null);
    setShowAddForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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
                Event Image <span className="text-red-400">*</span>
              </label>
              <div className="space-y-4">
               
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                    required={!editingEvent || !imagePreview}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 bg-white/5 ${
                      (!editingEvent && !selectedImage) || (editingEvent && !selectedImage && !imagePreview)
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
                      {(!editingEvent && !selectedImage) || (editingEvent && !selectedImage && !imagePreview) ? (
                        <p className="text-xs text-red-400 mt-1">* Image required</p>
                      ) : null}
                    </div>
                  </label>
                </div>

                
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border border-white/20"
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
                      {selectedImage ? 'New Image Selected' : 'Current Image'}
                    </div>
                  </div>
                )}

                {/* Upload Status  */}
                {selectedImage && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ Image ready for upload: {selectedImage.name}
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

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x200/161D58/FFFFFF?text=Event+Image';
              }}
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
                  onClick={() => handleDelete(event.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
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
