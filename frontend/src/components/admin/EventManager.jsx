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
    imageUrl: '',
    imageFile: null,
    imageInputType: 'url'
  });

  const handleFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      try {
        const dataUrl = await handleFileUpload(file);
        setFormData({
          ...formData,
          imageFile: file,
          imageUrl: dataUrl
        });
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const action = editingEvent ? 'update' : 'add';
    const eventName = editingEvent ? editingEvent.title : formData.title;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { eventName }
    });
  };

  const handleConfirmAction = () => {
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      imageUrl: formData.imageUrl
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
      imageUrl: event.imageUrl,
      imageFile: null,
      imageInputType: 'url'
    });
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
      imageUrl: '',
      imageFile: null,
      imageInputType: 'url'
    });
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
              <label className="block text-sm font-medium text-blue-200 mb-3">
                Event Image
              </label>
              
              
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageInputType"
                    value="url"
                    checked={formData.imageInputType === 'url'}
                    onChange={(e) => setFormData({...formData, imageInputType: e.target.value, imageFile: null})}
                    className="mr-2"
                  />
                  <span className="text-blue-200">URL Link</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageInputType"
                    value="file"
                    checked={formData.imageInputType === 'file'}
                    onChange={(e) => setFormData({...formData, imageInputType: e.target.value, imageUrl: ''})}
                    className="mr-2"
                  />
                  <span className="text-blue-200">Upload File</span>
                </label>
              </div>

              
              {formData.imageInputType === 'url' ? (
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/event-image.jpg"
                  required
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {formData.imageFile && (
                    <div className="mt-2">
                      <img 
                        src={URL.createObjectURL(formData.imageFile)} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border border-white/20"
                      />
                    </div>
                  )}
                </div>
              )}
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
