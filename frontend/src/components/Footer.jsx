import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#060038] px-8 md:px-20 py-16">
      <div className="font-helvetica max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* GLUG Info */}
        <div className="font-helvetica relative">
          <h2 className="text-2xl font-semibold mb-3">GLUG</h2>
          <p className="text-[0.95rem] text-gray-600 leading-relaxed max-w-xs">
            We promote Linux, free software, and collaborative learning through events like workshops, hackathons, and tech talks.
          </p>

          {/* Vertical Divider */}
          <div className="hidden lg:block absolute top-0 right-[-2rem] h-full w-px bg-gray-300" />
        </div>

        {/* Sitemap */}
        <div className="text-[0.95rem] space-y-1 lg:pl-6">
          <h3 className="font-poppins font-semibold mb-2">Sitemap</h3>
          <ul className="text-blue-900 space-y-1">
            <li><a href="/">Home</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/contact">Contact US</a></li>
            <li><a href="/sponsors">Sponsors</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-[0.95rem] space-y-1">
          <h3 className="font-poppins font-semibold mb-2">Contact</h3>
          <p>Jorhat Engineering College,<br />Assam, India</p>
          <p className="text-blue-900">glugjec@gmail.com</p>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col justify-between text-[0.95rem]">
          <div>
            <h3 className="font-poppins font-semibold mb-2">Follow us</h3>
            <ul className="space-y-1 text-blue-900">
              <li><a href="https://www.facebook.com/jec.glug/">Facebook</a></li>
              <li><a href="https://www.instagram.com/jecglug/">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/glug-jec">LinkedIn</a></li>
              <li><a href="https://github.com/glugjec">Github</a></li>
            </ul>
          </div>
          <div className="flex space-x-4 text-lg text-black mt-4">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaGithub />
          </div>
        </div>
      </div>
    </footer>
  );
}
