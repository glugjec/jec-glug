import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const GalleryManager = () => {
  const [images, setImages] = useState([
    { 
      id: 1, 
      url: '/images/gallery.png', 
      title: 'GLUG Event 2024',
      description: 'Annual tech meetup and workshop'
    },
    { 
      id: 2, 
      url: '/images/gallery2.png', 
      title: 'Workshop Session',
      description: 'Hands-on coding workshop'
    },
    { 
      id: 3, 
      url: '/images/gallery.png', 
      title: 'Tech Talk',
      description: 'Expert speaker session'
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({ 
    url: '', 
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const action = editingImage ? 'update' : 'add';
    const imageName = editingImage ? editingImage.title : formData.title;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { imageName }
    });
  };

  const handleConfirmAction = () => {
    if (confirmModal.type === 'update') {
      const updateData = {
        url: formData.url,
        title: formData.title,
        description: formData.description
      };
      setImages(images.map(img => 
        img.id === editingImage.id 
          ? { ...img, ...updateData }
          : img
      ));
      setEditingImage(null);
    } else if (confirmModal.type === 'add') {
      const newImage = {
        id: Date.now(),
        url: formData.url,
        title: formData.title,
        description: formData.description
      };
      setImages([...images, newImage]);
    }
    setFormData({ 
      url: '', 
      title: '',
      description: ''
    });
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({ 
      url: image.url, 
      title: image.title,
      description: image.description
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const image = images.find(img => img.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { imageName: image?.title || 'this image', id }
    });
  };

  const handleConfirmDelete = () => {
    setImages(images.filter(img => img.id !== confirmModal.data.id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ 
      url: '', 
      title: '',
      description: ''
    });
    setEditingImage(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Gallery Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
        >
          + Add Image
        </button>
      </div>

      
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg or /images/gallery.png"
                required
              />
              {formData.url && (
                <div className="mt-3">
                  <p className="text-xs text-blue-300 mb-2">Preview:</p>
                  <img
                    src={formData.url}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded-lg border-2 border-white/20"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/128x96/161D58/FFFFFF?text=Error';
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Image Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., GLUG Event 2024"
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
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                placeholder="Brief description of the image"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition-all duration-300"
              >
                {editingImage ? 'Update' : 'Add'} Image
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
        {images.map((image) => (
          <div key={image.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
              onError={(e) => {
                e.target.src = 'https://placehold.co/300x200/161D58/FFFFFF?text=Image+Not+Found';
              }}
            />
            <h3 className="text-white font-semibold text-lg mb-2">{image.title}</h3>
            <p className="text-blue-200 text-sm mb-4">{image.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(image)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm"
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
        title={confirmModal.type === 'delete' ? 'Delete Image' : (confirmModal.type === 'update' ? 'Update Image' : 'Add Image')}
        message={
          confirmModal.type === 'delete' 
            ? `Are you sure you want to delete "${confirmModal.data?.imageName || 'this image'}"? This action cannot be undone.`
            : confirmModal.type === 'update'
            ? `Are you sure you want to update "${confirmModal.data?.imageName}" image?`
            : `Are you sure you want to add "${confirmModal.data?.imageName}" image?`
        }
        confirmText={confirmModal.type === 'delete' ? 'Delete' : (confirmModal.type === 'update' ? 'Update' : 'Add Image')}
        cancelText="Cancel"
        type={confirmModal.type === 'delete' ? 'danger' : 'default'}
      />
    </div>
  );
};

export default GalleryManager;
