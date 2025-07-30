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
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!editingImage && !selectedImage) {
      alert('Please select an image');
      return;
    }
    
    
    if (editingImage && !selectedImage && !imagePreview) {
      alert('Please select an image');
      return;
    }
    
    const action = editingImage ? 'update' : 'add';
    const imageName = editingImage ? editingImage.title : formData.title;
    
    setConfirmModal({
      isOpen: true,
      type: action,
      data: { imageName }
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
     
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
      formData.url;

    if (confirmModal.type === 'update') {
      const updateData = {
        url: finalImageUrl,
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
        url: finalImageUrl,
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
    setSelectedImage(null);
    setImagePreview(null);
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
    setImagePreview(image.url);
    setSelectedImage(null);
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
    setSelectedImage(null);
    setImagePreview(null);
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
                Gallery Image <span className="text-red-400">*</span>
              </label>
              <div className="space-y-4">
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                    required={!editingImage || !imagePreview}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 bg-white/5 ${
                      (!editingImage && !selectedImage) || (editingImage && !selectedImage && !imagePreview)
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
                      <p className="text-xs text-blue-400">PNG, JPG, JPEG or GIF (MAX. 10MB)</p>
                      {(!editingImage && !selectedImage) || (editingImage && !selectedImage && !imagePreview) ? (
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
                        setFormData({...formData, url: ''});
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

                
                {selectedImage && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ Image ready for upload: {selectedImage.name}
                  </div>
                )}
              </div>
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
