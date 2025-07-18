import React from 'react'
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium  mb-1">
            Your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-b border-gray-600 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-b border-gray-600 w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium  mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border-b border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium  mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border-b border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            placeholder="Enter your message"
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactForm
