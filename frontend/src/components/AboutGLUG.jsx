
const AboutGLUG = () => {
  return (
    <div id="AboutGLUG" className="w-full max-w-full py-8 sm:py-12">
      <div className="px-4 sm:px-6 lg:px-12 py-4 sm:py-8 w-full max-w-7xl mx-auto">
        {/* Main flex container. 
          It stacks children vertically by default (`flex-col`).
          On extra-large screens (`xl:`), it switches to a horizontal layout (`flex-row`).
        */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mb-8 sm:mb-12">
          
          {/* Column 1: "About us" Content */}
          <div className="w-full xl:w-1/2 px-0 sm:px-4 lg:px-6 xl:px-8 pb-2 sm:pb-4 lg:pb-6 xl:pb-8">
            <div className="h-full flex flex-col rounded-xl p-4 sm:p-8 lg:p-10">
              <div className="flex flex-col">
                <h1 className="font-poppins text-lg sm:text-xl text-gray-100 mb-3 sm:mb-4">About us</h1>
                <p className="font-noto-serif-jp text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-gray-300 mb-4 sm:mb-6 leading-tight break-words">
                  Born from curiosity, powered by community.
                </p>
                <div className="font-helvetica space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-gray-200 text-left sm:text-justify leading-relaxed" >
                    The GNU/Linux Users Group (GLUG) of Jorhat Engineering College is a student-led community of passionate developers, designers, and tech enthusiasts committed to promoting open-source software and collaborative learning.
                  </p>
                  <p className="text-base sm:text-lg text-gray-200 text-left sm:text-justify leading-relaxed">
                    We host workshops, hackathons, tech talks, and contribute to real-world open-source projects—empowering students to grow their skills and innovate together. From Linux basics to global programs like GSoC, we help our members explore the endless possibilities of open technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: "Our Goal" Section */}
          <div className="w-full xl:w-1/2 px-0 sm:px-4 lg:px-6 xl:px-8">
            <div className="font-helvetica h-full flex flex-col bg-[#83B3FF] rounded-xl p-6 sm:p-8 lg:p-10">
              <div>
                <h3 className="text-xl sm:text-2xl font-noto-serif-jp text-white mb-4 sm:mb-6">Our Goal</h3>
                
                <ul className="font-helvetica ml-4 sm:ml-6 list-disc list-inside text-white space-y-2 sm:space-y-3 text-sm sm:text-md">
                  <li>Promote open-source culture</li>
                  <li>Build technical skills</li>
                  <li>Foster collaboration</li>
                  <li>Create innovative solutions</li>
                </ul>
              </div>

              <div className="mt-6 sm:mt-auto pt-4 sm:pt-6">
                <img 
                  src="images/aboutLogo.png" 
                  alt="GLUG Logo" 
                  className="w-44 sm:w-56 md:w-60 max-w-full h-auto"
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/240x100/ffffff/83B3FF?text=GLUG+Logo'; }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutGLUG;
