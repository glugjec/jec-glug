import React from 'react'
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 7002382382"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "glugjec@gmail.com"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Jorhat Engineering College"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-blue-600">
              {detail.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600">{detail.label}</p>
              <p className="text-gray-900">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo
