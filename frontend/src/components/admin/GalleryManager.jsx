import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const GalleryManager = () => {
  const [images, setImages] = useState([
    { id: 1, url: '/images/gallery.png', alt: 'Gallery Image 1' },
    { id: 2, url: '/images/gallery2.png', alt: 'Gallery Image 2' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({ 
    url: '', 
    alt: '',
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
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      try {
        const dataUrl = await handleFileUpload(file);
        setFormData({
          ...formData,
          imageFile: file,
          url: dataUrl
        });
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const action = editingImage ? 'update' : 'add';
    const imageName = editingImage ? editingImage.alt : formData.alt;
    
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
        alt: formData.alt
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
        alt: formData.alt
      };
      setImages([...images, newImage]);
    }
    setFormData({ 
      url: '', 
      alt: '',
      imageFile: null,
      imageInputType: 'url'
    });
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({ 
      url: image.url, 
      alt: image.alt,
      imageFile: null,
      imageInputType: 'url'
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const image = images.find(img => img.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { imageName: image?.alt || 'this image', id }
    });
  };

  const handleConfirmDelete = () => {
    setImages(images.filter(img => img.id !== confirmModal.data.id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({ 
      url: '', 
      alt: '',
      imageFile: null,
      imageInputType: 'url'
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
              <label className="block text-sm font-medium text-blue-200 mb-3">
                Gallery Image
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
                    onChange={(e) => setFormData({...formData, imageInputType: e.target.value, url: ''})}
                    className="mr-2"
                  />
                  <span className="text-blue-200">Upload File</span>
                </label>
              </div>

              
              {formData.imageInputType === 'url' ? (
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
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
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={formData.alt}
                onChange={(e) => setFormData({...formData, alt: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image description"
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
              alt={image.alt}
              className="w-full h-48 object-cover rounded-xl mb-4"
              onError={(e) => {
                e.target.src = 'https://placehold.co/300x200/161D58/FFFFFF?text=Image+Not+Found';
              }}
            />
            <p className="text-blue-200 text-sm mb-4">{image.alt}</p>
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
