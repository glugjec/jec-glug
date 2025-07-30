import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const TeamManager = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Abhilash Kashyap',
      position: 'President',
      role: 'CLUB HEAD',
      description: 'Leading the team with vision and passion for open source.',
      imageUrl: '/images/abhilash.jpg',
      linkedinUrl: 'https://linkedin.com/in/',
      instagramUrl: 'https://instagram.com/'
    },
    {
      id: 2,
      name: 'Ritu Raj Bora',
      position: 'Vice President',
      role: 'DESIGN TEAM',
      description: 'Product designer and creative director',
      imageUrl: '/images/ritu.jpg',
      linkedinUrl: 'https://linkedin.com/in/',
      instagramUrl: 'https://instagram.com/'
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', data: null });
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    role: 'CLUB HEAD',
    description: '',
    imageUrl: '',
    linkedinUrl: '',
    instagramUrl: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const roleOptions = ['CLUB HEAD', 'CLUB LEADERSHIP', 'TECHNICAL TEAM', 'DESIGN TEAM', 'MANAGEMENT TEAM', 'SOCIAL MEDIA TEAM', 'GENERAL COORDINATOR'];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    if (!editingMember && !selectedImage) {
      alert('Please select a profile image');
      return;
    }
    
    
    if (editingMember && !selectedImage && !imagePreview) {
      alert('Please select a profile image');
      return;
    }
    
    const action = editingMember ? 'update' : 'add';
    const memberName = editingMember ? editingMember.name : formData.name;
    
    setConfirmModal({
      isOpen: true,
      type: 'save',
      data: { action, memberName },
      title: editingMember ? 'Update Member' : 'Add New Member',
      message: editingMember 
        ? `Are you sure you want to update ${memberName}'s information?`
        : `Are you sure you want to add ${formData.name} to the team?`,
      confirmText: editingMember ? 'Update' : 'Add Member',
      cancelText: 'Cancel'
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

  const handleConfirmSave = () => {
    
    const finalImageUrl = selectedImage ? 
      imagePreview : 
      formData.imageUrl;

    const memberData = {
      name: formData.name,
      position: formData.position,
      role: formData.role,
      description: formData.description,
      imageUrl: finalImageUrl,
      linkedinUrl: formData.linkedinUrl,
      instagramUrl: formData.instagramUrl
    };

    if (editingMember) {
      setMembers(members.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...memberData }
          : member
      ));
      setEditingMember(null);
    } else {
      setMembers([...members, { id: Date.now(), ...memberData }]);
    }
    setFormData({
      name: '',
      position: '',
      role: 'CLUB LEADERSHIP',
      description: '',
      imageUrl: '',
      linkedinUrl: '',
      instagramUrl: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    setShowAddForm(false);
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      role: member.role,
      description: member.description,
      imageUrl: member.imageUrl,
      linkedinUrl: member.linkedinUrl,
      instagramUrl: member.instagramUrl
    });
    setImagePreview(member.imageUrl);
    setSelectedImage(null);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const member = members.find(m => m.id === id);
    setConfirmModal({
      isOpen: true,
      type: 'delete',
      data: { id, memberName: member?.name },
      title: 'Delete Member',
      message: `Are you sure you want to delete ${member?.name || 'this member'}? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const handleConfirmDelete = () => {
    const { id } = confirmModal.data;
    setMembers(members.filter(member => member.id !== id));
    setConfirmModal({ isOpen: false, type: '', data: null });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      role: 'CLUB HEAD',
      description: '',
      imageUrl: '',
      linkedinUrl: '',
      instagramUrl: ''
    });
    setSelectedImage(null);
    setImagePreview(null);
    setEditingMember(null);
    setShowAddForm(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'CLUB HEAD': return 'bg-purple-500/30 text-purple-200';
      case 'CLUB LEADERSHIP': return 'bg-indigo-500/30 text-indigo-200';
      case 'TECHNICAL TEAM': return 'bg-blue-500/30 text-blue-200';
      case 'DESIGN TEAM': return 'bg-pink-500/30 text-pink-200';
      case 'MANAGEMENT TEAM': return 'bg-green-500/30 text-green-200';
      case 'SOCIAL MEDIA TEAM': return 'bg-yellow-500/30 text-yellow-200';
      case 'GENERAL COORDINATOR': return 'bg-orange-500/30 text-orange-200';
      default: return 'bg-gray-500/30 text-gray-200';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Team Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-sm sm:text-base"
        >
          + Add Member
        </button>
      </div>

      
      {showAddForm && (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
            {editingMember ? 'Edit Member' : 'Add New Member'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="e.g., President, Developer"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                {roleOptions.map(role => (
                  <option key={role} value={role} className="bg-[#161D58]">{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 sm:h-24 text-sm sm:text-base"
                placeholder="Brief description of the member"
                required
              />
            </div>
            
            
            <div>
              <label className="block text-sm font-medium text-blue-200 mb-2">
                Profile Image <span className="text-red-400">*</span>
              </label>
              <div className="space-y-4">
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="image-upload"
                    required={!editingMember || !imagePreview}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 bg-white/5 ${
                      (!editingMember && !selectedImage) || (editingMember && !selectedImage && !imagePreview)
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
                      {(!editingMember && !selectedImage) || (editingMember && !selectedImage && !imagePreview) ? (
                        <p className="text-xs text-red-400 mt-1">* Profile image required</p>
                      ) : null}
                    </div>
                  </label>
                </div>

                
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl border border-white/20"
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

                
                {selectedImage && (
                  <div className="text-sm text-green-300 bg-green-500/20 px-3 py-2 rounded-lg">
                    ✓ Image ready for upload: {selectedImage.name}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                {editingMember ? 'Update' : 'Add'} Member
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-xl transition-all duration-300 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20">
            <div className="text-center mb-4">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-4"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/96x96/161D58/FFFFFF?text=User';
                }}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 break-words">{member.name}</h3>
              <p className="text-blue-300 font-medium mb-2 text-sm sm:text-base">{member.position}</p>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getRoleColor(member.role)}`}>
                {member.role}
              </span>
              <p className="text-blue-200 text-xs sm:text-sm mt-3 leading-relaxed break-words">{member.description}</p>
            </div>
            
            
            <div className="flex justify-center space-x-2 sm:space-x-3 mb-4">
              {member.linkedinUrl && (
                <a 
                  href={member.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 text-sm"
                >
                  📧
                </a>
              )}
              {member.instagramUrl && (
                <a 
                  href={member.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg transition-all duration-300 text-sm"
                >
                  📷
                </a>
              )}
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => handleEdit(member)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-300 text-xs sm:text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={confirmModal.type === 'delete' ? handleConfirmDelete : handleConfirmSave}
        onCancel={() => setConfirmModal({ isOpen: false, type: '', data: null })}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        type={confirmModal.type === 'delete' ? 'danger' : 'default'}
      />
    </div>
  );
};

export default TeamManager;
