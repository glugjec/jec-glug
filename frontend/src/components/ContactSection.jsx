import React from 'react'
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection = ({ bgColor }) => {

  return (
    <section className="w-full py-8 sm:py-12 text-white" style={{ backgroundColor: bgColor || "transparent" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
        <h1 className="font-canno text-3xl sm:text-4xl md:text-[3rem] font-bold text-center bg-gradient-to-r from-[#3093E5] to-[#FFFFFF] bg-clip-text text-transparent break-words">
          Get in Touch
        </h1>
          <p className="text-base sm:text-xl max-w-2xl mx-auto mt-2">
            We'd like to hear more from you! Fill out the form below.
          </p>
        </div>

        {/* Contact Content */}
        <div className="backdrop-blur-sm bg-white/10 border border-white/10 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
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