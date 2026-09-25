import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

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

  const [submitStatus, setSubmitStatus] = useState({
    type: '',
    message: ''
  });

  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus({
          type: '',
          message: ''
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.message]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });

      return;
    }

    setIsSubmitting(true);

    setSubmitStatus({
      type: '',
      message: ''
    });

    try {
      const response = await axios.post(`${baseURL}/send-mail`, {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been sent successfully!'
        });

        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);

      setSubmitStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Your name',
      type: 'text',
      placeholder: 'Enter your name',
      icon: User
    },
    {
      name: 'email',
      label: 'Your email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: Mail
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'text',
      placeholder: 'What would you like to talk about?',
      icon: FileText
    }
  ];

  const inputClass = (field) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.05] border text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? 'border-[#3093E5] ring-1 ring-[#3093E5]/40 bg-white/[0.07]'
        : 'border-white/10 hover:border-white/20'
    }`;

  const labelClass = (field) =>
    `absolute left-11 transition-all duration-200 pointer-events-none ${
      focusedField === field || formData[field]
        ? 'text-[#60B5FF] text-xs -top-2.5 bg-[#17165A] px-2'
        : 'text-gray-500 top-3.5 text-sm'
    }`;

  return (
    <form onSubmit={handleSubmit} className="w-full">

      <div className="space-y-5">

        {fields.map((field) => {
          const Icon = field.icon;

          return (
            <div className="relative" key={field.name}>

              <Icon
                className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                  focusedField === field.name
                    ? 'text-[#60B5FF]'
                    : 'text-gray-500'
                }`}
              />

              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField('')}
                className={inputClass(field.name)}
                placeholder={field.placeholder}
              />

              <label
                htmlFor={field.name}
                className={labelClass(field.name)}
              >
                {field.label}
              </label>

            </div>
          );
        })}

        <div className="relative">

          <MessageSquare
            className={`absolute left-4 top-4 w-4 h-4 transition-colors duration-300 ${
              focusedField === 'message'
                ? 'text-[#60B5FF]'
                : 'text-gray-500'
            }`}
          />

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField('')}
            rows={5}
            maxLength={1000}
            className={`${inputClass('message')} resize-none min-h-[150px] pt-4`}
            placeholder="Write your message"
          />

          <label
            htmlFor="message"
            className={`absolute left-11 transition-all duration-200 pointer-events-none ${
              focusedField === 'message' || formData.message
                ? 'text-[#60B5FF] text-xs -top-2.5 bg-[#17165A] px-2'
                : 'text-gray-500 top-3.5 text-sm'
            }`}
          >
            Your message
          </label>

          <div className="absolute right-3 bottom-3 text-xs text-gray-500">
            {formData.message.length}/1000
          </div>

        </div>

        {submitStatus.message && (
          <div
            className={`flex items-center gap-3 p-4 rounded-xl text-sm border ${
              submitStatus.type === 'success'
                ? 'bg-green-500/10 text-green-300 border-green-500/20'
                : 'bg-red-500/10 text-red-300 border-red-500/20'
            }`}
          >
            {submitStatus.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}

            <span>{submitStatus.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`group w-full py-3.5 px-5 rounded-xl font-medium transition-all duration-300 ${
            isSubmitting
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#3093E5] to-[#2563EB] text-white hover:shadow-lg hover:shadow-[#3093E5]/25 hover:-translate-y-0.5'
          }`}
        >
          <span className="flex items-center justify-center gap-2">

            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message

                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}

          </span>
        </button>

      </div>

    </form>
  );
};

export default ContactForm;