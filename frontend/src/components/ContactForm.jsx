import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  // hide alert after 5 seconds
  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (fieldName) => {
    setFocusedField('');
  };

  const handleSubmit = async () => {
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${baseURL}/send-mail`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.status === 200) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 rounded-lg shadow-sm w-full max-w-lg mx-auto">
      <div className="space-y-4 sm:space-y-6">
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            required
            className="border border-gray-600 w-full px-3 py-2.5 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white peer text-sm sm:text-base"
          />
          <label 
            htmlFor="name" 
            className={`absolute left-3 transition-all duration-200 pointer-events-none ${
              focusedField === 'name' || formData.name 
                ? 'text-blue-400 text-xs -top-3 sm:-top-4 bg-[#2A2A5E] px-2' 
                : 'text-gray-400 text-sm top-2.5 sm:top-3'
            }`}
          >
            Enter your name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            required
            className="border border-gray-600 w-full px-3 py-2.5 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white peer text-sm sm:text-base"
          />
          <label 
            htmlFor="email" 
            className={`absolute left-3 transition-all duration-200 pointer-events-none ${
              focusedField === 'email' || formData.email 
                ? 'text-blue-400 text-xs -top-3 sm:-top-4 bg-[#2A2A5E] px-2' 
                : 'text-gray-400 text-sm top-2.5 sm:top-3'
            }`}
          >
            Enter your email
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => handleFocus('subject')}
            onBlur={() => handleBlur('subject')}
            required
            className="w-full px-3 py-2.5 sm:py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white peer text-sm sm:text-base"
          />
          <label 
            htmlFor="subject" 
            className={`absolute left-3 transition-all duration-200 pointer-events-none ${
              focusedField === 'subject' || formData.subject 
                ? 'text-blue-400 text-xs -top-3 sm:-top-4 bg-[#2A2A5E] px-2' 
                : 'text-gray-400 text-sm top-2.5 sm:top-3'
            }`}
          >
            Enter subject
          </label>
        </div>

        <div className="relative">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            required
            rows={4}
            className="w-full px-3 py-2.5 sm:py-3 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-transparent text-white peer resize-none text-sm sm:text-base min-h-[100px] sm:min-h-[120px]"
          />
          <label 
            htmlFor="message" 
            className={`absolute left-3 transition-all duration-200 pointer-events-none ${
              focusedField === 'message' || formData.message 
                ? 'text-blue-400 text-xs -top-3 sm:-top-4 bg-[#2A2A5E] px-2' 
                : 'text-gray-400 text-sm top-2.5 sm:top-3'
            }`}
          >
            Enter your message
          </label>
        </div>

        
        {submitStatus.message && (
          <div className={`p-3 rounded-md text-sm ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-2.5 sm:py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm sm:text-base ${
            isSubmitting 
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </div>
  );
};

export default ContactForm
