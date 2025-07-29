import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const TeamManager = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Abhilash Kashyap',
      position: 'President',
      role: 'Club head',
      description: 'Leading the team with vision and passion for open source.',
      imageUrl: '/images/abhilash.jpg',
      linkedinUrl: 'https://linkedin.com/in/',
      instagramUrl: 'https://instagram.com/'
    },
    {
      id: 2,
      name: 'Ritu Raj Bora',
      position: 'Vice President',
      role: 'Design team',
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
    role: 'Club head',
    description: '',
    imageUrl: '',
    imageFile: null,
    imageInputType: 'url',
    linkedinUrl: '',
    instagramUrl: ''
  });

  const roleOptions = ['Club head', 'Club leadership', 'Technical team', 'Design team', 'Management team', 'Social media Team', 'General coordinator'];

  const handleFileUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
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

      const dataUrl = await handleFileUpload(file);
      setFormData({
        ...formData,
        imageFile: file,
        imageUrl: dataUrl
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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

  const handleConfirmSave = () => {
    const memberData = {
      name: formData.name,
      position: formData.position,
      role: formData.role,
      description: formData.description,
      imageUrl: formData.imageUrl,
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
      role: 'Leadership',
      description: '',
      imageUrl: '',
      imageFile: null,
      imageInputType: 'url',
      linkedinUrl: '',
      instagramUrl: ''
    });
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
      imageFile: null,
      imageInputType: member.imageUrl && member.imageUrl.startsWith('data:') ? 'file' : 'url',
      linkedinUrl: member.linkedinUrl,
      instagramUrl: member.instagramUrl
    });
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
      role: 'Club head',
      description: '',
      imageUrl: '',
      imageFile: null,
      imageInputType: 'url',
      linkedinUrl: '',
      instagramUrl: ''
    });
    setEditingMember(null);
    setShowAddForm(false);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Club head': return 'bg-purple-500/30 text-purple-200';
      case 'Club leadership': return 'bg-indigo-500/30 text-indigo-200';
      case 'Technical team': return 'bg-blue-500/30 text-blue-200';
      case 'Design team': return 'bg-pink-500/30 text-pink-200';
      case 'Management team': return 'bg-green-500/30 text-green-200';
      case 'Social media Team': return 'bg-yellow-500/30 text-yellow-200';
      case 'General coordinator': return 'bg-orange-500/30 text-orange-200';
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
                Member Image
              </label>
              
              
              <div className="flex space-x-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageInputType"
                    value="url"
                    checked={formData.imageInputType === 'url'}
                    onChange={(e) => setFormData({
                      ...formData, 
                      imageInputType: e.target.value,
                      imageUrl: '',
                      imageFile: null
                    })}
                    className="mr-2 text-blue-500"
                  />
                  <span className="text-blue-200 text-sm">URL Link</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="imageInputType"
                    value="file"
                    checked={formData.imageInputType === 'file'}
                    onChange={(e) => setFormData({
                      ...formData, 
                      imageInputType: e.target.value,
                      imageUrl: '',
                      imageFile: null
                    })}
                    className="mr-2 text-blue-500"
                  />
                  <span className="text-blue-200 text-sm">Upload File</span>
                </label>
              </div>

              
              {formData.imageInputType === 'url' && (
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="https://example.com/photo.jpg"
                  required
                />
              )}

             
              {formData.imageInputType === 'file' && (
                <div className="space-y-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-blue-500 file:text-white hover:file:bg-blue-600 text-sm sm:text-base"
                    required={!formData.imageUrl}
                  />
                  <p className="text-xs text-blue-300">Supported formats: JPG, PNG, GIF. Max size: 5MB</p>
                </div>
              )}

              
              {formData.imageUrl && (
                <div className="mt-3">
                  <p className="text-xs text-blue-300 mb-2">Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-white/20"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/80x80/161D58/FFFFFF?text=Error';
                    }}
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
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
                  type="url"
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
