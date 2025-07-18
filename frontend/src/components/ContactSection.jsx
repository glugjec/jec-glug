import React from 'react'
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = ({ bgColor }) => {

  return (
    <section className="py-12 text-white "style={{ backgroundColor: bgColor || "transparent" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold  mb-4">Get in Touch</h2>
          <p className=" max-w-2xl mx-auto">
            We'd like to hear more from you! Fill out the form below.
          </p>
        </div>

        {/* Contact Content */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/10 rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
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