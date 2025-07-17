import assamLogo from '../assets/sponsor_logo/assam.png';
import frintLogo from '../assets/sponsor_logo/frint.jpg';
import saurabhiLogo from '../assets/sponsor_logo/saurabhi.png';
import oilLogo from '../assets/sponsor_logo/oil.jpg';
import instrumentLogo from '../assets/sponsor_logo/instrument.jpg';

const AboutGLUG = () => {
  return (
    <>
      <div
        style={{
        background: "linear-gradient(to bottom, #03022C, #161D58)",
        }}
          className="w-screen relative left-1/2 right-1/2 -translate-x-1/2">
            
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header and Goals Side-by-side */}
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            {/* Header Content */}
            <div className="md:w-1/2">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-gray-100 mb-4">About us</h1>
                <p className="text-xl text-gray-300 italic mb-6">Born from curiosity, powered by community.</p>
                <div className="space-y-6">
                  <p className="text-lg text-gray-200">
                    The GNU/Linux Users Group (GLUG) of Jontet Engineering College is a student-led community of passionate developers, designers, and tech enthusiasts committed to promoting open-source software and collaborative learning.
                  </p>
                  <p className="text-lg text-gray-200">
                    We host workshops, hackathons, tech talks, and contribute to real-world open-source projects—empowering students to grow their skills and innovate together. From Linux basics to global programs like GSoC, we help our members explore the endless possibilities of open technology.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Goal Section */}
            <div className="md:w-1/2">
              <div className="h-full flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">Our Goal</h2>
                <ul className="grid grid-cols-1 gap-4">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">-</span>
                    <span className="text-gray-200">Promote open-source culture</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">-</span>
                    <span className="text-gray-200">Build technical skills</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">-</span>
                    <span className="text-gray-200">Foster collaboration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">-</span>
                    <span className="text-gray-200">Create innovative solutions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sponsors Section OUTSIDE the gradient */}
      <div className="w-screen bg-[#3B8FE1] py-6 mx-auto relative left-1/2 right-1/2 -translate-x-1/2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Sponsors</h2>
        <div className="flex justify-center items-center gap-4 overflow-x-auto px-4">
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={assamLogo} alt="Assam" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={saurabhiLogo} alt="Saurabhi" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={frintLogo} alt="Frint" className="w-full h-full object-contain" />
          </div>
          <div className="bg-gray-100 p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={instrumentLogo} alt="Instrument" className="w-full h-full object-contain" />
          </div>
          <div className="bg-black p-2 rounded-lg w-32 h-20 flex items-center justify-center">
            <img src={oilLogo} alt="Oil" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutGLUG;
