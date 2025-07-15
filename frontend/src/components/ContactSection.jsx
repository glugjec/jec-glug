import React from 'react'
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = () => {

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd like to hear more from you! Fill out the form below.
          </p>
        </div>

        {/* Contact Content */}
        <div className="backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;